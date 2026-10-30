// § rare drops: the three rare materials (D-454), about 1 in 10 on a coin of their own,
// beside the common one when both fall (D-476)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, look, itemAt } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';

const room = makeRoom(FIRST_ROOM);
const RARES = { scorpion: 'venomSac', flaskMimic: 'mimicHeart', gloamling: 'gloamEye' };
const FIRST = { venomSac: ['A venom sac! A rare find.', 'A venom sac, for crafting later.', "You can't carry more venom sacs."],
  mimicHeart: ['A mimic heart! A rare find.', 'A mimic heart, for crafting later.', "You can't carry more mimic hearts."],
  gloamEye: ['A gloam eye! A rare find.', 'A gloam eye, for crafting later.', "You can't carry more gloam eyes."] };
// The hero at 5,11 and the creature one hit from beaten on 5,10, one step up.
const beat = (id, seed, s = makeState(room)) => step({ ...s, seed, hero: { x: 5, y: 11 }, items: [],
  enemies: [{ id, x: 5, y: 10, health: 1, chasing: true }] }, 'up');
const seeds = Array.from({ length: 1000 }, (_, i) => i + 1);

test('rats and lampmoths have no rare drop', () => {
  assert.equal(get('rat').rare, undefined);
  assert.equal(get('lampmoth').rare, undefined);
});

for (const [foe, rare] of Object.entries(RARES)) {
  const common = get(foe).drops;
  const has = (seed, id) => beat(foe, seed).items.some((it) => it.id === id);
  const [take, lookLine, full] = FIRST[rare];

  test(`a beaten ${foe} leaves ${rare} about 1 in 10, the common still about 1 in 2`, () => {
    assert.equal(get(foe).rare, rare);
    assert.equal(get(rare).max, 20);
    const n = seeds.filter((s) => has(s, rare)).length, c = seeds.filter((s) => has(s, common)).length;
    assert.ok(n > 60 && n < 140, `${n} of 1000`);
    assert.ok(c > 420 && c < 580, `${c} of 1000`);
  });

  test(`with both, the common lies where the ${foe} fell and ${rare} on a tile beside it`, () => {
    const both = beat(foe, seeds.find((s) => has(s, rare) && has(s, common)));
    assert.equal(itemAt(both, 5, 10).id, common);
    const r = both.items.find((it) => it.id === rare);
    assert.equal(Math.max(Math.abs(r.x - 5), Math.abs(r.y - 10)), 1);
    const alone = beat(foe, seeds.find((s) => has(s, rare) && !has(s, common)));
    assert.deepEqual(alone.items, [{ id: rare, x: 5, y: 10 }]);
  });

  test(`stepping onto ${rare} takes it, a full bag leaves it, and the bag says a look line`, () => {
    const YES = seeds.find((s) => has(s, rare) && !has(s, common));
    const n = step(beat(foe, YES), 'up');
    assert.deepEqual(n.bag, [{ id: rare, n: 1 }]);
    assert.equal(shownLine(n).text, take);
    const stacks = Array.from({ length: 6 }, () => ({ id: rare, n: 20 }));
    const f = step(beat(foe, YES, { ...makeState(room), bag: stacks }), 'up');
    assert.equal(itemAt(f, 5, 10).id, rare);
    assert.equal(shownLine(f).text, full);
    assert.equal(shownLine(look({ ...makeState(room), bag: [{ id: rare, n: 1 }] }, 0)).text, lookLine);
  });
}
