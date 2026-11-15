// § lampeater: biome 1's boss, steps 2 and 3 (D-939, D-941, D-943): in its arena, one tile below the
// tile before its sealed door; it moves only through the dark, backs out of light and goes home when it
// loses the hero; it doesn't bite yet, every blow sinks into it, and its page shows the grey hints
// until it is beaten; an arena made before it came gets it once
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { makeState, makeWorld, step, wait } from '../src/core/turn.js';
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

test('the Lampeater is in the registry: no hearts yet, no bite, dark only, its eyes glow, blows sink', () => {
  const e = get('lampeater');
  assert.deepEqual([e.name, e.kind, e.health, e.bite, e.ways, e.eyesGlow, e.fightAt, e.follows], ['Lampeater', 'enemy', undefined, 0, ['darkOnly'], true, 1, undefined]);
  assert.equal(LINES[e.sinks].text, 'Your blow sinks into the gloam.');
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

test('lantern off, it comes through the dark to beside the hero, and waits there without biting', () => {
  const s = turns(inHall({ lit: false }), 12), e = s.enemies[0];
  assert.deepEqual([e.x, e.y], [2, 2]);
  assert.ok(e.chasing);
  assert.deepEqual(e.home, { x: 12, y: 2 }); // the tile it first stood on
  assert.equal(s.health, inHall().health);
  assert.ok(!s.events.some((v) => v.type === 'bite'));
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

test('light falling on it, it backs into the dark, away from the hero', () => {
  const s = inHall({ lit: true, enemies: [{ id: 'lampeater', x: 3, y: 2 }] }), next = wait(s), e = next.enemies[0];
  assert.ok(litAt(s, 3, 2));
  assert.equal(Math.abs(e.x - 3) + Math.abs(e.y - 2), 1); // a tile a turn
  assert.ok(Math.abs(e.x - 1) + Math.abs(e.y - 2) > 2); // away from the hero
  const later = turns(next, 3), f = later.enemies[0];
  assert.ok(!litAt(later, f.x, f.y)); // and out into the dark
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

test('a blow sinks into it: nothing hurt, a turn passed, its line, a hit marked sank', () => {
  const before = meet(at({ lit: false })), s = step(before, 'right'); // in the dark, it stays beside the hero
  assert.deepEqual(s.enemies.map(({ id, x, y, health }) => ({ id, x, y, health })), before.enemies.map(({ id, x, y, health }) => ({ id, x, y, health })));
  assert.equal(s.health, before.health);
  assert.equal(s.turn, before.turn + 1);
  assert.equal(s.line.id, 'lampeaterSinks');
  assert.ok(s.events.some((e) => e.type === 'hit' && e.sank && !e.rang));
  const fist = step({ ...before, held: 'wardenFist' }, 'right'); // the Fist knocks nothing back
  assert.deepEqual([fist.enemies[0].x, fist.enemies[0].y], [before.enemies[0].x, before.enemies[0].y]);
  assert.equal(hitFoe(before, before.enemies[0], 3), before); // nor a sting, a glob or a slam
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
});
