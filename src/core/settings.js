// § walking: the Swipe, Tap and Arrow pad lines (D-408; were the one Controls line,
// D-179, D-189). Swipe and the pad are On or Off, Swipe on and the pad off at first.
// Tap is Off, Step (one step toward the tap, held keeps stepping, D-042) or Walk (walk
// there, D-406), Step at first (D-449). They turn off only walking by swipes or taps
// in play; menus take both always. Kept on this device; if the browser's storage is
// blocked they stay as at first.
import { SEED_MAX } from './rng.js';

export const swipeText = (id) => 'Swipe: ' + (id === 'off' ? 'Off' : 'On');
const TAPS = ['off', 'step', 'walk'];
export const tapText = (id) => 'Tap: ' + { off: 'Off', step: 'Step', walk: 'Walk' }[id];
// Off, Step, Walk and round again; back goes the other way (D-449)
export const nextTap = (id, back = false) => TAPS[(TAPS.indexOf(id) + (back ? 2 : 1)) % 3];
export const padText = (id) => 'Arrow pad: ' + (id === 'on' ? 'On' : 'Off');
export const nextOnOff = (id) => (id === 'off' ? 'on' : 'off');
// What the switches let walk, from the settings: a swipe, or a tap or held finger on a tile,
// which walks there or steps toward it
export const swipesWalk = (s) => s.swipe !== 'off';
export const tapsWalk = (s) => s.tap === 'walk';
export const tapsStep = (s) => s.tap === 'step';
export const padShown = (s) => s.pad === 'on';

// § stop: when a walk to a tapped tile stops for a creature (D-407, D-408, Q-067):
// On sight, as it comes into view, or When noticed, once it has noticed the hero.
// A find coming into view stops it either way. On sight until picked.
export const stopText = (id) => 'Stop walking: ' + (id === 'noticed' ? 'When noticed' : 'On sight');
export const nextStop = (id) => (id === 'noticed' ? 'sight' : 'noticed');

// § motion: the Motion switch (D-179, D-190): Full or Reduced. Until it is picked
// (null) it follows the device's own reduced-motion setting; once picked, the pick wins.
export const stillMotion = (motion, deviceReduced) => (motion ? motion === 'reduced' : deviceReduced);
export const motionText = (motion, deviceReduced) => 'Motion: ' + (stillMotion(motion, deviceReduced) ? 'Reduced' : 'Full');
// Two choices, so picking it, Left and Right all flip it
export const nextMotion = (motion, deviceReduced) => (stillMotion(motion, deviceReduced) ? 'full' : 'reduced');

// § seed: Random (null) or a typed seed, 1 to 99999 (D-179, D-191). A typed seed
// starts every New journey until set back to Random. From the pause menu, a
// Random line also names this journey's seed, so a good world can be replayed.
export const seedText = (seed, journey = null) =>
  'Seed: ' + (seed ? seed : journey ? `Random (this one ${journey})` : 'Random');
const isSeed = (n) => Number.isInteger(n) && n >= 1 && n <= SEED_MAX;

// § lantern: By hand or By itself (Q-049, D-210). By itself, the lantern goes out
// as the hero steps into daylight and lights again back in the dark, only at that
// moment, so a press of the switch between holds. Off (By hand) until picked.
export const lanternText = (id) => 'Lantern: ' + (id === 'self' ? 'By itself' : 'By hand');
export const nextLantern = (id) => (id === 'self' ? 'hand' : 'self');

// § flasks: By hand or By itself (D-248, D-249). By itself, a flask in the bag
// pours itself once none of it would be wasted. Off (By hand) until picked.
export const flasksText = (id) => 'Flasks: ' + (id === 'self' ? 'By itself' : 'By hand');
export const nextFlasks = nextLantern;

// § sound: On or Off (D-178, D-255). Off until picked; the game is silent until the sound files are in (D-773).
export const soundText = (id) => 'Sound: ' + (id === 'on' ? 'On' : 'Off');
export const nextSound = (id) => (id === 'on' ? 'off' : 'on');
// § loudness: every sound's loudness together, 0% to 100% in steps of 10%, 100% until picked (D-822).
// A tap or pick goes up a step, 100% round to 0%; Left and Right go down and up, stopping at the ends.
const isLoud = (n) => Number.isInteger(n) && n >= 0 && n <= 100 && n % 10 === 0;
export const loudText = (n) => `Loudness: ${n}%`;
export const nextLoud = (n, dir = 'pick') =>
  dir === 'pick' ? (n >= 100 ? 0 : n + 10) : dir === 'left' ? Math.max(0, n - 10) : Math.min(100, n + 10);
