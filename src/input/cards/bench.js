// § bench card (WB3, D-323, D-387): a set-down workbench's card, its pick, arrows, taps and
// close, moved word for word from screens.js at the eighth audit (D-573). `c` holds
// cardscreens.js's helpers: pickBench and takeDownBench.
import { stationMakes, BENCH_TAKE, moveBench } from '../../core/menu.js';
import { tileAt } from '../../core/room.js';
import { bagSize } from '../../core/bag.js';
import { nearStacks } from '../../core/chest.js';
import { knownOf } from '../../core/bagmake.js';
import { benchAt } from '../../render/benchpanel.js';
import { view } from '../../render/screen.js';

export function benchCard(app, ui, show, c) {
  const { pickBench, takeDownBench } = c;
  // Enter, Space or Make: the thing on the slot made, or Deconstruct takes it down
  function pick(i) { const m = stationMakes(tileAt(app.state.room, app.bench.x, app.bench.y), app.state.bag, bagSize(app.state), nearStacks(app.state), knownOf(app.state))[i]; if (i === BENCH_TAKE) takeDownBench(); else if (m) ui.make(m.item); }
  const dir = (dir) => { pickBench(moveBench(app.chosen, dir)); }; // the bag's grid, Deconstruct under it (D-387)
  function tap(px, py, held) {
    if (held) return;
    const at = benchAt(px, py, view.w, view.h);
    if (at === 'out' || at === 'close') show('play');
    else if (at === 'make' && app.chosen !== BENCH_TAKE) pick(app.chosen); // Make shows only for a slot
    else if (at === 'take') { app.chosen = BENCH_TAKE; pick(BENCH_TAKE); }
    else if (at) pickBench(at.slot);
  }
  const close = () => show('play'); // Esc or P
  return { pick, dir, tap, close };
}
