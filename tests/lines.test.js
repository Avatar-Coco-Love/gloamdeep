// § lines: the text line's rules (src/core/lines.js, D-094 to D-097)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, wait, pour, switchLantern } from '../src/core/turn.js';
import { setOil, OIL } from '../src/core/oil.js';
import { LINES, LINE_TURNS, shownLine, oilLine, say, sayEnd } from '../src/core/lines.js';
import { ENEMIES } from '../src/core/enemies.js';
import { hasGlyph, textWidth } from '../src/render/font.js'; // plain data, no DOM
import { W } from '../src/render/screen.js';

const room = makeRoom(FIRST_ROOM);
const at = (oil) => setOil(makeState(room), oil);

test('the game starts with nothing said', () => {
  assert.equal(shownLine(makeState(room)), null);
});

test('dropping under 20% says the flame is getting low', () => {
  assert.equal(shownLine(wait(at(0.2))), LINES.oilLow);
});

test('running dry says the lantern gutters', () => {
  assert.equal(shownLine(wait(at(OIL.burn))), LINES.oilEmpty);
});

test('a line is said once, not on every step under the mark', () => {
  const s = wait(at(0.2)), n = wait(s);
  assert.equal(n.line, s.line);
});

test('a line stays for its turns, then is gone', () => {
  let s = switchLantern(wait(at(0.2))); // off, so no new line comes
  for (let i = 1; i < LINE_TURNS; i++) s = wait(s);
  assert.equal(shownLine(s), LINES.oilLow);
  assert.equal(shownLine(wait(s)), null);
});

test('it is said again only after the oil goes back above the mark', () => {
  assert.equal(oilLine(0.19, 0.18), null);
  assert.equal(oilLine(0.2, 0.19), 'oilLow');
  assert.equal(oilLine(0, 0), null);
});

test('a flask poured on the turn the oil would cross the mark says nothing', () => {
  const s = { ...at(0.2), bag: [{ id: 'flask', n: 1 }] };
  assert.equal(pour(s, 0).line, null);
});

test('a bump passes no turn and says nothing', () => {
  const s = wait(at(0.2));
  assert.equal(step({ ...s, hero: { x: 1, y: 1 } }, 'up').line, s.line);
});

test('every line can be drawn and fits the strip', () => {
  for (const line of Object.values(LINES)) for (const said of line.texts || [line.text]) { // each of a list's lines (D-297)
    const text = said.replace('{n}', 99); // a number filled in, as the level (D-246)
    assert.ok([...text].every(hasGlyph), text);
    assert.ok(textWidth(text) <= W - 4, text);
  }
});

test('every line a creature names is there to say (D-369)', () => {
  for (const e of Object.values(ENEMIES)) {
    for (const k of ['hurt', 'stands', 'die', 'bites', 'wakes', 'settles']) if (e[k]) assert.ok(LINES[e[k]], `${e.id}.${k}`);
  }
});

test('a line that is not there is not said, and an old save holding one shows nothing (D-369)', () => {
  const s = say(makeState(room), 'oilLow');
  assert.equal(say(s, undefined), s);
  assert.equal(shownLine({ ...s, line: { turn: s.turn } }), null);
});

// § colours by source (D-509): speech bone white, harm red, warnings amber, the rest grey
test('what people say is bone white, a creature hurting you red', async () => {
  const { lineColour } = await import('../src/render/textline.js');
  const s = makeState(room);
  assert.equal(lineColour(shownLine(say(s, 'peddlerCalls'))), '#efe6cc');
  assert.equal(lineColour(shownLine(say(s, 'peddlerFreed'))), '#efe6cc');
  for (const k of Object.keys(ENEMIES)) if (LINES[k + 'Bite']) assert.equal(lineColour(LINES[k + 'Bite']), '#e8786a', k);
  assert.equal(lineColour(LINES.oilEmpty), '#ffc65c');
  assert.equal(lineColour(LINES.glance), '#9790a4');
  for (const [id, e] of Object.entries(LINES)) if ((e.text ?? e.texts[0]).startsWith('"')) assert.equal(e.kind, 'speech', id);
});

test('a mark\'s last turn says "1 turn left.", more say "turns" (H-43)', () => {
  const s = makeState(FIRST_ROOM);
  assert.equal(shownLine(say(s, 'poisonHeld', 1)).text, 'Poisoned: 1 turn left.');
  assert.equal(shownLine(say(s, 'stiffHeld', 1)).text, 'Stiff: 1 hit in 3 misses, 1 turn left.');
  assert.equal(shownLine(say(s, 'glowHeld', 2)).text, 'Glow Draught: 2 turns left.');
  assert.equal(shownLine(say(s, 'glowHeld', 11)).text, 'Glow Draught: 11 turns left.');
});

test('two effects ending on one turn are both said, on one line (Q-099)', () => {
  const s = { turn: 9 };
  const both = sayEnd(sayEnd(s, 'stiffEnds'), 'poisonEnds');
  assert.equal(shownLine(both).text, 'The stiffness wears off. The poison wears off.');
  assert.equal(shownLine(sayEnd(say(s, 'poisonHeld', 2), 'poisonEnds')).text, 'The poison wears off.', 'over another line, as before');
  assert.equal(shownLine(sayEnd({ ...say(s, 'stiffEnds'), turn: 10 }, 'poisonEnds')).text, 'The poison wears off.', 'an end from an earlier turn is not joined');
});
