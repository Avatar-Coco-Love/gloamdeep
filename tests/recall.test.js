// § recall: the Homestone, a chip of waystone made at the workbench once the home waystone is
// woken, at most 3 carried; USE carries the hero to the home plate, free, barred with a creature near (D-1015)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld, makeAt } from '../src/core/turn.js';
import { goToPlace, goToDepth } from '../src/core/stairs.js';
import { withTile } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { eat } from '../src/core/bagturn.js';
import { bagAdd } from '../src/core/bag.js';
import { stationMakes } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { benchKnown, homeWoken } from '../src/core/recall.js';
import { onWokenPlate } from '../src/core/travel.js';
import { stoneHome } from '../src/core/mouth.js';

const SEED = 5;
const plate = (room) => { for (let y = 0; y < room.rows; y++) { const x = room.map[y].search(/[ZA]/); if (x >= 0) return { x, y }; } return null; };
// The world with the home stone woken, the hero then taken to depth 3 with `bag`, no creature near
function woken(bag = [{ id: 'homestone', n: 1 }]) {
  const home = goToPlace(makeWorld('first', SEED), stoneHome(SEED)), at = plate(home.room);
  const lit = { ...home, room: withTile(home.room, at.x, at.y, get('wokenPlate')), hero: at };
  return { ...goToDepth(lit, 3), bag, enemies: [] };
}

test('the Homestone: 5 Duskstar and 5 Stone, on the GEAR tab only once the home waystone is woken', () => {
  assert.deepEqual(get('homestone').bench.of, { duskstar: 5, stone: 5 });
  const bench = get('bench'), gear = (s) => stationMakes(bench, s.bag, 6, [], benchKnown(s), 'gear').map((m) => m.item);
  const asleep = makeWorld('first', SEED);
  assert.equal(homeWoken(asleep), false);
  assert.ok(!gear(asleep).includes('homestone'));
  assert.equal(homeWoken(woken()), true);
  assert.equal(gear(woken()).at(-1), 'homestone');
});

test('at most 3 are carried, in one stack; making a 4th is free with its line', () => {
  assert.equal(bagAdd([{ id: 'homestone', n: 3 }], 'homestone', undefined, 6), null);
  assert.deepEqual(bagAdd([{ id: 'homestone', n: 2 }], 'homestone', undefined, 6), [{ id: 'homestone', n: 3 }]);
  const s = woken([{ id: 'homestone', n: 3 }, { id: 'duskstar', n: 5 }, { id: 'stone', n: 5 }]), made = makeAt(s, 'homestone');
  assert.equal(made.turn, s.turn);
  assert.equal(shownLine(made).text, "You can't carry more Homestones.");
  const one = makeAt(woken([{ id: 'duskstar', n: 6 }, { id: 'stone', n: 5 }]), 'homestone');
  assert.deepEqual(one.bag, [{ id: 'duskstar', n: 1 }, { id: 'homestone', n: 1 }]);
});

test('USE carries the hero onto the home plate, one spent, free', () => {
  const s = woken([{ id: 'homestone', n: 2 }]), home = eat(s, 0);
  assert.equal(home.place, stoneHome(SEED));
  assert.ok(onWokenPlate(home));
  assert.deepEqual(home.bag, [{ id: 'homestone', n: 1 }]);
  assert.equal(home.oil, s.oil);
  assert.equal(shownLine(home).text, 'The Homestone carries you home.');
});

test('barred with a creature near, at home already, or the home stone asleep: kept, free, its line', () => {
  const s = woken(), foe = { ...s, enemies: [{ id: 'rat', x: s.hero.x + 1, y: s.hero.y, hp: 1 }] };
  const near = eat(foe, 0);
  assert.equal(near.place, s.place);
  assert.deepEqual(near.bag, s.bag);
  assert.equal(shownLine(near).text, 'Not with a creature so near.');
  const home = { ...eat(s, 0), bag: [{ id: 'homestone', n: 1 }] }, again = eat(home, 0);
  assert.deepEqual(again.bag, home.bag);
  assert.equal(shownLine(again).text, 'You are home already.');
  const asleep = { ...goToDepth(makeWorld('first', SEED), 3), bag: [{ id: 'homestone', n: 1 }], enemies: [] };
  const no = eat(asleep, 0);
  assert.equal(no.place, asleep.place);
  assert.equal(shownLine(no).text, 'The home waystone sleeps.');
});
