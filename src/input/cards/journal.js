// § journal card (D-270, D-293, D-391, D-481): its tabs, Growth's tree and its button, its pick,
// arrows, tap and close, moved word for word from screens.js at the eighth audit (D-577). It
// opens on Records (screens.js's openJournal). `c` holds journalPageWords and closeJournal. On the
// Bestiary (D-630) Up and Down pick a row and Enter or a tap opens its page; there Esc, the
// round cross or Left goes back to the table (D-631). Right from the Bestiary turns to Feats, and
// Left there back (D-695). Right from Feats turns to Quests, and Left there back (D-706).
import { buyAt, movePick, told } from '../../core/growth.js';
import { journalAt } from '../../render/journal.js';
import { view } from '../../render/screen.js';
import { BRANCHES } from '../../core/upgrades.js';
import { bestiaryRows, movePickRow } from '../../core/bestiary.js';
import { playing } from '../../core/profile.js';

export function journalCard(app, ui, show, c) {
  const { spoken } = ui;
  const { journalPageWords, closeJournal } = c;
  const book = () => (app.profiles && playing(app.profiles)?.bestiary) || {};
  function turnTab(id) {
    if (id === app.tab && !app.beastPage) return;
    app.tab = id;
    app.beastPage = null;
    spoken.textContent = journalPageWords();
  }
  // An arrow or a tap moves Growth's gold outline; Left past Light turns back to Records
  function pickGrowth(pick) {
    if (!pick) { turnTab('records'); return; }
    app.growthPick = pick;
    spoken.textContent = journalPageWords();
  }
  // The picked place's button: the heart's and Tough's (D-481, D-657)
  function buyPicked() {
    if (!told(app.state, app.growthPick).button) return;
    const s = buyAt(app.state, app.growthPick);
    if (s === app.state) return;
    app.state = s;
    spoken.textContent = journalPageWords();
  }
  // § bestiary's rows and pages (D-631)
  function pickBeast(i) { app.beastPick = i; spoken.textContent = journalPageWords(); }
  function openPage(i) {
    const row = bestiaryRows(book())[i];
    if (!row) return;
    app.beastPick = i; app.beastPage = row.id;
    spoken.textContent = journalPageWords();
  }
  function closePage() { app.beastPage = null; spoken.textContent = journalPageWords(); }
  // Enter turns to Growth, there buys the picked upgrade, and on the Bestiary opens the picked page
  const pick = () => { if (app.tab === 'growth') buyPicked(); else if (app.tab === 'records') turnTab('growth'); else if (app.tab === 'bestiary' && !app.beastPage) openPage(app.beastPick); };
  // The tabs (D-391), on Growth its tree (D-481): Right past Hands for the Bestiary, and Left there back to Growth (D-630)
  function dir(d) {
    if (app.tab === 'growth') { if (d === 'right' && app.growthPick.col === BRANCHES.length - 1) turnTab('bestiary'); else pickGrowth(movePick(app.growthPick, d)); }
    else if (app.tab === 'bestiary' && app.beastPage) { if (d === 'left') closePage(); }
    else if (app.tab === 'bestiary') { if (d === 'left') turnTab('growth'); else if (d === 'right') turnTab('feats'); else if (d === 'up' || d === 'down') pickBeast(movePickRow(book(), app.beastPick, d === 'up' ? -1 : 1)); }
    else if (app.tab === 'feats') { if (d === 'left') turnTab('bestiary'); else if (d === 'right') turnTab('quests'); }
    else if (app.tab === 'quests') { if (d === 'left') turnTab('feats'); }
    else if (d === 'right') turnTab('growth');
  }
  function tap(px, py, held) {
    if (held) return;
    const at = journalAt(px, py, view.w, view.h, app.tab, app.state, app.growthPick, book(), app.beastPage);
    if (at === 'close' && app.beastPage) closePage(); // a page's cross goes back to the table (D-631)
    else if (at === 'out' || at === 'close') closeJournal(); // the round cross goes back (D-391)
    else if (at?.beast !== undefined) openPage(at.beast);
    else if (at === 'buy') buyPicked();
    else if (at?.pick) pickGrowth(at.pick);
    else if (at) turnTab(at.tab);
  }
  const close = () => (app.beastPage ? closePage() : closeJournal()); // Esc or P; a page's goes back to the table
  return { pick, dir, tap, close };
}
