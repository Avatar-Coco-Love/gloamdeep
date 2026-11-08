// § goals: teaching goals (D-705, D-706), the Quests tab's first kind of quest. A goal
// appears at its own moment, shows as a line under the hearts panel until done, then turns
// gold for GOLD_TURNS turns and pays a reward rolled from REWARDS, the seed picking. Goals live
// in the profile, { [id]: { done, paid? } } in the order they appeared; a goal already done in
// an older save is ticked and paid on the first turn, never shown. Plain data, no drawing.
import { rng, seedFor } from './rng.js';
import { bagAdd, bagSize } from './bag.js';
import { get } from './registry.js';

// Each goal: its words (D-706), and the creature seen that shows it and beaten that does it
export const GOALS = [
  { id: 'rat', goal: 'Beat a rat', how: 'Walk into it to strike.', seen: 'rat', beat: 'rat' },
];
// The rewards, each its chance in 100 (D-706); a Glint is kept on the profile (Claude's call)
export const REWARDS = [
  { id: 'flask', n: 1, chance: 30 },
  { id: 'herb', n: 2, chance: 25 },
  { id: 'oilcap', n: 3, chance: 20 },
  { id: 'glint', n: 1, chance: 15 },
  { id: 'potion', n: 1, chance: 10 },
];
export const GOLD_TURNS = 3; // the line stays gold this many turns once done (the owner's pick)
export const NONE = 'No goals yet.'; // the Quests tab with none shown (the owner's pick)
const SALT = 0x90a15;

export const goalOf = (id) => GOALS.find((g) => g.id === id);
// A reward's words: "+1 Oil flask", "+2 Healing herbs", "+1 Glint"
export function rewardText(id) {
  const r = REWARDS.find((x) => x.id === id);
  if (!r) return '';
  const name = r.id === 'glint' ? 'Glint' : get(r.id).name;
  return `+${r.n} ${name}${r.n > 1 ? 's' : ''}`;
}
// § roll: the reward, from the journey's seed and the turn
export function rollReward(state) {
  let left = rng(seedFor(state.seed ^ state.turn, SALT))() * 100;
  for (const r of REWARDS) { left -= r.chance; if (left < 0) return r.id; }
  return REWARDS[0].id;
}
// § pay: the state with a find's reward in the bag, or what doesn't fit set at the hero's feet
// (Claude's call); a Glint changes no state (the profile keeps it)
export function payInto(state, id) {
  const r = REWARDS.find((x) => x.id === id);
  if (!r || id === 'glint') return state;
  let bag = state.bag, n = 0;
  for (let more; n < r.n && (more = bagAdd(bag, id, undefined, bagSize(state))); n++) bag = more;
  const left = r.n - n, items = left ? [...state.items, { id, n: left, x: state.hero.x, y: state.hero.y, dropped: true }] : state.items;
  return { ...state, bag, items };
}

// § after a turn: the profile's goals, the state and its Glints after this action's events,
// with the Bestiary already counted. `done`: the goals done in play this turn, for the gold
// line and the text line; one done unseen in an older save is paid quietly.
export function goalsAfter(goals = {}, glints = 0, book = {}, events = [], state) {
  let next = goals, s = state, g = glints;
  const done = [];
  const finish = (goal, quiet) => {
    const paid = rollReward(s);
    next = { ...next, [goal.id]: { done: true, paid } };
    s = payInto(s, paid);
    if (paid === 'glint') g += 1;
    if (!quiet) done.push(goal.id);
  };
  for (const goal of GOALS) {
    const was = next[goal.id];
    if (was?.done) continue;
    const beatNow = events.some((e) => e.type === 'beat' && e.id === goal.beat);
    if (beatNow) finish(goal, false);
    else if (!was && (book[goal.beat]?.beaten ?? 0) > 0) finish(goal, true); // done before goals came
    else if (!was && (book[goal.seen]?.met ?? 0) > 0) next = { ...next, [goal.id]: { done: false } }; // seen, now or before
  }
  return { goals: next, glints: g, state: s, done };
}

// § the line under the panel: the goal waiting (the oldest), or one done in gold until its turns
// pass; null for none. gold: { id, until } from main.js.
export function goalLine(goals = {}, gold = null, turn = 0) {
  if (gold && turn < gold.until && goals[gold.id]?.done) {
    const g = goalOf(gold.id);
    return { id: g.id, goal: g.goal, how: rewardText(goals[g.id].paid), done: true };
  }
  const id = Object.keys(goals).find((k) => !goals[k].done && goalOf(k));
  return id ? { id, goal: goalOf(id).goal, how: goalOf(id).how, done: false } : null;
}
// The text line's words when a goal is done: "Beat a rat. +1 Oil flask"
export const doneWords = (goals, id) => `${goalOf(id).goal}. ${rewardText(goals[id].paid)}`;

// § the Quests tab's rows, newest first: { id, goal, how, done, reward }
export const questRows = (goals = {}) => Object.keys(goals).filter(goalOf).reverse()
  .map((id) => ({ id, goal: goalOf(id).goal, how: goalOf(id).how, done: !!goals[id].done, reward: goals[id].done ? rewardText(goals[id].paid) : '' }));
const TURN = 'Left or Right for another tab. Esc or the close button goes back.';
export function questsWords(goals) {
  const rows = questRows(goals);
  const said = rows.length ? rows.map((r) => (r.done ? `${r.goal}, done, ${r.reward}` : `${r.goal}. ${r.how}`)).join('. ') : NONE.replace(/\.$/, '');
  return `Journal, Quests tab. ${said}. ${TURN}`;
}
