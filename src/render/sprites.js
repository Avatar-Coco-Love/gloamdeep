// § sprites: 16 × 16 pixel maps written as strings, one letter per palette
// colour; symmetric ones store the left half and mirror it (style study 1,
// lines 121–176, ART-DIRECTION.md "Sprites").
import { CLOAKS, EYES, TRIMS, get } from '../core/registry.js';
import { DEFAULT_CLOTHES } from '../core/looks.js';

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
};

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
const dressed = (clothes) => ({ ...HERO, rows: HERO.rows.map((r, i) => (CLOTHES_ROWS[clothes] ?? {})[i] ?? r) });
// § flask: the study's oil flask, a cork over a bottle of amber oil (study line 156, D-077)
const FLASK = { mirror: true, rows: [
  '', '', '......kk', '.....kaa', '......kk', '......ko', '.....koo', '....kooo', '...kwooo', '...kwooo',
  '...koooo', '...kOooo', '....kOOO', '.....kkk'] };

// § herb: a sprig of three leaves in the moss greens, light on top, dark
// underneath and down the stem (D-155)
const HERB = { mirror: false, rows: [
  '', '', '', '', '.......kk.......', '......kggk......', '......kgGk......', '..kkk..kGk.kkk..',
  '.kgggk.kGk.kgggk', '..kgGGkkGkkGGgk.', '...kkGGkGkGGkk..', '.....kkGGGkk....', '.......kGk......', '.......kkk......'] };

// § oilcap: an amber mushroom cap, light spots and a dark rim on one side,
// on a short pale stem (D-296). `toned`: the cap's letters, shifted per mushroom (D-305).
const OILCAP = { mirror: false, toned: 'oO', rows: [
  '', '', '', '', '......kkkk......', '....kkoooOkk....', '...koaooooOOk...', '..kooooaoooOOk..', '..koaooooooaOk..',
  '..kkkkkkkkkkkk..', '......kwak......', '......kwak......', '......kwak......', '.....kwwaak.....', '.....kkkkkk.....'] };

// § heartcap: a round bright red dome with pale spots and a dark side, on
// a short pale stem (D-303)
const HEARTCAP = { mirror: false, toned: 'rR', rows: [
  '', '', '', '.....kkkkkk.....', '....krrwrrrk....', '...krrrrrwRRk...', '...kwrrrrrrRk...', '..krrrwrrrrRRk..', '..krrrrrrwrRRk..',
  '..kkkkkkkkkkkk..', '......kwak......', '......kwak......', '.....kwwak......', '.....kwwaak.....', '.....kkkkkk.....'] };

// § deposit: a round boulder of grey rock with one seam, lit on top, darker to
// the lower right (look A of the deposit mock-up, D-311)
const DEPOSIT = { mirror: false, rows: [
  '', '', '', '', '......kkkk......', '....kkHHLLkk....', '...kHHLLLLMMk...', '..kHLLLLLLMMMk..', '..kLLLLxLMMMDk..',
  '.kLLLLxLMMMMDDk.', '.kMLLLLxMMMDDDk.', '.kMMMMMxMMDDDDk.', '..kDMMMMMDDDDk..', '...kkDDDDDDkk...', '.....kkkkkk.....'] };

// § stone: a small round pebble in the deposit's greys, lit on top, darker to
// the lower right (look A of the stone mock-up, O2)
const STONE = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '......kkkk......', '.....kHHLLk.....', '....kHLLLMMk....', '....kLLLMMDk....', '....kMMMMDDk....',
  '.....kDDDDk.....', '......kkkk......'] };

// § vein: the deposit's boulder with copper flecks and no seam (look A of the step 7 mock-up, D-480)
const VEIN = { mirror: false, rows: [
  '', '', '', '', '......kkkk......', '....kkHHLLkk....', '...kHHoLLLMMk...', '..kHLLOLLLMoMk..', '..kLLLLLLMMODk..',
  '.kLoLLLLMMMMDDk.', '.kMOLLLLMoMDDDk.', '.kMMMMMMMOMDDDk.', '..kDMMoMMDDDDk..', '...kkDDODDDkk...', '.....kkkkkk.....'] };

// § copper ore: the stone's grey lump flecked with copper (look A of the step 7 mock-up, D-480)
const COPPER_ORE = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '......kkkk......', '.....kHoLLk.....', '....kHLOLMMk....', '....koLLMoDk....', '....kMMMODDk....',
  '.....kDDDDk.....', '......kkkk......'] };

