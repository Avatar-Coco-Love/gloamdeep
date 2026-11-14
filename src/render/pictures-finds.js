// § pictures, finds: the finds you carry, from the flask to the ember (the food, ores, tools, fish,
// materials, weapons, charms, draughts, the locket and the warden's fist), moved word for word from
// `pictures.js` at the sixteenth audit (D-910). Pixel maps and palette letters as there (PAL);
// `sprites.js` makes and draws them.
// § flask: the study's oil flask, a cork over a bottle of amber oil (study line 156, D-077)
const FLASK = { mirror: true, rows: [
  '', '', '......kk', '.....kaa', '......kk', '......ko', '.....koo', '....kooo', '...kwooo', '...kwooo',
  '...koooo', '...kOooo', '....kOOO', '.....kkk'] };

// § herb: a sprig of three leaves in the moss greens, light on top, dark
// underneath and down the stem (D-155)
const HERB = { mirror: false, rows: [
  '', '', '', '', '.......kk.......', '......kggk......', '......kgGk......', '..kkk..kGk.kkk..',
  '.kgggk.kGk.kgggk', '..kgGGkkGkkGGgk.', '...kkGGkGkGGkk..', '.....kkGGGkk....', '.......kGk......', '.......kkk......'] };

// § duskstar: five violet petals, lit and shaded, round a yellow heart, on a stem with one leaf
// (look B of the flower mock-up, D-763). `toned`: the petals' letters, shifted per flower.
const DUSKSTAR = { mirror: false, toned: 'Pj', rows: [
  '', '', '.......kk.......', '......kPPk......', '.kkk..kPjk..kkk.', 'kPPPkkkPjkkkPPPk', '.kPjPkyyyykPjPk.', '..kkjkyYYykjkk..',
  '....kkyyyykk....', '...kPjkkkkjPk...', '..kPjk.kGk.kjPk.', '..kkk..kGk..kkk.', '...kgk.kGk......', '....kgkkGk......', '.....kkGGk......', '......kkkk......'] };

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

// § mole claw pick: the Stone Pick's handle, its head a mole's pale claw lashed on with dark cord,
// curving down to a blunt point (D-810)
const MOLE_CLAW_PICK = { mirror: false, rows: [
  '', '', '....kkkk........', '...kwwaakk......', '....kkkaaAk.....', '.......knAAk....', '.......kWkaAk...', '......kWk.kAk...',
  '.....kWk..kAk...', '....kNk....kk...', '...kNk..........', '..kNk...........', '.kNk............', '.kk.............', '', ''] };

// § shovel: a flat grey stone spade at the bottom left, on a straight wooden handle up and right
// with a T-grip at its top, the Stone Pick's family (look A, D-926)
const SHOVEL = { mirror: false, rows: [
  '', '...........k....', '..........kNk...', '...........kNk..', '..........kNkNk.', '.........kNk.k..', '........kWk.....', '....k..kWk......',
  '...kDkkWk.......', '..kMMDWk........', '.kLLMMDk........', 'kHHLLMk.........', '.kHHLk..........', '..kHk...........', '...k............', ''] };

// § rod: a straight wooden pole up and right, darker at the grip, a silk line from its tip to a
// red-and-white float (look A of the fishing step 1 mock-up, D-609)
const ROD = { mirror: false, rows: [
  '.............k..', '............kNk.', '...........kWka.', '..........kWk.a.', '.........kWk..a.', '........kWk...a.', '.......kWk....a.', '......kWk.....a.',
  '.....kWk......a.', '....kWk......krk', '...kNk.......kwk', '..kNk.........k.', '.kNk............', 'kNk.............', '.k..............', ''] };

// § rod with its hook: the rod, a short silk line under the float and a small pale bone hook on
// it, once the Bone Hook is fitted (D-807)
const ROD_HOOKED = { mirror: false, rows: [
  '.............k..', '............kNk.', '...........kWka.', '..........kWk.a.', '.........kWk..a.', '........kWk...a.', '.......kWk....a.', '......kWk.....a.',
  '.....kWk......a.', '....kWk......krk', '...kNk.......kwk', '..kNk.........k.', '.kNk..........w.', 'kNk.........w.w.', '.k..........www.', ''] };

// § bone hook: a rat bone bent into a J, its knobbed end at the top, the barb up at the left (D-807)
const BONE_HOOK = { mirror: false, rows: [
  '', '', '', '.........kk.....', '........kwak....', '........kaAk....', '........kaAk....', '........kaAk....', '........kaAk....',
  '...kk...kaAk....', '..kwak..kaAk....', '..kaAk.kaAk.....', '...kaAkaAk......', '....kaaAk.......', '.....kkk........', ''] };

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

// § shell vest: overlapping stony grey plates of crab shell, rust at each plate's edge, the
// skulker crab's colours, the rat hide vest's shape (D-801)
const SHELL_VEST = { mirror: false, rows: [
  '', '', '...kkk....kkk...', '..kzHUk..kUHzk..', '.kHHLLMkkMLLHHk.', '.kzzzzzkkzzzzzk.', '.kkHHLLkkLLHHkk.', '..kLLMMkkMMLLk..',
  '..kzzzzkkzzzzk..', '..kHLLMkkMLLHk..', '..kLMMDkkDMMLk..', '..kUUUUkkUUUUk..', '..kMDDDkkDDDMk..', '..kkkkkkkkkkkk..', '', ''] };

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

