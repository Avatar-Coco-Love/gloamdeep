// § pictures: the 16 × 16 pixel pictures, moved word for word from `sprites.js` at 0.3.72,
// the ninth audit (D-617). `sprites.js` makes and draws them. Pixel maps are written as
// strings, one letter per palette colour; symmetric ones store the left half and mirror it
// (style study 1, lines 121–176, ART-DIRECTION.md "Sprites"). The creatures and the finds they leave,
// from the rat to the mimic leaf, are in `pictures-creatures.js` (D-782); the finds you carry, from
// the flask to the ember, in `pictures-finds.js` (D-910).
const PAL = {
  k: '#0e0c16', w: '#efe6cc', C: '#a6e0e4', c: '#58a8b4', B: '#2f6a7c', b: '#1c3e4e',
  y: '#ffd66b', Y: '#f39a3b', O: '#a8642c', o: '#e9a94a', a: '#e8d5a0',
  S: '#9aa6b4', s: '#6b7686', d: '#4a5262', p: '#e8786a', e: '#efe6cc', // e: the hero's eyes
  A: '#b9ab88', // bone's shade (ART-DIRECTION.md palette)
  T: '#e8d5a0', t: '#a8642c', // the lantern's trim, cap and base (P5)
  g: '#6fb04e', G: '#3c6e3a', // moss (ART-DIRECTION.md palette)
  r: '#d8483c', R: '#8c2430', // the heartcap's bright red, light and shade (D-303)
  W: '#9a7350', N: '#6a4c36', n: '#3e2c20', // wood, light to dark, the trunk's browns (D-314)
  q: '#5d5672', Q: '#3a344b', // the cave spider's dusky violet-grey, light and shade (D-535)
  h: '#2c5230', I: '#1d3620', u: '#3a4590', v: '#8a98e0', // the bush's shade greens, from the tree's crown; the gloamberry's blue, dark and light (D-531)
  H: '#6a7489', L: '#555e73', M: '#4b5468', D: '#434b5d', x: '#262a35', // grey rock's face, lit top to seam (D-311)
  E: '#6c5b48', F: '#4a3d30', f: '#2a221b', // soil, from the earth's colours (ART-DIRECTION-2.md "Earth"), the garden bed's (D-565)

  z: '#c4553a', U: '#7e3020', Z: '#4e1c16', V: '#b6e07a', // the centipede's rust, light to dark, and venom's pale green (D-654)
  J: '#eaffb8', // the spit grub's bright glow, at the heart of venom's green (D-688)
  P: '#a58ce0', // stairs and unusual things (ART-DIRECTION.md palette), the warden's eyes (D-692)
  j: '#6e58a8', // the duskstar's violet shade, under the unusual things' violet (D-763)
};

// § blank: the grey "?" a thing made by tools/make.js wears until it is drawn (D-622): plainly
// unfinished, a light grey "?" on a dark grey square, outlined
const BLANK = { mirror: false, rows: [
  '', '.kkkkkkkkkkkkkk.', '.kddddddddddddk.', '.kddddddddddddk.', '.kddddSSSSddddk.', '.kdddSSddSSdddk.',
  '.kdddddddSSdddk.', '.kddddddSSddddk.', '.kdddddSSdddddk.', '.kdddddSSdddddk.', '.kddddddddddddk.',
  '.kdddddSSdddddk.', '.kddddddddddddk.', '.kkkkkkkkkkkkkk.'] };

// § hero: the study's hero, with the lantern held out to its right (D-042, D-056).
// `extra` pixels are drawn over the mirrored rows: [x, y, colour letter].
const HERO = { mirror: true, rows: [
  '........', '......kk', '.....kCc', '....kCcc', '...kCckk', '...kckkk', '...kckek', '...kcBkk',
  '...kccBB', '..kcccBB', '..kccBBB', '..kcBBBb', '..kcBBbB', '..kBBbbB', '...kkbkk', '....kk..'],
  extra: [[13, 7, 'k'], [12, 8, 'k'], [13, 8, 'T'], [14, 8, 'k'], [11, 9, 'k'], [12, 9, 'y'], [13, 9, 'w'], [14, 9, 'y'], [15, 9, 'k'],
    [11, 10, 'k'], [12, 10, 'Y'], [13, 10, 'y'], [14, 10, 'Y'], [15, 10, 'k'], [12, 11, 'k'], [13, 11, 't'], [14, 11, 'k']] };
