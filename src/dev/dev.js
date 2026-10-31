// § dev: dev tools (DEV-TOOLS.md), on for everyone on every build (D-086).
// A wrench button slides out the drawer (panel.js); a stats line sits at the
// bottom left (D-088), or a short one with Settings' Stats line (D-412); on a
// PC, keys work the drawer (D-090). Words are in the game's pixel font (D-200).
import { tileAt, depthOf } from '../core/room.js';
import { get } from '../core/registry.js';
import { itemAt } from '../core/turn.js';
import { spawn } from '../core/spawn.js';
import { TILE, BUTTON, BUTTON_GAP, PAD_DISC, view, panelFoot } from '../render/screen.js';
import { lineUp } from '../render/textline.js';
import { drawGrid, drawPointed, drawWrench } from '../render/overlay.js';
import { buildPanel, el } from './panel.js';
import { setPixelText } from './pixeltext.js';
import { keepFading } from '../input/lantern.js';
import { DAY_TURNS } from '../core/daytime.js';
import { statsShown, padShown } from '../core/settings.js';

const KEY = 'gloamdeep-dev'; // localStorage: the switches and the open sections

// § storage: wrapped in try/catch, the game works without it (TECH.md)
function load() {
  try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
}
function save(opts) {
  try { localStorage.setItem(KEY, JSON.stringify(opts)); } catch { /* not saved */ }
}

