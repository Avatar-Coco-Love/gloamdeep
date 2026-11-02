// § profiles card (D-271, D-397): the slot screen's pick, arrows, tap and close, chooseSlot moved
// word for word from screens.js at the eighth audit (D-578). Opening it and its spoken words stay
// in screens.js (openSlots, slotsWords). `c` holds slotsBack, linesNow, slotsWords, titleAt, and
// openName and openCloak from profilescreens.js.
import { SLOTS } from '../../core/profile.js';
import { SURE_MENU } from '../../core/menu.js';
import { slotsAt, moveSlots } from '../../render/slots.js';
import { view } from '../../render/screen.js';

export function slotsCard(app, ui, show, c) {
  const { spoken } = ui;
  const { slotsBack, linesNow, slotsWords, titleAt, openName, openCloak } = c;
  function chooseSlot(i) {
    if (i < SLOTS) {
      const p = app.profiles.slots[i];
      if (!app.picking && !p) openName(i, false);
      else if (!app.picking) { ui.useSlot(i); show('title'); }
      else if (!p) return; // an Empty box can't be renamed or deleted
      else if (app.picking === 'rename') openName(i, true);
      else if (app.picking === 'look') openCloak(i, false);
      else { app.dropping = i; show('drop', SURE_MENU.findIndex((l) => l.id === 'no')); }
      return;
    }
    const id = linesNow()[i - SLOTS]?.id;
    if (id === 'rename' || id === 'look' || id === 'delete') { app.picking = app.picking === id ? null : id; spoken.textContent = slotsWords(); }
  }
  const dir = (dir) => { app.chosen = moveSlots(app.chosen, dir); }; // the boxes, then the buttons' row (D-397)
  function tap(px, py, held) {
    if (held) return;
    const at = slotsAt(px, py, view.w, view.h, linesNow(), slotsBack());
    if (at === 'close' || (at === 'out' && slotsBack())) titleAt('profiles'); // the round cross goes back (D-397)
    else if (at !== null && at !== 'out') { const i = typeof at === 'number' ? at : SLOTS + linesNow().findIndex((l) => l.id === at); app.chosen = i; chooseSlot(i); }
  }
  // Esc or P: Cancel while picking Rename, Look or Delete, else back to the title once there is one
  function close() {
    if (app.picking) { app.picking = null; spoken.textContent = slotsWords(); } // Cancel
    else if (slotsBack()) titleAt('profiles');
  }
  return { pick: chooseSlot, dir, tap, close };
}
