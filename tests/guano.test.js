// § bat guano: a pile by each bat as a room is made, taken into the bag, sold, growing
// back (step 0.3.9, D-539, D-540)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, placeFor } from '../src/core/room.js';
import { makeState, step, look, itemAt } from '../src/core/turn.js';
import { regrow } from '../src/core/regrow.js';
import { withGuano, GUANO_NEAR } from '../src/core/guano.js';
import { layoutAt } from '../src/core/region.js';
import { shownLine } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';

const room = makeRoom(FIRST_ROOM);
const near = (a, b) => Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));

test('Bat Guano: its name, stacks of 20, sells for 1, grows back after 300 turns', () => {
  const g = get('batGuano');
  assert.equal(g.name, 'Bat Guano'); assert.equal(g.max, 20); assert.equal(g.sells, 1); assert.equal(g.regrow, 300);
});

test('every made room has one pile by each bat, on open floor, nothing else on its tile', () => {
  let piles = 0;
  for (let seed = 1; seed <= 30; seed++) for (const depth of [2, 3, 4, 6]) for (const c of layoutAt(seed, depth).cells) {
    const p = placeFor(c.id, seed), at = `seed ${seed} ${c.id}`;
    const bats = p.enemies.filter((e) => e.id === 'bat'), gs = p.items.filter((i) => i.id === 'batGuano');
    assert.equal(gs.length, bats.length, at);
    piles += gs.length;
    const spots = [p.start, ...p.items, ...p.enemies, ...p.people].map(({ x, y }) => `${x},${y}`);
    assert.equal(new Set(spots).size, spots.length, `${at} two on one tile`);
    for (const g of gs) {
      assert.equal(p.map[g.y][g.x], '.', at);
      assert.ok(bats.some((b) => near(b, g) <= GUANO_NEAR), at);
    }
  }
  assert.ok(piles > 50, `${piles} piles`);
});

test('a pile goes next to its bat when a tile there is free, and a room with no bat is left as it was', () => {
  const r = { map: ['#####', '#...#', '#...#', '#...#', '#####'], start: { x: 1, y: 1 }, items: [], enemies: [{ id: 'bat', x: 2, y: 2 }] };
  const g = withGuano(7, r).items;
  assert.equal(g.length, 1); assert.equal(near(g[0], { x: 2, y: 2 }), 1);
  const none = { ...r, enemies: [{ id: 'rat', x: 2, y: 2 }] };
  assert.equal(withGuano(7, none), none);
});

test('stepping onto it takes it with its line, a full bag leaves it, and the bag says a look line', () => {
  const s = { ...makeState(room), hero: { x: 5, y: 11 }, items: [{ id: 'batGuano', x: 5, y: 10 }], enemies: [] };
  const n = step(s, 'up');
  assert.deepEqual(n.bag, [{ id: 'batGuano', n: 1 }]);
  assert.equal(shownLine(n).text, 'You scoop up the guano.');
  const f = step({ ...s, bag: Array.from({ length: 6 }, () => ({ id: 'batGuano', n: 20 })) }, 'up');
  assert.equal(itemAt(f, 5, 10).id, 'batGuano');
  assert.equal(shownLine(f).text, "You can't carry more guano.");
  assert.equal(shownLine(look({ ...makeState(room), bag: [{ id: 'batGuano', n: 1 }] }, 0)).text, 'Bat guano. It smells sharp.');
});

test('taken, it lies there again 300 turns later', () => {
  const s = { ...makeState(room), hero: { x: 5, y: 11 }, items: [{ id: 'batGuano', x: 5, y: 10 }], enemies: [] };
  const n = step(s, 'up'), at = n.taken[0].at;
  assert.equal(regrow({ ...n, hero: { x: 1, y: 1 }, turn: at + 299 }, true).items.length, 0);
  assert.deepEqual(regrow({ ...n, hero: { x: 1, y: 1 }, turn: at + 300 }, true).items, [{ id: 'batGuano', x: 5, y: 10 }]);
});
