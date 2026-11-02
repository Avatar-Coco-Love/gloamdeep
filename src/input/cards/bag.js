// § bag card (D-247, D-385, D-546, D-548, D-554, D-558, D-559): the bag's card, its pick,
// arrows, taps and close, moved word for word from screens.js at the eighth audit (D-573).
// `c` holds cardscreens.js's helpers: useChosen, moveBag, canStore, pickStore, storeNear,
// pickSort, sortBag, dropChosen, pickGear and pickSlot. Its C and X keys stay in onType.
import { bagSize } from '../../core/bag.js';
import { get } from '../../core/registry.js';
import { bagAt, twoButtons, gearChosen } from '../../render/bag.js';
import { view } from '../../render/screen.js';

export function bagCard(app, ui, show, c) {
  const { useChosen, moveBag, canStore, pickStore, storeNear, pickSort, sortBag, dropChosen, pickGear, pickSlot } = c;
  const pick = () => { useChosen(); };
  const dir = (dir) => { moveBag(dir); }; // a 3 × 2 grid (D-385), bigger with the Pouch (D-548), the gear row above it (D-554)
  function tap(px, py, held) {
    if (held) return;
    const s = app.state.bag[app.chosen], g = gearChosen(app.chosen); // a gear slot chosen: only Take off's corner (D-554)
    const at = bagAt(px, py, view.w, view.h, twoButtons(s && get(s.id)), !!(s && get(s.id).sets), !!s, bagSize(app.state), g >= 0, canStore());
    if (at === 'out' || at === 'close') show('play');
    else if (at === 'store') { pickStore(); storeNear(); }
    else if (at === 'sort') { pickSort(); sortBag(); }
    else if (at === 'drop') dropChosen();
    else if (at === 'act' || at === 'make') useChosen(at === 'make');
    else if (at?.gear !== undefined) pickGear(at.gear);
    else if (at) pickSlot(at.slot);
  }
  const close = () => show('play'); // Esc or P
  return { pick, dir, tap, close };
}
