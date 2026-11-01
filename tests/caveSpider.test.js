// § cave spider: the lurker, shunning light only (step 0.3.7, D-535, D-536)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt } from '../src/core/room.js';
import { makeState, step, wait, switchLantern, FIRST_START } from '../src/core/turn.js';
import { setOil } from '../src/core/oil.js';
import { litAt } from '../src/core/sight.js';
import { biteSound } from '../src/core/enemies.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The first room with no torches, the hero at 5,11 and one cave spider
const at = (x, y, oil = 1) => setOil({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id: 'caveSpider', x, y }] }, oil);
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('a cave spider has 2 health and a bite of 1, shuns light only and drops Spider Silk', () => {
  const m = get('caveSpider');
  assert.equal(m.name, 'Cave spider'); assert.equal(m.health, 2); assert.equal(m.bite, 1);
  assert.deepEqual(m.ways, ['shunsLight']);
  assert.equal(m.drops, 'spiderSilk'); assert.equal(m.rare, undefined); // a depth 2 creature has no rare drop (D-453)
  assert.equal(m.colours, undefined); // one colour for now
  for (const id of [m.hurt, m.die, m.bites]) assert.ok(LINES[id], id);
  assert.equal(get('spiderSilk').sells, 1);
});

test('it joins the pool from depth 2', () => {
  assert.ok(poolAt(2).includes('caveSpider'));
  assert.ok(poolAt(9).includes('caveSpider'));
});

test('in the dark it waits where it is and never comes for the hero', () => {
  let s = switchLantern(at(5, 7));
  for (let i = 0; i < 4; i++) s = wait(s);
  assert.deepEqual(where(s), [[5, 7]]);
});

test('next to the hero in the dark it bites for 1, with its own hiss', () => {
  const s0 = switchLantern(at(5, 10)), n = wait(s0);
  assert.equal(n.health, s0.health - 1);
  assert.equal(n.line.id, 'caveSpiderBite');
  assert.equal(biteSound(n.events), 'hiss');
});

test('caught in the lantern light it backs away and does not bite', () => {
  const s = at(5, 10);
  assert.equal(litAt(s, 5, 10), true);
  const n = wait(s);
  assert.equal(n.health, s.health);
  assert.deepEqual(where(n), [[5, 9]]);
});

test('two lantern hits beat it, worth 3; hurt in the light, it backs off', () => {
  const s = at(5, 10), hurt = step(s, 'up');
  assert.equal(hurt.enemies.length, 1);
  assert.equal(hurt.line.id, 'caveSpiderHurt');
  const n = step({ ...hurt, enemies: [{ ...hurt.enemies[0], x: 5, y: 10 }], hero: { x: 5, y: 11 } }, 'up');
  assert.deepEqual(n.enemies, []);
  assert.equal(n.line.id, 'caveSpiderDie');
  assert.equal(n.xp, 3);
});
