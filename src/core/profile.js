// § profile: who plays on this device (D-268). Three slots, each empty or one
// person's profile: a name, a look, Records and its play time (D-290). Each profile's journey is saved
// apart, in its own place (save.js), so a turn rewrites only the one in play.
// The slot screen picks the one in use (D-271); with every slot empty, none is. Plain data, no drawing.

import { setAside } from './aside.js';

export const SLOTS = 3;
// A new profile: no name or look chosen yet, no Records. Records: the deepest depth,
// creatures beaten, falls, rooms found, steps walked, flasks poured and torches lit,
// on all its journeys (D-262, D-270, D-283, D-285, D-286); played: whole seconds in its journeys (D-290);
// bestiary: each creature met, { [id]: { met, beaten } } (bestiary.js, D-630); bought: the
// patterns, lamps and heads bought with Glints, theirs for good (D-696, D-702, D-703); goals: the
// teaching goals shown, { [id]: { done, paid? } } (goals.js, D-706); glints: the Glints goals paid;
// gift: the one locked look taken free, in bought too, or null while the free pick waits (D-714)
export const COUNTS = ['beaten', 'falls', 'found', 'steps', 'poured', 'torches'];
export const newProfile = (deepest = 0) => ({ name: '', look: {}, records: { deepest, beaten: 0, falls: 0, found: 0, steps: 0, poured: 0, torches: 0 }, played: 0, bestiary: {}, bought: [], goals: {}, glints: 0, gift: null });
// The profiles at the start: the first slot in use, the others empty
export const newProfiles = (deepest = 0) => ({ current: 0, slots: [newProfile(deepest), ...Array(SLOTS - 1).fill(null)] });

// § upgrades: as the journey save's (D-266). When the profiles' shape changes,
// raise FORMAT and add the step from the old number to the new; never edit a merged step.
export const FORMAT = 11;
export const UPGRADES = {
  // 1 → 2: the Records' counts, none yet (D-270)
  1: (ps) => ({ ...ps, slots: ps.slots.map((p) => p && { ...p, records: { beaten: 0, falls: 0, found: 0, ...p.records } }) }),
  // 2 → 3: steps walked, none yet (D-283)
  2: (ps) => ({ ...ps, slots: ps.slots.map((p) => p && { ...p, records: { steps: 0, ...p.records } }) }),
  // 3 → 4: flasks poured, none yet (D-285)
  3: (ps) => ({ ...ps, slots: ps.slots.map((p) => p && { ...p, records: { poured: 0, ...p.records } }) }),
  // 4 → 5: torches lit, none yet (D-286)
  4: (ps) => ({ ...ps, slots: ps.slots.map((p) => p && { ...p, records: { torches: 0, ...p.records } }) }),
  // 5 → 6: play time, none yet (D-290)
  5: (ps) => ({ ...ps, slots: ps.slots.map((p) => p && { played: 0, ...p }) }),
  // 6 → 7: the Bestiary, no creature met yet (D-630)
  6: (ps) => ({ ...ps, slots: ps.slots.map((p) => p && { bestiary: {}, ...p }) }),
  // 7 → 8: the patterns bought, none yet (D-696)
  7: (ps) => ({ ...ps, slots: ps.slots.map((p) => p && { bought: [], ...p }) }),
  // 8 → 9: teaching goals, none shown, and no Glints from them (D-706); ones already done are ticked in play (goals.js)
  8: (ps) => ({ ...ps, slots: ps.slots.map((p) => p && { goals: {}, glints: 0, ...p }) }),
  // 9 → 10: a free pick of one locked look, waiting, for every profile (D-714)
  9: (ps) => ({ ...ps, slots: ps.slots.map((p) => p && { gift: null, ...p }) }),
  // 10 → 11: Carriage and Zebra free for everyone; a free pick taken on one waits again (D-715)
  10: (ps) => ({ ...ps, slots: ps.slots.map((p) => p && (FREED.includes(p.gift) ? { ...p, gift: null } : p)) }),
};
const FREED = ['carriage', 'zebra'];

// § reading: a kept profile list, checked and upgraded, or null when it can't be read
const isCount = (n) => Number.isInteger(n) && n >= 0;
const isProfile = (p) => typeof p?.name === 'string' && typeof p.look === 'object' && p.look !== null
  && ['deepest', ...COUNTS].every((k) => isCount(p.records?.[k])) && isCount(p.played) && isBook(p.bestiary)
  && Array.isArray(p.bought) && p.bought.every((id) => typeof id === 'string') && isGoals(p.goals) && isCount(p.glints)
  && (p.gift === null || (typeof p.gift === 'string' && p.bought.includes(p.gift)));
