// § peddler: the first person, trapped in a ring of rubble in one room of depth 3 that
// the seed picks; the rubble dug, he calls out, and one heap cleared frees him
// (step 12a, D-490; step 12b, D-491)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, peddlerRoom, makeRoom, tileAt, PEDDLER_DEPTH } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { get, byKind } from '../src/core/registry.js';
import { makeState, makeWorld, step } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { shownLine, LINES } from '../src/core/lines.js';
import { readJourney, journeyText, upgradeState } from '../src/core/save.js';

const SEEDS = Array.from({ length: 40 }, (_, i) => i + 1);
const AROUND = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

test('the peddler is a person and rubble a solid tile that light passes over', () => {
  assert.deepEqual(byKind('npc'), [get('peddler')]);
  assert.equal(get('peddler').name, 'Peddler');
  const rubble = get('rubble');
  assert.equal(rubble.letter, 'U');
  assert.equal(rubble.solid, true);
  assert.equal(rubble.blocksLight, false);
});

test('on depth 3, one room the seed picks holds him, every open tile around him rubble', () => {
  for (const seed of SEEDS) {
    const rooms = layoutAt(seed, PEDDLER_DEPTH).cells.filter(({ id }) => placeFor(id, seed).people.length);
    assert.deepEqual(rooms.map((c) => c.id), [peddlerRoom(seed)], `seed ${seed}`);
    const p = placeFor(peddlerRoom(seed), seed), [him] = p.people, around = AROUND.map(([dx, dy]) => p.map[him.y + dy][him.x + dx]);
    assert.equal(him.id, 'peddler');
    assert.equal(p.map[him.y][him.x], '.');
    assert.ok(around.every((ch) => ch === 'U' || ch === '#'), `seed ${seed}`);
    assert.ok(around.filter((ch) => ch === 'U').length >= 5, `seed ${seed}`);
  }
});

test('no other depth holds people or rubble, and the same seed puts him in the same place', () => {
  for (const seed of SEEDS.slice(0, 10)) for (const depth of [2, 4, 5, 8]) {
    const p = placeFor(`depth${depth}`, seed);
    assert.deepEqual(p.people, []);
    assert.ok(!p.map.join('').includes('U'));
  }
  assert.deepEqual(placeFor(peddlerRoom(4127), 4127), placeFor(peddlerRoom(4127), 4127));
});

const MAP = ['#######', '#..UUU#', '#..U.U#', '#..UUU#', '#######'];
const trapped = (hero) => ({ ...makeState(makeRoom(MAP), hero), people: [{ id: 'peddler', x: 4, y: 2 }] });

test('digging the rubble around him, he calls out, his lines taking turns, a turn each', () => {
  const s = trapped({ x: 2, y: 2 }), bumped = step(s, 'right');
  assert.equal(bumped.turn, s.turn + 1);
  assert.equal(bumped.room.chips['3,2'], 1);
  assert.equal(shownLine(bumped).text, LINES.peddlerCalls.texts[0]);
  assert.equal(shownLine(step(bumped, 'right')).text, LINES.peddlerCalls.texts[1]);
  const corner = step({ ...trapped({ x: 2, y: 1 }) }, 'right'); // the rubble at a corner of the ring
  assert.equal(shownLine(corner).text, LINES.peddlerCalls.texts[0]);
});

test('the third bump clears one heap to floor, no stone; he thanks the hero and is gone', () => {
  let s = trapped({ x: 2, y: 2 });
  for (let i = 0; i < 3; i++) s = step(s, 'right');
  assert.equal(s.turn, 3);
  assert.equal(tileAt(s.room, 3, 2).id, 'floor');
  assert.equal(tileAt(s.room, 3, 1).id, 'rubble'); // the rest of the ring stays
  assert.deepEqual(s.room.chips, {});
  assert.deepEqual(s.bag, []);
  assert.deepEqual(s.people, []);
  assert.equal(shownLine(s).text, LINES.peddlerFreed.text);
  assert.deepEqual(s.events.filter((e) => e.type === 'free'), [{ type: 'free', id: 'peddler' }]);
  assert.deepEqual(s.taken, []); // never comes back
});

test('rubble with no one beside it is dug the same, with its own lines', () => {
  let s = { ...makeState(makeRoom(['#####', '#.U.#', '#####']), { x: 1, y: 1 }), people: [] };
  const lines = [];
  for (let i = 0; i < 3; i++) { s = step(s, 'right'); lines.push(shownLine(s).text); }
  assert.deepEqual(lines, ['You pull rocks off the heap.', 'The heap shifts.', 'The rubble falls away.']);
  assert.deepEqual(s.hero, { x: 1, y: 1 });
  assert.equal(tileAt(s.room, 2, 1).id, 'floor');
});

test('walking into him is a word from him, free, and he stays where he is', () => {
  const s = { ...makeState(makeRoom(['#####', '#...#', '#####']), { x: 1, y: 1 }), people: [{ id: 'peddler', x: 2, y: 1 }] };
  const bumped = step(s, 'right');
  assert.deepEqual(bumped.hero, { x: 1, y: 1 });
  assert.equal(bumped.turn, s.turn);
  assert.equal(shownLine(bumped).text, LINES.peddlerCalls.texts[0]);
});

test('his room keeps him when left and gone back to, and a kept journey keeps him', () => {
  const seed = 7, id = peddlerRoom(seed), there = goToPlace(makeWorld('first', seed), id);
  assert.equal(there.people[0].id, 'peddler');
  const away = goToPlace(there, 'first');
  assert.deepEqual(away.people, []);
  assert.deepEqual(away.elsewhere[id].people, there.people);
  assert.deepEqual(goToPlace(away, id).people, there.people);
  assert.deepEqual(readJourney(journeyText(there)).state.people, there.people);
});

test('a format 8 save gets an empty people list in every room, a room seen staying as it was', () => {
  const old = { place: 'first', elsewhere: { depth3: { room: 1, items: [] } } };
  const up = upgradeState(8, old);
  assert.deepEqual(up.people, []);
  assert.deepEqual(up.elsewhere.depth3, { room: 1, items: [], people: [] });
});
