// § rat pack: the plain rat's Pack way and where packs stand (D-727)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, placeFor } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { makeState, step, wait, FIRST_START } from '../src/core/turn.js';
import { packOf, PACK_FROM } from '../src/core/pack.js';

const room = makeRoom(FIRST_ROOM);
// The first room in the dark, so no rat notices by light; god mode, so bites never end it
const at = (hero, enemies, seed) => ({ ...makeState(room, FIRST_START, [], []), lit: false, god: true, hero, enemies, ...(seed && { seed }) });
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

test('from depth 3, about 1 room in 3 rolls a pack; never above', () => {
  let rolls = 0, n = 0;
  for (let seed = 1; seed <= 3000; seed++) { assert.ok(!packOf(seed, PACK_FROM - 1)); n++; if (packOf(seed, PACK_FROM)) rolls++; }
  assert.ok(Math.abs(rolls / n - 1 / 3) < 0.03, `${rolls} of ${n}`);
});

test('a pack is the rat by the flask and 2 more rats within 2 tiles, on top of the room\'s creatures', () => {
  let packs = 0;
  for (let seed = 1; seed <= 30; seed++) for (const depth of [2, 3, 5, 8]) for (const c of layoutAt(seed, depth).cells) {
    const p = placeFor(c.id, seed), pack = p.enemies.filter((e) => e.pack), id = `seed ${seed} ${c.id}`;
    if (!pack.length) continue;
    packs++;
    assert.ok(depth >= PACK_FROM, id);
    assert.equal(pack.length, 3, id);
    assert.ok(pack.every((e) => e.id === 'rat'), id);
    const flask = p.items.find((i) => i.id === 'flask');
    assert.ok(dist(pack[0], flask) <= 2, `${id} the lead by the flask`);
    assert.ok(pack.slice(1).every((e) => dist(e, pack[0]) <= 2), `${id} its packmates beside it`);
    assert.deepEqual(p.enemies.slice(-2), pack.slice(1), `${id} placed after the rest`);
  }
  assert.ok(packs > 30, `${packs} packs`);
});

test('once one of a pack notices the hero, its whole pack does; a rat of no pack does not', () => {
  const s = at({ x: 6, y: 7 }, [{ id: 'rat', x: 2, y: 7, chasing: true, pack: 1 }, { id: 'rat', x: 8, y: 11, pack: 1 }, { id: 'rat', x: 8, y: 2 }]);
  const n = wait(s);
  assert.deepEqual(n.enemies.map((e) => !!e.chasing), [true, true, false]);
  assert.deepEqual(where(n), [[3, 7], [8, 10], [8, 2]], 'the packmate comes at once');
});

test('a pack spreads to its own sides of the hero, where rats alone queue up', () => {
  const rats = [{ id: 'rat', x: 1, y: 7, chasing: true }, { id: 'rat', x: 1, y: 8 }, { id: 'rat', x: 2, y: 8 }];
  const run = (enemies) => { let s = at({ x: 6, y: 7 }, enemies); for (let i = 0; i < 9; i++) s = wait(s); return s; };
  const pack = run(rats.map((e) => ({ ...e, pack: 1 })));
  assert.deepEqual(where(pack), [[5, 7], [6, 6], [6, 8]], 'west, north and south');
  assert.deepEqual(where(run(rats)), [[5, 7], [1, 8], [2, 8]], 'alone, only the one that noticed comes');
});

test('hurt with a packmate left, a rat always stands its ground; the last one may flee as before', () => {
  let fled = 0;
  for (let seed = 1; seed <= 20; seed++) {
    const two = step(at({ x: 6, y: 7 }, [{ id: 'rat', x: 6, y: 6, pack: 1 }, { id: 'rat', x: 2, y: 2, pack: 1 }], seed), 'up');
    assert.equal(two.enemies[0].health, 1, `seed ${seed}`);
    assert.ok(!two.enemies[0].flees, `seed ${seed} it stands`);
    assert.equal(two.line.id, 'ratStands');
    const last = step(at({ x: 6, y: 7 }, [{ id: 'rat', x: 6, y: 6, pack: 1 }], seed), 'up');
    if (last.enemies[0].flees) fled++;
  }
  assert.ok(fled > 3 && fled < 17, `${fled} of 20 fled`);
});

test('the last of a pack acts as a rat alone', () => {
  const lone = [{ id: 'rat', x: 2, y: 7, chasing: true }];
  let a = at({ x: 6, y: 7 }, lone), b = at({ x: 6, y: 7 }, lone.map((e) => ({ ...e, pack: 1 })));
  for (let i = 0; i < 4; i++) { a = wait(a); b = wait(b); assert.deepEqual(where(b), where(a)); }
});
