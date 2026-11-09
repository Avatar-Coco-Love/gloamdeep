// § looks: what a profile's hero can wear (D-268): the cloak's colour, the eyes' colour and
// the lantern's trim, each from a set of six that fit the palette and clash with nothing that
// already means something (P3 to P5), and the clothes, four shapes of cloak (P6). Each cloak
// is its four shades, light to deepest, as the hero sprite's C, c, B and b; each eye colour is
// the sprite's e; each trim is the sprite's T and t; each clothes' pixels are in sprites.js.
// registry.js gathers these tables. The lamps are the lantern's shapes (D-702), the heads hats and hoods (D-703), their pixels in pictures.js. Plain data, no drawing.
import { moveOn } from './seedpad.js';
import { pick } from './rng.js';

export const CLOAKS = {
  teal: { id: 'teal', kind: 'cloak', name: 'Teal', shades: ['#a6e0e4', '#58a8b4', '#2f6a7c', '#1c3e4e'] }, // the study's
  moss: { id: 'moss', kind: 'cloak', name: 'Moss', shades: ['#b6dc8e', '#6fb04e', '#3c6e3a', '#223e24'] },
  heather: { id: 'heather', kind: 'cloak', name: 'Heather', shades: ['#e4b8cc', '#b07890', '#6e4660', '#3e2638'] },
  rust: { id: 'rust', kind: 'cloak', name: 'Rust', shades: ['#e8b48c', '#c0744a', '#7a4430', '#46261c'] },
  indigo: { id: 'indigo', kind: 'cloak', name: 'Indigo', shades: ['#b0bcf0', '#6c7ed0', '#3c4890', '#22285a'] },
  sand: { id: 'sand', kind: 'cloak', name: 'Sand', shades: ['#efe6cc', '#b9ab88', '#7a6e52', '#463e2c'] },
  // § patterns (D-515): each in its own colours, its base four shades and its marks' colours on the
  // light and dark sides (a second mark's for camo); `pattern` says where the marks fall
  // (sprites.js). Locked until bought with Glints (D-516); shown in the grid with a lock (D-533);
// `price`: the Glints it costs, 3 each (D-695). Zebra free for everyone (D-715).
  zebra: { id: 'zebra', kind: 'cloak', name: 'Zebra', pattern: 'zebra', shades: ['#efe6cc', '#d8cdb0', '#b9ab88', '#8f8468'], marks: ['#22262f', '#22262f'] },
  cow: { id: 'cow', kind: 'cloak', name: 'Cow', locked: true, price: 3, pattern: 'cow', shades: ['#efe6cc', '#d8cdb0', '#b9ab88', '#8f8468'], marks: ['#463e2c', '#22262f'] },
  camo: { id: 'camo', kind: 'cloak', name: 'Camo', locked: true, price: 3, pattern: 'camo', shades: ['#b6dc8e', '#6fb04e', '#3c6e3a', '#223e24'], marks: ['#7a4430', '#223e24'], second: ['#3c6e3a', '#46261c'] },
  // the second three (D-700): tiger rust with dark stripes, stars night indigo with bone and sky specks, moth sand with two eyespots
  tiger: { id: 'tiger', kind: 'cloak', name: 'Tiger', locked: true, price: 3, pattern: 'tiger', shades: ['#f0c49c', '#e8b48c', '#c0744a', '#7a4430'], marks: ['#22262f', '#22262f'] },
  stars: { id: 'stars', kind: 'cloak', name: 'Stars', locked: true, price: 3, pattern: 'stars', shades: ['#6c7ed0', '#3c4890', '#22285a', '#161a3c'], marks: ['#efe6cc', '#b0bcf0'], second: ['#a6e0e4', '#6c7ed0'] },
  moth: { id: 'moth', kind: 'cloak', name: 'Moth', locked: true, price: 3, pattern: 'moth', shades: ['#efe6cc', '#d8cdb0', '#b9ab88', '#7a6e52'], marks: ['#463e2c', '#22262f'], second: ['#a6e0e4', '#58a8b4'] },
};
export const CLOAK_IDS = Object.keys(CLOAKS);
// A profile's cloak: the one it chose, or teal when it has none (profiles from before P3), or a
// locked one it hasn't bought (D-533, D-696)
export const DEFAULT_CLOAK = 'teal';
export const cloakOf = (p) => (CLOAKS[p?.look?.cloak] && !isLocked('cloak', p.look.cloak, p.bought) ? p.look.cloak : DEFAULT_CLOAK);

