// § peddler: the first person, trapped in a ring of rubble in one room of depth 3 that
// the seed picks; the rubble dug, he calls out, and one heap cleared frees him
// (step 12a, D-490; step 12b, D-491); freed, he waits a little, then goes home (D-496)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, peddlerRoom, makeRoom, tileAt, PEDDLER_DEPTH } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { get, byKind } from '../src/core/registry.js';
import { makeState, makeWorld, step, wait } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { endTurn } from '../src/core/endturn.js';
import { passTurn } from '../src/core/state.js';
import { send } from '../src/core/homeward.js';
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

test('digging the rubble around him, he calls out first, then cheers the digging on, a turn each', () => {
  const s = trapped({ x: 2, y: 2 }), bumped = step(s, 'right');
  assert.equal(bumped.turn, s.turn + 1);
  assert.equal(bumped.room.chips['3,2'], 1);
  assert.equal(shownLine(bumped).text, LINES.peddlerCalls.texts[0]);
  const two = step(bumped, 'right');
  assert.equal(shownLine(two).text, LINES.peddlerDigging.texts[0]);
  assert.equal(shownLine(step({ ...two, hero: { x: 2, y: 1 } }, 'right')).text, LINES.peddlerDigging.texts[1]); // another heap, his lines taking turns
  const corner = step({ ...trapped({ x: 2, y: 1 }) }, 'right'); // the rubble at a corner of the ring
  assert.equal(shownLine(corner).text, LINES.peddlerCalls.texts[0]);
});

const freed = () => { let s = trapped({ x: 2, y: 2 }); for (let i = 0; i < 3; i++) s = step(s, 'right'); return s; };

test('the third bump clears one heap to floor, no stone; he thanks the hero and stays', () => {
  const s = freed();
  assert.equal(s.turn, 3);
  assert.equal(tileAt(s.room, 3, 2).id, 'floor');
  assert.equal(tileAt(s.room, 3, 1).id, 'rubble'); // the rest of the ring stays
  assert.deepEqual(s.room.chips, {});
  assert.deepEqual(s.bag, []);
  assert.deepEqual(s.people, [{ id: 'peddler', x: 4, y: 2, leaves: 8 }]);
  assert.equal(shownLine(s).text, LINES.peddlerFreed.text);
  assert.deepEqual(s.events.filter((e) => e.type === 'free'), [{ type: 'free', id: 'peddler' }]);
  assert.deepEqual(s.taken, []); // never comes back
});

test('left alone 5 turns, he says goodbye and is gone, a leave event where he stood', () => {
  let s = freed();
  for (let i = 0; i < 4; i++) s = wait(s);
  assert.equal(s.people.length, 1);
  s = wait(s);
  assert.deepEqual(s.people, []);
  assert.equal(shownLine(s).text, LINES.peddlerLeaving.text);
  assert.deepEqual(s.events.filter((e) => e.type === 'leave'), [{ type: 'leave', id: 'peddler', x: 4, y: 2 }]);
});

