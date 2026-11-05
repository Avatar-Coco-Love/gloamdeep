// § travel: from one woken waystone to another, free, barred with a creature near (D-593)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { stoneAt, withTile, tileAt } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { stonesOf, travel, onWokenPlate, creatureNear, stoneName, stoneNote } from '../src/core/travel.js';

const SEED = 5;
const plate = (room) => { for (let y = 0; y < room.rows; y++) { const x = room.map[y].search(/[ZA]/); if (x >= 0) return { x, y }; } return null; };
// The state standing on the stone of `place`, woken, no creature in the room
function onStone(s, place) {
  const there = goToPlace(s, place), at = plate(there.room);
  return { ...there, room: withTile(there.room, at.x, at.y, get('wokenPlate')), hero: at, enemies: [] };
}
// Both stones woken, the hero on depth 2's
function bothWoken() {
  const home = onStone(makeWorld('first', SEED), 'woods');
  return onStone(home, stoneAt(SEED).id);
}

test('travel: the card lists home first, then depth 2, ??? until woken', () => {
  const s = makeWorld('first', SEED), rows = stonesOf(s);
  assert.deepEqual(rows.map((r) => r.place), ['woods', stoneAt(SEED).id]);
  assert.ok(rows.every((r) => !r.woken));
  assert.deepEqual(rows.map(stoneName), ['???', '???']);
  const both = stonesOf(bothWoken());
  assert.deepEqual(both.map(stoneName), ['Home', 'Depth 2']);
  assert.deepEqual(both.map(stoneNote), ['The surface.', 'You are here.']);
});

test('travel: picking home goes onto its plate, free: no turn, no oil, no creature moves', () => {
  const s = { ...bothWoken(), lit: true }, out = travel(s, 'woods');
  assert.equal(out.place, 'woods');
  assert.equal(tileAt(out.room, out.hero.x, out.hero.y).id, 'wokenPlate');
  assert.equal(out.turn, s.turn);
  assert.equal(out.oil, s.oil);
  assert.equal(out.line.id, 'stoneTravel');
  assert.ok(out.events.some((e) => e.type === 'travel'));
  assert.ok(onWokenPlate(out));
  assert.deepEqual(out.elsewhere[s.place].room, s.room); // the room left waits
  const back = travel(out, s.place);
  assert.equal(back.place, s.place);
  assert.deepEqual(back.hero, s.hero);
});

test('travel: a stone not woken, or the one stood on, takes nowhere', () => {
  const s = onStone(makeWorld('first', SEED), stoneAt(SEED).id);
  assert.equal(travel(s, 'woods'), s); // home not yet woken
  assert.equal(travel(s, s.place), s);
});

test('travel: barred with a creature awake beside the hero or chasing, not one asleep', () => {
  const s = bothWoken(), { x, y } = s.hero;
  const beside = { ...s, enemies: [{ id: 'rat', x: x + 1, y: y + 1, health: 2 }] };
  assert.ok(creatureNear(beside));
  const out = travel(beside, 'woods');
  assert.equal(out.place, s.place);
  assert.equal(out.line.id, 'stoneNear');
  const chasing = { ...s, enemies: [{ id: 'rat', x: 1, y: 1, health: 2, chasing: true }] };
  assert.ok(creatureNear(chasing));
  const asleep = { ...s, enemies: [{ id: 'flaskMimic', x: x + 1, y, health: 2, asleep: true }] };
  assert.ok(!creatureNear(asleep));
  assert.equal(travel(asleep, 'woods').place, 'woods');
});