// § clothes: the rows each kind of clothes (P6) puts in place of the hero's, left halves, mirrored
// as the hero's are. The belt is the trim's base with its cap for the buckle.
const CLOTHES_ROWS = {
  cloak: {},
  belted: { 10: '..kttttT' },
  short: { 12: '..kcBBbB', 13: '...kkkkk', 14: '....kdk.', 15: '....kk..' },
  tattered: { 13: '..kBkbkB', 14: '..k.kbk.', 15: '' },
};
// § lamps (D-702): the lantern's shapes from their mock-up, each in place of the hero's `extra`:
// its top row's y, then rows of 5 pixels for x 11 to 15 ('.' leaves the hero's own pixel). The
// lantern is the hero's own; T and t take the trim's cap and base, the flame stays.
const LAMP_ROWS = {
  carriage: [6, '..k..', '.kTk.', 'kTTTk', 'kywyk', 'kYyYk', 'ktttk'], // a wide roof and a wide foot
  dish: [7, '..k..', '.kwk.', 'kyYyk', 'kTTTk', '.ktk.'], // a bare flame on a dish
  pierced: [7, '..k..', '.kTk.', 'kTyTk', 'kyTyk', '.ktk.'], // dark tin, light through its holes
};
const lampExtra = (lamp) => {
  const l = LAMP_ROWS[lamp];
  if (!l) return HERO.extra;
  const [top, ...rows] = l;
  return rows.flatMap((r, i) => [...r].flatMap((ch, j) => (ch === '.' ? [] : [[11 + j, top + i, ch]])));
};
// § heads (D-703, D-704): the hats and hoods from their mock-up, each in place of the hood's top: whole rows of
// 16 from y 0, '.' leaving the hero's own pixel and '_' clearing it. The hood is the hero's own; the
// cloth takes the cloak's shades, the metal and Brim the trim's, horns and bobbles bone, and the face's shade and eyes stay.
const HEAD_ROWS = {
  brim: ['______kkkk______', '_____kTTTtk_____', '_____kttttk_____', '_kkkkTTTTTtkkkk_', 'kTTTTTTTTTTttttk', '_kkkkkkkkkkkkkk_'], // a wanderer's wide hat, all the trim's (D-704)
  ears: ['....kk....kk....', '....kCk..kck....', '....kCc..cBk....'], // the hood with two pointed ears
  helm: ['________________', '______kkkk______', '_____kTTTtk_____', '____kTTTTttk____', '___ktttttttbk___', '...kckkttkkck...'], // a metal cap, a nose guard
  horned: ['..kk........kk..', '.kwk..kkkk..kwk.', '.kwAk......kAwk.', '..kwAk....kAwk..'], // the hood with two curled horns, always bone white (D-704)
  pointed: ['_________kkk____', '_______kkCck____', '______kCcck_____', '_kkkkCTTTtBBkkk_', 'kCcccccccccBBbbk', '_kkkkkkkkkkkkkk_'], // a tall pointed hat, its tip bent over
  bobble: ['______kwwk______', '_____kkAAkk_____', '____kCcCcCck____', '___kCcCcCcCBk___', '...kwAwAwAwAk...'], // a knitted cap, a bone-white bobble
  circlet: ['', '', '', '....kTTttTTk....'], // the hood with a thin band across the brow, the trim's
  scarf: ['________________', '______kkkk______', '_____kCcccBk____', '____kCccccBBk___', '...kccBBBBbbkkk.', '...kckkkkkkcbBbk', '............kbk.'], // a cloth tied round the head, its knot at the side
};
// The hero's rows whole, 16 wide, with a head's rows over them
const whole = (r) => { r = (r + '........').slice(0, 8); return r + [...r].reverse().join(''); };
const headed = (rows, head) => rows.map((r, y) => [...whole(r)].map((ch, x) => { const h = HEAD_ROWS[head][y]?.[x]; return !h || h === '.' ? ch : h === '_' ? '.' : h; }).join(''));
const dressed = (clothes, lamp, head) => {
  const rows = HERO.rows.map((r, i) => (CLOTHES_ROWS[clothes] ?? {})[i] ?? r), extra = lampExtra(lamp);
  return HEAD_ROWS[head] ? { mirror: false, rows: headed(rows, head), extra } : { ...HERO, rows, extra };
};
// § wood: three looks, one per stick as it lies (W1, D-314): a straight stick,
// a forked twig with a leaf, a crooked branch, in the trees' trunk browns
const WOODS = [
  { mirror: false, rows: [
    '', '', '', '', '...........kk...', '..........kWNk..', '.........kWNnk..', '........kWNnk...', '.......kWNnk....',
    '......kWNnk.....', '.....kWNnk......', '....kWNnk.......', '...kWNnk........', '..kNnnk.........', '...kkk..........'] },
  { mirror: false, rows: [
    '', '', '', '...kk......kk...', '..kggk....kWNk..', '..kgGk...kWNnk..', '...kGNk.kWNnk...', '....kWNkWNnk....', '.....kWNNnk.....',
    '.....kWNnk......', '....kWNnk.......', '...kWNnk........', '..kNnnk.........', '...kkk..........'] },
  { mirror: false, rows: [
    '', '', '', '', '', '', '', '', '..kkk...........', '.kWWNkkk....kk..', '.kNNnWWNkkkkWNk.', '..kknNnnWWWNNnk.', '....kkkknnnnnk..',
    '........kkkkk...'] },
];

