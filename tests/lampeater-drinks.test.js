// § lampeater drinks: step 6 (D-946): waiting in the dark at the edge of the lantern's light, seeing the
// hero, it drinks 1 turn's oil a turn, so the lantern burns twice as fast; never while caught, never with
// the lantern off, never from a brazier's light alone; its line said once; a `drink` event each turn
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { makeState, wait } from '../src/core/turn.js';
import { makeRoom } from '../src/core/room.js';
import { litAt, lanternLitAt } from '../src/core/sight.js';
import { edgeDrink } from '../src/core/edgedrink.js';

const hall = ['##############', '#............#', '#............#', '#............#', '##############'];
const inHall = (extra = {}) => ({ ...makeState(makeRoom(hall), { x: 1, y: 2 }, [], []), enemies: [{ id: 'lampeater', x: 12, y: 2 }], oil: 0.5, lit: true, place: 'hall', ...extra });
const turns = (s, n) => { for (let i = 0; i < n; i++) s = wait(s); return s; };
const near = (a, b) => Math.abs(a - b) < 1e-9;

test('the Lampeater drinks 1 turn of oil at the edge, its line and its sip in the registry', () => {
  const e = get('lampeater');
  assert.deepEqual([e.edgeDrinks, e.sips], [1 / 60, 'sip']);
  assert.equal(LINES[e.edgeSays].text, 'The Lampeater drinks your light.');
  assert.match(e.acts, /At your light's edge, it drinks from it\./);
});

test('it comes to the edge of the light and drinks there: the lantern burns twice as fast', () => {
  const s = turns(inHall(), 12), e = s.enemies[0];
  assert.ok(!litAt(s, e.x, e.y), 'it waits in the dark');
  assert.ok(e.drinking && lanternLitAt(s, e.drinking.x, e.drinking.y), 'beside a tile the lantern lights');
  const next = wait(s);
  assert.ok(near(s.oil - next.oil, 2 / 60), `burned ${s.oil - next.oil}`);
  assert.ok(next.events.some((v) => v.type === 'drink' && v.id === 'lampeater' && near(v.oil, 1 / 60)));
});

test('as the light pulls in, it follows', () => {
  const s = turns(inHall(), 12), later = turns(s, 12);
  assert.ok(later.enemies[0].x < s.enemies[0].x, `${s.enemies[0].x} → ${later.enemies[0].x}`);
});

test('its line is said once, the first time it drinks', () => {
  let s = inHall(), said = 0;
  for (let i = 0; i < 20; i++) { s = wait(s); if (s.line?.id === 'lampeaterDrinks' && s.line.turn === s.turn) said++; }
  assert.equal(said, 1);
  assert.ok(s.enemies[0].drank);
});

test('far off in the dark, with the lantern off, or caught, it drinks nothing', () => {
  const far = edgeDrink(inHall());
  assert.equal(far.oil, 0.5); assert.ok(!far.enemies[0].drinking);
  const s = turns(inHall(), 12), e = s.enemies[0];
  const off = edgeDrink({ ...s, lit: false, events: [] });
  assert.equal(off.oil, s.oil); assert.ok(!off.enemies[0].drinking);
  const caught = edgeDrink({ ...s, enemies: [{ ...e, caught: true }], events: [] });
  assert.equal(caught.oil, s.oil);
});

test('with Endless oil it drinks but takes nothing; with the lantern empty it has nothing to drink', () => {
  const s = turns(inHall(), 12);
  const endless = edgeDrink({ ...s, endless: true, events: [] });
  assert.equal(endless.oil, s.oil); assert.ok(endless.events.some((v) => v.type === 'drink'));
  const dry = edgeDrink({ ...s, oil: 0, events: [] });
  assert.equal(dry.oil, 0); assert.ok(!dry.events.some((v) => v.type === 'drink'));
});

test('lanternLitAt counts the lantern only', () => {
  const s = inHall();
  assert.ok(lanternLitAt(s, 2, 2)); assert.ok(!lanternLitAt(s, 10, 2)); assert.ok(!lanternLitAt({ ...s, lit: false }, 2, 2));
});
