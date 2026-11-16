// § boss bar (Q-112, D-959): the Lampeater's name and hearts show while its way in is sealed,
// and are gone once it is beaten, or the hero falls; a loss turns pale, waits, then drains
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newJourney } from '../src/core/state.js';
import { bench } from '../src/core/bossbench.js';
import { step } from '../src/core/turn.js';
import { fall } from '../src/core/fall.js';
import { LAMPEATER_AT } from '../src/core/arena.js';
import { bossFight } from '../src/core/beaten.js';
import { paleAt, barParts, HOLD_MS, DRAIN_MS, BAR_W } from '../src/render/bossbar.js';

const boss = (s) => s.enemies.find((e) => e.id === 'lampeater');
const inGap = (seed = 1) => { const s = bench(newJourney(seed), 'middling'); return { ...s, hero: { x: s.hero.x, y: s.room.rows - 1 } }; };

test('no bar in the way in, before the seal; once sealed, its name and all 12 hearts', () => {
  const s = inGap();
  assert.equal(bossFight(s), null);
  assert.deepEqual(bossFight(step(s, 'up')), { id: 'lampeater', name: 'Lampeater', health: 12, max: 12 });
});

test('hurt, the bar shows its hearts left; beaten or fallen, it is gone', () => {
  const sealed = step(inGap(), 'up');
  assert.equal(bossFight({ ...sealed, enemies: [{ ...boss(sealed), health: 5 }] }).health, 5);
  assert.equal(bossFight({ ...sealed, enemies: [] }), null);
  assert.equal(bossFight(fall({ ...sealed, health: 0 })), null);
});

test('a loss holds pale, then drains to the hearts left; with reduced motion it drops at once', () => {
  assert.equal(paleAt(12, 10, 0, false), 12);
  assert.equal(paleAt(12, 10, HOLD_MS + DRAIN_MS / 2, false), 11);
  assert.equal(paleAt(12, 10, HOLD_MS + DRAIN_MS, false), 10);
  assert.equal(paleAt(12, 10, 0, true), 10);
  assert.deepEqual(barParts(6, 9, 12), { full: BAR_W / 2, pale: BAR_W * 3 / 4 });
});
