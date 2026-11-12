// § menu: the title screen's lines (D-177). Only what works is listed (D-178):
// Continue only while a journey is saved, first and already picked (D-238). Plain data, no drawing.
import { get } from './registry.js';
import { bagHas, carried } from './bag.js';
import { swipeText, tapText, padText, stopText, motionText, seedText, lanternText, flasksText, soundText, loudText, LOUD_KINDS, kindLoud, kindText, soundsOf, isMuted, voiceText, statsText, marksText } from './settings.js';
import { depthOf } from './room.js';
import { levelOf } from './xp.js';

// The Seed Explorer, a dev tool, is its last line (D-214)
// The Journal under New journey (D-270), Profiles back to the slot screen under Settings (D-271)
export const TITLE_MENU = [{ id: 'new', text: 'New journey' }, { id: 'journal', text: 'Journal' }, { id: 'howto', text: 'How to play' }, { id: 'settings', text: 'Settings' }, { id: 'profiles', text: 'Profiles' }, { id: 'explore', text: 'Seed Explorer' }];
export const titleMenu = (saved) => (saved ? [{ id: 'continue', text: 'Continue' }, ...TITLE_MENU] : TITLE_MENU);
// New journey asks first while a journey is saved (D-238)
export const SURE_MENU = [{ id: 'yes', text: 'Yes' }, { id: 'no', text: 'No' }];
// The bed bumped by day: an ask to take it down (D-488)
export const BED_HEADING = 'Deconstruct bed?';
export const BED_NOTE = "You aren't tired.";
// The moon button outside at night asks first, No picked; Yes sleeps until morning (D-758),
// its words drafted for the playtest
export const SLEEP_OUT_ASK = ['Sleep here until morning?', 'The ground is hard and cold.'];
export const SLEEP_OUT_ROLL_ASK = ['Sleep here until morning?', 'Your fur bedroll is warm.']; // with the Fur Bedroll in the bag (D-803) or laid out beside the hero (D-804)
// The garden bed bumped opens the same card (D-565), its name over Plant and Deconstruct, Plant
// dim with no seed or a seed already in (D-566); the ask card's lines by the tile bumped
export const TAKE_ASKS = { campfire: ['Sit by the fire?', 'Someone was here not long ago.'], campfireEmbers: ['Sit by the fire?', 'Whoever sat here is gone.'], campfireAshes: ['Light the fire?', 'No one has sat here for a long time.'], minersCamp: ['Take the pick?', 'An old pick leans on the crate.'], bedstead: [BED_HEADING, BED_NOTE], bedroll: ['Roll up the bedroll?', "You aren't tired."], plot: ['Garden bed', 'Nothing grows here yet.'], sprout: ['Garden bed', 'A sprout grows here.'], fedSprout: ['Garden bed', 'A sprout grows here.'], berryBed: ['Garden bed', 'Gloamberries grow here.'], relicShelf: ['Deconstruct shelf?', 'Nothing on it yet.'], locketShelf: ['Deconstruct shelf?', 'The locket rests here.'] }; // the shelf's, the bed's way (D-690), with the locket on it (D-693); the miners' camp's, its first words on the text line, No picked (D-770)
// The shelf bumped with the locket in the bag asks to set it there instead, No picked; Yes `shelve`s it (D-693)
export const SHELVE_ASK = ['Set the locket on the shelf?', 'Kept close, whatever the dark took.'];
export const SHELVE_MENU = [{ id: 'shelve', text: 'Yes' }, { id: 'no', text: 'No' }];
// Cold ashes bumped ask Light the fire?, the second half of the ashes' words under it, the text
// line saying the first, Cold ashes. (the card too narrow for both), No picked; Yes `kindle`s it,
// grey with an empty lantern (D-757)
export const KINDLE_MENU = [{ id: 'kindle', text: 'Yes' }, { id: 'no', text: 'No' }];
export const kindleMenu = (can) => dimFirst(KINDLE_MENU, can);
// A burning fire bumped asks Sit by the fire?, the second half of its words under it, the text
// line saying the first, No picked; Yes `sit`s, grey with full hearts and not stiff (D-844)
export const SIT_MENU = [{ id: 'sit', text: 'Yes' }, { id: 'no', text: 'No' }];
export const sitMenu = (can) => dimFirst(SIT_MENU, can);
// Grown, Pick takes Plant's place, picked (D-568)
export const GARDEN_MENU = [{ id: 'plant', text: 'Plant' }, { id: 'take', text: 'Deconstruct' }];
export const PICK_MENU = [{ id: 'pick', text: 'Pick' }, { id: 'take', text: 'Deconstruct' }];
// A sprout's card shows Feed in Plant's place, picked, dim with no guano or once fed (D-569):
// `canFeed` is true or false on a sprout, left out on any other bed
export const FEED_MENU = [{ id: 'feed', text: 'Feed' }, { id: 'take', text: 'Deconstruct' }];
const dimFirst = (menu, can) => menu.map((l, i) => (i === 0 && !can ? { ...l, dim: true } : l));
export const gardenMenu = (canPlant, canPick = false, canFeed) => (canPick ? PICK_MENU : canFeed !== undefined ? dimFirst(FEED_MENU, canFeed) : dimFirst(GARDEN_MENU, canPlant));
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
// § settings tabs (D-820): CONTROLS, GAME, SCREEN and SOUND, each switch's line in one; tab:
// the open tab's id, its lines only, Version history last on every tab; null, every line
export const SETTINGS_TABS = [
  { id: 'controls', text: 'CONTROLS', ids: ['swipe', 'tap', 'pad', 'stop'] },
  { id: 'game', text: 'GAME', ids: ['seed', 'mode', 'lantern', 'flasks'] },
  { id: 'screen', text: 'SCREEN', ids: ['motion', 'marks', 'stats'] },
  { id: 'sound', text: 'SOUND', ids: ['sound', 'loud', ...LOUD_KINDS.map((k) => k.id)] },
];
export const settingsTabOf = (id) => SETTINGS_TABS.find((t) => t.id === id) ?? SETTINGS_TABS[0];
// § a kind's list (D-824): opened from its line on the Sound tab, the kind's loudness first, then
// each of its sounds On or Off; its title in the tabs' row, SOUND · STEPS
export const kindList = (s, kind) => {
  const { id } = LOUD_KINDS.find((k) => k.kind === kind);
  return [named(id, kindText(id, kindLoud(s, id))), ...soundsOf(kind).map(({ voice }) => named(`mute:${voice}`, voiceText(voice, isMuted(s, voice))))];
};
export const kindListTab = (kind) => ({ id: 'sound', text: `SOUND · ${LOUD_KINDS.find((k) => k.kind === kind).name.toUpperCase()}` });
export const settingsMenu = (s, deviceReduced = false, journey = null, mode = null, tab = null, list = null) => {
  const all = allSettings(s, deviceReduced, journey, mode);
  if (list) return [...kindList(s, list), all[all.length - 1]];
  if (!tab) return all;
  const { ids } = settingsTabOf(tab);
  return [...ids.flatMap((id) => all.filter((l) => l.id === id)).map(opens), all[all.length - 1]];
};
// On the Sound tab, a kind's line shows > after its loudness: a pick opens its list (D-824)
const opens = (l) => (LOUD_KINDS.some((k) => k.id === l.id) ? { ...l, value: `${l.value} >` } : l);
const allSettings = (s, deviceReduced, journey, mode) => [
  named('swipe', swipeText(s.swipe)),
  named('tap', tapText(s.tap)),
  named('pad', padText(s.pad)),
  named('stop', stopText(s.stop)),
  named('motion', motionText(s.motion, deviceReduced)),
  named('seed', seedText(s.seed, journey)),
  ...(mode ? [named('mode', modeText(mode))] : []),
  named('lantern', lanternText(s.lantern)),
  named('flasks', flasksText(s.flasks)),
  named('marks', marksText(s.marks)), // D-730
  named('sound', soundText(s.sound)),
  named('loud', loudText(s.loud ?? 100)), // D-822
  ...LOUD_KINDS.map(({ id }) => named(id, kindText(id, kindLoud(s, id)))), // D-823; Music too (D-837)
  named('stats', statsText(s.stats)),
  { id: 'history', text: 'Version history' },
];