// § eyes: two pixels in the hood (P4). Pink-red, gold, violet and black are kept out, as they
// look like enemies, the lantern or stairs, or vanish in the hood's outline.
export const EYES = {
  bone: { id: 'bone', kind: 'eyes', name: 'Bone', colour: '#efe6cc' }, // the study's
  ice: { id: 'ice', kind: 'eyes', name: 'Ice', colour: '#a6e0e4' },
  moss: { id: 'moss', kind: 'eyes', name: 'Moss', colour: '#b6dc8e' },
  sky: { id: 'sky', kind: 'eyes', name: 'Sky', colour: '#b0bcf0' },
  silver: { id: 'silver', kind: 'eyes', name: 'Silver', colour: '#9aa6b4' },
  brown: { id: 'brown', kind: 'eyes', name: 'Brown', colour: '#b07850' },
};
export const EYE_IDS = Object.keys(EYES);
// A profile's eyes: the ones it chose, or bone when it has none (profiles from before P4)
export const DEFAULT_EYES = 'bone';
export const eyesOf = (p) => (EYES[p?.look?.eyes] ? p.look.eyes : DEFAULT_EYES);

// § trims: the lantern's metal, its cap (light) and its base (dark); the flame and its light
// stay the same for everyone (D-268, P5). Gold, red and violet are kept out, as they look like
// the flame, enemies or stairs.
export const TRIMS = {
  brass: { id: 'brass', kind: 'trim', name: 'Brass', shades: ['#e8d5a0', '#a8642c'] }, // the study's
  iron: { id: 'iron', kind: 'trim', name: 'Iron', shades: ['#9aa6b4', '#4a5262'] },
  copper: { id: 'copper', kind: 'trim', name: 'Copper', shades: ['#e8a07a', '#8a4630'] },
  silver: { id: 'silver', kind: 'trim', name: 'Silver', shades: ['#e4e8ee', '#7a8494'] },
  verdigris: { id: 'verdigris', kind: 'trim', name: 'Verdigris', shades: ['#9cd4b8', '#3c6e5a'] },
  blackened: { id: 'blackened', kind: 'trim', name: 'Blackened', shades: ['#6b7686', '#22262f'] },
};
export const TRIM_IDS = Object.keys(TRIMS);
// A profile's trim: the one it chose, or brass when it has none (profiles from before P5)
export const DEFAULT_TRIM = 'brass';
export const trimOf = (p) => (TRIMS[p?.look?.trim] ? p.look.trim : DEFAULT_TRIM);

// § clothes: the shape of what the hero wears (P6); its colours are the cloak's, and the belt
// is the lantern's trim. The long cloak first, as every profile wore it before.
export const CLOTHES = {
  cloak: { id: 'cloak', kind: 'clothes', name: 'Cloak' }, // the study's, hem to the floor
  belted: { id: 'belted', kind: 'clothes', name: 'Belted' }, // cinched at the waist, a buckle
  short: { id: 'short', kind: 'clothes', name: 'Short' }, // to the knee, legs and boots below
  tattered: { id: 'tattered', kind: 'clothes', name: 'Tattered' }, // the hem torn into rags
};
export const CLOTHES_IDS = Object.keys(CLOTHES);
// A profile's clothes: the ones it chose, or the cloak when it has none (profiles from before P6)
export const DEFAULT_CLOTHES = 'cloak';
export const clothesOf = (p) => (CLOTHES[p?.look?.clothes] ? p.look.clothes : DEFAULT_CLOTHES);

