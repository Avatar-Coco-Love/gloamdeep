// § pictures: the 16 × 16 pixel pictures, moved word for word from `sprites.js` at 0.3.72,
// the ninth audit (D-617). `sprites.js` makes and draws them. Pixel maps are written as
// strings, one letter per palette colour; symmetric ones store the left half and mirror it
// (style study 1, lines 121–176, ART-DIRECTION.md "Sprites").
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

// § rod: a straight wooden pole up and right, darker at the grip, a silk line from its tip to a
// red-and-white float (look A of the fishing step 1 mock-up, D-609)
const ROD = { mirror: false, rows: [
  '.............k..', '............kNk.', '...........kWka.', '..........kWk.a.', '.........kWk..a.', '........kWk...a.', '.......kWk....a.', '......kWk.....a.',
  '.....kWk......a.', '....kWk......krk', '...kNk.......kwk', '..kNk.........k.', '.kNk............', 'kNk.............', '.k..............', ''] };

// § pond minnow: side on and facing right, as the rat is: a grey back, a pale teal stripe, a cream
// belly, a forked tail and a dark eye (look A of the fishing step 2 mock-up, D-610)
const POND_MINNOW = { mirror: false, rows: [
  '', '', '', '', '', '', '......kkkkkkk...', 'kk..kkdddddddSk.',
  'kdkkddsssssssksk', '.kddCCCCCCCCCssk', '.kdkaaaaaaaaaaak', 'kdkkkaaaaaaakk..', 'kk...kkkkkkk....', '', '', ''] };

// § blind cavefish: the minnow's shape, pale and eyeless, bone along its back, cream under it,
// a faint pink gill (look A of the cave pools mock-up, D-618)
const BLIND_CAVEFISH = { mirror: false, rows: [
  '', '', '', '', '', '', '......kkkkkkk...', 'kk..kkAAAAAAAak.',
  'kAkkAAaaaaaapaak', '.kAAaaaaaaaapaak', '.kAkwwwwwwwwwwwk', 'kAkkkwwwwwwwkk..', 'kk...kkkkkkk....', '', '', ''] };

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
// § gloamberry seed: a brown pip lit at its upper left, a tiny green shoot from its top (look C, D-564)
const GLOAMBERRY_SEED = { mirror: false, rows: [
  '', '', '', '.........kk.....', '........kgk.....', '.......kgk......', '.......kGk......', '......kWWNk.....',
  '.....kWaWNNk....', '.....kWWNNnk....', '.....kNNNnnk....', '......kNnnk.....', '.......kkk......'] };

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
// § snapcap: look B of its mock-up (D-543), the heartcap (D-303) awake: two pale eyes with
// pink pupils on its cap and a row of pale teeth under the rim; toned as a heartcap is
const SNAPCAP = { mirror: false, toned: 'rR', rows: [
  '', '', '', '.....kkkkkk.....', '....krrwrrrk....', '...krrrrrwRRk...', '...kwrwwrwwRk...', '..krrrwprwpRRk..', '..krrrrrrwrRRk..',
  '..kkwkwkwkwkkk..', '......kwak......', '......kwak......', '.....kwwak......', '.....kwwaak.....', '.....kkkkkk.....'] };
// § snapcap gill: look 1 of its mock-up (D-543), a fan of pale pink gills under a strip of red cap
const SNAPCAP_GILL = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '......kkkk......', '....kkrrrrkk....', '...kRrrrrrrRk...', '..kpwpwpwpwpwk..',
  '..kwpwpwpwpwpk..', '...kpwpwpwpwk...', '....kkkkkkkk....'] };
// § herb mimic: the herb (D-155) awake (D-549): pink eyes on its two side leaves and a row of
// pale teeth under them, as in its mock-up
const HERB_MIMIC = { mirror: false, rows: HERB.rows.map((r, i) => ({ 8: '.kgpgk.kGk.kgpgk', 10: '...kkwkwkwkwkk..' })[i] ?? r) };
// § bone rat: the rat (D-109) with nothing left but bone (D-549, D-551): pale bone where its
// fur was, darker bone for its shading and legs, the pink eye and tail tip kept, as in its mock-up
const BONE_RAT = { mirror: false, rows: RAT.rows.map((r, i) => ({ 11: '..kaAaAaAaAaaaak', 12: 'A.kAaaaaaaaaaakp', 13: '.AkAAAAAAAAAAkw.', 14: '..AkkAAkkkkAAk..', 15: '....kAk...kAk...' })[i] ?? r)
  .map((r) => r.replace(/S/g, 'a').replace(/s/g, 'A').replace(/d/g, 'A')) };
