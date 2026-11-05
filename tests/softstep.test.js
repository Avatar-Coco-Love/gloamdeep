// § soft step: the lantern's last tile of light wakes no creature (D-600)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS } from '../src/core/room.js';
import { makeState, wait, switchLantern, FIRST_START } from '../src/core/turn.js';
import { litAt, clearLine } from '../src/core/sight.js';
import { boonNotice } from '../src/core/boon.js';
import { BOONS } from '../src/core/registry.js';

const room = makeRoom(FIRST_ROOM);
const at = (enemies, boon = null) => ({ ...makeState(room, FIRST_START, FIRST_LIGHTS, []), enemies, boon });
// Tiles the lantern alone lights, with a clear line to the hero, not beside them, measured
// after the turn's oil has burned, as the creatures move then
function tiles(keep) {
  const s = wait(at([])), off = switchLantern(s), out = [];
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
    const far = Math.abs(x - s.hero.x) + Math.abs(y - s.hero.y) > 1;
    if (far && litAt(s, x, y) && !litAt(off, x, y) && clearLine(room, { x, y }, s.hero) && keep(s, x, y)) out.push({ x, y });
  }
  return out;
}
const edge = tiles((s, x, y) => !litAt(s, x, y, 1)), inner = tiles((s, x, y) => litAt(s, x, y, 1));

test('soft step: built, 1 tile, and only while held', () => {
  assert.equal(BOONS.softStep.notice, 1);
  assert.ok(!BOONS.softStep.soon);
  assert.equal(boonNotice(at([], 'softStep')), 1);
  assert.equal(boonNotice(at([])), 0);
  assert.ok(edge.length && inner.length, 'the first room has both');
});

test('soft step: a rat at the lantern\'s edge stays put with it, and notices without', () => {
  for (const t of edge) {
    const rat = [{ id: 'rat', ...t }];
    assert.ok(!wait(at(rat, 'softStep')).enemies[0].chasing, `${t.x},${t.y}`);
    assert.ok(wait(at(rat)).enemies[0].chasing, `${t.x},${t.y}`);
  }
});

test('soft step: one tile further into the light, it notices', () => {
  for (const t of inner) assert.ok(wait(at([{ id: 'rat', ...t }], 'softStep')).enemies[0].chasing, `${t.x},${t.y}`);
});

test('soft step: the shy ones see as before, and a torch still wakes a rat', () => {
  for (const t of edge) {
    const shy = [{ id: 'caveSpider', ...t }];
    assert.equal(!!wait(at(shy, 'softStep')).enemies[0].chasing, !!wait(at(shy)).enemies[0].chasing, `${t.x},${t.y}`);
  }
  const s = switchLantern(at([{ id: 'rat', x: 4, y: 5 }], 'softStep'));
  assert.ok(wait({ ...s, hero: { x: 4, y: 11 } }).enemies[0].chasing);
});
