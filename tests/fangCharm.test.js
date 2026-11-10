// § fang charm: Bat Fang's first use (D-799, D-809), made at the workbench's GEAR tab from 1 Bat Fang
// and 1 Copper Ore; worn, each creature beaten gives back 1 heart about 1 time in 4, never past the most
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, step, maxHealth } from '../src/core/turn.js';
import { benchMakes, benchTabOf } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { wear, fangOf } from '../src/core/worn.js';

const room = makeRoom(FIRST_ROOM);
const start = (bag) => ({ ...makeState(room), bag });
const worn = { charm: ['fangCharm'] };
const seeds = Array.from({ length: 400 }, (_, i) => i + 1);
// The hero at 5,11 with `health`, a rat one hit from beaten on 5,10, struck down
const beat = (seed, more = {}) => step({ ...makeState(room), seed, hero: { x: 5, y: 11 }, items: [], health: 2,
  enemies: [{ id: 'rat', x: 5, y: 10, health: 1 }], ...more }, 'up');
const fanged = (n) => n.events.some((e) => e.type === 'fang');

test("the Fang Charm is the GEAR tab's last slot: 1 Bat Fang and 1 Copper Ore, dim with too few", () => {
  const c = get('fangCharm');
  assert.equal(c.name, 'Fang Charm'); assert.equal(c.max, 1); assert.deepEqual(c.wear, { slot: 'charm', fang: 0.25 });
  const slot = benchMakes([{ id: 'batFang', n: 1 }, { id: 'copperOre', n: 1 }], 6, [], benchTabOf('gear').makes).at(-1);
  assert.deepEqual(slot, { item: 'fangCharm', cost: [{ id: 'batFang', n: 1, have: 1 }, { id: 'copperOre', n: 1, have: 1 }], dim: false });
  assert.equal(benchMakes([{ id: 'copperOre', n: 1 }], 6, [], benchTabOf('gear').makes).at(-1).dim, true);
});

test('Make takes its cost, a turn; too few or one worn is free', () => {
  const s = start([{ id: 'batFang', n: 2 }, { id: 'copperOre', n: 1 }]);
  const made = makeAt(s, 'fangCharm');
  assert.deepEqual(made.bag, [{ id: 'batFang', n: 1 }, { id: 'fangCharm', n: 1 }]);
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a fang charm.');
  assert.equal(shownLine(makeAt(start([{ id: 'copperOre', n: 1 }]), 'fangCharm')).text, 'Need 1 Bat Fang, 1 Copper Ore.');
  const has = makeAt({ ...s, worn }, 'fangCharm');
  assert.equal(has.turn, s.turn);
  assert.equal(shownLine(has).text, 'You already have a fang charm.');
});

test('Wear puts it on beside another charm, free', () => {
  const s = { ...start([{ id: 'fangCharm', n: 1 }]), worn: { charm: ['heartCharm'] } };
  const n = wear(s, 0);
  assert.deepEqual(n.worn.charm, ['heartCharm', 'fangCharm']);
  assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, 'You put on the fang charm.');
  assert.equal(fangOf(n), 0.25); assert.equal(fangOf(s), 0);
});

test('worn, a creature beaten gives back 1 heart about 1 time in 4, with its line and a fang event', () => {
  const back = seeds.filter((seed) => fanged(beat(seed, { worn })));
  assert.ok(back.length > 70 && back.length < 130, `${back.length} of 400`);
  const n = beat(back[0], { worn });
  assert.equal(n.health, 3);
  assert.equal(shownLine(n).text, 'The fang drinks. You feel better.');
  assert.deepEqual(beat(back[0], { worn }), n, 'seeded: the same again');
  const other = beat(seeds.find((seed) => !back.includes(seed)), { worn });
  assert.equal(other.health, 2); assert.equal(other.line.id, 'ratDie');
});

test('none without it, and never past the most hearts', () => {
  assert.ok(seeds.every((seed) => !fanged(beat(seed))));
  const full = maxHealth(makeState(room));
  assert.ok(seeds.every((seed) => { const n = beat(seed, { worn, health: full }); return n.health === full && !fanged(n); }));
});

test('a hit that does not beat the creature gives nothing back', () => {
  assert.ok(seeds.every((seed) => !fanged(beat(seed, { worn, enemies: [{ id: 'rat', x: 5, y: 10, health: 5 }] }))));
});

test('a pile of bones scattered is beaten too, and may give a heart back', () => {
  const pile = (seed) => step({ ...makeState(room), seed, hero: { x: 5, y: 11 }, items: [], health: 2, worn,
    enemies: [{ id: 'boneRat', x: 5, y: 10, health: 0, pile: 3 }] }, 'up');
  const back = seeds.filter((seed) => fanged(pile(seed)));
  assert.ok(back.length > 50 && back.length < 150, `${back.length} of 400`);
  assert.equal(pile(back[0]).health, 3);
});
