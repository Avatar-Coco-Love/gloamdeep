// § goals (D-705, D-706): the first teaching goal, "Beat a rat", its reward and the Quests tab
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GOALS, NEAR, REWARDS, GOLD_TURNS, NONE, rewardText, howOf, rollReward, payInto, goalsAfter, goalLine, doneWords, questRows, questsWords } from '../src/core/goals.js';
import { unpackProfiles, newProfile, FORMAT } from '../src/core/profile.js';
import { glintsLeft } from '../src/core/feats.js';
import { LINES } from '../src/core/lines.js';
import { goalSize, onGoal } from '../src/render/goalline.js';
import { xpFor } from '../src/core/xp.js';
import { addHeart, addTough } from '../src/core/growth.js';

const base = { seed: 7, turn: 10, bag: [], items: [], hero: { x: 3, y: 4 }, place: 'first', found: ['first'] };
const meet = { type: 'meet', id: 'rat' }, beat = { type: 'beat', id: 'rat' };

test('the first goal and the rewards are D-706\'s words and chances', () => {
  assert.deepEqual(GOALS.map((g) => [g.goal, howOf(g, 'first'), howOf(g, 'depth3')]), [['Beat a rat', 'Walk into it to strike.', 'Walk into it to strike.'], ['Go home to the woods', 'Leave by the gap in the crypt wall.', 'Take the stairs up to the crypt.'], ['Find the waystone', 'Old standing stones, near home.', 'Old standing stones, near home.'], ['Wake the waystone', 'Step on the plate in its middle.', 'Step on the plate in its middle.'], ['Take a boon', 'Step back on the plate. Pick 1 of 3.', 'Step back on the plate. Pick 1 of 3.'], ['Light your lantern', 'Tap the lantern, or press L.', 'Tap the lantern, or press L.'], ['Spend your ember', 'Tap here, then Growth.', 'Tap here, then Growth.']]);
  assert.equal(REWARDS.reduce((a, r) => a + r.chance, 0), 100);
  assert.deepEqual(REWARDS.map((r) => rewardText(r.id)), ['+1 Oil flask', '+2 Healing herbs', '+3 Oilcaps', '+1 Glint', '+1 Healing potion']);
  assert.equal(GOLD_TURNS, 3);
  assert.equal(NONE, 'No goals yet.');
  assert.equal(LINES.goalDone.text, 'Goal done: {n}.');
});

test('the roll follows the seed, and over many turns each reward comes near its chance', () => {
  assert.equal(rollReward(base), rollReward({ ...base }));
  const n = {};
  for (let t = 0; t < 4000; t++) { const id = rollReward({ ...base, turn: t }); n[id] = (n[id] ?? 0) + 1; }
  for (const r of REWARDS) assert.ok(Math.abs(n[r.id] / 40 - r.chance) < 4, `${r.id} ${n[r.id] / 40}`);
});

test('a find goes in the bag; what doesn\'t fit is set at the hero\'s feet; a Glint changes no state', () => {
  assert.deepEqual(payInto(base, 'herb').bag, [{ id: 'herb', n: 2 }]);
  const full = { ...base, bag: Array.from({ length: 6 }, () => ({ id: 'stone', n: 99 })) };
  const s = payInto(full, 'oilcap');
  assert.equal(s.bag, full.bag);
  assert.deepEqual(s.items, [{ id: 'oilcap', n: 3, x: 3, y: 4, dropped: true }]);
  assert.equal(payInto(base, 'glint'), base);
});

test('the goal shows once a rat is seen, and not before', () => {
  assert.deepEqual(goalsAfter({}, 0, {}, [], base).goals, {});
  const seen = goalsAfter({}, 0, { rat: { met: 1, beaten: 0 } }, [meet], base);
  assert.deepEqual(seen.goals, { rat: { done: false } });
  assert.deepEqual(seen.done, []);
  assert.deepEqual(goalLine(seen.goals, null, 10), { id: 'rat', goal: 'Beat a rat', how: 'Walk into it to strike.', done: false });
});

test('beating a rat does the goal: the reward paid, the line gold for 3 turns, then gone', () => {
  const after = goalsAfter({ rat: { done: false } }, 0, { rat: { met: 1, beaten: 1 } }, [beat], base);
  const paid = after.goals.rat.paid;
  assert.deepEqual(after.done, ['rat']);
  assert.equal(after.goals.rat.done, true);
  assert.equal(after.glints, paid === 'glint' ? 1 : 0);
  if (paid !== 'glint') assert.notDeepEqual(after.state.bag, []);
  assert.equal(doneWords(after.goals, 'rat'), `Beat a rat. ${rewardText(paid)}`);
  const gold = { id: 'rat', until: 10 + GOLD_TURNS };
  assert.deepEqual(goalLine(after.goals, gold, 12), { id: 'rat', goal: 'Beat a rat', how: rewardText(paid), done: true });
  assert.equal(goalLine(after.goals, gold, 13).id, 'home', 'then the next goal shows');
  assert.equal(goalsAfter(after.goals, 0, {}, [beat], base).goals.rat, after.goals.rat, 'done once only');
});

