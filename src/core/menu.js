// § menu: the title screen's lines (D-177). Only what works is listed (D-178):
// Continue only while a journey is saved, first and already picked (D-238). Plain data, no drawing.
import { get } from './registry.js';
import { bagHas } from './bag.js';
import { controlsText, motionText, seedText, lanternText, flasksText, soundText } from './settings.js';

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
// The pause menu during play (D-177, D-187, D-193), the Journal under Resume (D-270)
export const PAUSE_MENU = [{ id: 'resume', text: 'Resume' }, { id: 'journal', text: 'Journal' }, { id: 'settings', text: 'Settings' }, { id: 'howto', text: 'How to play' }, { id: 'title', text: 'Back to title' }];
// Settings, from the title or the pause menu (D-189, D-190, D-210, D-255): picking a switch moves it to the next choice.
// Version history, above Back, opens the page of every version (D-254).
// deviceReduced: the device's own reduced-motion setting, which Motion follows until picked;
// journey: this journey's seed, named from the pause menu (D-191), else null
export const settingsMenu = (s, deviceReduced = false, journey = null) => [
  { id: 'controls', text: controlsText(s.controls) },
  { id: 'motion', text: motionText(s.motion, deviceReduced) },
  { id: 'seed', text: seedText(s.seed, journey) },
  { id: 'lantern', text: lanternText(s.lantern) },
  { id: 'flasks', text: flasksText(s.flasks) },
  { id: 'sound', text: soundText(s.sound) },
  { id: 'history', text: 'Version history' },
  { id: 'back', text: 'Back' },
];

// § move: Up and Down walk the lines and stop at the ends
// The workbench's panel (WB3, D-323): each thing made at it is a line above Deconstruct,
// its cost on the right, dim with too few in the bag (the stash chest, CH1, D-326)
export const BENCH_MAKES = ['chest'];
const costText = (of) => Object.entries(of).map(([id, n]) => `${n} ${get(id).name}`).join(' · ');
export const benchMenu = (bag) => [
  ...BENCH_MAKES.map((id) => ({ id: 'make', item: id, text: get(id).name, cost: costText(get(id).bench.of), dim: !bagHas(bag, get(id).bench.of) })),
  { id: 'deconstruct', text: 'Deconstruct workbench' }, { id: 'close', text: 'Close' },
];
export const moveChoice = (i, dir, count) => Math.max(0, Math.min(count - 1, i + (dir === 'up' ? -1 : dir === 'down' ? 1 : 0)));
