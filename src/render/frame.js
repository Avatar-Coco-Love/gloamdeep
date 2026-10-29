// § frame: draws one frame of play, or the title and its screens, from `app`
// (split from main.js, D-235). It changes nothing in the game; main.js moves
// the shown hero and enemies and takes the turns before each frame.
import { TILE, W, SCREEN_H, view, roomView, fitTitle, fitRoomCols } from './screen.js';
import { drawRoom, drawBeyond } from './tiles.js';
import { drawHero, drawItems, drawEnemies, spriteOf, wearLook, heroIn } from './sprites.js';
import { drawLight, flicker } from './light.js';
import { drawBrackets, torchLights, drawFlames } from './torches.js';
import { drawStatus } from './hud.js';
import { LINE_UP } from './textline.js';
import { drawCreatureList, plaqueAt, plaquesShown, PLAQUE_W, PLAQUE_H } from './creatures.js';
import { drawFramed } from './framed.js';
import { drawTitle, drawScene, drawName } from './title.js';
import { drawTitleCard, nameTop } from './titlecard.js';
import { VEIL } from './menu.js';
import { drawSeedCard } from './seedpad.js';
import { drawNameCard } from './namepad.js';
import { drawHowTo } from './howto.js';
import { drawHistory } from './history.js';
import { drawJournal } from './journal.js';
import { drawSlots } from './slots.js';
import { drawAskCard } from './askcard.js';
import { drawCloaks, drawEyes, drawTrims, drawClothes } from './cloak.js';
import { drawMap } from './map.js';
import { drawBag } from './bag.js';
import { drawBenchPanel } from './benchpanel.js';
import { drawChestPanel } from './chestpanel.js';
import { drawPauseCard } from './pausecard.js';
import { drawSettingsCard } from './settingscard.js';
import { drawWays } from './ways.js';
import { stashAt } from '../core/chest.js';
import { padShown } from '../core/settings.js';
import { jabAt } from './jab.js';
import { drawMark, drawDots, drawAlert, drawGain } from './walk.js';
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
import { playing } from '../core/profile.js';
import { cloakOf, eyesOf, trimOf, clothesOf } from '../core/looks.js';
import { PAUSE_MENU, pauseFacts, benchMakes, SURE_MENU, ENDED_MENU, ENDED_HEADING } from '../core/menu.js';
import { doorways, widen, outside } from '../core/openings.js';

export const FADE_MS = 200; // each way, taking stairs (D-135)

// 0 before a, 1 after b, and evenly between; a jump at a when b is not after it
const ramp = (t, a, b) => (b <= a ? (t >= a ? 1 : 0) : Math.min(1, Math.max(0, (t - a) / (b - a))));

// § panel's fade: how see-through the corner panel and the plaques under it
// get while the hero, or a creature next to them, is under them (D-380), and how fast
const UNDER_ALPHA = 0.25, FADE_PANEL_MS = 150;

// Screens over play that dim the room around them; the cards (the bag's, the workbench's, the stash chest's, the pause menu's) and placing a workbench leave it clear
const CLEAR_OVER = new Set(['play', 'map', 'bag', 'bench', 'chest', 'place', 'paused', 'settings', 'howto', 'journal', 'history', 'seed', 'ways', 'easier']);
const CARDS = new Set(['bag', 'bench', 'chest', 'paused', 'settings', 'howto', 'journal', 'history', 'seed', 'map', 'ways', 'easier']); // drawn on the room, the text line over them (D-385, D-387); none over the pause, settings, how to play, journal, version history, seed, map and way to play cards and the ask (D-388 to D-391, D-393 to D-396, D-400)

