// § map preview page (D-646): runs in the browser, inside the page tools/mappreview.js
// writes. It draws any seed's floor from the game's own generation and its own map
// drawing (the Seed Explorer's, D-214), with the way to the stairs, creatures and finds
// marked on top, a line of numbers and a tap-a-room panel. Not part of the game.
import { floorPlan, wholeSurface } from '../../src/core/map.js';
import { explorerWorld } from '../../src/core/explorer.js';
import { drawPlan } from '../../src/render/map.js';
import { layoutAt } from '../../src/core/region.js';
import { fresh } from '../../src/core/stairs.js';
import { areaAt, tileAt } from '../../src/core/room.js';
import { get } from '../../src/core/registry.js';
import { SEED_MAX } from '../../src/core/rng.js';
import { ROOMS as HEARTH, HOME_ID, isMountain, kindOf } from '../../src/core/hearthwood.js';

// § state: the seeds seen this visit (Back steps through them), the depth, the marks shown
const K = 8, DEPTHS = 13, BIOME_LAST = 8, CRYPT_ROOMS = ['first', 'south', 'second'];
const $ = (id) => document.getElementById(id);
const store = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch { return null; } return null; };
const randomSeed = () => Math.floor(Math.random() * SEED_MAX) + 1;
let seeds = [+store('gd-preview-seed') || randomSeed()], depth = +(store('gd-preview-depth') ?? 2) || 0, chosen = null;
const seed = () => seeds[seeds.length - 1];
const shown = () => ({ way: $('way').checked, creatures: $('creatures').checked, finds: $('finds').checked, labels: $('labels').checked, shapes: $('shapes').checked });

// § finds and their dot colours; creatures are all one colour
const FIND = { flask: '#f39a3b', herb: '#6fc06a', oilcap: '#e0c060', heartcap: '#e0607a', locket: '#a58ce0' }; // the locket, a relic, in the unusual things' violet (D-691)
const cached = (it) => it.once && it.id !== 'locket'; // a cache's finds; the locket is left once too
const FIND_ELSE = '#d8d2c0', CREATURE = '#ff5a4a', PERSON = '#7fd8ff', WAY = '#ffd66b', CHOSEN = '#ffffff';
// § shapes: a tint over each hall and large room (D-645), so they stand out
const SHAPE_TINT = { 2: 'rgba(127, 216, 255, 0.16)', 4: 'rgba(165, 140, 224, 0.22)' };
const SHAPE_NAME = { 1: 'one cell', 2: 'a hall, 2 cells', 4: 'a large room, 2 × 2 cells' };
const name = (id) => get(id)?.name || id;
// § kinds: a Hearthwood room's kind, in words (D-738, D-756)
const KIND_WORDS = { thick: 'thick woods', woods: 'woods, as before', glade: 'an open glade' };
const kindWords = (s, id) => (!HEARTH.includes(id) ? null : isMountain(id) ? 'a mountain room' : id === HOME_ID ? 'home, woods as before' : KIND_WORDS[kindOf(s, id)]);

// § the floor: its plan, every room's contents, and for a generated depth its way
const cache = new Map();
function floorOf(s, d) {
  const k = `${s}:${d}`;
  if (cache.has(k)) return cache.get(k);
  const world = explorerWorld(s), plan = d === 0 ? wholeSurface(world) : floorPlan(world, true, d);
  const rooms = plan.rooms.map((r) => ({ ...r, ...contents(r, s) }));
  const layout = layoutAt(s, d), info = layout ? wayOf(layout) : null;
  const floor = { plan, rooms, layout, info };
  cache.set(k, floor);
  return floor;
}
function contents({ id, room }, s) {
  const p = fresh(id, s), tiles = {};
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
    const t = tileAt(room, x, y).id;
    if (['deposit', 'vein', 'water', 'waystonePlate', 'wokenPlate', 'stairsUp', 'stairsDown'].includes(t)) tiles[t] = (tiles[t] || 0) + 1;
  }
  return { enemies: p.enemies, items: p.items, people: p.people || [], tiles };
}
// How many joins each room is from the stairs up, the rooms on the way, the dead ends, the loops
function wayOf({ cells }) {
  const byId = new Map(cells.map((c) => [c.id, c])), up = cells.find((c) => c.up), down = cells.find((c) => c.down);
  const steps = new Map([[up.id, 0]]), back = new Map(), todo = [up];
  while (todo.length) {
    const c = todo.shift();
    for (const { to } of c.doors) if (!steps.has(to)) { steps.set(to, steps.get(c.id) + 1); back.set(to, c.id); todo.push(byId.get(to)); }
  }
  const way = [down.id];
  while (way[0] !== up.id) way.unshift(back.get(way[0]));
  const joins = cells.reduce((n, c) => n + c.doors.length, 0) / 2;
  const deadEnds = cells.filter((c) => c.doors.length === 1 && !c.up && !c.down).length;
  const halls = cells.filter((c) => c.w * c.h === 2).length, large = cells.filter((c) => c.w * c.h === 4).length;
  return { steps, way: new Set(way), wayLength: way.length, deadEnds, loops: joins - (cells.length - 1), up: up.id, down: down.id, halls, large };
}