// § branch: three looks, one per fallen branch as it lies (W2, D-316): a bough
// with two twigs up, a shorter one with leaves at its end, a snapped bough with
// a pale ring and a patch of moss, in the sticks' browns
const BRANCHES = [
  { mirror: false, rows: [
    '', '', '', '', '...........kk...', '....kk....kWNk..', '...kWNk...kNnk..', '....kNnk.kNnk...', '.....kNnkWNk....',
    '..kkkkkWWWNkkkk.', '.kWWWWWWWWWWWWNk', 'kWNNNNNNNNNNNNnk', 'kNnnnnnnnnnnnnk.', '.kkkkkkkkkkkkk..'] },
  { mirror: false, rows: [
    '', '', '', '..........kkk...', '.........kgggk..', '.......kkgGggGk.', '......kgGgkGggk.', '......kGgkWkGGk.', '.......kkWNkkk..',
    '..kkkkkWWNk.....', '.kWWWWWWNNk.....', 'kWNNNNNNnnk.....', 'kNnnnnnnnk......', '.kkkkkkkk.......'] },
  { mirror: false, rows: [
    '', '', '', '', '', '', '...........kk...', '..........kWk...', '..kk.....kNk....',
    '.kaakkkkkWkkkk..', 'kaOakWWWgWWWWNk.', 'kaaakNNgGNNNNnk.', '.kakkNnnnnnnnnk.', '..k..kkkkkkkkk..'] },
];

// § stump: three looks, one per felled tree as its tile picks (W3, D-317): a clean
// cut with a pale ring, a splintered one, a low mossy one with roots, in the trunk's browns
const STUMPS = [
  { mirror: false, rows: [
    '', '', '', '', '', '.....kkkkkk.....', '....kNWWWWNk....', '...kWaaaaaaNk...', '...kWaOOOOaNk...', '...kWOaaaaONk...',
    '...kNaOOOOaNk...', '...kWNNNNNNnk...', '...kWNnNNnNnk...', '..kWWNnNNnNnnk..', '..kkkkkkkkkkkk..'] },
  { mirror: false, rows: [
    '', '', '', '.....k....k.....', '....kak..kak....', '...kWaak.kaNk...', '...kWaaakaaNk...', '...kWNaaaaNnk...', '...kWNNaaNNnk...',
    '...kWNnNNnNnk...', '...kWNnNNnNnk...', '...kWNNNnNNnk...', '..kWWNnNNnNnnk..', '..kkkkkkkkkkkk..'] },
  { mirror: false, rows: [
    '', '', '', '', '', '', '.....kkkkkk.....', '....kgGWWWNk....', '...kggaaaaaNk...', '...kGgaOOaaNk...', '...kWaaaaaaNk...',
    '...kWNNnNNnnk...', '.kkWWNnNNnNnnkk.', 'kWNnkNnNNnNnkNnk', '.kk.kkkkkkkkk.kk'] },
];

// § gloamberry bush: a low round bush in the moss greens with dark blue berries, each lit at its
// upper left (look A of the step 13b mock-up, D-531); bare, the same bush with no berries. Its
// base on row 14, as the deposit's, so it rests on its shadow (D-532)
const BERRY_BUSH = { mirror: false, rows: [
  '', '', '', '', '......kkkk......', '....kkggggkk....', '...kgggvuGGhk...', '..kggvuGGGGhhk..', '..kgGuuGGvuGhk..',
  '.kgGGGGGGuuGhhk.', '.kGvuGGGGGGhhhk.', '.kGuuGGhGvuhhhk.', '.khGGGhhhuuhhIk.', '..khhhhhhhhhIk..', '...kkkkkkkkkk...'] };
const BARE_BUSH = { mirror: false, rows: BERRY_BUSH.rows.map((r) => r.replace(/v/g, 'g').replace(/u/g, 'G')) };
// § workbench: planks on four legs, a grey vise on its top left corner and a
// shelf between the legs, in the trunk's browns (WB1, D-320, look B of three)
const WORKBENCH = { mirror: false, rows: [
  '', '', '..kkkk..........', '.kSSSskkkkkkkkk.', '.kdssdkaaaaaaak.', '.kWkkWWNWWWWNWk.', '.kWWWWWNWWWWNWk.', '.kWWWWWNWWWWNWk.',
  '.kNNNNNNNNNNNNk.', '.knnnnnnnnnnnnk.', '..kNk......kNk..', '..kNkkkkkkkkNk..', '..kNkNNNNNNkNk..', '..knknnnnnnknk..', '..kkkkkkkkkkkk..'] };

