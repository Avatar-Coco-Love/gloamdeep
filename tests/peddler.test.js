// § peddler: the first person, trapped in a ring of rubble in one room of depth 3 that
// the seed picks; the rubble dug, he calls out, and one heap cleared frees him
// (step 12a, D-490; step 12b, D-491); freed, he waits a little, then goes home (D-496)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, peddlerRoom, makeRoom, tileAt, PEDDLER_DEPTH } from '../src/core/room.js';
import { layoutAt, cellOf } from '../src/core/region.js';
import { get, byKind } from '../src/core/registry.js';
import { makeState, makeWorld, step, wait } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { endTurn } from '../src/core/endturn.js';
import { passTurn } from '../src/core/state.js';
import { send, goHome } from '../src/core/homeward.js';
import { stoneHome } from '../src/core/mouth.js';
import { dig } from '../src/core/rescue.js';
import { shownLine, LINES } from '../src/core/lines.js';
import { readJourney, journeyText, UPGRADES } from '../src/core/save.js';

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
    assert.ok(around.filter((ch) => ch === 'U').length >= 4, `seed ${seed}`);
  }
});

test('his spot: a wall on one straight side at most, and nothing on or around him, things moved aside (D-586)', () => {
  for (let seed = 1; seed <= 300; seed++) {
    const p = placeFor(peddlerRoom(seed), seed), [him] = p.people, near = (o) => Math.abs(o.x - him.x) <= 1 && Math.abs(o.y - him.y) <= 1;
    assert.ok([[0, -1], [-1, 0], [1, 0], [0, 1]].filter(([dx, dy]) => p.map[him.y + dy][him.x + dx] === '#').length <= 1, `seed ${seed}`);
    assert.ok(![p.start, ...p.items, ...p.enemies].filter(Boolean).some(near), `seed ${seed}`);
    for (const o of [...p.items, ...p.enemies]) assert.equal(p.map[o.y][o.x], '.', `seed ${seed} ${o.id}`);
    const at = [...p.items, ...p.enemies].map((o) => `${o.x},${o.y}`);
    assert.equal(new Set(at).size, at.length, `seed ${seed}: two things on one tile`);
  }
});