test('a rat beaten before goals came is ticked and paid quietly (D-705)', () => {
  const after = goalsAfter({}, 0, { rat: { met: 4, beaten: 2 } }, [], base);
  assert.equal(after.goals.rat.done, true);
  assert.deepEqual(after.done, []);
});

test('going home shows once the rat goal is done, and is done in the woods (D-706)', () => {
  const ratDone = goalsAfter({ rat: { done: false } }, 0, { rat: { met: 1, beaten: 1 } }, [beat], base);
  assert.deepEqual(Object.keys(ratDone.goals), ['rat', 'home']);
  assert.deepEqual(ratDone.goals.home, { done: false });
  assert.deepEqual(ratDone.done, ['rat'], 'the rat goal is the one said');
  const later = { ...base, turn: 20 };
  assert.deepEqual(goalLine(ratDone.goals, null, 20, 'south'), { id: 'home', goal: 'Go home to the woods', how: 'Leave by the gap in the crypt wall.', done: false });
  assert.equal(goalLine(ratDone.goals, null, 20, 'second').how, 'Take the stairs up to the crypt.', 'deeper down, the stairs');
  assert.equal(goalsAfter(ratDone.goals, 0, {}, [], later).goals, ratDone.goals, 'not done in the crypt');
  const home = goalsAfter(ratDone.goals, 0, {}, [], { ...later, place: 'woods', found: ['first', 'woods'] });
  assert.deepEqual(home.done, ['home']);
  assert.equal(doneWords(home.goals, 'home'), `Go home to the woods. ${rewardText(home.goals.home.paid)}`);
  assert.deepEqual(questRows(home.goals).map((r) => r.id), ['stone', 'home', 'rat'], 'reaching the woods shows the waystone goal');
});

test('going home is not shown before the rat goal, and is ticked quietly if the woods were already walked to', () => {
  assert.equal(goalsAfter({}, 0, {}, [], { ...base, place: 'woods', found: ['first', 'woods'] }).goals.home, undefined);
  const after = goalsAfter({ rat: { done: true, paid: 'herb' } }, 0, {}, [], { ...base, found: ['first', 'woods'] });
  assert.equal(after.goals.home.done, true);
  assert.deepEqual(after.done, []);
});

// A woods room 17 wide with the home stone's plate at (8, 8), asleep ('Z') or woken ('A')
const woods = (plate = 'Z') => ({ map: Array.from({ length: 20 }, (_, y) => (y === 8 ? '........' + plate + '........' : '.'.repeat(17))) });
test('finding the waystone shows on reaching the woods, and is done within 4 tiles of its middle (D-709)', () => {
  assert.equal(NEAR, 4);
  const far = { ...base, place: 'woods', room: woods(), hero: { x: 8, y: 18 } };
  const shown = goalsAfter({}, 0, {}, [], far);
  assert.deepEqual(shown.goals.stone, { done: false }, 'shows, not done on arrival far off');
  assert.equal(goalsAfter({}, 0, {}, [], { ...base, room: woods() }).goals.stone, undefined, 'not in the crypt');
  assert.equal(goalsAfter(shown.goals, 0, {}, [], { ...far, hero: { x: 3, y: 13 } }).goals, shown.goals, '5 tiles off is not yet');
  const found = goalsAfter(shown.goals, 0, {}, [], { ...far, hero: { x: 12, y: 12 } });
  assert.deepEqual(found.done, ['stone']);
  assert.equal(doneWords(found.goals, 'stone'), `Find the waystone. ${rewardText(found.goals.stone.paid)}`);
});

test('finding the waystone is ticked quietly when its plate is woken already (D-709)', () => {
  const after = goalsAfter({}, 0, {}, [], { ...base, place: 'woods', room: woods('A'), hero: { x: 8, y: 18 } });
  assert.equal(after.goals.stone.done, true);
  assert.deepEqual(after.done, []);
});

