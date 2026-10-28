// § walking: the Swipe, Tap to walk and Arrow pad switches (D-408; were the one Controls line,
// D-179, D-189), each On or Off, Swipe and Tap to walk on at first, the pad off (D-406). They turn off only walking by
// swipes or taps in play; menus take both always. Kept on this device; if the
// browser's storage is blocked they stay on.
import { SEED_MAX } from './rng.js';

export const swipeText = (id) => 'Swipe: ' + (id === 'off' ? 'Off' : 'On');
export const tapWalkText = (id) => 'Tap to walk: ' + (id === 'off' ? 'Off' : 'On');
export const padText = (id) => 'Arrow pad: ' + (id === 'on' ? 'On' : 'Off');
export const nextOnOff = (id) => (id === 'off' ? 'on' : 'off');
// What the switches let walk, from the settings: a swipe, or a tap or held finger on a tile
export const swipesWalk = (s) => s.swipe !== 'off';
export const tapsWalk = (s) => s.tapwalk !== 'off';
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

// § sound: On or Off (D-178, D-255). Off until picked, while the sounds get player ready.
export const soundText = (id) => 'Sound: ' + (id === 'on' ? 'On' : 'Off');
export const nextSound = (id) => (id === 'on' ? 'off' : 'on');

// § storage: localStorage, wrapped (TECH.md)
const KEY = 'gloamdeep-settings';
export function loadSettings() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(KEY)); } catch { /* not kept */ }
  const onOff = (v, was) => (v === 'on' || v === 'off' ? v : was); // the old Controls line's pick carries over
  const swipe = onOff(s?.swipe, s?.controls === 'tap' ? 'off' : 'on');
  const tapwalk = onOff(s?.tapwalk, s?.controls === 'swipe' ? 'off' : 'on');
  const pad = s?.pad === 'on' ? 'on' : 'off';
  const stop = s?.stop === 'noticed' ? 'noticed' : 'sight';
  const motion = s?.motion === 'full' || s?.motion === 'reduced' ? s.motion : null;
  const seed = isSeed(s?.seed) ? s.seed : null;
  const lantern = s?.lantern === 'self' ? 'self' : 'hand';
  const flasks = s?.flasks === 'self' ? 'self' : 'hand';
  const sound = s?.sound === 'on' ? 'on' : 'off';
  return { swipe, tapwalk, pad, stop, motion, seed, lantern, flasks, sound };
}
export function saveSettings(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* not kept */ }
}
