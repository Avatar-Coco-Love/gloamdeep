// § lampeater snuffs: step 7 (D-947), its phases since D-978: at 2/3 and 1/3 of its hearts it owes a
// snuff; in the dark it breathes on the lit brazier nearest it, 2 turns' warning, caught in light the
// breath stops; then the brazier goes cold, its lines said, a `snuff` event; with none lit it is spent
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { makeState } from '../src/core/turn.js';
import { makeRoom, tileAt } from '../src/core/room.js';
import { breathe, breathTurn } from '../src/core/snuff.js';

const L = get('brazierLit').letter, C = get('brazier').letter;
const hall = ['##############', `#${L}...........#`, '#............#', `#...........${L}#`, '##############'];
const inHall = (e = {}, extra = {}) => ({ ...makeState(makeRoom(hall), { x: 1, y: 2 }, [], []), enemies: [{ id: 'lampeater', x: 6, y: 2, ...e }], lit: false, place: 'hall', ...extra });
const step = (s, change = (x) => x) => { const after = change({ ...s, turn: s.turn + 1, events: [] }); return breathe(s, after); };

test('its lines and its Bestiary words', () => {
  const e = get('lampeater');
  assert.deepEqual(e.snuffs, { at: [2 / 3, 1 / 3], warns: 2, says: 'lampeaterBreathes', out: 'brazierGutters', brood: 'gloamling', crawls: 'gloamlingCrawls' }); // its brood since step 8 (D-949)
  assert.equal(LINES.lampeaterBreathes.text, 'The Lampeater breathes on a brazier.');
  assert.equal(LINES.brazierGutters.text, 'The brazier gutters out.');
  assert.match(e.acts, /At two thirds and one third of its hearts, it snuffs a brazier\./); // Claude's draft (D-978)
});

test('at 2/3 of its hearts it breathes on the brazier nearest it, and 2 turns on the brazier is cold', () => {
  let s = step(inHall({ health: 8, x: 9 }));
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

test('caught in light during the breath, it stops, and tries again once free, owing no more', () => {
  let s = step(inHall({ health: 8 }));
  s = step(s, (a) => ({ ...a, enemies: a.enemies.map((e) => ({ ...e, caught: true })) }));
  assert.ok(!s.enemies[0].breath); assert.equal(s.enemies[0].owes, 1);
  assert.equal(tileAt(s.room, 12, 3).id, 'brazierLit');
  s = step(s, (a) => ({ ...a, enemies: a.enemies.map(({ caught, ...e }) => e) }));
  assert.ok(s.enemies[0].breath, 'free again, it breathes anew');
  assert.equal(s.enemies[0].owes, 1, 'the stopped breath still owed, the catch owing nothing more');
});

test('in play, waiting turns: it breathes, and the brazier goes cold on the third', async () => {
  const { wait } = await import('../src/core/turn.js');
  let s = wait(inHall({ health: 8, x: 9 }));
  assert.ok(s.enemies[0].breath, 'breathing');
  s = wait(wait(s));
  assert.equal(tileAt(s.room, 12, 3).id, 'brazier');
});

test('above 2/3 of its hearts it never breathes', () => {
  const s = step(inHall({ health: 9 }));
  assert.ok(!s.enemies[0].breath && !s.enemies[0].owes);
});

test('each phase owes one snuff, once: at 8 hearts, then at 4; at half, nothing more', () => {
  let s = step(inHall({ health: 8, caught: true }));
  assert.equal(s.enemies[0].phase, 1); assert.equal(s.enemies[0].owes, 1);
  s = step({ ...s, enemies: s.enemies.map((e) => ({ ...e, health: 6, owes: 0 })) });
  assert.equal(s.enemies[0].owes, 0, 'half its hearts is no phase now');
  s = step({ ...s, enemies: s.enemies.map((e) => ({ ...e, health: 4 })) });
  assert.equal(s.enemies[0].phase, 2); assert.equal(s.enemies[0].owes, 1);
});

test('one blow past both owes both', () => {
  const s = step(inHall({ health: 3, caught: true }));
  assert.equal(s.enemies[0].phase, 2); assert.equal(s.enemies[0].owes, 2);
});

test('a catch got free from owes nothing more (D-972)', () => {
  let s = step(inHall({ health: 7, phase: 1, owes: 0, caught: true }));
  s = step(s, (a) => ({ ...a, enemies: a.enemies.map(({ caught, ...e }) => e) }));
  assert.ok(!s.enemies[0].owes && !s.enemies[0].breath);
});

test('free with no brazier lit, the phase is spent: it only calls', () => {
  const s = step({ ...inHall({ health: 8 }), room: makeRoom(hall.map((r) => r.split(L).join(C))) });
  assert.ok(!s.enemies[0].breath); assert.equal(s.enemies[0].owes, 0);
});

test('caught with none lit, it still owes, till it is free', () => {
  const s = step({ ...inHall({ health: 8, caught: true }), room: makeRoom(hall.map((r) => r.split(L).join(C))) });
  assert.equal(s.enemies[0].owes, 1);
});

test('the snuffed bowl is marked for its call, and keeps a gloamling only while fewer than 6 are out', () => {
  const lings = (n) => Array.from({ length: n }, (_, k) => ({ id: 'gloamling', x: 2 + k, y: 1 }));
  for (const [n, kept] of [[5, 1], [6, 0]]) {
    let s = inHall({ health: 8, x: 9 });
    s = { ...s, enemies: [...s.enemies, ...lings(n)] };
    for (let k = 0; k < 3; k++) s = step(s);
    assert.deepEqual(s.enemies[0].phaseBowl, { x: 12, y: 3 });
    assert.equal(s.enemies[0].bowls?.length ?? 0, kept, `${n} out`);
  }
});

test('in the turn, what it owes is known before its call: struck at 8, it breathes first', () => {
  const s0 = inHall({ health: 8, x: 9, struck: true, chasing: true });
  const s = breathTurn(s0, { ...s0, turn: s0.turn + 1, events: [] });
  assert.ok(s.enemies[0].breath, 'breathing'); assert.ok(!s.enemies[0].call, 'not calling yet');
});

test('a phase blow on the last oil: what it owes is known before the creatures move, so it is never wary in its breath (H-76)', async () => {
  const { wait } = await import('../src/core/turn.js');
  const s = wait(inHall({ health: 8, x: 9, struck: true, chasing: true }, { oil: 0 }));
  const e = s.enemies.find((o) => o.id === 'lampeater');
  assert.ok(e.breath, 'breathing'); assert.ok(!e.wary, 'not wary while it owes');
});
