// § goals: teaching goals (D-705, D-706, D-710, D-711, D-713), the Quests tab's first kind of quest. A goal
// appears at its own moment, shows as a line under the hearts panel until done, then turns
// gold for GOLD_TURNS turns and pays a reward rolled from REWARDS, the seed picking. Goals live
// in the profile, { [id]: { done, paid? } } in the order they appeared; a goal already done in
// an older save is ticked and paid on the first turn, never shown. Plain data, no drawing.
import { rng, seedFor } from './rng.js';
import { bagAdd, bagSize } from './bag.js';
import { get } from './registry.js';
import { HOME } from './boon.js';
import { depthOf, tileAt } from './room.js';
import { levelOf } from './xp.js';
import { embers } from './growth.js';
import { STARTS } from './starts.js';
import { inDaylight } from './daytime.js';

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
// The level reached, and whether an ember is spent this journey (growth.js)
const level = (state) => levelOf(state.xp ?? 0);
const spent = (state) => embers({ xp: 0, ...state }) < level(state) - 1;
// Daylight no longer lights the room the hero is in (daytime.js); false with no room known
const dark = (state) => !!state.room?.dark && !inDaylight(state);
// The crypt: its two rooms behind the broken seal (room.js, D-745); other places below the
// surface don't count, as more ways down will come (the owner's pick, D-746)
const inCrypt = (place) => place === 'first' || place === 'south';
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
  // Once a boon is taken (the owner's pick); done on walking into the crypt through the broken
  // seal (the owner's pick); ticked quietly when the crypt was reached already this journey, as
  // in a journey begun in the crypt (Claude's call)
  { id: 'crypt', goal: 'Find the crypt', how: 'A broken door, beside home.',
    shows: (c) => !!c.goals.boon?.done, does: (c) => inCrypt(c.state.place),
    before: (c) => (c.state.found || []).some(inCrypt) },
  // When daylight no longer lights the room: halfway through dusk under the sky, or on stepping
  // where the sky doesn't reach (D-735, the owner's picks). Done once lit, by hand or By itself;
  // ticked quietly when it was lit already, by day or from a crypt start, so every journey has it;
  // it goes ahead of any goal waiting while the dark is here and the lantern is off (the owner's pick)
  { id: 'lantern', goal: 'Light your lantern', how: 'Tap the lantern, or press L.', ahead: (state) => !state.lit && dark(state),
    shows: (c) => dark(c.state), does: (c) => !!c.state.lit,
    before: (c) => !!c.before.lit && !!c.state.lit },
  // At level 2, going ahead of any goal waiting (D-706) while an ember is there to spend (Claude's
  // call); done on the first buy in Growth, which passes no turn, so main.js checks again then
  // (the owner's pick); ticked quietly when an ember is spent already (the owner's pick)
  { id: 'ember', goal: 'Spend your ember', how: 'Tap here, then Growth.', ahead: (state) => embers({ xp: 0, ...state }) > 0,
    shows: (c) => level(c.state) >= 2, does: (c) => spent(c.state),
    before: (c) => spent(c.state) },
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
// A goal's how line where the hero stands; `start`, the journey's start id, may change it (D-735)
export const howOf = (goal, place, start) => STARTS[start]?.goals.how[goal.id] ?? (typeof goal.how === 'function' ? goal.how(place) : goal.how);
// The journey's start's goal rules (D-735): skipped, never shown; now, shown from its first turn
const skips = (state, id) => !!STARTS[state?.start]?.goals.skip.includes(id);
const now = (state, id) => !!STARTS[state?.start]?.goals.now.includes(id);
// A reward's words: "+1 Oil flask", "+2 Healing herbs", "+1 Glint"
export function rewardText(id) {
  const r = REWARDS.find((x) => x.id === id);
  if (!r) return '';
  const name = r.id === 'glint' ? 'Glint' : get(r.id).name;
  return `+${r.n} ${name}${r.n > 1 ? 's' : ''}`;
}
// § roll: the reward, from the journey's seed, the turn and the goal, so goals done on one
// turn each roll their own (D-742, B4)
export function rollReward(state, id = '') {
  let mix = 0;
  for (const ch of id) mix = (Math.imul(mix, 31) + ch.charCodeAt(0)) >>> 0;
  let left = rng(seedFor(state.seed ^ state.turn, SALT ^ mix))() * 100;
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
    const paid = rollReward(s, goal.id);
    next = { ...next, [goal.id]: { done: true, paid } };
    s = payInto(s, paid);
    if (paid === 'glint') g += 1;
    if (!quiet) done.push(goal.id);
  };
  for (const goal of GOALS) {
    const was = next[goal.id], c = { goals: next, book, events, state: s, before };
    if (was?.done) continue;
    if (skips(s, goal.id)) { if (was) next = { ...next, [goal.id]: { done: true } }; continue; } // a goal its start skips never shows (D-735); one waiting in an older profile is ticked quietly, unpaid (D-742, B6)
    if (was) { if (goal.does(c)) finish(goal, false); continue; }
    if (!goal.shows(c) && !now(s, goal.id)) continue;
    if (goal.before(c)) finish(goal, true); // done before it could show, as in a save from before goals
    else if (goal.does(c)) finish(goal, false);
    else next = { ...next, [goal.id]: { done: false } };
  }
  return { goals: next, glints: g, state: s, done };
}

// § the line under the panel: the goal waiting (the oldest, or one that goes ahead while it can,
// D-706), or one done in gold until its turns pass; null for none. gold: { id, until } from
// main.js; state, the journey, for a goal going ahead.
export function goalLine(goals = {}, gold = null, turn = 0, place = 'first', state = null) {
  if (gold && turn < gold.until && goals[gold.id]?.done) {
    const g = goalOf(gold.id);
    return { id: g.id, goal: g.goal, how: rewardText(goals[g.id].paid), done: true };
  }
  const waiting = Object.keys(goals).filter((k) => !goals[k].done && goalOf(k));
  const id = waiting.find((k) => state && goalOf(k).ahead?.(state)) ?? waiting[0];
  return id ? { id, goal: goalOf(id).goal, how: howOf(goalOf(id), place, state?.start), done: false } : null;
}
// The text line's words when a goal is done: "Beat a rat. +1 Oil flask"
export const doneWords = (goals, id) => `${goalOf(id).goal}. ${rewardText(goals[id].paid)}`;

// § the Quests tab's rows, newest first: { id, goal, how, done, reward }; none for a goal the
// journey's start skips, ticked quietly in an older profile (D-742, B6)
export const questRows = (goals = {}, place = 'first', start = null) => Object.keys(goals).filter((id) => goalOf(id) && !STARTS[start]?.goals.skip.includes(id)).reverse()
  .map((id) => ({ id, goal: goalOf(id).goal, how: howOf(goalOf(id), place, start), done: !!goals[id].done, reward: goals[id].done ? rewardText(goals[id].paid) : '' }));
const TURN = 'Left or Right for another tab. Esc or the close button goes back.';
export function questsWords(goals, place, start = null) {
  const rows = questRows(goals, place, start);
  const said = rows.length ? rows.map((r) => (r.done ? `${r.goal}, done, ${r.reward}` : `${r.goal}. ${r.how}`)).join('. ') : NONE.replace(/\.$/, '');
  const again = goals?.boon?.done ? ' Enter shows what boons are.' : ''; // the boons card again (D-712)
  return `Journal, Quests tab. ${said}.${again} ${TURN}`;
}
