// § gear: the hero's five gear slots, one row on the bag's card (D-552): Weapon, the hand
// (`state.held`, D-252), Tool (`state.tool`), Armour and two Charms (worn.js, D-458). A tool
// works only from its slot: the Stone Pick breaks a copper vein only there. Plain data, no drawing.
import { get } from './registry.js';
import { wornOf } from './worn.js';

// Each slot in the row, left to right: its name and the item drawn faintly in it while empty
export const GEAR = [
  { name: 'Weapon', ghost: 'knife' },
  { name: 'Tool', ghost: 'pick' },
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
