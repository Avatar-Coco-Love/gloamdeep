// § draft: the motes drift straight at the floor's stairs down not yet seen (D-581, D-605)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld } from '../src/core/turn.js';
import { goToDepth } from '../src/core/stairs.js';
import { floorPlan } from '../src/core/map.js';
import { draftTo } from '../src/core/draft.js';
import { tileAt } from '../src/core/room.js';

const plan = (s) => floorPlan(s, true);

test('draft: points across the floor at stairs down, in floor tiles from this room', () => {
  for (const depth of [1, 2, 3, 4, 6]) {
    const s = goToDepth(makeWorld('first', 7), depth), to = draftTo(s);
    assert.ok(to, `depth ${depth} has a draft`);
    const p = plan(s), here = p.rooms.find((r) => r.id === s.place);
    const fx = here.x + to.x, fy = here.y + to.y, room = p.rooms.find((r) => fx >= r.x && fy >= r.y && fx < r.x + r.room.cols && fy < r.y + r.room.rows);
    assert.equal(tileAt(room.room, fx - room.x, fy - room.y).id, 'stairsDown', `depth ${depth}: on stairs down`);
  }
});

test('draft: none once the floor\'s stairs down are remembered', () => {
  const s = goToDepth(makeWorld('first', 7), 1), to = draftTo(s);
  const seen = s.seen.slice(); seen[to.y * s.room.cols + to.x] = 1;
  assert.equal(draftTo({ ...s, seen }), null);
});
