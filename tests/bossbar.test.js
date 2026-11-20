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
import { paleAt, barParts, barBox, HOLD_MS, DRAIN_MS, BAR_W, BOX_H } from '../src/render/bossbar.js';
import { view } from '../src/render/screen.js';

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

test('the bar sits top middle; on an upright phone, below the panel and buttons it would meet (D-1004)', () => {
  const was = view.w;
  view.w = 422; // a phone held sideways: room between the panel and the buttons
  const panel = { x: 4, y: 4, w: 57, h: 32 }, pause = { x: 113, y: 4, w: 22, h: 22 };
  assert.deepEqual(barBox(4, [panel]), { x: 160, y: 4, w: BAR_W + 6, h: BOX_H });
  view.w = 195; // upright: the panel and pause in its way, so it drops below both
  assert.equal(barBox(4, [pause, panel]).y, 38);
  assert.equal(barBox(4, [{ x: 0, y: 0, w: 0, h: 0 }]).y, 4); // a piece not placed yet is no obstacle
  view.w = was;
});
