// § guard: Body's row 2 upgrade, 1 ember, once; about 1 bite in 6 glances off, by the seeded
// dice, after the vest's own roll, with its own line (D-814, D-817)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, wait, FIRST_START } from '../src/core/turn.js';
import { upgradeAt } from '../src/core/growth.js';
import { shownLine } from '../src/core/lines.js';
import { guards } from '../src/core/guard.js';
import { UPGRADES } from '../src/core/upgrades.js';

const room = makeRoom(FIRST_ROOM);
const at = (enemies, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies, ...more });
const rat = [{ id: 'rat', x: 5, y: 10 }];
const kept = (s) => wait(s).health === s.health;

test('Guard is Body\'s row 2 upgrade, 1 ember, once, a shield', () => {
  const u = UPGRADES.guard;
  assert.equal(upgradeAt({ col: 1, row: 1, slot: 0 }), u);
  assert.deepEqual([u.cost, u.most, u.look, u.words], [1, 1, 'shield', 'About 1 bite in 6 glances off.']);
});

test('without Guard every bite hurts; with it about 1 in 6 glances off, with its line, the same for the same seed', () => {
  let off = 0;
  for (let seed = 1; seed <= 600; seed++) {
    const s = at(rat, { seed });
    assert.equal(kept(s), false);
    const g = { ...s, grown: { guard: 1 } }, n = wait(g);
    if (n.health === g.health) {
      off++;
      assert.equal(shownLine(n).text, 'The bite glances off you.');
      assert.deepEqual(n.events.filter((e) => e.type === 'bite'), [{ type: 'bite', id: 'rat', hurt: 0 }]);
    }
    assert.equal(wait(g).health, n.health, 'the same each time');
  }
  assert.ok(off > 70 && off < 130, `about 1 in 6: ${off} of 600`);
});

test('with the vest worn too, each rolls: about 3 bites in 8 glance off, the vest\'s line when it turns one', () => {
  let off = 0, vest = 0;
  for (let seed = 1; seed <= 800; seed++) {
    const s = at(rat, { seed, grown: { guard: 1 }, worn: { armour: ['ratVest'] } }), n = wait(s);
    if (n.health === s.health) { off++; if (shownLine(n).text === 'The bite glances off your vest.') vest++; }
  }
  assert.ok(off > 250 && off < 350, `about 3 in 8: ${off} of 800`);
  assert.ok(vest > 150 && vest < 250, `the vest's 1 in 4: ${vest} of 800`);
});

test('a drink is not turned: an oil tick still drinks with Guard', () => {
  for (let seed = 1; seed <= 60; seed++) {
    const s = at([{ id: 'oilTick', x: 5, y: 10 }], { seed, grown: { guard: 1 } });
    assert.ok(wait(s).oil < s.oil);
  }
});

test('guards rolls apart for each biter, never without Guard', () => {
  const s = at(rat, { seed: 7 });
  assert.equal(guards(s, rat[0]), false);
});
