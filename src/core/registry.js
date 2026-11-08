// § registry: the one list of everything in the game (TECH.md, D-048). Each
// kind keeps its own small file; this gathers them. Menus, the dev spawn tool
// and saves read from here, never from a hand-written list.
import { TILES } from './tiles.js';
import { ITEMS } from './items.js';
import { LIGHTS } from './lights.js';
import { ENEMIES } from './enemies.js';
import { PEOPLE } from './people.js';
import { UPGRADES as GROWTH_UPGRADES } from './upgrades.js';
import { LANDMARKS as LANDMARK_TABLE } from './landmarks.js';
import { BOONS as BOON_TABLE, BOON_SORTS as BOON_SORT_NAMES } from './boons.js';
import { CLOAKS as LOOK_CLOAKS, EYES as LOOK_EYES, TRIMS as LOOK_TRIMS, CLOTHES as LOOK_CLOTHES, LAMPS as LOOK_LAMPS } from './looks.js';

const KINDS = [TILES, ITEMS, LIGHTS, ENEMIES, PEOPLE]; // people (NPCs) from their own file (D-490)
// What a hero can wear (P3 to P6): not things in the world, so not in ALL or the dev spawn tool
export const CLOAKS = LOOK_CLOAKS;
export const EYES = LOOK_EYES;
export const TRIMS = LOOK_TRIMS;
export const CLOTHES = LOOK_CLOTHES;
export const LAMPS = LOOK_LAMPS; // the lantern's shapes (D-702)
// The Growth tree's upgrades (D-481): bought with embers, not things in the world either
export const UPGRADES = GROWTH_UPGRADES;
// Landmarks bigger than one tile (D-587): plans of tiles, not things in the world one at a time
export const LANDMARKS = LANDMARK_TABLE;
// The home waystone's boons (D-583, D-596): picked for a trip, not things in the world either
export const BOONS = BOON_TABLE;
export const BOON_SORTS = BOON_SORT_NAMES;

export const ALL = KINDS.flatMap((table) => Object.values(table));
const BY_ID = new Map(ALL.map((e) => [e.id, e]));
const BY_LETTER = new Map(Object.values(TILES).map((t) => [t.letter, t]));

// § lookups
export const get = (id) => BY_ID.get(id);
export const byLetter = (ch) => BY_LETTER.get(ch);
export const byKind = (kind) => ALL.filter((e) => e.kind === kind);
// A creature that starts asleep: one in disguise (D-368), or one that `sleeps` as itself (D-692)
export const asleepAtFirst = (entry) => !!(entry?.looksLike || entry?.sleeps);