const isGoals = (g) => typeof g === 'object' && g !== null && !Array.isArray(g) && Object.values(g).every((x) => typeof x?.done === 'boolean');
const isBook = (b) => typeof b === 'object' && b !== null && !Array.isArray(b) && Object.values(b).every((c) => isCount(c?.met) && isCount(c?.beaten));
// A slot that can't be read is made empty, the others kept (H-21, D-880); with the slot in
// use emptied, the first slot still in use takes over, or none
export function unpackProfiles(kept) {
  if (!Number.isInteger(kept?.format) || kept.format < 1 || kept.format > FORMAT) return null;
  if (!Array.isArray(kept.profiles?.slots) || kept.profiles.slots.length !== SLOTS) return null;
  const slots = kept.profiles.slots.map((p) => (p === null ? null : upgradeSlot(kept.format, p)));
  const { current } = kept.profiles, first = slots.findIndex((p) => p);
  return { current: Number.isInteger(current) && slots[current] ? current : first >= 0 ? first : null, slots };
}
// One slot's profile brought up to today's shape, or null when it can't be read
function upgradeSlot(format, p) {
  try {
    let ps = { current: 0, slots: [p] };
    for (let f = format; f < FORMAT; f++) ps = UPGRADES[f](ps);
    return isProfile(ps.slots[0]) ? ps.slots[0] : null;
  } catch { return null; }
}
// Whether every slot kept was read: a slot made empty means its text is set aside (loadProfiles)
const allRead = (kept, ps) => kept.profiles.slots.every((p, i) => (p === null) === (ps.slots[i] === null));
export const packProfiles = (profiles) => ({ format: FORMAT, profiles });

// The profile in play, and the profiles with it changed
export const playing = (ps) => ps.slots[ps.current];
export const withPlaying = (ps, p) => ({ ...ps, slots: ps.slots.map((q, i) => (i === ps.current ? p : q)) });
// The profiles after a new deepest depth (the rule is record.js's deeper)
export const withDeepest = (ps, deepest) => withRecords(ps, { ...playing(ps).records, deepest });
// The profiles with the Records of the profile in play replaced
export const withRecords = (ps, records) => withPlaying(ps, { ...playing(ps), records });
// The profiles with the Bestiary of the profile in play replaced (D-630)
export const withBestiary = (ps, bestiary) => withPlaying(ps, { ...playing(ps), bestiary });
// The profiles with the goals and goal Glints of the profile in play replaced (D-706)
export const withGoals = (ps, goals, glints) => withPlaying(ps, { ...playing(ps), goals, glints });
// § play time (D-290): the profiles with seconds more played by the profile in play, and how it is
// written in its box: hours and minutes, 1h 23m, or only minutes under an hour, 23m
export const withPlayed = (ps, seconds) => withPlaying(ps, { ...playing(ps), played: playing(ps).played + seconds });
export function playedText(seconds) {
  const m = Math.floor(seconds / 60), h = Math.floor(m / 60);
  return h ? `${h}h ${m % 60}m` : `${m}m`;
}

// § slots: the slot screen's rules (D-271). An unnamed profile shows as Profile and its slot's number.
export const slotName = (p, i) => p.name || `Profile ${i + 1}`;
// The profiles with slot i in use; an empty slot gets a new profile, named as typed (D-272) or unnamed,
// in the look chosen after the name (P3)
// gift: the locked look a new hero took free on its look card, or none (D-714)
export const usingSlot = (ps, i, name = '', look = {}, gift = null) => ({ current: i, slots: ps.slots.map((p, j) => (j === i ? p ?? { ...newProfile(), name, look, ...(gift && { bought: [gift], gift }) } : p)) });
// The profiles with slot i's profile renamed (P2b); nothing typed makes it unnamed again
export const renamedSlot = (ps, i, name) => ({ ...ps, slots: ps.slots.map((p, j) => (j === i && p ? { ...p, name } : p)) });
// The profiles with slot i's profile in a new look (P3); the rest of its look stays
export const lookedSlot = (ps, i, look) => ({ ...ps, slots: ps.slots.map((p, j) => (j === i && p ? { ...p, look: { ...p.look, ...look } } : p)) });
// The profiles with slot i's profile having bought the pattern, lamp or head `id` (D-696, D-702, D-703); once only
export const boughtSlot = (ps, i, id) => ({ ...ps, slots: ps.slots.map((p, j) => (j === i && p && !p.bought.includes(id) ? { ...p, bought: [...p.bought, id] } : p)) });
// The profiles with slot i's profile having taken `id` as its free pick (D-714); only while it waits
export const giftedSlot = (ps, i, id) => ({ ...ps, slots: ps.slots.map((p, j) => (j === i && p && p.gift === null && !p.bought.includes(id) ? { ...p, bought: [...p.bought, id], gift: id } : p)) });
// The profiles with slot i emptied; if it was in use, the first slot still in use takes over, or none
export function withoutSlot(ps, i) {
  const slots = ps.slots.map((p, j) => (j === i ? null : p));
  const first = slots.findIndex((p) => p), current = ps.current !== i ? ps.current : first >= 0 ? first : null;
  return { current, slots };
}

// § storage: localStorage, wrapped (TECH.md); with storage blocked it lasts until the page closes.
// The first time, the record kept before profiles (record.js, D-232) moves into the first slot.
const KEY = 'gloamdeep-profiles', OLD_DEEPEST = 'gloamdeep-deepest';
function oldDeepest() {
  let n = 0;
  try { n = JSON.parse(localStorage.getItem(OLD_DEEPEST)); } catch { /* not kept */ }
  return Number.isInteger(n) && n > 0 ? n : 0;
}
// A list kept that can't be read, broken or newer, or read only in part, is set aside before
// it can be saved over (H-21, D-880)
export function loadProfiles() {
  let ps = null, text = null, kept = null;
  try { text = localStorage.getItem(KEY); kept = JSON.parse(text); ps = unpackProfiles(kept); } catch { /* not kept */ }
  if (text && (!ps || !allRead(kept, ps))) setAside(KEY, text);
  return ps ?? newProfiles(oldDeepest());
}
export function saveProfiles(ps) {
  try { localStorage.setItem(KEY, JSON.stringify(packProfiles(ps))); } catch { /* not kept */ }
}