// `ui`: the canvases (the menus' picture, the creature list's row, the room filling the screen behind them,
// D-381, and the screen layer over the room, D-444), the text line, the spoken line, the lantern button, the round map (D-383), the dev tools, the screens, and still() and foeAt(e) from main.js.
export function createFrame(app, ui) {
  const { ctx, listCtx, roomCtx: rc, hudCtx: hc, canvas, textLine, spoken, lanternButton, mapButton, arrowPad, quickSlot, dev, screens, still, foeAt } = ui;
  // The room is drawn onto a hidden canvas, again only when it changes (a dev spawn),
  // as big as the whole room; the camera shows the screen's part of it (D-195).
  const base = document.createElement('canvas');
  let drawnRoom = null, doors = []; // the room drawn into `base`, and its doorways (D-225)
  // Past a small room's edge its rock or trees go on (D-403): drawn onto `around`, mx tiles
  // past the sides and my past the top and bottom, enough to reach the screen's edges
  const around = document.createElement('canvas'), spare = document.createElement('canvas');
  let wide = null, mx = 0, my = 0, drawnThere = null; // and past the crypt's doorway out, the woods as drawn (D-438)
  const past = (size, shown) => Math.ceil(Math.max(0, shown - size * TILE) / 2 / TILE) + 2; // + 2 covers the camera's margin (D-441)
  const lights = [], torchGlow = []; // reused every frame (TECH.md)
  let listFor = null, listed = [], joined = 0; // the creature list, worked out again only when the state changes
  let row = null; // the list as last drawn: its entries in order and where they sit, for taps (CL2)
  let panel = { w: 0, h: 0, alpha: 1, t: 0 }; // the corner panel as last drawn, and its fade (D-380)
  let roundAlpha = 1, padAlpha = 1; // the round map's fade (D-383), and the arrow pad's (D-406)

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
    else if (screen === 'howto') { titleScene(0, t); drawHowTo(rc, view.w, view.h, app.page, app.settings, t, still()); } // the card on the title's scene (D-390)
    else if (screen === 'history') { titleScene(0, t); drawHistory(rc, view.w, view.h, app.rows, app.opened, app.scroll, app.chosen, t, still()); } // the card on the title's scene (D-393)
    else if (screen === 'mode') { titleScene(0, t); drawWays(rc, view.w, view.h, screens.menuOf(screen), app.chosen, t, still()); } // the card on the title's scene (D-396)
    else if (screen === 'settings') { titleScene(0, t); drawSettingsCard(rc, view.w, view.h, screens.menuOf(screen), app.chosen, t, still()); } // the card on the title's scene (D-389)
    else if (screen === 'slots') { titleScene(0, t); drawSlots(rc, view.w, view.h, app.profiles, (p) => heroIn(cloakOf(p), eyesOf(p), trimOf(p), clothesOf(p)), app.chosen, app.picking, screens.slotsBack(), t, still()); } // the card on the title's scene (D-397)
    else if (screen === 'name') { titleScene(0, t); drawNameCard(rc, view.w, view.h, app.entry, app.chosen, t, still(), app.renaming); } // the card on the title's scene (D-398)
    else if (screen === 'cloak') { titleScene(0, t); drawCloaks(rc, view.w, view.h, heroIn, app.cloak, app.eyes, app.trim, app.clothes, app.chosen); } // the look cards on the title's scene (D-399)
    else if (screen === 'eyes') { titleScene(0, t); drawEyes(rc, view.w, view.h, heroIn, app.cloak, app.eyes, app.chosen); }
    else if (screen === 'trim') { titleScene(0, t); drawTrims(rc, view.w, view.h, heroIn, app.cloak, app.eyes, app.trim, app.clothes, app.chosen); }
    else if (screen === 'clothes') { titleScene(0, t); drawClothes(rc, view.w, view.h, heroIn, app.cloak, app.eyes, app.trim, app.clothes, app.chosen); }
    else if (screen === 'drop' || screen === 'sure') { titleScene(0, t); drawAskCard(rc, view.w, view.h, ...screens.askOf(screen), SURE_MENU, app.chosen); } // the ask card on the title's scene (D-400)
    else if (screen === 'journal') { titleScene(0, t); drawJournal(rc, view.w, view.h, playing(app.profiles).records, playing(app.profiles).played, app.state, app.tab, t, still()); } // the card on the title's scene (D-391)
    else if (screen === 'title') { // laid out like a phone game's (D-401)
      const p = playing(app.profiles);
      titleScene(3, t);
      drawName(rc, view.w / 2, nameTop(view.h));
      drawTitleCard(rc, view.w, view.h, screens.menuOf(screen), app.chosen, { ...screens.chip(), hero: heroIn(cloakOf(p), eyesOf(p), trimOf(p), clothesOf(p)) }, t, still());
    } else {
      const [menu, heading, note] = screen === 'ended' ? [ENDED_MENU, ENDED_HEADING, null] // after a Hardcore fall (D-344)
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
    hc.clearRect(0, 0, view.w, view.h); // the screen layer, see-through but for what is drawn on it below
    if (onTitle) { arrowPad.show(false, 1); rc.fillStyle = '#0e0c16'; rc.fillRect(0, 0, view.w, view.h); ctx.clearRect(0, 0, W, SCREEN_H); onTitleScreens(t); return; }
    ctx.clearRect(0, 0, W, SCREEN_H); // see-through over the room, but for a menu
    const { state, shown, nudge, hit, jab, bitten, travel, fall, walk } = app;
    const s = travel?.from || fall?.from || state;
    let nx = 0, ny = 0;
    if (nudge && t < nudge.until && !still()) { nx = nudge.dx; ny = nudge.dy; }
    if (jab && !still()) { const j = jabAt(jab, t); nx += j.x; ny += j.y; } // the knife's stab (D-253)
    fitRoomCols(s.room.cols); // a narrow room zooms in to fill the width, with a margin (D-441)
    const out = outside(s); // the woods past the doorway, as they are now (D-438)
    if (s.room !== drawnRoom || (out && out.there) !== drawnThere) {
      if (s.room !== drawnRoom) {
        drawnRoom = s.room; doors = doorways(s.place, s.room, s.seed);
        base.width = drawnRoom.cols * TILE; base.height = drawnRoom.rows * TILE;
        drawRoom(base.getContext('2d'), drawnRoom);
      }
      drawnThere = out && out.there;
      wide = widen(drawnRoom, doors, out); mx = my = 0;
    }
    if (past(wide.cols, roomView.w) > mx || past(wide.rows, roomView.h) > my) { // a new room, or a wider screen
      mx = past(wide.cols, roomView.w); my = past(wide.rows, roomView.h);
      around.width = (wide.cols + 2 * mx) * TILE; around.height = (wide.rows + 2 * my) * TILE;
      drawBeyond(around.getContext('2d'), wide, mx, my, spare);
    }
    // § fall: the hero lies down, the light closes to the deepest dark, then opens where they wake (D-234)
    const lying = !!fall?.from && t >= fall.lieAt;
    const dark = !fall ? 0 : fall.from ? ramp(t, fall.lieAt, fall.darkAt) : 1 - ramp(t, fall.mid, fall.end);
    // § camera: centred on the sliding hero, a bump's nudge left out (D-195)
    const list = travel || fall ? null : creaturesListed(s); // none while taking stairs or falling
    const sx = Math.round(shown.x * TILE), sy = Math.round(shown.y * TILE);
    const cam = app.cam = cameraAt(sx, sy, s.room, roomView.w, roomView.h);
    rc.fillStyle = '#0e0c16'; rc.fillRect(0, 0, roomView.w, roomView.h); // the deepest dark, only past what `around` holds
    rc.drawImage(around, -cam.x - mx * TILE, -cam.y - my * TILE);
    rc.drawImage(base, -cam.x, -cam.y);
    const P = wide.past;
    inRoom(() => {
      if (P) { rc.save(); rc.translate(P.x * TILE, P.y * TILE); drawItems(rc, P.there.items, t, still()); rc.restore(); } // the sticks lying in the woods
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
      // Past the doorway out, the woods in their own light: their sky by the time of day, their memory (D-439)
      const woodsLight = P && { room: P.seenFrom, x: P.x * TILE, y: P.y * TILE, dir: P.dir, memory: dev.revealed() ? null : P.there.seen, dark: darkNow(P.there.room, s.turn), lamp: 1 - daylight(s.turn) };
      drawLight(rc, wide, lights, dev.revealed() ? null : s.seen, cam, darkNow(s.room, s.turn), 1 - sun, woodsLight);
    }
    inRoom(() => {
      drawFlames(rc, s.room, s.lights, t, still());
      if (s.lit && !lying) { rc.fillStyle = '#fff5d6'; rc.fillRect(lx, ly, 1, 1); } // the lit flame's core is always bright (study line 446)
      drawDoors(rc, doors, dev.revealed() ? null : s.seen, s.room.cols, t, still()); // over the light, so remembered ones show (D-225)
      const framed = list?.find((a) => foeAt(a.e) === app.framed);
      if (framed) drawFramed(rc, framed, foeAt(framed.e), cam, t, still()); // CL2, D-357
      if (walk && !travel) { drawDots(rc, walk.way, walk.tx, walk.ty); drawMark(rc, walk.tx, walk.ty, t, still()); } // the walk to a tapped tile (D-406)
      if (app.screen === 'place') for (const d of app.setting.sides) drawMark(rc, state.hero.x + DIRS[d][0], state.hero.y + DIRS[d][1], t, still()); // where the workbench or stash chest can go (WB2, CH2)
      if (t < app.alertUntil) drawAlert(rc, sx + nx, sy + ny);
      else if (app.gain && !fall) drawGain(rc, app.gain.n, sx + nx, sy + ny, t, Math.max(app.gain.at, app.alertUntil), still()); // after a "!", not over it
    });
    // § shake: the room jumps a pixel left and right after a hit; none with reduced motion (study line 432, D-105)
    // A bite shakes it the same way (D-118).
    if (((hit && t < hit.shakeUntil) || (bitten && t < bitten.shakeUntil)) && !still()) {
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
    // § panel: the hearts, oil, depth and level on glass over the room's top left (D-378),
    // the creature list under it (D-357); both fade while the hero or a creature beside them is under them (D-380)
    const n = list ? list.length : 0; // the panel's size is last frame's, near enough
    const end = view.h - LINE_UP - 2; // the creature list stops above the text line (D-381)
    const shownN = plaquesShown(n, 2, 2 + panel.h + 2, false, end), more = shownN < n ? 1 : 0;
    const under = { w: Math.max(panel.w, n ? PLAQUE_W : 0), h: panel.h + (shownN + more) * (PLAQUE_H + 2) };
    const hx = s.hero.x, hy = s.hero.y;
    const spots = [[sx, sy], ...s.enemies.filter((e) => Math.max(Math.abs(e.x - hx), Math.abs(e.y - hy)) <= 1).map((e) => { const p = foeAt(e); return [Math.round(p.x * TILE), Math.round(p.y * TILE)]; })];
    const covers = (a) => spots.some(([px, py]) => { // on the screen layer, where the panel and the corner pieces are (D-444)
      const [x, y, size] = onLayer(px - cam.x, py - cam.y, TILE);
      return x < a.x + a.w && x + size > a.x && y < a.y + a.h && y + size > a.y;
    });
    const dt = Math.max(0, t - panel.t), fade = (alpha, goal) => (still() ? goal : alpha + Math.sign(goal - alpha) * Math.min(Math.abs(goal - alpha), dt / FADE_PANEL_MS));
    panel.alpha = fade(panel.alpha, covers({ x: 2, y: 2, ...under }) ? UNDER_ALPHA : 1);
    panel.t = t;
    // § round map: the floor around the hero, top right, fading the same way (D-383)
    roundAlpha = app.screen === 'play' ? fade(roundAlpha, covers(mapButton.area()) ? UNDER_ALPHA : 1) : 1;
    mapButton.show(s, dev.revealedMap(), t, still(), roundAlpha);
    // § arrow pad: bottom left, in play with its switch on, fading the same way (D-406)
    const padOn = app.screen === 'play' && padShown(app.settings);
    padAlpha = padOn ? fade(padAlpha, covers(arrowPad.area()) ? UNDER_ALPHA : 1) : 1;
    arrowPad.show(padOn, padAlpha);
    Object.assign(panel, drawStatus(hc, { oil: s.oil, health: s.health, max: maxHealth(state), depth: depthOf(s.place), level: levelOf(s.xp ?? state.xp) }, 2, 2, panel.alpha)); // the fall's picture keeps no xp, and a fall keeps it all (D-245)
    row = null;
    if (list) {
      const isFramed = (e) => foeAt(e) === app.framed;
      row = { list, x: 2, y: 2 + panel.h + 2, across: false, end }; // where the list sits, in the screen layer's pixels (D-444)
      hc.save(); hc.globalAlpha = panel.alpha;
      drawCreatureList(hc, list, row.x, row.y, row.across, row.end, isFramed);
      hc.restore();
    }
    const line = fall?.from ? null : shownLine(state); // the fall's line once the hero wakes
    if (!CARDS.has(app.screen)) textLine.draw(hc, line, t, still()); // over a card instead, below
    if (line !== app.spokenLine) { app.spokenLine = line; if (line) spoken.textContent = line.text; }
    lanternButton.show(state.lit); quickSlot.show(flasksIn(state.bag));
    if (!CLEAR_OVER.has(app.screen)) veilAround();
    if (app.screen === 'paused') drawPauseCard(hc, view.w, view.h, PAUSE_MENU, app.chosen, pauseFacts(state), t, still()); // a card on the room (D-388)
    else if (app.screen === 'settings') drawSettingsCard(hc, view.w, view.h, screens.menuOf(app.screen), app.chosen, t, still()); // a card on the room (D-389)
    else if (app.screen === 'ways') drawWays(hc, view.w, view.h, screens.menuOf('ways'), app.chosen, t, still()); // a card on the room (D-396)
    else if (app.screen === 'easier') drawAskCard(hc, view.w, view.h, ...screens.askOf('easier'), SURE_MENU, app.chosen); // the ask card on the room (D-400)
    else if (app.screen === 'seed') drawSeedCard(hc, view.w, view.h, app.entry, app.chosen, t, still()); // a card on the room (D-394)
    else if (app.screen === 'howto') drawHowTo(hc, view.w, view.h, app.page, app.settings, t, still()); // a card on the room (D-390)
    else if (app.screen === 'history') drawHistory(hc, view.w, view.h, app.rows, app.opened, app.scroll, app.chosen, t, still()); // a card on the room (D-393)
    else if (app.screen === 'journal') drawJournal(hc, view.w, view.h, playing(app.profiles).records, playing(app.profiles).played, app.state, app.tab, t, still()); // a card on the room (D-391)
    else if (app.screen === 'map') drawMap(hc, view.w, view.h, app.view, t, still(), screens.turns()); // a card on the room (D-395)
    else if (app.screen === 'bag') {
      drawBag(hc, view.w, view.h, state.bag, app.chosen, spriteOf, state.held, state.health >= maxHealth(state), state.told); // a card on the room (D-385)
      textLine.draw(hc, line, t, still()); // over the card, so a line said in the bag shows ("Only on the surface.")
    }
    else if (app.screen === 'bench') {
      drawBenchPanel(hc, view.w, view.h, benchMakes(state.bag), app.chosen, spriteOf, state.told, t, still()); // a card on the room (D-387)
      textLine.draw(hc, line, t, still()); // "You make a stash chest."
    }
    else if (app.screen === 'chest') {
      drawChestPanel(hc, view.w, view.h, stashAt(state, app.bench.x, app.bench.y), state.bag, app.chosen, spriteOf, t, still()); // a card on the room (D-387)
      textLine.draw(hc, line, t, still()); // "Your bag is full."
    }
    else dev.draw(rc, state, cam);
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
  const plaqueSpots = () => (row ? row.list.slice(0, plaquesShown(row.list.length, row.x, row.y, row.across, row.end)).map((a) => foeAt(a.e)) : []);
  return { draw, redraw, plaqueSpot, plaqueSpots };
}
