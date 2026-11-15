// § lampeater: biome 1's boss, step 2 (D-939, D-941): standing in its arena, one tile below the tile
// before its sealed door; it never moves or bites, every blow sinks into it, and its page shows the
// grey hints until it is beaten; an arena made before it came gets it once
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { makeState, makeWorld, step, wait } from '../src/core/turn.js';
import { makeRoom, SKY, placeFor } from '../src/core/room.js';
import { nextMoves } from '../src/core/creatureturn.js';
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

test('the Lampeater is in the registry: no hearts yet, no bite, it waits, its eyes glow, blows sink', () => {
  const e = get('lampeater');
  assert.deepEqual([e.name, e.kind, e.health, e.bite, e.ways, e.eyesGlow, e.fightAt], ['Lampeater', 'enemy', undefined, 0, ['waits'], true, 1]);
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

test('beside it, it never moves or bites, and shows no next move', () => {
  let s = at();
  assert.deepEqual(nextMoves(s), []);
  for (let i = 0; i < 5; i++) s = wait(s);
  assert.deepEqual([s.enemies[0].x, s.enemies[0].y], [2, 2]);
  assert.ok(!s.events.some((e) => e.type === 'bite'));
  s = wait({ ...s, lit: false }); // in the dark too
  assert.ok(!s.events.some((e) => e.type === 'bite'));
});

test('a blow sinks into it: nothing hurt, a turn passed, its line, a hit marked sank', () => {
  const before = meet(at()), s = step(before, 'right');
  assert.deepEqual(s.enemies, before.enemies);
  assert.equal(s.turn, before.turn + 1);
  assert.equal(s.line.id, 'lampeaterSinks');
  assert.ok(s.events.some((e) => e.type === 'hit' && e.sank && !e.rang));
  const fist = step({ ...before, held: 'wardenFist' }, 'right'); // the Fist knocks nothing back
  assert.deepEqual(fist.enemies, before.enemies);
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
