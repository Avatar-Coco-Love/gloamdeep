// § refloor: a save from before the floors grew with depth has its generated rooms
// made again at the new sizes, once, as it is brought up to date (D-580)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { refloor } from '../src/core/refloor.js';
import { upgradeState, UPGRADES } from '../src/core/save.js';
import { makeWorld } from '../src/core/turn.js';
import { goToPlace, goToDepth } from '../src/core/stairs.js';
import { tileAt, peddlerRoom, isGenerated, placeFor } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';

const SEED = 7;
const generated = (s) => Object.keys(s.elsewhere).filter(isGenerated);

test('the step from format 10 is the refloor', () => {
  assert.equal(UPGRADES[10], refloor);
});

test('a hero in a generated room stands on the stairs up of that floor, in its room made anew', () => {
  const other = layoutAt(SEED, 3).cells.find((c) => !c.up).id;
  const old = { ...goToPlace(goToDepth(makeWorld('first', SEED), 2), other), hero: { x: 3, y: 3 } };
  const s = upgradeState(10, old);
  assert.equal(s.place, 'depth3');
  assert.equal(tileAt(s.room, s.hero.x, s.hero.y).id, 'stairsUp');
  assert.deepEqual([s.room.cols, s.room.rows], [13, 15]);
  assert.deepEqual(generated(s), []); // depth 2 and the room left are forgotten
  assert.ok(s.elsewhere.first && s.elsewhere.woods, 'the hand-made places are kept');
  assert.ok(!s.seen.some(Boolean), 'nothing of it remembered');
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
