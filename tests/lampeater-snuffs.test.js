// § lampeater snuffs: step 7 (D-947): from half its hearts it owes a snuff, and another after each
// catch begun after that; in the dark it breathes on the lit brazier nearest it, 2 turns' warning,
// caught in light the breath stops; then the brazier goes cold, its lines said, a `snuff` event
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { makeState } from '../src/core/turn.js';
import { makeRoom, tileAt } from '../src/core/room.js';
import { breathe } from '../src/core/snuff.js';

const L = get('brazierLit').letter;
const hall = ['##############', `#${L}...........#`, '#............#', `#...........${L}#`, '##############'];
const inHall = (e = {}, extra = {}) => ({ ...makeState(makeRoom(hall), { x: 1, y: 2 }, [], []), enemies: [{ id: 'lampeater', x: 6, y: 2, ...e }], lit: false, place: 'hall', ...extra });
const step = (s, change = (x) => x) => { const after = change({ ...s, turn: s.turn + 1, events: [] }); return breathe(s, after); };

test('its lines and its Bestiary words', () => {
  const e = get('lampeater');
  assert.deepEqual(e.snuffs, { warns: 2, says: 'lampeaterBreathes', out: 'brazierGutters', brood: 'gloamling', crawls: 'gloamlingCrawls' }); // its brood since step 8 (D-949)
  assert.equal(LINES.lampeaterBreathes.text, 'The Lampeater breathes on a brazier.');
  assert.equal(LINES.brazierGutters.text, 'The brazier gutters out.');
  assert.match(e.acts, /At half its hearts, it snuffs your braziers\./);
});

test('above half its hearts it never breathes', () => {
  const s = step(inHall({ health: 7 }));
  assert.ok(!s.enemies[0].breath && !s.enemies[0].owes);
});

test('at half it breathes on the brazier nearest it, and 2 turns on the brazier is cold', () => {
  let s = step(inHall({ health: 6, x: 9 }));
  assert.deepEqual(s.enemies[0].breath, { x: 12, y: 3, left: 2 });
  assert.equal(s.line.id, 'lampeaterBreathes');
  s = step(s);
  assert.equal(s.enemies[0].breath.left, 1);
  assert.equal(tileAt(s.room, 12, 3).id, 'brazierLit');
  s = step(s);
  assert.equal(tileAt(s.room, 12, 3).id, 'brazier');
  assert.equal(s.line.id, 'brazierGutters');
  assert.ok(s.events.some((v) => v.type === 'snuff' && v.x === 12 && v.y === 3));
  assert.ok(!s.enemies[0].breath); assert.equal(s.enemies[0].owes, 0);
  assert.deepEqual(s.enemies[0].snuffed, { x: 12, y: 3, turn: s.turn });
  s = step(s);
  assert.ok(!s.enemies[0].breath, 'it owes nothing more');
});

test('caught in light during the breath, it stops, and tries again once free', () => {
  let s = step(inHall({ health: 6 }));
  s = step(s, (a) => ({ ...a, enemies: a.enemies.map((e) => ({ ...e, caught: true })) }));
  assert.ok(!s.enemies[0].breath); assert.equal(s.enemies[0].owes, 1);
  assert.equal(tileAt(s.room, 12, 3).id, 'brazierLit');
  s = step(s, (a) => ({ ...a, enemies: a.enemies.map(({ caught, ...e }) => e) }));
  assert.ok(s.enemies[0].breath, 'free again, it breathes anew');
  assert.equal(s.enemies[0].owes, 2, 'the stopped breath still owed, and the catch that stopped it one more');
});

test('a catch begun after half, once got free from, owes one more; the catch it was halved in does not', () => {
  let s = inHall({ health: 7, caught: true });
  s = step(s, (a) => ({ ...a, enemies: a.enemies.map((e) => ({ ...e, health: 6 })) }));
  assert.equal(s.enemies[0].owes, 1); assert.ok(!s.enemies[0].breath, 'caught, it cannot breathe');
  s = step(s, (a) => ({ ...a, enemies: a.enemies.map(({ caught, ...e }) => e) }));
  assert.equal(s.enemies[0].owes, 1, 'its halving catch adds nothing');
  assert.ok(s.enemies[0].breath);
});

test('with no brazier lit it waits, owing', () => {
  const cold = get('brazier').letter;
  const s = step({ ...inHall({ health: 6 }), room: makeRoom(hall.map((r) => r.split(L).join(cold))) });
  assert.ok(!s.enemies[0].breath); assert.equal(s.enemies[0].owes, 1);
});

test('in play, waiting turns: it breathes, and the brazier goes cold on the third', async () => {
  const { wait } = await import('../src/core/turn.js');
  let s = wait(inHall({ health: 6, x: 9 }));
  assert.ok(s.enemies[0].breath, 'breathing');
  s = wait(wait(s));
  assert.equal(tileAt(s.room, 12, 3).id, 'brazier');
});
