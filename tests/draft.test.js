// § draft: the motes drift along the way to walk to the floor's stairs down not yet seen (D-581, D-653)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld } from '../src/core/turn.js';
import { goToDepth } from '../src/core/stairs.js';
import { floorPlan, downsOf } from '../src/core/map.js';
import { draftTo } from '../src/core/draft.js';
import { tileAt } from '../src/core/room.js';

// The floor tile at floor x, y, from the revealed plan
function floorTile(p, fx, fy) {
  const r = p.rooms.find((r) => fx >= r.x && fy >= r.y && fx < r.x + r.room.cols && fy < r.y + r.room.rows);
  return r ? tileAt(r.room, fx - r.x, fy - r.y) : null;
}

test('draft: aims at an open tile in sight, never into a wall', () => {
  for (const seed of [7, 11, 42, 99, 1234]) for (const depth of [1, 2, 3, 4, 6, 9]) {
    const s = goToDepth(makeWorld('first', seed), depth), to = draftTo(s);
    assert.ok(to, `seed ${seed} depth ${depth} has a draft`);
    const p = floorPlan(s, true), here = p.rooms.find((r) => r.id === s.place);
    const hx = here.x + s.hero.x, hy = here.y + s.hero.y, fx = here.x + to.x, fy = here.y + to.y;
    const n = Math.max(Math.abs(fx - hx), Math.abs(fy - hy)) * 4;
    for (let k = 0; k <= n; k++) {
      const t = floorTile(p, Math.round(hx + ((fx - hx) * k) / n), Math.round(hy + ((fy - hy) * k) / n));
      assert.ok(!t?.solid, `seed ${seed} depth ${depth}: the line to the aim crosses no wall`);
    }
  }
});

test('draft: walking toward the aim never meets a wall, and the aim ends on the stairs down', () => {
  for (const seed of [5, 7, 42]) {
    let s = goToDepth(makeWorld('first', seed), 3), done = false;
    for (let k = 0; k < 300 && !done; k++) {
      const to = draftTo(s), { x, y } = s.hero;
      assert.ok(to, `seed ${seed}: an aim at step ${k}`);
      if (to.x < 0 || to.y < 0 || to.x >= s.room.cols || to.y >= s.room.rows) { done = true; break; } // on through an opening
      if (downsOf(s.room).some((d) => d.x === to.x && d.y === to.y)) { done = true; break; } // the stairs, in sight
      const dx = Math.sign(to.x - x), dy = Math.sign(to.y - y);
      const step = [[dx, 0], [0, dy]].find(([a, b]) => (a || b) && !tileAt(s.room, x + a, y + b).solid);
      assert.ok(step, `seed ${seed}: a free step toward the aim`);
      s = { ...s, hero: { ...s.hero, x: x + step[0], y: y + step[1] } };
    }
    assert.ok(done, `seed ${seed}: got there`);
  }
});

test('draft: none once the floor\'s stairs down are remembered', () => {
  const s = goToDepth(makeWorld('first', 7), 1), d = downsOf(s.room)[0];
  assert.ok(draftTo(s));
  const seen = s.seen.slice(); seen[d.y * s.room.cols + d.x] = 1;
  assert.equal(draftTo({ ...s, seen }), null);
});
