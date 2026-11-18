// § frame: draws one frame of play, or the title and its screens, from `app`
// (split from main.js, D-235). It changes nothing in the game; main.js moves
// the shown hero and enemies and takes the turns before each frame.
import { TILE, W, SCREEN_H, view, roomView, fitTitle, fitCards, fitRoomSize, edgeIn, setCloseUp } from './screen.js';
import { drawRoom, drawBeyond, drawFloor } from './tiles.js';
import { shotAt, risenAt, rising } from './cutscene.js';
import { drawRipples } from './water.js';
import { drawRoosts } from './roosts.js';
import { drawHero, drawItems, drawEnemies, drawGlows, drawRelics, drawShelfRelics, drawGlobs, drawPeople, wearLook } from './sprites.js';
import { drawLight, flicker } from './light.js';
import { drawBeam, BEAM_MS } from './beam.js';
import { drawKindle, drawRing } from './kindle.js';
import { drawChips, drawSpark } from './stuck.js';
import { drawCrumble } from './crumble.js';
import { running, sameKey, holdsRoom } from './hold.js';
import { drawBrackets, torchLights, drawFlames } from './torches.js';
import { drawMotes } from './motes.js';
import { draftTo, stayingMotes } from '../core/draft.js';
import { drawStatus } from './hud.js';
import { shareLeft } from '../core/lasting.js';
import { drawMarks, marksSize, markAt, MARK, MARK_GAP, POISON_MARK, STIFF_MARK, WARM_MARK, GLOW_MARK, SLOW_MARK, MEND_MARK, WARD_MARK, SPIT_MARK, SHADE_MARK } from './marks.js';
import { drawGoalLine, goalSize, onGoal } from './goalline.js';
import { goalLine } from '../core/goals.js';
import { lineTop, createLineClock } from './textline.js';
import { createBossBar, barBox } from './bossbar.js';
import { bossFight } from '../core/beaten.js';
import { drawCreatureList, plaqueAt, plaquesShown, PLAQUE_W, PLAQUE_H } from './creatures.js';
import { drawFramed } from './framed.js';
import { drawMoves, drawStrikes, drawPiles } from './moves.js';
import { struck } from '../core/sting.js';
import { litAt, runesSeen } from '../core/sight.js';
import { drawRunes } from './runes.js';
import { echoed } from '../core/echo.js';
import { drawEchoes } from './echo.js';
import { canSleepOut } from '../core/sleepout.js';
import { VEIL } from './menu.js';
import { get } from '../core/registry.js';
import { boonOf, lanternReach, offersBoons } from '../core/boon.js';
import { padShown, marksShown } from '../core/settings.js';
import { jabAt } from './jab.js';
import { drawMark, drawDots, drawAlert, drawGain } from './walk.js';
import { drawFloat, drawBite } from './float.js';
import { drawDoors } from './doors.js';
import { LANTERN, LANTERN_AT } from '../core/light.js';
import { flasksIn } from '../core/bag.js';
import { maxHealth, DIRS, creatureList } from '../core/turn.js';
import { drawFires, drawCalls } from './campfire.js';
import { depthOf } from '../core/room.js';
import { glowsIn } from '../core/stairs.js';
import { KIND_LOOKS } from './boons.js';
import { shownLine } from '../core/lines.js';
import { levelOf } from '../core/xp.js';
import { daylight, darkNow } from '../core/daytime.js';
import { mouthLight, mouthOf } from '../core/mouth.js';
import { cameraAt } from '../core/camera.js';
import { playing } from '../core/profile.js';
import { cloakOf, eyesOf, trimOf, clothesOf, lampOf, headOf } from '../core/looks.js';
import { doorways, widen } from '../core/openings.js';
import { watch, onWipe, onCheck, blankAt } from './wipe.js';
import { createCards } from './cards.js';

export const FADE_MS = 200; // each way, taking stairs (D-135)

const DRINK_BLINK_MS = 140; // each pale or dark beat of the oil bar's flicker (D-606)
const POISON_BLINK_MS = 150; // each green or empty beat of the heart poison takes (D-654)
// 0 before a, 1 after b, and evenly between; a jump at a when b is not after it
// § leap's hop (D-962): pixels the hero is lifted, highest halfway along a leap's 2 tiles; 0 off one
const LEAP_HIGH = 7;
const leapLift = (arc, shown) => (arc ? Math.round(LEAP_HIGH * Math.sin(Math.PI * (1 - (Math.abs(arc.to.x - shown.x) + Math.abs(arc.to.y - shown.y)) / 2))) : 0);
const ramp = (t, a, b) => (b <= a ? (t >= a ? 1 : 0) : Math.min(1, Math.max(0, (t - a) / (b - a))));

