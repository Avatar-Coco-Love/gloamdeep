// § snapcap: a heartcap that bites, never moving, 2 hearts (step 0.3.11, D-365, D-543, D-544)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt, placeFor } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { makeState, step, wait, FIRST_START } from '../src/core/turn.js';
import { biteSound } from '../src/core/enemies.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 and one snapcap
const at = (x, y, extra = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id: 'snapcap', x, y }], ...extra });
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('a snapcap has 2 health and a bite of 1, no ways, shut as a heartcap, and drops a Snapcap Gill', () => {
  const m = get('snapcap');
  assert.equal(m.name, 'Snapcap'); assert.equal(m.health, 2); assert.equal(m.bite, 1);
  assert.deepEqual(m.ways, []);
  assert.equal(m.shutAs, 'heartcap'); assert.deepEqual(m.tone, get('heartcap').tone);
  assert.equal(m.drops, 'snapcapGill'); assert.equal(m.rare, undefined);
  for (const id of [m.hurt, m.die, m.bites]) assert.ok(LINES[id], id);
  assert.equal(get('snapcapGill').sells, 1); assert.equal(get('snapcapGill').max, 20);
});

test('it joins the pool from depth 2, never leaving', () => {
  for (const d of [2, 3, 5, 9]) assert.ok(poolAt(d).includes('snapcap'), d);
});

test('it never moves, even with the hero in sight and the lantern lit', () => {
  let s = at(5, 7);
  for (let i = 0; i < 6; i++) s = wait(s);
  assert.deepEqual(where(s), [[5, 7]]);
  assert.equal(s.health, at(5, 7).health);
});

test('beside the hero it bites for 1, lit or not, with its own snap', () => {
  for (const lit of [true, false]) {
    const s = at(5, 10, { lit }), n = wait(s);
    assert.equal(n.health, s.health - 1, `lit ${lit}`);
    assert.equal(n.line.id, 'snapcapBite');
    assert.equal(biteSound(n.events), 'snap');
  }
});

test('hurt, it stays where it is; two lantern hits beat it, worth 3', () => {
  const s = step(at(5, 10), 'up');
  assert.equal(s.enemies[0].health, 1);
  assert.deepEqual(where(s), [[5, 10]]);
  const n = step(s, 'up');
  assert.deepEqual(n.enemies, []);
  assert.equal(n.line.id, 'snapcapDie');
  assert.equal(n.xp, 3);
});

test('in a made room each snapcap gets a heartcap\'s tone, the same for the same seed', () => {
  const caps = [];
  for (let seed = 1; seed <= 40; seed++) for (const c of layoutAt(seed, 2).cells) {
    for (const e of placeFor(c.id, seed).enemies.filter((e) => e.id === 'snapcap')) {
      caps.push(e);
      const again = placeFor(c.id, seed).enemies.find((o) => o.x === e.x && o.y === e.y);
      assert.deepEqual(again.tone, e.tone);
    }
  }
  assert.ok(caps.length > 0, 'some snapcaps at depth 2');
  const { hue, light } = get('heartcap').tone;
  for (const e of caps) assert.ok(Math.abs(e.tone.hue) <= hue && Math.abs(e.tone.light) <= light);
});
