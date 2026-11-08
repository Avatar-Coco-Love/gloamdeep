// § goals: teaching goals (D-705, D-706, D-710, D-711), the Quests tab's first kind of quest. A goal
// appears at its own moment, shows as a line under the hearts panel until done, then turns
// gold for GOLD_TURNS turns and pays a reward rolled from REWARDS, the seed picking. Goals live
// in the profile, { [id]: { done, paid? } } in the order they appeared; a goal already done in
// an older save is ticked and paid on the first turn, never shown. Plain data, no drawing.
import { rng, seedFor } from './rng.js';
import { bagAdd, bagSize } from './bag.js';
import { get } from './registry.js';
import { HOME } from './boon.js';
import { depthOf, tileAt } from './room.js';

// Each goal: its words (D-706), how either words or words by the place the hero is in, and three tests of what happened, c = { goals, book, events, state, before }:
// shows, its moment come; before, done before it could show (paid quietly); does, done now
export const NEAR = 4; // "Find the waystone" is done this many tiles from its middle, or nearer (the owner's pick)
// Where the home waystone's plate is in the woods ('Z' asleep, 'A' woken), or null
function plateAt(state, letters = 'ZA') {
  if (state.place !== HOME) return null;
  const map = state.room?.map || [];
  for (let y = 0; y < map.length; y++) for (let x = 0; x < map[y].length; x++) if (letters.includes(map[y][x])) return { x, y };
  return null;
}
const nearStone = (state) => { const at = plateAt(state); return !!at && Math.max(Math.abs(at.x - state.hero.x), Math.abs(at.y - state.hero.y)) <= NEAR; };
// The hero stepped off the woken home plate this turn
const steppedOff = (c) => c.state.place === HOME && c.before.place === HOME
  && (c.state.hero.x !== c.before.hero.x || c.state.hero.y !== c.before.hero.y)
  && tileAt(c.before.room, c.before.hero.x, c.before.hero.y).id === 'wokenPlate';
const picked = (c) => c.events.some((e) => e.type === 'boon');
const beats = (c, id) => c.events.filter((e) => e.type === 'beat' && e.id === id).length;
export const GOALS = [
  { id: 'rat', goal: 'Beat a rat', how: 'Walk into it to strike.',
    shows: (c) => (c.book.rat?.met ?? 0) > 0, does: (c) => beats(c, 'rat') > 0,
    before: (c) => (c.book.rat?.beaten ?? 0) > beats(c, 'rat') },
  // Once the rat goal is done; done standing in the woods, however the hero came (Claude's call);
  // ticked quietly when the woods were already walked to this journey (Claude's call). How: the
  // woods are reached by the gap in the crypt wall, not by stairs, so two lines (the owner's pick)
  { id: 'home', goal: 'Go home to the woods', how: (place) => (depthOf(place) > 0 ? 'Take the stairs up to the crypt.' : 'Leave by the gap in the crypt wall.'),
    shows: (c) => !!c.goals.rat?.done, does: (c) => c.state.place === HOME,
    before: (c) => (c.state.found || []).includes(HOME) },
  // On reaching the woods; done within NEAR tiles of the stone's middle, either way (the owner's
  // pick), so it is never done on arrival; ticked quietly when its plate is woken already (the owner's pick)
  { id: 'stone', goal: 'Find the waystone', how: 'Old standing stones, near home.',
    shows: (c) => c.state.place === HOME, does: (c) => nearStone(c.state),
    before: (c) => !!plateAt(c.state, 'A') },
  // Once the waystone is found (the owner's pick); done on the step that wakes its plate (the
  // owner's pick); ticked quietly when it is woken already (the owner's pick)
  { id: 'wake', goal: 'Wake the waystone', how: 'Step on the plate in its middle.',
    shows: (c) => !!c.goals.stone?.done, does: (c) => !!plateAt(c.state, 'A'),
    before: (c) => !!plateAt(c.state, 'A') },
  // On stepping off the woken plate (D-706); done on the pick, the cross leaving it waiting (the
  // owner's pick). The first boon picked records it on the profile, so a boon held once never
  // shows it again; an older profile holding one now is ticked quietly (the owner's pick)
  { id: 'boon', goal: 'Take a boon', how: 'Step back on the plate. Pick 1 of 3.',
    shows: (c) => steppedOff(c) || picked(c), does: picked,
    before: (c) => !!c.state.boon },
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
// A goal's how line where the hero stands
export const howOf = (goal, place) => (typeof goal.how === 'function' ? goal.how(place) : goal.how);
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
// with the Bestiary already counted; `before`, the state before the action. `done`: the goals done in play this turn, for the gold
// line and the text line; one done unseen in an older save is paid quietly.
export function goalsAfter(goals = {}, glints = 0, book = {}, events = [], state, before = state) {
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
    const was = next[goal.id], c = { goals: next, book, events, state: s, before };
    if (was?.done) continue;
    if (was) { if (goal.does(c)) finish(goal, false); continue; }
    if (!goal.shows(c)) continue;
    if (goal.before(c)) finish(goal, true); // done before it could show, as in a save from before goals
    else if (goal.does(c)) finish(goal, false);
    else next = { ...next, [goal.id]: { done: false } };
  }
  return { goals: next, glints: g, state: s, done };
}

// § the line under the panel: the goal waiting (the oldest), or one done in gold until its turns
// pass; null for none. gold: { id, until } from main.js.
export function goalLine(goals = {}, gold = null, turn = 0, place = 'first') {
  if (gold && turn < gold.until && goals[gold.id]?.done) {
    const g = goalOf(gold.id);
    return { id: g.id, goal: g.goal, how: rewardText(goals[g.id].paid), done: true };
  }
  const id = Object.keys(goals).find((k) => !goals[k].done && goalOf(k));
  return id ? { id, goal: goalOf(id).goal, how: howOf(goalOf(id), place), done: false } : null;
}
// The text line's words when a goal is done: "Beat a rat. +1 Oil flask"
export const doneWords = (goals, id) => `${goalOf(id).goal}. ${rewardText(goals[id].paid)}`;

// § the Quests tab's rows, newest first: { id, goal, how, done, reward }
export const questRows = (goals = {}, place = 'first') => Object.keys(goals).filter(goalOf).reverse()
  .map((id) => ({ id, goal: goalOf(id).goal, how: howOf(goalOf(id), place), done: !!goals[id].done, reward: goals[id].done ? rewardText(goals[id].paid) : '' }));
const TURN = 'Left or Right for another tab. Esc or the close button goes back.';
export function questsWords(goals, place) {
  const rows = questRows(goals, place);
  const said = rows.length ? rows.map((r) => (r.done ? `${r.goal}, done, ${r.reward}` : `${r.goal}. ${r.how}`)).join('. ') : NONE.replace(/\.$/, '');
  return `Journal, Quests tab. ${said}. ${TURN}`;
}
