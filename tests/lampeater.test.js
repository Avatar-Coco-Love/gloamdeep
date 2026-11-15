// § lampeater: biome 1's boss, steps 2 to 4 (D-939, D-941, D-943, D-944): in its arena, one tile below the
// tile before its sealed door; it moves only through the dark, backs out of light and goes home when it
// loses the hero; it bites for 2 in the dark; light falling on it holds it a turn, and only then do blows
// hurt it; its page shows the grey hints until it is beaten; an arena made before it came gets it once
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { makeState, makeWorld, step, wait, switchLantern } from '../src/core/turn.js';
import { makeRoom, SKY, placeFor } from '../src/core/room.js';
import { litAt } from '../src/core/sight.js';
import { hitFoe } from '../src/core/enemies.js';
import { layoutAt } from '../src/core/region.js';
import { goToPlace } from '../src/core/stairs.js';
import { ARENA_DEPTH, LAMPEATER_AT } from '../src/core/arena.js';
import { withLampeater } from '../src/core/oldarena.js';
import { UPGRADES, FORMAT } from '../src/core/save.js';
import { pageOf, HINT, fightHint, meet } from '../src/core/bestiary.js';

const map = ['TTTTTTTT', 'T......T', 'T......T', 'T......T', 'TTTTTTTT'];
const at = (extra = {}) => ({ ...makeState(makeRoom(map, SKY, 'woods'), { x: 1, y: 2 }, [], []), enemies: [{ id: 'lampeater', x: 2, y: 2 }], lit: true, oil: 99, ...extra });
const arenaOf = (seed) => layoutAt(seed, ARENA_DEPTH).cells.find((c) => c.arena);

test('the Lampeater is in the registry: 8 hearts, a bite of 2, dark only, its eyes glow, it burns, blows sink', () => {
  const e = get('lampeater');
  assert.deepEqual([e.name, e.kind, e.health, e.bite, e.ways, e.eyesGlow, e.burns, e.fightAt, e.follows, e.sound], ['Lampeater', 'enemy', 8, 2, ['darkOnly'], true, true, 1, undefined, 'gloam']);
  assert.equal(LINES[e.sinks].text, 'Your blow sinks into the gloam.');
  assert.equal(LINES[e.bites].text, 'The Lampeater bites!');
  assert.equal(LINES[e.caughtSays].text, "Caught in your light, it can't move!");
  assert.ok(e.acts && e.fights);
});

test('it stands in the arena, a tile below the tile before the sealed door, which stays open to reach', () => {
  for (const seed of [1, 2, 3, 4, 5]) {
    const p = placeFor(arenaOf(seed).id, seed);
    assert.deepEqual(p.enemies, [{ id: 'lampeater', ...LAMPEATER_AT }]);
    assert.deepEqual(LAMPEATER_AT, { x: 6, y: 6 });
    assert.equal(p.map[4][6], get('sealedDoor').letter); assert.equal(p.map[5][6], '.');
  }
});

// A long dark hall: the hero at its left end, the Lampeater at its right
const hall = ['##############', '#............#', '#............#', '#............#', '##############'];
const inHall = (extra = {}) => ({ ...makeState(makeRoom(hall), { x: 1, y: 2 }, [], []), enemies: [{ id: 'lampeater', x: 12, y: 2 }], oil: 0.5, place: 'hall', ...extra });
const turns = (s, n) => { for (let i = 0; i < n; i++) s = wait(s); return s; };

test('lantern off, it comes through the dark to beside the hero, and bites for 2 there', () => {
  const s = turns(inHall({ lit: false, god: true }), 12), e = s.enemies[0];
  assert.deepEqual([e.x, e.y], [2, 2]);
  assert.ok(e.chasing);
  assert.deepEqual(e.home, { x: 12, y: 2 }); // the tile it first stood on
  const bit = wait(s);
  assert.ok(bit.events.some((v) => v.type === 'bite' && v.id === 'lampeater' && v.hurt === 2));
  assert.equal(bit.line.id, 'lampeaterBite');
  const real = wait({ ...s, god: false });
  assert.equal(real.health, s.health - 2);
});

test('it never bites while lit, even beside the hero', () => {
  const s = wait(inHall({ lit: true, enemies: [{ id: 'lampeater', x: 2, y: 2 }] }));
  assert.ok(!s.events.some((v) => v.type === 'bite'));
  assert.equal(s.health, inHall().health);
});

