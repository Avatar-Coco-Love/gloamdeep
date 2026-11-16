// § bossrun: the boss test bench's bot (D-948). It starts the Lampeater's fight from the bench
// (src/core/bossbench.js) on many seeds and plays it as a player who knows the rules would: lantern
// off to lure it, on again as it comes beside you, strike while it burns, light the cold braziers
// it can reach you through, pour a flask when the oil runs low, drink a Mending Draught when the
// hearts do. One line a fight, then the sums. Not part of the game: the game has no build step.
//
//   node tools/bossrun.js [fights=100] [build=middling] [--half] [--first=1] [--quiet]
//
// The bot is fair, not clever: it plays the game's own turn rules, with no look at the dice.
import { step, wait, switchLantern, pour, eat, kindle, DIRS } from '../src/core/turn.js';
import { newJourney } from '../src/core/state.js';
import { bench, BUILDS } from '../src/core/bossbench.js';
import { tileAt } from '../src/core/room.js';
import { litAt } from '../src/core/sight.js';
import { canKindle } from '../src/core/bagturn.js';
import { get } from '../src/core/registry.js';

const args = process.argv.slice(2), flag = (n) => args.includes('--' + n);
const opt = (n, d) => { const a = args.find((x) => x.startsWith(`--${n}=`)); return a ? a.split('=')[1] : d; };
const plain = args.filter((a) => !a.startsWith('--'));
const FIGHTS = Number(plain[0] ?? 100), BUILD = plain[1] ?? 'middling', HALF = flag('half'), FIRST = Number(opt('first', 1));
const MOST_TURNS = 600, LOW_OIL = 0.25, KINDLE_OIL = 0.35, LOW_HEARTS = 2;
if (!BUILDS[BUILD]) { console.error(`build is one of: ${Object.keys(BUILDS).join(', ')}`); process.exit(1); }

const near = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y) === 1;
const dirTo = (a, b) => Object.keys(DIRS).find((d) => a.x + DIRS[d][0] === b.x && a.y + DIRS[d][1] === b.y);
const boss = (s) => s.enemies.find((e) => e.id === 'lampeater');
const slot = (s, id) => s.bag.findIndex((b) => b.id === id);

// The first step on a shortest way to any of `goals` over open floor, creatures in the way; null if none
function toward(s, goals) {
  const key = (t) => t.x + ',' + t.y, want = new Set(goals.map(key)), from = new Map([[key(s.hero), null]]), queue = [s.hero];
  const taken = new Set(s.enemies.map(key));
  while (queue.length) {
    const t = queue.shift();
    if (want.has(key(t)) && t !== s.hero) { let k = t; while (from.get(key(k)) !== s.hero && from.get(key(k))) k = from.get(key(k)); return dirTo(s.hero, k); }
    for (const [dx, dy] of Object.values(DIRS)) {
      const n = { x: t.x + dx, y: t.y + dy };
      if (from.has(key(n)) || n.x < 0 || n.y < 0 || n.x >= s.room.cols || n.y >= s.room.rows) continue;
      if (tileAt(s.room, n.x, n.y).solid || (taken.has(key(n)) && !want.has(key(n)))) continue;
      from.set(key(n), t); queue.push(n);
    }
  }
  return null;
}
const tilesOf = (s, id) => s.room.map.flatMap((row, y) => [...row].flatMap((ch, x) => (ch === get(id).letter ? [{ x, y }] : [])));
const beside = (t) => Object.values(DIRS).map(([dx, dy]) => ({ x: t.x + dx, y: t.y + dy }));

// § one turn's choice: (state) → the state after it, and what it did
function act(s) {
  const L = boss(s);
  if (L && near(s.hero, L)) { // beside it: light it if it's dark, then strike
    const lit = s.lit ? s : switchLantern(s);
    return [step(lit, dirTo(s.hero, L)), litAt(lit, L.x, L.y) ? 'strike' : 'swing'];
  }
  if (s.health <= LOW_HEARTS && slot(s, 'mendingDraught') >= 0) return [eat(s, slot(s, 'mendingDraught')), 'mend'];
  if (s.oil < LOW_OIL && slot(s, 'flask') >= 0) return [pour(s, slot(s, 'flask')), 'pour'];
  const cold = tilesOf(s, 'brazier');
  const by = cold.find((b) => near(s.hero, b));
  if (by && s.oil >= KINDLE_OIL && canKindle(s, by.x, by.y)) return [kindle(s.lit ? s : switchLantern(s), by.x, by.y), 'kindle'];
  // Lantern off, to lure it; walk to a cold brazier while the oil is good, else wait for it
  const dark = s.lit ? switchLantern(s) : s;
  if (cold.length && s.oil >= KINDLE_OIL) { const d = toward(dark, cold.flatMap(beside)); if (d) return [step(dark, d), 'walk']; }
  return [wait(dark), 'wait'];
}

// § one fight: (seed) → its line's facts
function fight(seed) {
  let s = bench(newJourney(seed), BUILD, HALF);
  const arena = s.place, fell = s.fell, most = s.health, out = { seed, turns: 0, snuffs: 0, strikes: 0, kindles: 0, flasks: 0, bites: 0 };
  for (let t = 0; t < MOST_TURNS; t++) {
    if (!boss(s)) return { ...out, won: true, s };
    const [next, did] = act(s);
    if (next === s) { s = wait(s); } else s = next;
    out.turns++;
    for (const v of s.events || []) {
      if (v.type === 'snuff') out.snuffs++;
      if (v.type === 'bite' && v.id === 'lampeater') out.bites++;
    }
    if (did === 'strike') out.strikes++;
    if (did === 'kindle') out.kindles++;
    if (did === 'pour') out.flasks++;
    if (s.fell !== fell || s.place !== arena) return { ...out, won: false, why: s.oil <= 0 ? 'dark' : 'bites', s, most };
  }
  return { ...out, won: false, why: 'stuck', s, most };
}

const rows = [];
for (let k = 0; k < FIGHTS; k++) {
  const r = fight(FIRST + k), L = boss(r.s), hp = (e) => e?.health ?? get('lampeater').health;
  rows.push(r);
  if (flag('quiet')) continue;
  const tail = r.won ? `hearts ${r.s.health}  oil ${Math.round(r.s.oil * 100)}%` : `${r.why}, it at ${hp(L)}/8`;
  console.log(`seed ${String(r.seed).padEnd(5)} ${r.won ? 'won ' : 'fell'}  turns ${String(r.turns).padStart(3)}  ${tail}  strikes ${r.strikes}  snuffs ${r.snuffs}  kindled ${r.kindles}  flasks ${r.flasks}  its bites ${r.bites}`);
}
const won = rows.filter((r) => r.won), mid = (xs) => { const a = [...xs].sort((x, y) => x - y); return a.length ? a[Math.floor(a.length / 2)] : '-'; };
const whys = ['bites', 'dark', 'stuck'].map((w) => `${rows.filter((r) => r.why === w).length} ${w}`).join(', ');
console.log(`bossrun: lampeater, ${BUILDS[BUILD].name}${HALF ? ', at half' : ''}, ${FIGHTS} seeds from ${FIRST}: won ${won.length}/${FIGHTS} (${Math.round((100 * won.length) / FIGHTS)}%) · turns, middle ${mid(rows.map((r) => r.turns))} · hearts left when won, middle ${mid(won.map((r) => r.s.health))} · snuffs, middle ${mid(rows.map((r) => r.snuffs))} · lost: ${whys}`);