// § pick: a stone head with one point, on a wooden handle up and right (look A of the step 7 mock-up, D-480)
const PICK = { mirror: false, rows: [
  '', '', '....kkkk........', '...kHHLLkk......', '....kkkLLMk.....', '.......kkMMk....', '.......kWkMMk...', '......kWk.kMk...',
  '.....kWk..kDk...', '....kNk...kDk...', '...kNk.....kk...', '..kNk...........', '.kNk............', '.kk.............', '', ''] };

// § copper wick: an upright cloth wick with a burnt tip, held in a wide copper collar
// (look A of the step 9 mock-up, D-483)
const COPPER_WICK = { mirror: false, rows: [
  '', '', '', '', '', '.......kk.......', '......knnk......', '......kaak......', '......kaAk......', '.....kkaAkk.....',
  '....kooooOOk....', '....kOooOOOk....', '....kooooOOk....', '.....kaAAAk.....', '......kkkk......', ''] };

// § rat hide vest: a sleeveless brown vest, grey fur at the shoulders, laced up the
// front in the rat tail's pink (D-484)
const RAT_VEST = { mirror: false, rows: [
  '', '', '...kkk....kkk...', '..kSSsk..ksSSk..', '.kWWWWNkkNWWWWk.', '.kWWWWWkkWWWWWk.', '.kkWWWWpkWWWWkk.', '..kWWWWkpWWWWk..',
  '..kWWWWpkWWWWk..', '..kWWWWkpWWWWk..', '..kNWWWpkWWWNk..', '..kNNNNkpNNNNk..', '..knnnnkknnnnk..', '..kkkkkkkkkkkk..', '', ''] };

// § rat tail: the rat's pink tail curled into a loop, a grey stub where it joined
// the rat (look A of the Rat Tail mock-up, D-474)
const RAT_TAIL = { mirror: false, rows: [
  '', '', '', '', '', '', '', '.........kkk....', '........kpppk...', '.......kpkkkpk..', '.......kpk.kpk..', '..kkk...kpppk...',
  '.kSSskkkkpkk....', '.ksskpppppk.....', '..kkkkkkkk......'] };

// § moth dust: a small heap of pale dust with amber glints, two motes floating
// (look A of the drops mock-up, D-475)
const MOTH_DUST = { mirror: false, rows: [
  '', '', '', '', '', '', '', '.........w......', '....a...........', '.......kkk......', '.....kkawak.....', '....kaayaaak....',
  '...kawaaaoaak...', '..kaaoaAaaaYak..', '..kkkkkkkkkkkk..'] };

// § stinger: the scorpion's tail tip, two shell segments curling up to the pale
// sting, drawn in its Sand set's `o`, `O` and `a` (look A, D-475)
const STINGER = { mirror: false, rows: [
  '', '', '', '', '', '', '', '..........kk....', '.........kak....', '.........kaAk...', '..........kOk...', '...kkk...koOk...',
  '..kooOkkkoOk....', '..kOoooooOk.....', '...kkOOOkk......'] };

// § mimic glass: one curved shard of the flask's glass, a pale gleam and a smear
// of amber oil (look A, D-475)
const MIMIC_GLASS = { mirror: false, rows: [
  '', '', '', '', '', '', '', '........k.......', '.......kwk......', '......kwCk......', '.....kwCcck.....', '....kCCcocck....',
  '...kCcooOcck....', '..kkkkkkkkkkk...'] };

// § gloam wisp: a tuft of the gloamling's shadow shaped like a small flame, a pale
// grey core so it shows on a dark floor (look A, D-475)
const GLOAM_WISP = { mirror: false, rows: [
  '', '', '', '', '', '.......k........', '.......kk.......', '......kdbk......', '......kdbk......', '.....kdsdbk.....',
  '.....kdssbk.....', '....kbdssdbk....', '....kbddddbk....', '.....kbbbbk.....', '......kkkk......'] };

// § venom sac: a plump bulb of green venom with a pale gleam, a short neck of the
// Sand shell where it joined the sting (look A of the rare drops mock-up, D-476)
const VENOM_SAC = { mirror: false, rows: [
  '', '', '', '', '', '', '', '.......kk.......', '......kook......', '.....kkOOkk.....', '....kgwggggk....', '...kgwgggggGk...',
  '...kggggggGGk...', '....kgggGGGk....', '.....kkkkkk.....'] };

// § mimic heart: a heart of the flask's amber oil, a glass gleam at its upper left (look A, D-476)
const MIMIC_HEART = { mirror: false, rows: [
  '', '', '', '', '', '', '', '...kkk..kkk.....', '..kwook.kooOk...', '.kwoooookooOOk..', '.kooYoooooooOk..', '..kooooooooOk...',
  '...koooooooOk...', '....kooooOOk....', '.....kOOOOk.....', '......kkkk......'] };

