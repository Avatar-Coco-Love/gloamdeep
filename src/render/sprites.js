// § sprites: the 16 × 16 pixel pictures in `pictures.js` made into canvases and
// drawn; the pictures moved there at 0.3.72 (D-617), the creatures' to `pictures-creatures.js` (D-782).
import { CLOAKS, EYES, TRIMS, get } from '../core/registry.js';
import { DEFAULT_CLOTHES, DEFAULT_LAMP, DEFAULT_HEAD } from '../core/looks.js';
import { keep } from './wipe.js';
import {
  PAL, HERO, CLOTHES_ROWS, dressed, FLASK, HERB, DUSKSTAR, OILCAP, HEARTCAP, DEPOSIT, STONE, VEIN,
  COPPER_ORE, PICK, MOLE_CLAW_PICK, ROD, ROD_HOOKED, BONE_HOOK, POND_MINNOW, BLIND_CAVEFISH, COPPER_WICK, RAT_VEST, SHELL_VEST, RAT_TAIL, MOTH_DUST, STINGER,
  MIMIC_GLASS, GLOAM_WISP, VENOM_SAC, MIMIC_HEART, GLOAM_EYE, WOODS, BRANCHES, STUMPS, BERRY_BUSH,
  BARE_BUSH, GLOAMBERRY, GLOAMBERRY_SEED, WORKBENCH, CHEST, RUBBLE, PEDDLER, PEDDLER_FORWARD, BED, SHELF, MORTAR, LOCKET_SHELF, LOCKET_SHELF_COLOURS, LOCKET_SHELF_GLINT, LOCKET_ON_SHELF,
  GARDEN_BED, SPROUT, over, SPROUTED_BED, FLECKS, FED_BED, SMALL_BUSH, BERRY_BED, POUCH, BIG_BAG,
  LOSTBAG, POTION, KNIFE, SPEAR, BAG_TORCH, WISP_CHARM, HEART_CHARM,
  LURE_WISP,
  WISP_GLASS,
  CENTIPEDE,
  CENTIPEDE_LEG,
  ANTIDOTE,
  CENTIPEDE_CHARM,
  ECHO_CHARM,
  FANG_CHARM,
  SPIT_GRUB,
  GRUB_SKIN,
  GLOW_GLAND,
  GLOW_LAMP,
  LOCKET,
  LOCKET_COLOURS,
  LOCKET_GLINT,
  WARDEN,
  WARDEN_RAISED,
  CAMPFIRE,
  CAMPFIRE_EMBERS,
  CAMPFIRE_ASHES,
  LAMPPOST,
  CAMP,
  CAMP_PICK,
  GLOW_DRAUGHT,
  SLOWBURN,
  MENDING_DRAUGHT,
  WARD_DRAUGHT,
  WARD_COLOURS,
  SPITPROOF_DRAUGHT,
  SPITPROOF_COLOURS,
  SHADE_DRAUGHT,
  SHADE_COLOURS,
} from './pictures.js';
import {
  RAT, GLOAMLING, LAMPMOTH, FLASK_MIMIC, SCORPION, CAVE_SPIDER, SPIDER_SILK, BAT, BAT_WING, BAT_FANG, BAT_GUANO,
  MOLE, MOLE_MOUND, MOLE_FUR, MOLE_CLAW, SNAPCAP, SNAPCAP_GILL, HERB_MIMIC, BONE_RAT, BONE_PILE, OIL_TICK,
  TICK_SHELL, OIL_BLADDER, RAT_BONE, MIMIC_LEAF, SCORPION_COLOURS, BUNNY, BUNNY_FUR, SKULKER_CRAB, CRAB_SHELL,
  RIM_LURKER, LURKER_CLAW, FUR_BEDROLL, BEDROLL_LAID,
} from './pictures-creatures.js';

function build(rows, mirror) {
  return Array.from({ length: 16 }, (_, i) => {
    let r = rows[i] || '';
    if (mirror) { r = (r + '........').slice(0, 8); r += [...r].reverse().join(''); }
    return (r + '................').slice(0, 16);
  });
}

