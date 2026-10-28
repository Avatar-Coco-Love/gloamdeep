// § frame: draws one frame of play, or the title and its screens, from `app`
// (split from main.js, D-235). It changes nothing in the game; main.js moves
// the shown hero and enemies and takes the turns before each frame.
import { TILE, W, SCREEN_H, view, fitTitle } from './screen.js';
import { drawRoom } from './tiles.js';
import { drawHero, drawItems, drawEnemies, spriteOf, wearLook, heroIn } from './sprites.js';
import { drawLight, flicker } from './light.js';
import { drawBrackets, torchLights, drawFlames } from './torches.js';
import { drawStatus } from './hud.js';
import { LINE_UP } from './textline.js';
import { drawCreatureList, plaqueAt, plaquesShown, PLAQUE_W, PLAQUE_H } from './creatures.js';
import { drawFramed } from './framed.js';
import { drawTitle, drawScene } from './title.js';
import { drawPause, VEIL } from './menu.js';
import { drawSeedCard } from './seedpad.js';
import { drawNamePad } from './namepad.js';
import { drawHowTo } from './howto.js';
import { drawHistory } from './history.js';
import { drawJournal } from './journal.js';
import { drawSlots, drawAsk } from './slots.js';
import { drawCloaks, drawEyes, drawTrims, drawClothes } from './cloak.js';
import { drawMap } from './map.js';
import { drawBag } from './bag.js';
import { drawBenchPanel } from './benchpanel.js';
import { drawChestPanel } from './chestpanel.js';
import { drawPauseCard } from './pausecard.js';
import { drawSettingsCard } from './settingscard.js';
import { drawWays } from './ways.js';
import { stashAt } from '../core/chest.js';
import { jabAt } from './jab.js';
import { drawMark, drawAlert, drawGain } from './walk.js';
import { drawDoors } from './doors.js';
import { LANTERN, LANTERN_AT } from '../core/light.js';
import { flasksIn } from '../core/bag.js';
import { reach } from '../core/oil.js';
import { maxHealth, DIRS, creatureList } from '../core/turn.js';
import { glowsIn } from '../core/stairs.js';
import { depthOf } from '../core/room.js';
import { shownLine } from '../core/lines.js';
import { levelOf } from '../core/xp.js';
import { daylight, darkNow } from '../core/daytime.js';
import { shownSeed, canGoBack } from '../core/explorer.js';
import { mouthLight } from '../core/mouth.js';
import { cameraAt } from '../core/camera.js';
import { playing, slotName } from '../core/profile.js';
import { cloakOf, eyesOf, trimOf, clothesOf } from '../core/looks.js';
import { PAUSE_MENU, pauseFacts, benchMakes, SURE_MENU, SURE_HEADING, SURE_NOTE, DROP_NOTE, ENDED_MENU, ENDED_HEADING, EASE_NOTE, easeHeading } from '../core/menu.js';
import { doorways } from '../core/openings.js';

export const FADE_MS = 200; // each way, taking stairs (D-135)

// 0 before a, 1 after b, and evenly between; a jump at a when b is not after it
const ramp = (t, a, b) => (b <= a ? (t >= a ? 1 : 0) : Math.min(1, Math.max(0, (t - a) / (b - a))));

// § panel's fade: how see-through the corner panel and the plaques under it
// get while the hero, or a creature next to them, is under them (D-380), and how fast
const UNDER_ALPHA = 0.25, FADE_PANEL_MS = 150;

// Screens over play that dim the room around them; the cards (the bag's, the workbench's, the stash chest's, the pause menu's) and placing a workbench leave it clear
const CLEAR_OVER = new Set(['play', 'map', 'bag', 'bench', 'chest', 'place', 'paused', 'settings', 'howto', 'journal', 'history', 'seed', 'ways']);
const CARDS = new Set(['bag', 'bench', 'chest', 'paused', 'settings', 'howto', 'journal', 'history', 'seed', 'map', 'ways']); // drawn on the room, the text line over them (D-385, D-387); none over the pause, settings, how to play, journal, version history, seed, map and way to play cards (D-388 to D-391, D-393 to D-396)