// § gloam eye: a round pale eye with the pink iris, rimmed in the gloamling's
// shadow grey (look A, D-476)
const GLOAM_EYE = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '.....kkkkkk.....', '....kdwwwwdk....', '...kdwwppwwdk...', '...kdwpkkpwdk...',
  '...kdwwppwwdk...', '....kdwwwwdk....', '.....kkkkkk.....'] };

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
// § gloamberry: three of the bush's berries on a short green stem (D-531)
const GLOAMBERRY = { mirror: false, rows: [
  '', '', '', '', '........kk......', '.......kgGk.....', '....kk.kGk......', '...kvuk.kk.kk...',
  '...kuuukkkkvuk..', '....kkkvuk.kuuk.', '......kuuuk.kk..', '.......kkk......'] };

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

// § lost bag: the bag where you fell, a pouch tied at the neck with a pale cord, the
// bag button's shape in the trunk's browns (MO3, D-345, look A of three)
const LOSTBAG = { mirror: true, rows: [
  '', '', '.....k.k', '......ka', '.....kkN', '......kN', '.....kWN', '....kWWW', '...kWaWW', '..kWaWWW',
  '..kWWWWW', '..kNWWWW', '..kNNWWW', '...knNNN', '....kkkk'] };

// § potion: a round red bottle under a cork, a pale glass neck and a light
// gleam on its left (D-309, look A of three)
const POTION = { mirror: true, rows: [
  '', '', '......kk', '.....kaa', '......kk', '......kC', '....kkCr', '...kCrrr', '..kCwrrr', '..kwrrrr',
  '..krrrrr', '..kRrrrr', '...kRRRr', '....kkkk'] };

// § knife: a steel blade pointing up and right, a pale edge, a dark guard
// and a brown grip (D-252)
const KNIFE = { mirror: false, rows: [
  '', '', '.............kk.', '............kSk.', '...........kwSk.', '..........kwSk..', '.........kwSk...', '........kwSk....', '....kk.kwSk.....',
  '....kdkkSk......', '.....kddk.......', '.....kOkdk......', '....kOk.kk......', '...kOk..........', '..kOk...........', '..kk............'] };

// § spear: a long wooden shaft pointing up and right, a steel head with a pale
// edge on a dark binding, as the step 6 mock-up drew it (D-479)
const SPEAR = { mirror: false, rows: [
  '..........kkkk..', '.........kwSSk..', '..........kwSk..', '.........kwSkk..', '........kkkkk...', '.......kWk.k....', '......kWk.......', '.....kWk........',
  '....kWk.........', '...kNk..........', '..kNk...........', '.kNk............', 'kNk.............', 'kk..............', '', ''] };

// § rat: redrawn from the study's (D-009), side on and facing right: a pink
// hostile eye (ART-DIRECTION.md palette), ear, nose, feet and tail (D-104)
const RAT = { mirror: false, rows: [
  '', '', '', '', '', '', '', '..........kk....', '.........kpdk...', '.....kkkkkSSSk..',
  '...kkSSSSSSSSpSk', '..kSSSSSSSSSSSSk', 'p.ksSSSSSSSSSSkp', '.pksdsssssssdkw.', '..pkkddkkkkddk..', '....kpk...kpk...'] };

// § gloamling: a squat shadow on little legs, dark teal and grey, with the
// pink hostile eyes (ART-DIRECTION.md palette, D-240)
const GLOAMLING = { mirror: false, rows: [
  '', '', '', '', '', '', '', '.....kkkkkk.....', '....kbdddddbk...', '...kbdddddddbk..', '..kbddpkddpkdbk.',
  '..kbbddddddddbk.', '..kbbbbbbbbbbbk.', '...kkbkkbkkbkk..', '..kbk.kbkkb.kbk.', '..k....k..k...k.'] };

// § lampmoth: a pale moth seen from above, cream wings with an amber spot like a
// flame, a dark body and the pink hostile eyes (D-356)
const LAMPMOTH = { mirror: true, rows: [
  '', '', '', '.....k..', '......k.', '.kkk..kk', 'kwaak.kp', 'kaaoakkd', 'kaoYakkd',
  'kaaaaakd', '.kkaaakd', '..kaSakd', '..kaaak.', '...kkk..'] };

// § flask mimic: the flask (D-077) with pink hostile eyes in its oil and a row of pale
// teeth where its shoulder would be (D-366)
const FLASK_MIMIC = { mirror: true, rows: [
  '', '', '......kk', '.....kaa', '......kk', '......ko', '.....koo', '....kooo', '...kwpoo', '...kwooo',
  '...kkwkw', '...kOkkk', '....kOOO', '.....kkk'] };

