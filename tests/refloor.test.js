// § refloor: a save from before the floors grew with depth has its generated rooms
// made again at the new sizes, once, as it is brought up to date (D-580)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { refloor } from '../src/core/refloor.js';
import { upgradeState, UPGRADES } from '../src/core/save.js';
import { makeWorld } from '../src/core/turn.js';
import { goToPlace, goToDepth } from '../src/core/stairs.js';
import { tileAt, peddlerRoom, isGenerated, placeFor, stoneRoom } from '../src/core/room.js';
import { stonesOf } from '../src/core/travel.js';
import { layoutAt } from '../src/core/region.js';

const SEED = 7;
const generated = (s) => Object.keys(s.elsewhere).filter(isGenerated);

test('the steps from formats 10, 16 and 17 are the refloor: the last for the halls and large rooms (D-648)', () => {
  assert.equal(UPGRADES[10], refloor);
  assert.equal(UPGRADES[16], refloor);
  assert.equal(UPGRADES[17], refloor);
});

test('a hero in a generated room stands on the stairs up of that floor, in its room made anew', () => {
  const other = layoutAt(SEED, 3).cells.find((c) => !c.up).id;
  const old = { ...goToPlace(goToDepth(makeWorld('first', SEED), 2), other), hero: { x: 3, y: 3 } };
  const s = upgradeState(10, old);
  assert.equal(s.place, 'depth3');
  assert.equal(tileAt(s.room, s.hero.x, s.hero.y).id, 'stairsUp');
  assert.deepEqual([s.room.cols, s.room.rows], [11, 13]); // made at today's size, one cell (D-645)
  assert.deepEqual(generated(s), []); // depth 2 and the room left are forgotten
  assert.ok(s.elsewhere.first && s.elsewhere.woods, 'the hand-made places are kept');
  assert.ok(!s.seen.some(Boolean), 'nothing of it remembered');
});

test('a save from before the bigger grids has every generated room made again once, home and the crypt kept (D-645)', () => {
  const other = layoutAt(SEED, 3).cells.find((c) => !c.up).id;
  const old = { ...goToPlace(goToDepth(makeWorld('first', SEED), 2), other), hero: { x: 3, y: 3 } };
  const s = upgradeState(16, old);
  assert.equal(s.place, 'depth3');
  assert.equal(tileAt(s.room, s.hero.x, s.hero.y).id, 'stairsUp');
  assert.deepEqual(generated(s), []);
  assert.ok(s.elsewhere.first && s.elsewhere.woods, 'the hand-made places are kept');
  const kept = goToPlace(makeWorld('first', SEED), 'second'), up = upgradeState(16, kept);
  assert.equal(up.place, 'second');
  assert.deepEqual(up.hero, kept.hero);
});

test('a hero above keeps their place; the generated rooms they left go', () => {
  const old = goToPlace(goToDepth(makeWorld('first', SEED), 5), 'first');
  assert.ok(generated(old).length);
  const s = refloor(old);
  assert.equal(s.place, 'first');
  assert.deepEqual(s.hero, old.hero);
  assert.deepEqual(generated(s), []);
});

test('a bag left in a generated room lies on that floor\'s stairs up, still holding its things', () => {
  const holds = [{ id: 'wood', n: 2 }], room = layoutAt(SEED, 4).cells.find((c) => !c.up).id;
  const old = goToPlace(goToDepth(makeWorld('first', SEED), 4), 'first');
  old.elsewhere[room] = { ...old.elsewhere.depth4, items: [{ id: 'lostbag', x: 5, y: 5, holds }] };
  const s = refloor(old), bag = s.elsewhere.depth4.items.find((it) => it.id === 'lostbag');
  assert.deepEqual(bag.holds, holds);
  assert.equal(tileAt(s.elsewhere.depth4.room, bag.x, bag.y).id, 'stairsUp');
  assert.deepEqual(generated(s), ['depth4']);
});

test('a peddler already home is not trapped again: his room is made now, without him or his rubble', () => {
  const old = makeWorld('first', SEED);
  old.elsewhere.woods = { ...old.elsewhere.woods, people: [{ id: 'peddler', x: 8, y: 9, home: true }] };
  const s = refloor(old), there = s.elsewhere[peddlerRoom(SEED)];
  assert.ok(placeFor(peddlerRoom(SEED), SEED).people.length, 'a new journey has him trapped there');
  assert.deepEqual(there.people, []);
  assert.ok(!there.room.map.join('').includes('U'));
});

test('a freed peddler still waiting in a generated room goes home, and stays freed', () => {
  const id = peddlerRoom(SEED), old = goToPlace(goToDepth(makeWorld('first', SEED), 3), id);
  const s = refloor({ ...old, people: [{ id: 'peddler', x: 2, y: 2, leaves: 99 }] });
  assert.ok(s.elsewhere.woods.people.some((p) => p.id === 'peddler' && p.home));
  const room = s.place === id ? s : s.elsewhere[id];
  assert.deepEqual(room.people, []);
});

test('a woken waystone stays woken: its floor\'s stone room made anew has its plate woken, the rest asleep (D-672)', () => {
  const woke = { room: { cols: 3, rows: 1, map: ['.A.'] }, items: [], people: [] }; // a woken plate in the old layout
  const old = goToPlace(goToDepth(goToDepth(makeWorld('first', SEED), 8), 5), 'first');
  const two = layoutAt(SEED, 2).cells.find((c) => c.id !== stoneRoom(SEED, 2)).id; // the old layout's stone stood elsewhere
  old.elsewhere[two] = woke;
  old.elsewhere.depth5 = woke;
  const before = stonesOf(old).filter((s) => s.depth > 0);
  assert.ok(before.every((s) => !s.woken), 'the seed\'s stone rooms themselves were not woken');
  const s = refloor(old), woken = Object.fromEntries(stonesOf(s).filter((t) => t.depth > 0).map((t) => [t.depth, t.woken]));
  assert.deepEqual(woken, { 2: true, 5: true, 8: false });
  const plate = s.elsewhere[stoneRoom(SEED, 2)].room.map.join('');
  assert.ok(plate.includes('A') && !plate.includes('Z'));
});

test('a hero standing on a woken stone wakes again on the floor\'s stairs up, the stone still woken (D-672)', () => {
  const id = stoneRoom(SEED, 2), old = goToPlace(goToDepth(makeWorld('first', SEED), 2), id);
  const s = refloor({ ...old, room: { ...old.room, map: old.room.map.map((l) => l.replaceAll('Z', 'A')) } });
  assert.equal(tileAt(s.room, s.hero.x, s.hero.y).id, 'stairsUp');
  assert.ok(stonesOf(s).find((t) => t.depth === 2).woken);
});
