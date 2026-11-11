// § boot: set up the screen, the room and the hero. The screens are in
// input/screens.js and the drawing in render/frame.js (D-235); `app` holds
// what the three share.
import { VERSION } from './core/version.js';
import { newJourney as beginJourney, step, wait, pour, craft, makeFrom, makeAt, eat, hold, behind, setDown, takeDown, shelve, kindle, plant, pick, feed, panelBeside, look, drop, sortTheBag, pourByItself, switchLantern, followDaylight, DIRS, maxHealth, startOver, fallView, sleepOut, canSleepOut, campAsks, noSleepOut } from './core/turn.js';
import { resetRoom } from './core/spawn.js';
import { enemyAt, biteSound, drinkSound } from './core/enemies.js';
import { eventsSince, has } from './core/events.js';
import { get } from './core/registry.js';
import { strikeFish, needleAt } from './core/fishing.js';
import { goToDepth, goToPlace } from './core/stairs.js';
import { send, arrive } from './core/homeward.js';
import { areaAt, beginPlace, depthOf, tileAt as roomTileAt } from './core/room.js';
import { SEED_MAX, rng } from './core/rng.js';
import { createScreen } from './render/screen.js';
import { setOil } from './core/oil.js';
import { createTextLine } from './render/textline.js';
import { say } from './core/lines.js';
import { loadSettings, swipesWalk, stillMotion, loudOf, LOUD_KINDS, isMuted } from './core/settings.js';
import { deeper, counted } from './core/record.js';
import { featTurn } from './core/feats.js';
import { loadProfiles, saveProfiles, playing, withRecords, withPlayed, withBestiary, withGoals } from './core/profile.js';
import { booked } from './core/bestiary.js';
import { goalsAfter, doneWords, GOLD_TURNS } from './core/goals.js';
import { fit } from './core/parts.js';
import { wear } from './core/worn.js';
import { takeOff, lookGear } from './core/gear.js';
import { loadJourney, saveJourney } from './core/save.js';
import { openRows } from './core/growth.js';
import { moveStack, storeMatching, storeNearby } from './core/chest.js';
import { buyerAt, sell, buy } from './core/trade.js';
import { easeMode } from './core/menu.js';
import { remember, rememberAll, forget } from './core/fog.js';
import { inDaylight, passTime } from './core/daytime.js';
import { growAll } from './core/garden.js';
import { lanternFrom } from './core/sight.js';
import { mouthLight } from './core/mouth.js';
import { createInput } from './input/input.js';
import { createLanternButton } from './input/lantern.js';
import { createPauseButton } from './input/pause.js';
import { createMapButton } from './input/mapbutton.js';
import { createBagButton } from './input/bagbutton.js';
import { createQuickSlot } from './input/quickslot.js';
import { createSleepButton } from './input/sleepbutton.js';
import { createArrowPad } from './input/arrowpad.js';
import { firstFlask, isFlask } from './core/bag.js';
import { createMapMoves } from './input/mapview.js';
import { createScreens } from './input/screens.js';
import { waitsInLine } from './input/queue.js';
import { createSlots } from './slots.js';
import { createTouch } from './input/touch.js';
import { goFullScreen } from './input/fullscreen.js';
import { createFrame, FADE_MS } from './render/frame.js';
import { createSound, stepOf, cardTurn, KIND_SOUND, dripsIn, dripGap, musicOf } from './render/sound.js';
import { moments } from './render/moments.js';
import { createDev } from './dev/dev.js';
import { addAppCard } from './render/appicon.js';
import { travel, onWokenPlate, creatureNear } from './core/travel.js';
import { stepOffersBoons, takeBoon, lanternReach } from './core/boon.js';

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
  featFrom: null, // the Records a Feat note waiting behind a turn's own line counts from (D-719)
  jumped: false, // a dev jump stops this journey counting towards the deepest depth (D-232)
  // screen: 'slots', 'name', 'cloak' (the look card, D-521), 'drop', 'title', 'play', 'paused', 'settings', 'seed', 'howto', 'map', 'bag', 'make' (the bag's Make tab, D-787), 'place' (setting the workbench down, WB2), 'bench' (its panel, WB3), 'chest' (the stash chest's, CH3), 'trade' (the peddler's card, D-494), 'bed' (the bed's ask by day, D-488), 'explore', 'history', 'journal' or 'opening' (a new journey's first words, D-628) or 'aboutBoons' (the boons card, D-712)
  screen: 'slots', chosen: 0,
  picking: null, dropping: 0, slotsBack: false, // the slot screen: Rename or Delete picked (D-273), the slot asked about, Back shown (D-271)
  pageFrom: 'title', // the menu Settings or How to play was opened from
  goalGold: null, // { id, until }: the goal just done, its line gold until that turn (D-706)
  page: 'touch', // How to play's page
  tab: 'records', // the Journal's open tab: Records or Growth (D-293)
  journalScroll: 0, // the Journal's open list's top row shown, scrolled (D-743)
  entry: '', // the digits typed on the seed pad, or the letters on the name pad
  naming: 0, renaming: false, // the slot the name pad names: an empty one (D-272), or a profile renamed (D-273)
  digits: false, // the name pad shows its digits, after 123 (D-765)
  padFrom: 'settings', // the screen the seed pad was opened from: Settings or the Explorer
  seeds: [], // the seeds the Explorer has shown this visit, the last one on screen
  plan: null, view: null, floors: [], // the map shown, its view, and the floors it turns to
  spokenLine: null,
  cam: { x: 0, y: 0 }, // the room pixel at the screen's top-left (src/core/camera.js)
  bench: null, // the tile of the workbench or stash chest whose panel is open (WB3, D-323; CH3)
  benchTab: 'build', // the workbench card's open tab, BUILD or GEAR, kept as it is closed (D-800)
  settingsTab: 'controls', // the Settings card's open tab, kept as it is closed (D-820)
  soundList: null, // the kind whose sounds' list is open on the Sound tab, or null (D-824)
  framed: null, // the shown spot (foeAt) of the creature whose plaque was tapped (CL2, D-357)
  lookRoll: rng(randomSeed()), // the look card's RANDOM, seeded once a visit (D-522)
  opened: new Set(), rows: [], scroll: 0, // Version history: the versions open, its rows, and how far it is scrolled (D-254)
};
const newWorld = (mode) => {
  app.journeySeed = app.settings.seed || randomSeed();
  return beginJourney(app.journeySeed, mode); // in a south woods room (D-735)
};
// The profile's saved journey comes back as it was, ready for Continue (D-238); with none
// in use, or none saved, a new world waits unsaved
function loadInto(slot) {
  const kept = slot === null ? null : loadJourney(slot);
  app.saved = !!kept; app.featFrom = null; // another profile's Records (D-719)
  if (kept) { app.state = kept.state; app.jumped = kept.jumped; app.journeySeed = kept.state.seed; }
  else { app.state = newWorld(); app.jumped = false; }
}
loadInto(app.profiles.current);
const sound = createSound(() => app.settings.sound === 'on', (kind) => loudOf(app.settings, kind), (voice) => isMuted(app.settings, voice)); // each sound On or Off (D-824) // from sound files, each silent until its file is in (D-773)
// Saved after every turn, or any change, once the journey has begun (D-238)
// A save that fails says so once, until one is kept again (D-428)
let savedState = app.state, unsaved = false;
function keepJourney() {
  app.state = openRows(app.state); // Growth's rows opened by going deeper, kept for good, with its line (D-814, D-816)
  if (app.state === savedState) return;
  const kept = saveJourney(app.state, app.jumped, app.profiles.current);
  if (!kept && !unsaved) app.state = say(app.state, 'unsaved');
  unsaved = !kept; savedState = app.state; app.saved = true;
}
function keepRecords(events, before, lineBefore = before?.line) {
  // The profile's Records (D-021, D-232, D-268, D-270): the deepest depth walked to,
  // and the creatures beaten, falls, rooms found, steps, flasks poured and torches lit that this action's events bring
  const was = playing(app.profiles).records, d = deeper(was.deepest, depthOf(app.state.place), app.jumped);
  let records = counted(was, events, app.jumped);
  if (d !== records.deepest) records = { ...records, deepest: d };
  if (records !== was) app.profiles = withRecords(app.profiles, records);
  const book = playing(app.profiles).bestiary, met = booked(book, events, app.jumped); // the Bestiary's counts (D-630)
  if (met !== book) app.profiles = withBestiary(app.profiles, met);
  const goaled = keepGoals(events, before);
  // A Feat's tier reached says so (D-467, D-695); after the action's own line, a goal's too, on a move that says none (D-719)
  const feat = featTurn(app.featFrom ?? was, records, app.state.line !== lineBefore);
  app.featFrom = feat.from;
  if (feat.note) app.state = say(app.state, 'featReached', feat.note);
  if (records !== was || met !== book || goaled) saveProfiles(app.profiles);
}
// § goals (D-706): a teaching goal shows once its moment comes; done, it pays its reward, says so
// and the line turns gold for a few turns. Not after a dev jump, as the Bestiary (D-232).
function keepGoals(events, before) {
  if (app.jumped) return false;
  const p = playing(app.profiles), after = goalsAfter(p.goals, p.glints, p.bestiary, events, app.state, before);
  if (after.goals === p.goals) return false;
  app.profiles = withGoals(app.profiles, after.goals, after.glints);
  app.state = after.state;
  const id = after.done[0];
  if (id) { app.state = say(app.state, 'goalDone', doneWords(after.goals, id)); app.goalGold = { id, until: app.state.turn + GOLD_TURNS }; }
  return true;
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
  beam: null, // { id, x, y, start, arriving } a freed person beamed home, or in at home (D-496)
  kindle: null, // { x, y, start } the waystone's rune lighting as it wakes (D-591)
  bitten: null, // { until, shakeUntil } after a bite: the hero flashes red (D-118)
  drunk: null, // { until } after a creature drinks oil: the oil bar flashes (D-606)
  poisonHurt: null, // { until, heart } after poison takes a heart: that heart flashes green (D-654)
  travel: null, // { from, mid, end } while taking stairs: the old room fades out, the new one in (D-135)
  fall: null, // { from, lieAt, darkAt, mid, end, ends } after a fall, until the hero wakes (D-234); `ends` after a Hardcore one (D-344)
});
const ALERT_MS = 900;
const HIT_FLASH_MS = 140, SHAKE_MS = 120; // the study's (study line 470)
const POISON_FLASH_MS = 900; // the heart poison takes: green, empty, green, three times (D-654)
const DRINK_FLASH_MS = 420; // the oil bar's flicker as a creature drinks: pale, dark, pale (D-606)
// A fall (D-234): the hero lies down, the light closes to the deepest dark over about a
// second, stays dark a moment, then opens on the start. With reduced motion, only the dark.
const FALL = { lie: 120, dark: 1000, wake: 1300, end: 1800 }, FALL_STILL_MS = 800;
const settled = () => !app.travel && !app.fall && app.shown.x === app.state.hero.x && app.shown.y === app.state.hero.y;
const flashFor = () => { const now = performance.now(); return { until: now + HIT_FLASH_MS, shakeUntil: now + SHAKE_MS }; };
const snap = (to) => { app.shown.x = to.x; app.shown.y = to.y; };

