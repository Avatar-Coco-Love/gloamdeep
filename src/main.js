// § boot: set up the screen, the room and the hero. The screens are in
// input/screens.js and the drawing in render/frame.js (D-235); `app` holds
// what the three share.
import { VERSION } from './core/version.js';
import { makeWorld, step, wait, pour, craft, makeAt, eat, hold, behind, setDown, takeDown, panelBeside, look, pourByItself, switchLantern, followDaylight, toward, DIRS, maxHealth, startOver } from './core/turn.js';
import { resetRoom } from './core/spawn.js';
import { enemyAt, biteSound } from './core/enemies.js';
import { eventsSince, has } from './core/events.js';
import { goToDepth, goToPlace } from './core/stairs.js';
import { beginPlace, depthOf } from './core/room.js';
import { SEED_MAX } from './core/rng.js';
import { createScreen, TILE } from './render/screen.js';
import { reach, setOil } from './core/oil.js';
import { createTextLine } from './render/textline.js';
import { say } from './core/lines.js';
import { loadSettings, swipesWalk, tapsWalk, tapsStep, stillMotion } from './core/settings.js';
import { deeper, counted } from './core/record.js';
import { loadProfiles, saveProfiles, playing, withRecords, withPlayed, usingSlot, withoutSlot, renamedSlot, lookedSlot } from './core/profile.js';
import { fit } from './core/parts.js';
import { wear } from './core/worn.js';
import { loadJourney, saveJourney, dropJourney } from './core/save.js';
import { moveStack } from './core/chest.js';
import { buyerAt, sell, buy } from './core/trade.js';
import { easeMode } from './core/menu.js';
import { remember, rememberAll, forget } from './core/fog.js';
import { inDaylight, passTime } from './core/daytime.js';
import { lanternFrom } from './core/sight.js';
import { mouthLight } from './core/mouth.js';
import { wayTo, stopsWalk } from './core/walk.js';
import { offEdge } from './core/openings.js';
import { createInput } from './input/input.js';
import { createLanternButton } from './input/lantern.js';
import { createPauseButton } from './input/pause.js';
import { createMapButton } from './input/mapbutton.js';
import { createBagButton } from './input/bagbutton.js';
import { createQuickSlot } from './input/quickslot.js';
import { createArrowPad } from './input/arrowpad.js';
import { firstFlask } from './core/bag.js';
import { createMapMoves } from './input/mapview.js';
import { createScreens } from './input/screens.js';
import { createUpright, goSideways } from './input/upright.js';
import { createFrame, FADE_MS } from './render/frame.js';
import { createSound } from './render/sound.js';
import { createDev } from './dev/dev.js';
import { addAppCard } from './render/appicon.js';

const canvas = document.getElementById('game'), list = document.getElementById('list'), roomCanvas = document.getElementById('room'), hudCanvas = document.getElementById('hud');
const { ctx, listCtx, roomCtx, hudCtx } = createScreen(canvas, list, roomCanvas, hudCanvas);
// A point on the menus' picture, in its pixels → the same point on a canvas filling the screen: the room's (D-381),
// or the screen layer's over it, with the panel, plaques and cards (D-444)
const onCanvas = (to) => ([px, py]) => {
  const a = canvas.getBoundingClientRect(), b = to.getBoundingClientRect(), k = to.width / b.width;
  return [(a.left + px / canvas.width * a.width - b.left) * k, (a.top + py / canvas.height * a.height - b.top) * k];
};
const toRoom = onCanvas(roomCanvas), toLayer = onCanvas(hudCanvas);
document.getElementById('version').textContent = VERSION;
addAppCard(); // so a phone can put the game on its home screen (D-375)

