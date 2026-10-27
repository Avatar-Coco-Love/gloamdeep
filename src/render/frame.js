// § frame: draws one frame of play, or the title and its screens, from `app`
// (split from main.js, D-235). It changes nothing in the game; main.js moves
// the shown hero and enemies and takes the turns before each frame.
import { TILE, W, H, SCREEN_H } from './screen.js';
import { drawRoom } from './tiles.js';
import { drawHero, drawItems, drawEnemies, spriteOf, wearLook, heroIn } from './sprites.js';
import { drawLight, flicker } from './light.js';
import { drawBrackets, torchLights, drawFlames } from './torches.js';
import { drawStatus } from './hud.js';
import { drawCreatureList, plaqueAt, plaquesShown, PLAQUE_W, PLAQUE_H } from './creatures.js';
import { drawFramed } from './framed.js';
import { drawTitle } from './title.js';
import { drawPause } from './menu.js';
import { drawSeedPad } from './seedpad.js';
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
import { stashAt } from '../core/chest.js';
import { jabAt } from './jab.js';
import { drawMark, drawAlert, drawGain } from './walk.js';
import { drawDoors } from './doors.js';
import { LANTERN, LANTERN_AT } from '../core/light.js';
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
import { PAUSE_MENU, benchMenu, SURE_MENU, SURE_HEADING, SURE_NOTE, DROP_NOTE, MODE_MENU, MODE_HEADING, ENDED_MENU, ENDED_HEADING, HARDER_NOTE, EASE_NOTE, easeHeading } from '../core/menu.js';
import { doorways } from '../core/openings.js';

export const FADE_MS = 200; // each way, taking stairs (D-135)

// 0 before a, 1 after b, and evenly between; a jump at a when b is not after it
const ramp = (t, a, b) => (b <= a ? (t >= a ? 1 : 0) : Math.min(1, Math.max(0, (t - a) / (b - a))));

// § panel's fade: how see-through the corner panel and the plaques under it
// get while the hero, or a creature next to them, is under them (D-380), and how fast
const UNDER_ALPHA = 0.25, FADE_PANEL_MS = 150;

