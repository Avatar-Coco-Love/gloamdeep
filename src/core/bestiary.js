// § bestiary: the Journal's Bestiary tab (D-350, D-352, D-630). A creature is met the first
// time a light shining now reaches it, each one once; one in disguise (a mimic asleep, a
// snapcap shut while the hero isn't beside it) is not met until it shows itself. One beaten
// unmet, in the dark, is met then too, so met is never fewer than beaten. The counts live in
// the profile, as Records do, through falls and new journeys. Plain data, no drawing.
import { litAt } from './sight.js';
import { note } from './events.js';
import { ALL, get } from './registry.js';

// § shows: whether creature e shows as itself, not in disguise (D-368, D-543)
const beside = (e, hero) => Math.abs(e.x - hero.x) + Math.abs(e.y - hero.y) === 1;
export const shows = (state, e) => !(e.asleep && get(e.id)?.looksLike) && !(get(e.id)?.shutAs && !beside(e, state.hero));

// § meet: the state with each creature lit and showing, not met before, marked `met`, with a
// `meet { id }` event for each
export function meet(state) {
  const fresh = state.enemies.filter((e) => !e.met && shows(state, e) && litAt(state, e.x, e.y));
  if (!fresh.length) return state;
  let next = { ...state, enemies: state.enemies.map((e) => (fresh.includes(e) ? { ...e, met: true } : e)) };
  for (const e of fresh) next = note(next, 'meet', { id: e.id });
  return next;
}

// § counting: the book, { [id]: { met, beaten } }, after this action's events: a `meet` adds
// one met, a `beat` one beaten, and one met too when it was `unmet`. A dev jump stops the
// counting, as for Records (D-232).
export function booked(book, events, jumped = false) {
  if (jumped || !events.some((e) => e.type === 'meet' || e.type === 'beat')) return book;
  const next = { ...book };
  const add = (id, k) => { next[id] = { met: 0, beaten: 0, ...next[id] }; next[id][k]++; };
  for (const e of events) {
    if (e.type === 'meet') add(e.id, 'met');
    if (e.type === 'beat') { if (!e.spawned) add(e.id, 'beaten'); if (e.unmet) add(e.id, 'met'); } // one spawned is met, never beaten (D-720)
  }
  return next;
}

// § rows: the tab's rows, each creature met, in the registry's order: { id, name, met, beaten }
export const bestiaryRows = (book) => ALL.filter((c) => c.kind === 'enemy' && book[c.id]?.met).map((c) => ({ id: c.id, name: c.name, met: book[c.id].met, beaten: book[c.id].beaten }));
// One row's counts, as written under its name
export const countsText = (row) => `${row.met} met, ${row.beaten} beaten`;
// § page: one creature's page (D-350, D-631): its counts, and once one is beaten how it acts
// (D-352), before that a grey hint. `known` says which. Then how to fight it, once 3 are beaten
// (D-632), before that a grey count down; `skilled` says which.
export const HINT = 'Beat one to learn how it acts.';
export const FIGHT_HEADING = 'How to fight it';
export const FIGHT_AT = 3;
// One of a kind, the warden, needs only its `fightAt`, 1 (H-46, D-874)
export const fightAt = (id) => get(id)?.fightAt ?? FIGHT_AT;
export const fightHint = (beaten, at = FIGHT_AT) => (beaten ? `Beat ${at - beaten} more to learn how to fight it.` : `Beat ${at} to learn how to fight it.`);
export function pageOf(book, id) {
  const c = get(id), n = { met: 0, beaten: 0, ...book[id] }, known = n.beaten > 0, at = fightAt(id), skilled = n.beaten >= at;
  return { id, name: c.name, counts: countsText(n), known, acts: known ? c.acts : HINT, skilled, fights: skilled ? c.fights : fightHint(n.beaten, at) };
}
// The picked row's index kept inside the rows there are, d steps on (Up -1, Down +1)
export const movePickRow = (book, pick, d) => Math.max(0, Math.min(bestiaryRows(book).length - 1, pick + d));
// § words: for the screen reader
export const NONE = 'No creatures met yet.';
const TURN = 'Left for Growth, Right for Feats. Esc or the close button goes back.';
const PICK = 'Up or Down picks another, Enter opens its page.';
export function bestiaryWords(book, pick = 0) {
  const rows = bestiaryRows(book), picked = rows[pick] ?? rows[0];
  return `Journal, Bestiary tab. ${rows.length ? `${rows.map((r) => `${r.name}, ${countsText(r)}`).join('. ')}. Picked, ${picked.name}. ${PICK}` : NONE} ${TURN}`;
}
export function pageWords(book, id) {
  const p = pageOf(book, id);
  return `Journal, Bestiary, ${p.name}. ${p.counts}. ${p.acts} ${FIGHT_HEADING}: ${p.fights} Esc or the close button goes back to the Bestiary.`;
}
