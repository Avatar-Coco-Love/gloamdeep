// § goals (D-705, D-706): the first teaching goal, "Beat a rat", its reward and the Quests tab
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GOALS, REWARDS, GOLD_TURNS, NONE, rewardText, rollReward, payInto, goalsAfter, goalLine, doneWords, questRows, questsWords } from '../src/core/goals.js';
import { unpackProfiles, newProfile, FORMAT } from '../src/core/profile.js';
import { glintsLeft } from '../src/core/feats.js';
import { LINES } from '../src/core/lines.js';
import { goalSize, onGoal } from '../src/render/goalline.js';

const base = { seed: 7, turn: 10, bag: [], items: [], hero: { x: 3, y: 4 } };
const meet = { type: 'meet', id: 'rat' }, beat = { type: 'beat', id: 'rat' };

test('the first goal and the rewards are D-706\'s words and chances', () => {
  assert.deepEqual(GOALS.map((g) => [g.goal, g.how]), [['Beat a rat', 'Walk into it to strike.']]);
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
  assert.equal(goalLine(after.goals, gold, 13), null);
  assert.equal(goalsAfter(after.goals, 0, {}, [beat], base).goals, after.goals, 'done once only');
});

test('a rat beaten before goals came is ticked and paid quietly (D-705)', () => {
  const after = goalsAfter({}, 0, { rat: { met: 4, beaten: 2 } }, [], base);
  assert.equal(after.goals.rat.done, true);
  assert.deepEqual(after.done, []);
});

test('the Quests tab lists each goal, the done one with its reward, or says none yet', () => {
  assert.deepEqual(questRows({}), []);
  assert.match(questsWords({}), /^Journal, Quests tab\. No goals yet\. /);
  assert.deepEqual(questRows({ rat: { done: true, paid: 'flask' } }), [{ id: 'rat', goal: 'Beat a rat', how: 'Walk into it to strike.', done: true, reward: '+1 Oil flask' }]);
  assert.match(questsWords({ rat: { done: false } }), /Beat a rat\. Walk into it to strike\./);
});

test('profiles gain goals and goal Glints, and goal Glints count toward looks', () => {
  assert.equal(FORMAT, 9);
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