test('lantern lit, it comes only to the edge of the light, never onto a lit tile', () => {
  let s = inHall({ lit: true });
  for (let i = 0; i < 14; i++) {
    s = wait(s);
    assert.ok(!litAt(s, s.enemies[0].x, s.enemies[0].y), `turn ${i}: on a lit tile`);
  }
  const e = s.enemies[0];
  assert.ok(e.x < 12 && e.chasing); // it came
  assert.ok(litAt(s, e.x - 1, e.y)); // and waits where the light starts
});

test('light falling on it, it is caught a turn, then backs into the dark, away from the hero', () => {
  const s = inHall({ lit: true, enemies: [{ id: 'lampeater', x: 3, y: 2 }] }), held = wait(s), h = held.enemies[0];
  assert.ok(litAt(s, 3, 2));
  assert.deepEqual([h.x, h.y, h.caught], [3, 2, true]); // held where it stands
  assert.equal(held.line.id, 'lampeaterCaught');
  const next = wait(held), e = next.enemies[0];
  assert.equal(Math.abs(e.x - 3) + Math.abs(e.y - 2), 1); // then a tile a turn
  assert.ok(Math.abs(e.x - 1) + Math.abs(e.y - 2) > 2); // away from the hero
  const later = turns(next, 3), f = later.enemies[0];
  assert.ok(!litAt(later, f.x, f.y)); // and out into the dark
  assert.ok(!f.caught); // back in the dark, the next light catches it again
});

test('the catch: lantern off it comes, switched on beside it, two blows land, then it slips away', () => {
  let s = turns(inHall({ lit: false, god: true }), 12);
  assert.deepEqual([s.enemies[0].x, s.enemies[0].y], [2, 2]);
  s = switchLantern(s);
  assert.equal(s.turn, turns(inHall({ lit: false, god: true }), 12).turn); // the switch is free
  s = step(s, 'right'); // the lantern's swing: 1
  assert.deepEqual([s.enemies[0].health, s.enemies[0].x, s.enemies[0].caught], [7, 2, true]);
  assert.ok(s.events.some((v) => v.type === 'hit' && !v.sank));
  assert.ok(!s.events.some((v) => v.type === 'bite'));
  s = step(s, 'right'); // still held: another
  assert.equal(s.enemies[0].health, 6);
  assert.notDeepEqual([s.enemies[0].x, s.enemies[0].y], [2, 2]); // and it slipped away
});

test('losing the hero, it drifts back home through the dark, a tile a turn', () => {
  const moved = turns(inHall({ lit: false }), 12);
  const hidden = { ...moved, hero: { ...moved.hero }, room: makeRoom(['##############', '#.#..........#', '#.#..........#', '#.#..........#', '##############']) };
  // a wall now stands between them: no clear line
  const s = turns({ ...hidden, hero: { x: 1, y: 2 }, enemies: [{ ...moved.enemies[0], x: 4 }] }, 1);
  assert.deepEqual([s.enemies[0].x, s.enemies[0].chasing], [5, false]);
  const home = turns(s, 10);
  assert.deepEqual([home.enemies[0].x, home.enemies[0].y], [12, 2]);
  assert.equal(turns(home, 2).enemies[0].x, 12); // and stays there
});

test('in its arena: the hero lit at the way in, it leaves its place but never steps onto light', () => {
  const seed = 3, s0 = goToPlace(makeWorld('first', seed), arenaOf(seed).id);
  let s = { ...s0, lit: true, oil: 0.5 };
  for (let i = 0; i < 8; i++) { s = wait(s); const e = s.enemies[0]; assert.ok(!litAt(s, e.x, e.y)); }
  assert.notDeepEqual([s.enemies[0].x, s.enemies[0].y], [LAMPEATER_AT.x, LAMPEATER_AT.y]);
});

test('in the dark a blow sinks into it: nothing hurt, a turn passed, its line, a hit marked sank', () => {
  const before = inHall({ lit: false, enemies: [{ id: 'lampeater', x: 2, y: 2 }] }), s = step(before, 'right'); // in the dark
  assert.deepEqual(s.enemies.map(({ id, x, y, health }) => ({ id, x, y, health })), before.enemies.map(({ id, x, y, health }) => ({ id, x, y, health })));
  assert.equal(s.turn, before.turn + 1);
  assert.equal(step({ ...before, god: true }, 'right').line.id, 'lampeaterBite'); // its bite's line said after (D-117)
  assert.ok(s.events.some((e) => e.type === 'hit' && e.sank && !e.rang));
  assert.equal(hitFoe(before, before.enemies[0], 3), before); // a sting, a glob or a slam sinks, lit or not
  assert.equal(hitFoe({ ...before, lit: true }, before.enemies[0], 3).enemies[0], before.enemies[0]);
});