// The only Math.random: a new seed for each journey (D-148, D-187), unless a
// seed is typed in Settings (D-191). journeySeed: the one this journey began on.
const randomSeed = () => Math.floor(Math.random() * SEED_MAX) + 1; // the Seed Explorer's Reseed too (D-214)
const app = {
  settings: loadSettings(), // kept on this device (D-189)
  journeySeed: 0, state: null,
  // Who plays: the profiles on this device (D-268), the one in use picked on the slot screen (D-271)
  profiles: loadProfiles(),
  jumped: false, // a dev jump stops this journey counting towards the deepest depth (D-232)
  // screen: 'slots', 'name', 'cloak', 'eyes', 'trim', 'clothes', 'drop', 'title', 'play', 'paused', 'settings', 'seed', 'howto', 'map', 'bag', 'place' (setting the workbench down, WB2), 'bench' (its panel, WB3), 'chest' (the stash chest's, CH3), 'trade' (the peddler's card, D-494), 'bed' (the bed's ask by day, D-488), 'explore', 'history' or 'journal'
  screen: 'slots', chosen: 0,
  picking: null, dropping: 0, slotsBack: false, // the slot screen: Rename or Delete picked (D-273), the slot asked about, Back shown (D-271)
  pageFrom: 'title', // the menu Settings or How to play was opened from
  page: 'touch', // How to play's page
  tab: 'records', // the Journal's open tab: Records or Growth (D-293)
  entry: '', // the digits typed on the seed pad, or the letters on the name pad
  naming: 0, renaming: false, // the slot the name pad names: an empty one (D-272), or a profile renamed (D-273)
  padFrom: 'settings', // the screen the seed pad was opened from: Settings or the Explorer
  seeds: [], // the seeds the Explorer has shown this visit, the last one on screen
  plan: null, view: null, floors: [], // the map shown, its view, and the floors it turns to
  spokenLine: null,
  cam: { x: 0, y: 0 }, // the room pixel at the screen's top-left (src/core/camera.js)
  bench: null, // the tile of the workbench or stash chest whose panel is open (WB3, D-323; CH3)
  framed: null, // the shown spot (foeAt) of the creature whose plaque was tapped (CL2, D-357)
  opened: new Set(), rows: [], scroll: 0, // Version history: the versions open, its rows, and how far it is scrolled (D-254)
};
const newWorld = (mode) => {
  app.journeySeed = app.settings.seed || randomSeed();
  return makeWorld('first', app.journeySeed, mode);
};
// The profile's saved journey comes back as it was, ready for Continue (D-238); with none
// in use, or none saved, a new world waits unsaved
function loadInto(slot) {
  const kept = slot === null ? null : loadJourney(slot);
  app.saved = !!kept;
  if (kept) { app.state = kept.state; app.jumped = kept.jumped; app.journeySeed = kept.state.seed; }
  else { app.state = newWorld(); app.jumped = false; }
}
loadInto(app.profiles.current);
const sound = createSound(() => app.settings.sound === 'on'); // D-255
// Saved after every turn, or any change, once the journey has begun (D-238)
// A save that fails says so once, until one is kept again (D-428)
let savedState = app.state, unsaved = false;
function keepJourney() {
  if (app.state === savedState) return;
  const kept = saveJourney(app.state, app.jumped, app.profiles.current);
  if (!kept && !unsaved) app.state = say(app.state, 'unsaved');
  unsaved = !kept; savedState = app.state; app.saved = true;
}
function keepRecords(events) {
  // The profile's Records (D-021, D-232, D-268, D-270): the deepest depth walked to,
  // and the creatures beaten, falls, rooms found, steps, flasks poured and torches lit that this action's events bring
  const was = playing(app.profiles).records, d = deeper(was.deepest, depthOf(app.state.place), app.jumped);
  let records = counted(was, events, app.jumped);
  if (d !== records.deepest) records = { ...records, deepest: d };
  if (records !== was) { app.profiles = withRecords(app.profiles, records); saveProfiles(app.profiles); }
}
// § play time (D-290): the time on the play screen counts, kept in whole seconds every 10 and when
// the page is hidden; a long gap between frames (the page hidden, the phone locked) counts as one frame
let playedMs = 0, lastFrame = null;
const MAX_FRAME_MS = 250, KEEP_EVERY_MS = 10000;
function keepPlayed(t, force = false) {
  const dt = lastFrame === null ? 0 : Math.min(t - lastFrame, MAX_FRAME_MS);
  lastFrame = t;
  if (app.profiles.current === null) { playedMs = 0; return; }
  if (app.screen === 'play') playedMs += dt;
  if (playedMs < 1000 || (!force && playedMs < KEEP_EVERY_MS && app.screen === 'play')) return;
  const seconds = Math.floor(playedMs / 1000);
  playedMs -= seconds * 1000;
  app.profiles = withPlayed(app.profiles, seconds); saveProfiles(app.profiles);
}
document.addEventListener('visibilitychange', () => { if (document.hidden) { keepPlayed(performance.now(), true); lastFrame = null; } });
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
// Motion follows the device until the Motion switch is picked (D-190)
const still = () => stillMotion(app.settings.motion, reduceMotion.matches);

