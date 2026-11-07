// § heard (D-670, I3 of D-660's findings): as a card opens, the line already showing counts as
// heard, so the card's words stay for the screen reader; a line said on the card is still spoken
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, wait } from '../src/core/turn.js';
import { setOil } from '../src/core/oil.js';
import { shownLine, heardAs, say } from '../src/core/lines.js';

// As frame.js speaks: only a line that differs from the one last spoken
const speak = (app, state, spoken) => { const line = shownLine(state); if (line !== app.spokenLine) { app.spokenLine = line; if (line) spoken.text = line.text; } };
const showing = () => wait(setOil(makeState(makeRoom(FIRST_ROOM)), 0.2)); // the flame-low line on screen

for (const card of ['bag', 'map', 'paused']) {
  test(`opening the ${card} card over a line keeps the card's words`, () => {
    const state = showing(), app = { spokenLine: heardAs(card, state) }, spoken = { text: `${card} words` };
    assert.ok(shownLine(state));
    speak(app, state, spoken); speak(app, state, spoken);
    assert.equal(spoken.text, `${card} words`);
  });
}

test('a line said while the card is open is spoken', () => {
  const state = showing(), app = { spokenLine: heardAs('bag', state) }, spoken = { text: 'bag words' };
  const worn = say(state, 'wispCharmFull');
  speak(app, worn, spoken);
  assert.equal(spoken.text, 'You already have a wisp charm.');
});

test('back in play, the line showing is spoken again', () => {
  const state = showing(), app = { spokenLine: heardAs('play', state) }, spoken = { text: '' };
  speak(app, state, spoken);
  assert.equal(spoken.text, shownLine(state).text);
});

test('with no journey yet, nothing counts as heard', () => {
  assert.equal(heardAs('title', null), null);
});
