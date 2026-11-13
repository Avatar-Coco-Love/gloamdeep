// § resettle (B-001, D-855): an older save's Peddler at home in Hearthwood's middle room
// moves once to the home waystone's room, keeping his greeting, not beaming in
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resettle } from '../src/core/resettle.js';
import { upgradeState, FORMAT } from '../src/core/save.js';
import { makeWorld } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { stoneHome } from '../src/core/mouth.js';
import { tileAt } from '../src/core/room.js';

const SEED = 7, AT = stoneHome(SEED), OLD = { id: 'peddler', x: 8, y: 9, home: true, greeted: true };
const homeOf = (s) => (s.place === AT ? s : s.elsewhere[AT]);

test('an old save\'s Peddler in the middle room moves to the waystone\'s room, greeted still, not beaming in', () => {
  const old = makeWorld('first', SEED);
  old.elsewhere.woods = { ...old.elsewhere.woods, people: [OLD] };
  const s = upgradeState(32, old), [him] = homeOf(s).people.filter((p) => p.id === 'peddler');
  assert.deepEqual(s.elsewhere.woods.people, []);
  assert.equal(him.home, true);
  assert.equal(him.greeted, true);
  assert.equal(him.arrives, undefined);
  assert.notEqual(tileAt(homeOf(s).room, him.x, him.y).name, 'Waystone');
});

test('the hero standing in the middle room with him: he moves all the same', () => {
  const old = { ...goToPlace(makeWorld('first', SEED), 'woods'), people: [{ id: 'peddler', x: 8, y: 9, home: true }] };
  const s = resettle(old);
  assert.deepEqual(s.people, []);
  assert.equal(homeOf(s).people[0].id, 'peddler');
  assert.equal(homeOf(s).people[0].greeted, undefined);
});

test('no one at home in the middle room: the save is left as it was', () => {
  const old = makeWorld('first', SEED);
  assert.equal(resettle(old), old);
});
