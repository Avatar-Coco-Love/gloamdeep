// § chat: the line a person at home with `chat` lines says on a bump, shown in their talk box (D-1017).
// The Peddler's: by night, his night line; by day, his everyday lines taking turns, with his line
// for the hero past depth 3 (where he was trapped, PEDDLER_DEPTH) and his line once the Lampeater is
// beaten on this journey (`fadeSeen`, beaten.js) each taking a turn among them. `chatTurn` counts
// his bumps by day. Free, no turn. Plain data, no drawing.
import { get } from './registry.js';
import { say, shownLine, LINES } from './lines.js';
import { darkOut } from './nightfall.js';
import { deepestOf } from './travel.js';
import { PEDDLER_DEPTH } from './room.js';

// Whether person `p` speaks in a talk box at home
export const chats = (p) => !!p?.home && !!get(p.id)?.chat;

// The line ids taking turns by day: the everyday line once for each of its texts (which take
// their own turns, lines.js), then the ones whose time has come
export function dayChats(state, who) {
  const { chat } = who;
  return [
    ...Array(LINES[chat.day].texts.length).fill(chat.day),
    ...(chat.deep && state.place && deepestOf(state) > PEDDLER_DEPTH ? [chat.deep] : []),
    ...(chat.beaten && state.fadeSeen ? [chat.beaten] : []),
  ];
}

// (state, p) → the state with p's line said (`state.line`, read by the talk box)
export function bumpChat(state, p) {
  const who = get(p.id);
  if (darkOut(state.turn)) return say(state, who.chat.night);
  const ids = dayChats(state, who), k = state.chatTurn ?? 0;
  return { ...say(state, ids[k % ids.length]), chatTurn: k + 1 };
}

// § box: the talk box's buttons (Shop opens their trade card), and what it shows: [name, line]
export const TALK_MENU = [{ id: 'shop', text: 'Shop' }, { id: 'bye', text: 'Bye' }];
export const talkOf = (state, id) => [get(id)?.name ?? '', shownLine(state)?.text ?? ''];
export const talkWords = (state, id) => `${talkOf(state, id).join('. ')} Shop or Bye. Esc or the close button says bye.`;