// flash: the silhouette for a hit flash, white (ART-DIRECTION.md, "Sprites"),
// or the hostile red when the hero is bitten (D-118); pal: the colours, as PAL
// after(cv): drawn over it, every time it is painted. Painted again after a wipe (D-588).
function spriteCanvas(def, flash = null, pal = PAL, after = null) {
  const cv = document.createElement('canvas'), rows = build(def.rows, def.mirror);
  cv.width = cv.height = 16;
  const y = rows.findIndex((r) => [...r].some((ch) => pal[ch])), at = y >= 0 ? [[...rows[y]].findIndex((ch) => pal[ch]), y] : null;
  return keep(cv, () => {
    const c = cv.getContext('2d');
    rows.forEach((r, y) => [...r].forEach((ch, x) => {
      if (!pal[ch]) return;
      c.fillStyle = flash || pal[ch]; c.fillRect(x, y, 1, 1);
    }));
    for (const [x, y, ch] of def.extra || []) { c.fillStyle = flash || pal[ch]; c.fillRect(x, y, 1, 1); }
    if (after) after(cv);
  }, at);
}


export const SPRITES = { hero: spriteCanvas(HERO), flask: spriteCanvas(FLASK), herb: spriteCanvas(HERB), duskstar: spriteCanvas(DUSKSTAR), oilcap: spriteCanvas(OILCAP), heartcap: spriteCanvas(HEARTCAP), potion: spriteCanvas(POTION), knife: spriteCanvas(KNIFE), spear: spriteCanvas(SPEAR), deposit: spriteCanvas(DEPOSIT), vein: spriteCanvas(VEIN), rubble: spriteCanvas(RUBBLE), peddler: spriteCanvas(PEDDLER), peddlerForward: spriteCanvas(PEDDLER_FORWARD), stone: spriteCanvas(STONE), copperOre: spriteCanvas(COPPER_ORE), pick: spriteCanvas(PICK), moleClawPick: spriteCanvas(MOLE_CLAW_PICK), rod: spriteCanvas(ROD), rodHooked: spriteCanvas(ROD_HOOKED), boneHook: spriteCanvas(BONE_HOOK), furBedroll: spriteCanvas(FUR_BEDROLL), bedrollLaid: spriteCanvas(BEDROLL_LAID), pondMinnow: spriteCanvas(POND_MINNOW), blindCavefish: spriteCanvas(BLIND_CAVEFISH), copperWick: spriteCanvas(COPPER_WICK), ratVest: spriteCanvas(RAT_VEST), shellVest: spriteCanvas(SHELL_VEST), wispCharm: spriteCanvas(WISP_CHARM), heartCharm: spriteCanvas(HEART_CHARM), ratTail: spriteCanvas(RAT_TAIL), mothDust: spriteCanvas(MOTH_DUST), stinger: spriteCanvas(STINGER, null, { ...PAL, ...SCORPION_COLOURS[0] }), spiderSilk: spriteCanvas(SPIDER_SILK), caveSpider: spriteCanvas(CAVE_SPIDER), batWing: spriteCanvas(BAT_WING), batFang: spriteCanvas(BAT_FANG), batGuano: spriteCanvas(BAT_GUANO), bat: spriteCanvas(BAT), mole: spriteCanvas(MOLE), moleFur: spriteCanvas(MOLE_FUR), moleClaw: spriteCanvas(MOLE_CLAW), snapcap: spriteCanvas(SNAPCAP), snapcapGill: spriteCanvas(SNAPCAP_GILL), herbMimic: spriteCanvas(HERB_MIMIC), mimicLeaf: spriteCanvas(MIMIC_LEAF), boneRat: spriteCanvas(BONE_RAT), ratBone: spriteCanvas(RAT_BONE), oilTick: spriteCanvas(OIL_TICK), tickShell: spriteCanvas(TICK_SHELL), oilBladder: spriteCanvas(OIL_BLADDER), mimicGlass: spriteCanvas(MIMIC_GLASS), gloamWisp: spriteCanvas(GLOAM_WISP), venomSac: spriteCanvas(VENOM_SAC, null, { ...PAL, ...SCORPION_COLOURS[0] }), mimicHeart: spriteCanvas(MIMIC_HEART), gloamEye: spriteCanvas(GLOAM_EYE), bagTorch: spriteCanvas(BAG_TORCH), gloamberry: spriteCanvas(GLOAMBERRY), gloamberrySeed: spriteCanvas(GLOAMBERRY_SEED), berryBush: spriteCanvas(BERRY_BUSH), bareBush: spriteCanvas(BARE_BUSH), wood: spriteCanvas(WOODS[0]), workbench: spriteCanvas(WORKBENCH), chest: spriteCanvas(CHEST), bed: spriteCanvas(BED), gardenBed: spriteCanvas(GARDEN_BED), shelf: spriteCanvas(SHELF), mortar: spriteCanvas(MORTAR), locketShelf: spriteCanvas(LOCKET_SHELF, null, { ...PAL, ...LOCKET_SHELF_COLOURS }), sproutedBed: spriteCanvas(SPROUTED_BED), fedBed: spriteCanvas(FED_BED), berryBed: spriteCanvas(BERRY_BED), lostbag: spriteCanvas(LOSTBAG), pouch: spriteCanvas(POUCH), bigBag: spriteCanvas(BIG_BAG), rat: spriteCanvas(RAT), gloamling: spriteCanvas(GLOAMLING), lampmoth: spriteCanvas(LAMPMOTH), flaskMimic: spriteCanvas(FLASK_MIMIC), scorpion: spriteCanvas(SCORPION, null, { ...PAL, ...SCORPION_COLOURS[0] }), lureWisp: spriteCanvas(LURE_WISP), wispGlass: spriteCanvas(WISP_GLASS), centipede: spriteCanvas(CENTIPEDE), centipedeLeg: spriteCanvas(CENTIPEDE_LEG), antidote: spriteCanvas(ANTIDOTE), centipedeCharm: spriteCanvas(CENTIPEDE_CHARM), echoCharm: spriteCanvas(ECHO_CHARM), fangCharm: spriteCanvas(FANG_CHARM), spitGrub: spriteCanvas(SPIT_GRUB), grubSkin: spriteCanvas(GRUB_SKIN), glowGland: spriteCanvas(GLOW_GLAND), glowLamp: spriteCanvas(GLOW_LAMP), locket: spriteCanvas(LOCKET, null, { ...PAL, ...LOCKET_COLOURS }), warden: spriteCanvas(WARDEN), campfire: spriteCanvas(CAMPFIRE), campfireEmbers: spriteCanvas(CAMPFIRE_EMBERS), campfireAshes: spriteCanvas(CAMPFIRE_ASHES), bagCampfire: spriteCanvas(CAMPFIRE_ASHES), lamppost: spriteCanvas(LAMPPOST), bunny: spriteCanvas(BUNNY), bunnyFur: spriteCanvas(BUNNY_FUR), skulkerCrab: spriteCanvas(SKULKER_CRAB), crabShell: spriteCanvas(CRAB_SHELL), rimLurker: spriteCanvas(RIM_LURKER), lurkerClaw: spriteCanvas(LURKER_CLAW), glowDraught: spriteCanvas(GLOW_DRAUGHT), slowburn: spriteCanvas(SLOWBURN), mendingDraught: spriteCanvas(MENDING_DRAUGHT), wardDraught: spriteCanvas(WARD_DRAUGHT, null, { ...PAL, ...WARD_COLOURS }), spitproofDraught: spriteCanvas(SPITPROOF_DRAUGHT, null, { ...PAL, ...SPITPROOF_COLOURS }), shadeDraught: spriteCanvas(SHADE_DRAUGHT, null, { ...PAL, ...SHADE_COLOURS }) }; // keyed by registry id
// § camp: the miners' camp whole, 48 × 32, with the Stone Pick leaning on its crate and bare (D-770)
function campCanvas(withPick) {
  const cv = document.createElement('canvas');
  cv.width = 48; cv.height = 32;
  return keep(cv, () => {
    const c = cv.getContext('2d');
    c.clearRect(0, 0, 48, 32);
    CAMP.rows.forEach((r, y) => [...r].forEach((ch, x) => { if (PAL[ch]) { c.fillStyle = PAL[ch]; c.fillRect(x, y, 1, 1); } }));
    if (withPick) c.drawImage(SPRITES.pick, ...CAMP_PICK);
  }, [15, 1]);
}
export const CAMPS = { minersCamp: campCanvas(true), minersCampBare: campCanvas(false) };
const DEFS = { duskstar: DUSKSTAR, oilcap: OILCAP, heartcap: HEARTCAP, snapcap: SNAPCAP };
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
const MOUND = spriteCanvas(MOLE_MOUND); // the mole under the earth (D-726)
const PILE = spriteCanvas(BONE_PILE); // a bone rat fallen into its pile of bones (D-731)
const FLASHES = { rat: spriteCanvas(RAT, '#ffffff'), gloamling: spriteCanvas(GLOAMLING, '#ffffff'), lampmoth: spriteCanvas(LAMPMOTH, '#ffffff'), flaskMimic: spriteCanvas(FLASK_MIMIC, '#ffffff'), scorpion: spriteCanvas(SCORPION, '#ffffff'), caveSpider: spriteCanvas(CAVE_SPIDER, '#ffffff'), bat: spriteCanvas(BAT, '#ffffff'), mole: spriteCanvas(MOLE, '#ffffff'), snapcap: spriteCanvas(SNAPCAP, '#ffffff'), herbMimic: spriteCanvas(HERB_MIMIC, '#ffffff'), boneRat: spriteCanvas(BONE_RAT, '#ffffff'), oilTick: spriteCanvas(OIL_TICK, '#ffffff'), lureWisp: spriteCanvas(LURE_WISP, '#ffffff'), centipede: spriteCanvas(CENTIPEDE, '#ffffff'), spitGrub: spriteCanvas(SPIT_GRUB, '#ffffff'), warden: spriteCanvas(WARDEN, '#ffffff'), bunny: spriteCanvas(BUNNY, '#ffffff'), skulkerCrab: spriteCanvas(SKULKER_CRAB, '#ffffff'), rimLurker: spriteCanvas(RIM_LURKER, '#ffffff') };
// § sleeping (D-692): a creature that `sleeps` as itself, not in disguise, drawn asleep with its
// eyes dull: the warden's violet eye slit in its rock's darkest grey
const SLEEPING = { warden: spriteCanvas(WARDEN, null, { ...PAL, P: PAL.D }) };
// § raised (D-885): a creature with its own look while raised to strike, the warden's fists up;
// a scorpion's raised tail is its own sprite, trembling. Facing left, mirrored (RAISED_LEFT, below)
const RAISED = { warden: spriteCanvas(WARDEN_RAISED) };
// § facing left: an enemy's sprite mirrored, for one that walked left (D-158)
function mirrored(cv) {
  const out = document.createElement('canvas');
  out.width = out.height = 16;
  return keep(out, () => {
    const c = out.getContext('2d');
    c.save(); c.scale(-1, 1); c.drawImage(cv, -16, 0); c.restore();
  });
}
const LEFT = {}, LEFT_FLASHES = {};
for (const id of Object.keys(FLASHES)) { LEFT[id] = mirrored(SPRITES[id]); LEFT_FLASHES[id] = mirrored(FLASHES[id]); }
const RAISED_LEFT = Object.fromEntries(Object.entries(RAISED).map(([id, cv]) => [id, mirrored(cv)]));
// § colours: a creature in its colour set, facing right and left (D-373); the first is its SPRITES one
const COLOURS = { scorpion: SCORPION_COLOURS.map((set) => spriteCanvas(SCORPION, null, { ...PAL, ...set })) };
const COLOURS_LEFT = Object.fromEntries(Object.entries(COLOURS).map(([id, all]) => [id, all.map(mirrored)]));
const dressedIn = (e, left) => (left ? COLOURS_LEFT : COLOURS)[e.id]?.[e.colour] ?? (left ? LEFT : SPRITES)[e.id];
// § looks: the hero in a cloak, eyes, trim, clothes (P3 to P6), lamp (D-702) and head (D-703), its four cloak shades, its eye
// colour and the lantern's cap and base swapped, its rows dressed; the outline and the flame stay.
// Each is made once, the first time it is worn or shown. The profile in play's is worn wherever
// the hero is drawn, and its bitten flash keeps the clothes', the lamp's and the head's shape.
const HEROES = {}, BITTEN = {};
export function heroIn(cloak, eyes, trim, clothes = DEFAULT_CLOTHES, lamp = DEFAULT_LAMP, head = DEFAULT_HEAD) {
  const key = `${cloak}/${eyes}/${trim}/${clothes}/${lamp}/${head}`;
  if (!HEROES[key]) {
    const [C, c, B, b] = (CLOAKS[cloak] ?? CLOAKS.teal).shades, e = (EYES[eyes] ?? EYES.bone).colour, [T, t] = (TRIMS[trim] ?? TRIMS.brass).shades;
    const def = dressed(clothes, lamp, head), pattern = CLOAKS[cloak]?.pattern ? (cv) => markPattern(cv, def, CLOAKS[cloak]) : null;
    HEROES[key] = spriteCanvas(def, null, { ...PAL, C, c, B, b, e, T, t }, pattern);
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
  // the second three (D-700), as in their mock-up
  tiger: (x, y) => ((y % 4 === 1 && Math.abs(x - 7.5) > 1.5) || (y % 4 === 2 && Math.abs(x - 7.5) > 3.5) ? 1 : 0), // stripes reaching in from both sides
  stars: (x, y) => { const n = patHash(x + 11, y + 5); return n < 0.1 ? 1 : n < 0.16 ? 2 : 0; }, // a scatter of single specks
  moth: (x, y) => { for (const cx of [5, 10]) { const dx = x - cx, dy = y - 10; if (!dx && !dy) return 2; if (dx * dx + dy * dy <= 2) return 1; } return 0; }, // two eyespots, a pale middle in each
};
function markPattern(cv, def, cloak) {
  const c = cv.getContext('2d'), mask = MASKS[cloak.pattern];
  build(def.rows, def.mirror).forEach((r, y) => [...r].forEach((ch, x) => {
    const m = ch in SIDE ? mask(x, y) : 0;
    if (!m) return;
    c.fillStyle = (m === 2 && cloak.second ? cloak.second : cloak.marks)[SIDE[ch]]; c.fillRect(x, y, 1, 1);
  }));
}
const bittenIn = (clothes, lamp = DEFAULT_LAMP, head = DEFAULT_HEAD) => (BITTEN[`${clothes}/${lamp}/${head}`] ??= spriteCanvas(dressed(clothes, lamp, head), PAL.p));
let worn = SPRITES.hero, wornBitten = bittenIn(DEFAULT_CLOTHES);
export function wearLook(cloak, eyes, trim, clothes, lamp, head) { worn = heroIn(cloak, eyes, trim, clothes, lamp, head); wornBitten = bittenIn(clothes, lamp, head); }

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
// A mushroom is drawn in its own tone (D-305); a flower in its own, and mirrored when it `flip`s (D-763).
export function drawItems(c, items, t, still) {
  for (const it of items) {
    const x = it.x * 16, y = it.y * 16;
    const bob = still ? 0 : Math.floor(t / 700 + it.y) % 2;
    drawShadow(c, x, y, 8);
    if (get(it.id)?.relic) continue; // a relic is drawn over the light, drawRelics (D-692)
    if (it.flip) { c.save(); c.translate(x * 2 + 16, 0); c.scale(-1, 1); } // facing the other way (D-763)
    c.drawImage(spriteOf(it), x, y - 2 - bob);
    if (it.flip) c.restore();
  }
}

// § enemies: on a shadow, standing still with no bob, each sprite moved down so its lowest pixel
// rests just above its shadow, as the rat's feet do; one that `flies` held a fixed FLY_LIFT
// higher (D-563). Asleep or shut, it bobs as the find it copies does (D-368, D-543); one that
// `sleeps` as itself stands still in its sleeping look (D-692).
// `hits`: the enemies flashing white just now, the spear's two at most (D-105, D-479). A hit that
// killed it still flashes it once, then it is gone (D-113).
// `at`: (enemy) → the tile it is shown on, part way along while it slides (D-128).
// One that walked left is drawn mirrored (D-158).
// A creature's sprite, facing the way it faces, for its plaque (D-357)
export const faceOf = (e) => dressedIn(e, e.facing === 'left');
// `hero`: where the hero stands; a snapcap is drawn shut, as the find it is `shutAs`, unless
// the hero stands beside it, four ways, where it can bite (D-543).
export function drawEnemies(c, enemies, t, still, hits = [], at = (e) => e, hero = null) {
  const struck = (e) => hits.some((h) => e.x === h.x && e.y === h.y);
  for (const e of enemies) drawEnemy(c, e, at(e), t, still, struck(e), hero);
  for (const h of hits) if (!enemies.some((e) => e.x === h.x && e.y === h.y)) drawEnemy(c, h, h, t, still, true, hero);
}
const beside = (e, hero) => !!hero && Math.abs(e.x - hero.x) + Math.abs(e.y - hero.y) === 1;
export function drawEnemy(c, e, p, t, still, flash, hero) {
  const x = Math.round(p.x * 16), y = Math.round(p.y * 16);
  if (e.asleep && !flash && !SLEEPING[e.id]) return drawItems(c, [{ id: get(e.id).looksLike, x: p.x, y: p.y }], t, still); // asleep, just like the find it copies (D-368)
  const shutAs = get(e.id)?.shutAs;
  if (shutAs && !flash && !beside(e, hero)) return drawItems(c, [{ id: shutAs, tone: e.tone, x: p.x, y: p.y }], t, still); // shut, a heartcap in its tone (D-543)
  if (e.under) return c.drawImage(MOUND, x, y - 2 + 15 - lowest(MOUND)); // under the earth, its mound (D-726)
  if (e.pile && !flash) return c.drawImage(PILE, x, y - 2 + 15 - lowest(PILE)); // a pile of bones, flat on the floor; a hit's flash shows the rat (D-731)
  drawShadow(c, x, y, 8);
  if (get(e.id)?.glows && !glowing) return; // one that glows is drawn over the light, drawGlows (D-649)
  const left = e.facing === 'left';
  const sprite = flash ? (left ? LEFT_FLASHES : FLASHES)[e.id] : e.asleep ? SLEEPING[e.id] : e.raised && RAISED[e.id] ? (left ? RAISED_LEFT : RAISED)[e.id] : e.tone ? spriteOf(e) : dressedIn(e, left); // a statue asleep (D-692), fists up (D-885)
  const shake = e.raised && !still ? (Math.floor(t / 90) % 2 ? 1 : -1) : 0; // a raised tail trembles (D-729), a warden's fists too (D-885)
  c.drawImage(sprite, x + shake, y - 2 + 15 - lowest(sprite) - (get(e.id)?.flies ? FLY_LIFT : 0));
}
const FLY_LIFT = 2; // pixels a flyer is held above its shadow (D-563)
// § glows (D-649): a creature with its own faint glow, the lure wisp, drawn after the light so it
// shows even out in the dark, though it lights no tiles: a thin dithered halo of the cold blues,
// slowly pulsing (steady with reduced motion), over the dark only ('lighten'), then its sprite
let glowing = false; // true while drawGlows draws
const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const HALO = { reach: 9, inner: 'rgb(54,61,110)', outer: 'rgb(35,41,86)', dy: 5 }; // #5a66b8 and #3a4590 at 60%
// the spit grub's own halo, low round its body: venom's pale green and the moss green at 60% (D-688)
const HALOS = { spitGrub: { reach: 8, inner: 'rgb(109,134,73)', outer: 'rgb(67,106,47)', dy: 11 } };
export function drawGlows(c, enemies, t, still, hits = [], at = (e) => e) {
  const glows = (e) => get(e.id)?.glows;
  const struck = (e) => hits.some((h) => e.x === h.x && e.y === h.y);
  const all = [...enemies.filter(glows).map((e) => [e, at(e), struck(e)]),
    ...hits.filter((h) => glows(h) && !enemies.some((e) => e.x === h.x && e.y === h.y)).map((h) => [h, h, true])];
  if (!all.length) return;
  const pulse = still ? 1 : 0.85 + 0.15 * Math.sin(t / 1000 * 2.2);
  glowing = true;
  for (const [e, p, flash] of all) {
    const halo = HALOS[e.id] ?? HALO, gx = Math.round(p.x * 16) + 8, gy = Math.round(p.y * 16) + halo.dy;
    c.save(); c.globalCompositeOperation = 'lighten';
    for (let y = -halo.reach; y <= halo.reach; y++) for (let x = -halo.reach; x <= halo.reach; x++) {
      const d = Math.hypot(x, y); if (d > halo.reach) continue;
      const f = (1 - d / halo.reach) * pulse;
      if (f * 3 < (BAYER[(gy + y) & 3][(gx + x) & 3] + 1) / 16 + 0.55) continue;
      c.fillStyle = f > 0.5 ? halo.inner : halo.outer; c.fillRect(gx + x, gy + y, 1, 1);
    }
    c.restore();
    drawEnemy(c, e, p, t, still, flash, null);
  }
  glowing = false;
}
// § relics (D-692): a relic's own glow, drawn after the light the lure wisp's way, so it shows
// even out in the dark though it lights no tiles: a wider dithered halo of violet that swells and
// fades over 4 seconds, and a single glint sliding along the locket's top edge once every 5
// seconds; steady and without the glint with reduced motion. Then its sprite, bobbing as finds do.
// Centred on the locket's case, 21 pixels across and a little dimmer (D-717, look A; was 31, centred low)
const RELIC_HALO = { reach: 10, inner: 'rgb(78,64,112)', outer: 'rgb(46,37,78)', dx: 9, dy: 7, cut: 0.25 }; // the mock-up's violet, dimmed
const GLINT = '#fffbe8';
export function drawRelics(c, items, t, still) {
  const relics = items.filter((it) => get(it.id)?.relic);
  if (!relics.length) return;
  const pulse = still ? 0.92 : 0.8 + 0.2 * Math.sin(t / 1000 * (2 * Math.PI / 4));
  for (const it of relics) {
    const x = it.x * 16, y = it.y * 16, bob = still ? 0 : Math.floor(t / 700 + it.y) % 2;
    halo(c, x + RELIC_HALO.dx, y + RELIC_HALO.dy - bob, RELIC_HALO, pulse);
    c.drawImage(spriteOf(it), x, y - 2 - bob);
    const phase = ((t / 1000 + it.x * 0.7 + it.y * 1.3) % 5) / 0.9; // each relic's glint at its own time
    if (!still && phase < 1) {
      const [gx, gy] = LOCKET_GLINT[Math.min(LOCKET_GLINT.length - 1, Math.floor(phase * LOCKET_GLINT.length))];
      c.fillStyle = GLINT; c.fillRect(x + gx, y - 2 - bob + gy, 1, 1);
    }
  }
}
// § relics on the shelf (D-693): a shelf holding a relic glows the relics' way, its halo round
// the small locket on its top shelf, then the locket's pixels again over the dark so it shows
// at night, with its glint; the shelf itself stays as the light leaves it. No bob: it rests.
export function drawShelfRelics(c, room, t, still) {
  const mark = get('locketShelf').letter, pulse = still ? 0.92 : 0.8 + 0.2 * Math.sin(t / 1000 * (2 * Math.PI / 4));
  room.map.forEach((row, ty) => { for (let tx = row.indexOf(mark); tx >= 0; tx = row.indexOf(mark, tx + 1)) {
    const x = tx * 16, y = ty * 16;
    halo(c, x + 8, y + 5, RELIC_HALO, pulse);
    for (const ry in LOCKET_ON_SHELF) for (const rx in LOCKET_ON_SHELF[ry]) { c.fillStyle = LOCKET_SHELF_COLOURS[LOCKET_ON_SHELF[ry][rx]]; c.fillRect(x + +rx, y + +ry, 1, 1); }
    const phase = ((t / 1000 + tx * 0.7 + ty * 1.3) % 5) / 0.9;
    if (!still && phase < 1) { const [gx, gy] = LOCKET_SHELF_GLINT[Math.min(LOCKET_SHELF_GLINT.length - 1, Math.floor(phase * LOCKET_SHELF_GLINT.length))]; c.fillStyle = GLINT; c.fillRect(x + gx, y + gy, 1, 1); }
  } });
}
// a dithered round halo at (gx, gy), its colours over the dark only ('lighten'); `cut` thins its edge
function halo(c, gx, gy, { reach, inner, outer, cut }, pulse) {
  c.save(); c.globalCompositeOperation = 'lighten';
  for (let y = -reach; y <= reach; y++) for (let x = -reach; x <= reach; x++) {
    const d = Math.hypot(x, y); if (d > reach) continue;
    const f = (1 - d / reach) * pulse;
    if (f * 3 < (BAYER[(gy + y) & 3][(gx + x) & 3] + 1) / 16 + cut) continue;
    c.fillStyle = f > 0.5 ? inner : outer; c.fillRect(gx + x, gy + y, 1, 1);
  }
  c.restore();
}
// § globs (D-688): a Spit grub's glob in flight, drawn over the dark as a glow is: a ring of the
// grub's green halo, then a small ball of venom green with a bright core, outlined, a pixel above
// the tile's middle; the halo pulses with the glows, steady with reduced motion
const GLOB = ['.kkkk.', 'kJJVVk', 'kJVVVk', 'kVVVGk', 'kVVGGk', '.kkkk.'];
let globSprite = null;
export function drawGlobs(c, globs, t, still) {
  if (!globs?.length) return;
  if (!globSprite) globSprite = spriteCanvas({ mirror: false, rows: GLOB.map((r) => r.padEnd(16, '.')) });
  const halo = HALOS.spitGrub, pulse = still ? 1 : 0.85 + 0.15 * Math.sin(t / 1000 * 2.2);
  for (const g of globs) {
    const gx = g.x * 16 + 8, gy = g.y * 16 + 7;
    c.save(); c.globalCompositeOperation = 'lighten';
    for (let y = -6; y <= 6; y++) for (let x = -6; x <= 6; x++) {
      const d = Math.hypot(x, y); if (d > 6) continue;
      const f = (1 - d / 6) * pulse;
      if (f * 3 < (BAYER[(gy + y) & 3][(gx + x) & 3] + 1) / 16 + 0.55) continue;
      c.fillStyle = f > 0.5 ? halo.inner : halo.outer; c.fillRect(gx + x, gy + y, 1, 1);
    }
    c.restore();
    c.drawImage(globSprite, gx - 3, gy - 3);
  }
}
// the lowest row with a pixel in it, read once per sprite
const LOWEST = new WeakMap();
function lowest(sprite) {
  if (!LOWEST.has(sprite)) {
    const d = sprite.getContext('2d').getImageData(0, 0, 16, 16).data;
    let row = 15;
    while (row > 0 && !Array.from({ length: 16 }, (_, x) => d[(row * 16 + x) * 4 + 3]).some(Boolean)) row--;
    LOWEST.set(sprite, row);
  }
  return LOWEST.get(sprite);
}