// § lamps (D-702): the lantern's shape; it takes the trim's colours, and the flame and its light stay
// where they are. The study's lantern and Carriage free (D-715); the rest locked until bought, 3 Glints each.
export const LAMPS = {
  lantern: { id: 'lantern', kind: 'lamp', name: 'Lantern' }, // the study's
  carriage: { id: 'carriage', kind: 'lamp', name: 'Carriage' }, // a wide roof and a wide foot; free (D-715)
  dish: { id: 'dish', kind: 'lamp', name: 'Dish', locked: true, price: 3 }, // a bare flame on a dish, no glass
  pierced: { id: 'pierced', kind: 'lamp', name: 'Pierced', locked: true, price: 3 }, // dark tin, light through its holes
};
export const LAMP_IDS = Object.keys(LAMPS);
// A profile's lamp: the one it chose, or the lantern when it has none (profiles from before D-702) or a locked one it hasn't bought
export const DEFAULT_LAMP = 'lantern';
export const lampOf = (p) => (LAMPS[p?.look?.lamp] && !isLocked('lamp', p.look.lamp, p.bought) ? p.look.lamp : DEFAULT_LAMP);

// § heads (D-703, D-704): a hat or hood, its pixels in pictures.js; cloth takes the cloak's shades and metal
// the trim's. The study's hood, Brim and Ears free; the rest locked until bought, 3 Glints each.
export const HEADS = {
  hood: { id: 'hood', kind: 'head', name: 'Hood' }, // the study's
  brim: { id: 'brim', kind: 'head', name: 'Brim' }, // a wanderer's wide hat, all the trim's; free (D-704)
  ears: { id: 'ears', kind: 'head', name: 'Ears' }, // the hood with two pointed ears; free (D-704)
  helm: { id: 'helm', kind: 'head', name: 'Helm', locked: true, price: 3 }, // a metal cap with a nose guard, the trim's
  horned: { id: 'horned', kind: 'head', name: 'Horned', locked: true, price: 3 }, // the hood with two curled bone horns (D-704)
  pointed: { id: 'pointed', kind: 'head', name: 'Pointed', locked: true, price: 3 }, // a tall pointed hat, its tip bent over
  bobble: { id: 'bobble', kind: 'head', name: 'Bobble', locked: true, price: 3 }, // a knitted cap, a bone-white bobble
  circlet: { id: 'circlet', kind: 'head', name: 'Circlet', locked: true, price: 3 }, // a band across the brow, the trim's
  scarf: { id: 'scarf', kind: 'head', name: 'Scarf', locked: true, price: 3 }, // a cloth tied round the head, its knot at the side
};
export const HEAD_IDS = Object.keys(HEADS);
// A profile's head: the one it chose, or the hood when it has none (profiles from before D-703) or a locked one it hasn't bought
export const DEFAULT_HEAD = 'hood';
export const headOf = (p) => (HEADS[p?.look?.head] && !isLocked('head', p.look.head, p.bought) ? p.look.head : DEFAULT_HEAD);

