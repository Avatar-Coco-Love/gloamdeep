// § journal card (D-270, D-293, D-391, D-481): its tabs, Growth's tree and its button, its pick,
// arrows, tap and close, moved word for word from screens.js at the eighth audit (D-577). It
// opens on Records (screens.js's openJournal). `c` holds journalPageWords and closeJournal.
import { addHeart, movePick, told } from '../../core/growth.js';
import { journalAt } from '../../render/journal.js';
import { view } from '../../render/screen.js';
import { BRANCHES } from '../../core/upgrades.js';

export function journalCard(app, ui, show, c) {
  const { spoken } = ui;
  const { journalPageWords, closeJournal } = c;
  function turnTab(id) {
    if (id === app.tab) return;
    app.tab = id;
    spoken.textContent = journalPageWords();
  }
  // An arrow or a tap moves Growth's gold outline; Left past Light turns back to Records
  function pickGrowth(pick) {
    if (!pick) { turnTab('records'); return; }
    app.growthPick = pick;
    spoken.textContent = journalPageWords();
  }
  // The picked place's button: today only the heart has one (D-481)
  function buyPicked() {
    if (!told(app.state, app.growthPick).button) return;
    const s = addHeart(app.state);
    if (s === app.state) return;
    app.state = s;
    spoken.textContent = journalPageWords();
  }
  const pick = () => { if (app.tab === 'growth') buyPicked(); else if (app.tab === 'records') turnTab('growth'); }; // Enter turns to Growth, and there buys the picked upgrade
  // The tabs (D-391), on Growth its tree (D-481): Right past Hands for the Bestiary, and Left there back to Growth (D-630)
  function dir(d) {
    if (app.tab === 'growth') { if (d === 'right' && app.growthPick.col === BRANCHES.length - 1) turnTab('bestiary'); else pickGrowth(movePick(app.growthPick, d)); }
    else if (app.tab === 'bestiary') { if (d === 'left') turnTab('growth'); }
    else if (d === 'right') turnTab('growth');
  }
  function tap(px, py, held) {
    if (held) return;
    const at = journalAt(px, py, view.w, view.h, app.tab, app.state, app.growthPick);
    if (at === 'out' || at === 'close') closeJournal(); // the round cross goes back (D-391)
    else if (at === 'buy') buyPicked();
    else if (at?.pick) pickGrowth(at.pick);
    else if (at) turnTab(at.tab);
  }
  const close = () => closeJournal(); // Esc or P
  return { pick, dir, tap, close };
}