// § chest: the stash chest, a rounded wooden lid, grey stone at its corners and a
// gold latch, in the trunk's browns and the rock's greys (CH1, D-324, look B of three)
const CHEST = { mirror: false, rows: [
  '', '', '', '....kkkkkkkk....', '..kkWWWWWWWWkk..', '.kHWWWWWWWWWWHk.', '.kLNNNNNNNNNNLk.', '.kkkkkkkkkkkkkk.', '.kHWWWkyykWWWHk.', '.kLWWWWkkWWWWLk.',
  '.kLNNNNNNNNNNLk.', '.kMNNNNNNNNNNMk.', '.kDnnnnnnnnnnDk.', '.kkkkkkkkkkkkkk.'] };

// § rubble: a tall, dense heap of fallen rock in the deposit's greys, filling most of its
// tile (step 12a mock-up, D-490)
const RUBBLE = { mirror: false, rows: [
  '', '', '.....kkk........', '....kHLLk.kkk...', '...kHLMMkkHLLk..', '..kkLMDkHLLMMDk.', '.kHLkDkHLMMDDkk.', '.kLMMkHLMDDkHLLk',
  'kkMDDkLMDDkHLMMk', 'kHLkkkkDDkHLMDDk', 'kLMMDkHLkkLMDDkk', 'kMDDkHLMMkkDkHLk', 'kkkkkLMMDDkkHLMk', 'kHLLkMDDDkHLMDDk', 'kLMDDkkkkkLMDDDk', '.kkkkkkkkkkkkkk.'] };
// § peddler: look A of the step 12a mock-up (D-490), side on and facing left: a brown hood
// with one pale eye, a canvas bundle on his back tied with amber cord, a grey pot below
const PEDDLER = { mirror: false, rows: [
  '', '.........kkkkk..', '.....kkkkAAAAAk.', '....kNNNkAwAAAAk', '...kNNNNkAAAAAAk', '...knnnNkAAOAAAk', '...knwnNkOOOOOOk', '...knnnNkAAOAAAk',
  '..kNNNNNkAAAAAAk', '..kWNNNNNkAAAAk.', '..kWWNNNNNkksk..', '..kWNNNNNNkkssk.', '..kNNNNnNNk.kk..', '..kNNnnnNNk.....', '...kknkknkk.....', '....kk..kk......'] };
// § peddler forward: look A of the facing mock-up (D-501), the hood face-on with two pale eyes,
// the canvas bundle rising behind his head and over both shoulders, its amber cord at each side
const PEDDLER_FORWARD = { mirror: true, rows: [
  '', '..kkkkkk', '.kAAAAAA', '.kAAkkkk', '.kAkNNNN', '.kOkNNnn', '.kAkNnwn', '.kAkNnnn',
  '.kkNNNNN', '..kWNNNN', '..kWNNNN', '..kWNNNk', '..kNNNNn', '..kNNnnn', '...kknkk', '....kk..'] };
// § bed: the bed (D-488), a wooden frame in the trunk's browns, a pale straw pillow at its
// head and a grey rat hide blanket, a fold at each side, drafted for the playtest
const BED = { mirror: false, rows: [
  '', '', '..kkkkkkkkkkkk..', '.kWWWWWWWWWWWWk.', '.kNNNNNNNNNNNNk.', '.kWkkkkkkkkkkWk.', '.kWkwwwwwwwwkWk.', '.kWkaaaaaaaakWk.', '.kWSSSSSSSSSSWk.',
  '.kWSSSSSSSSSSWk.', '.kWSsSSSSSSsSWk.', '.kWSSSSSSSSSSWk.', '.kWssssssssssWk.', '.kNNNNNNNNNNNNk.', '.knnnnnnnnnnnnk.', '.kkkkkkkkkkkkkk.'] };

// § shelf: the relic shelf (D-690, look A of three), a tall wooden case in the trunk's browns,
// two empty shelves in its dark soil-brown back, a plinth at its foot
const SHELF = { mirror: false, rows: [
  '', '..kkkkkkkkkkkk..', '..kWWWWWWWWWWk..', '..kNkkkkkkkkNk..', '..kNffffffffNk..', '..kNffffffffNk..', '..kNffffffffNk..', '..kWWWWWWWWWWk..',
  '..kNNNNNNNNNNk..', '..kNffffffffNk..', '..kNffffffffNk..', '..kNffffffffNk..', '..kWWWWWWWWWWk..', '..kNNNNNNNNNNk..', '..knnnnnnnnnnk..', '..kkkkkkkkkkkk..'] };