// § scorpion: seen from above, as the lampmoth is: two big pincers, eight legs, a
// striped body with the pink hostile eyes, and the tail curled to one side with a
// pale sting (D-370). Its `o`, `O` and `a` are its colour set's (D-373).
const SCORPION = { mirror: false, rows: [
  '..kk........kk..', '.kook......kook.', 'kooko.k..k.okook', 'koook.k..k.koook', '.kooOk....kOook.', '..kkOk.kk.kOkk..',
  '....kOkOOkOk....', '..k.kopoopok.k..', '.k.kkooooook.k.k', 'k.k.kOOOOOOkk.k.', '.k.kkooooookk.k.', 'k.k.kkOOOOkk..k.',
  '......kOOk..kk..', '......kOok.kak..', '.......kOOkkOk..', '........kkOOk...'] };
// Its colour sets, light, shade and sting: Sand, Rust, Coal, Olive and Bone; never
// the oil's amber (D-373). The registry's `colours` counts them.
// § cave spider: look A1 of its mock-up (D-535): seen from above, low and squat, a
// dusky round body with a pale hourglass, four pink hostile eyes, and eight legs
// splayed flat to the sides with their tips on the ground
const CAVE_SPIDER = { mirror: true, rows: [
  '', '', '', '', '', '......kk', '.....kpQ', '..k..kQp', '.k.kkkkq', 'k...kqqq', '.kkkqqAA',
  'k..kqqqA', '.kkkQqAA', 'k...kQQq', '.....kkk'] };
// § spider silk: look 1 of the mock-up (D-535), a wound skein of pale thread, one loose end
const SPIDER_SILK = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '.....kkkkk......', '....kwaawak.....', '...kawkkkwak....', '...kwk...kwk....',
  '...kawkkkwak.k..', '....kawwaakkak..', '.....kkkkk..k...'] };
// § bat: look A of its mock-up (D-537): seen from above, as the lampmoth is, wings
// spread wide to the tile's edges with a scalloped trailing edge, pointed ears and
// the pink hostile eyes, in the wood's browns
const BAT = { mirror: true, rows: [
  '', '', '', '.....k..', '.....knk', 'kk...knn', 'kNk.kkpn', 'kNNkkNnn', 'kNNNNNnn', 'kNnNNNnn', '.kNnNNkn',
  '.k.knNkk', '....kk..'] };
// § bat wing: a folded wing of thin brown leather on pale bones, its edge scalloped (D-537)
const BAT_WING = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '......kk........', '.....kAAkk......', '....kNnANNkk....', '...kNNnANNNNk...',
  '..kNNnNNANNnNk..', '..kkNnkkNnkkNk..', '....kk..kk..k...'] };
// § bat fang: the rare one, one small curved fang, white with a bone shade (D-537)
const BAT_FANG = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '', '......kkkk......', '.....kAwwAk.....', '......kwwAk.....', '.......kwAk.....',
  '.......kwk......', '........k.......'] };
// § bat guano: look A of its mock-up (D-540), a low mound of dark droppings in the bat's
// browns, lit on top, with a few pale flecks
const BAT_GUANO = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '', '.......kkk......', '.....kkNWNkk....', '....kNWNNaNnk...', '...kNNaNNNNnnk..',
  '..kNNNNNnNanNnk.', '..kknnnnnnnnnkk.', '....kkkkkkkkk...'] };
// § mole: the mole of its mock-up (D-541): side on and facing right, as the rat is, a round
// body in the wood's browns lit along its back, the pink hostile eye and nose, and pale digging claws
const MOLE = { mirror: false, rows: [
  '', '', '', '', '', '', '....kkkkkkk.....', '..kkNWWWWWWkk...', '.kNNNNNNNNNWWk..', 'kNNNNNNNNNNpNNk.', 'knNNNNNNNNNNNNNp',
  'knnNNNNNNNNNNNk.', '.knnnnnnnnnnnk..', '..kakak...kakak.'] };
// § mole fur: a soft tuft of the mole's brown fur, lit on top, a few loose hairs (D-541)
const MOLE_FUR = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '.......k..k.....', '....kkkWkkWk....', '...kWWNWNWNNk...', '..kWNNNNNNNnnk..',
  '..kNNnNNnNNnnk..', '...knnnnnnnnk...', '....kkkkkkkk....'] };
// § mole claw: the rare one, one broad pale digging claw, a bone shade and a brown root (D-541)
const MOLE_CLAW = { mirror: false, rows: [
  '', '', '', '', '', '', '', '.....kkk........', '....kNNwk.......', '....kNwwak......', '.....kwwaAk.....', '......kwaAk.....',
  '.......kaAk.....', '.......kAk......', '......kAk.......', '......kk........'] };
