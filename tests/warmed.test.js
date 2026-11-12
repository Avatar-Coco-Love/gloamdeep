// § warmed (D-845, Q-088's buff, step 2): sitting by a burning campfire leaves the hero Warmed,
// blazing 60 turns, embers 30; the lantern burns slower, a full tank lasting 70, added to Slowburn
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY } from '../src/core/room.js';
import { makeState, sit, canSit, wait, maxHealth } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { warmLeft, warmSlept, WARMED } from '../src/core/warmed.js';
import { OIL } from '../src/core/oil.js';
import { fall } from '../src/core/fall.js';
import { WARM_MARK } from '../src/render/marks.js';

const room = makeRoom(['TTTTT', 'T..DT', 'TTTTT'], SKY, 'woods');
const well = (more = {}) => ({ ...makeState(room, { x: 2, y: 1 }), ...more });
const embers = (more = {}) => ({ ...makeState(makeRoom(['TTTTT', 'T..ET', 'TTTTT'], SKY, 'woods'), { x: 2, y: 1 }), ...more });

test('a blazing fire warms for 60 turns, embers for 30, with its lines and its flame mark', () => {
  assert.equal(get('campfire').sits.warm, 60); assert.equal(get('campfireEmbers').sits.warm, 30);
  assert.equal(WARMED.burn, 6 / 7);
  for (const id of ['warmEnds', 'warmHeld']) assert.ok(LINES[id], id);
  assert.equal(WARM_MARK.id, 'warmed'); assert.equal(WARM_MARK.icon.length, 9);
  assert.ok(WARM_MARK.icon.every((r) => r.length === 9));
});

test('sitting by a fire with full hearts and not stiff still warms, the fire a level down', () => {
  const s = well();
  assert.equal(s.health, maxHealth(s));
  const sat = sit(s, 3, 1);
  assert.equal(warmLeft(sat), 60); assert.equal(sat.turn, s.turn + 1);
  assert.equal(warmLeft(sit(embers(), 3, 1)), 30);
});

test('sitting again sets the longer count, never a shorter; Yes grey when nothing would change', () => {
  assert.equal(canSit(well({ warmed: 59 }), 3, 1), true);
  assert.equal(canSit(well({ warmed: 60 }), 3, 1), false);
  assert.equal(canSit(embers({ warmed: 30 }), 3, 1), false);
  assert.equal(canSit(embers({ warmed: 29 }), 3, 1), true);
  const hurt = embers({ warmed: 50, health: 1 });
  assert.equal(warmLeft(sit(hurt, 3, 1)), 49); // the turn passes; embers' 30 never shortens it
});

test('while Warmed a full tank lasts 70 turns, not 60, and with Slowburn longer still', () => {
  const run = (more) => { let s = well({ oil: 1, ...more }), n = 0; while (s.oil > 0 && n < 200) { s = { ...wait(s), warmed: more.warmed ? 500 : 0, slowburn: more.slowburn ? 500 : 0 }; n++; } return n; };
  assert.equal(run({}), Math.round(1 / OIL.burn));
  assert.equal(run({ warmed: 500 }), 70);
  assert.ok(run({ warmed: 500, slowburn: 500 }) > 80);
});

test('its turns count down even with the lantern empty, its line as it fades; a night uses them, a fall ends it', () => {
  const t = wait(well({ warmed: 1, oil: 0 }));
  assert.equal(warmLeft(t), 0); assert.equal(shownLine(t).text, "The fire's warmth fades.");
  assert.equal(warmLeft(wait(well({ warmed: 10 }))), 9);
  assert.equal(warmLeft(warmSlept({ warmed: 50 }, 20)), 30);
  assert.equal(warmLeft(warmSlept({ warmed: 50 }, 49)), 0);
  assert.equal(warmLeft(fall(well({ warmed: 40 }))), 0);
});