// § gloamberry: three of the bush's berries on a short green stem (D-531)
const GLOAMBERRY = { mirror: false, rows: [
  '', '', '', '', '........kk......', '.......kgGk.....', '....kk.kGk......', '...kvuk.kk.kk...',
  '...kuuukkkkvuk..', '....kkkvuk.kuuk.', '......kuuuk.kk..', '.......kkk......'] };
// § gloamberry seed: a brown pip lit at its upper left, a tiny green shoot from its top (look C, D-564)
const GLOAMBERRY_SEED = { mirror: false, rows: [
  '', '', '', '.........kk.....', '........kgk.....', '.......kgk......', '.......kGk......', '......kWWNk.....',
  '.....kWaWNNk....', '.....kWWNNnk....', '.....kNNNnnk....', '......kNnnk.....', '.......kkk......'] };

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

// § fang charm: a bat fang, pale and pointing down, in the wisp charm's copper setting and loop (D-809)
const FANG_CHARM = { mirror: false, rows: [
  '', '', '', '......kkkk......', '.....ko..ok.....', '......kook......', '.....kkkkkk.....', '....koooooOk....', '...koOkkkkOOk...', '...kokwwwAkOk...',
  '...kokkwAkkOk...', '...kokkwkkkOk...', '...koOkkkkOOk...', '....kOOOOOOk....', '.....kkkkkk.....', ''] };

// § echo charm: a folded bat wing, a bone spar over dark leather with a scalloped edge, in the
// wisp charm's copper setting and loop (D-805)
const ECHO_CHARM = { mirror: false, rows: [
  '', '', '', '......kkkk......', '.....ko..ok.....', '......kook......', '.....kkkkkk.....', '....koooooOk....', '...koOkkkkOOk...', '...kokAAAkkOk...',
  '...kokNnNAkOk...', '...kokNkNnkOk...', '...koOkkkkOOk...', '....kOOOOOOk....', '.....kkkkkk.....', ''] };

// § wisp glass: a sliver of the wisp's cold glass, pale at its edge and blue inside, lying aslant (D-649)
const WISP_GLASS = { mirror: false, rows: [
  '', '', '', '', '', '', '..........kk....', '.........kwvk...', '........kwvvk...', '.......kwvvuk...',
  '......kwvvuk....', '.....kwvvuk.....', '....kvvuuk......', '....kvuuk.......', '.....kkk........'] };

// § centipede leg: a thin pale jointed leg lying aslant, a rust stub at its root and a hooked tip (D-654)
const CENTIPEDE_LEG = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '...........kk...', '..........kzUk..', '.........kaAkk..', '........kaAk....',
  '.......kak......', '......kaAk......', '.....kAk........', '....kak.........'] };

// § antidote: a tall thin vial under a cork, filled with moss and venom's pale green, a
// gleam on its left; a new shape, so it is told from the round red potion (look B, D-655)
const ANTIDOTE = { mirror: true, rows: [
  '', '......kk', '.....kaa', '......kk', '......kC', '......kC', '.....kCV', '.....kVg', '.....kVg', '.....kgg',
  '.....kgg', '.....kGg', '.....kGG', '......kk'] };

// § grub skin: look A of its mock-up (D-688), a thin pale shed skin curled into a loose ring
const GRUB_SKIN = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '.......kkkk.....', '.....kkawwak....', '....kawAkkwak...', '...kawk...kak...',
  '...kak....kAk...', '...kAwkkkkak....', '....kkAAAAk.....', '......kkkk......'] };

// § glow gland: the rare one, look A of its mock-up (D-688), a plump bulb of venom green with a
// bright core at its upper left, moss green below, under a short pale neck
const GLOW_GLAND = { mirror: false, rows: [
  '', '', '', '', '', '', '', '.......kk.......', '......kAAk......', '.....kkVVkk.....', '....kVJJVVVk....',
  '...kVJJVVVVGk...', '...kVVVVVVVGk...', '...kVVVVVVGGk...', '....kGVVVGGk....', '.....kkkkkk.....'] };

// § locket: look D of its mock-up (D-692), open on its hinge: a gold case, its lid swung out to
// the left with the scratched flame (D-691) in violet on it, a violet hollow with a tiny flame
// burning inside, on a violet bail and thin chain; its own colours, LOCKET_COLOURS
const LOCKET = { mirror: false, rows: [
  '', '........kkk.....', '.......k...k....', '........kkk.....', '........kbk.....', '......kkkkkkk...',
  '.kk..kTTTTTOOk..', 'kAOk.kTffyffOk..', 'kAAOkkTfyYyfOk..', 'kAsOOkTfYwYfOk..', 'kAAOkkTffYffOk..', 'kAOk.kTfftffOk..',
  '.kk...kTOOOOk...', '.......kkkkk....', '', ''] };
