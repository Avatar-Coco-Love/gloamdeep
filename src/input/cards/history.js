// § version history card (D-254, D-393): every version on a card, its pick, arrows, tap, close,
// and Page Up and Page Down from turnMap (page), moved word for word from screens.js at the
// eighth audit (D-577). It opens with every version closed, on the newest (screens.js's
// openHistory). `c` holds closeHistory.
import { historyRows, historyAt, historyLayout, headRow, lastRow, ROW_H } from '../../render/history.js';
import { HISTORY, versionWords, scrollToShow, clampScroll } from '../../core/history.js';
import { moveChoice } from '../../core/menu.js';
import { view } from '../../render/screen.js';

export function historyCard(app, ui, show, c) {
  const { spoken } = ui;
  const { closeHistory } = c;
  const listH = () => historyLayout(view.w, view.h).h; // the card's window, as tall as the screen lets it be
  const shownRows = () => clampScroll(app.scroll, app.rows.length * ROW_H, listH());
  // The rows wrapped again when the card's width has changed since (the screen turned or resized)
  function fitHistory() {
    const w = historyLayout(view.w, view.h).bodyW;
    if (app.rows.w !== w) { app.rows = historyRows(app.opened, w); app.scroll = shownRows(); }
  }
  // Choose version i, its row scrolled into view
  function pickVersion(i) {
    app.chosen = i;
    const e = HISTORY[i];
    const r = headRow(app.rows, i);
    app.scroll = scrollToShow(app.scroll, r, r, ROW_H, listH(), app.rows.length);
    spoken.textContent = versionWords(e, app.opened.has(e.v));
  }
  // Open or close version i; an opened one shows as much of itself as fits
  function openVersion(i, open = !app.opened.has(HISTORY[i]?.v)) {
    const e = HISTORY[i];
    if (!e || open === app.opened.has(e.v)) return;
    if (open) app.opened.add(e.v); else app.opened.delete(e.v);
    app.rows = historyRows(app.opened, historyLayout(view.w, view.h).bodyW);
    app.scroll = shownRows();
    pickVersion(i);
    if (open) app.scroll = scrollToShow(app.scroll, headRow(app.rows, i), lastRow(app.rows, i), ROW_H, listH(), app.rows.length);
  }
  // Scroll a page down (by > 0) or up; the flame moves to the top version shown if it scrolled away
  function pageHistory(by) {
    fitHistory();
    const h = listH();
    app.scroll = clampScroll(app.scroll + by * (h - ROW_H), app.rows.length * ROW_H, h);
    const top = Math.floor(app.scroll / ROW_H), bottom = Math.floor((app.scroll + h) / ROW_H) - 1;
    const shown = (r) => r >= top && r <= bottom;
    if (!app.rows.some((row, r) => row.i === app.chosen && shown(r))) {
      app.chosen = app.rows[top].i;
      spoken.textContent = versionWords(HISTORY[app.chosen], app.opened.has(HISTORY[app.chosen].v));
    }
  }
  const pick = (i) => { fitHistory(); openVersion(i); };
  const dir = (dir, how) => {
    fitHistory();
    if (dir === 'left' || dir === 'right') openVersion(app.chosen, dir === 'right');
    else if (how === 'swipe') pageHistory(dir === 'up' ? 1 : -1); // the list follows the finger
    else pickVersion(moveChoice(app.chosen, dir, HISTORY.length));
  };
  function tap(px, py, held) {
    if (held) return;
    fitHistory();
    const at = historyAt(px, py, view.w, view.h, app.scroll, app.rows.length);
    if (at === 'out' || at === 'close') closeHistory(); // the round cross goes back (D-393)
    else if (at && app.rows[at.row].kind === 'head') openVersion(app.rows[at.row].i);
    else if (at) pickVersion(app.rows[at.row].i);
  }
  const close = () => closeHistory(); // Esc or P
  return { pick, dir, tap, close, page: pageHistory };
}