// § panel's fade: how see-through the corner panel and the plaques under it
// get while the hero, or a creature next to them, is under them (D-380), and how fast
const UNDER_ALPHA = 0.25, FADE_PANEL_MS = 150;

// Screens over play that dim the room around them; the cards (the bag's, the workbench's, the stash chest's, the pause menu's) and placing a workbench leave it clear
const CLEAR_OVER = new Set(['play', 'map', 'bag', 'make', 'bench', 'chest', 'trade', 'place', 'paused', 'settings', 'howto', 'journal', 'history', 'seed', 'ways', 'easier', 'bed', 'sleepOut', 'travel', 'boons', 'strike', 'opening', 'aboutBoons']);
const CARDS = new Set(['bag', 'make', 'bench', 'chest', 'trade', 'paused', 'settings', 'howto', 'journal', 'history', 'seed', 'map', 'ways', 'easier', 'bed', 'sleepOut', 'travel', 'boons', 'strike', 'opening', 'aboutBoons']); // drawn on the room, the text line over them (D-385, D-387); none over the pause, settings, how to play, journal, version history, seed, map and way to play cards and the ask (D-388 to D-391, D-393 to D-396, D-400)
// The moon button's ask, worked out once a state, not each frame (D-758)
let sleepFor = null, sleepOk = false;
const sleepsOut = (s) => { if (s !== sleepFor) { sleepFor = s; sleepOk = canSleepOut(s); } return sleepOk; };

// `ui`: the canvases (the menus' picture, the creature list's row, the room filling the screen behind them,
// D-381, and the screen layer over the room, D-444), the text line, the spoken line, the lantern, pause and bag buttons, the round map (D-383), the dev tools, the screens, and still() and foeAt(e) from main.js.