const textLine = createTextLine();
const spoken = document.getElementById('line'); // the same words for screen readers

// § moving: the hero slides to its new tile (D-043); one step or wait waits in line
// so a quick second tap or key is not lost. The slide goes by time, not by frame,
// so a slow device walks as fast as a quick one (D-294).
const SLIDE = 0.18 * 60 / 1000; // tiles per millisecond: the study's 0.18 a frame, at 60 frames a second
const MAX_SLIDE_MS = 100; // a longer gap between frames (a hidden page) slides as this much
const HOLD_STEP_MS = 250; // a walk goes about 4 steps a second, the held pace (D-044, Q-067)
let lastHeldStep = 0;
Object.assign(app, {
  shown: { x: app.state.hero.x, y: app.state.hero.y },
  queued: null, nudge: null, // nudge: { dx, dy, until } after bumping a wall
  // The walk to a tapped tile (D-406, D-408): its tile and the way still to go there, until it ends or stops
  walk: null, // { tx, ty, way }
  padDir: null, // the arrow pad's quarter held, which keeps walking (D-406)
  hold: null, // [picX, picY] a finger held with Tap on Step, which keeps stepping toward it (D-449)
  alertUntil: 0, // the "!" over the hero after a stop
  gain: null, // { n, at } the "+1" over the hero when experience is earned (D-245)
  hit: null, // { enemy, until, shakeUntil } after attacking an enemy (D-105, D-109)
  jab: null, // { dx, dy, start } after a hit with a weapon held (D-253)
  bitten: null, // { until, shakeUntil } after a bite: the hero flashes red (D-118)
  travel: null, // { from, mid, end } while taking stairs: the old room fades out, the new one in (D-135)
  fall: null, // { from, lieAt, darkAt, mid, end, ends } after a fall, until the hero wakes (D-234); `ends` after a Hardcore one (D-344)
});
const ALERT_MS = 900;
const HIT_FLASH_MS = 140, SHAKE_MS = 120; // the study's (study line 470)
// A fall (D-234): the hero lies down, the light closes to the deepest dark over about a
// second, stays dark a moment, then opens on the start. With reduced motion, only the dark.
const FALL = { lie: 120, dark: 1000, wake: 1300, end: 1800 }, FALL_STILL_MS = 800;
const settled = () => !app.travel && !app.fall && app.shown.x === app.state.hero.x && app.shown.y === app.state.hero.y;
const flashFor = () => { const now = performance.now(); return { until: now + HIT_FLASH_MS, shakeUntil: now + SHAKE_MS }; };
const snap = (to) => { app.shown.x = to.x; app.shown.y = to.y; };