// § numbers: the line under the map
function numbers({ rooms, info }) {
  const count = (test) => rooms.reduce((n, r) => n + r.items.filter((it) => test(it.id)).length, 0);
  const tiles = (id) => rooms.reduce((n, r) => n + (r.tiles[id] || 0), 0);
  const parts = [];
  parts.push(`${rooms.length} rooms`);
  if (info) parts.push(`the way ${info.wayLength} rooms`, `${rooms.length - info.wayLength} side rooms`, `${info.halls} halls`, `${info.large} large rooms`, `${info.deadEnds} dead ends`, `${info.loops} loops`);
  parts.push(`${rooms.reduce((n, r) => n + r.enemies.length, 0)} creatures`, `${count((id) => id === 'flask')} flasks`, `${count((id) => id === 'herb')} herbs`,
    `${count((id) => id === 'heartcap')} heartcaps`, `${rooms.reduce((n, r) => n + r.items.filter(cached).length, 0)} cache finds`, ...(count((id) => id === 'locket') ? ['the locket'] : []), `${rooms.filter((r) => r.tiles.water).length} pools`, `${tiles('deposit') + tiles('vein')} deposits`);
  return parts;
}
function biomeRooms(s) {
  let n = CRYPT_ROOMS.length;
  for (let d = 2; d <= BIOME_LAST; d++) n += layoutAt(s, d).cells.length;
  return n;
}

// § drawing: the game's own map, then the marks over it
function draw() {
  const f = floorOf(seed(), depth), { plan } = f, show = shown(), base = $('map');
  drawPlan(base, plan, K);
  const c = base.getContext('2d');
  for (const r of f.rooms) {
    const px = r.x * K, py = r.y * K, w = r.room.cols * K, h = r.room.rows * K, cell = f.layout?.cells.find((m) => m.id === r.id);
    if (show.shapes && cell && SHAPE_TINT[cell.w * cell.h]) { c.fillStyle = SHAPE_TINT[cell.w * cell.h]; c.fillRect(px, py, w, h); }
    if (show.way && f.info?.way.has(r.id)) { c.strokeStyle = WAY; c.lineWidth = 2; c.strokeRect(px + 1, py + 1, w - 2, h - 2); }
    if (show.finds) for (const it of r.items) { if (it.once || it.id === 'locket') ring(c, r.x + it.x, r.y + it.y); dot(c, r.x + it.x, r.y + it.y, FIND[it.id] || FIND_ELSE, 0.6); } // a cache's finds ringed (D-650)
    if (show.creatures) for (const e of r.enemies) dot(c, r.x + e.x, r.y + e.y, CREATURE, 0.7);
    for (const p of r.people) dot(c, r.x + p.x, r.y + p.y, PERSON, 0.8);
    if (show.labels) {
      const step = f.info?.steps.get(r.id), text = step === undefined ? r.id : `${step}`;
      c.font = 'bold 12px ui-monospace, Menlo, monospace'; c.fillStyle = 'rgba(0,0,0,.6)';
      c.fillRect(px + 3, py + 3, c.measureText(text).width + 6, 15); c.fillStyle = WAY; c.fillText(text, px + 6, py + 15);
    }
    if (chosen === r.id) { c.strokeStyle = CHOSEN; c.lineWidth = 2; c.setLineDash([4, 3]); c.strokeRect(px - 2, py - 2, w + 4, h + 4); c.setLineDash([]); }
  }
  $('seed').value = seed();
  $('back').disabled = seeds.length < 2;
  const area = areaAt(depth);
  $('heading').textContent = depth === 0 ? 'Depth 0 · Hearthwood and the crypt' : `Depth ${depth} · ${area.area.toLowerCase()}`;
  $('numbers').replaceChildren(...numbers(f).map((t) => Object.assign(document.createElement('li'), { textContent: t })));
  $('biome').textContent = `Biome 1, depths 0 to 8: ${biomeRooms(seed())} rooms, the crypt's 3 counted (D-645 aims for about 69).`;
  document.querySelectorAll('#depths button').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.depth === depth)));
  room();
  store('gd-preview-seed', String(seed())); store('gd-preview-depth', String(depth));
}
// A white ring under a dead end's cache finds (D-650)
function ring(c, x, y) { c.strokeStyle = '#fff'; c.lineWidth = 2; c.strokeRect(x * K + 1, y * K + 1, K - 2, K - 2); }
function dot(c, x, y, colour, size) {
  const s = Math.round(K * size), o = (K - s) / 2;
  c.fillStyle = '#000'; c.fillRect(x * K + o - 1, y * K + o - 1, s + 2, s + 2);
  c.fillStyle = colour; c.fillRect(x * K + o, y * K + o, s, s);
}