// § kinds: a loudness for each of four kinds under Loudness, each a share of it (D-823):
// Steps (the lantern and the light too), Fighting (the creatures too), Finds (the bag and
// places too) and Menus; each moves as Loudness does, 100% until picked
export const LOUD_KINDS = [
  { id: 'loudSteps', kind: 'steps', name: 'Steps' },
  { id: 'loudFight', kind: 'fight', name: 'Fighting' },
  { id: 'loudFinds', kind: 'finds', name: 'Finds' },
  { id: 'loudMenus', kind: 'menus', name: 'Menus' },
];
export const kindText = (id, n) => `${LOUD_KINDS.find((k) => k.id === id).name}: ${n}%`;
// § each sound: On or Off, in a list opened from its kind's line (D-824); only the sounds heard so
// far, each named by what happens; `voice` is its name in render/sound.js. Off is kept in `muted`.
export const SOUND_LINES = [
  { voice: 'footstep', kind: 'steps', name: 'Grass' },
  { voice: 'stoneStep', kind: 'steps', name: 'Stone' },
  { voice: 'earthStep', kind: 'steps', name: 'Earth' },
  { voice: 'lantern', kind: 'steps', name: 'Lantern' },
  { voice: 'pour', kind: 'steps', name: 'Flask poured' },
  { voice: 'gutter', kind: 'steps', name: 'Oil runs out' },
  { voice: 'torch', kind: 'steps', name: 'Torch lit' },
  { voice: 'kindle', kind: 'steps', name: 'Campfire lit' },
  { voice: 'falling', kind: 'steps', name: 'Falling' }, // a fall and the waking after it (D-833)
  { voice: 'rooms', kind: 'steps', name: 'New rooms' }, // a new floor and a room never stood in
  { voice: 'lanternHit', kind: 'fight', name: 'Lantern hit' },
  { voice: 'knifeHit', kind: 'fight', name: 'Knife hit' },
  { voice: 'beaten', kind: 'fight', name: 'Beaten' },
  { voice: 'miss', kind: 'fight', name: 'Stiff miss' },
  { voice: 'hurt', kind: 'fight', name: 'Hurt' },
  { voice: 'poison', kind: 'fight', name: 'Poison' },
  { voice: 'rise', kind: 'fight', name: 'Level' },
  { voice: 'bites', kind: 'fight', name: 'Bites' }, // every creature's bite, and the oil tick's drink, together (D-832)
  { voice: 'creatures', kind: 'fight', name: 'Creatures' }, // the creatures' own sounds together (D-833)
  { voice: 'pat', kind: 'finds', name: 'Into the bag' },
  { voice: 'draw', kind: 'finds', name: 'Weapon drawn' },
  { voice: 'thunk', kind: 'finds', name: 'Tile set down' },
  { voice: 'clink', kind: 'finds', name: 'Digging' },
  { voice: 'crumble', kind: 'finds', name: 'Stone breaks' },
  { voice: 'chest', kind: 'finds', name: 'Chest' },
  { voice: 'coins', kind: 'finds', name: 'Coins' },
  { voice: 'shelf', kind: 'finds', name: 'Shelf' },
  { voice: 'sow', kind: 'finds', name: 'Planting' },
  { voice: 'feed', kind: 'finds', name: 'Feeding' },
  { voice: 'eat', kind: 'finds', name: 'Eating' }, // D-833
  { voice: 'tools', kind: 'finds', name: 'Making' },
  { voice: 'places', kind: 'finds', name: 'Places' }, // the waystone's bells and hum, the boon's chime, fishing, sleeping, people leaving and arriving
  { voice: 'tap', kind: 'menus', name: 'Tick' },
  { voice: 'card', kind: 'menus', name: 'Page turn' },
  { voice: 'refuse', kind: 'menus', name: "Can't" }, // and "You can't carry more" (D-833)
  { voice: 'ended', kind: 'menus', name: 'Run ends' },
];
export const soundsOf = (kind) => SOUND_LINES.filter((l) => l.kind === kind);
// The creatures' bites share one line, Bites, so Fighting's list still fits the smallest card (D-832)
export const BITES = ['teeth', 'glass', 'sting', 'hiss', 'squeak', 'snuffle', 'snap', 'rustle', 'rattle', 'sip', 'gloam', 'flutter', 'grind'];
// The same for the creatures' own sounds, a fall and waking, new floors and rooms, and places (D-833)
export const GROUPS = { bites: BITES, creatures: ['pack', 'jolt', 'tail', 'burrow', 'bonesFall', 'bonesStand', 'statue', 'spit', 'splat'], falling: ['fall', 'wake'], rooms: ['floor', 'room'], places: ['bells', 'hum', 'chime', 'plop', 'splash', 'breath', 'shimmer'] };
const lineOf = (voice) => Object.keys(GROUPS).find((g) => GROUPS[g].includes(voice)) ?? voice;
export const isMuted = (s, voice) => (s.muted ?? []).includes(lineOf(voice));
export const voiceText = (voice, muted) => `${SOUND_LINES.find((l) => l.voice === voice).name}: ${muted ? 'Off' : 'On'}`;
export const toggleMuted = (s, voice) => (isMuted(s, voice) ? (s.muted ?? []).filter((v) => v !== voice) : [...(s.muted ?? []), voice]);
// How loud a kind plays, 0 to 1: Loudness times the kind's share (D-823)
export const loudOf = (s, kind) => ((s.loud ?? 100) / 100) * ((s[LOUD_KINDS.find((k) => k.kind === kind)?.id] ?? 100) / 100);