function tryStep(dir) {
  if (app.fall) return; // nothing is taken while the hero lies fallen
  if (!settled()) { app.queued = dir; return; }
  const before = app.state;
  let to = before.hero;
  if (dir === 'wait') app.state = wait(app.state); // standing still, one turn (D-084)
  else if (dir.pour !== undefined) app.state = pour(app.state, dir.pour); // a flask from the bag, one turn (D-247)
  else if (dir.craft !== undefined) app.state = craft(app.state, dir.craft); // a flask from 3 oilcaps, one turn (D-299)
  else if (dir.eat !== undefined) app.state = eat(app.state, dir.eat); // a heartcap or potion from the bag, one turn (D-308, D-309)
  else if (dir.hold !== undefined) app.state = hold(app.state, dir.hold); // a weapon from the bag into the hand, one turn (D-479)
  else if (dir.make !== undefined) app.state = makeAt(app.state, dir.make); // a thing made at the workbench, one turn, its panel kept open (CH1, D-326)
  else if (dir.set !== undefined) app.state = setDown(app.state, dir.set, dir.side); // the workbench beside the hero, one turn (WB2, D-322)
  else if (dir.take !== undefined) app.state = takeDown(app.state, dir.take.x, dir.take.y); // the bench or an empty stash chest back into the bag, one turn (WB3, D-323; CH5)
  else if (buyerAt(before, before.hero.x + DIRS[dir][0], before.hero.y + DIRS[dir][1])) { app.state = step(app.state, dir); screens.openTrade(); return; } // bumping the peddler at home: his line and his card, free (D-494)
  else if (panelBeside(before, dir)) { screens.openPanel(panelBeside(before, dir)); return; } // bumping the bench or a stash chest opens its panel, free (WB3, CH3)
  else {
    const next = step(app.state, dir);
    const [dx, dy] = DIRS[dir], foe = enemyAt(app.state, app.state.hero.x + dx, app.state.hero.y + dy);
    to = { x: before.hero.x + dx, y: before.hero.y + dy };
    if (foe && !foe.asleep) app.hit = { enemies: [foe, behind(app.state, foe)].filter(Boolean), ...flashFor() }; // a bump that wakes one asleep doesn't flash (D-368); the spear's one behind does (D-479)
    if (foe && !foe.asleep && before.held) app.jab = { dx, dy, start: performance.now() }; // the knife's stab (D-253)
    else if (next.turn === app.state.turn || foe?.asleep) nudgeToward(dir); // a bump, or a torch the dark lantern can't light (D-122)
    app.state = next;
  }
  app.state = byItself(before, app.state);
  if (app.settings.flasks === 'self') app.state = pourByItself(before, app.state);
  const { state } = app, fell = state.fell !== before.fell;
  if (fell || state.health < before.health) app.bitten = flashFor();
  const events = eventsSince(before, state);
  hear(events);
  keepRecords(events);
  if (fell) fallDown(state.fell);
  const went = !fell && state.place !== before.place;
  if (went && !still()) { // the hero walks onto the stairs as the old room fades (D-135)
    const now = performance.now();
    app.travel = { from: { ...before, hero: to }, mid: now + FADE_MS, end: now + 2 * FADE_MS };
  } else if (went || (still() && !fell)) { snap(state.hero); if (went) foeShown = new Map(); }
  else if (!fell) followFoes(before.enemies, state.enemies);
  // Experience earned shows as it rises over the hero; after stairs, once the new room shows (D-245)
  if (state.xp > before.xp) app.gain = { n: state.xp - before.xp, at: app.travel?.mid ?? performance.now() };
}
// The fall is shown in the room where it happened, then the hero wakes at the start (D-234)
function fallDown(from) {
  const now = performance.now();
  app.hit = null; app.queued = null;
  if (app.walk) app.walk.stopped = true;
  if (still()) { snap(from.hero); app.fall = { from, lieAt: now, darkAt: now, mid: now + FALL_STILL_MS, end: now + FALL_STILL_MS }; }
  else app.fall = { from, lieAt: now + FALL.lie, darkAt: now + FALL.dark, mid: now + FALL.wake, end: now + FALL.end };
  // A Hardcore fall began the world again, saved at once; a dev jump no longer stops the Records (MO2, D-344)
  if (app.state.mode === 'hardcore') { app.fall.ends = true; app.jumped = false; }
}
// § start over (MO2, D-344): "Your journey ends." shows at the fall's deepest dark. Same world
// keeps the world begun again from the same seed; New world begins one from Settings' seed, or a
// random one. Then the light opens on the hero awake, at once with reduced motion.
function beginAgain(other) {
  if (other) { app.journeySeed = app.settings.seed || randomSeed(); app.state = startOver(app.journeySeed); }
  freshView();
  const now = performance.now();
  if (!still()) app.fall = { from: null, lieAt: now, darkAt: now, mid: now, end: now + FALL.end - FALL.wake };
}

