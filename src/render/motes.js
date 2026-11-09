// § motes: a few faint pale motes drift in the lantern light toward the stairs
// down not yet seen (D-581, D-605). About 5 at once, slow, with a little
// wobble, fading in and out; only inside the lantern's reach, and only seen
// where the light falls, dimmer where it is dim. None with reduced motion.
// Once the stairs are remembered, a few stay (D-751, D-755): each wanders
// its own slow way, its heading bending gently, fading in and out as before.
import { hash } from '../core/noise.js';
import { TILE as T } from './screen.js';
import { litAt } from './light.js';

const MOST = 5, SPEED = 0.12, LIFE = 0.006; // motes at once, pixels a frame, life lost a frame
const WANDER = 0.05; // the staying motes' pixels a frame, slower than the draft (D-755)
const motes = [];
let born = 0, was = null;
// c: the room's context in room pixels; to: the stairs' tile or null;
// lx, ly, r: the lantern's flame and reach in room pixels;
// stay: how many motes stay, wandering, when there is no draft (D-755)
export function drawMotes(c, to, lx, ly, r, still, stay = 0) {
  const most = to ? MOST : stay, mode = to ? 'draft' : 'stay';
  if (!most || still || r <= 8) { motes.length = 0; return; }
  if (was !== mode) { motes.length = 0; was = mode; }
  let ux = 0, uy = 0;
  if (to) { const dx = to.x * T + 8 - lx, dy = to.y * T + 8 - ly, len = Math.hypot(dx, dy) || 1; ux = dx / len; uy = dy / len; }
  const inside = r * 0.8;
  while (motes.length < most) {
    const n = born++, a = hash(n, 1, 581) * Math.PI * 2, d = Math.sqrt(hash(n, 2, 581)) * inside * 0.8;
    motes.push({ x: lx + Math.cos(a) * d - ux * 4, y: ly + Math.sin(a) * d - uy * 4, life: 0, ph: hash(n, 3, 581) * 6, head: hash(n, 4, 581) * Math.PI * 2 });
  }
  if (motes.length > most) motes.length = most;
  for (let i = motes.length - 1; i >= 0; i--) {
    const m = motes[i];
    m.life += LIFE;
    if (!to) m.head += Math.sin(m.life * 9 + m.ph) * 0.02; // its own way, bending gently (D-755)
    const vx = to ? ux * SPEED : Math.cos(m.head) * WANDER, vy = to ? uy * SPEED : Math.sin(m.head) * WANDER;
    m.x += vx + Math.sin(m.life * 30 + m.ph) * 0.08;
    m.y += vy + Math.cos(m.life * 25 + m.ph) * 0.08;
    const out = Math.hypot(m.x - lx, m.y - ly) > inside;
    if (m.life >= 1 || out) { motes.splice(i, 1); continue; }
    const x = Math.round(m.x), y = Math.round(m.y), a = Math.sin(m.life * Math.PI) * Math.min(1, litAt(x, y) * 2); // only where there is light
    if (a <= 0.03) continue;
    c.globalAlpha = a;
    c.fillStyle = '#fff5dc'; c.fillRect(x, y, 1, 1);
  }
  c.globalAlpha = 1;
}