// § mortar: the Mortar and Pestle (D-786, look A of three), a grey stone bowl in the rock's greys
// on a short stump in the trunk's browns, its wooden pestle leaning out to the right
const MORTAR = { mirror: false, rows: [
  '..........kWk', '.........kWNk', '..kkkkkkkWNkkk', '..kHHHHkWNkHHk', '..kLxxxxNxxxLk', '..kHLLLLLLLLMk', '...kLLLLLLMMk', '....kDDDDDDk',
  '...kkkkkkkkkk', '...kWWWWWWWNk', '...kWNWWWWNNk', '...kNNWNNNNnk', '...knnnnnnnnk', '...kkkkkkkkkk'] };

// § shelf with the locket (D-693, look A of its mock-up): the shelf, the locket small on its top
// shelf, open, its gold lid swung out to the left with the violet flame, a violet flame in its
// hollow and its violet bail; its own letters, LOCKET_SHELF_COLOURS, so the shelf keeps its browns
const LOCKET_ON_SHELF = { 3: { 9: 'm' }, 4: { 5: 'j', 6: 'l', 8: 'i', 9: 'i', 10: 'l' }, 5: { 5: 'j', 6: 'm', 7: 'l', 8: 'i', 9: 'm', 10: 'l' }, 6: { 5: 'j', 6: 'l', 8: 'i', 9: 'l', 10: 'l' } };
const LOCKET_SHELF = { mirror: false, rows: SHELF.rows.map((r, y) => [...r.padEnd(16, '.')].map((ch, x) => LOCKET_ON_SHELF[y]?.[x] ?? ch).join('')) };
const LOCKET_SHELF_COLOURS = { i: '#ffe08a', j: '#e9a94a', l: '#9a5424', m: '#b49cf0' }; // the locket's gold and violet (D-692)
// the glint along the small locket's top edge, [x, y] per step, and where its glow centres
const LOCKET_SHELF_GLINT = [[8, 4], [9, 4], [10, 4]];

// § garden bed: a low plank box in the trunk's browns, rows of dark soil in it, a seam on its
// front, the bed's frame (D-565, look A of three)
const GARDEN_BED = { mirror: false, rows: [
  '', '', '', '.kkkkkkkkkkkkkk.', '.kWWWWWWWWWWWWk.', '.kNffffffffffNk.', '.kNEEEEEEEEEENk.', '.kNFFFFFFFFFFNk.', '.kNffffffffffNk.',
  '.kNEEEEEEEEEENk.', '.kNFFFFFFFFFFNk.', '.kkkkkkkkkkkkkk.', '.kWWWWWWNWWWWWk.', '.kNNNNNNkNNNNNk.', '.knnnnnnknnnnnk.', '.kkkkkkkkkkkkkk.'] };
// § sprout: a seedling, two round leaves on a short stem standing above the rim, drawn over the
// garden bed once a Gloamberry Seed is planted in it (garden step 3, D-566, look A of three)
const SPROUT = ['', '...kkk....kkk...', '..kgggk..kgggk..', '...kGGgggGGGk...', '....kkkgGkkk....', '......kgGk......', '......kgGk......', '.......kk.......'];
const over = (top) => GARDEN_BED.rows.map((r, y) => [...r.padEnd(16, '.')].map((ch, x) => (top[y]?.[x] && top[y][x] !== '.' ? top[y][x] : ch)).join(''));
const SPROUTED_BED = { mirror: false, rows: over(SPROUT) };
// § fed sprout: the sprout with a few dark flecks of guano on its soil, in the guano's browns
// (garden step 6, D-569)
const FLECKS = ['', '', '', '', '', '', '', '', '...WN.....aW....', '...Na...W..NW...', '.......NWa......'];
const FED_BED = { mirror: false, rows: over(SPROUT).map((r, y) => [...r].map((ch, x) => (FLECKS[y]?.[x] && FLECKS[y][x] !== '.' ? FLECKS[y][x] : ch)).join('')) };
// § grown bed: the sprout grown, a small gloamberry bush over the rim, the wild bush's greens
// and berries shrunk into the bed (garden step 4, D-567, look A of three)
const SMALL_BUSH = ['.....kkkkkk.....', '...kkggggggkk...', '..kgggvuGGgghk..', '.kggvuuGGvuGhhk.', '.kgGGGGGGuuGhhk.', '.kGvuGGhGGGhhhk.', '..khGuuGhhhhIk..', '...kkhhhhhhkk...'];
const BERRY_BED = { mirror: false, rows: over(SMALL_BUSH) };

// § lost bag: the bag where you fell, a pouch tied at the neck with a pale cord, the
// bag button's shape in the trunk's browns (MO3, D-345, look A of three)
// § pouch and big bag: the bag upgrades, seen on the workbench's card (look A of each in their
// mock-up, D-547): a round rat hide pouch, its neck tied with a grey cord, pink stitches; a mole
// fur backpack with a handle loop, a pale flap and a copper buckle
const POUCH = { mirror: false, rows: [
  '', '', '', '......k..k......', '.....kSkkSk.....', '......kSSk......', '......kNNk......', '.....kWWWNk.....',
  '....kWaWWWNk....', '...kWaWWWWWNk...', '...kWWWWWWWNk...', '...kWWpWWpWNk...', '...kNWWWWWNNk...', '....kNNNNNNk....', '.....kkkkkk.....'] };
