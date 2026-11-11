// § journal card (D-270, D-293, D-391, D-481): its tabs, Growth's tree and its button, its pick,
// arrows, tap and close, moved word for word from screens.js at the eighth audit (D-577). It
// opens on Records (screens.js's openJournal). `c` holds journalPageWords and closeJournal. On the
// Bestiary (D-630) Up and Down pick a row and Enter or a tap opens its page; there Esc, the
// round cross or Left goes back to the table (D-631). Right from the Bestiary turns to Feats, and
// Left there back (D-695). Right from Feats turns to Quests, and Left there back (D-706). On
// Quests, Enter or a tap on the done "Take a boon" shows the boons card over the Journal (D-712).
// A list taller than the card scrolls a row by a swipe, the wheel, or Up and Down (on the
// Bestiary's table they pick, keeping the row in view), a page by Page Up and Down (D-743).
import { buyAt, movePick, rowEnd, rowsOpen, told } from '../../core/growth.js';
import { journalAt, scrollJournal, showBeastRow, showGrowthRow } from '../../render/journal.js';
import { view } from '../../render/screen.js';
import { bestiaryRows, movePickRow } from '../../core/bestiary.js';
import { playing } from '../../core/profile.js';

export function journalCard(app, ui, show, c) {
  const { spoken } = ui;
  const { journalPageWords, closeJournal } = c;
  const book = () => (app.profiles && playing(app.profiles)?.bestiary) || {};
  const profile = () => (app.profiles && playing(app.profiles)) || {};
  // § scroll (D-743): the open list moved `by` rows, by > 0 down; false when it all fits
  function scrollBy(by) {
    const p = profile(), first = scrollJournal(app.journalScroll ?? 0, by, view.w, view.h, app.tab, { records: p.records || {}, played: p.played, bestiary: book(), goals: goals() }, app.state, app.beastPage);
    if (first === null) return false;
    app.journalScroll = first;
    return true;
  }
  const page = (by) => { scrollBy(by * 4); };
  function turnTab(id) {
    if (id === app.tab && !app.beastPage) return;
    app.tab = id;
    app.journalScroll = 0;
    app.beastPage = null;
    spoken.textContent = journalPageWords();
  }
  // An arrow or a tap moves Growth's gold outline; Left past a row's first place turns back to Records (D-811)
  function pickGrowth(pick) {
    if (!pick) { turnTab('records'); return; }
    app.growthPick = pick;
    app.journalScroll = showGrowthRow(app.journalScroll ?? 0, pick.row, view.w, view.h, rowsOpen(app.state)); // its row kept in view (D-811)
    spoken.textContent = journalPageWords();
  }
  // The picked place's button: the heart's and Tough's (D-481, D-657)
  function buyPicked() {
    if (!told(app.state, app.growthPick).button) return;
    const s = buyAt(app.state, app.growthPick);
    if (s === app.state) { ui.refuse(); return; } // too few embers: the tock (D-819)
    const before = app.state;
    app.state = s;
    ui.bought(before); // the first buy does "Spend your ember", no turn passing (D-713)
    spoken.textContent = journalPageWords();
  }
  // § bestiary's rows and pages (D-631)
  function pickBeast(i) { app.beastPick = i; app.journalScroll = showBeastRow(app.journalScroll ?? 0, i, view.w, view.h, book()); spoken.textContent = journalPageWords(); }
  function openPage(i) {
    const row = bestiaryRows(book())[i];
    if (!row) return;
    app.beastPick = i; app.beastPage = row.id; app.journalScroll = 0;
    spoken.textContent = journalPageWords();
  }
  function closePage() { app.beastPage = null; app.journalScroll = showBeastRow(0, app.beastPick, view.w, view.h, book()); spoken.textContent = journalPageWords(); }
  // § the boons card again, from the done "Take a boon" (D-712)
  const goals = () => (app.profiles && playing(app.profiles)?.goals) || {};
  function aboutBoons() { if (!goals().boon?.done) return; app.boonsFrom = 'journal'; show('aboutBoons'); }
  // Enter turns to Growth, there buys the picked upgrade, and on the Bestiary opens the picked page
  const pick = () => { if (app.tab === 'growth') buyPicked(); else if (app.tab === 'records') turnTab('growth'); else if (app.tab === 'bestiary' && !app.beastPage) openPage(app.beastPick); else if (app.tab === 'quests') aboutBoons(); };
  // The tabs (D-391), on Growth its tree (D-481): Right past a row's last place for the Bestiary (D-811), and Left there back to Growth (D-630)
  function dir(d, how) {
    const upDown = d === 'up' || d === 'down', by = d === 'up' ? -1 : 1;
    if (upDown && how === 'swipe' && scrollBy(-by)) return; // the list follows the finger
    if (upDown && !(app.tab === 'bestiary' && !app.beastPage) && app.tab !== 'growth') { scrollBy(by); return; }
    if (app.tab === 'growth') { if (d === 'right' && rowEnd(app.growthPick, rowsOpen(app.state))) turnTab('bestiary'); else pickGrowth(movePick(app.growthPick, d, rowsOpen(app.state))); }
    else if (app.tab === 'bestiary' && app.beastPage) { if (d === 'left') closePage(); }
    else if (app.tab === 'bestiary') { if (d === 'left') turnTab('growth'); else if (d === 'right') turnTab('feats'); else if (d === 'up' || d === 'down') pickBeast(movePickRow(book(), app.beastPick, d === 'up' ? -1 : 1)); }
    else if (app.tab === 'feats') { if (d === 'left') turnTab('bestiary'); else if (d === 'right') turnTab('quests'); }
    else if (app.tab === 'quests') { if (d === 'left') turnTab('feats'); }
    else if (d === 'right') turnTab('growth');
  }
  function tap(px, py, held) {
    if (held) return;
    const at = journalAt(px, py, view.w, view.h, app.tab, app.state, app.growthPick, book(), app.beastPage, goals(), app.journalScroll ?? 0);
    if (at === 'close' && app.beastPage) closePage(); // a page's cross goes back to the table (D-631)
    else if (at === 'out' || at === 'close') closeJournal(); // the round cross goes back (D-391)
    else if (at?.beast !== undefined) openPage(at.beast);
    else if (at?.quest) { if (at.quest === 'boon') aboutBoons(); }
    else if (at === 'buy') buyPicked();
    else if (at?.pick) pickGrowth(at.pick);
    else if (at) turnTab(at.tab);
  }
  const close = () => (app.beastPage ? closePage() : closeJournal()); // Esc or P; a page's goes back to the table
  return { pick, dir, tap, close, wheel: scrollBy, page };
}