// `ui`: the canvases (the room's and the creature list's), the text line, the spoken line, the lantern button, the dev
// tools, the screens, and still() and foeAt(e) from main.js.
export function createFrame(app, ui) {
  const { ctx, listCtx, canvas, textLine, spoken, lanternButton, dev, screens, still, foeAt } = ui;
  // The room is drawn onto a hidden canvas, again only when it changes (a dev spawn),
  // as big as the whole room; the camera shows the screen's part of it (D-195).
  const base = document.createElement('canvas');
  let drawnRoom = null, doors = []; // the room drawn into `base`, and its doorways (D-225)
  const lights = [], torchGlow = []; // reused every frame (TECH.md)
  let listFor = null, listed = [], joined = 0; // the creature list, worked out again only when the state changes
  let row = null; // the list as last drawn: its entries in order and where they sit, for taps (CL2)
  let panel = { w: 0, h: 0, alpha: 1, t: 0 }; // the corner panel as last drawn, and its fade (D-380)

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

  // Draws in room pixels, moved by the camera and kept off the text strip below the room
  function inRoom(draw) {
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip();
    ctx.translate(-app.cam.x, -app.cam.y);
    draw();
    ctx.restore();
  }

  function onTitleScreens(t) {
    const { screen } = app;
    if (screen === 'explore') { drawTitle(ctx, [], 0, t, still()); drawMap(ctx, app.view, t, still(), screens.turns(), { seed: shownSeed(app.seeds), back: canGoBack(app.seeds) }); }
    else if (screen === 'seed') { drawTitle(ctx, [], 0, t, still()); drawSeedPad(ctx, app.entry, app.chosen, t, still()); }
    else if (screen === 'howto') { drawTitle(ctx, [], 0, t, still()); drawHowTo(ctx, app.page, app.settings.controls, app.chosen, t, still()); }
    else if (screen === 'history') { drawTitle(ctx, [], 0, t, still()); drawHistory(ctx, app.rows, app.opened, app.scroll, app.chosen, t, still()); }
    else if (screen === 'slots') drawSlots(ctx, app.profiles, (p) => heroIn(cloakOf(p), eyesOf(p), trimOf(p), clothesOf(p)), app.chosen, app.picking, app.slotsBack && app.profiles.current !== null, t, still());
    else if (screen === 'name') drawNamePad(ctx, app.entry, app.chosen, t, still(), app.renaming ? 'Rename profile' : undefined);
    else if (screen === 'cloak') drawCloaks(ctx, app.cloak, app.eyes, app.trim, app.clothes, app.chosen, t, still());
    else if (screen === 'eyes') drawEyes(ctx, app.cloak, app.eyes, app.chosen, t, still());
    else if (screen === 'trim') drawTrims(ctx, app.cloak, app.eyes, app.trim, app.clothes, app.chosen, t, still());
    else if (screen === 'clothes') drawClothes(ctx, app.cloak, app.eyes, app.trim, app.clothes, app.chosen, t, still());
    else if (screen === 'drop') drawAsk(ctx, slotName(app.profiles.slots[app.dropping], app.dropping), SURE_MENU, app.chosen, DROP_NOTE, t, still());
    else if (screen === 'journal') drawJournal(ctx, playing(app.profiles).records, playing(app.profiles).played, app.state, app.tab, app.chosen, t, still());
    else if (screen === 'sure') drawTitle(ctx, SURE_MENU, app.chosen, t, still(), SURE_HEADING, SURE_NOTE);
    else if (screen === 'mode') drawTitle(ctx, MODE_MENU, app.chosen, t, still(), MODE_HEADING, MODE_MENU[app.chosen].note);
    else if (screen === 'ended') drawTitle(ctx, ENDED_MENU, app.chosen, t, still(), ENDED_HEADING); // after a Hardcore fall (D-344)
    else drawTitle(ctx, screens.menuOf(screen), app.chosen, t, still(), screen === 'settings' ? 'Settings' : null);
  }

  function draw(t) {
    listCtx.fillStyle = '#0e0c16'; listCtx.fillRect(0, 0, listCtx.canvas.width, listCtx.canvas.height); // the list's row stays empty
    const p = playing(app.profiles);
    wearLook(cloakOf(p), eyesOf(p), trimOf(p), clothesOf(p)); // the profile in play's look, on the title and in play (P3 to P6)
    if (screens.onTitle()) { onTitleScreens(t); return; }
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
    const cam = app.cam = cameraAt(sx, sy, s.room, W, H);
    ctx.drawImage(base, cam.x, cam.y, W, H, 0, 0, W, H);
    inRoom(() => {
      drawBrackets(ctx, s.room, s.lights);
      drawItems(ctx, s.items, t, still());
      drawHero(ctx, sx + nx, sy + ny, !!bitten && t < bitten.until, lying);
      // § enemies: shaded by the light like the floor, so seen in memory's dim light too (D-153)
      drawEnemies(ctx, s.enemies, t, still(), hit && t < hit.until ? hit.enemy : null, foeAt);
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
      drawLight(ctx, s.room, lights, dev.revealed() ? null : s.seen, cam, darkNow(s.room, s.turn), 1 - sun);
    }
    inRoom(() => {
      drawFlames(ctx, s.room, s.lights, t, still());
      if (s.lit && !lying) { ctx.fillStyle = '#fff5d6'; ctx.fillRect(lx, ly, 1, 1); } // the lit flame's core is always bright (study line 446)
      drawDoors(ctx, doors, dev.revealed() ? null : s.seen, s.room.cols, t, still()); // over the light, so remembered ones show (D-225)
      const framed = list?.find((a) => foeAt(a.e) === app.framed);
      if (framed) drawFramed(ctx, framed, foeAt(framed.e), cam, t, still()); // CL2, D-357
      if (walk && !walk.stopped && !travel) drawMark(ctx, walk.tx, walk.ty, t, still());
      if (app.screen === 'place') for (const d of app.setting.sides) drawMark(ctx, state.hero.x + DIRS[d][0], state.hero.y + DIRS[d][1], t, still()); // where the workbench or stash chest can go (WB2, CH2)
      if (t < app.alertUntil) drawAlert(ctx, sx + nx, sy + ny);
      else if (app.gain && !fall) drawGain(ctx, app.gain.n, sx + nx, sy + ny, t, Math.max(app.gain.at, app.alertUntil), still()); // after a "!", not over it
    });
    // § shake: the room jumps a pixel left and right after a hit; none with reduced motion (study line 432, D-105)
    // A bite shakes it the same way (D-118).
    if (((hit && t < hit.shakeUntil) || (bitten && t < bitten.shakeUntil)) && !still()) {
      const jx = Math.floor(t / 30) % 2 ? 1 : -1;
      ctx.drawImage(canvas, 0, 0, W, H, jx, 0, W, H);
      ctx.fillStyle = '#0e0c16'; ctx.fillRect(jx > 0 ? 0 : W - 1, 0, 1, H);
    }
    // Taking stairs, the room dims to the deepest dark and back (D-135); a fall closes it the same way; the hearts and oil stay
    const dim = travel ? Math.max(0, 1 - Math.abs(t - travel.mid) / FADE_MS) : dark;
    if (dim > 0) {
      ctx.globalAlpha = dim;
      ctx.fillStyle = '#0e0c16'; ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }
    // § panel: the hearts, oil, depth and level on glass over the room's top left (D-378),
    // the creature list under it (D-357); both fade while the hero or a creature beside them is under them (D-380)
    const n = list ? list.length : 0; // the panel's size is last frame's, near enough
    const shownN = plaquesShown(n, 2, 2 + panel.h + 2, false, H - 2), more = shownN < n ? 1 : 0;
    const under = { w: Math.max(panel.w, n ? PLAQUE_W : 0), h: panel.h + (shownN + more) * (PLAQUE_H + 2) };
    const hx = s.hero.x, hy = s.hero.y;
    const covered = [[sx, sy], ...s.enemies.filter((e) => Math.max(Math.abs(e.x - hx), Math.abs(e.y - hy)) <= 1).map((e) => { const p = foeAt(e); return [Math.round(p.x * TILE), Math.round(p.y * TILE)]; })]
      .some(([px, py]) => px - cam.x < 2 + under.w && px - cam.x + TILE > 2 && py - cam.y < 2 + under.h && py - cam.y + TILE > 2);
    const goal = covered ? UNDER_ALPHA : 1, dt = Math.max(0, t - panel.t);
    panel.alpha = still() ? goal : panel.alpha + Math.sign(goal - panel.alpha) * Math.min(Math.abs(goal - panel.alpha), dt / FADE_PANEL_MS);
    panel.t = t;
    Object.assign(panel, drawStatus(ctx, { oil: s.oil, health: s.health, max: maxHealth(state), depth: depthOf(s.place), level: levelOf(s.xp ?? state.xp) }, 2, 2, panel.alpha)); // the fall's picture keeps no xp, and a fall keeps it all (D-245)
    row = null;
    if (list) {
      const isFramed = (e) => foeAt(e) === app.framed;
      row = { list, x: 2, y: 2 + panel.h + 2, across: false, end: H - 2 }; // where the list sits, in the room canvas's pixels
      ctx.save(); ctx.globalAlpha = panel.alpha;
      drawCreatureList(ctx, list, row.x, row.y, row.across, row.end, isFramed);
      ctx.restore();
    }
    const line = fall?.from ? null : shownLine(state); // the fall's line once the hero wakes
    textLine.draw(ctx, line, t, still());
    if (line !== app.spokenLine) { app.spokenLine = line; if (line) spoken.textContent = line.text; }
    lanternButton.show(state.lit);
    if (app.screen === 'paused') drawPause(ctx, PAUSE_MENU, app.chosen, t, still());
    else if (app.screen === 'settings') drawPause(ctx, screens.menuOf(app.screen), app.chosen, t, still(), 'Settings');
    else if (app.screen === 'ways') { const l = screens.menuOf('ways')[app.chosen]; drawPause(ctx, screens.menuOf('ways'), app.chosen, t, still(), MODE_HEADING, l.dim ? HARDER_NOTE : l.note); } // MO4, D-346
    else if (app.screen === 'easier') drawPause(ctx, SURE_MENU, app.chosen, t, still(), easeHeading(app.easier), EASE_NOTE);
    else if (app.screen === 'seed') drawSeedPad(ctx, app.entry, app.chosen, t, still());
    else if (app.screen === 'howto') drawHowTo(ctx, app.page, app.settings.controls, app.chosen, t, still());
    else if (app.screen === 'history') drawHistory(ctx, app.rows, app.opened, app.scroll, app.chosen, t, still());
    else if (app.screen === 'journal') drawJournal(ctx, playing(app.profiles).records, playing(app.profiles).played, app.state, app.tab, app.chosen, t, still());
    else if (app.screen === 'map') drawMap(ctx, app.view, t, still(), screens.turns());
    else if (app.screen === 'bench') drawBenchPanel(ctx, benchMenu(state.bag), app.chosen, t, still());
    else if (app.screen === 'chest') drawChestPanel(ctx, stashAt(state, app.bench.x, app.bench.y), state.bag, app.chosen, spriteOf, t, still());
    else if (app.screen === 'bag') drawBag(ctx, state.bag, app.chosen, spriteOf, app.bagOnTop, state.held, state.health >= maxHealth(state));
    else dev.draw(ctx, state, cam);
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