const BIG_BAG = { mirror: false, rows: [
  '', '......kkkk......', '.....kNkkNk.....', '....kkkkkkkk....', '...kWWWWWWWWk...', '..kWaWWWWWWWWk..', '..kWWWWWWWWWNk..', '..kNNNNkokNNNk..',
  '..kNWNNkOkNNnk..', '..kNWNNNNNNNnk..', '..kNNNNNNNNNnk..', '..kNNWNNWNNNnk..', '..kNNNNNNNNnnk..', '..knNNNNNNNnnk..', '..kknnnnnnnnkk..', '...kk......kk...'] };

const LOSTBAG = { mirror: true, rows: [
  '', '', '.....k.k', '......ka', '.....kkN', '......kN', '.....kWN', '....kWWW', '...kWaWW', '..kWaWWW',
  '..kWWWWW', '..kNWWWW', '..kNNWWW', '...knNNN', '....kkkk'] };

// § lure wisp: look A of its mock-up (D-649), a cold flame: a bone-white core, blue edges in
// the gloamberry's blues, two pink eyes in the core
const LURE_WISP = { mirror: false, rows: [
  '', '.......k', '......kvk', '......kvk', '.....kvwvk', '.....kvwvk', '....kvwwwvk', '....kvwwwvk',
  '...kvwpwpwvk', '...kvwwwwwvk', '...kuvwwwvuk', '....kuvvvuk', '.....kuuuk', '......kkk'] };
// § centipede: look A of its mock-up (D-654): side on and facing right, a long low body of rust
// segments, lit on top and dark between, pale legs under each, two feelers and green fangs
const CENTIPEDE = { mirror: false, rows: [
  '', '', '', '', '', '', '', '..............k.', '.............k.k', '...kkkk..kkkkkk.', '..kzzUzk.kzUzzzk',
  '.kzUzUUUkzUzUpzk', 'kUUZUZUUUUZUUUVk', 'kZkZkZkZkZkZkkkV', 'kA.kA.kA.kA.kA..', 'A..A..A..A..A...'] };

// § spit grub: look A of its mock-up (D-688), a glowworm side on and facing right: a plump pale
// grub of bone-white rings, its tail end glowing venom green with a bright core, a pink eye and
// an open mouth
const SPIT_GRUB = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '......kkkkk.....', '....kkwwawwkk...', '..kkawwawwawwk..', '.kVVawAwwAwwpwk.',
  'kVJVaAwAAwAwwwkk', 'kVVVAAAAAAAAwwk.', '.kkkkkkkkkkkkk..', ''] };

// § glow lamp: a glow gland in a small copper cup on the torch's stick, in its ring of stones
// (D-808); rows 2 to 7 are the gland, drawn bright after the light when it is set down (torches.js)
const GLOW_LAMP = { mirror: false, rows: [
  '', '', '......kkkk......', '.....kJJVVk.....', '....kVJJVVVk....', '....kVVVVVGk....', '....kVVVVGGk....', '.....kGGGGk.....',
  '.....kOooOk.....', '......kkkk......', '......kWNk......', '......kWNk......', '......kWNk......', '...kkkkWNkkkk...',
  '..kHHLDkkHHLDk..', '...kkkk..kkkk...'] };

// § warden: look A4 of its mock-up (D-692), an old stone guard made by Underhearth's people, worn
// by the years: grey rock's face, a chipped gold band on its chest, cracks, moss on a shoulder and
// a foot, and an eye slit lit violet; asleep, the slit is dull stone (sprites.js, SLEEPING)
const WARDEN = { mirror: false, rows: [
  '', '', '.....kkkkkk.....', '....kHHkHHLk....', '....kHPPPPLk....', '....kgHHHLLk....', '..kkkkkkkkkkkk..',
  '.kggHHHHkHHLLMk.', '.kHkoookooookMk.', '.kHkHHHkHHLLkMk.', '.kLkHHHHkLLLkDk.', '.kkkHHHHLLLMkkk.', '...kHHHLLLMMk...',
  '...kHHLkkLMDk...', '...kGgLk.kMDk...', '...kkkkk.kkkk...'] };