// § move: Up and Down walk the lines and stop at the ends
// The workbench's card (WB3, D-323; a card, D-387): each thing made at it is a slot,
// in a 4 × 3 grid as the stash chest's (D-484), with its cost and how many of each the bag holds,
// with `stored`, the stacks in the chests in reach, added in (D-560);
// dim with too few (the stash chest, CH1, D-326). BENCH_TAKE is Deconstruct workbench, under the grid.
// Its two tabs (D-800), as the bag's (D-787): BUILD, the home pieces, bag upgrades and tools; GEAR,
// the lantern's parts, armour and charms; a 4 × 3 grid each. BENCH_MAKES, every one, BUILD's first.
export const BENCH_TABS = [
  { id: 'build', text: 'BUILD', makes: ['chest', 'pick', 'moleClawPick', 'bed', 'pouch', 'bigBag', 'gardenBed', 'rod', 'shelf', 'furBedroll', 'boneHook'] },
  { id: 'gear', text: 'GEAR', makes: ['copperWick', 'ratVest', 'shellVest', 'wispCharm', 'heartCharm', 'centipedeCharm', 'echoCharm', 'fangCharm'] },
];
export const BENCH_MAKES = BENCH_TABS.flatMap((t) => t.makes); // the stone pick (D-480), the copper wick (D-483), the rat hide vest (D-484), the wisp charm (D-486), the heart charm (D-487), the bed (D-488), the Pouch and Big Bag (D-545), the garden bed (D-562), the rod (D-608), the centipede charm (D-656), the shelf (D-689), the shell vest (D-801), the fur bedroll (D-803), the fang charm (D-809), the bone hook (D-807), the mole claw pick, after the stone pick (D-810)
export const benchTabOf = (id) => BENCH_TABS.find((t) => t.id === id) ?? BENCH_TABS[0];
export const BENCH_COLS = 4;
export const BENCH_SLOTS = 12;
export const BENCH_TAKE = BENCH_SLOTS;
// A bag upgrade shows only while the bag is its `grows.from`: the Pouch at 6 slots, the
// Big Bag at 9; both made, neither shows (D-547). size: the bag's slots
const offered = (id, size) => { const g = get(id).grows; return !g || g.from === size; };
export const benchMakes = (bag, size = 6, stored = [], ids = BENCH_MAKES) => ids.filter((id) => offered(id, size)).map((id) => {
  const of = get(id).bench.of, all = [...bag, ...stored];
  return { item: id, cost: Object.entries(of).map(([at, n]) => ({ id: at, n, have: carried(all, at) })), dim: !bagHas(all, of) };
});
// § station: a set-down station opens the workbench's card, its own title over it: the bench's,
// or the mortar's (D-786), a tile with `makes`, its recipes, each shown once all its parts have
// been held (`known`, D-418, D-791); none shown, its card says so in grey. tile: the station's tile
export const STATION_NONE = 'Nothing to make here yet.';
export const stationTitle = (tile) => tile.title || 'WORKBENCH';
const shown = (id, known) => Object.keys(get(id).bench.of).every((at) => known.has(at));
// The workbench's, on its open tab (D-800); the mortar has no tabs
export const stationMakes = (tile, bag, size, stored, known = new Set(), tab = 'build') => (tile.makes
  ? benchMakes(bag, size, stored, tile.makes.filter((id) => shown(id, known))) : benchMakes(bag, size, stored, benchTabOf(tab).makes));
// The arrows on the card: the grid, Down from its bottom row to Deconstruct, Up from it back
export function moveBench(i, dir) {
  if (i === BENCH_TAKE) return dir === 'up' ? BENCH_SLOTS - BENCH_COLS : i;
  if (dir === 'down' && i >= BENCH_SLOTS - BENCH_COLS) return BENCH_TAKE;
  return Math.min(BENCH_SLOTS - 1, Math.max(0, i + { left: -1, right: 1, up: -BENCH_COLS, down: BENCH_COLS }[dir]));
}
export const moveChoice = (i, dir, count) => Math.max(0, Math.min(count - 1, i + (dir === 'up' ? -1 : dir === 'down' ? 1 : 0)));
