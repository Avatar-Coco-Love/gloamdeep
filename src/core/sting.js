// § sting (D-729): the scorpion's way, `strikes`. One that strikes never bites beside the hero.
// Each creature turn, in enemiesMove (creatureturn.js): one that strikes and has noticed the hero,
// with the hero in its row or column within its way's `reach` tiles and a clear line, raises its
// tail instead of stepping: `raised`, the way { dx, dy } it will strike, with its `raises` line
// and a `raise` event. On the creatures' next turn, before the others bite or move (stingTurn),
// it strikes the `reach` tiles ahead that way, stopping at a tile that blocks light: on the hero
// there, its `bite` in hearts (none in god mode), a `bite` event, its `bites` line; a creature
// there is hurt its `bite` too, as a glob hurts one, beaten with no drop and no experience, and
// the `stingsFoe` line names it unless the hero was hit as well (D-766, D-768). One under the
// earth or a pile of bones is passed over. A creature in front doesn't shield the hero behind.
// Hitting nothing, its `misses` line. Then it stands still `rest` turns as well as the one it
// struck in (`rests`). A blow still beats it while raised; one stung while raised strikes no more.
// Claude's drafts the owner may change: a reach of 2, a rest of 1, and armour can't turn a strike aside;
// the Shell Vest blunts it, a strike of 2 hurting 1 (D-801).
// One that slams (the warden, D-885) strikes so with a reach of 1, and its way's `knocks` sends the
// hero hit that many tiles straight back, along the strike's way (knock).
import { get } from './registry.js';
import { enemyAt, hitEnemy } from './enemies.js';
import { traits } from './behaviours.js';
import { tileAt } from './room.js';
import { clearLine } from './sight.js';
import { say } from './lines.js';
import { note } from './events.js';
import { fall } from './fall.js';
import { blunted } from './worn.js';
import { personAt } from './people.js';
import { offEdge } from './openings.js';

export function stingTurn(state) {
  if (!state.enemies.some((e) => e.raised)) return state;
  let s = state;
  for (const was of state.enemies) {
    const e = was.raised && s.enemies.find((o) => o.x === was.x && o.y === was.y && o.id === was.id && o.raised);
    if (!e) continue; // stung by another first
    s = strike(s, e);
    if (s.health <= 0 && !state.god) return fall(s);
  }
  return s;
}

// § reach: (state, e) → the way { dx, dy } one that strikes would raise its tail, or null: it
// strikes, is awake and resting no more, and the hero stands in its row or column within reach
// with a clear line (sight.js). Read by enemiesMove, and by nextMoves for its mark.
export function reach(state, e) {
  const way = traits(get(e.id)).strikes;
  if (!way || e.asleep || e.stirs || e.raised || e.rests > 0) return null;
  const dx = state.hero.x - e.x, dy = state.hero.y - e.y, far = Math.abs(dx) + Math.abs(dy);
  if ((dx && dy) || !far || far > way.reach || !clearLine(state.room, e, state.hero)) return null;
  return { dx: Math.sign(dx), dy: Math.sign(dy) };
}

// § struck: (state, e) → the tiles a raised one strikes, nearest first, up to the first that blocks light
export function struck(state, e) {
  const way = traits(get(e.id)).strikes, tiles = [];
  if (!way || !e.raised) return tiles;
  for (let i = 1; i <= way.reach; i++) {
    const x = e.x + e.raised.dx * i, y = e.y + e.raised.dy * i;
    if (tileAt(state.room, x, y).blocksLight) break;
    tiles.push({ x, y });
  }
  return tiles;
}

function strike(state, e) {
  const entry = get(e.id), way = traits(entry).strikes, tiles = struck(state, e);
  const hit = tiles.some((t) => t.x === state.hero.x && t.y === state.hero.y);
  const { raised, ...down } = e, rested = { ...down, rests: way.rest + 1 };
  let s = { ...state, enemies: state.enemies.map((o) => (o === e ? rested : o)) }, foe = null;
  for (const t of tiles) {
    const o = enemyAt(s, t.x, t.y);
    if (!o || o.under || o.pile) continue; // under the earth (D-726), or a pile of bones (D-731), passed over as a glob passes them
    foe = foe || o;
    s = { ...s, enemies: hitEnemy(s.enemies, o, get(o.id), entry.bite) };
  }
  if (!hit) return foe ? say(s, 'stingsFoe', get(foe.id).name.toLowerCase()) : say(s, entry.misses);
  const hurt = blunted(state, entry.bite), health = state.god ? state.health : Math.max(0, state.health - hurt);
  const bitten = note(say({ ...s, health }, entry.bites), 'bite', { id: e.id, hurt });
  return way.knocks ? knock(bitten, raised, way.knocks) : bitten;
}

// § knock (D-885): (state, way, n) → the hero slid up to n tiles along `way`, stopping before the
// room's edge, a solid tile (rock, a tree, a boulder, a thing set down), a creature or a person.
// For now a stop only ends the slide; the hurt it does is the next step's. Finds on the tiles are
// passed over, and stairs landed on are not taken, as no step was walked. A `knock` event, { from, to }.
function knock(state, way, n) {
  let { x, y } = state.hero;
  for (let i = 0; i < n; i++) {
    const nx = x + way.dx, ny = y + way.dy;
    if (offEdge(state.room, nx, ny) || tileAt(state.room, nx, ny).solid) break;
    if (enemyAt(state, nx, ny) || personAt(state, nx, ny)) break;
    x = nx; y = ny;
  }
  const from = state.hero;
  return note({ ...state, hero: { ...from, x, y } }, 'knock', { from: { x: from.x, y: from.y }, to: { x, y } });
}