test('waking the waystone shows once it is found, and is done on the step that wakes its plate (D-710)', () => {
  const near = { ...base, place: 'woods', room: woods(), hero: { x: 8, y: 11 } };
  const found = goalsAfter({ stone: { done: false } }, 0, {}, [], near);
  assert.deepEqual(found.done, ['stone']);
  assert.deepEqual(found.goals.wake, { done: false }, 'shows with the waystone found');
  assert.equal(goalLine(found.goals, { id: 'stone', until: base.turn + GOLD_TURNS }, base.turn).id, 'stone', 'the found goal stays gold first');
  assert.equal(goalLine(found.goals, null, base.turn).goal, 'Wake the waystone');
  assert.equal(goalsAfter(found.goals, 0, {}, [], { ...near, hero: { x: 8, y: 9 } }).goals, found.goals, 'not done beside the plate');
  const woke = goalsAfter(found.goals, 0, {}, [], { ...near, room: woods('A'), hero: { x: 8, y: 8 } });
  assert.deepEqual(woke.done, ['wake']);
  assert.equal(doneWords(woke.goals, 'wake'), `Wake the waystone. ${rewardText(woke.goals.wake.paid)}`);
});

test('waking the waystone is ticked quietly when it is woken already (D-710)', () => {
  const after = goalsAfter({}, 0, {}, [], { ...base, place: 'woods', room: woods('A'), hero: { x: 8, y: 18 } });
  assert.equal(after.goals.wake.done, true);
  assert.deepEqual(after.done, []);
});

test('taking a boon shows on stepping off the woken plate, and is done on the pick (D-711)', () => {
  const on = { ...base, place: 'woods', room: woods('A'), hero: { x: 8, y: 8 } }, off = { ...on, hero: { x: 8, y: 9 } };
  const done = { stone: { done: true, paid: 'flask' }, wake: { done: true, paid: 'flask' } };
  assert.equal(goalsAfter(done, 0, {}, [], off, off).goals.boon, undefined, 'not just standing near it');
  const shown = goalsAfter(done, 0, {}, [], off, on);
  assert.deepEqual(shown.goals.boon, { done: false });
  assert.equal(goalLine(shown.goals, null, base.turn).goal, 'Take a boon');
  assert.equal(goalsAfter(shown.goals, 0, {}, [], on, off).goals, shown.goals, 'the card closed by its cross leaves it waiting');
  const took = goalsAfter(shown.goals, 0, {}, [{ type: 'boon', id: 'wideGlow' }], { ...on, boon: 'wideGlow' }, on);
  assert.deepEqual(took.done, ['boon']);
  assert.equal(doneWords(took.goals, 'boon'), `Take a boon. ${rewardText(took.goals.boon.paid)}`);
});

test('a boon picked before the goal shows, or held from an older save, ticks it quietly (D-711)', () => {
  const on = { ...base, place: 'woods', room: woods('A'), hero: { x: 8, y: 8 }, boon: 'wideGlow' };
  const picked = goalsAfter({}, 0, {}, [{ type: 'boon', id: 'wideGlow' }], on, { ...on, boon: null });
  assert.equal(picked.goals.boon.done, true);
  assert.deepEqual(picked.done, []);
  const held = goalsAfter({}, 0, {}, [], { ...on, hero: { x: 8, y: 9 } }, on);
  assert.equal(held.goals.boon.done, true);
  assert.deepEqual(held.done, []);
  const home = { ...on, boon: null, hero: { x: 8, y: 9 } };
  assert.equal(goalsAfter(picked.goals, 0, {}, [], home, { ...home, hero: { x: 8, y: 8 } }).goals, picked.goals, 'held once, never shown again');
});

test('spending an ember shows at level 2, goes ahead of a goal waiting, and is done on the first buy (D-713)', () => {
  const one = { ...base, xp: xpFor(2) - 1 }, two = { ...base, xp: xpFor(2) };
  assert.equal(goalsAfter({}, 0, {}, [], one).goals.ember, undefined, 'not at level 1');
  const waiting = { rat: { done: false } }, shown = goalsAfter(waiting, 0, {}, [], two, one);
  assert.deepEqual(shown.goals.ember, { done: false });
  assert.equal(goalLine(shown.goals, null, base.turn, 'first', two).goal, 'Spend your ember', 'ahead of the rat');
  assert.equal(goalLine(shown.goals, null, base.turn, 'first', { ...base, xp: 0 }).goal, 'Beat a rat', 'not ahead with no ember to spend');
  assert.equal(goalLine(shown.goals, null, base.turn).goal, 'Beat a rat', 'the oldest without a journey');
  const bought = addHeart(two), did = goalsAfter(shown.goals, 0, {}, [], bought, two);
  assert.deepEqual(did.done, ['ember']);
  assert.equal(doneWords(did.goals, 'ember'), `Spend your ember. ${rewardText(did.goals.ember.paid)}`);
  assert.equal(goalLine(did.goals, null, base.turn, 'first', bought).goal, 'Beat a rat');
});

