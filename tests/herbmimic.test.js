// § herb mimic: a herb with eyes and teeth, asleep in disguise until bumped (step 0.3.14, D-549, D-550)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt, placeFor } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { makeState, step, wait, FIRST_START, creatureList } from '../src/core/turn.js';
import { biteSound } from '../src/core/enemies.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 and one herb mimic, asleep unless `awake` is set
const at = (x, y, awake = false, extra = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id: 'herbMimic', x, y, ...(!awake && { asleep: true }) }], ...extra });
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('a herb mimic has 2 health and a bite of 1, chases for 6 turns once awake, looks like a herb, and drops a Mimic Leaf', () => {
  const m = get('herbMimic');
  assert.equal(m.name, 'Herb mimic'); assert.equal(m.health, 2); assert.equal(m.bite, 1);
  assert.deepEqual(m.ways, ['chases']); assert.equal(m.looksLike, 'herb'); assert.equal(m.awakeTurns, 6);
  assert.equal(m.drops, 'mimicLeaf'); assert.equal(m.rare, undefined); // its rare one waits (Q-077)
  for (const id of [m.hurt, m.die, m.bites, m.wakes, m.settles]) assert.ok(LINES[id], id);
  assert.equal(LINES[m.wakes].text, 'The herb opens its eyes!');
  assert.equal(get('mimicLeaf').sells, 1); assert.equal(get('mimicLeaf').max, 20);
});

test('it joins the pool from depth 3, never leaving, and not at depth 2', () => {
  assert.ok(!poolAt(2).includes('herbMimic'));
  for (const d of [3, 4, 5, 9]) assert.ok(poolAt(d).includes('herbMimic'), d);
});

test('asleep it does nothing, even beside the hero, and is hidden from the creature list', () => {
  let s = at(5, 10);
  for (let i = 0; i < 5; i++) s = wait(s);
  assert.deepEqual(where(s), [[5, 10]]);
  assert.equal(s.health, at(5, 10).health);
  assert.deepEqual(creatureList(at(5, 10)), []);
});

test('a hurt hero stepping on it to heal only wakes it: no harm, no healing', () => {
  const s = at(5, 10, false, { health: 3 }), n = step(s, 'up');
  assert.equal(n.health, 3);
  assert.deepEqual(n.hero, { x: 5, y: 11 });
  assert.equal(n.line.id, 'herbMimicWakes');
  assert.equal(n.enemies[0].awake, 6);
});

test('awake, it bites for 1 with a rustle, and two lantern hits beat it, worth 3', () => {
  const w = step(at(5, 10), 'up'), n = wait(w);
  assert.equal(n.health, w.health - 1);
  assert.equal(n.line.id, 'herbMimicBite');
  assert.equal(biteSound(n.events), 'rustle');
  const beaten = step(step(w, 'up'), 'up');
  assert.deepEqual(beaten.enemies, []);
  assert.equal(beaten.line.id, 'herbMimicDie');
  assert.equal(beaten.xp, 3);
});

test('in a made room each herb mimic starts asleep, the same for the same seed', () => {
  let seen = 0;
  for (let seed = 1; seed <= 40; seed++) for (const d of [3, 5]) for (const c of layoutAt(seed, d).cells) {
    for (const e of placeFor(c.id, seed).enemies.filter((e) => e.id === 'herbMimic')) {
      seen++;
      assert.equal(e.asleep, true);
    }
  }
  assert.ok(seen > 0, 'some herb mimics at depths 3 and 5');
});
