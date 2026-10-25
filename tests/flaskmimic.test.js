// § flask mimic: an oil flask with teeth, that never moves (D-366, D-367)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, mimicRooms, placeFor } from '../src/core/room.js';
import { makeState, step, wait, switchLantern, FIRST_START } from '../src/core/turn.js';
import { layoutAt } from '../src/core/region.js';
import { biteSound } from '../src/core/enemies.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 and one flask mimic
const at = (x, y) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id: 'flaskMimic', x, y }] });
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);
// Steps along open floor from a to b
function steps(map, a, b) {
  const seen = new Map([[`${a.x},${a.y}`, 0]]), queue = [a];
  while (queue.length) {
    const t = queue.shift();
    if (t.x === b.x && t.y === b.y) return seen.get(`${t.x},${t.y}`);
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy }, k = `${n.x},${n.y}`;
      if (map[n.y]?.[n.x] === '.' && !seen.has(k)) { seen.set(k, seen.get(`${t.x},${t.y}`) + 1); queue.push(n); }
    }
  }
  return Infinity;
}

test('a flask mimic has 3 health and a bite of 1, and no ways', () => {
  const m = get('flaskMimic');
  assert.equal(m.name, 'Flask mimic'); assert.equal(m.health, 3); assert.equal(m.bite, 1);
  assert.deepEqual(m.ways, []);
  for (const id of [m.die, m.bites]) assert.ok(LINES[id], id);
});

test('it never moves, lit or dark, near or far', () => {
  let s = at(5, 8);
  for (let i = 0; i < 5; i++) s = wait(s);
  assert.deepEqual(where(s), [[5, 8]]);
  s = switchLantern(at(5, 9));
  for (let i = 0; i < 5; i++) s = wait(s);
  assert.deepEqual(where(s), [[5, 9]]);
});

test('next to the hero it bites for 1, with a clink of glass', () => {
  const n = wait(at(5, 10));
  assert.equal(n.health, 4);
  assert.equal(n.line.id, 'flaskMimicBite');
  assert.equal(biteSound([{ type: 'bite', id: 'flaskMimic' }]), 'glass');
});

test('three lantern hits kill it; hurt, it stays put and bites back', () => {
  let s = step(at(5, 10), 'up');
  assert.deepEqual(s.enemies, [{ id: 'flaskMimic', x: 5, y: 10, health: 2, chasing: true }]);
  assert.equal(s.health, 4);
  s = step(step(s, 'up'), 'up');
  assert.deepEqual(s.enemies, []);
  assert.equal(s.line.id, 'flaskMimicDie');
});

test('about 1 room in 4 holds one on depths 3 to 5, none above or below', () => {
  let rooms = 0, mimics = 0;
  for (const seed of SEEDS) {
    for (const d of [0, 1, 2, 6, 8]) assert.deepEqual(mimicRooms(seed, d), []);
    for (const d of [3, 4, 5]) { rooms += layoutAt(seed, d).cells.length; mimics += mimicRooms(seed, d).length; }
  }
  assert.ok(mimics / rooms > 0.18 && mimics / rooms < 0.32, `${mimics} of ${rooms}`);
});

test('it stands on open floor, where nothing else is, well away from the way in', () => {
  let seen = 0;
  for (const seed of SEEDS.slice(0, 20)) for (const d of [3, 4, 5]) for (const id of mimicRooms(seed, d)) {
    const r = placeFor(id, seed), m = r.enemies.filter((e) => e.id === 'flaskMimic');
    if (!m.length) continue;
    seen++;
    assert.equal(m.length, 1);
    const [{ x, y }] = m;
    assert.equal(r.map[y][x], '.');
    assert.ok(![...r.items, ...r.enemies.filter((e) => e !== m[0])].some((t) => t.x === x && t.y === y));
    assert.ok(steps(r.map, r.start, m[0]) >= 5);
  }
  assert.ok(seen > 10, `${seen} placed`);
});
