// § menu: the title screen's lines (D-177). Only what works is listed (D-178):
// Continue only while a journey is saved, first and already picked (D-238). Plain data, no drawing.
import { get } from './registry.js';
import { bagHas, carried, BAG_SLOTS } from './bag.js';
import { swipeText, tapWalkText, padText, stopText, motionText, seedText, lanternText, flasksText, soundText } from './settings.js';
import { depthOf } from './room.js';
import { levelOf } from './xp.js';

// The Seed Explorer, a dev tool, is its last line (D-214)
// The Journal under New journey (D-270), Profiles back to the slot screen under Settings (D-271)
export const TITLE_MENU = [{ id: 'new', text: 'New journey' }, { id: 'journal', text: 'Journal' }, { id: 'howto', text: 'How to play' }, { id: 'settings', text: 'Settings' }, { id: 'profiles', text: 'Profiles' }, { id: 'explore', text: 'Seed Explorer' }];
export const titleMenu = (saved) => (saved ? [{ id: 'continue', text: 'Continue' }, ...TITLE_MENU] : TITLE_MENU);
// New journey asks first while a journey is saved (D-238)
export const SURE_MENU = [{ id: 'yes', text: 'Yes' }, { id: 'no', text: 'No' }];
export const SURE_HEADING = 'Start over?';
export const SURE_NOTE = 'The saved journey is lost.';
// Deleting a profile asks the same way, No picked (D-271)
export const DROP_NOTE = 'Lost for good.';
// § modes: New journey asks the way to play, Normal picked (D-334, MO1); the picked line's note under it
export const MODE_MENU = [
  { id: 'gentle', text: 'Gentle', note: 'A fall keeps the bag.' },
  { id: 'normal', text: 'Normal', note: 'The bag waits where you fall.' },
  { id: 'hardcore', text: 'Hardcore', note: 'One life. A fall starts the world over.' },
];
export const MODE_HEADING = 'Choose a way to play';
export const MODE_FIRST = MODE_MENU.findIndex((l) => l.id === 'normal');
// § changing the way: from Settings in play, only toward easier (MO4, D-334, D-346). The page shows
// all three, the one played picked, the harder ones grey with their own note; an easier one asks first.
export const HARDER_NOTE = 'Only an easier way can be picked.';
export const modeAt = (id) => Math.max(0, MODE_MENU.findIndex((l) => l.id === id));
export const modeText = (id) => 'Way to play: ' + MODE_MENU[modeAt(id)].text;
export const easier = (from, to) => modeAt(to) < modeAt(from);
export const easeMenu = (from) => MODE_MENU.map((l, i) => (i > modeAt(from) ? { ...l, dim: true, note: HARDER_NOTE } : l));
export const easeHeading = (to) => `Play ${MODE_MENU[modeAt(to)].text}?`;
export const EASE_NOTE = 'There is no going back.';
// A journey's way made easier; never harder (D-334)
export const easeMode = (state, to) => (easier(state.mode, to) ? { ...state, mode: to } : state);
// § journey ends: after a Hardcore fall, the world begun again from the same seed or a new one (MO2, D-344)
export const ENDED_MENU = [{ id: 'same', text: 'Same world' }, { id: 'other', text: 'New world' }];
export const ENDED_HEADING = 'Your journey ends.';
// The pause menu during play (D-177, D-187, D-193), the Journal under Resume (D-270)
export const PAUSE_MENU = [{ id: 'resume', text: 'Resume' }, { id: 'journal', text: 'Journal' }, { id: 'settings', text: 'Settings' }, { id: 'howto', text: 'How to play' }, { id: 'title', text: 'Back to title' }];
// The pause card's facts on its right, under THIS JOURNEY (D-388): the journey's seed, its way
// to play, the depth as the panel names it (Surface, else its number) and the hero's level
export const pauseFacts = (state) => {
  const depth = depthOf(state.place);
  return [['Seed', String(state.seed)], ['Way to play', MODE_MENU[modeAt(state.mode)].text], ['Depth', depth === 0 ? 'Surface' : String(depth)], ['Level', String(levelOf(state.xp))]];
};
// Settings, from the title or the pause menu (D-190, D-210, D-255, D-408): picking a switch moves it to the next choice.
// Each switch's line also gives its name and value apart, for the card's two columns (D-389).
// Version history, last, is the card's button; the card's cross does what Back did (D-254, D-389).
// deviceReduced: the device's own reduced-motion setting, which Motion follows until picked;
// journey: this journey's seed, named from the pause menu (D-191), else null;
// mode: this journey's way to play, its line under the seed from the pause menu (MO4, D-346)
const named = (id, text) => { const at = text.indexOf(': '); return { id, text, name: text.slice(0, at), value: text.slice(at + 2) }; };
export const settingsMenu = (s, deviceReduced = false, journey = null, mode = null) => [
  named('swipe', swipeText(s.swipe)),
  named('tapwalk', tapWalkText(s.tapwalk)),
  named('pad', padText(s.pad)),
  named('stop', stopText(s.stop)),
  named('motion', motionText(s.motion, deviceReduced)),
  named('seed', seedText(s.seed, journey)),
  ...(mode ? [named('mode', modeText(mode))] : []),
  named('lantern', lanternText(s.lantern)),
  named('flasks', flasksText(s.flasks)),
  named('sound', soundText(s.sound)),
  { id: 'history', text: 'Version history' },
];

// § move: Up and Down walk the lines and stop at the ends
// The workbench's card (WB3, D-323; a card, D-387): each thing made at it is a slot,
// in a 3 × 2 grid as the bag's, with its cost and how many of each the bag holds;
// dim with too few (the stash chest, CH1, D-326). BENCH_TAKE is Deconstruct workbench, under the grid.
export const BENCH_MAKES = ['chest'];
export const BENCH_TAKE = BAG_SLOTS;
export const benchMakes = (bag) => BENCH_MAKES.map((id) => {
  const of = get(id).bench.of;
  return { item: id, cost: Object.entries(of).map(([at, n]) => ({ id: at, n, have: carried(bag, at) })), dim: !bagHas(bag, of) };
});
// The arrows on the card: the grid, Down from its bottom row to Deconstruct, Up from it back
export function moveBench(i, dir) {
  if (i === BENCH_TAKE) return dir === 'up' ? BAG_SLOTS - 3 : i;
  if (dir === 'down' && i >= 3) return BENCH_TAKE;
  return Math.min(BAG_SLOTS - 1, Math.max(0, i + { left: -1, right: 1, up: -3, down: 3 }[dir]));
}
export const moveChoice = (i, dir, count) => Math.max(0, Math.min(count - 1, i + (dir === 'up' ? -1 : dir === 'down' ? 1 : 0)));