test('lit, blows hurt it: a knife takes 2, the Fist 2 and knocks it nowhere; out of hearts it is gone', () => {
  const lit = inHall({ lit: true, enemies: [{ id: 'lampeater', x: 2, y: 2 }] });
  assert.equal(step({ ...lit, held: 'knife' }, 'right').enemies[0].health, 6);
  const fist = step({ ...lit, held: 'wardenFist' }, 'right').enemies[0];
  assert.deepEqual([fist.health, fist.x, fist.y], [6, 2, 2]);
  const last = step({ ...lit, enemies: [{ id: 'lampeater', x: 2, y: 2, health: 1 }] }, 'right');
  assert.deepEqual(last.enemies, []);
  assert.ok(last.events.some((e) => e.type === 'beat' && e.id === 'lampeater'));
});

test('met when light reaches it; its page shows the grey hints, how to fight it after 1', () => {
  const s = meet(at());
  assert.ok(s.enemies[0].met);
  const page = pageOf({ lampeater: { met: 1, beaten: 0 } }, 'lampeater');
  assert.deepEqual([page.acts, page.fights], [HINT, fightHint(0, 1)]);
  assert.equal(fightHint(0, 1), 'Beat 1 to learn how to fight it.');
});

test('an older save: an arena made before it came gets it, once, never onto the hero', () => {
  assert.equal(FORMAT, 37); assert.equal(UPGRADES[36], withLampeater);
  const seed = 3, id = arenaOf(seed).id, inside = goToPlace(makeWorld('first', seed), id);
  const empty = { ...inside, enemies: [] }, s = withLampeater(empty);
  assert.deepEqual(s.enemies, [{ id: 'lampeater', ...LAMPEATER_AT }]);
  assert.equal(withLampeater(s), s);
  const onIt = { ...empty, hero: { ...empty.hero, ...LAMPEATER_AT } };
  assert.equal(withLampeater(onIt), onIt);
  const away = goToPlace(empty, 'depth3'), kept = withLampeater(away);
  assert.deepEqual(kept.elsewhere[id].enemies, [{ id: 'lampeater', ...LAMPEATER_AT }]);
  const never = makeWorld('first', seed);
  assert.equal(withLampeater(never), never); // never made: it comes with the arena when made
});

test('a blow that sinks into it puffs, the swing with no blow; its eyes alone glow over the dark', async () => {
  const any = new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => 0 : any), apply: () => any });
  globalThis.document ??= { createElement: () => ({ getContext: () => any }), addEventListener() {}, body: any, documentElement: any };
  const { createHearing } = await import('../src/hearing.js');
  const heard = [], sound = new Proxy({}, { get: (o, v) => () => heard.push(v) });
  createHearing({ state: { room: { dark: {} }, place: 'depth8' } }, sound, {}).hear([{ type: 'hit', id: 'lampeater', held: null, sank: true }]);
  assert.deepEqual(heard, ['miss']);
  const { drawGlows } = await import('../src/render/sprites.js');
  const drawn = [], c = new Proxy({}, { get: (o, k) => (k === 'drawImage' ? (...a) => drawn.push(a.slice(1)) : () => {}), set: () => true });
  drawGlows(c, [{ id: 'lampeater', x: 6, y: 6 }], 0, true);
  assert.deepEqual(drawn, [[96, 94]]); // one picture, its eyes, where its sprite stands: 2 up, its lowest row on the shadow
  const dots = [], b = new Proxy({}, { get: (o, k) => (k === 'drawImage' ? (...a) => dots.push(a.slice(1)) : k === 'fillRect' ? (...a) => dots.push(a) : () => {}), set: () => true });
  drawGlows(b, [{ id: 'lampeater', x: 6, y: 6 }], 0, true, [], (e) => e, () => true);
  const pic = dots.findIndex((d) => d.length === 2);
  assert.deepEqual(dots.filter((d) => d.length === 2), [[96, 94]]); // burning: its paled picture, not its eyes alone
  assert.ok(dots.slice(pic).filter((d) => d.length === 4).length >= 12); // then its ring of flame, dot by dot
});