// § oil tick: look B of its mock-up (D-606): side on and facing right, a round tick swollen with
// the amber oil it drank, lit on top and darker below, a small dusky head with the pink eye,
// a short drinking beak and six thin legs
const OIL_TICK = { mirror: false, rows: [
  '', '', '', '', '', '', '', '....kkkkk.......', '..kkoyyook......', '.koyyooooOk.....', 'koyoooooooOk....',
  'koooooooooOkkk..', 'kOoooooooOOkqpkk', '.kOOOOOOOOkkqk..', '..kk.kk.kk.kk...', '.k..k..k..k..k..'] };
// § tick shell: the tick's split dusky shell, its two halves lying open (D-606)
const TICK_SHELL = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '', '', '...kkkk..kkkk...', '..kqqqQk.kQqqqk.', '.kqqQQQk.kQQqqqk',
  '.kQQQQk...kQQQk.', '..kkkk.....kkk..'] };
// § oil bladder: the rare one, a plump sac of amber oil with a pale gleam, a short dusky neck (D-606)
const OIL_BLADDER = { mirror: false, rows: [
  '', '', '', '', '', '', '', '.......kk.......', '......kqqk......', '.....kkqqkk.....', '....koyyoook....',
  '...koywoooOOk...', '...koyoooooOk...', '...kooooooOOk...', '....kOOOOOOk....', '.....kkkkkk.....'] };
// § rat bone: a small pale bone with knobbed ends, lying aslant (D-551)
const RAT_BONE = { mirror: false, rows: [
  '', '', '', '', '', '..........kk....', '.........kwak...', '........kwaAk...', '.......kaAk.....', '......kaAk......',
  '.....kaAk.......', '....kwaAk.......', '...kaaAk........', '...kAAk.........', '....kk..........'] };
// § mimic leaf: one of the herb's leaves with a pink spot where the eye was (D-549)
const MIMIC_LEAF = { mirror: false, rows: [
  '', '', '', '', '', '..........kk....', '........kkgk....', '......kkggGk....', '.....kggwpGk....',
  '....kgggppGk....', '....kgGgGGGk....', '...kgGGGGGk.....', '...kGGGGkk......', '..kGkkk.........', '.kGk............', '.kk.............'] };
const SCORPION_COLOURS = [
  { o: '#d9c48e', O: '#9a8458', a: '#efe6cc' }, { o: '#d0603a', O: '#7e3020', a: '#e8d5a0' },
  { o: '#5e5870', O: '#302c3c', a: '#b9ab88' }, { o: '#a9a65a', O: '#64612e', a: '#e8d5a0' },
  { o: '#e6dcc4', O: '#a89c80', a: '#6b7686' },
];

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

// § centipede charm: look A of its mock-up (D-656), a drop of venom's pale green, a gleam at its
// top left, in the wisp charm's copper setting and loop
const CENTIPEDE_CHARM = { mirror: false, rows: [
  '', '', '', '......kkkk......', '.....ko..ok.....', '......kook......', '.....kkkkkk.....', '....koooooOk....', '...koOkkkkOOk...', '...kokkwVkkOk...',
  '...kokVVggkOk...', '...kokkgGkkOk...', '...koOkkkkOOk...', '....kOOOOOOk....', '.....kkkkkk.....', ''] };

// § lure wisp: look A of its mock-up (D-649), a cold flame: a bone-white core, blue edges in
// the gloamberry's blues, two pink eyes in the core
const LURE_WISP = { mirror: false, rows: [
  '', '.......k', '......kvk', '......kvk', '.....kvwvk', '.....kvwvk', '....kvwwwvk', '....kvwwwvk',
  '...kvwpwpwvk', '...kvwwwwwvk', '...kuvwwwvuk', '....kuvvvuk', '.....kuuuk', '......kkk'] };
// § wisp glass: a sliver of the wisp's cold glass, pale at its edge and blue inside, lying aslant (D-649)
const WISP_GLASS = { mirror: false, rows: [
  '', '', '', '', '', '', '..........kk....', '.........kwvk...', '........kwvvk...', '.......kwvvuk...',
  '......kwvvuk....', '.....kwvvuk.....', '....kvvuuk......', '....kvuuk.......', '.....kkk........'] };

// § centipede: look A of its mock-up (D-654): side on and facing right, a long low body of rust
// segments, lit on top and dark between, pale legs under each, two feelers and green fangs
const CENTIPEDE = { mirror: false, rows: [
  '', '', '', '', '', '', '', '..............k.', '.............k.k', '...kkkk..kkkkkk.', '..kzzUzk.kzUzzzk',
  '.kzUzUUUkzUzUpzk', 'kUUZUZUUUUZUUUVk', 'kZkZkZkZkZkZkkkV', 'kA.kA.kA.kA.kA..', 'A..A..A..A..A...'] };