// `game` gives tools the state: get() reads it, set(s) replaces it, reset()
// gives the state with the starting room back, forget() with a blank memory,
// setOil(amount) with that much oil, heal() with full hearts; still() is
// true when motion is reduced (D-190); settings() are Settings' switches; camera() is the
// room pixel at the screen's top-left (D-195). `picture` is the room's
// canvas; the wrench stands left of its top (D-199).
export function createDev(stage, canvas, game, picture) {
  // every switch starts off (D-047); only View starts open (D-087)
  const opts = { grid: false, coords: false, noLight: false, reveal: false, revealMap: false, stats: false, open: ['view'], ...load() };
  save(opts);

  // § panel: the wrench button and the folding sections
  const button = el('button', { id: 'dev-button', type: 'button', title: 'Dev tools (`)' });
  button.setAttribute('aria-label', 'Dev tools');
  button.setAttribute('aria-expanded', 'false');
  const icon = el('canvas', { width: 12, height: 12 });
  drawWrench(icon.getContext('2d'));
  button.append(icon);
  const panel = el('div', { id: 'dev-panel', className: 'shut', inert: true });
  const readout = el('div', { id: 'dev-readout' });
  const tools = buildPanel(panel, opts, () => save(opts), game);
  document.body.append(button, panel, readout);
  // § drawer: along the screen's left edge, from under the wrench's row, or the
  // hearts panel's foot when that is lower (D-512), down to the bottom (D-200). The stats line, small, sits bottom left just above the
  // text line's glass (D-382), or just above the arrow pad while it shows (D-412)
  let lineBottom = 0, padBottom = 0;
  const fitPanel = () => {
    const foot = document.getElementById('hud').getBoundingClientRect().top + panelFoot.y * view.scale + BUTTON_GAP;
    const top = Math.round(Math.max(parseFloat(button.style.top) + 52, foot));
    panel.style.top = top + 'px';
    panel.style.height = Math.max(88, innerHeight - 8 - top) + 'px';
  };
  const wrench = keepFading(picture, button, -1, BUTTON, (top, left, room) => { // it fades with the round map (D-442)
    lineBottom = innerHeight - room.bottom + (lineUp() + 2) * (room.height / picture.height); // above it, upright too (D-505)
    padBottom = innerHeight - room.bottom + BUTTON_GAP + PAD_DISC + 6;
    readout.style.bottom = lineBottom + 'px';
    fitPanel();
  });

  let open = false;
  const showPanel = (show) => {
    open = show;
    if (show) fitPanel(); // under the hearts panel as it stands now (D-512)
    panel.style.transition = game.still() ? 'none' : ''; // the Motion switch (D-190)
    panel.classList.toggle('shut', !show);
    panel.inert = !show;
    if (!show && panel.contains(document.activeElement)) document.activeElement.blur(); // keys walk again
    button.setAttribute('aria-expanded', String(show));
  };
  button.addEventListener('click', () => showPanel(!open));

  // § hide: the title screen keeps the wrench, panel and stats away, and their keys off
  let hidden = false;
  const hide = (on) => {
    hidden = on;
    if (on) showPanel(false);
    button.style.display = readout.style.display = on ? 'none' : '';
  };

  // § keys: ` the panel, G grid, C coordinates, R reveal room (D-090)
  const SWITCH_KEYS = { g: 'grid', c: 'coords', r: 'reveal' };
  addEventListener('keydown', (ev) => {
    if (hidden || ev.repeat || ev.ctrlKey || ev.metaKey || ev.altKey || ev.target.closest('textarea')) return;
    if (ev.key === '`') { showPanel(!open); return; }
    const name = SWITCH_KEYS[ev.key.toLowerCase()];
    if (name) tools.flip(name);
  });

  // § pointing: the room tile under the mouse, or under the finger (kept after it lifts)
  let pointed = null;
  const point = (ev) => {
    const r = canvas.getBoundingClientRect(), cam = game.camera(), { room } = game.get();
    const px = (ev.clientX - r.left) / r.width * canvas.width, py = (ev.clientY - r.top) / r.height * canvas.height;
    const tx = Math.floor((px + cam.x) / TILE), ty = Math.floor((py + cam.y) / TILE);
    const onRoom = px >= 0 && py >= 0 && px < canvas.width && py < canvas.height; // the room's canvas fills the screen (D-381)
    pointed = onRoom && tx >= 0 && ty >= 0 && tx < room.cols && ty < room.rows ? { x: tx, y: ty } : null;
  };
  stage.addEventListener('pointerdown', point);
  stage.addEventListener('pointermove', point);
  stage.addEventListener('pointerleave', (ev) => { if (ev.pointerType === 'mouse') pointed = null; });

  // § draw: called each frame after the game is drawn
  let text = '';
  // § fps: frames drawn each second, counted over half a second (D-294)
  let fps = 0, frames = 0, since = null;
  function countFrame(now) {
    if (since === null) since = now;
    frames++;
    if (now - since >= 500) { fps = Math.round((frames * 1000) / (now - since)); frames = 0; since = now; }
  }
  return {
    hide,
    wrench, // area() and fade(alpha), for the top right corner's fade (D-442)
    armed: () => tools.picked() !== null,
    lightOff: () => opts.noLight, // see the whole room, lit or not (D-057)
    revealed: () => opts.reveal, // show every tile as remembered; the memory is kept (D-061)
    revealedMap: () => opts.revealMap, // the map shows every room of the floor in full (D-205)
    // Places the picked entry on tile x, y. False when nothing is picked,
    // so the tap walks instead.
    place(x, y) {
      const picked = tools.picked();
      if (!picked) return false;
      game.set(spawn(game.get(), picked.id, x, y));
      return true;
    },
    draw(ctx, state, cam) {
      countFrame(performance.now());
      if (opts.grid) drawGrid(ctx, cam);
      if (opts.coords && pointed) {
        drawPointed(ctx, pointed.x - cam.x / TILE, pointed.y - cam.y / TILE);
      }
      tools.sync(state);
      // § stats: with the Stats switch on (D-382, was always on, D-088); a second line for the pick and the pointed tile.
      // Settings' Stats line alone shows a short one at full size, without what the panel shows (D-412)
      const full = opts.stats, short = !full && statsShown(game.settings());
      readout.hidden = !full && !short;
      if (readout.hidden) return;
      readout.classList.toggle('short', short);
      readout.style.bottom = (padShown(game.settings()) ? Math.max(lineBottom, padBottom) : lineBottom) + 'px';
      const h = state.hero, picked = tools.picked(), day = `day ${state.turn % DAY_TURNS}/${DAY_TURNS}`;
      let next = short
        ? `fps ${fps} · turn ${state.turn} · ${day} · xp ${state.xp} · hero ${h.x},${h.y} · seed ${state.seed}`
        : `fps ${fps} · turn ${state.turn} · ${day} · oil ${Math.round(state.oil * 100)}% · ${state.lit ? 'lit' : 'dark'} · health ${state.health} · xp ${state.xp} · hero ${h.x},${h.y} · depth ${depthOf(state.place)} · seed ${state.seed}`;
      const more = [];
      if (picked) more.push(`placing ${picked.name}`);
      if (opts.coords && pointed) {
        let tile = `tile ${pointed.x},${pointed.y} ${tileAt(state.room, pointed.x, pointed.y).id}`;
        const it = itemAt(state, pointed.x, pointed.y);
        if (it) tile += `, ${get(it.id).name}`;
        more.push(tile);
      }
      if (more.length) next += '\n' + more.join(' · ');
      const zoom = short ? 2 : 1;
      if (next + zoom !== text) { text = next + zoom; setPixelText(readout, next, zoom); } // touch the page only on change
    },
  };
}