// gold for the brass, violet for the flame on the lid, the bail and the hollow (D-692)
const LOCKET_COLOURS = { T: '#ffe08a', A: '#e9a94a', O: '#9a5424', f: '#2b1f44', s: '#b49cf0', b: '#b49cf0' };
// the slow shimmer's glint, one pixel sliding along the case's top edge: [x, y] per step (D-692)
const LOCKET_GLINT = [[6, 6], [7, 6], [8, 6], [9, 6], [10, 6], [11, 6]];

// § warden's fist (D-885, D-888): its find, as the mock-up drew it: a fist of old stone, the
// warden's own greys, a gold band at the wrist and a violet stone set in it; the band in the
// locket's golds, its own colours
const WARDEN_FIST = { mirror: false, rows: [
  '', '', '', '.....kkkkkk.....', '....kHHkHHkk....', '...kHHHkHHLLk...', '...kHHHkHLLLk...', '..kkkkkkkkLMk...',
  '..kHHHHHHLLMk...', '..kHHHHLLLMDk...', '...kLLLLMMDk....', '...kTTPPAOOk....', '...kTAAAAOOk....', '...kkkkkkkkk....', '', ''] };
const WARDEN_FIST_COLOURS = { T: '#ffe08a', A: '#e9a94a', O: '#9a5424' };

// § glow draught: the red potion's round bottle in the lantern's gold, light and shade (D-786)
const GLOW_DRAUGHT = { ...POTION, rows: POTION.rows.map((r) => r.replace(/r/g, 'y').replace(/R/g, 'Y')) };
// § slowburn: the same bottle, dark as lamp oil: amber-deep, its shade the wood's dark brown (D-792)
const SLOWBURN = { ...POTION, rows: POTION.rows.map((r) => r.replace(/r/g, 'O').replace(/R/g, 'N')) };
// § mending draught: the same bottle in the moss's green, light and shade (D-794)
const MENDING_DRAUGHT = { ...POTION, rows: POTION.rows.map((r) => r.replace(/r/g, 'g').replace(/R/g, 'G')) };
// § ward draught: the same bottle in pale green-white, light and shade, its own colours (D-795)
const WARD_DRAUGHT = { ...POTION, rows: POTION.rows.map((r) => r.replace(/r/g, 'l').replace(/R/g, 'm')) };
const WARD_COLOURS = { l: '#dcf0d4', m: '#8fb898' };
// § spitproof draught: the same bottle in dusty rose, light and shade, from the spit grub's pink eye (D-802)
const SPITPROOF_DRAUGHT = WARD_DRAUGHT;
const SPITPROOF_COLOURS = { l: '#e0a0aa', m: '#a8606e' };
// § shade draught: the same bottle in dusky violet, light and shade, the rim lurker's (D-806)
const SHADE_DRAUGHT = WARD_DRAUGHT;
const SHADE_COLOURS = { l: '#b39ad0', m: '#6e5a8c' };

// § ember (D-896): a lump of coal, cracks of the torch's orange with a gold heart, small enough to
// sit on the plinth's top
const EMBER = { mirror: false, rows: ['', '', '', '', '', '', '', '', '.....kkkkkk.....', '....kfnYYnfk....',
  '...kfYyyYnnfk...', '...knnYywYnnk...', '...kfYnnyYynk...', '....kfnYnnfk....', '.....kkkkkk.....', ''] };


export {
  FLASK,
  HERB,
  DUSKSTAR,
  OILCAP,
  HEARTCAP,
  DEPOSIT,
  STONE,
  VEIN,
  COPPER_ORE,
  PICK,
  MOLE_CLAW_PICK,
  SHOVEL,
  ROD,
  ROD_HOOKED,
  BONE_HOOK,
  POND_MINNOW,
  BLIND_CAVEFISH,
  COPPER_WICK,
  RAT_VEST,
  SHELL_VEST,
  RAT_TAIL,
  MOTH_DUST,
  STINGER,
  MIMIC_GLASS,
  GLOAM_WISP,
  VENOM_SAC,
  MIMIC_HEART,
  GLOAM_EYE,
  GLOAMBERRY,
  GLOAMBERRY_SEED,
  POTION,
  KNIFE,
  SPEAR,
  BAG_TORCH,
  WISP_CHARM,
  HEART_CHARM,
  CENTIPEDE_CHARM,
  FANG_CHARM,
  ECHO_CHARM,
  WISP_GLASS,
  CENTIPEDE_LEG,
  ANTIDOTE,
  GRUB_SKIN,
  GLOW_GLAND,
  LOCKET,
  LOCKET_COLOURS,
  LOCKET_GLINT,
  WARDEN_FIST,
  WARDEN_FIST_COLOURS,
  GLOW_DRAUGHT,
  SLOWBURN,
  MENDING_DRAUGHT,
  WARD_DRAUGHT,
  WARD_COLOURS,
  SPITPROOF_DRAUGHT,
  SPITPROOF_COLOURS,
  SHADE_DRAUGHT,
  SHADE_COLOURS,
  EMBER,
};