// `ui`: the canvases (the menus' picture, the creature list's row, and the room filling the screen behind them,
// D-381), the text line, the spoken line, the lantern button, the round map (D-383), the dev tools, the screens, and still() and foeAt(e) from main.js.
export function createFrame(app, ui) {
  const { ctx, listCtx, roomCtx: rc, canvas, textLine, spoken, lanternButton, mapButton, quickSlot, dev, screens, still, foeAt } = ui;
  // The room is drawn onto a hidden canvas, again only when it changes (a dev spawn),
  // as big as the whole room; the camera shows the screen's part of it (D-195).
  const base = document.createElement('canvas');
  let drawnRoom = null, doors = []; // the room drawn into `base`, and its doorways (D-225)
  const lights = [], torchGlow = []; // reused every frame (TECH.md)
  let listFor = null, listed = [], joined = 0; // the creature list, worked out again only when the state changes
  let row = null; // the list as last drawn: its entries in order and where they sit, for taps (CL2)
  let panel = { w: 0, h: 0, alpha: 1, t: 0 }; // the corner panel as last drawn, and its fade (D-380)
  let roundAlpha = 1; // the round map's fade (D-383)

  // § creature list's order: newest last (D-357). Each creature keeps the place it
  // got when it joined, on its shown spot (main.js); one that leaves the list loses it.
  function creaturesListed(s) {
    if (s !== listFor) { listFor = s; listed = creatureList(s); }
    const on = new Set(listed.map((a) => a.e));
    for (const e of s.enemies) if (!on.has(e)) delete foeAt(e).joined;
    for (const a of listed) { const p = foeAt(a.e); if (p.joined === undefined) p.joined = joined++; }
    if (app.framed && !listed.some((a) => foeAt(a.e) === app.framed)) app.framed = null; // the frame goes with its plaque (CL2)
    return listed.slice().sort((a, b) => foeAt(a.e).joined - foeAt(b.e).joined);
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
    const r = canvas.getBoundingClientRect(), b = rc.canvas.getBoundingClientRect();
    const k = rc.canvas.width / b.width, x = (r.left - b.left) * k, y = (r.top - b.top) * k;
    rc.save();
    rc.beginPath(); rc.rect(0, 0, view.w, view.h); rc.rect(x, y, r.width * k, r.height * k); rc.clip('evenodd');
    rc.globalAlpha = VEIL; rc.fillStyle = '#0e0c16'; rc.fillRect(0, 0, view.w, view.h);
    rc.restore();
  }

  // The picture's top left on the room canvas; on the title's screens both have the same zoom (screen.js)
  function pictureAt() {
    const r = canvas.getBoundingClientRect(), b = rc.canvas.getBoundingClientRect(), k = rc.canvas.width / b.width;
    return { x: Math.round((r.left - b.left) * k), y: Math.round((r.top - b.top) * k) };
  }
  // § title scene: the floor, hero and light fill the whole screen behind the title's lines
  // and its cards
  function titleScene(count, t) {
    const at = pictureAt();
    drawScene(rc, count, t, still(), at.x, at.y);
  }

  function onTitleScreens(t) {
    const { screen } = app;
    if (screen === 'explore') { titleScene(0, t); drawMap(rc, view.w, view.h, app.view, t, still(), screens.turns(), { seed: shownSeed(app.seeds), back: canGoBack(app.seeds) }); } // the map's card on the title's scene (D-395)
    else if (screen === 'seed') { titleScene(0, t); drawSeedCard(rc, view.w, view.h, app.entry, app.chosen, t, still()); } // the card on the title's scene (D-394)
    else if (screen === 'howto') { titleScene(0, t); drawHowTo(rc, view.w, view.h, app.page, app.settings.controls, t, still()); } // the card on the title's scene (D-390)
    else if (screen === 'history') { titleScene(0, t); drawHistory(rc, view.w, view.h, app.rows, app.opened, app.scroll, app.chosen, t, still()); } // the card on the title's scene (D-393)
    else if (screen === 'mode') { titleScene(0, t); drawWays(rc, view.w, view.h, screens.menuOf(screen), app.chosen, t, still()); } // the card on the title's scene (D-396)
    else if (screen === 'settings') { titleScene(0, t); drawSettingsCard(rc, view.w, view.h, screens.menuOf(screen), app.chosen, t, still()); } // the card on the title's scene (D-389)
    else if (screen === 'slots') drawSlots(ctx, app.profiles, (p) => heroIn(cloakOf(p), eyesOf(p), trimOf(p), clothesOf(p)), app.chosen, app.picking, app.slotsBack && app.profiles.current !== null, t, still());
    else if (screen === 'name') drawNamePad(ctx, app.entry, app.chosen, t, still(), app.renaming ? 'Rename profile' : undefined);
    else if (screen === 'cloak') drawCloaks(ctx, app.cloak, app.eyes, app.trim, app.clothes, app.chosen, t, still());
    else if (screen === 'eyes') drawEyes(ctx, app.cloak, app.eyes, app.chosen, t, still());
    else if (screen === 'trim') drawTrims(ctx, app.cloak, app.eyes, app.trim, app.clothes, app.chosen, t, still());
    else if (screen === 'clothes') drawClothes(ctx, app.cloak, app.eyes, app.trim, app.clothes, app.chosen, t, still());
    else if (screen === 'drop') drawAsk(ctx, slotName(app.profiles.slots[app.dropping], app.dropping), SURE_MENU, app.chosen, DROP_NOTE, t, still());
    else if (screen === 'journal') { titleScene(0, t); drawJournal(rc, view.w, view.h, playing(app.profiles).records, playing(app.profiles).played, app.state, app.tab, t, still()); } // the card on the title's scene (D-391)
    else {
      const [menu, heading, note] = screen === 'sure' ? [SURE_MENU, SURE_HEADING, SURE_NOTE]
        : screen === 'ended' ? [ENDED_MENU, ENDED_HEADING, null] // after a Hardcore fall (D-344)
        : [screens.menuOf(screen), null, null];
      titleScene(menu.length, t);
      drawTitle(ctx, menu, app.chosen, t, still(), heading, note);
    }
  }

  function draw(t) {
    listCtx.fillStyle = '#0e0c16'; listCtx.fillRect(0, 0, listCtx.canvas.width, listCtx.canvas.height); // the list's row stays empty
    const p = playing(app.profiles);
    wearLook(cloakOf(p), eyesOf(p), trimOf(p), clothesOf(p)); // the profile in play's look, on the title and in play (P3 to P6)
    const onTitle = screens.onTitle();
    fitTitle(onTitle); // the title's scene fills the screen at the picture's zoom
    if (onTitle) { rc.fillStyle = '#0e0c16'; rc.fillRect(0, 0, view.w, view.h); ctx.clearRect(0, 0, W, SCREEN_H); onTitleScreens(t); return; }
    ctx.clearRect(0, 0, W, SCREEN_H); // see-through over the room, but for a menu
    const { state, shown, nudge, hit, jab, bitten, travel, fall, walk } = app;
    const s = travel?.from || fall?.from || state;
    let nx = 0, ny = 0;
    if (nudge && t < nudge.until && !still()) { nx = nudge.dx; ny = nudge.dy; }
    if (jab && !still()) { const j = jabAt(jab, t); nx += j.x; ny += j.y; } // the knife's stab (D-253)
    if (s.room !== drawnRoom) {
      drawnRoom = s.room; doors = doorways(s.place, s.room, s.seed);
      base.width = drawnRoom.cols * TILE; base.height = drawnRoom.rows * TILE;
      drawRoom(base.getContext('2d'), drawnRoom);
    }
    // § fall: the hero lies down, the light closes to the deepest dark, then opens where they wake (D-234)
    const lying = !!fall?.from && t >= fall.lieAt;
    const dark = !fall ? 0 : fall.from ? ramp(t, fall.lieAt, fall.darkAt) : 1 - ramp(t, fall.mid, fall.end);
    // § camera: centred on the sliding hero, a bump's nudge left out (D-195)
    const list = travel || fall ? null : creaturesListed(s); // none while taking stairs or falling
    const sx = Math.round(shown.x * TILE), sy = Math.round(shown.y * TILE);
    const cam = app.cam = cameraAt(sx, sy, s.room, view.w, view.h);
    rc.fillStyle = '#0e0c16'; rc.fillRect(0, 0, view.w, view.h); // the deepest dark past a small room's edges (D-381)
    rc.drawImage(base, -cam.x, -cam.y);
    inRoom(() => {
      drawBrackets(rc, s.room, s.lights);
      drawItems(rc, s.items, t, still());
      drawHero(rc, sx + nx, sy + ny, !!bitten && t < bitten.until, lying);
      // § enemies: shaded by the light like the floor, so seen in memory's dim light too (D-153)
      drawEnemies(rc, s.enemies, t, still(), hit && t < hit.until ? hit.enemy : null, foeAt);
    });
    // Full daylight needs no lantern (D-025, D-209); dusk dims the sky and the lights show more (D-217)
    const sun = s.room.dark.sky ? daylight(s.turn) : 0, lightOn = !dev.lightOff() && sun < 1;
    // § light: the lantern's flame is the light's centre, oil sets its reach (D-053 to D-056, D-064).
    // Switched off, the lantern gives no light: only torchlight and remembered tiles show (D-082, D-101).
    const lx = sx + nx + LANTERN_AT.x, ly = sy + ny - 2 + LANTERN_AT.y;
    if (lightOn) {
      const r = s.lit ? reach(s.oil) * (still() ? 1 : flicker(t, 1.7, 0.035)) * (1 - dark) : 0;
      lights[0] = { ...LANTERN, x: lx, y: ly, r };
      lights.length = 1;
      lights.push(...torchLights(s.room, s.lights, t, still(), torchGlow), ...glowsIn(s.room, dev.revealed() ? null : s.seen));
      const sunIn = mouthLight(s); // daylight through the cave mouth, steady, no flicker (D-218)
      if (sunIn) lights.push(sunIn);
      drawLight(rc, s.room, lights, dev.revealed() ? null : s.seen, cam, darkNow(s.room, s.turn), 1 - sun);
    }
    inRoom(() => {
      drawFlames(rc, s.room, s.lights, t, still());
      if (s.lit && !lying) { rc.fillStyle = '#fff5d6'; rc.fillRect(lx, ly, 1, 1); } // the lit flame's core is always bright (study line 446)
      drawDoors(rc, doors, dev.revealed() ? null : s.seen, s.room.cols, t, still()); // over the light, so remembered ones show (D-225)
      const framed = list?.find((a) => foeAt(a.e) === app.framed);
      if (framed) drawFramed(rc, framed, foeAt(framed.e), cam, t, still()); // CL2, D-357
      if (walk && !walk.stopped && !travel) drawMark(rc, walk.tx, walk.ty, t, still());
      if (app.screen === 'place') for (const d of app.setting.sides) drawMark(rc, state.hero.x + DIRS[d][0], state.hero.y + DIRS[d][1], t, still()); // where the workbench or stash chest can go (WB2, CH2)
      if (t < app.alertUntil) drawAlert(rc, sx + nx, sy + ny);
      else if (app.gain && !fall) drawGain(rc, app.gain.n, sx + nx, sy + ny, t, Math.max(app.gain.at, app.alertUntil), still()); // after a "!", not over it
    });
    // § shake: the room jumps a pixel left and right after a hit; none with reduced motion (study line 432, D-105)
    // A bite shakes it the same way (D-118).
    if (((hit && t < hit.shakeUntil) || (bitten && t < bitten.shakeUntil)) && !still()) {
      const jx = Math.floor(t / 30) % 2 ? 1 : -1;
      rc.drawImage(rc.canvas, jx, 0);
      rc.fillStyle = '#0e0c16'; rc.fillRect(jx > 0 ? 0 : view.w - 1, 0, 1, view.h);
    }
    // Taking stairs, the room dims to the deepest dark and back (D-135); a fall closes it the same way; the hearts and oil stay
    const dim = travel ? Math.max(0, 1 - Math.abs(t - travel.mid) / FADE_MS) : dark;
    if (dim > 0) {
      rc.globalAlpha = dim;
      rc.fillStyle = '#0e0c16'; rc.fillRect(0, 0, view.w, view.h);
      rc.globalAlpha = 1;
    }
    // § panel: the hearts, oil, depth and level on glass over the room's top left (D-378),
    // the creature list under it (D-357); both fade while the hero or a creature beside them is under them (D-380)
    const n = list ? list.length : 0; // the panel's size is last frame's, near enough
    const end = view.h - LINE_UP - 2; // the creature list stops above the text line (D-381)
    const shownN = plaquesShown(n, 2, 2 + panel.h + 2, false, end), more = shownN < n ? 1 : 0;
    const under = { w: Math.max(panel.w, n ? PLAQUE_W : 0), h: panel.h + (shownN + more) * (PLAQUE_H + 2) };
    const hx = s.hero.x, hy = s.hero.y;
    const spots = [[sx, sy], ...s.enemies.filter((e) => Math.max(Math.abs(e.x - hx), Math.abs(e.y - hy)) <= 1).map((e) => { const p = foeAt(e); return [Math.round(p.x * TILE), Math.round(p.y * TILE)]; })];
    const covers = (a) => spots.some(([px, py]) => px - cam.x < a.x + a.w && px - cam.x + TILE > a.x && py - cam.y < a.y + a.h && py - cam.y + TILE > a.y);
    const dt = Math.max(0, t - panel.t), fade = (alpha, goal) => (still() ? goal : alpha + Math.sign(goal - alpha) * Math.min(Math.abs(goal - alpha), dt / FADE_PANEL_MS));
    panel.alpha = fade(panel.alpha, covers({ x: 2, y: 2, ...under }) ? UNDER_ALPHA : 1);
    panel.t = t;
    // § round map: the floor around the hero, top right, fading the same way (D-383)
    roundAlpha = app.screen === 'play' ? fade(roundAlpha, covers(mapButton.area()) ? UNDER_ALPHA : 1) : 1;
    mapButton.show(s, dev.revealedMap(), t, still(), roundAlpha);
    Object.assign(panel, drawStatus(rc, { oil: s.oil, health: s.health, max: maxHealth(state), depth: depthOf(s.place), level: levelOf(s.xp ?? state.xp) }, 2, 2, panel.alpha)); // the fall's picture keeps no xp, and a fall keeps it all (D-245)
    row = null;
    if (list) {
      const isFramed = (e) => foeAt(e) === app.framed;
      row = { list, x: 2, y: 2 + panel.h + 2, across: false, end }; // where the list sits, in the room canvas's pixels
      rc.save(); rc.globalAlpha = panel.alpha;
      drawCreatureList(rc, list, row.x, row.y, row.across, row.end, isFramed);
      rc.restore();
    }
    const line = fall?.from ? null : shownLine(state); // the fall's line once the hero wakes
    if (!CARDS.has(app.screen)) textLine.draw(rc, line, t, still()); // over a card instead, below
    if (line !== app.spokenLine) { app.spokenLine = line; if (line) spoken.textContent = line.text; }
    lanternButton.show(state.lit); quickSlot.show(flasksIn(state.bag));
    if (!CLEAR_OVER.has(app.screen)) veilAround();
    if (app.screen === 'paused') drawPauseCard(rc, view.w, view.h, PAUSE_MENU, app.chosen, pauseFacts(state), t, still()); // a card on the room (D-388)
    else if (app.screen === 'settings') drawSettingsCard(rc, view.w, view.h, screens.menuOf(app.screen), app.chosen, t, still()); // a card on the room (D-389)
    else if (app.screen === 'ways') drawWays(rc, view.w, view.h, screens.menuOf('ways'), app.chosen, t, still()); // a card on the room (D-396)
    else if (app.screen === 'easier') drawPause(ctx, SURE_MENU, app.chosen, t, still(), easeHeading(app.easier), EASE_NOTE);
    else if (app.screen === 'seed') drawSeedCard(rc, view.w, view.h, app.entry, app.chosen, t, still()); // a card on the room (D-394)
    else if (app.screen === 'howto') drawHowTo(rc, view.w, view.h, app.page, app.settings.controls, t, still()); // a card on the room (D-390)
    else if (app.screen === 'history') drawHistory(rc, view.w, view.h, app.rows, app.opened, app.scroll, app.chosen, t, still()); // a card on the room (D-393)
    else if (app.screen === 'journal') drawJournal(rc, view.w, view.h, playing(app.profiles).records, playing(app.profiles).played, app.state, app.tab, t, still()); // a card on the room (D-391)
    else if (app.screen === 'map') drawMap(rc, view.w, view.h, app.view, t, still(), screens.turns()); // a card on the room (D-395)
    else if (app.screen === 'bag') {
      drawBag(rc, view.w, view.h, state.bag, app.chosen, spriteOf, state.held, state.health >= maxHealth(state), state.told); // a card on the room (D-385)
      textLine.draw(rc, line, t, still()); // over the card, so a line said in the bag shows ("Only on the surface.")
    }
    else if (app.screen === 'bench') {
      drawBenchPanel(rc, view.w, view.h, benchMakes(state.bag), app.chosen, spriteOf, state.told, t, still()); // a card on the room (D-387)
      textLine.draw(rc, line, t, still()); // "You make a stash chest."
    }
    else if (app.screen === 'chest') {
      drawChestPanel(rc, view.w, view.h, stashAt(state, app.bench.x, app.bench.y), state.bag, app.chosen, spriteOf, t, still()); // a card on the room (D-387)
      textLine.draw(rc, line, t, still()); // "Your bag is full."
    }
    else dev.draw(rc, state, cam);
  }

  // A new journey draws its room afresh
  const redraw = () => { drawnRoom = null; };
  // § plaques for taps (CL2): the shown spot (main.js) of the creature whose plaque is under
  // px, py, in the room canvas's pixels; the list's spots in order; or null and [] with no list
  function plaqueSpot(px, py) {
    if (!row) return null;
    const i = plaqueAt(row.list.length, row.x, row.y, row.across, row.end, px, py);
    return i < 0 ? null : foeAt(row.list[i].e);
  }
  const plaqueSpots = () => (row ? row.list.slice(0, plaquesShown(row.list.length, row.x, row.y, row.across, row.end)).map((a) => foeAt(a.e)) : []);
  return { draw, redraw, plaqueSpot, plaqueSpots };
}
