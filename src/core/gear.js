// § gear: the hero's five gear slots, one row on the bag's card (D-552): Weapon, the hand
// (`state.held`, D-252), Tool (`state.tool`), Armour and two Charms (worn.js, D-458). A tool
// works only from its slot: the Stone Pick breaks a copper vein only there. Plain data, no drawing.
import { get } from './registry.js';
import { wornOf } from './worn.js';
import { say } from './lines.js';
import { bagAdd, bagSize } from './bag.js';

// Each slot in the row, left to right: its name and the item drawn faintly in it while empty;
// `key`, the state's field for the two that Take off empties (D-554)
export const GEAR = [
  { name: 'Weapon', ghost: 'knife', key: 'held' },
  { name: 'Tool', ghost: 'pick', key: 'tool' },
  { name: 'Armour', ghost: 'ratVest' },
  { name: 'Charm', ghost: 'wispCharm' },
  { name: 'Charm', ghost: 'wispCharm' },
];

// The row's items, an id or null each, in GEAR's order
export function gearRow(state) {
  const worn = wornOf(state), charms = worn.charm ?? [];
  return [state.held ?? null, state.tool ?? null, worn.armour?.[0] ?? null, charms[0] ?? null, charms[1] ?? null];
}

// The row in words, for the bag's spoken line: "Gear: Spear, Stone Pick, empty, ..."
export const gearWords = (state) => `Gear: ${gearRow(state).map((id) => (id ? get(id).name : 'empty')).join(', ')}`;

// A save from before the Tool slot: an empty one, or the Stone Pick from the bag in it, so it
// still breaks copper (D-552)
export function withTool(s) {
  if (s.tool !== undefined) return s;
  const i = (s.bag || []).findIndex((o) => get(o.id)?.tool);
  if (i < 0) return { ...s, tool: null };
  return { ...s, tool: s.bag[i].id, bag: s.bag.filter((o, j) => j !== i) };
}

// § take off: Take off on gear slot g (the Weapon's or the Tool's) puts its piece back in the
// bag with its `away` line, free: no turn passes (D-553, D-554). With no room, "Your bag is
// full." and it stays. Worn pieces can't come off (D-484): their slots have no `key`.
export const canTakeOff = (state, g) => !!(GEAR[g]?.key && state[GEAR[g].key]);
export function takeOff(state, g) {
  if (!canTakeOff(state, g)) return state;
  const key = GEAR[g].key, id = state[key], bag = bagAdd(state.bag, id, undefined, bagSize(state));
  if (!bag) return say(state, 'bagFull');
  return say({ ...state, bag, [key]: null }, get(id).away);
}
// Choosing gear slot g says its piece's Look line, as choosing a bag slot does (D-297), free
export function lookGear(state, g) {
  const id = gearRow(state)[g], look = id && get(id).look;
  return look ? say(state, look) : state;
}