test('every journey has him: his room is made again until his ring fits, even the one-cell rooms (D-580, D-645)', () => {
  for (let seed = 1; seed <= 300; seed++) {
    const p = placeFor(peddlerRoom(seed), seed);
    assert.deepEqual(p.people.map((q) => q.id), ['peddler'], `seed ${seed}`);
    const c = cellOf(seed, peddlerRoom(seed), 3);
    assert.deepEqual([p.map[0].length, p.map.length], [c.cols, c.rows], `seed ${seed}`); // the room itself, a cell or more (D-645), not the fallback
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

test('walls in his ring are not cleared heaps: with walls round him he still calls out first (D-668)', () => {
  const walled = ['#######', '#..#UU#', '#..U.U#', '#..UUU#', '#######']; // a wall at one corner of his ring, as in most seeds
  const s = { ...makeState(makeRoom(walled), { x: 2, y: 2 }), people: [{ id: 'peddler', x: 4, y: 2 }] }, bumped = step(s, 'right');
  assert.equal(shownLine(bumped).text, LINES.peddlerCalls.texts[0]);
  assert.equal(shownLine(step(bumped, 'right')).text, LINES.peddlerDigging.texts[0]);
  for (const seed of SEEDS) { // and so in every seed's own room, at any heap of his ring
    const p = placeFor(peddlerRoom(seed), seed), [him] = p.people, room = makeRoom(p.map);
    const [dx, dy] = AROUND.find(([x, y]) => p.map[him.y + y][him.x + x] === 'U'), state = { ...makeState(room, p.start), people: p.people };
    assert.equal(shownLine(dig(state, him.x + dx, him.y + dy)).text, LINES.peddlerCalls.texts[0], `seed ${seed}`);
  }
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

test('once freed, another heap beside him digs as plain rubble: no second thank-you, his wait untouched (D-678)', () => {
  let s = freed(); // freed at turn 3, leaving at turn 8
  const lines = [];
  for (let i = 0; i < 3; i++) { s = dig(s, 4, 1); lines.push(shownLine(s).text); } // the heap straight above him
  assert.equal(tileAt(s.room, 4, 1).id, 'floor');
  assert.deepEqual(lines, [LINES.rubbleDig, LINES.rubbleShift, LINES.rubbleClear].map((l) => l.text ?? l.texts[0]));
  assert.deepEqual(s.people, [{ id: 'peddler', x: 4, y: 2, leaves: 8 }]);
  assert.deepEqual(s.events.filter((e) => e.type === 'free'), []);
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
  s = wait(wait(wait(s))); // turn 7, he would go at 8
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

test('bumped at once, he never goes sooner than his 5 turns (H-59, D-878)', () => {
  const s = step(freed(), 'right'), bumped = step(s, 'right'); // turn 4, he goes at 8
  assert.equal(bumped.people[0].leaves, 8);
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
  const up = UPGRADES[8](old); // its own step, 8 → 9
  assert.deepEqual(up.people, []);
  assert.deepEqual(up.elsewhere.depth3, { room: 1, items: [], people: [] });
});

// § home: freed, he stands at once by the home waystone, beside its room's middle, with his own lines (step 12c, D-492, D-855)
test('gone, he stands at once at home in the waystone\'s room, on an open tile beside the middle, off the stone (B-001)', () => {
  for (const seed of SEEDS.slice(0, 10)) {
    let s = { ...makeWorld('first', seed), ...trapped({ x: 2, y: 2 }), seed, elsewhere: makeWorld('first', seed).elsewhere };
    for (let i = 0; i < 3; i++) s = step(s, 'right');
    for (let i = 0; i < 5; i++) s = wait(s);
    const at = stoneHome(seed), [him] = s.elsewhere[at].people, room = s.elsewhere[at].room, mid = { x: room.cols >> 1, y: room.rows >> 1 };
    assert.equal(him.id, 'peddler');
    assert.equal(him.home, true);
    assert.equal(him.leaves, undefined);
    assert.notDeepEqual({ x: him.x, y: him.y }, mid, `seed ${seed}`);
    assert.equal(tileAt(room, him.x, him.y).solid, false);
    assert.notEqual(tileAt(room, him.x, him.y).name, 'Waystone', `seed ${seed}: the way onto the stone stays clear`);
    assert.ok(Math.abs(him.x - mid.x) + Math.abs(him.y - mid.y) <= 3, `seed ${seed} is near the middle`);
    assert.equal(s.elsewhere.woods.people?.length ?? 0, 0, `seed ${seed}: not in Hearthwood's middle room`);
    const home = goToPlace(s, at);
    assert.deepEqual(home.people, [him]);
    assert.deepEqual(readJourney(journeyText(home)).state.people, [him]);
  }
});

test('the hero leaving the room first, he goes home anyway, saying nothing', () => {
  const seed = 7, id = peddlerRoom(seed), there = goToPlace(makeWorld('first', seed), id);
  const s = { ...there, people: [{ ...there.people[0], leaves: there.turn + 5 }] };
  const away = endTurn(s, passTurn(goToPlace(s, 'first'))); // as stairs do, a turn passing
  assert.deepEqual(away.elsewhere[id].people, []);
  assert.equal(away.elsewhere[stoneHome(seed)].people[0].home, true);
  const outside = send(goToPlace(s, stoneHome(seed)), id); // the hero already home: he is there
  assert.equal(outside.people[0].id, 'peddler');
  assert.deepEqual(outside.elsewhere[id].people, []);
});

// § home spot (H-58, D-878): never on the hero's tile nor a creature's
test('his home spot skips the hero\'s tile and a creature\'s, taking the next open one', () => {
  for (const seed of [3, 7, 11]) {
    const home = goToPlace(makeWorld('first', seed), stoneHome(seed));
    const at = (s) => s.people.find((p) => p.id === 'peddler');
    const first = at(goHome(home, 'peddler'));
    const heroThere = at(goHome({ ...home, hero: { x: first.x, y: first.y } }, 'peddler'));
    assert.notDeepEqual([heroThere.x, heroThere.y], [first.x, first.y], `seed ${seed}: not on the hero`);
    const foe = { id: 'mole', x: first.x, y: first.y, hp: 1 };
    const away = goToPlace(home, 'first'), kept = away.elsewhere[stoneHome(seed)];
    const withFoe = { ...away, elsewhere: { ...away.elsewhere, [stoneHome(seed)]: { ...kept, enemies: [...(kept.enemies || []), foe] } } };
    const him = goHome(withFoe, 'peddler').elsewhere[stoneHome(seed)].people.find((p) => p.id === 'peddler');
    assert.notDeepEqual([him.x, him.y], [first.x, first.y], `seed ${seed}: not on a creature`);
  }
});

test('at home a bump says his home lines in turn, free', () => {
  const s = { ...makeState(makeRoom(['#####', '#...#', '#####']), { x: 1, y: 1 }), people: [{ id: 'peddler', x: 2, y: 1, home: true }] };
  const one = step(s, 'right'), two = step(one, 'right');
  assert.equal(one.turn, s.turn);
  assert.equal(shownLine(one).text, LINES.peddlerHome.texts[0]);
  assert.equal(shownLine(two).text, LINES.peddlerHome.texts[1]);
});

test('at home, selling, he never says he will have wares soon; the third bump says the first line again (D-684)', () => {
  assert.equal(LINES.peddlerHome.texts.some((t) => /wares soon/.test(t)), false);
  const s = { ...makeState(makeRoom(['#####', '#...#', '#####']), { x: 1, y: 1 }), people: [{ id: 'peddler', x: 2, y: 1, home: true }] };
  const three = step(step(step(s, 'right'), 'right'), 'right');
  assert.equal(shownLine(three).text, LINES.peddlerHome.texts[0]);
  const old = { ...s, line: { id: 'peddlerHome', turn: s.turn, i: 2 } }; // an old save, mid-line on the dropped third
  assert.equal(shownLine(old).text, LINES.peddlerHome.texts[0]);
});

// § beam home: gone home, he beams in when the hero next comes, and greets the hero once, near (D-496)
test('gone home, he beams in as the hero comes into the waystone\'s room, an arrive event where he stands', () => {
  const seed = 7, id = peddlerRoom(seed), there = goToPlace(makeWorld('first', seed), id);
  const s = { ...there, people: [{ ...there.people[0], leaves: there.turn + 5 }] };
  const away = endTurn(s, passTurn(goToPlace(s, 'first')));
  assert.equal(away.elsewhere[stoneHome(seed)].people[0].arrives, true);
  const home = endTurn(away, passTurn(goToPlace(away, stoneHome(seed))));
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