// § the room panel: what the room tapped holds
function room() {
  const f = floorOf(seed(), depth), r = f.rooms.find((m) => m.id === chosen), panel = $('room');
  if (!r) { panel.innerHTML = '<p class="hint">Tap a room to see what it holds.</p>'; return; }
  const cell = f.layout?.cells.find((c) => c.id === r.id), step = f.info?.steps.get(r.id);
  const role = !f.info ? '' : r.id === f.info.up ? 'the stairs up' : r.id === f.info.down ? 'the stairs down' : f.info.way.has(r.id) ? 'on the way' : cell?.doors.length === 1 ? 'a side room, a dead end' : 'a side room';
  const list = (things) => {
    const n = {};
    for (const t of things) n[name(t.id)] = (n[name(t.id)] || 0) + 1;
    return Object.entries(n).map(([k, v]) => (v > 1 ? `${k} × ${v}` : k)).join(', ') || 'none';
  };
  const tiles = Object.entries(r.tiles).filter(([id]) => !id.startsWith('stairs')).map(([id, n]) => `${name(id)} ${n}`).join(', ') || 'none';
  panel.innerHTML = '';
  const rows = [
    ['Room', r.id], ...(kindWords(seed(), r.id) ? [['Kind', kindWords(seed(), r.id)]] : []), ...(cell ? [['Cell', `${cell.x}, ${cell.y} · ${SHAPE_NAME[cell.w * cell.h]}${cell.w * cell.h === 2 ? (cell.w === 2 ? ' side by side' : ', one above the other') : ''} · ${cell.cols} × ${cell.rows} tiles · its seed ${cell.seed}`]] : []),
    ...(role ? [['Where', `${role}${step !== undefined ? ` · ${step} joins from the stairs up` : ''}`]] : []),
    ['Creatures', list(r.enemies)], ['Finds', list(r.items.filter((it) => !cached(it)))], ...(cell?.end ? [['Cache', list(r.items.filter(cached))]] : []), ['People', list(r.people)], ['Tiles', tiles],
  ];
  const dl = document.createElement('dl');
  for (const [k, v] of rows) dl.append(Object.assign(document.createElement('dt'), { textContent: k }), Object.assign(document.createElement('dd'), { textContent: v }));
  panel.append(dl);
}

// § controls: Reseed, Back, a typed seed, the depth buttons, the marks, a tap on the map, and keys
function setSeed(s) { if (s >= 1 && s <= SEED_MAX && s !== seed()) { seeds.push(s); chosen = null; } draw(); }
function setDepth(d) { if (d >= 0 && d < DEPTHS && d !== depth) { depth = d; chosen = null; } draw(); }
function boot() {
  const row = $('depths');
  for (let d = 0; d < DEPTHS; d++) {
    const b = Object.assign(document.createElement('button'), { type: 'button', textContent: d === 0 ? '0 Surface' : d === 1 ? '1 Crypt' : String(d) });
    b.dataset.depth = d; b.addEventListener('click', () => setDepth(d)); row.append(b);
  }
  $('reseed').addEventListener('click', () => setSeed(randomSeed()));
  $('back').addEventListener('click', () => { if (seeds.length > 1) { seeds.pop(); chosen = null; } draw(); });
  $('seedform').addEventListener('submit', (e) => { e.preventDefault(); setSeed(Math.round(+$('seed').value)); });
  for (const id of ['way', 'creatures', 'finds', 'labels', 'shapes']) $(id).addEventListener('change', draw);
  $('map').addEventListener('click', (e) => {
    const box = e.currentTarget.getBoundingClientRect(), f = floorOf(seed(), depth);
    const x = ((e.clientX - box.left) / box.width) * f.plan.cols, y = ((e.clientY - box.top) / box.height) * f.plan.rows;
    const hit = f.rooms.find((r) => x >= r.x - 0.5 && y >= r.y - 0.5 && x < r.x + r.room.cols + 0.5 && y < r.y + r.room.rows + 0.5);
    chosen = hit && hit.id !== chosen ? hit.id : null;
    draw();
  });
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' && e.target.type !== 'checkbox') return;
    if (e.key === 'r' || e.key === 'R') setSeed(randomSeed());
    else if (e.key === 'b' || e.key === 'B') $('back').click();
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); setDepth(depth - 1); }
    else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); setDepth(depth + 1); }
  });
  draw();
}
boot();
