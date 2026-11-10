// § pictures, creatures: the creatures and the finds they leave, from the rat to the mimic leaf,
// moved word for word from `pictures.js` at the thirteenth audit (D-782). Pixel maps and palette
// letters as there (PAL); `sprites.js` makes and draws them.
import { HERB } from './pictures.js';

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
// § mole mound: the mole under the earth (D-726), a low heap of churned soil, lit on top, a few
// clods and pebbles thrown up beside it
const MOLE_MOUND = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '', '......kkkk......', '....kkWWWEkk....', '..k.kWEEWEEFk.k.', '.kWkEEFEEfFFfkEk',
  '.kkEFFfFFFfFffkk', '..kFfFffFfffffk.', '...kkkkkkkkkkk..'] };
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
// § bone pile: a beaten bone rat fallen into a low heap of bones, its skull on top with the pink
// eye, look A of its mock-up (D-731)
const BONE_PILE = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '', '......kkkk......', '.....kaaaak.....', '....kaApaAak....', '..kkkaaaaaakkk..',
  '.kwaAkkAAkkaAwk.', 'kAAAaaAkkAaaAAAk', '.kkkkkkkkkkkkkk.'] };
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

// § bunny: side on and facing right (D-784), soft brown with a pale tail, long ears up, a dark eye
// (not a creature's pink one: it is harmless) and a pink nose
const BUNNY = { mirror: false, rows: [
  '', '', '.........kk.....', '........kWNk....', '........kWNkkk..', '.........kWkWNk.', '.........kWkWNk.', '..........kWWk..',
  '.....kkkkkWWWWk.', '...kkWWWWWWWkWWk', '..kWWWWWWWWWWWWp', '.kwkWWWWWWWWWNk.', 'kwwkNWWWWWWNNk..', '.kkNNNNNNNNNk...',
  '...knnnnnnnnk...', '..kkNkk...kkNk..'] };
// § bunny fur: the mole fur's tuft (D-541) in the bunny's lighter brown, pale at the tips (D-784)
const BUNNY_FUR = { mirror: false, rows: MOLE_FUR.rows.map((r) => r.replace(/[WNn]/g, (c) => ({ W: 'w', N: 'W', n: 'N' })[c])) };

// § skulker crab: look B of its mock-up (D-796), the loose stone (D-761) lifted on rust legs: a
// stony grey shell, two rust claws and pink eyes on stalks
const SKULKER_CRAB = { mirror: false, rows: [
  '', '', '', '', '', '.....k....k.....', '....kpk..kpk....', '.....k.kk.k.....', '..kk..kHHk..kk..', '.kzzk.kHLLk.kzzk',
  '.kzUkkHLLLMkkzUk', '..kkkLLLMMDkkk..', '....kMMMMDDk....', '...kkDDDDDDkk...', '..kUk.kUkU.kUk..', '.kU..k.kk.k..Uk.'] };
// § crab shell: a cracked half of its stony grey shell, lying open, a rust rim (D-796)
const CRAB_SHELL = { mirror: false, rows: [
  '', '', '', '', '', '', '', '', '......kkkk......', '....kkHHLLkk....', '...kHLLLLMMMk...', '..kLLLLxMMMDDk..',
  '..kMMMxMMMDDDk..', '..kzzzzzzzzzUk..', '...kkkkkkkkkk...'] };
// § rim lurker: look B of its mock-up (D-797), a hunched shade of dusky violet, the cave
// spider's (D-535), with long arms, pale bone claws and the pink hostile eyes
const RIM_LURKER = { mirror: false, rows: [
  '', '', '', '', '.....kkkkk......', '....kqqqqqk.....', '...kqqpqpqqk....', '...kqqqqqqqk....', '..kqQqqqqqQqk...',
  '.kqQkqqqqqkQqk..', '.kqkkQqqqQkkqk..', '.kqk.kQQQk.kqk..', 'kAk..kQkQk..kAk.', 'kk..kQk.kQk..kk.', '....kk...kk.....'] };
// § lurker claw: one long pale claw, hooked at the tip, its dusky violet root (D-797)
const LURKER_CLAW = { mirror: false, rows: [
  '', '', '', '', '', '', '..........kk....', '.........kwAk...', '........kwAk....', '.......kwAk.....',
  '......kwAk......', '.....kwwAk......', '....kQqqk.......', '....kQQk........', '.....kk.........'] };

export {
  RAT, GLOAMLING, LAMPMOTH, FLASK_MIMIC, SCORPION, CAVE_SPIDER, SPIDER_SILK, BAT, BAT_WING,
  BAT_FANG, BAT_GUANO, MOLE, MOLE_MOUND, MOLE_FUR, MOLE_CLAW, SNAPCAP, SNAPCAP_GILL, HERB_MIMIC,
  BONE_RAT, BONE_PILE, OIL_TICK, TICK_SHELL, OIL_BLADDER, RAT_BONE, MIMIC_LEAF, SCORPION_COLOURS, BUNNY, BUNNY_FUR, SKULKER_CRAB, CRAB_SHELL,
  RIM_LURKER, LURKER_CLAW,
};