// its fists up before a slam (D-885), Claude's draft: the arms lifted beside its head, the fists
// over it; the head, the band and the legs as they are
const WARDEN_RAISED = { mirror: false, rows: [
  'kkkk........kkkk', 'kHHk........kLMk', 'kHLk.kkkkkk.kMDk', 'kkkkkHHkHHLkkkkk', '.kHkkHPPPPLkkMk.', '.kHkkgHHHLLkkDk.',
  '.kHkkkkkkkkkkDk.', '.kggHHHHkHHLLMk.', '...koookooook...', '...kHHHkHHLLk...', '...kHHHHkLLLk...', '...kHHHHLLLMk...',
  '...kHHHLLLMMk...', '...kHHLkkLMDk...', '...kGgLk.kMDk...', '...kkkkk.kkkk...'] };
// its fists sunk in the floor (D-937, stuck take C): stooped, the head bowed into its shoulders,
// the arms long, the fists in the floor among dark cracks; it jolts and chips spring (sprites.js)
const WARDEN_STUCK = { mirror: false, rows: [
  '', '', '', '', '.....kkkkkk.....', '....kHHkHHLk....', '..kkkHPPPPLkkk..', '.kggkgHHHLLkLMk.', '.kHkkkkkkkkkkMk.',
  '.kHkoookooookMk.', '.kHkHHHkHHLLkMk.', '.kLkHHHHkLLLkDk.', '.kHkHHHLLLMMkDk.', 'kHLkkHLkkLDkkMDk', 'kLDkkGgk.kDkkDDk',
  'xkkx.kkk.kkkxkkx'] };
// § campfire (D-757): a ring of grey stones round crossed logs, seen a little from above; its
// flames are drawn after the light (campfire.js in render). Embers: the logs charred, coals
// glowing between them. Cold ashes: a grey heap with a burnt stick in it.
const FIRE_RING = (a, b, c) => ['', '', '', '', '', '', '', '...kkk.kk.kkk...', '..kHHLkHLkHHLk..',
  `.kHLk${a}kHLk.`, `.kLDk${b}kLDk.`, `.kHLk${c}kHLk.`, '..kLDkHLkHLkDk..', '...kkkkkkkkkk...'];
const CAMPFIRE = { mirror: false, rows: FIRE_RING('WWkkNN', 'nNWWNn', 'kNnnNk') };
const CAMPFIRE_EMBERS = { mirror: false, rows: FIRE_RING('nnkknn', 'YnooNY', 'knYYnk') };
const CAMPFIRE_ASHES = { mirror: false, rows: FIRE_RING('ssddss', 'sdnnsd', 'kddddk') };

// § lamppost (D-769, look B of three): an iron crook post on a stone foot, its cold lamp, the
// glass dark, hanging from the arm
const LAMPPOST = { mirror: false, rows: ['.....kkkkkk.....', '....kdssssdk....', '....kdkkkkkdk...', '....kdk...kdk...',
  '....kdk..kkkkk..', '....kdk..kSssk..', '....kdk..kxQxk..', '....kdk..kxxxk..', '....kdk..kkkkk..', '....kdk.........',
  '....kdk.........', '....kdk.........', '....kdk.........', '...kkdkk........', '...ksddsk.......', '...kkkkkk.......'] };

// § miners' camp (D-770, look A of three): 3 × 2 tiles, 48 × 32 pixels, a slumped canvas tent, its
// flap open on the dark, and an old crate; the Stone Pick (PICK) leans on the crate at CAMP_PICK
// until it is taken (sprites.js)
const CAMP = { rows: [
  '................................................',
  '...............kk...............................',
  '..............kNNk..............................',
  '..............kNNk..............................',
  '..............kNNk..............................',
  '..............kNNk..............................',
  '..............kNNk..............................',
  '..............kaaAk.............................',
  '..............kaaAk.............................',
  '.............kaaaAAk............................',
  '.............kaaaAAk............................',
  '............kaaaaAAAk...........................',
  '...........kaaaaaAAAAk..........................',
  '...........kaaaanAAAAk..........................',
  '..........kaaaaanAAAAAk.........................',
  '.........kaaaaannAaAAAAk........................',
  '.........kaaaaannnaAAAAk........................',
  '........kaaaaaannnAaAAAAk.......................',
  '........kaaaaannnnAaAOAAk.......................',
  '.......kaaaaaannnnnaAAAAAk......................',
  '......kaaaaOannnnnnAaAAAAAk....kkkkkkkkkkkkk....',
  '......kaaaaaannnnnnAaAAAAAk...kaaaaaaaaaaaaak...',
  '.....kaaaaaaannnnnnnAaAOAAAk..kWWWWWWWWWWWWWk...',
  '....kaaaaaaannnnnnnnAaAAOAAAk.kWWnWWWWWWWWWWk...',
  '....kaaaaOaannnnnnnnAaAAAAAAk.kWWWWWWWWWWWWWk...',
  '...kaaaaaaaannnnnnnnnAaAAAAAAkkNNNNNNNNNNNNNk...',
  '...kaaaaaaannnnnnnnnnAaAAAAAAkkWWWWWWWWWWWWWk...',
  '..kaaaaaaaannnnnnnnnnAaAAAAAAAkWWWWWWWWWWnWWk...',
  '.kaaaaaaaaannnnnnnnnnnAaAAAAAAAWWWWWWWWWWWWWk...',
  '.kaaaaaaaannnnnnnnnnnnAaAAAAAAANNNNNNNNNNNNNk...',
  '..kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk....',
  '................................................',
] };
const CAMP_PICK = [33, 7];

