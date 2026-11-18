// § brood: the Lampeater's step 8 (D-949): a gloamling crawls from each brazier it snuffs onto a dark
// tile beside the bowl, the seeded dice picking; with none dark it waits in the bowl; its line the
// first time, after the gutter's; met already, no drop, no Records or Bestiary count, no following
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { makeState, step as step2 } from '../src/core/turn.js';
import { makeRoom } from '../src/core/room.js';
import { breathe } from '../src/core/snuff.js';
import { crawl } from '../src/core/brood.js';
import { counted } from '../src/core/record.js';
import { booked } from '../src/core/bestiary.js';
import { arrive } from '../src/core/stairs.js';

const L = get('brazierLit').letter;
const hall = ['##############', `#${L}...........#`, '#............#', `#...........${L}#`, '##############'];
const inHall = (e = {}, extra = {}) => ({ ...makeState(makeRoom(hall), { x: 1, y: 2 }, [], []), enemies: [{ id: 'lampeater', x: 6, y: 2, ...e }], lit: false, place: 'hall', ...extra });
const step = (s) => crawl(breathe(s, { ...s, turn: s.turn + 1, events: [] }));
const snuffed = (seed = 1) => { let s = inHall({ health: 6, x: 9 }, { seed }); for (let i = 0; i < 3; i++) s = step(s); return s; };
const lings = (s) => s.enemies.filter((e) => e.id === 'gloamling');

test('its line and its Bestiary words', () => {
  assert.equal(LINES.gloamlingCrawls.text, 'A gloamling crawls out of the ashes.');
  assert.match(get('lampeater').acts, /Gloamlings crawl from the braziers it snuffs\./);
});

test('one gloamling crawls out beside the snuffed bowl as it goes cold, its line after the gutter', () => {
  const s = snuffed(), [g] = lings(s);
  assert.equal(lings(s).length, 1);
  assert.equal(Math.abs(g.x - 12) + Math.abs(g.y - 3), 1);
  assert.deepEqual(g.ash, { x: 12, y: 3, turn: s.turn });
  assert.ok(g.met && !g.chasing);
  assert.deepEqual(s.enemies[0].bowls, []);
  assert.equal(shownLine(s).text, 'The brazier gutters out. A gloamling crawls out of the ashes.');
});

test('the seeded dice pick its tile, the same each time', () => {
  const tiles = new Set();
  for (let seed = 1; seed <= 12; seed++) { const [a] = lings(snuffed(seed)), [b] = lings(snuffed(seed)); assert.deepEqual([a.x, a.y], [b.x, b.y]); tiles.add(a.x + ',' + a.y); }
  assert.ok(tiles.size > 1);
});

test('with no dark tile beside the bowl it waits, and comes out once one is dark', () => {
  const cold = makeRoom(hall.map((r, y) => (y === 3 ? r.replace(L, get('brazier').letter) : r))); // the bowl cold, as a snuffed one is
  const lit = { ...inHall({ bowls: [{ x: 12, y: 3 }] }), room: cold, lit: true, hero: { x: 11, y: 2 } };
  let s = crawl(lit);
  assert.equal(lings(s).length, 0);
  assert.deepEqual(s.enemies[0].bowls, [{ x: 12, y: 3 }]);
  s = crawl({ ...s, lit: false, turn: s.turn + 1 });
  assert.equal(lings(s).length, 1);
});

test('its bowl lit again, it comes out into the light all the same, so it never waits for good (H-77)', () => {
  const relit = { ...inHall({ bowls: [{ x: 12, y: 3 }] }), lit: false }, seen = relit.room.map.join('').split('').map(() => 1); // the hall's bowl at 12,3 lit again, seen: its glow on every tile beside
  const s = crawl({ ...relit, seen });
  assert.equal(lings(s).length, 1);
  assert.deepEqual(s.enemies[0].bowls, []);
});

test('the line only the first time', () => {
  let s = snuffed();
  s = crawl({ ...s, turn: s.turn + 1, line: null, enemies: s.enemies.map((e) => (e.id === 'lampeater' ? { ...e, bowls: [{ x: 1, y: 1 }] } : e)) });
  assert.equal(lings(s).length, 2);
  assert.equal(s.line, null);
});

test('beaten, it counts in no Records or Bestiary; it never follows; leaving takes it away', () => {
  const ev = [{ type: 'beat', id: 'gloamling', ash: true }];
  assert.equal(counted({ beaten: 3 }, ev).beaten, 3);
  assert.deepEqual(booked({}, ev), {});
  const s = snuffed(), out = arrive(s, 'elsewhere', { room: s.room, enemies: [], items: [], lights: [] }, { x: 1, y: 2 });
  assert.equal(out.elsewhere.hall.enemies.filter((e) => e.id === 'gloamling').length, 0);
  assert.equal(out.elsewhere.hall.enemies.length, 1);
});

test('beaten, it drops nothing, and its beat is marked `ash`', () => {
  const room = makeRoom(['#######', '#.....#', '#.....#', '#######']);
  const plain = (seed, e = {}) => step2({ ...makeState(room, { x: 2, y: 2 }, [], []), seed, items: [], enemies: [{ id: 'gloamling', x: 2, y: 1, health: 1, chasing: true, ...e }] }, 'up');
  const seeds = Array.from({ length: 60 }, (_, i) => i + 1);
  assert.ok(seeds.some((n) => plain(n).items.length > 0));
  assert.ok(seeds.every((n) => plain(n, { ash: { x: 1, y: 1, turn: 0 }, met: true }).items.length === 0));
  assert.ok(plain(1, { ash: { x: 1, y: 1, turn: 0 }, met: true }).events.some((v) => v.type === 'beat' && v.ash));
});