test('bumped while he waits, he talks, free, his lines taking turns, and stays 3 turns more', () => {
  let s = step(freed(), 'right'); // into the cleared gap
  const one = step(s, 'right'), two = step(one, 'right');
  assert.equal(one.turn, s.turn);
  assert.deepEqual(one.hero, s.hero);
  assert.equal(shownLine(one).text, LINES.peddlerWaiting.texts[0]);
  assert.equal(shownLine(two).text, LINES.peddlerWaiting.texts[1]);
  assert.equal(two.people[0].leaves, s.turn + 3);
  s = wait(wait(two));
  assert.equal(s.people.length, 1);
  assert.deepEqual(wait(s).people, []);
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

// § home: freed, he stands at once in the woods beside their middle, with his own lines (step 12c, D-492)
test('gone, he stands at once at home in the woods, on an open tile beside the middle', () => {
  for (const seed of SEEDS.slice(0, 10)) {
    let s = { ...makeWorld('first', seed), ...trapped({ x: 2, y: 2 }), seed, elsewhere: makeWorld('first', seed).elsewhere };
    for (let i = 0; i < 3; i++) s = step(s, 'right');
    for (let i = 0; i < 5; i++) s = wait(s);
    const [him] = s.elsewhere.woods.people, room = s.elsewhere.woods.room, mid = { x: room.cols >> 1, y: room.rows >> 1 };
    assert.equal(him.id, 'peddler');
    assert.equal(him.home, true);
    assert.equal(him.leaves, undefined);
    assert.notDeepEqual({ x: him.x, y: him.y }, mid, `seed ${seed}`);
    assert.equal(tileAt(room, him.x, him.y).solid, false);
    assert.ok(Math.abs(him.x - mid.x) + Math.abs(him.y - mid.y) <= 3, `seed ${seed} is near the middle`);
    const home = goToPlace(s, 'woods');
    assert.deepEqual(home.people, [him]);
    assert.deepEqual(readJourney(journeyText(home)).state.people, [him]);
  }
});

test('the hero leaving the room first, he goes home anyway, saying nothing', () => {
  const seed = 7, id = peddlerRoom(seed), there = goToPlace(makeWorld('first', seed), id);
  const s = { ...there, people: [{ ...there.people[0], leaves: there.turn + 5 }] };
  const away = endTurn(s, passTurn(goToPlace(s, 'first'))); // as stairs do, a turn passing
  assert.deepEqual(away.elsewhere[id].people, []);
  assert.equal(away.elsewhere.woods.people[0].home, true);
  const outside = send(goToPlace(s, 'woods'), id); // Go outside: he is there
  assert.equal(outside.people[0].id, 'peddler');
  assert.deepEqual(outside.elsewhere[id].people, []);
});

test('at home a bump says his home lines in turn, free', () => {
  const s = { ...makeState(makeRoom(['#####', '#...#', '#####']), { x: 1, y: 1 }), people: [{ id: 'peddler', x: 2, y: 1, home: true }] };
  const one = step(s, 'right'), two = step(one, 'right');
  assert.equal(one.turn, s.turn);
  assert.equal(shownLine(one).text, LINES.peddlerHome.texts[0]);
  assert.equal(shownLine(two).text, LINES.peddlerHome.texts[1]);
});

// § beam home: gone home, he beams in when the hero next comes, and greets the hero once, near (D-496)
test('gone home, he beams in as the hero comes into the woods, an arrive event where he stands', () => {
  const seed = 7, id = peddlerRoom(seed), there = goToPlace(makeWorld('first', seed), id);
  const s = { ...there, people: [{ ...there.people[0], leaves: there.turn + 5 }] };
  const away = endTurn(s, passTurn(goToPlace(s, 'first')));
  assert.equal(away.elsewhere.woods.people[0].arrives, true);
  const home = endTurn(away, passTurn(goToPlace(away, 'woods')));
  const [him] = home.people;
  assert.equal(him.arrives, undefined);
  assert.deepEqual(home.events.filter((e) => e.type === 'arrive'), [{ type: 'arrive', id: 'peddler', x: him.x, y: him.y }]);
  assert.equal(wait(home).events.some((e) => e.type === 'arrive'), false);
});

test('at home he greets the hero once, the hero within 2 tiles', () => {
  const s = { ...makeState(makeRoom(['########', '#......#', '########']), { x: 3, y: 1 }), people: [{ id: 'peddler', x: 6, y: 1, home: true }] };
  const far = wait(s);
  assert.equal(far.people[0].greeted, undefined);
  const near = step(far, 'right'), again = step(step(near, 'left'), 'right');
  assert.equal(near.people[0].greeted, true);
  assert.equal(shownLine(near).text, LINES.peddlerGreets.text);
  assert.equal(again.events.some((e) => e.type === 'arrive'), false);
  assert.notEqual(again.line.turn, again.turn);
});

// § corners: a corner heap cleared opens no way to him, so it doesn't free him (D-498)
test('a corner heap cleared does not free him; he cheers on, and a side heap frees him', () => {
  const room = makeRoom(['#######', '#.....#', '#.UUU.#', '#.U.U.#', '#.UUU.#', '#.....#', '#######']);
  let s = { ...makeState(room, { x: 1, y: 2 }), people: [{ id: 'peddler', x: 3, y: 3 }] };
  for (let i = 0; i < 3; i++) s = step(s, 'right');
  assert.equal(s.people[0].leaves, undefined);
  assert.equal(shownLine(s).text, LINES.rubbleClear.text);
  s = step(step(s, 'down'), 'right');
  assert.ok(LINES.peddlerDigging.texts.includes(shownLine(s).text));
  s = step(step(s, 'right'), 'right');
  assert.equal(s.people[0].leaves, s.turn + 5);
  assert.equal(shownLine(s).text, LINES.peddlerFreed.text);
});