// § enemies sliding: a rat slides to its new tile like the hero (D-128).
// `foeShown` holds where each enemy is drawn; one it doesn't know yet (a spawn,
// a reset, a fall) shows on its tile at once. A turn keeps the enemies in order,
// less any the hit killed, so the new list pairs with the old one by place.
// The creature list keeps each one's place in its row there too (frame.js, D-357).
let foeShown = new Map();
function followFoes(was, now) {
  const alive = now.length < was.length ? was.filter((e) => !app.hit?.enemies.includes(e)) : was;
  if (alive.length !== now.length) return;
  const next = new Map();
  now.forEach((e, i) => next.set(e, foeShown.get(alive[i]) || { x: alive[i].x, y: alive[i].y }));
  foeShown = next;
}
function foeAt(e) {
  let p = foeShown.get(e);
  if (!p) { p = { x: e.x, y: e.y }; foeShown.set(e, p); }
  else if (still()) { p.x = e.x; p.y = e.y; }
  return p;
}
function nudgeToward(dir) {
  const [dx, dy] = DIRS[dir];
  app.nudge = { dx, dy, until: performance.now() + 90 };
}
// § tap: a tap on the hero waits a turn (D-085); a tap on a tile beside them steps
// there, which bites, mines or opens as a step does; one further off walks there
// at once (D-406), or with Tap on Step steps once toward it, along the farther side (D-042, D-449).
// A tap while walking only stops it, and no turn passes. With Tap off, only the tap on
// the hero, a plaque or a bench beside works (D-408).
// A tap past the room's edge, where nothing can be walked, does nothing (D-424).
// held: the same from a finger held still, which walks anew instead of stopping (D-408),
// or on Step keeps stepping toward the finger (holdStep below)
// picX, picY: on the menus' picture, in its pixels
const stepToward = (picX, picY, held = false) => {
  const spot = frame.plaqueSpot(...toLayer([picX, picY])); // a plaque frames its creature, or lets it go; no turn passes (CL2)
  if (spot) { if (!held) app.framed = app.framed === spot ? null : spot; return; }
  if (app.walk && !held) { app.walk = null; return; }
  const h = app.state.hero, [tx, ty] = tileAt(picX, picY);
  if (dev.place(tx, ty)) return; // a picked spawn takes the tap (D-049)
  if (held && tapsStep(app.settings)) { app.hold = [picX, picY]; lastHeldStep = -Infinity; return; } // the first step at once
  if (offEdge(app.state.room, tx, ty)) return; // past the room's edge a tap does nothing (D-424)
  const dir = toward(h.x, h.y, tx, ty);
  if (!dir) { if (!held) tryStep('wait'); return; }
  // A click or tap on a bench or stash chest beside the hero opens its panel, whatever the switches (WB3, CH3)
  const bench = panelBeside(app.state, dir, true); // the bed too, which sleeps at night (D-488)
  if (bench && bench.x === tx && bench.y === ty) { if (!held) tryStep(dir); return; }
  if (tapsStep(app.settings)) { tryStep(dir); return; }
  if (!tapsWalk(app.settings)) return;
  if (Math.abs(tx - h.x) + Math.abs(ty - h.y) === 1) { app.walk = null; tryStep(dir); return; }
  app.walk = { tx, ty, way: wayTo(app.state, tx, ty) };
  lastHeldStep = -Infinity; // the first step at once
};
// The room's tile under a point on the menus' picture
function tileAt(picX, picY) {
  const [px, py] = toRoom([picX, picY]);
  return [Math.floor((px + app.cam.x) / TILE), Math.floor((py + app.cam.y) / TILE)];
}
// § hold to step (Tap: Step, D-449): a held finger steps the hero toward it at the held
// pace (D-044), along the farther side; sliding steers, and on its tile, or past the
// room's edge (D-424), the hero waits for it to move. Lifting stops at once.
function holdStep() {
  const h = app.state.hero, [tx, ty] = tileAt(...app.hold), dir = toward(h.x, h.y, tx, ty);
  if (dir && !offEdge(app.state.room, tx, ty)) tryStep(dir);
}
// § walk on: one step on the way to the walk's tile, at the held pace (D-044). It ends
// on the tile, at the end of remembered ground, or in another room; it stops by itself
// for a bite, a find or a creature, with a "!" (D-407, D-408, D-410, the Stop walking switch).
function walkOn() {
  const { walk } = app, before = app.state, [next] = walk.way = wayTo(before, walk.tx, walk.ty);
  if (!next) { app.walk = null; return; }
  tryStep(toward(before.hero.x, before.hero.y, next.x, next.y));
  const now = app.state;
  if (now === before || now.place !== before.place || (now.hero.x === walk.tx && now.hero.y === walk.ty)) app.walk = null;
  else if (stopsWalk(before, now, app.settings.stop)) { app.walk = null; app.alertUntil = performance.now() + ALERT_MS; }
  else walk.way = wayTo(now, walk.tx, walk.ty);
}