// § stats line: On or Off (D-412). On, a short line bottom left in play: fps, turn, time
// of day, xp, the hero's tile and the seed, what the panel doesn't show. Off until picked.
export const statsText = (id) => 'Stats line: ' + (id === 'on' ? 'On' : 'Off');
export const statsShown = (s) => s.stats === 'on';

// § attack marks: On or Off (D-730). Off, no creature's next move shows: not the icons on the
// creature list's plaques, the framed one's arrow, a glob's next tile, nor the tiles a raised tail
// will strike. Lines, the glob itself and a raised tail's tremble stay. On until picked.
export const marksText = (id) => 'Attack marks: ' + (id === 'off' ? 'Off' : 'On');
export const marksShown = (s) => s.marks !== 'off';

// § storage: localStorage, wrapped (TECH.md)
const KEY = 'gloamdeep-settings';
export function loadSettings() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(KEY)); } catch { /* not kept */ }
  const onOff = (v, was) => (v === 'on' || v === 'off' ? v : was); // the old Controls line's pick carries over
  const swipe = onOff(s?.swipe, s?.controls === 'tap' ? 'off' : 'on');
  // Tap starts on Step (D-449). Settings kept before it keep Tap to walk's pick, On as Walk;
  // Tap to walk had gone off for everyone once (D-422): an On kept before then, without taps: 2, was dropped
  const tap = TAPS.includes(s?.tap) ? s.tap : !s ? 'step' : s.taps === 2 && s.tapwalk === 'on' ? 'walk' : 'off';
  const pad = s?.pad === 'on' ? 'on' : 'off';
  const stop = s?.stop === 'noticed' ? 'noticed' : 'sight';
  const motion = s?.motion === 'full' || s?.motion === 'reduced' ? s.motion : null;
  const seed = isSeed(s?.seed) ? s.seed : null;
  const lantern = s?.lantern === 'self' ? 'self' : 'hand';
  const flasks = s?.flasks === 'self' ? 'self' : 'hand';
  const sound = s?.sound === 'on' ? 'on' : 'off';
  const loud = isLoud(s?.loud) ? s.loud : 100;
  const kinds = Object.fromEntries(LOUD_KINDS.map(({ id }) => [id, isLoud(s?.[id]) ? s[id] : 100])); // D-823
  const muted = Array.isArray(s?.muted) ? s.muted.filter((v) => SOUND_LINES.some((l) => l.voice === v)) : []; // D-824
  const stats = s?.stats === 'on' ? 'on' : 'off';
  const marks = s?.marks === 'off' ? 'off' : 'on';
  return { swipe, tap, pad, stop, motion, seed, lantern, flasks, sound, loud, ...kinds, muted, stats, marks };
}
export function saveSettings(s) {
  try { localStorage.setItem(KEY, JSON.stringify({ ...s, taps: 2 })); } catch { /* not kept */ }
}
