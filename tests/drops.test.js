// § drops: the other common materials (D-454, D-535, D-537, D-541, D-543, D-549, D-551), dropped, taken and kept the
// Rat Tail's way (D-475); the Rat Tail's own tests are in rattail.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, look, itemAt } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';

const room = makeRoom(FIRST_ROOM);
const DROPS = { lampmoth: 'mothDust', scorpion: 'stinger', flaskMimic: 'mimicGlass', gloamling: 'gloamWisp', caveSpider: 'spiderSilk', bat: 'batWing', mole: 'moleFur', snapcap: 'snapcapGill', herbMimic: 'mimicLeaf' }; // the bone rat's Rat Bone, dropped as its pile scatters: bones.test.js (D-731)
const FIRST = { mothDust: ['You gather the moth dust.', 'Moth dust, good for making things.', "You can't carry more moth dust."],
  stinger: ['You pick up the stinger.', 'A stinger, for crafting later.', "You can't carry more stingers."],
  mimicGlass: ['You pick up the mimic glass.', 'Mimic glass. With 2 oilcaps, a flask.', "You can't carry more mimic glass."],
  gloamWisp: ['You catch the gloam wisp.', 'A gloam wisp, good for making things.', "You can't carry more gloam wisps."],
  spiderSilk: ['You pick up the spider silk.', 'Spider silk, good for making things.', "You can't carry more spider silk."],
  batWing: ['You pick up the bat wing.', 'A bat wing, for crafting later.', "You can't carry more bat wings."],
  moleFur: ['You pick up the mole fur.', 'Mole fur, good for making things.', "You can't carry more mole fur."],
  snapcapGill: ['You pick up the snapcap gill.', 'A snapcap gill, good for making things.', "You can't carry more snapcap gills."],
  mimicLeaf: ['You pick up the mimic leaf.', 'A mimic leaf, good for making things.', "You can't carry more mimic leaves."] };
// The hero at 5,11 and the creature one hit from beaten on 5,10, one step up.
const beat = (id, seed, s = makeState(room)) => step({ ...s, seed, hero: { x: 5, y: 11 }, items: [],
  enemies: [{ id, x: 5, y: 10, health: 1, chasing: true }] }, 'up');
const seeds = Array.from({ length: 400 }, (_, i) => i + 1);

for (const [foe, drop] of Object.entries(DROPS)) {
  const dropped = (seed) => itemAt(beat(foe, seed), 5, 10)?.id === drop;
  const YES = seeds.find(dropped);
  const [take, lookLine, full] = FIRST[drop];

  test(`a beaten ${foe} leaves ${drop} about 1 time in 2, in stacks of 20`, () => {
    assert.equal(get(foe).drops, drop);
    assert.equal(get(drop).max, 20);
    assert.equal(get(drop).regrow, undefined);
    const n = seeds.filter(dropped).length;
    assert.ok(n > 160 && n < 240, `${n} of 400`);
    assert.deepEqual(beat(foe, YES).items, [{ id: drop, x: 5, y: 10 }]);
  });

  test(`stepping onto ${drop} takes it, a full bag leaves it, and the bag says a look line`, () => {
    const n = step(beat(foe, YES), 'up');
    assert.deepEqual(n.bag, [{ id: drop, n: 1 }]);
    assert.equal(shownLine(n).text, take);
    const stacks = Array.from({ length: 6 }, () => ({ id: drop, n: 20 }));
    const f = step(beat(foe, YES, { ...makeState(room), bag: stacks }), 'up');
    assert.equal(itemAt(f, 5, 10).id, drop);
    assert.equal(shownLine(f).text, full);
    assert.equal(shownLine(look({ ...makeState(room), bag: [{ id: drop, n: 1 }] }, 0)).text, lookLine);
  });
}

test('a foe beaten on an item leaves its drop on that tile too, and one step takes both (D-727)', () => {
  const YES = seeds.find((seed) => itemAt(beat('scorpion', seed), 5, 10)?.id === 'stinger' && beat('scorpion', seed).items.length === 1);
  const s = step({ ...makeState(room), seed: YES, hero: { x: 5, y: 11 }, items: [{ id: 'flask', x: 5, y: 10 }],
    enemies: [{ id: 'scorpion', x: 5, y: 10, health: 1, chasing: true }] }, 'up');
  assert.deepEqual(s.items.filter((it) => it.x === 5 && it.y === 10).map((it) => it.id), ['flask', 'stinger']);
  const n = step(s, 'up');
  assert.equal(n.items.filter((it) => it.x === 5 && it.y === 10).length, 0);
  assert.ok(n.bag.some((b) => b.id === 'stinger'));
});