// § hear: the sounds of an action's events (events.js, D-267): the hit's (D-258), the
// lantern's tick (D-257), a bite a moment after the hit, when there was one (D-259),
// and a tile walked, unless the hero fell (D-255)
function hear(events) {
  const hit = events.find((e) => e.type === 'hit'), bite = biteSound(events);
  if (hit) sound.hit(!!hit.held);
  for (const e of events) if (e.type === 'lantern') sound.lantern(e.lit);
  if (bite) sound[bite](!!hit);
  if (has(events, 'step') && !has(events, 'fall')) sound.footstep();
}
// The lantern set to By itself follows the daylight as the hero comes and goes (D-210)
const byItself = (before, after) => (app.settings.lantern === 'self' ? followDaylight(before, after) : after);
// § switch: the lantern button and the L key, free at any time in play (D-080, D-081); it ticks (D-257)
const switchIt = () => { if (app.screen === 'play') { const before = app.state; app.state = switchLantern(before); hear(eventsSince(before, app.state)); } };
const lanternButton = createLanternButton(hudCanvas, { onSwitch: switchIt });
const pauseButton = createPauseButton(hudCanvas, { onPause: () => screens.pause() });
const mapButton = createMapButton(hudCanvas, { onMap: () => screens.toggleMap() });
const bagButton = createBagButton(hudCanvas, { onBag: () => screens.toggleBag() });
// § quick slot: pours the first flask in the bag, one turn, like the bag's Pour (D-384)
const quickSlot = createQuickSlot(hudCanvas, { onPour: () => { const i = firstFlask(app.state.bag); if (app.screen === 'play' && i >= 0) tryStep({ pour: i }); } });

