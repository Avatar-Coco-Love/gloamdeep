// § boons: the home waystone's 1 of 3 (D-583, D-596)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld, maxHealth, step, wait, HERO_HEALTH } from '../src/core/turn.js';
import { goToPlace, goToDepth } from '../src/core/stairs.js';
import { withTile } from '../src/core/room.js';
import { get, BOONS, BOON_SORTS } from '../src/core/registry.js';
import { offer, offerable, takeBoon, offersBoons, onHomePlate, dropOf, boonRow, OFFERED } from '../src/core/boon.js';
import { fall } from '../src/core/fall.js';
import { OIL } from '../src/core/oil.js';
import { DROP_CHANCE } from '../src/core/enemies.js';

const SEED = 5;
const plate = (room) => { for (let y = 0; y < room.rows; y++) { const x = room.map[y].search(/[ZA]/); if (x >= 0) return { x, y }; } return null; };
// In the woods, on the home plate woken, no creature near
function onHome() {
  const s = goToPlace(makeWorld('first', SEED), 'woods'), at = plate(s.room);
  return { ...s, room: withTile(s.room, at.x, at.y, get('wokenPlate')), hero: at, enemies: [] };
}

test('boons: every entry has a known kind, a name and one short line', () => {
  for (const b of Object.values(BOONS)) {
    assert.ok(BOON_SORTS[b.sort], b.id);
    assert.ok(b.name && b.words && b.words.length <= 60, b.id);
    assert.equal(b.kind, 'boon');
  }
  assert.equal(Object.keys(BOONS).length, 14); // the owner's list (D-596)
  assert.deepEqual(offerable().map((b) => b.id).sort(), ['keenEye', 'slowWick', 'stoutHeart']); // built so far
});

test('boons: the offer is 3, each of a different kind, the same for the same seed and turn', () => {
  for (let turn = 0; turn < 40; turn++) {
    const s = { ...onHome(), turn }, ids = offer(s);
    assert.equal(ids.length, OFFERED);
    assert.equal(new Set(ids.map((id) => BOONS[id].sort)).size, OFFERED);
    assert.deepEqual(offer(s), ids);
  }
  assert.deepEqual(boonRow('slowWick'), { id: 'slowWick', text: 'Slow Wick', note: 'Light and oil. The lantern burns a quarter slower.' });
});

test('boons: the woken home plate offers them while none is held', () => {
  const s = onHome();
  assert.ok(onHomePlate(s) && offersBoons(s));
  const held = takeBoon(s, 'keenEye');
  assert.equal(held.boon, 'keenEye');
  assert.equal(held.line.id, 'boonTake');
  assert.ok(held.events.some((e) => e.type === 'boon'));
  assert.ok(!offersBoons(held));
  assert.equal(takeBoon(held, 'slowWick'), held); // only one at a time
  assert.equal(takeBoon(s, 'wideGlow'), s); // not built yet, never taken
  const away = goToDepth(s, 2);
  assert.ok(!offersBoons(away));
});

test('boons: Stout Heart gives 2 more hearts, full, and they go home again', () => {
  const s = takeBoon(onHome(), 'stoutHeart');
  assert.equal(maxHealth(s), HERO_HEALTH + 2);
  assert.equal(s.health, HERO_HEALTH + 2);
  const down = goToDepth(s, 2);
  assert.equal(down.boon, 'stoutHeart');
  const home = goToPlace(down, 'woods');
  assert.equal(home.boon, null);
  assert.equal(home.health, HERO_HEALTH);
  assert.equal(maxHealth(home), HERO_HEALTH);
});

test('boons: Slow Wick burns a quarter slower, and stacks with the Copper Wick', () => {
  const turns = (s) => { let n = 0; for (s = { ...s, oil: 1 }; s.oil > 0; n++) s = wait(s); return n; };
  const s = goToDepth(takeBoon(onHome(), 'slowWick'), 2);
  const bare = { ...s, enemies: [] }, plain = { ...bare, boon: null };
  assert.equal(turns(plain), Math.round(1 / OIL.burn));
  assert.equal(turns(bare), 80);
  assert.equal(turns({ ...bare, parts: { wick: 'copperWick' } }), 100);
});

test('boons: Keen Eye drops the part 3 times in 4', () => {
  const s = onHome();
  assert.equal(dropOf(s, DROP_CHANCE), DROP_CHANCE);
  assert.equal(dropOf(takeBoon(s, 'keenEye'), DROP_CHANCE), 0.75);
});

test('boons: a fall ends the boon', () => {
  const s = goToDepth(takeBoon(onHome(), 'stoutHeart'), 2), after = fall(s);
  assert.equal(after.boon, null);
  assert.equal(after.health, HERO_HEALTH);
});

test('boons: stepping off the plate and back on offers again only with none held', () => {
  const s = onHome(), off = step(s, 'down');
  assert.ok(!onHomePlate(off));
  assert.ok(offersBoons(step(off, 'up')));
  assert.ok(!offersBoons(step(step(takeBoon(s, 'slowWick'), 'down'), 'up')));
});