test('an ember spent already ticks spending one quietly (D-713)', () => {
  const tough = addTough({ ...base, xp: xpFor(3) }), quiet = goalsAfter({}, 0, {}, [], tough);
  assert.equal(quiet.goals.ember.done, true);
  assert.deepEqual(quiet.done, []);
  assert.deepEqual(goalsAfter({}, 0, {}, [], { ...base, xp: xpFor(3) }).goals.ember, { done: false }, 'past level 2, nothing spent: shown');
});

// § lighting the lantern (D-735): under the sky the room darkens halfway through dusk (turn 185 of
// 300); a room without sky is dark at any turn
const dusky = { ...base, room: { dark: { sky: true } }, lit: false };
const cave = { ...base, room: { dark: { sky: false } }, lit: false };
test('lighting the lantern shows when it gets dark, at dusk or below ground, and is done once lit (D-735)', () => {
  assert.equal(goalsAfter({}, 0, {}, [], { ...dusky, turn: 185 }).goals.lantern, undefined, 'still daylight');
  const dusk = goalsAfter({}, 0, {}, [], { ...dusky, turn: 186 }, { ...dusky, turn: 185 });
  assert.deepEqual(dusk.goals.lantern, { done: false });
  assert.deepEqual(goalLine(dusk.goals, null, 186), { id: 'lantern', goal: 'Light your lantern', how: 'Tap the lantern, or press L.', done: false });
  assert.deepEqual(goalsAfter({}, 0, {}, [], cave).goals.lantern, { done: false }, 'stepping into the dark with it off');
  const both = goalsAfter({ stone: { done: false } }, 0, {}, [], { ...dusky, turn: 186 }).goals;
  assert.equal(goalLine(both, null, 186, 'first', { ...dusky, turn: 186 }).goal, 'Light your lantern', 'ahead of the waystone in the dark');
  assert.equal(goalLine(both, null, 290, 'first', { ...dusky, turn: 290 }).goal, 'Find the waystone', 'not ahead by day');
  const lit = goalsAfter(dusk.goals, 0, {}, [], { ...dusky, turn: 186, lit: true }, { ...dusky, turn: 186 });
  assert.deepEqual(lit.done, ['lantern'], 'by hand: gold, paid');
  assert.equal(doneWords(lit.goals, 'lantern'), `Light your lantern. ${rewardText(lit.goals.lantern.paid)}`);
  const self = goalsAfter({}, 0, {}, [], { ...dusky, turn: 186, lit: true }, { ...dusky, turn: 185 });
  assert.deepEqual(self.done, ['lantern'], 'By itself at dusk: done in play too');
});

test('a lantern lit already when it gets dark ticks lighting it quietly (D-735)', () => {
  const early = goalsAfter({}, 0, {}, [], { ...dusky, turn: 186, lit: true }, { ...dusky, turn: 185, lit: true });
  assert.equal(early.goals.lantern.done, true);
  assert.deepEqual(early.done, []);
  const crypt = goalsAfter({}, 0, {}, [], { ...cave, lit: true });
  assert.equal(crypt.goals.lantern.done, true, 'a crypt start, lit from the first turn');
  assert.deepEqual(crypt.done, []);
});

test('the Quests tab lists each goal, the done one with its reward, or says none yet', () => {
  assert.deepEqual(questRows({}), []);
  assert.match(questsWords({}), /^Journal, Quests tab\. No goals yet\. /);
  assert.deepEqual(questRows({ rat: { done: true, paid: 'flask' } }), [{ id: 'rat', goal: 'Beat a rat', how: 'Walk into it to strike.', done: true, reward: '+1 Oil flask' }]);
  assert.match(questsWords({ rat: { done: false } }), /Beat a rat\. Walk into it to strike\./);
});

test('profiles gain goals and goal Glints, and goal Glints count toward looks', () => {
  assert.ok(FORMAT >= 9);
  const old = { format: 8, profiles: { current: 0, slots: [{ ...newProfile(), goals: undefined, glints: undefined }, null, null] } };
  delete old.profiles.slots[0].goals; delete old.profiles.slots[0].glints;
  const p = unpackProfiles(old).slots[0];
  assert.deepEqual([p.goals, p.glints], [{}, 0]);
  assert.equal(glintsLeft({ ...newProfile(), glints: 2 }), 2);
});

test('the goal line is as wide as its longest words, and taps on it are found', () => {
  const line = { goal: 'Beat a rat', how: 'Walk into it to strike.' }, { w, h } = goalSize(line);
  assert.deepEqual([w, h], [98, 23]);
  assert.ok(onGoal(line, 5, 40, 5, 40) && onGoal(line, 5, 40, 5 + w - 1, 40 + h - 1));
  assert.ok(!onGoal(line, 5, 40, 5 + w, 40) && !onGoal(null, 5, 40, 6, 41));
});