// The hero and room shown afresh, with nothing moving, after the state is replaced
function freshView() {
  snap(app.state.hero);
  app.queued = app.nudge = app.hit = app.jab = app.bitten = app.travel = app.fall = app.gain = null; foeShown = new Map();
  frame.redraw(); rememberedAt = rememberedSeen = null;
}
// § arrow pad: a press ends a walk and steps at once, as a key does; held, it
// keeps stepping at the held pace (D-406), in update below
const arrowPad = createArrowPad(hudCanvas, { onPress: (dir) => {
  app.padDir = dir;
  if (dir && app.screen === 'play') { app.walk = null; tryStep(dir); lastHeldStep = performance.now(); }
} });
// § journey: New journey starts in a new world (D-187), in the way to play picked (D-334)
function newJourney(mode) {
  app.state = newWorld(mode); app.jumped = false;
  freshView();
  savedState = null; keepJourney(); // saved at once, so Continue is there before a first turn
}
// § slots (D-271): picking a slot plays as its profile, a new one in an empty slot, with its own journey;
// a new one takes the name typed on the name pad (D-272) and the cloak, eyes, trim and clothes chosen after it (P3 to P6)
function useSlot(i, name = '', look = {}) {
  app.profiles = usingSlot(app.profiles, i, name, look); saveProfiles(app.profiles);
  loadInto(i); savedState = app.state; freshView();
}
// Renaming a profile keeps all else, its journey too (D-273)
function renameSlot(i, name) { app.profiles = renamedSlot(app.profiles, i, name); saveProfiles(app.profiles); }
// A new look keeps all else too (P3)
function lookSlot(i, look) { app.profiles = lookedSlot(app.profiles, i, look); saveProfiles(app.profiles); }
// Deleting a profile drops its journey too; if it was in use, the next in use takes over
function dropSlot(i) {
  const was = app.profiles.current;
  app.profiles = withoutSlot(app.profiles, i); saveProfiles(app.profiles); dropJourney(i);
  if (app.profiles.current !== was) { loadInto(app.profiles.current); savedState = app.state; freshView(); }
}
const stage = document.getElementById('stage');
const screens = createScreens(app, {
  spoken, lanternButton, pauseButton, mapButton, bagButton, quickSlot, reduceMotion, newJourney, beginAgain, randomSeed, useSlot, renameSlot, lookSlot, dropSlot,
  pour: (slot) => tryStep({ pour: slot }), craft: (slot) => tryStep({ craft: slot }), eat: (slot) => tryStep({ eat: slot }), hold: (slot) => tryStep({ hold: slot }),
  setDown: (slot, side) => tryStep({ set: slot, side }), takeDown: (x, y) => tryStep({ take: { x, y } }), make: (id) => tryStep({ make: id }),
  lookAt: (slot) => { app.state = look(app.state, slot); }, // an oilcap's line, free (D-297)
  roomTile: (px, py) => tileAt(px, py), // the room's tile under a tap on the menus' picture (D-381)
  fit: (slot) => { app.state = fit(app.state, slot); }, // a lantern part into its slot, free (D-483)
  wear: (slot) => { app.state = wear(app.state, slot); }, // armour put on, free (D-484)
  ease: (mode) => { app.state = easeMode(app.state, mode); }, // the way to play made easier, saved with the journey (MO4, D-346)
  stash: (x, y, slot) => { app.state = moveStack(app.state, x, y, slot); }, // a stack into or out of a stash chest, free (CH4, D-331)
  sell: (slot) => { app.state = sell(app.state, slot); }, // one of a stack sold to the peddler, free (D-494)
  buy: (ware) => { app.state = buy(app.state, ware); }, // one of the peddler's wares bought, free (D-495)
  dev: () => dev, input: () => input, mapMoves: () => mapMoves, // made below
  goSideways,
});
// Held upright, play pauses behind the picture (D-377)
createUpright({ onUpright: () => { if (app.screen === 'play') screens.pause(); } });
// In play the Swipe switch can turn swipes off (D-189, D-408); off the room, the screens take them.
// A key or swipe in play ends a walk to a tapped tile and steps itself.
const onDir = (dir, how) => {
  if (app.screen !== 'play') screens.onDir(dir, how);
  else if (how !== 'swipe' || swipesWalk(app.settings)) { app.walk = null; tryStep(dir); }
};
const onPoint = (px, py, held) => {
  if (app.screen === 'play') stepToward(px, py, held); // held: from a finger held still (D-408)
  else if (!held) screens.onPoint(...(['map', 'explore', 'bag', 'bench', 'chest', 'trade', 'paused', 'settings', 'howto', 'journal', 'history', 'seed', 'mode', 'ways', 'slots', 'name', 'cloak', 'eyes', 'trim', 'clothes', 'sure', 'drop', 'easier', 'bed', 'title'].includes(app.screen) ? toLayer([px, py]) : [px, py])); // the cards and the title are on the screen layer (D-385, D-387 to D-391, D-393 to D-401, D-444)
};
const onWait = () => { if (app.screen === 'play') { app.walk = null; tryStep('wait'); } else if (!screens.onMapScreen()) screens.choose(); };
// Tab frames the first plaque, then the next, then none (CL2)
const onTab = () => {
  if (app.screen !== 'play') return false;
  const spots = frame.plaqueSpots(), i = spots.indexOf(app.framed);
  app.framed = spots[i + 1] || null;
  return spots.length > 0;
};
const onChoose = () => { if (app.screen !== 'play' && !screens.onMapScreen()) screens.choose(); };
const input = createInput(stage, canvas, {
  onDir, onPoint, onHold: (p) => { if (app.hold) app.hold = p; }, onLantern: switchIt, onWait, onChoose, onPause: screens.pause, onMap: screens.toggleMap, onBag: screens.toggleBag, onFloor: screens.turnMap, onType: screens.onType, onTab,
  guarded: (x, y) => app.screen === 'play' && arrowPad.guards(x, y), // the ring round the arrow pad (D-422)
});
const mapMoves = createMapMoves(stage, hudCanvas, { active: screens.onMapScreen, onPan: screens.panMap, onZoom: screens.zoomMap }); // in the room's pixels, as the map's card (D-395)
const dev = createDev(stage, roomCanvas, { // on for everyone (D-086)
  get: () => app.state,
  still,
  set: (s) => { // a new place shows at once, with no slide (Go to depth)
    const went = s.place !== app.state.place;
    app.state = byItself(app.state, s);
    hear(eventsSince(s, app.state)); // the lantern by itself ticks
    if (went) { snap(app.state.hero); foeShown = new Map(); }
  },
  reset: () => { // the room the hero is in, as it began
    const { state } = app, p = state.home.places[state.place] || beginPlace(state.place, state.seed);
    return resetRoom(state, p.room, p.start, p.lights, p.enemies, p.items, p.people);
  },
  forget: () => forget(app.state),
  setOil: (oil) => setOil(app.state, oil),
  heal: () => ({ ...app.state, health: maxHealth(app.state) }),
  passTime: (turns) => passTime(app.state, turns), // the clock only (D-217)
  goTo: (depth) => { app.jumped = true; return goToDepth(app.state, depth); }, // depth 0 is the crypt (D-212)
  goOutside: () => goToPlace(app.state, 'woods'), // the woods, on the surface too (D-209)
  settings: () => app.settings,
  camera: () => app.cam,
}, hudCanvas);
const frame = createFrame(app, { ctx, listCtx, roomCtx, hudCtx, canvas, textLine, spoken, lanternButton, pauseButton, mapButton, bagButton, arrowPad, quickSlot, dev, screens, still, foeAt });
screens.openSlots(false); // the game opens on the slot screen (D-271)

