// § chest card (CH3, CH4, D-330, D-331, D-387): a set-down stash chest's card, its pick,
// arrows, taps and close, moved word for word from screens.js at the eighth audit (D-573).
// `c` holds cardscreens.js's helpers: pickChest and takeDownBench.
import { bagSize } from '../../core/bag.js';
import { CHEST_TAKE, CHEST_STORE, moveChest } from '../../core/chest.js';
import { chestAt } from '../../render/chestpanel.js';
import { view } from '../../render/screen.js';

export function chestCard(app, ui, show, c) {
  const { pickChest, takeDownBench } = c;
  // A slot's stack moved to the other side; Store matching; Deconstruct, only when empty (CH5)
  function pick(i) { if (i === CHEST_TAKE) takeDownBench(); else if (i === CHEST_STORE) ui.store(app.bench.x, app.bench.y); else { ui.stash(app.bench.x, app.bench.y, i); pickChest(i); } }
  const dir = (dir) => { pickChest(moveChest(app.chosen, dir, bagSize(app.state))); };
  function tap(px, py, held) {
    if (held) return;
    const at = chestAt(px, py, view.w, view.h, bagSize(app.state));
    if (at === 'out' || at === 'close') show('play');
    else if (at === 'take') { app.chosen = CHEST_TAKE; pick(CHEST_TAKE); }
    else if (at === 'store') { pickChest(CHEST_STORE); pick(CHEST_STORE); }
    else if (at) pick(at.slot);
  }
  const close = () => show('play'); // Esc or P
  return { pick, dir, tap, close };
}
