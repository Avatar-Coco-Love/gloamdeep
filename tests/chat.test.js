// § chat: the Peddler's talk box (D-1017): his line on a bump at home, by day his everyday lines
// in turn with his deep and beaten lines among them once their time comes, by night his night line;
// the box's Shop opens his card, Bye or the cross shuts it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom } from '../src/core/room.js';
import { makeState, step } from '../src/core/turn.js';
import { shownLine, LINES } from '../src/core/lines.js';
import { dayChats, chats, TALK_MENU, talkOf } from '../src/core/chat.js';
import { get } from '../src/core/registry.js';
import { talkCard } from '../src/input/cards/talk.js';

const home = (more = {}) => ({ ...makeState(makeRoom(['#####', '#...#', '#####']), { x: 1, y: 1 }), people: [{ id: 'peddler', x: 2, y: 1, home: true, gifted: true, giftAt: 0 }], ...more });
const said = (s) => shownLine(s).text;

test('only a person at home with chat lines talks: the Peddler at home, not trapped or freed', () => {
  assert.equal(chats({ id: 'peddler', home: true }), true);
  assert.equal(chats({ id: 'peddler' }), false);
});

test('by day his everyday lines take turns, free, and come round again', () => {
  let s = home();
  const heard = [];
  for (let i = 0; i < 4; i++) { s = step(s, 'right'); heard.push(said(s)); }
  assert.deepEqual(heard, [...LINES.peddlerChat.texts, LINES.peddlerChat.texts[0]]);
  assert.equal(s.turn, 0);
});

test('past depth 3 and with the Lampeater beaten, each line takes a turn among the everyday ones', () => {
  const who = get('peddler');
  assert.deepEqual(dayChats(home(), who), ['peddlerChat', 'peddlerChat', 'peddlerChat']);
  assert.deepEqual(dayChats(home({ place: 'depth3' }), who).slice(3), []);
  assert.deepEqual(dayChats(home({ place: 'depth4' }), who).slice(3), ['peddlerDeep']);
  assert.deepEqual(dayChats(home({ place: 'depth9', fadeSeen: true }), who).slice(3), ['peddlerDeep', 'peddlerBeaten']);
  let s = home({ fadeSeen: true });
  const heard = [];
  for (let i = 0; i < 4; i++) { s = step(s, 'right'); heard.push(said(s)); }
  assert.deepEqual(heard, [...LINES.peddlerChat.texts, LINES.peddlerBeaten.text]);
});

test('by night, his night line on every bump', () => {
  const s = home({ turn: 250, fadeSeen: true });
  assert.equal(said(step(s, 'right')), LINES.peddlerNight.text);
  assert.equal(said(step(step(s, 'right'), 'right')), LINES.peddlerNight.text);
});

test('the box shows his name and line; Shop opens his card, Bye and the cross go back to play', () => {
  const s = step(home(), 'right');
  assert.deepEqual(talkOf(s, 'peddler'), ['Peddler', LINES.peddlerChat.texts[0]]);
  const shown = [], traded = [];
  const app = { state: s, screen: 'talk', talker: 'peddler', chosen: 0 };
  const card = talkCard(app, {}, (sc) => shown.push(sc), { menuOf: () => TALK_MENU, openTrade: () => traded.push(1) });
  card.pick(0); card.pick(1); card.close();
  assert.deepEqual([traded.length, shown], [1, ['play', 'play']]);
});