// § centipede leg: a thin pale jointed leg lying aslant, a rust stub at its root and a hooked tip (D-654)
const CENTIPEDE_LEG = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '...........kk...', '..........kzUk..', '.........kaAkk..', '........kaAk....',
  '.......kak......', '......kaAk......', '.....kAk........', '....kak.........'] };

// § antidote: a tall thin vial under a cork, filled with moss and venom's pale green, a
// gleam on its left; a new shape, so it is told from the round red potion (look B, D-655)
const ANTIDOTE = { mirror: true, rows: [
  '', '......kk', '.....kaa', '......kk', '......kC', '......kC', '.....kCV', '.....kVg', '.....kVg', '.....kgg',
  '.....kgg', '.....kGg', '.....kGG', '......kk'] };

// § spit grub: look A of its mock-up (D-688), a glowworm side on and facing right: a plump pale
// grub of bone-white rings, its tail end glowing venom green with a bright core, a pink eye and
// an open mouth
const SPIT_GRUB = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '......kkkkk.....', '....kkwwawwkk...', '..kkawwawwawwk..', '.kVVawAwwAwwpwk.',
  'kVJVaAwAAwAwwwkk', 'kVVVAAAAAAAAwwk.', '.kkkkkkkkkkkkk..', ''] };

// § grub skin: look A of its mock-up (D-688), a thin pale shed skin curled into a loose ring
const GRUB_SKIN = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '.......kkkk.....', '.....kkawwak....', '....kawAkkwak...', '...kawk...kak...',
  '...kak....kAk...', '...kAwkkkkak....', '....kkAAAAk.....', '......kkkk......'] };

// § glow gland: the rare one, look A of its mock-up (D-688), a plump bulb of venom green with a
// bright core at its upper left, moss green below, under a short pale neck
const GLOW_GLAND = { mirror: false, rows: [
  '', '', '', '', '', '', '', '.......kk.......', '......kAAk......', '.....kkVVkk.....', '....kVJJVVVk....',
  '...kVJJVVVVGk...', '...kVVVVVVVGk...', '...kVVVVVVGGk...', '....kGVVVGGk....', '.....kkkkkk.....'] };

// § locket: look A (D-691), a tarnished brass oval on a thin chain, the lantern trim's pale
// brass and bone's shade, darker at its right; a tiny flame scratched on its face
const LOCKET = { mirror: false, rows: [
  '', '.......kk.......', '......k..k......', '.......kk.......', '......kTOk......', '....kkkkkkkk....', '...kTTAAAAOOk...',
  '..kTAAAAyAAAOk..', '..kTAAAyYyAAOk..', '..kTAAAAYAAAOk..', '..kTAAAAAAAAOk..', '...kTAAAAAAOk...', '....kkOOOOkk....',
  '......kkkk......', '', ''] };

export {
  PAL, HERO, CLOTHES_ROWS, dressed, FLASK, HERB, OILCAP, HEARTCAP, DEPOSIT, STONE, VEIN,
  COPPER_ORE, PICK, ROD, POND_MINNOW, BLIND_CAVEFISH, COPPER_WICK, RAT_VEST, RAT_TAIL, MOTH_DUST, STINGER,
  MIMIC_GLASS, GLOAM_WISP, VENOM_SAC, MIMIC_HEART, GLOAM_EYE, WOODS, BRANCHES, STUMPS, BERRY_BUSH,
  BARE_BUSH, GLOAMBERRY, GLOAMBERRY_SEED, WORKBENCH, CHEST, RUBBLE, PEDDLER, PEDDLER_FORWARD, BED, SHELF,
  GARDEN_BED, SPROUT, over, SPROUTED_BED, FLECKS, FED_BED, SMALL_BUSH, BERRY_BED, POUCH, BIG_BAG,
  LOSTBAG, POTION, KNIFE, SPEAR, RAT, GLOAMLING, LAMPMOTH, FLASK_MIMIC, SCORPION, CAVE_SPIDER,
  SPIDER_SILK, BAT, BAT_WING, BAT_FANG, BAT_GUANO, MOLE, MOLE_FUR, MOLE_CLAW, SNAPCAP,
  SNAPCAP_GILL, HERB_MIMIC, BONE_RAT, OIL_TICK, TICK_SHELL, OIL_BLADDER, RAT_BONE, MIMIC_LEAF,
  SCORPION_COLOURS, BAG_TORCH, WISP_CHARM, HEART_CHARM,
  LURE_WISP,
  WISP_GLASS,
  CENTIPEDE,
  CENTIPEDE_LEG,
  ANTIDOTE,
  CENTIPEDE_CHARM,
  SPIT_GRUB,
  GRUB_SKIN,
  GLOW_GLAND,
  LOCKET,
};
