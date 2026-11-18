// § lines: what the text line says, and when (D-094 to D-097). Plain data,
// no drawing. A line is said on a turn and shows for LINE_TURNS turns.
// The words are style study 1's (study lines 462, 482–483, Q-028).
// A line's `kind` says where it comes from, for its colour (D-509): 'speech', what people
// say; 'harm', a creature hurts you; none, the rest. Each creature's lines, and those of the
// finds creatures leave, are in `lines-creatures.js` (D-782); the rest by topic in lines-finds.js,
// lines-home.js, lines-deep.js and lines-draughts.js (H-99).
import { CREATURE_LINES } from './lines-creatures.js';
import { FIND_LINES } from './lines-finds.js';
import { HOME_LINES } from './lines-home.js';
import { DEEP_LINES } from './lines-deep.js';
import { DRAUGHT_LINES } from './lines-draughts.js';

export const LINES = {
  ...CREATURE_LINES,
  ...FIND_LINES,
  ...HOME_LINES,
  ...DEEP_LINES,
  ...DRAUGHT_LINES,
  oilLow: { text: 'The flame is getting low.', warn: false },
  oilEmpty: { text: 'The lantern gutters to an ember.', warn: true }, // a warning, in amber (D-097)
  fall: { text: 'You fall, and wake again.', warn: false }, // (D-119)
  anew: { text: 'The world begins again.', warn: false }, // a Hardcore fall (D-344)
  torchLit: { text: 'You light the torch.', warn: false }, // (D-124)
  stoneWakes: { text: 'The waystone wakes.', warn: false }, // (D-591)
  stoneTravel: { text: 'The waystone carries you.', warn: false }, // (D-593)
  stoneNear: { text: 'Not with a creature so near.', warn: false }, // travel barred (D-593)
  boonTake: { text: 'The waystone grants you {n}.', warn: false }, // a boon picked, {n} its name (D-596)
  boonHeld: { text: '{n}', warn: false }, // a tap on the boon's mark, {n} its name and card line (D-604)
  lanternDark: { text: 'Your lantern is dark.', warn: false }, // (D-124)
  stairsDown: { text: 'You go down the stairs.', warn: false }, // (D-135)
  archway: { text: 'You go through the archway.', warn: false }, // the place beyond's way in and out (D-970)
  stairsUp: { text: 'You go up the stairs.', warn: false }, // (D-135)
  herbEat: { text: 'You eat the herb and feel better.', warn: false }, // (D-156)
  flaskPour: { text: 'You pour a flask.', warn: false }, // poured by itself (D-249)
  flaskFull: { text: "You can't carry more flasks.", warn: false }, // every stack full, no slot free (D-250, D-333)
  knifeTake: { text: 'You take the knife.', warn: false }, // into the held slot (D-252)
  knifeBag: { text: 'The knife goes in your bag.', warn: false }, // found with a weapon held (D-479)
  knifeHold: { text: 'You hold the knife.', warn: false }, // Hold in the bag (D-479)
  knifeAway: { text: 'You put the knife away.', warn: false }, // Take off, into the bag, free (D-554)
  spearTake: { text: 'You take the spear.', warn: false }, // into the held slot (D-479)
  spearBag: { text: 'The spear goes in your bag.', warn: false }, // found with a weapon held (D-479)
  spearHold: { text: 'You hold the spear.', warn: false }, // Hold in the bag (D-479)
  spearAway: { text: 'You put the spear away.', warn: false }, // Take off, into the bag, free (D-554)
  fistTake: { text: "You take the Warden's Fist.", warn: false }, // a beaten warden's (D-888), Claude's drafts the owner picked
  fistBag: { text: "The Warden's Fist goes in your bag.", warn: false },
  fistHold: { text: "You hold the Warden's Fist.", warn: false },
  fistAway: { text: "You put the Warden's Fist away.", warn: false },
  levelUp: { text: 'You feel stronger. Level {n}.', warn: false }, // {n}, the new level (D-246)
  unsaved: { text: 'Your journey could not be saved.', warn: true }, // a save failed: storage full or blocked; once, until one is kept again (D-428)
};
export const LINE_TURNS = 5; // turns a line stays before it fades (D-095)
const OIL_LOW = 0.2; // "under 20%", as in the study

// § say: (state, id, n) → new state, the line said on this turn; n fills a
// line's {n}, as the level does. A line with `texts` says the one after the
// last it said, kept in `state.told` (D-297).
// A second blank, {m}, takes `m` (the Fist's knock names two things, D-888)
export function say(state, id, n, m) {
  if (!LINES[id]) return state; // a creature with no line for this says nothing new (D-369)
  if (LINES[id]?.texts) {
    const i = (state.told?.[id] ?? 0) % LINES[id].texts.length;
    return { ...state, line: { id, turn: state.turn, i }, told: { ...state.told, [id]: i + 1 } };
  }
  return { ...state, line: n === undefined ? { id, turn: state.turn } : { id, turn: state.turn, n, ...(m !== undefined && { m }) } };
}

// § said together: (state, id) → as say, but when an effect's end was said already this turn,
// this end follows it on the same line, so both are said (the owner's pick, Q-099)
const ENDS = new Set(['glowEnds', 'slowEnds', 'stiffEnds', 'warmEnds', 'mendEnds', 'wardEnds', 'spitproofEnds', 'shadeEnds', 'poisonEnds']);
export function sayEnd(state, id) {
  const was = state.line;
  if (!was || was.turn !== state.turn || !ENDS.has(was.id) || !ENDS.has(id)) return say(state, id);
  return { ...state, line: { ...was, also: [...(was.also || []), id] } };
}

// § shown: the line on screen now, or null once its turns are used up. A line
// with {n} is filled once per saying, so the same saying stays the same object
// and is drawn and spoken once (textline.js, frame.js).
const filled = new WeakMap();
export function shownLine(state) {
  if (!state.line || state.turn - state.line.turn >= LINE_TURNS) return null;
  const entry = LINES[state.line.id];
  if (!entry) return null; // a line that isn't there, as an old save may hold, shows nothing (D-369)
  if (entry.texts) {
    if (!filled.has(state.line)) filled.set(state.line, { ...entry, texts: undefined, text: entry.texts[(state.line.i ?? 0) % entry.texts.length] }); // a saved line past a list's end, as after D-684, wraps round
    return filled.get(state.line);
  }
  if (state.line.also) { // effects ending together, said on one line (Q-099)
    if (!filled.has(state.line)) filled.set(state.line, { ...entry, text: [entry, ...state.line.also.map((id) => LINES[id])].filter(Boolean).map((e) => e.text).join(' ') });
    return filled.get(state.line);
  }
  if (state.line.n === undefined) return entry;
  if (!filled.has(state.line)) filled.set(state.line, { ...entry, text: entry.text.replace('{n}', state.line.n).replace('{m}', state.line.m ?? '').replace(/\b1 turns\b/, '1 turn') }); // "1 turn left" on a mark's last turn (H-43)
  return filled.get(state.line);
}

// § heard: as a screen opens, the line already showing counts as heard, so the
// card's own words aren't spoken over a frame later; a line said on the card is
// still spoken, and back in play the line showing is spoken again (D-670)
export const heardAs = (screen, state) => (screen === 'play' || !state ? null : shownLine(state));

// § oil: a line only as the oil crosses a mark on the way down, so each is
// said once, and again only after the oil has gone back above it (D-096).
export function oilLine(before, after) {
  if (before > 0 && after === 0) return 'oilEmpty';
  if (before >= OIL_LOW && after < OIL_LOW) return 'oilLow';
  return null;
}