// § brazier (L1, D-891 look A): a crypt-stone fire bowl on a foot, its violet band dark and old
// ash in the bowl while cold; drawn in the crypt's brick colours (BRAZIER_COLOURS, sprites.js)
const BRAZIER = { mirror: false, rows: ['', '', '', '', '', '...kkkkkkkkkk...', '..kHaaaaaaaaHk..', '..kHHHHHHHHHLk..',
  '..kLLLLLLLLLDk..', '..kjjjjjjjjjjk..', '...kDLLLLLLDk...', '....kkHLLDkk....', '......kHLk......', '.....kHLLDk.....',
  '....kHHLLLDk....', '....kkkkkkkk....'] };
const BRAZIER_COLOURS = { H: '#69748b', L: '#535d72', D: '#2b303c', a: '#5a5560' };
// lit (D-893): the band the unusual things' violet, the ash glowing coals; its flame is drawn
// after the light, the campfire's (campfire.js in render)
const BRAZIER_LIT = { mirror: false, rows: BRAZIER.rows.map((r, i) => (i === 6 ? '..kHYyYyyYyYHk..' : r.replace(/j/g, 'P'))) };

// § sealed door (L1, D-891): a stone slab set in the wall's face, a flame rune cut in it; the wall's
// cap is drawn above it, with a notch on the lintel for each of the 2 braziers (tiles.js, D-895)
const SEALED_DOOR = { mirror: false, rows: ['', '', '', '', '', '.kkkkkkkkkkkkkk.', '.kHHHHHHHHHHHHk.', '.kLLLLLLjLLLLLk.',
  '.kLLLLLjLjLLLLk.', '.kLLLLjLLLjLLLk.', '.kLLLLjLLLjLLLk.', '.kLLLLLjjjLLLLk.', '.kLLLLLLLLLLLLk.', '.kLLLLLLLLLLLLk.',
  '.kLLLLLLLLLLLLk.', '.kkkkkkkkkkkkkk.'] };
// open (D-895): the slab sunk away, the doorway fully open and dark, a worn line where it sank
const OPEN_DOOR = { mirror: false, rows: ['', '', '', '', '', '.kkkkkkkkkkkkkk.', '.kxxxxxxxxxxxxk.',
  ...Array(8).fill('.kxXXXXXXXXXXxk.'), '.kDDDDDDDDDDDDk.'] };
const OPEN_DOOR_COLOURS = { x: '#07060a', X: '#0c0b12' };

// § plinth (L1 step 4, D-896, look B of its mock-up): a small crypt-stone plinth with the
// brazier's dark violet band, low enough that its prize sits on its top (tiles.js); drawn in the
// crypt's brick colours (BRAZIER_COLOURS, sprites.js). The same picture bare or holding its prize.
const PLINTH = { mirror: false, rows: ['', '', '', '', '', '', '', '', '', '....kkkkkkkk....', '...kHHHHHHHHk...',
  '...kLLLLLLLDk...', '...kjjjjjjjjk...', '....kLLLLLDk....', '...kHLLLLLLDk...', '...kkkkkkkkkk...'] };

export {
  PAL, HERO, CLOTHES_ROWS, dressed,
  WOODS, BRANCHES, STUMPS, BERRY_BUSH,
  BARE_BUSH, WORKBENCH, CHEST, RUBBLE, PEDDLER, PEDDLER_FORWARD, BED, SHELF, MORTAR, LOCKET_SHELF, LOCKET_SHELF_COLOURS, LOCKET_SHELF_GLINT, LOCKET_ON_SHELF,
  GARDEN_BED, SPROUT, over, SPROUTED_BED, FLECKS, FED_BED, SMALL_BUSH, BERRY_BED, POUCH, BIG_BAG,
  LOSTBAG,
  LURE_WISP,
  CENTIPEDE,
  SPIT_GRUB,
  WARDEN,
  WARDEN_RAISED,
  WARDEN_STUCK,
  CAMPFIRE,
  CAMPFIRE_EMBERS,
  CAMPFIRE_ASHES,
  LAMPPOST,
  CAMP,
  CAMP_PICK,
  GLOW_LAMP,
  BRAZIER,
  BRAZIER_LIT,
  BRAZIER_COLOURS,
  SEALED_DOOR,
  OPEN_DOOR,
  OPEN_DOOR_COLOURS,
  PLINTH,
};
