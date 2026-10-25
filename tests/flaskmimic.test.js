// § flask mimic: an oil flask with teeth, asleep in disguise until bumped (D-366 to D-368)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, mimicRooms, placeFor } from '../src/core/room.js';
import { makeState, step, wait, FIRST_START, creatureList, nextMoves } from '../src/core/turn.js';
import { layoutAt } from '../src/core/region.js';
import { biteSound } from '../src/core/enemies.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 and one flask mimic, asleep unless `awake` is set
const at = (x, y, awake = false) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id: 'flaskMimic', x, y, ...(!awake && { asleep: true }) }] });
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);
const waits = (s, n) => { for (let i = 0; i < n; i++) s = wait(s); return s; };
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

test('a flask mimic has 3 health and a bite of 1, chases once awake, and looks like a flask', () => {
  const m = get('flaskMimic');
  assert.equal(m.name, 'Flask mimic'); assert.equal(m.health, 3); assert.equal(m.bite, 1);
  assert.deepEqual(m.ways, ['chases']); assert.equal(m.looksLike, 'flask'); assert.equal(m.awakeTurns, 6);
  for (const id of [m.die, m.bites, m.wakes, m.settles]) assert.ok(LINES[id], id);
});

test('asleep it does nothing, even next to the hero, and is hidden from the creature list', () => {
  const s = waits(at(5, 10), 5);
  assert.deepEqual(where(s), [[5, 10]]);
  assert.equal(s.health, 5);
  assert.deepEqual(creatureList(at(5, 10)), []);
  assert.deepEqual(nextMoves(at(5, 10)), []);
});

test('a bump wakes it with no harm, and that turn it does nothing', () => {
  const s = step(at(5, 10), 'up');
  assert.deepEqual(s.enemies, [{ id: 'flaskMimic', x: 5, y: 10, awake: 6, chasing: true }]);
  assert.equal(s.health, 5);
  assert.equal(s.line.id, 'flaskMimicWakes');
  assert.ok(s.events.some((e) => e.type === 'wake') && !s.events.some((e) => e.type === 'hit'));
  assert.equal(creatureList(s).length, 1);
});

test('awake, it chases, and bites with a clink of glass', () => {
  const w = step(at(5, 10), 'up'), n = wait(w);
  assert.equal(n.health, 4);
  assert.equal(n.line.id, 'flaskMimicBite');
  assert.equal(biteSound([{ type: 'bite', id: 'flaskMimic' }]), 'glass');
  const far = { ...w, hero: { x: 5, y: 13 } };
  assert.deepEqual(where(wait(far)), [[5, 11]]);
});

test('after 6 turns awake it settles back down asleep where it stands', () => {
  let s = { ...step(at(5, 10), 'up'), hero: { x: 9, y: 1 } }; // the hero far off, out of reach
  s = waits(s, 5);
  assert.equal(s.enemies[0].awake, 1);
  s = wait(s);
  assert.equal(s.enemies[0].asleep, true);
  assert.equal(s.enemies[0].awake, undefined);
  assert.equal(s.line.id, 'flaskMimicSettles');
});

test('three lantern hits kill it once awake', () => {
  let s = step(at(5, 10), 'up');
  s = step(step(step(s, 'up'), 'up'), 'up');
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
    const r = placeFor(id, seed), m = r.enemies.filter((e) => e.id === 'flaskMimic' && e.asleep);
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
