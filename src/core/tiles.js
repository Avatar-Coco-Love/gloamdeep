// § tiles: every tile kind, keyed by id (D-040, D-048). `letter` is how a
// room map writes it. registry.js gathers this table with the other kinds.
import { DAY_TURNS } from './daytime.js';
import { hash } from './noise.js';

// The stairs' glow: the art's stairs violet (#a58ce0), faint (D-134), and since
// D-194 half as bright, reaching 1 tile: the stairs and a touch beside them.
const GLOW = { reach: 1, cr: 0.325, cg: 0.275, cb: 0.44 };

export const TILES = {
  wall: { id: 'wall', kind: 'tile', letter: '#', name: 'Wall', solid: true, blocksLight: true },
  floor: { id: 'floor', kind: 'tile', letter: '.', name: 'Floor', solid: false, blocksLight: false },
  // One round tree a tile, in the woods (D-209): solid, and the view stops at it.
  // Chopped as a deposit is mined (W3, D-317): 4 bumps fell it for 3 Wood, but never
  // on the room's edge (`inner`), where a bump says its `edge` line, free (D-321), and it
  // `leaves` a stump, in the stump's look. It grows back on that stump (`on`), its own
  // tile, after 3 days, out of sight.
  tree: { id: 'tree', kind: 'tile', letter: 'T', name: 'Tree', solid: true, blocksLight: true, regrow: 3 * DAY_TURNS, near: 0, on: 'stump',
    mine: { hits: 4, chips: ['treeHack', 'treeChips', 'treeGroan'], drops: 'wood', n: 3, breaks: 'treeTake', full: 'woodFull', leaves: 'stump', inner: true, edge: 'treeEdge' } },
  // What a felled tree leaves (W3, D-317): walked over, light passes over it; one of
  // `forms` looks, picked by its tile (a clean cut, splintered, mossy with roots).
  stump: { id: 'stump', kind: 'tile', letter: 'S', name: 'Stump', solid: false, blocksLight: false, forms: 3 },
  // The first cave's mouth on a woods edge, with a rock either side (D-211). Walking
  // off the edge from the mouth goes into the cave, as through any opening (D-197).
  caveMouth: { id: 'caveMouth', kind: 'tile', letter: 'M', name: 'Cave mouth', solid: false, blocksLight: false },
  outcrop: { id: 'outcrop', kind: 'tile', letter: 'R', name: 'Rock', solid: true, blocksLight: true },
  // A round boulder on a cave floor (D-282, D-311): solid, but light passes over it.
  // Bumped `mine.hits` times, a turn each, with its `chips` lines, it breaks to floor and
  // `drops` goes into the bag with its `breaks` line (turn.js, O2). Broken, it grows
  // back after 3 days, out of sight, as things picked do, within `near` steps of where
  // it stood (regrow.js, O3, D-313).
  deposit: { id: 'deposit', kind: 'tile', letter: 'O', name: 'Deposit', solid: true, blocksLight: false, regrow: 3 * DAY_TURNS, near: 2,
    mine: { hits: 3, chips: ['depositChip', 'depositCrack'], drops: 'stone', breaks: 'stoneTake' } },
  // A copper vein, a boulder flecked with copper, one in each Cave room from depth 3 (D-480):
  // mined as a deposit is, but only with the pick it `needs` in the bag; without, its `hard`
  // line, free. 4 bumps give a Copper Ore; it grows back after 6 days, slower than stone.
  vein: { id: 'vein', kind: 'tile', letter: 'V', name: 'Copper vein', solid: true, blocksLight: false, regrow: 6 * DAY_TURNS, near: 2,
    mine: { hits: 4, chips: ['veinChip', 'veinChip2', 'veinCrack'], drops: 'copperOre', breaks: 'copperOreTake', needs: 'pick', hard: 'veinHard' } },
  // A fallen branch on the woods floor (W2, D-316): mined as a deposit is, but 2 bumps
  // give `n` Wood. It lies in one of `forms` looks, picked by its tile (formOf), and the
  // Wood it gives takes that look. With room for fewer than `n`, the rest lies on its
  // tile as a stick that never grows back (`once`); with none, its `full` line, free.
  branch: { id: 'branch', kind: 'tile', letter: 'F', name: 'Fallen branch', solid: true, blocksLight: false, regrow: 3 * DAY_TURNS, near: 2, forms: 3,
    mine: { hits: 2, chips: ['branchCreak'], drops: 'wood', n: 2, breaks: 'branchTake', full: 'woodFull' } },
  // A workbench set down on the surface (WB2, D-322): solid like a tree, but light
  // passes over it, as over a deposit. Bumping it opens its `panel` (WB3, D-323), where
  // Deconstruct `takes` it back into the bag as the item `workbench`.
  bench: { id: 'bench', kind: 'tile', letter: 'W', name: 'Workbench', solid: true, blocksLight: false, panel: 'bench', takes: { item: 'workbench', says: 'benchTake' } },
  // A stash chest set down on the surface, the bench's way (CH2, D-329): solid like a
  // tree, light passing over it; bumping it opens its panel, 12 slots (CH3, D-330),
  // where Deconstruct chest `takes` it back into the bag, only when empty (CH5).
  stash: { id: 'stash', kind: 'tile', letter: 'C', name: 'Stash chest', solid: true, blocksLight: false, panel: 'chest', takes: { item: 'chest', says: 'chestTake', empty: 'chestNotEmpty' } },
  // A torch's stone foot, set down from the bag anywhere (D-478): solid like the bench,
  // light passing over it, with a lit torch on it (mount.js) until it burns out.
  torchStand: { id: 'torchStand', kind: 'tile', letter: 'I', name: 'Torch', solid: true, blocksLight: false },
  // Stepping onto stairs takes them (D-130); they glow a faint, steady violet once found (D-134, D-194).
  stairsDown: { id: 'stairsDown', kind: 'tile', letter: '>', name: 'Stairs down', solid: false, blocksLight: false, leads: 'down', arrive: 'stairsUp', line: 'stairsDown', glow: GLOW },
  stairsUp: { id: 'stairsUp', kind: 'tile', letter: '<', name: 'Stairs up', solid: false, blocksLight: false, leads: 'up', arrive: 'stairsDown', line: 'stairsUp', glow: GLOW },
};

// A tile kind's look at x, y, of its `forms`, the same each time (W2): 0 when it has one
export const formOf = (tile, x, y) => Math.floor(hash(x, y, 31) * (tile.forms || 1));

// Anything outside the map counts as wall, so rooms are always closed in.
export const OUTSIDE = '#';