// § memory: once the hero stands still on a tile, the tiles their lantern
// reaches are remembered (D-059). Again after a dev change to the memory or oil,
// or when the lantern comes back on. Nothing new is remembered while it is off (D-082).
// Daylight shows the whole room, so all of it is remembered, lantern or not (D-209);
// at night under the sky the lantern remembers as below ground (D-217).
// Daylight through the cave mouth remembers what it reaches, lantern or not (D-218).
let rememberedAt = null, rememberedSeen = null, sunAt = null, sunSeen = null;
function rememberHere() {
  let { state } = app;
  if (inDaylight(state)) { app.state = rememberAll(state); return; }
  const sun = mouthLight(state), when = state.place + ',' + state.turn;
  if (sun && (when !== sunAt || state.seen !== sunSeen)) { state = app.state = remember(state, sun); sunAt = when; sunSeen = state.seen; }
  if (!state.lit) { rememberedAt = null; return; }
  const key = state.hero.x + ',' + state.hero.y + ',' + state.oil;
  if (key === rememberedAt && state.seen === rememberedSeen) return;
  app.state = remember(state, { ...lanternFrom(state.hero.x, state.hero.y), r: reach(state.oil) });
  rememberedAt = key; rememberedSeen = app.state.seen;
}

// § loop: move the shown hero and enemies toward the real ones, take a waiting step, then draw
function approach(from, to, dt) { return from + Math.sign(to - from) * Math.min(Math.abs(to - from), SLIDE * dt); }
let lastUpdate = null;
function update(t) {
  const { travel, fall, shown } = app;
  const dt = lastUpdate === null ? 0 : Math.min(t - lastUpdate, MAX_SLIDE_MS);
  lastUpdate = t;
  // § stairs: until the fade's middle the old room is shown, then the new one at once (D-135)
  if (travel && t >= travel.mid && travel.from) { travel.from = null; snap(app.state.hero); foeShown = new Map(); }
  if (travel && t >= travel.end) app.travel = null;
  // A fall shows where the hero fell until the dark is deepest, then where they wake (D-234)
  if (fall && t >= fall.mid && fall.from) { fall.from = null; snap(app.state.hero); foeShown = new Map(); if (fall.ends) { screens.endJourney(); return; } }
  if (fall && t >= fall.end) app.fall = null;
  const s = app.travel?.from || app.fall?.from || app.state;
  shown.x = approach(shown.x, s.hero.x, dt);
  shown.y = approach(shown.y, s.hero.y, dt);
  for (const e of s.enemies) { const p = foeAt(e); p.x = approach(p.x, e.x, dt); p.y = approach(p.y, e.y, dt); }
  if (app.screen !== 'play') app.walk = app.padDir = app.hold = null; // a card or menu ends a walk, the pad's and a hold's
  if (settled() && app.screen === 'play') { // paused, no turn is taken
    rememberHere();
    if (app.queued) { const d = app.queued; app.queued = null; tryStep(d); }
    else if (app.padDir && t - lastHeldStep >= HOLD_STEP_MS) { lastHeldStep = t; tryStep(app.padDir); }
    else if (app.walk && t - lastHeldStep >= HOLD_STEP_MS) { lastHeldStep = t; walkOn(); }
    else if (app.hold && t - lastHeldStep >= HOLD_STEP_MS) { lastHeldStep = t; holdStep(); }
  }
}
function loop(t) {
  if (!screens.onTitle()) update(t);
  keepJourney();
  keepPlayed(t);
  frame.draw(t);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