export function createFrame(app, ui) {
  const { ctx, listCtx, roomCtx: rc, hudCtx: hc, canvas, textLine, spoken, lanternButton, pauseButton, mapButton, bagButton, arrowPad, quickSlot, sleepButton, boonButton, leapButton, dev, screens, still, foeAt } = ui;
  const cards = createCards(app, ui); // the title's screens and the cards over play (H-99)
  // The room is drawn onto a hidden canvas, again only when it changes (a dev spawn),
  // as big as the whole room; the camera shows the screen's part of it (D-195).
  const base = document.createElement('canvas');
  let drawnRoom = null, doors = []; // the room drawn into `base`, and its doorways (D-225)
  // Past a small room's edge its rock or trees go on (D-403): drawn onto `around`, mx tiles
  // past the sides and my past the top and bottom, enough to reach the screen's edges
  const around = document.createElement('canvas');
  watch(base); watch(around);
  const lineClock = createLineClock(); // the line's seconds (B-009)
  const bossBar = createBossBar(); // the Lampeater's name and hearts (D-959)
  let heldKey = null; // what the room under a card was last drawn from (S3, D-686)
  onWipe(() => { drawnRoom = null; heldKey = null; }); // both drawn again on the next frame (D-588)
  onCheck(() => drawnRoom !== null && blankAt(base, 0, 0));
  let wide = null, mx = 0, my = 0;
  const past = (size, shown) => Math.ceil(Math.max(0, shown - size * TILE) / 2 / TILE) + 2; // + 2 covers the camera's margin (D-441)
  const lights = [], torchGlow = []; // reused every frame (TECH.md)
  let listFor = null, listed = [], joined = 0; // the creature list, worked out again only when the state changes
  let markRow = null; // the marks as last drawn, for taps (D-604)
  let goalRow = null; // the goal line as last drawn, for taps (D-706)
  // § goal's room (D-743): how wide the goal line's glass may be from ex, so it ends left of the
  // round map and the buttons by it while level with them, and inside the screen
  const GOAL_DOWN = 48; // the most the goal line reaches down, four lines of words
  function goalRoom(ex, goalY, down = GOAL_DOWN) {
    let right = view.w - ex;
    for (const b of [mapButton, pauseButton, dev.wrench]) {
      const a = b.area();
      if (a.w && a.y < goalY + down && a.y + a.h > goalY) right = Math.min(right, Math.floor(a.x) - 2);
    }
    return Math.max(60, right - ex);
  }
  const MARKS_DOWN = 2 * MARK + MARK_GAP; // the marks' rows kept clear of the round map the same way, two rows (H-55)
  let row = null; // the list as last drawn: its entries in order and where they sit, for taps (CL2)
  let panel = { w: 0, h: 0, alpha: 1, t: 0 }; // the corner panel as last drawn, and its fade (D-380)
  let cover = { x: 0, y: 0 }; // what the dev sheet hides, eased so the room slides clear of it (D-623)
  let roundAlpha = 1, lanternAlpha = 1, padAlpha = 1; // the top right corner's fade (D-383, D-442), the bottom right's (D-442), and the arrow pad's (D-406)

  // § creature list's order: newest last (D-357). Each creature keeps the place it
  // got when it joined, on its shown spot (main.js); one that leaves the list loses it.
  function creaturesListed(s) {
    if (s !== listFor) { listFor = s; listed = creatureList(s); }
    const on = new Set(listed.map((a) => a.e));
    for (const e of s.enemies) if (!on.has(e)) delete foeAt(e).joined;
    for (const a of listed) { const p = foeAt(a.e); if (p.joined === undefined) p.joined = joined++; }
    if (app.framed && !listed.some((a) => foeAt(a.e) === app.framed)) app.framed = null; // the frame goes with its plaque (CL2)
    const sorted = listed.slice().sort((a, b) => foeAt(a.e).joined - foeAt(b.e).joined);
    return marksShown(app.settings) ? sorted : sorted.map((a) => ({ ...a, move: null })); // Attack marks off: no next move shows (D-730)
  }

  // § rise (D-957): the sealed door rising out of the floor of the way in, k of it shown: the
  // floor, then the door's top part from the room's own picture, standing on the tile's foot
  function drawRise({ x, y }, k) {
    drawFloor(rc, drawnRoom, x, y);
    const h = Math.round(TILE * k);
    if (h > 0) rc.drawImage(base, x * TILE, y * TILE, TILE, h, x * TILE, y * TILE + TILE - h, TILE, h);
  }
  // § bars (D-957): the cutscene's black bars, k of the way in, top and bottom, an eighth of the screen each
  function drawBars(k) {
    const h = Math.round(view.h / 8 * k);
    hc.fillStyle = '#000000';
    hc.fillRect(0, 0, view.w, h); hc.fillRect(0, view.h - h, view.w, h);
  }
  // Draws in room pixels, moved by the camera
  function inRoom(draw) {
    rc.save();
    rc.translate(-app.cam.x, -app.cam.y);
    draw();
    rc.restore();
  }

  // § veil around: a menu over play dims its own picture (menu.js); the room
  // around the picture gets the same veil, so the whole screen dims once (D-381)
  function veilAround() {
    const r = canvas.getBoundingClientRect(), b = hc.canvas.getBoundingClientRect();
    const k = hc.canvas.width / b.width, x = (r.left - b.left) * k, y = (r.top - b.top) * k;
    hc.save();
    hc.beginPath(); hc.rect(0, 0, view.w, view.h); hc.rect(x, y, r.width * k, r.height * k); hc.clip('evenodd');
    hc.globalAlpha = VEIL; hc.fillStyle = '#0e0c16'; hc.fillRect(0, 0, view.w, view.h);
    hc.restore();
  }

  // (x, y, size) in the room canvas's pixels → [x, y, size] in the screen layer's (D-444)
  function onLayer(x, y, size) {
    const r = rc.canvas.getBoundingClientRect(), b = hc.canvas.getBoundingClientRect();
    const z = r.width / rc.canvas.width * (hc.canvas.width / b.width), k = hc.canvas.width / b.width;
    return [(r.left - b.left) * k + x * z, (r.top - b.top) * k + y * z, size * z];
  }


  function draw(t) {
    listCtx.fillStyle = '#0e0c16'; listCtx.fillRect(0, 0, listCtx.canvas.width, listCtx.canvas.height); // the list's row stays empty
    const p = playing(app.profiles);
    wearLook(cloakOf(p), eyesOf(p), trimOf(p), clothesOf(p), lampOf(p), headOf(p)); // the profile in play's look, on the title and in play (P3 to P6, D-702, D-703)
    const onTitle = screens.onTitle();
    fitTitle(onTitle); // the title's scene fills the screen at the picture's zoom
    fitCards(CARDS.has(app.screen)); // a card on a squarer screen or an upright tablet drawn smaller, so it fits (D-671, D-681)
    hc.clearRect(0, 0, view.w, view.h); // the screen layer, see-through but for what is drawn on it below
    if (onTitle) { arrowPad.show(false, 1); rc.fillStyle = '#0e0c16'; rc.fillRect(0, 0, view.w, view.h); ctx.clearRect(0, 0, W, SCREEN_H); cards.onTitleScreens(t); return; }
    ctx.clearRect(0, 0, W, SCREEN_H); // see-through over the room, but for a menu
    const { state, shown, nudge, hit, jab, bitten, travel, fall, walk } = app;
    const s = travel?.from || fall?.from || state;
    let nx = 0, ny = 0;
    if (nudge && t < nudge.until && !still()) { nx = nudge.dx; ny = nudge.dy; }
    if (jab && !still()) { const j = jabAt(jab, t); nx += j.x; ny += j.y; } // the knife's stab (D-253)
    const cut = app.cutscene && !travel && !fall ? shotAt(app.cutscene, t, still(), shown) : null; // the Lampeater's cutscene (Q-112, D-957)
    setCloseUp(cut?.close ?? 0); // zoomed in while it plays
    fitRoomSize(s.room.cols, s.room.rows, !still()); // a narrow (upright: short) room zooms in to fill the long side, with a margin (D-441), gliding there (D-448)
    if (s.room !== drawnRoom) {
      drawnRoom = s.room; doors = doorways(s.place, s.room, s.seed);
      base.width = drawnRoom.cols * TILE; base.height = drawnRoom.rows * TILE;
      drawRoom(base.getContext('2d'), drawnRoom, mouthOf(s.seed).look);
      wide = widen(drawnRoom, doors); mx = my = 0;
    }
    if (past(wide.cols, roomView.w) > mx || past(wide.rows, roomView.h) > my) { // a new room, or a wider screen
      mx = past(wide.cols, roomView.w); my = past(wide.rows, roomView.h);
      around.width = (wide.cols + 2 * mx) * TILE; around.height = (wide.rows + 2 * my) * TILE;
      drawBeyond(around.getContext('2d'), wide, mx, my);
    }
    // § fall: the hero lies down, the light closes to the deepest dark, then opens where they wake (D-234)
    const lying = !!fall?.from && t >= fall.lieAt;
    const dark = !fall ? 0 : fall.from ? ramp(t, fall.lieAt, fall.darkAt) : 1 - ramp(t, fall.mid, fall.end);
    // § camera: centred on the sliding hero, a bump's nudge left out (D-195)
    const list = travel || fall ? null : creaturesListed(s); // none while taking stairs or falling
    const sx = Math.round(shown.x * TILE), sy = Math.round(shown.y * TILE);
    const hid = dev.cover(), ease = (a, b) => (still() || Math.abs(b - a) < 0.5 ? b : a + (b - a) * 0.3);
    cover = { x: ease(cover.x, hid.x), y: ease(cover.y, hid.y) };
    const [fx, fy] = cut ? [Math.round(cut.focus.x * TILE), Math.round(cut.focus.y * TILE)] : [sx, sy]; // in the cutscene, on its shot (D-957)
    const edged = cameraAt(fx, fy, s.room, roomView.w, roomView.h, cover); // clear of the dev sheet (D-623)
    const free = (p, view, k) => Math.round(k + (p + TILE / 2 - view / 2 - k) * cut.close); // zoomed in, its shot in the middle, past the room's edge if need be
    const cam = app.cam = cut ? { x: free(fx, roomView.w, edged.x), y: free(fy, roomView.h, edged.y) } : edged;
    // § hold (S3, D-686): under a card, once nothing in the room moves, its picture is kept;
    // in play too with reduced motion, until a step, a walk's dots, a frame or a mark changes (D-687)
    const slid = shown.x === s.hero.x && shown.y === s.hero.y && s.enemies.every((e) => { const p = foeAt(e); return p.x === e.x && p.y === e.y; });
    const holds = holdsRoom(app.screen, CARDS.has(app.screen), still());
    const key = holds && slid && !running(app, t, BEAM_MS) ? [state, s.room, app.settings, roomView.w, roomView.h, rc.canvas.width, rc.canvas.height, cam.x, cam.y, dev.revealed(), dev.lightOff(), still(), app.screen, walk, walk?.way, app.framed, app.setting] : null;
    const kept = sameKey(key, heldKey);
    heldKey = key;
    if (!kept) {
      rc.fillStyle = '#0e0c16'; rc.fillRect(0, 0, roomView.w, roomView.h); // the deepest dark, only past what `around` holds
      rc.drawImage(around, -cam.x - mx * TILE, -cam.y - my * TILE);
      rc.drawImage(base, -cam.x, -cam.y);
      inRoom(() => {
        if (rising(app.rise, t)) drawRise(app.rise, risenAt(app.rise, t)); // the sealed door rising out of the floor (D-957)
        drawBrackets(rc, s.room, s.lights);
        const lit = s.lit && !dev.lightOff() && !lying; // the lantern's light on a pool below it (D-500)
        drawRipples(rc, s.room, t, still(), lit ? { x: sx + nx + LANTERN_AT.x, y: sy + ny + 14 } : null);
        drawFloat(rc, s.float, t, still()); // the line's float on the pond, bobbing (D-610)
        drawRoosts(rc, s.room, t, still()); // a tree with a flyer in it shakes now and then (D-922)
        drawKindle(rc, app.kindle, t); // the woken rune lighting bottom up (D-591)
        if (!still()) drawCrumble(rc, app.quake, s.room, t); // the seal stones crack, then fall into the Gap (D-965)
        drawItems(rc, s.items, t, still());
        const beaming = app.beam?.arriving && t < app.beam.start + BEAM_MS ? app.beam.id : null; // hidden until beamed in
        drawPeople(rc, (s.people || []).filter((p) => p.id !== beaming), s.hero); // forward, or turned to face the hero near (D-490, D-501)
        drawBeam(rc, app.beam, s.hero, t); // a freed person beamed home, or beamed in at home (D-496)
        const lift = leapLift(app.leapArc, shown); // a leap's hop, its shadow left on the ground (D-962)
        if (lift) { rc.fillStyle = 'rgba(0,0,0,.35)'; rc.fillRect(sx + nx + 4, sy + ny + 14, 8, 2); }
        drawHero(rc, sx + nx, sy + ny - lift, !!bitten && t < bitten.until, lying);
        // § enemies: shaded by the light like the floor, so seen in memory's dim light too (D-153)
        drawEnemies(rc, s.enemies, t, still(), hit && t < hit.until ? hit.enemies : [], foeAt, s.hero, app.sunk, app.crawl); // a snapcap opens beside the hero (D-543); a warden's fists sink with a jolt (D-937); gloamlings rise from a snuffed bowl (D-949)
        drawChips(rc, app.sunk, t); drawSpark(rc, app.spark, t); // its stone chips, and a blow that rang off its stone (D-937)
      });
      // Full daylight needs no lantern (D-025, D-209); dusk dims the sky and the lights show more (D-217)
      const sun = s.room.dark.sky ? daylight(s.turn) : 0, lightOn = !dev.lightOff() && sun < 1;
      // § light: the lantern's flame is the light's centre, oil sets its reach (D-053 to D-056, D-064).
      // Switched off, the lantern gives no light: only torchlight and remembered tiles show (D-082, D-101).
      const lx = sx + nx + LANTERN_AT.x, ly = sy + ny - 2 + LANTERN_AT.y;
      if (lightOn) {
        const r = s.lit ? lanternReach(s) * (still() ? 1 : flicker(t, 1.7, 0.035)) * (1 - dark) : 0;
        lights[0] = { ...LANTERN, x: lx, y: ly, r };
        lights.length = 1;
        lights.push(...torchLights(s.room, s.lights, t, still(), torchGlow), ...glowsIn(s.room, dev.revealed() ? null : s.seen));
        const sunIn = mouthLight(s); // daylight through the cave mouth, steady, no flicker (D-218)
        if (sunIn) lights.push(sunIn);
        drawLight(rc, wide, lights, dev.revealed() ? null : s.seen, cam, darkNow(s.room, s.turn), 1 - sun);
      }
      inRoom(() => {
        drawFlames(rc, s.room, s.lights, t, still());
        drawFires(rc, s.room, t, still(), s.enemies.filter((e) => e.breath).map((e) => e.breath), s.enemies.filter((e) => e.snuffed && s.turn - e.snuffed.turn < 2).map((e) => e.snuffed)); // a burning campfire's flames and coals (D-757); a brazier breathed on, or just snuffed (D-947)
        drawCalls(rc, s.enemies.filter((e) => e.call).map((e) => e.call), t, still()); // a cold brazier the Lampeater calls from (D-974)
        drawGlows(rc, s.enemies, t, still(), hit && t < hit.until ? hit.enemies : [], foeAt, (e) => !!get(e.id)?.burns && litAt(s, e.x, e.y), cut && ((e) => (e.id === 'lampeater' ? cut : null))); // the lure wisp's own glow, seen in the dark (D-649); the Lampeater burning in light (D-944)
        if (lightOn) drawEchoes(rc, echoed(s), t, still(), foeAt); // the Echo Charm's pale outlines, near creatures in the dark (D-805)
        drawRelics(rc, s.items, t, still()); // a relic's own violet glow, seen in the dark (D-692)
        drawShelfRelics(rc, s.room, t, still()); // and a relic's on the shelf (D-693)
        if (runesSeen(s)) drawRunes(rc, s.room.runes, t, still()); // the rune wall's runes, seen in the dark (D-928)
        drawGlobs(rc, s.globs, t, still()); // the Spit grub's globs in flight, seen in the dark (D-688)
        if (marksShown(app.settings)) { // Attack marks (D-730)
          drawMoves(rc, (s.globs ?? []).map((g) => ({ e: g, kind: 'step', dx: g.dx, dy: g.dy })), (g) => g, t, still()); // each glob's next tile (D-688)
          drawStrikes(rc, s.enemies.flatMap((e) => struck(s, e)), t, still()); // the tiles a raised tail will strike (D-729)
          drawPiles(rc, s.enemies.filter((e) => e.pile && litAt(s, e.x, e.y)), t, still()); // a lit pile of bones' turns left (D-731)
        }
        const motesOn = lightOn && s.lit && !lying && !travel && !fall && !dev.revealed();
        drawMotes(rc, motesOn ? draftTo(s) : null, lx, ly, lights[0]?.r || 0, still(), motesOn ? stayingMotes(s) : 0); // a draft toward the stairs down not yet seen, then a few that stay (D-581, D-605, D-755)
        drawRing(rc, app.kindle, t); // and its ring, over the light (D-591)
        if (s.lit && !lying) { rc.fillStyle = '#fff5d6'; rc.fillRect(lx, ly, 1, 1); } // the lit flame's core is always bright (study line 446)
        drawDoors(rc, doors, dev.revealed() ? null : s.seen, s.room.cols, t, still()); // over the light, so remembered ones show (D-225)
        const framed = list?.find((a) => foeAt(a.e) === app.framed);
        if (framed) drawFramed(rc, framed, foeAt(framed.e), cam, t, still()); // CL2, D-357
        if (walk && !travel) { drawDots(rc, walk.way, walk.tx, walk.ty); drawMark(rc, walk.tx, walk.ty, t, still()); } // the walk to a tapped tile (D-406)
        if (app.screen === 'place') for (const d of app.setting.sides) drawMark(rc, state.hero.x + DIRS[d][0], state.hero.y + DIRS[d][1], t, still()); // where the workbench or stash chest can go (WB2, CH2)
        drawBite(rc, s.float); // a fish on the line: the "!" over its float (D-610)
        if (t < app.alertUntil) drawAlert(rc, sx + nx, sy + ny);
        else if (app.gain && !fall) drawGain(rc, app.gain.n, sx + nx, sy + ny, t, Math.max(app.gain.at, app.alertUntil), still(), app.gain.heart); // the Fang Charm's heart beside it (D-809) // after a "!", not over it
      });
      // § shake: the room jumps a pixel left and right after a hit; none with reduced motion (study line 432, D-105)
      // A bite shakes it the same way (D-118), and the floor giving way, for longer (D-964).
      if (((hit && t < hit.shakeUntil) || (bitten && t < bitten.shakeUntil) || (app.quake && t < app.quake.shakeUntil)) && !still()) {
        const jx = Math.floor(t / 30) % 2 ? 1 : -1;
        rc.drawImage(rc.canvas, jx, 0);
        rc.fillStyle = '#0e0c16'; rc.fillRect(jx > 0 ? 0 : roomView.w - 1, 0, 1, roomView.h);
      }
      // Taking stairs, the room dims to the deepest dark and back (D-135); a fall closes it the same way; the hearts and oil stay
      const dim = travel ? Math.max(0, 1 - Math.abs(t - travel.mid) / FADE_MS) : dark;
      if (dim > 0) {
        rc.globalAlpha = dim;
        rc.fillStyle = '#0e0c16'; rc.fillRect(0, 0, roomView.w, roomView.h);
        rc.globalAlpha = 1;
      }
    }
    // § panel: the hearts, oil, depth and level on glass over the room's top left (D-378),
    // the creature list under it (D-357); both fade while the hero or a creature beside them is under them (D-380)
    const n = list ? list.length : 0; // the panel's size is last frame's, near enough
    const [ex, ey] = edgeIn(); // as far in as the round buttons (D-512)
    const end = lineTop() - 2; // the creature list stops above the text line (D-381), upright raised (D-505)
    const held = boonOf(state), marks = held ? [{ ...KIND_LOOKS[held.sort], id: held.id }] : []; // the boon held, its card's picture (D-604)
    if (state.poisoned > 0) marks.push({ ...POISON_MARK, left: shareLeft(state, 'poisoned') }); // poisoned beside it, a green drop on red glass, its time on the rim (D-848, D-654)
    if (state.stiff > 0) marks.push({ ...STIFF_MARK, left: shareLeft(state, 'stiff') }); // stiff after it, a pale blue Zz on red glass, its time on the rim (D-848, D-759)
    if (state.warmed > 0) marks.push({ ...WARM_MARK, left: shareLeft(state, 'warmed') }); // Warmed, a campfire's orange flame and its time on the rim (D-847, D-845)
    if (state.glow > 0) marks.push({ ...GLOW_MARK, left: shareLeft(state, 'glow') }); // the Glow Draught, a gold bottle and its time on the rim (D-847, D-791)
    if (state.slowburn > 0) marks.push({ ...SLOW_MARK, left: shareLeft(state, 'slowburn') }); // Slowburn, an amber bottle and its time on the rim (D-847, D-792)
    if (state.mending > 0) marks.push({ ...MEND_MARK, left: shareLeft(state, 'mending') }); // the Mending Draught, a moss green bottle and its time on the rim (D-847, D-794)
    if (state.ward > 0) marks.push({ ...WARD_MARK, left: shareLeft(state, 'ward') }); // the Ward Draught, a pale green-white bottle and its time on the rim (D-847, D-795)
    if (state.spitproof > 0) marks.push({ ...SPIT_MARK, left: shareLeft(state, 'spitproof') }); // the Spitproof Draught, a dusty rose bottle and its time on the rim (D-847, D-802)
    if (state.shade > 0) marks.push({ ...SHADE_MARK, left: shareLeft(state, 'shade') }); // the Shade Draught last, a dusky violet bottle and its time on the rim (D-847, D-806)
    const pr = app.profiles.current === null ? null : playing(app.profiles), goal = fall?.from || !pr ? null : goalLine(pr.goals, app.goalGold, state.turn, state.place, state); // the teaching goal (D-706)
    const markY = ey + panel.h + 2, markRoom = goalRoom(ex, markY, MARKS_DOWN), mk = marksSize(marks, markRoom), goalY = markY + (mk.h ? mk.h + 2 : 0); // a second row rather than under the round map (H-55)
    const goalW = goalRoom(ex, goalY), gl = goalSize(goal, goalW);
    const listY = goalY + (gl.h ? gl.h + 2 : 0); // the marks under the panel, the goal line under them, the list under it
    const shownN = plaquesShown(n, ex, listY, false, end), more = shownN < n ? 1 : 0;
    const under = { w: Math.max(panel.w, mk.w, gl.w, n ? PLAQUE_W : 0), h: listY - ey + (shownN + more) * (PLAQUE_H + 2) };
    const hx = s.hero.x, hy = s.hero.y;
    const spots = [[sx, sy], ...s.enemies.filter((e) => Math.max(Math.abs(e.x - hx), Math.abs(e.y - hy)) <= 1).map((e) => { const p = foeAt(e); return [Math.round(p.x * TILE), Math.round(p.y * TILE)]; })];
    const covers = (a) => spots.some(([px, py]) => { // on the screen layer, where the panel and the corner pieces are (D-444)
      const [x, y, size] = onLayer(px - cam.x, py - cam.y, TILE);
      return x < a.x + a.w && x + size > a.x && y < a.y + a.h && y + size > a.y;
    });
    const dt = Math.max(0, t - panel.t), fade = (alpha, goal) => (still() ? goal : alpha + Math.sign(goal - alpha) * Math.min(Math.abs(goal - alpha), dt / FADE_PANEL_MS));
    const aim = (under) => (cut?.bars > 0 ? 0 : under ? UNDER_ALPHA : 1); // all gone in the cutscene, back as it zooms out (D-957)
    panel.alpha = fade(panel.alpha, aim(covers({ x: ex, y: ey, ...under })));
    panel.t = t;
    // § round map: the floor around the hero, top right, fading the same way (D-383), and
    // pause and the wrench with it, the corner as one piece (D-442)
    const high = [mapButton, pauseButton, dev.wrench];
    roundAlpha = app.screen === 'play' ? fade(roundAlpha, aim(high.some((b) => covers(b.area())))) : 1;
    mapButton.show(s, dev.revealedMap(), t, still(), roundAlpha);
    pauseButton.fade(roundAlpha); dev.wrench.fade(roundAlpha);
    // § round lantern: bottom right, with the bag and the quick slot on its arc, one piece fading the same way (D-442)
    const low = [lanternButton, bagButton, quickSlot, sleepButton, boonButton, leapButton];
    lanternAlpha = app.screen === 'play' ? fade(lanternAlpha, aim(low.some((b) => covers(b.area())))) : 1;
    for (const b of low) b.fade(lanternAlpha);
    // § arrow pad: bottom left, in play with its switch on, fading the same way (D-406)
    const padOn = app.screen === 'play' && padShown(app.settings);
    padAlpha = padOn ? fade(padAlpha, aim(covers(arrowPad.area()))) : 1;
    arrowPad.show(padOn, padAlpha);
    const greenHeart = app.poisonHurt && t < app.poisonHurt.until && (still() || Math.floor((app.poisonHurt.until - t) / POISON_BLINK_MS) % 2 === 0) ? app.poisonHurt.heart : -1; // the heart poison takes flashes green (D-654)
    const sipped = !!app.drunk && t < app.drunk.until && (still() || Math.floor((app.drunk.until - t) / DRINK_BLINK_MS) % 2 === 0); // the oil bar flickers as a creature drinks, steady with reduced motion (D-606)
    Object.assign(panel, drawStatus(hc, { oil: s.oil, health: s.health, max: maxHealth(state), depth: depthOf(s.place), level: levelOf(s.xp ?? state.xp), sipped, greenHeart }, ex, ey, panel.alpha)); // the fall's picture keeps no xp, and a fall keeps it all (D-245)
    drawMarks(hc, marks, ex, markY, panel.alpha, markRoom);
    markRow = { ids: marks.map((m) => m.id), marks, x: ex, y: markY, room: markRoom }; // for taps and the mouse (D-604)
    drawGoalLine(hc, goal, ex, goalY, panel.alpha, goalW);
    goalRow = goal && { line: goal, x: ex, y: goalY, w: goalW }; // for taps (D-706)
    row = null;
    if (list) {
      const isFramed = (e) => foeAt(e) === app.framed;
      row = { list, x: ex, y: listY, across: false, end }; // where the list sits, in the screen layer's pixels (D-444)
      hc.save(); hc.globalAlpha = panel.alpha;
      drawCreatureList(hc, list, row.x, row.y, row.across, row.end, isFramed);
      hc.restore();
    }
    const line = fall?.from || cut ? null : lineClock(shownLine(state), state.line, t); // the fall's line once the hero wakes, the cutscene's once it ends (D-957); gone after its turns or its seconds (B-009)
    if (cut?.bars) drawBars(cut.bars); // the cutscene's black bars, the line over them (D-957)
    if (!CARDS.has(app.screen) && !cut) bossBar.draw(hc, fall || travel ? null : bossFight(state), state.events, t, still(), covers(barBox()) ? UNDER_ALPHA : 1); // the Lampeater's name and hearts, from the cutscene's end, faint over the hero (D-957, D-959)
    const [heroX, heroY, heroSize] = onLayer(sx - cam.x, sy - cam.y, TILE);
    if (!CARDS.has(app.screen)) textLine.draw(hc, line, t, still(), { x: heroX, y: heroY, size: heroSize }); // over a card instead, below; above the hero, not over it (H-75)
    if (line !== app.spokenLine) { app.spokenLine = line; if (line) spoken.textContent = line.text; }
    lanternButton.show(state.lit); quickSlot.show(flasksIn(state.bag), state.float); sleepButton.show(app.screen === 'play' && !fall && sleepsOut(app.state)); boonButton.show(app.screen === 'play' && !fall && !!app.boonHere && offersBoons(app.state)); leapButton.show(app.screen === 'play' && !fall && !!app.state.leap, !!app.leapReady); // Leap learnt on this journey (D-962) // the rune on the home plate after arriving (B-007) // the moon outside at night (D-758) // WAIT or PULL while a line is out (D-612)
    if (!CLEAR_OVER.has(app.screen)) veilAround();
    cards.overPlay(state, line, t, cam);
  }

  // A new journey draws its room afresh
  const redraw = () => { drawnRoom = null; };
  // § plaques for taps (CL2): the shown spot (main.js) of the creature whose plaque is under
  // px, py, in the screen layer's pixels (D-444); the list's spots in order; or null and [] with no list
  function plaqueSpot(px, py) {
    if (!row) return null;
    const i = plaqueAt(row.list.length, row.x, row.y, row.across, row.end, px, py);
    return i < 0 ? null : foeAt(row.list[i].e);
  }
  // § marks for taps (D-604): the id of the boon (or 'poisoned', D-654, or 'stiff', D-759) whose mark is under px, py on the screen layer, or null
  const markSpot = (px, py) => (markRow && app.screen === 'play' ? markRow.ids[markAt(markRow.marks, markRow.x, markRow.y, px, py, markRow.room)] ?? null : null);
  // § goal line for taps (D-706): whether the goal line is under px, py on the screen layer, in play
  const goalSpot = (px, py) => !!goalRow && app.screen === 'play' && onGoal(goalRow.line, goalRow.x, goalRow.y, px, py, goalRow.w);
  const plaqueSpots = () => (row ? row.list.slice(0, plaquesShown(row.list.length, row.x, row.y, row.across, row.end)).map((a) => foeAt(a.e)) : []);
  return { draw, redraw, plaqueSpot, plaqueSpots, markSpot, goalSpot };
}