const SCORPION_COLOURS = [
  { o: '#d9c48e', O: '#9a8458', a: '#efe6cc' }, { o: '#d0603a', O: '#7e3020', a: '#e8d5a0' },
  { o: '#5e5870', O: '#302c3c', a: '#b9ab88' }, { o: '#a9a65a', O: '#64612e', a: '#e8d5a0' },
  { o: '#e6dcc4', O: '#a89c80', a: '#6b7686' },
];

function build(rows, mirror) {
  return Array.from({ length: 16 }, (_, i) => {
    let r = rows[i] || '';
    if (mirror) { r = (r + '........').slice(0, 8); r += [...r].reverse().join(''); }
    return (r + '................').slice(0, 16);
  });
}

// flash: the silhouette for a hit flash, white (ART-DIRECTION.md, "Sprites"),
// or the hostile red when the hero is bitten (D-118); pal: the colours, as PAL
function spriteCanvas(def, flash = null, pal = PAL) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 16;
  const c = cv.getContext('2d');
  build(def.rows, def.mirror).forEach((r, y) => [...r].forEach((ch, x) => {
    if (!pal[ch]) return;
    c.fillStyle = flash || pal[ch]; c.fillRect(x, y, 1, 1);
  }));
  for (const [x, y, ch] of def.extra || []) { c.fillStyle = flash || pal[ch]; c.fillRect(x, y, 1, 1); }
  return cv;
}

// § torch: the torch in the bag, its stone foot and flame as set down (D-478)
const BAG_TORCH = { mirror: false, rows: [
  '', '', '.......y........', '.......y........', '.......yy.......', '......YyyY......', '......YwwY......', '.....kYwwYk.....',
  '.....kTOTOk.....', '......kkkk......', '......kWNk......', '......kWNk......', '......kWNk......', '...kkkkWNkkkk...',
  '..kHHLDkkHHLDk..', '...kkkk..kkkk...'] };

// § wisp charm: a gloam wisp held in a round copper setting, hung from a small loop (D-486)
const WISP_CHARM = { mirror: false, rows: [
  '', '', '', '......kkkk......', '.....ko..ok.....', '......kook......', '.....kkkkkk.....', '....koooooOk....', '...koOkkkkOOk...', '...kokbdsbkOk...',
  '...kokdsSdkOk...', '...kokbddbkOk...', '...koOkkkkOOk...', '....kOOOOOOk....', '.....kkkkkk.....', ''] };

// § heart charm: the mimic heart's amber in the wisp charm's copper setting and loop (D-487)
const HEART_CHARM = { mirror: false, rows: [
  '', '', '', '......kkkk......', '.....ko..ok.....', '......kook......', '.....kkkkkk.....', '....koooooOk....', '...koOkkkkOOk...', '...kokwYkYkOk...',
  '...kokYyYYkOk...', '...kokkYYkkOk...', '...koOkkkkOOk...', '....kOOOOOOk....', '.....kkkkkk.....', ''] };