// § the look card (D-517, D-521): a tab for each part across its top, row 0; under it that
// part's choices three to a row, the cloak's locked patterns a third and fourth row (D-533, D-700); then RANDOM and OK on the last row, RANDOM under the first two
// columns (D-522; the round cross does what Back did, D-399). Walked as the seed pad's keys are, but Up from the choices lands on the open tab and
// Down from a tab on the picked choice. The tabs are the same six keys, first, on every pad.
export const LOOK_TABS = [
  { id: 'cloak', name: 'CLOAK', table: CLOAKS, ids: CLOAK_IDS },
  { id: 'eyes', name: 'EYES', table: EYES, ids: EYE_IDS },
  { id: 'trim', name: 'TRIM', table: TRIMS, ids: TRIM_IDS },
  { id: 'clothes', name: 'CLOTHES', table: CLOTHES, ids: CLOTHES_IDS },
  { id: 'lamp', name: 'LAMP', table: LAMPS, ids: LAMP_IDS }, // D-702
  { id: 'head', name: 'HEAD', table: HEADS, ids: HEAD_IDS }, // D-703
];
export const CLOAK_COLS = 3;
const lookPad = (ids) => [
  ...LOOK_TABS.map((t, col) => ({ id: t.id, tab: true, row: 0, col, span: 1 })),
  ...ids.map((id, i) => ({ id, row: 1 + Math.floor(i / CLOAK_COLS), col: i % CLOAK_COLS, span: 1 })),
  { id: 'random', row: 1 + rowsOf(ids), col: 0, span: CLOAK_COLS - 1 },
  { id: 'ok', row: 1 + rowsOf(ids), col: CLOAK_COLS - 1, span: 1 },
];
const rowsOf = (ids) => Math.ceil(ids.length / CLOAK_COLS);
// The most rows of choices any tab has: every tab is laid out with this many, so the card holds still between tabs
export const LOOK_ROWS = Math.max(...LOOK_TABS.map((t) => rowsOf(t.ids)));
// § scroll (D-701): the card shows LOOK_WINDOW rows of choices at most; a tab with more scrolls
// them a row at a time, `scroll` being the rows hidden over the window. The window is as many
// rows as the most any tab has, up to that, so the card still holds still between tabs.
export const LOOK_WINDOW = 4;
export const LOOK_SHOWN = Math.min(LOOK_ROWS, LOOK_WINDOW);
export const tabRows = (tab) => rowsOf(tabOf(tab).ids);
// The scroll kept between none and the last row at the window's foot; rows: the tab's
export const clampScroll = (scroll, rows, shown = LOOK_SHOWN) => Math.max(0, Math.min(scroll, rows - shown));
// The scroll that shows choice row `row` (1 the first), moving as little as it can
export const scrollToRow = (scroll, row, rows, shown = LOOK_SHOWN) => clampScroll(Math.min(Math.max(scroll, row - shown), row - 1), rows, shown);
// The scroll with key i of tab's pad in view: a tab or a foot button leaves it as it is; shown: the
// window's rows on this view, one fewer on the smallest (D-702)
export function lookScrollTo(tab, scroll, i, shown = LOOK_SHOWN) {
  const k = LOOK_PADS[tab][i], rows = tabRows(tab);
  return !k || k.tab || k.id === 'random' || k.id === 'ok' ? clampScroll(scroll, rows, shown) : scrollToRow(scroll, k.row, rows, shown);
}
// Whether a tab's choice is locked: shown, tried on the big hero, never kept (D-533), until the
// profile has bought it; bought: the ids its profile bought with Glints (D-696)
export const isLocked = (tab, id, bought = []) => !!tabOf(tab)?.table[id]?.locked && !bought.includes(id);
export const LOOK_PADS = Object.fromEntries(LOOK_TABS.map((t) => [t.id, lookPad(t.ids)]));
export const tabOf = (id) => LOOK_TABS.find((t) => t.id === id);
// Key i on tab `tab`'s pad moved `dir`; picked: the tab's choice now (look[tab])
export function moveLook(tab, i, dir, picked) {
  const pad = LOOK_PADS[tab], k = pad[i];
  if (dir === 'up' && k.row === 1) return pad.findIndex((p) => p.tab && p.id === tab);
  if (dir === 'down' && k.tab) return pad.findIndex((p) => !p.tab && p.id === picked);
  return moveOn(pad, i, dir);
}
// § roll: RANDOM (D-517, D-522): a whole new look, each part picked from its free choices with
// r, a seeded rng (rng.js). Locked patterns are never rolled (D-517); bought ones are (D-696).
export const rollLook = (r, bought = []) => Object.fromEntries(LOOK_TABS.map((t) => [t.id, pick(r, t.ids.filter((id) => !isLocked(t.id, id, bought)))]));
// § buying (D-696): the Glints the patterns, lamps (D-702) and heads (D-703) bought cost in all
export const spentOn = (bought = []) => bought.reduce((g, id) => g + (choiceOf(id)?.price ?? 0), 0);
// The locked choice id on any tab, for its name and price (D-702, D-703)
export const choiceOf = (id) => CLOAKS[id] ?? LAMPS[id] ?? HEADS[id];