function tryStep(dir) {
  if (app.fall) return; // nothing is taken while the hero lies fallen
  if (waitsInLine(app.screen, settled())) { app.queued = dir; return; } // a card's action happens at once (D-680)
  const before = app.state;
  let to = before.hero;
  if (dir.travel !== undefined) app.state = travel(app.state, dir.travel); // to another woken waystone, free (D-593)
  else if (dir === 'wait' && onWokenPlate(before) && !creatureNear(before)) { screens.openTravel(); return; } // the wait on a woken plate opens the travel card (D-593)
  else if (dir === 'wait' && onWokenPlate(before)) app.state = say(app.state, 'stoneNear'); // barred, free (D-593)
  else if (dir === 'wait') app.state = wait(app.state); // standing still, one turn (D-084)
  else if (dir.pour !== undefined) app.state = pour(app.state, dir.pour); // a flask from the bag, one turn, free with Quick Pour (D-247, D-816)
  else if (dir.craft !== undefined) app.state = craft(app.state, dir.craft); // a flask from 3 oilcaps, one turn (D-299)
  else if (dir.eat !== undefined) app.state = eat(app.state, dir.eat); // a heartcap or potion from the bag, one turn (D-308, D-309)
  else if (dir.hold !== undefined) app.state = hold(app.state, dir.hold); // a weapon from the bag into the hand, one turn (D-479)
  else if (dir.makeBag !== undefined) app.state = makeFrom(app.state, dir.makeBag); // a thing made on the bag's Make tab, one turn, the tab kept open (D-787)
  else if (dir.make !== undefined) app.state = makeAt(app.state, dir.make); // a thing made at the workbench, one turn, its panel kept open (CH1, D-326)
  else if (dir.set !== undefined) app.state = setDown(app.state, dir.set, dir.side); // the workbench beside the hero, one turn (WB2, D-322)
  else if (dir.shelve !== undefined) app.state = shelve(app.state, dir.shelve.x, dir.shelve.y); // the locket on the shelf, one turn (D-693)
  else if (dir.kindle !== undefined) app.state = kindle(app.state, dir.kindle.x, dir.kindle.y); // cold ashes lit with the lantern's oil, one turn (D-757)
  else if (dir.plant !== undefined) app.state = plant(app.state, dir.plant.x, dir.plant.y); // a seed in the garden bed, one turn (D-566)
  else if (dir.pick !== undefined) app.state = pick(app.state, dir.pick.x, dir.pick.y); // the grown bed's berries, one turn (D-568)
  else if (dir.feed !== undefined) app.state = feed(app.state, dir.feed.x, dir.feed.y); // guano on the sprout, one turn (D-569)
  else if (dir.sleepOut) app.state = sleepOut(app.state); // the moon button's Yes: until morning, no bed (D-758)
  else if (dir.take !== undefined) app.state = takeDown(app.state, dir.take.x, dir.take.y); // the bench or an empty stash chest back into the bag, one turn (WB3, D-323; CH5)
  else if (buyerAt(before, before.hero.x + DIRS[dir][0], before.hero.y + DIRS[dir][1])) { app.state = step(app.state, dir); screens.openTrade(); return; } // bumping the peddler at home: his line and his card, free (D-494)
  else if (campAsks(before, dir)) { screens.openSleepOut(); return; } // a set-down bedroll from dusk asks Sleep here until morning?, free (D-804)
  else if (panelBeside(before, dir)) { const at = panelBeside(before, dir), says = roomTileAt(app.state.room, at.x, at.y).says; if (says) app.state = say(app.state, says); screens.openPanel(at); return; } // bumping the bench or a stash chest opens its panel, free (WB3, CH3); a tile's `says` line with it, cold ashes' (D-757)
  else {
    const next = step(app.state, dir);
    const [dx, dy] = DIRS[dir], foe = enemyAt(app.state, app.state.hero.x + dx, app.state.hero.y + dy);
    to = { x: before.hero.x + dx, y: before.hero.y + dy };
    const missed = eventsSince(app.state, next).some((e) => e.type === 'miss'); // stiff, the swing went wide: nothing flashes (D-759)
    if (foe && !foe.asleep && !foe.under && !foe.pile && !missed) app.hit = { enemies: [foe, behind(app.state, foe)].filter(Boolean), ...flashFor() }; // a bump that wakes one asleep doesn't flash (D-368); the spear's one behind does (D-479)
    if (foe && !foe.asleep && !foe.under && !foe.pile && before.held) app.jab = { dx, dy, start: performance.now() }; // the knife's stab (D-253)
    else if (next.turn === app.state.turn || foe?.asleep) nudgeToward(dir); // a bump, or a torch the dark lantern can't light (D-122)
    app.state = next;
  }
  app.state = byItself(before, app.state);
  if (app.settings.flasks === 'self') app.state = pourByItself(before, app.state);
  const { state } = app, fell = state.fell !== before.fell;
  const events = eventsSince(before, state);
  const poisoned = events.filter((e) => e.type === 'poison').reduce((n, e) => n + e.hurt, 0); // poison's heart flashes green, not the hero red (D-654)
  if (fell || before.health - state.health > poisoned || events.some((e) => e.type === 'bite' && e.hurt > 0)) app.bitten = flashFor(); // in god mode too (D-625)
  if (poisoned) app.poisonHurt = { until: performance.now() + POISON_FLASH_MS, heart: state.god ? state.health - 1 : state.health };
  if (has(events, 'drink')) app.drunk = { until: performance.now() + DRINK_FLASH_MS }; // the oil bar flickers (D-606)
  hear(events);
  for (const [v, arg] of moments(before, state, events)) sound[v](arg); // the rest's sounds, read from what changed (D-833)
  if ((dir.make !== undefined || dir.makeBag !== undefined || dir.craft !== undefined) && state.turn !== before.turn) sound.tools(); // something made, at the bench or in the bag
  keepRecords(events, before);
  if (fell) fallDown(fallView(before, state)); // the floor's other rooms too, for the round map (D-557)
  const went = !fell && state.place !== before.place;
  if (went && !still()) { // the hero walks onto the stairs as the old room fades (D-135)
    const now = performance.now();
    app.travel = { from: { ...before, hero: to }, mid: now + FADE_MS, end: now + 2 * FADE_MS };
  } else if (went || (still() && !fell)) { snap(state.hero); if (went) foeShown = new Map(); }
  else if (!fell) followFoes(before.enemies, state.enemies);
  // A freed person leaves in the lantern beam where they stood, or beams in at home once the room has faded in (D-496)
  const beam = events.find((e) => e.type === 'leave' || e.type === 'arrive');
  if (beam && !still()) app.beam = { ...beam, arriving: beam.type === 'arrive', start: beam.type === 'arrive' ? app.travel?.end ?? app.fall?.end ?? performance.now() : performance.now() };
  const woke = events.find((e) => e.type === 'stoneWake'); // the rune kindles (D-591), not a mimic's wake (D-368)
  if (woke && !still()) app.kindle = { x: woke.x, y: woke.y, start: performance.now() };
  // Experience earned shows as it rises over the hero; after stairs, once the new room shows (D-245)
  if (state.xp > before.xp || has(events, 'fang')) app.gain = { n: state.xp - before.xp, at: app.travel?.mid ?? performance.now(), heart: has(events, 'fang') }; // and a heart back from the Fang Charm (D-809)
  // Stepping onto the woken home plate with no boon held offers the boon card (D-596); the step that wakes it only wakes it (D-603)
  if (!went && !fell && stepOffersBoons(before, state)) { app.walk = null; screens.openBoons(); }
}
// § strike (D-614): the strike card's tap, or its needle run out (null), free; the catch's
// splash and its records as any turn's, then back to play
function strikeAt(n) {
  const before = app.state;
  app.state = strikeFish(before, n);
  const events = eventsSince(before, app.state);
  hear(events); keepRecords(events, undefined, before.line);
  app.strike = null; screens.show('play');
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
// § touch: marks, tap, hold to step and walk on are in input/touch.js (made below, after the frame)

// § hear: the sounds of an action's events (events.js, D-267): the hit's (D-258), the
// lantern's tick (D-257), a bite a moment after the hit, when there was one (D-259),
// a tile walked, its step by the ground, unless the hero fell (D-255, D-774, D-776), a waystone's bells as it wakes (D-591), and
// the plop of a cast and the splash of a catch (D-613), and a scattered pile's rattle (D-731);
// a creature beaten, a moment after the hit, unless its bones scattered under the hero's step (D-777);
// an item into the bag pats, unless it is a fish with its splash; a weapon into the hand is drawn; a tile set down knocks (D-820);
// a bump on stone clinks, and its last crumbles (D-825); a relic shelved, a seed planted, guano fed (D-828);
// a stiff swing that misses puffs, a bite that takes a heart is a blow, poison's heart throbs, a level rises (D-831);
// the last heart beats (D-835)
function hear(events) {
  const hit = events.find((e) => e.type === 'hit'), bite = biteSound(events), drink = drinkSound(events);
  const swung = !!hit || has(events, 'miss'); // a bite comes a moment after the hero's swing, hit or missed
  if (hit) sound.hit(!!hit.held);
  if (has(events, 'miss')) sound.miss(); // stiff, the swing went wide (D-759)
  if (has(events, 'beat') && !has(events, 'scatter')) sound.beaten(!!hit);
  if (drink) sound[drink](swung); // the oil tick's sip (D-606)
  for (const e of events) if (e.type === 'lantern') sound.lantern(e.lit);
  if (bite) sound[bite](swung);
  if (events.some((e) => e.type === 'bite' && e.hurt > 0)) sound.hurt(swung); // a bite or a glob took a heart (god mode too, as the flash)
  if (events.some((e) => e.type === 'poison' && e.hurt > 0)) sound.poison(); // poison took a heart (D-654)
  if (has(events, 'lastHeart')) sound.heartbeat(swung || has(events, 'poison')); // down to the last heart: a soft lub-dub twice, after the blow or the throb (D-835)
  if (has(events, 'level')) sound.rise(); // a level reached (D-246)
  if (has(events, 'step') && !has(events, 'fall')) sound[stepOf(app.state.room.dark?.sky, areaAt(depthOf(app.state.place))?.look)](); // grass, earth or stone (D-776)
  if (has(events, 'stoneWake')) sound.bells(); // the waystone wakes (D-591); a mimic wakes silently (D-368)
  if (has(events, 'boon')) sound.chime(); // a boon picked (D-596)
  if (has(events, 'cast')) sound.plop(); // the line cast (D-613)
  if (has(events, 'catch')) sound.splash(); // a fish caught (D-613)
  if (has(events, 'scatter')) sound.rattle(); // a pile of bones scattered: the bone rat's rattle (D-731)
  if (has(events, 'take') && !has(events, 'catch')) sound.pat(); // into the bag (D-820)
  if (events.some((e) => e.type === 'hold' && !e.tool)) sound.draw(); // from the bag into the hand; a tool, a rod or a pick, is silent (D-826)
  if (has(events, 'set')) sound.thunk(); // the workbench set down
  const chip = events.find((e) => e.type === 'chip' && get(e.id)?.clinks);
  if (chip) sound[chip.broke ? 'crumble' : 'clink'](); // a deposit, a copper vein or rubble (D-825)
  if (has(events, 'shelve')) sound.shelf(); // a relic on the shelf (D-828)
  if (has(events, 'plant')) sound.sow(); // a seed in the garden bed
  if (has(events, 'feed')) sound.feed(); // guano on the sprout
  if (events.some((e) => e.type === 'pour' && isFlask(e.id))) sound.pour(); // a flask, by hand or by itself; a minnow is silent (D-830)
  if (has(events, 'oilLow')) sound.sputter(); // the flame is getting low: two sputters (D-834)
  if (has(events, 'oilOut')) sound.gutter(); // the lantern gutters to an ember
  if (has(events, 'torch')) sound.torch(); // an unlit torch lit (D-121)
  if (has(events, 'kindle')) sound.kindle(); // cold ashes lit into a campfire (D-757)
}
// The lantern set to By itself follows the daylight as the hero comes and goes (D-210)
const byItself = (before, after) => (app.settings.lantern === 'self' ? followDaylight(before, after) : after);
// § switch: the lantern button and the L key, free at any time in play (D-080, D-081); it ticks (D-257);
// the goals checked, as lighting it does "Light your lantern" (D-735)
const switchIt = () => { if (app.screen === 'play') { const before = app.state; app.state = switchLantern(before); hear(eventsSince(before, app.state)); keepRecords([], before); } };
const lanternButton = createLanternButton(hudCanvas, { onSwitch: switchIt });
const pauseButton = createPauseButton(hudCanvas, { onPause: () => screens.pause() });
const mapButton = createMapButton(hudCanvas, { onMap: () => screens.toggleMap() });
const bagButton = createBagButton(hudCanvas, { onBag: () => screens.toggleBag() });
// § quick slot: pours the first flask in the bag, one turn, like the bag's Pour (D-384);
// while a line is out, a bump of the float's tile beside the hero instead: wait, or pull (D-612)
const towardFloat = ({ hero, float }) => Object.keys(DIRS).find((d) => hero.x + DIRS[d][0] === float.x && hero.y + DIRS[d][1] === float.y);
const quickSlot = createQuickSlot(hudCanvas, { onPour: () => {
  if (app.screen !== 'play') return;
  const s = app.state, i = firstFlask(s.bag);
  if (s.float) { const d = towardFloat(s); if (d) tryStep(d); } else if (i >= 0) tryStep({ pour: i });
} });

// § sleep button: outside at night, nothing after the hero, it asks Sleep here until morning? (D-758)
const sleepButton = createSleepButton(hudCanvas, { onSleep: () => { if (app.screen === 'play' && !app.fall && canSleepOut(app.state)) screens.openSleepOut(); } });

// The hero and room shown afresh, with nothing moving, after the state is replaced
function freshView() {
  snap(app.state.hero);
  app.queued = app.nudge = app.hit = app.jab = app.beam = app.kindle = app.bitten = app.drunk = app.poisonHurt = app.travel = app.fall = app.gain = null; foeShown = new Map();
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
// § slots: picking, making, renaming, a new look and deleting a profile are in slots.js (D-519)
const { useSlot, renameSlot, lookSlot, buySlot, giftSlot, dropSlot } = createSlots(app, loadInto, () => { savedState = app.state; freshView(); });
const stage = document.getElementById('stage');
const screens = createScreens(app, {
  spoken, lanternButton, pauseButton, mapButton, bagButton, quickSlot, sleepButton, reduceMotion, newJourney, beginAgain, randomSeed, useSlot, renameSlot, lookSlot, buySlot, giftSlot, dropSlot,
  pour: (slot) => tryStep({ pour: slot }), craft: (slot) => tryStep({ craft: slot }), makeBag: (from) => tryStep({ makeBag: from }), eat: (slot) => tryStep({ eat: slot }), hold: (slot) => tryStep({ hold: slot }),
  setDown: (slot, side) => tryStep({ set: slot, side }), takeDown: (x, y) => tryStep({ take: { x, y } }), shelve: (x, y) => tryStep({ shelve: { x, y } }), sleepOut: () => tryStep({ sleepOut: true }), kindle: (x, y) => tryStep({ kindle: { x, y } }), plant: (x, y) => tryStep({ plant: { x, y } }), pick: (x, y) => tryStep({ pick: { x, y } }), feed: (x, y) => tryStep({ feed: { x, y } }), make: (id) => tryStep({ make: id }),
  lookAt: (slot) => { app.state = look(app.state, slot); }, // an oilcap's line, free (D-297)
  refuse: () => { ownSound = true; sound.refuse(); }, // a dim pick: nothing happens but the tock (D-819)
  tell: (id) => { app.state = say(app.state, id); }, // a line, free: why SLEEP can't (D-804)
  roomTile: (px, py) => tileAt(px, py), // the room's tile under a tap on the menus' picture (D-381)
  fit: (slot) => { app.state = fit(app.state, slot); }, // a lantern part into its slot, free (D-483)
  wear: (slot) => { app.state = wear(app.state, slot); }, // armour put on, free (D-484)
  drop: (slot) => { app.state = drop(app.state, slot); }, // a stack set down at the hero's feet, free (D-546)
  takeOff: (g) => { app.state = takeOff(app.state, g); }, // the weapon or the tool back into the bag, free (D-554)
  lookGear: (g) => { app.state = lookGear(app.state, g); }, // a gear slot's Look line, free (D-554)
  ease: (mode) => { app.state = easeMode(app.state, mode); }, // the way to play made easier, saved with the journey (MO4, D-346)
  stash: (x, y, slot) => { app.state = moveStack(app.state, x, y, slot); }, // a stack into or out of a stash chest, free (CH4, D-331)
  sortBag: () => { app.state = sortTheBag(app.state); }, // the bag's SORT: lined up by kind, half stacks joined, free (D-559)
  storeNear: () => { app.state = storeNearby(app.state); }, // the bag's STORE: each bag stack to the chests in reach holding its kind, nearest first, free (D-558)
  store: (x, y) => { app.state = storeMatching(app.state, x, y); }, // every bag stack the chest holds the kind of, onto it, free (D-556)
  sell: (slot) => { const before = app.state; app.state = sell(app.state, slot); if (app.state !== before) { ownSound = true; sound.coins(); } }, // one of a stack sold to the peddler, free (D-494); coins, not the tick (D-828)
  buy: (ware) => { app.state = buy(app.state, ware); }, // one of the peddler's wares bought, free (D-495)
  takeBoon: (id) => { // the boon card's pick, free (D-596); the first boon picked opens the boons card (D-712)
    const first = !playing(app.profiles).goals?.boon?.done, before = app.state;
    app.state = takeBoon(before, id); const events = eventsSince(before, app.state); hear(events); keepRecords(events, before);
    if (first && playing(app.profiles).goals?.boon?.done) { app.boonsFrom = 'play'; screens.show('aboutBoons'); }
  },
  bought: (before) => keepRecords([], before), // a Growth buy in the Journal, free: the goals checked (D-713)
  strike: () => strikeAt(needleAt(performance.now() - app.strike.start)), // the strike card's tap (D-614)
  goByStone: (place) => tryStep({ travel: place }), // the travel card's pick: there by waystone, free, with the stairs' fade (D-593)
  dev: () => dev, input: () => input, mapMoves: () => mapMoves, // made below
  goFullScreen,
});
// In play the Swipe switch can turn swipes off (D-189, D-408); off the room, the screens take them.
// A key or swipe in play ends a walk to a tapped tile and steps itself.
const onDir = (dir, how) => {
  const was = app.settings;
  if (app.screen !== 'play') { screens.onDir(dir, how); hearLoud(was)?.(); } // the new loudness heard (D-822, D-823)
  else if (how !== 'swipe' || swipesWalk(app.settings)) { app.walk = null; tryStep(dir); }
};
const onPoint = (px, py, held) => {
  if (app.screen === 'play') stepToward(px, py, held); // held: from a finger held still (D-408)
  else if (!held) screens.onPoint(...(['map', 'explore', 'bag', 'make', 'bench', 'chest', 'trade', 'paused', 'settings', 'howto', 'journal', 'history', 'seed', 'mode', 'ways', 'slots', 'name', 'cloak', 'sure', 'drop', 'easier', 'bed', 'sleepOut', 'travel', 'boons', 'strike', 'opening', 'aboutBoons', 'title'].includes(app.screen) ? toLayer([px, py]) : [px, py])); // the cards and the title are on the screen layer (D-385, D-387 to D-391, D-393 to D-401, D-444)
};
const onWait = () => { if (app.screen === 'play') { app.walk = null; tryStep('wait'); } else if (!screens.onMapScreen()) screens.space(); };
// Tab frames the first plaque, then the next, then none (CL2); on the bag's card, its other tab (D-787); the workbench's too (D-800); Settings' next (D-820)
const onTab = () => {
  if (app.screen === 'bag' || app.screen === 'make') { screens.turnBagTab(); return true; } // the bag's other tab (D-787)
  if (app.screen === 'bench' && screens.turnBenchTab()) return true; // the workbench's other tab (D-800)
  if (app.screen === 'settings') { screens.turnSettingsTab(); return true; } // Settings' next tab (D-820)
  if (app.screen !== 'play') return false;
  const spots = frame.plaqueSpots(), i = spots.indexOf(app.framed);
  app.framed = spots[i + 1] || null;
  return spots.length > 0;
};
const onChoose = () => { if (app.screen === 'play') { if (onWokenPlate(app.state)) tryStep('wait'); } else if (!screens.onMapScreen()) screens.choose(); }; // Enter on a woken plate: the travel card (D-593)
// § menu sounds (D-819): off play, a tap, Enter or Space that changes something on the same
// screen ticks, unless it played its own (`ownSound`): a dim pick that can't be done tocks, a sale's coins (D-828); a
// card opening or closing turns its page instead (in the loop)
let ownSound = false, cards = [app.screen], cardShown = app.screen;
const marks = () => [app.screen, app.state, JSON.stringify(app.settings), spoken.textContent, app.opened.size, app.entry];
const pressed = (act) => (...args) => {
  if (app.screen === 'play' || app.screen === 'strike') return act(...args); // play's own sounds; the strike's tap is a pull
  const was = marks(), settingsWas = app.settings;
  ownSound = false;
  const out = act(...args); // Tab's answer, whether it used the key (D-826)
  const now = marks();
  if (!ownSound && now[0] === was[0] && now.some((m, i) => m !== was[i])) (hearLoud(settingsWas) ?? sound.tap)();
  return out;
};
// A loudness changed: Loudness ticks, a kind plays its own sound, each at the new loudness (D-822, D-823)
function hearLoud(was) {
  if (was.loud !== app.settings.loud) return sound.tap;
  const on = (app.settings.muted ?? []).length < (was.muted ?? []).length && (was.muted ?? []).find((v) => !app.settings.muted.includes(v));
  if (on) return () => sound.sample(on); // a sound turned On plays itself; turned Off, the tick (D-824)
  const k = LOUD_KINDS.find(({ id }) => was[id] !== app.settings[id]);
  return k ? () => sound[KIND_SOUND[k.kind]]() : null;
}
// A chest creaks open before its page turns, and knocks shut just after (D-825)
function turnPage() {
  if (app.screen === cardShown) return;
  const turn = cardTurn(cards, app.screen), was = cardShown;
  cards = turn.trail; cardShown = app.screen;
  if (turn.open && app.screen === 'chest') { sound.chest(true); setTimeout(() => sound.card(true), CREAK_MS); return; }
  sound.card(turn.open);
  if (!turn.open && was === 'chest') sound.chest(false);
}
const CREAK_MS = 300; // the page turns as the creak ends
const input = createInput(stage, canvas, {
  onDir, onPoint: pressed(onPoint), onHover: (x, y) => onHover(x, y), onHold: (p) => { if (app.hold) app.hold = p; }, onLantern: switchIt, onWait: pressed(onWait), onChoose: pressed(onChoose), onPause: screens.pause, onMap: screens.toggleMap, onBag: screens.toggleBag, onFloor: screens.turnMap, onType: screens.onType, onTab: pressed(onTab), onWheel: screens.onWheel,
  holds: () => app.screen === 'play', // off play a slow press is a tap (D-661)
  repeats: () => app.screen === 'play', // off play a held Space picks once (D-669)
  guarded: (x, y) => app.screen === 'play' && arrowPad.guards(x, y), // the ring round the arrow pad (D-422)
});
const mapMoves = createMapMoves(stage, hudCanvas, { active: screens.onMapScreen, onPan: screens.panMap, onZoom: screens.zoomMap }); // in the room's pixels, as the map's card (D-395)
const dev = createDev(stage, roomCanvas, { // on for everyone (D-086)
  get: () => app.state,
  still,
  set: (s) => { // a new place shows at once, with no slide (Go to depth)
    const went = s.place !== app.state.place || s.hero !== app.state.hero; // or a loaded spot
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
  setGod: (on) => ({ ...app.state, god: on }), // bites take no hearts (D-625)
  setEndless: (on) => ({ ...app.state, endless: on }), // the lantern never runs down (D-626)
  passTime: (turns) => passTime(app.state, turns), // the clock only (D-217)
  grow: () => growAll(app.state), // every planted garden bed's time up (D-567)
  goTo: (depth) => { app.jumped = true; return goToDepth(app.state, depth); }, // depth 0 is the crypt (D-212)
  loadSpot: (s) => { app.jumped = true; app.journeySeed = s.seed; return s; }, // a test spot is a dev jump (D-627, D-232)
  goOutside: () => arrive(send(goToPlace(app.state, 'woods'), app.state.place)), // the woods, on the surface too (D-209); one freed and waiting goes home, simply there (D-496)
  settings: () => app.settings,
  camera: () => app.cam,
}, hudCanvas);
const frame = createFrame(app, { ctx, listCtx, roomCtx, hudCtx, canvas, textLine, spoken, lanternButton, pauseButton, mapButton, bagButton, arrowPad, quickSlot, sleepButton, dev, screens, still, foeAt });
const { onHover, stepToward, tileAt, holdStep, walkOn } = createTouch(app, { frame, dev, toLayer, toRoom, tryStep, heldAt: (t) => { lastHeldStep = t; }, ALERT_MS, openQuests: () => screens.openQuests() });
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
  const key = state.hero.x + ',' + state.hero.y + ',' + state.oil + ',' + state.boon;
  if (key === rememberedAt && state.seen === rememberedSeen) return;
  app.state = remember(state, { ...lanternFrom(state.hero.x, state.hero.y), r: lanternReach(state) });
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
  if (fall && t >= fall.mid && fall.from) { fall.from = null; snap(app.state.hero); foeShown = new Map(); if (fall.ends) { sound.ended(); screens.endJourney(); return; } sound.wake(); } // waking after a fall, or the run's end (D-833)
  if (fall && t >= fall.end) app.fall = null;
  const s = app.travel?.from || app.fall?.from || app.state;
  shown.x = approach(shown.x, s.hero.x, dt);
  shown.y = approach(shown.y, s.hero.y, dt);
  for (const e of s.enemies) { const p = foeAt(e); p.x = approach(p.x, e.x, dt); p.y = approach(p.y, e.y, dt); }
  if (app.screen !== 'play') app.walk = app.padDir = app.hold = null; // a card or menu ends a walk, the pad's and a hold's
  if (app.screen === 'strike' && needleAt(t - app.strike.start) === null) strikeAt(null); // too slow: gone (D-614)
  if (settled() && app.screen === 'play' && app.state.float?.strike !== undefined) screens.openStrike(); // pulled on a bite, once the hero is still; after loading too (D-614)
  if (settled() && app.screen === 'play') { // paused, no turn is taken
    rememberHere();
    if (app.queued) { const d = app.queued; app.queued = null; tryStep(d); }
    else if (app.padDir && t - lastHeldStep >= HOLD_STEP_MS) { lastHeldStep = t; tryStep(app.padDir); }
    else if (app.walk && t - lastHeldStep >= HOLD_STEP_MS) { lastHeldStep = t; walkOn(); }
    else if (app.hold && t - lastHeldStep >= HOLD_STEP_MS) { lastHeldStep = t; holdStep(); }
  }
}
// § drips (D-836): while play shows the rock caves, a drip every 8 to 16 seconds; leaving, or a
// card or menu over play, stops them, and they start again from a fresh wait
const dripVary = rng(836);
let nextDrip = null;
function keepDrips(t) {
  const here = app.screen === 'play' && !app.travel && !app.fall && dripsIn(app.state.room.dark?.sky, areaAt(depthOf(app.state.place))?.look);
  if (!here) { nextDrip = null; return; }
  if (nextDrip === null) nextDrip = t + dripGap(dripVary());
  else if (t >= nextDrip) { sound.drip(); nextDrip = t + dripGap(dripVary()); }
}
// § safety net (D-557): an error in one frame is logged, once for each message, and the
// next frame still comes, so a bug can't freeze the game
const logged = new Set();
function loop(t) {
  try {
    turnPage();
    if (!screens.onTitle()) { update(t); keepDrips(t); }
    sound.music(screens.onTitle() ? null : musicOf(app.state?.room.dark?.sky)); // the surface's theme, home too; none on the title (D-837)
    keepJourney();
    keepPlayed(t);
    frame.draw(t);
  } catch (err) {
    if (!logged.has(err?.message)) { logged.add(err?.message); console.error(err); }
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