export const SPRITES = { hero: spriteCanvas(HERO), flask: spriteCanvas(FLASK), herb: spriteCanvas(HERB), oilcap: spriteCanvas(OILCAP), heartcap: spriteCanvas(HEARTCAP), potion: spriteCanvas(POTION), knife: spriteCanvas(KNIFE), spear: spriteCanvas(SPEAR), deposit: spriteCanvas(DEPOSIT), vein: spriteCanvas(VEIN), rubble: spriteCanvas(RUBBLE), peddler: spriteCanvas(PEDDLER), peddlerForward: spriteCanvas(PEDDLER_FORWARD), stone: spriteCanvas(STONE), copperOre: spriteCanvas(COPPER_ORE), pick: spriteCanvas(PICK), copperWick: spriteCanvas(COPPER_WICK), ratVest: spriteCanvas(RAT_VEST), wispCharm: spriteCanvas(WISP_CHARM), heartCharm: spriteCanvas(HEART_CHARM), ratTail: spriteCanvas(RAT_TAIL), mothDust: spriteCanvas(MOTH_DUST), stinger: spriteCanvas(STINGER, null, { ...PAL, ...SCORPION_COLOURS[0] }), spiderSilk: spriteCanvas(SPIDER_SILK), caveSpider: spriteCanvas(CAVE_SPIDER), batWing: spriteCanvas(BAT_WING), batFang: spriteCanvas(BAT_FANG), batGuano: spriteCanvas(BAT_GUANO), bat: spriteCanvas(BAT), mole: spriteCanvas(MOLE), moleFur: spriteCanvas(MOLE_FUR), moleClaw: spriteCanvas(MOLE_CLAW), mimicGlass: spriteCanvas(MIMIC_GLASS), gloamWisp: spriteCanvas(GLOAM_WISP), venomSac: spriteCanvas(VENOM_SAC, null, { ...PAL, ...SCORPION_COLOURS[0] }), mimicHeart: spriteCanvas(MIMIC_HEART), gloamEye: spriteCanvas(GLOAM_EYE), bagTorch: spriteCanvas(BAG_TORCH), gloamberry: spriteCanvas(GLOAMBERRY), berryBush: spriteCanvas(BERRY_BUSH), bareBush: spriteCanvas(BARE_BUSH), wood: spriteCanvas(WOODS[0]), workbench: spriteCanvas(WORKBENCH), chest: spriteCanvas(CHEST), bed: spriteCanvas(BED), lostbag: spriteCanvas(LOSTBAG), rat: spriteCanvas(RAT), gloamling: spriteCanvas(GLOAMLING), lampmoth: spriteCanvas(LAMPMOTH), flaskMimic: spriteCanvas(FLASK_MIMIC), scorpion: spriteCanvas(SCORPION, null, { ...PAL, ...SCORPION_COLOURS[0] }) }; // keyed by registry id
const DEFS = { oilcap: OILCAP, heartcap: HEARTCAP };
// § tones: a mushroom with its cap's colours shifted by its tone, hue in degrees and
// lightness in points (D-305); the spots, stem and outline stay. Each made once.
function shifted(hex, hue, light) {
  const n = parseInt(hex.slice(1), 16), r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const hi = Math.max(r, g, b), lo = Math.min(r, g, b), l = (hi + lo) / 2, d = hi - lo;
  const sat = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  const h = !d ? 0 : hi === r ? ((g - b) / d + 6) % 6 : hi === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return `hsl(${(h * 60 + hue + 360) % 360} ${sat * 100}% ${Math.max(0, Math.min(100, l * 100 + light))}%)`;
}
const TONED = {};
const FORMS = { wood: WOODS.map((def) => spriteCanvas(def)), branch: BRANCHES.map((def) => spriteCanvas(def)), stump: STUMPS.map((def) => spriteCanvas(def)) };
// An item's or a bag slot's sprite: in its form (D-314) or tone (D-305), when it has one
export function spriteOf(it) {
  if (FORMS[it.id]) return FORMS[it.id][it.form] || FORMS[it.id][0];
  const def = DEFS[it.id];
  if (!it.tone || !def?.toned) return SPRITES[it.id];
  const key = `${it.id}/${it.tone.hue}/${it.tone.light}`;
  if (!TONED[key]) {
    const pal = { ...PAL };
    for (const ch of def.toned) pal[ch] = shifted(PAL[ch], it.tone.hue, it.tone.light);
    TONED[key] = spriteCanvas(def, null, pal);
  }
  return TONED[key];
}
const FLASHES = { rat: spriteCanvas(RAT, '#ffffff'), gloamling: spriteCanvas(GLOAMLING, '#ffffff'), lampmoth: spriteCanvas(LAMPMOTH, '#ffffff'), flaskMimic: spriteCanvas(FLASK_MIMIC, '#ffffff'), scorpion: spriteCanvas(SCORPION, '#ffffff'), caveSpider: spriteCanvas(CAVE_SPIDER, '#ffffff'), bat: spriteCanvas(BAT, '#ffffff'), mole: spriteCanvas(MOLE, '#ffffff') };
// § facing left: an enemy's sprite mirrored, for one that walked left (D-158)
function mirrored(cv) {
  const out = document.createElement('canvas');
  out.width = out.height = 16;
  const c = out.getContext('2d');
  c.scale(-1, 1); c.drawImage(cv, -16, 0);
  return out;
}
const LEFT = {}, LEFT_FLASHES = {};
for (const id of Object.keys(FLASHES)) { LEFT[id] = mirrored(SPRITES[id]); LEFT_FLASHES[id] = mirrored(FLASHES[id]); }
// § colours: a creature in its colour set, facing right and left (D-373); the first is its SPRITES one
const COLOURS = { scorpion: SCORPION_COLOURS.map((set) => spriteCanvas(SCORPION, null, { ...PAL, ...set })) };
const COLOURS_LEFT = Object.fromEntries(Object.entries(COLOURS).map(([id, all]) => [id, all.map(mirrored)]));
const dressedIn = (e, left) => (left ? COLOURS_LEFT : COLOURS)[e.id]?.[e.colour] ?? (left ? LEFT : SPRITES)[e.id];
// § looks: the hero in a cloak, eyes, trim and clothes (P3 to P6), its four cloak shades, its eye
// colour and the lantern's cap and base swapped, its rows dressed; the outline and the flame stay.
// Each is made once, the first time it is worn or shown. The profile in play's is worn wherever
// the hero is drawn, and its bitten flash keeps the clothes' shape.
const HEROES = {}, BITTEN = {};
export function heroIn(cloak, eyes, trim, clothes = DEFAULT_CLOTHES) {
  const key = `${cloak}/${eyes}/${trim}/${clothes}`;
  if (!HEROES[key]) {
    const [C, c, B, b] = (CLOAKS[cloak] ?? CLOAKS.teal).shades, e = (EYES[eyes] ?? EYES.bone).colour, [T, t] = (TRIMS[trim] ?? TRIMS.brass).shades;
    HEROES[key] = spriteCanvas(dressed(clothes), null, { ...PAL, C, c, B, b, e, T, t });
    if (CLOAKS[cloak]?.pattern) markPattern(HEROES[key], dressed(clothes), CLOAKS[cloak]);
  }
  return HEROES[key];
}
// § patterns (D-515, D-533): the marks over a patterned cloak's pixels, as in the patterns'
// mock-up: each says, for a cloak pixel at x, y of the whole sprite, 0 (none), 1 (a mark) or 2 (a
// second mark); a mark takes the light side's colour on C and c and the dark side's on B and b.
const SIDE = { C: 0, c: 0, B: 1, b: 1 };
// camo's noise, written as the mock-up's, so the blotches fall where they did there
const patHash = (x, y) => { let h = x * 374761393 + y * 668265263; h = (h ^ (h >> 13)) * 1274126177; return ((h ^ (h >> 16)) >>> 0) / 4294967296; };
const blobs = (spots) => (x, y) => (spots.some(([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1) ? 1 : 0);
const MASKS = {
  zebra: (x, y) => ((y + (Math.abs(x - 7.5) >> 1)) % 3 === 0 ? 1 : 0), // stripes dipping into a V down the middle
  cow: blobs([[5, 3.5, 1.2, 1], [10, 6.5, 0.8, 1.1], [4.5, 9.5, 1.6, 1.4], [10.5, 12.2, 1.6, 1.3], [7, 13.5, 0.7, 0.6]]), // a few big patches, no two alike
  camo: (x, y) => { const n = patHash(x >> 1, (y + 1) >> 1); return n < 0.3 ? 1 : n > 0.72 ? 2 : 0; }, // blotches in 2 × 2 chunks
};
function markPattern(cv, def, cloak) {
  const c = cv.getContext('2d'), mask = MASKS[cloak.pattern];
  build(def.rows, def.mirror).forEach((r, y) => [...r].forEach((ch, x) => {
    const m = ch in SIDE ? mask(x, y) : 0;
    if (!m) return;
    c.fillStyle = (m === 2 && cloak.second ? cloak.second : cloak.marks)[SIDE[ch]]; c.fillRect(x, y, 1, 1);
  }));
}
const bittenIn = (clothes) => (BITTEN[clothes] ??= spriteCanvas(dressed(clothes), PAL.p));
let worn = SPRITES.hero, wornBitten = bittenIn(DEFAULT_CLOTHES);
export function wearLook(cloak, eyes, trim, clothes) { worn = heroIn(cloak, eyes, trim, clothes); wornBitten = bittenIn(clothes); }

// § shadow: a small dark oval under a sprite (study line 345)
export function drawShadow(c, x, y, w) {
  c.fillStyle = 'rgba(0,0,0,.35)';
  c.fillRect(x + 8 - w / 2, y + 14, w, 2);
  c.fillRect(x + 9 - w / 2, y + 16, w - 2, 1);
}

// § deposit: drawn on its tile 2 pixels up, on a wide shadow, as items are (D-311)
// a copper vein the same way, with its own sprite (D-480)
export function drawDeposit(c, tx, ty, sprite = SPRITES.deposit) {
  const x = tx * 16, y = ty * 16 - 2;
  drawShadow(c, x, y, 12);
  c.drawImage(sprite, x, y);
}

// § people: each drawn on its tile 2 pixels up, standing still on their shadow as the hero does
// (D-501). Facing forward; with the hero within 2 tiles and not in their column, turned to face
// the hero: drawn facing left, mirrored when the hero is to the right (D-490, D-501).
export const FACE_TILES = 2;
const PEOPLE_RIGHT = {};
export function personSprite(p, hero) {
  const near = Math.max(Math.abs(p.x - hero.x), Math.abs(p.y - hero.y)) <= FACE_TILES;
  if (!near || hero.x === p.x) return SPRITES[p.id + 'Forward'] ?? SPRITES[p.id];
  if (hero.x < p.x) return SPRITES[p.id];
  return (PEOPLE_RIGHT[p.id] ??= mirrored(SPRITES[p.id]));
}
export function drawPeople(c, people, hero) {
  for (const p of people || []) {
    const x = p.x * 16, y = p.y * 16;
    drawShadow(c, x, y, 8);
    c.drawImage(personSprite(p, hero), x, y - 2);
  }
}

// § branch: drawn flat on its tile in its look, on a shadow as wide as it (D-316)
export function drawBranch(c, tx, ty, form) {
  const x = tx * 16, y = ty * 16;
  drawShadow(c, x, y - 1, 14);
  c.drawImage(FORMS.branch[form] || FORMS.branch[0], x, y);
}

// § bench: the workbench set down, drawn on its tile 2 pixels up, on a wide shadow, as a deposit is (WB2, D-322);
// the stash chest set down the same way, with its own sprite (CH2, D-329)
export function drawBench(c, tx, ty, sprite = SPRITES.workbench) {
  const x = tx * 16, y = ty * 16 - 2;
  drawShadow(c, x, y, 14);
  c.drawImage(sprite, x, y);
}

// § stump: drawn flat on its tile in its look, on a soft shadow (W3, D-317)
export function drawStump(c, tx, ty, form) {
  const x = tx * 16, y = ty * 16;
  drawShadow(c, x, y - 1, 12);
  c.drawImage(FORMS.stump[form] || FORMS.stump[0], x, y);
}

const LYING_DROP = 3; // pixels the fallen hero sits lower, on the floor
// § hero: drawn 2 pixels up from its tile, on its shadow (ART-DIRECTION.md).
// `bitten`: flashing red just after a bite (D-118). `lying`: fallen, turned
// a quarter over onto the floor, a whole turn so the pixels stay crisp (D-234).
export function drawHero(c, x, y, bitten = false, lying = false) {
  const sprite = bitten ? wornBitten : worn;
  drawShadow(c, x, y, lying ? 12 : 8);
  if (!lying) { c.drawImage(sprite, x, y - 2); return; }
  c.save();
  c.translate(x + 8, y + LYING_DROP + 8);
  c.rotate(Math.PI / 2);
  c.drawImage(sprite, -8, -8);
  c.restore();
}

// § items: each item 2 pixels up from its tile, on its shadow. An item bobs
// 1 pixel every 0.7 s, each row in its own beat; still with reduced motion (study line 379, D-077).
// A mushroom is drawn in its own tone (D-305).
export function drawItems(c, items, t, still) {
  for (const it of items) {
    const x = it.x * 16, y = it.y * 16;
    const bob = still ? 0 : Math.floor(t / 700 + it.y) % 2;
    drawShadow(c, x, y, 8);
    c.drawImage(spriteOf(it), x, y - 2 - bob);
  }
}

// § enemies: like items, 2 pixels up on a shadow. The rat bobs 1 pixel every
// 0.52 s, each column in its own beat; still with reduced motion (study line 378).
// `hits`: the enemies flashing white just now, the spear's two at most (D-105, D-479). A hit that
// killed it still flashes it once, then it is gone (D-113).
// `at`: (enemy) → the tile it is shown on, part way along while it slides (D-128).
// One that walked left is drawn mirrored (D-158).
// A creature's sprite, facing the way it faces, for its plaque (D-357)
export const faceOf = (e) => dressedIn(e, e.facing === 'left');
export function drawEnemies(c, enemies, t, still, hits = [], at = (e) => e) {
  const struck = (e) => hits.some((h) => e.x === h.x && e.y === h.y);
  for (const e of enemies) drawEnemy(c, e, at(e), t, still, struck(e));
  for (const h of hits) if (!enemies.some((e) => e.x === h.x && e.y === h.y)) drawEnemy(c, h, h, t, still, true);
}
function drawEnemy(c, e, p, t, still, flash) {
  const x = Math.round(p.x * 16), y = Math.round(p.y * 16);
  if (e.asleep && !flash) return drawItems(c, [{ id: get(e.id).looksLike, x: p.x, y: p.y }], t, still); // asleep, just like the find it copies (D-368)
  const bob = still ? 0 : Math.floor(t / 520 + e.x) % 2;
  drawShadow(c, x, y, 8);
  const left = e.facing === 'left';
  c.drawImage(flash ? (left ? LEFT_FLASHES : FLASHES)[e.id] : dressedIn(e, left), x, y - 2 - bob);
}
