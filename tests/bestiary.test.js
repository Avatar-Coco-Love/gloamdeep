// § bestiary: the Journal's Bestiary tab, the creatures met and beaten (D-350, D-352, D-630)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS } from '../src/core/room.js';
import { makeState, step, wait, switchLantern, FIRST_START } from '../src/core/turn.js';
import { meet, booked, bestiaryRows, bestiaryWords, pageOf, pageWords, movePickRow, HINT } from '../src/core/bestiary.js';
import { newProfile, unpackProfiles } from '../src/core/profile.js';
import { journalAt, bestiaryTables } from '../src/render/journal.js';
import { cardAt } from '../src/render/bag.js';

const room = makeRoom(FIRST_ROOM);
const with1 = (e) => makeState(room, FIRST_START, FIRST_LIGHTS, [e]);
const meets = (s) => s.events.filter((e) => e.type === 'meet');

test('a creature lit is met once: marked, with a meet event (D-630)', () => {
  const s = meet(with1({ id: 'rat', x: FIRST_START.x, y: FIRST_START.y - 2, health: 2 }));
  assert.deepEqual(meets(s), [{ type: 'meet', id: 'rat' }]);
  assert.equal(s.enemies[0].met, true);
  assert.equal(meet({ ...s, events: [] }).events.length, 0, 'not again');
});

test('one in disguise is not met: a mimic asleep, a snapcap shut away from the hero', () => {
  const near = { x: FIRST_START.x, y: FIRST_START.y - 2 };
  assert.equal(meets(meet(with1({ id: 'flaskMimic', ...near, health: 3, asleep: true }))).length, 0);
  assert.equal(meets(meet(with1({ id: 'snapcap', ...near, health: 2 }))).length, 0);
  assert.equal(meets(meet(with1({ id: 'snapcap', x: FIRST_START.x, y: FIRST_START.y - 1, health: 2 }))).length, 1, 'beside it, it shows');
});

test('one in the dark is not met; a turn ends by meeting those lit', () => {
  const s = with1({ id: 'rat', x: FIRST_START.x, y: FIRST_START.y - 3, health: 2 });
  assert.equal(meets(meet(switchLantern(s))).length, 0);
  assert.ok(meets(wait(s)).length === 1);
});

test('one beaten unmet, in the dark, is met too', () => {
  const s = { ...with1({ id: 'rat', x: FIRST_START.x, y: FIRST_START.y - 1, health: 1 }), held: 'knife' };
  const beat = step(switchLantern(s), 'up').events.find((e) => e.type === 'beat');
  assert.deepEqual(beat, { type: 'beat', id: 'rat', unmet: true });
  assert.deepEqual(booked({}, [beat]), { rat: { met: 1, beaten: 1 } });
});

test('the book counts meets and beats, and a dev jump counts nothing', () => {
  const book = booked({}, [{ type: 'meet', id: 'rat' }, { type: 'meet', id: 'rat' }, { type: 'meet', id: 'bat' }, { type: 'beat', id: 'rat' }]);
  assert.deepEqual(book, { rat: { met: 2, beaten: 1 }, bat: { met: 1, beaten: 0 } });
  const same = {};
  assert.equal(booked(same, [{ type: 'step' }]), same);
  assert.equal(booked(same, [{ type: 'meet', id: 'rat' }], true), same);
});

test('the tab lists those met in the registry\'s order, and says so for the screen reader', () => {
  const book = { bat: { met: 1, beaten: 0 }, rat: { met: 3, beaten: 2 } };
  assert.deepEqual(bestiaryRows(book).map((r) => r.name), ['Rat', 'Bat']);
  assert.equal(bestiaryWords(book), 'Journal, Bestiary tab. Rat, 3 met, 2 beaten. Bat, 1 met, 0 beaten. Picked, Rat. Up or Down picks another, Enter opens its page. Left for Growth. Esc or the close button goes back.');
  assert.match(bestiaryWords(book, 1), /Picked, Bat\./);
  assert.equal(bestiaryWords({}), 'Journal, Bestiary tab. No creatures met yet. Left for Growth. Esc or the close button goes back.');
});

test('the profile keeps the book; a sixth-format one comes up with none met', () => {
  assert.deepEqual(newProfile().bestiary, {});
  const records = { deepest: 0, beaten: 0, falls: 0, found: 0, steps: 0, poured: 0, torches: 0 };
  const old = { format: 6, profiles: { current: 0, slots: [{ name: '', look: {}, records, played: 0 }, null, null] } };
  assert.deepEqual(unpackProfiles(old).slots[0].bestiary, {});
  const bad = { format: 7, profiles: { current: 0, slots: [{ name: '', look: {}, records, played: 0, bestiary: { rat: { met: -1, beaten: 0 } } }, null, null] } };
  assert.equal(unpackProfiles(bad), null);
});

test('the Bestiary tab is tapped as the others; all twelve fit upright in one table, sideways in two', () => {
  const card = cardAt(176, 370);
  assert.equal(bestiaryTables(card, 12).xs.length, 1);
  assert.equal(bestiaryTables(cardAt(390, 208), 12).xs.length, 2);
  const tabs = [...Array(card.w).keys()].map((x) => journalAt(card.x + x, card.y + 32, 176, 370)).filter((a) => a?.tab).map((a) => a.tab);
  assert.equal(tabs.at(-1), 'bestiary');
});

// § pages (D-352, D-631): how it acts shows once one is beaten, before that a grey hint
test('a page says how the creature acts once one is beaten, and a hint before', () => {
  const book = { bat: { met: 1, beaten: 0 }, rat: { met: 3, beaten: 2 } };
  assert.deepEqual(pageOf(book, 'bat'), { id: 'bat', name: 'Bat', counts: '1 met, 0 beaten', known: false, acts: HINT, skilled: false, fights: 'Beat 3 to learn how to fight it.' });
  assert.equal(pageOf(book, 'rat').acts, 'Comes at you once it sees you in the light. Hurt, it often turns and runs.');
  assert.equal(pageWords(book, 'rat'), 'Journal, Bestiary, Rat. 3 met, 2 beaten. Comes at you once it sees you in the light. Hurt, it often turns and runs. How to fight it: Beat 1 more to learn how to fight it. Esc or the close button goes back to the Bestiary.');
  assert.equal(HINT, 'Beat one to learn how it acts.');
});

// § fighting (D-352, D-632): how to fight it once 3 are beaten, before that a grey count down
test('a page says how to fight the creature once 3 are beaten, counting down before', () => {
  const at = (beaten) => pageOf({ mole: { met: 5, beaten } }, 'mole');
  assert.equal(at(1).fights, 'Beat 2 more to learn how to fight it.');
  assert.equal(at(2).fights, 'Beat 1 more to learn how to fight it.');
  assert.equal(at(2).skilled, false);
  assert.equal(at(3).skilled, true);
  assert.equal(at(3).fights, 'Four lantern swings or two knife blows. Wait for it to come to you, and start with your hearts full.');
  assert.equal(at(4).fights, at(3).fights);
});

test('Up and Down pick a row inside the rows met; a tap on a row picks its page', () => {
  const book = { rat: { met: 1, beaten: 0 }, bat: { met: 1, beaten: 0 }, mole: { met: 1, beaten: 1 } };
  assert.equal(movePickRow(book, 0, -1), 0);
  assert.equal(movePickRow(book, 1, 1), 2);
  assert.equal(movePickRow(book, 2, 1), 2);
  const card = cardAt(176, 370);
  assert.deepEqual(journalAt(card.x + 30, card.y + 62 + 18 + 5, 176, 370, 'bestiary', null, null, book), { beast: 1 });
  assert.equal(journalAt(card.x + 30, card.y + 62 + 18 * 3 + 5, 176, 370, 'bestiary', null, null, book), null);
  assert.equal(journalAt(card.x + 30, card.y + 62 + 5, 176, 370, 'bestiary', null, null, book, 'rat'), null);
});
