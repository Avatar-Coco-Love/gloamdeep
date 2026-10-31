// § profile screens: a new profile's name pad, then its look card, and Rename and Look from the
// slot screen (D-272, D-273, P3 to P6, D-521). Split from screens.js at the
// fourth audit (D-421): `app` and `ui` as there, and `show` to open a screen.
import { NAME_PAD, typeLetter } from '../core/namepad.js';
import { CLOAK_IDS, cloakOf, EYE_IDS, eyesOf, TRIM_IDS, trimOf, CLOTHES_IDS, clothesOf, LOOK_PADS, tabOf, moveLook } from '../core/looks.js';

export function createProfileScreens(app, ui, show) {
  const { spoken } = ui;
  // § name pad (D-272): OK makes the profile with the letters typed (none keeps it unnamed,
  // Claude's call) and opens the title; the round cross, a tap outside or Esc goes back to the slot
  // screen with nothing made (D-398). Renaming (D-273) opens on the name kept; OK keeps the new one
  // (none: unnamed again) and goes back to the slot screen; the cross or Esc leaves the old name.
  const nameWords = () => (app.renaming ? `Rename profile. ${app.entry || 'nothing typed'}. Type up to 12 letters, then OK. Esc or the close button goes back.` : 'Name your profile. Type up to 12 letters, then OK. Esc or the close button goes back.');
  function openName(i, renaming) { app.naming = i; app.renaming = renaming; app.entry = renaming ? app.profiles.slots[i].name : ''; show('name'); }
  function closeName() { app.picking = null; show('slots', app.naming); }
  function pressName(id) {
    if (id === 'ok' && app.renaming) { ui.renameSlot(app.naming, app.entry); closeName(); }
    else if (id === 'ok') openCloak(app.naming, true);
    else { app.entry = typeLetter(app.entry, id); spoken.textContent = app.entry || 'nothing typed'; }
  }
  // § look (D-517, D-521; were four cards, P3 to P6): a new profile's comes after its name, open
  // on the cloak; the cross returns to the name pad with the name kept. Look opens on the
  // profile's own look, and the cross leaves it as it was. The flame on a tab opens it; on a
  // choice, picks it. OK from any tab makes a new profile and opens the title, or keeps a
  // profile's new look.
  const lookOf = () => ({ cloak: app.cloak, eyes: app.eyes, trim: app.trim, clothes: app.clothes });
  const choiceWords = (tab) => { const t = tabOf(tab); return `${t.name.toLowerCase()} tab, ${t.table[app[tab]].name} picked. ${t.ids.map((id) => t.table[id].name).join(', ')}.`; };
  const lookWords = () => `Choose your look. ${choiceWords(app.lookTab)} Tabs: cloak, eyes, trim, clothes. Arrows choose, then OK.`;
  function openCloak(i, fresh) {
    const p = app.profiles.slots[i];
    app.naming = i; app.cloakNew = fresh; app.lookTab = 'cloak';
    app.cloak = fresh ? CLOAK_IDS[0] : cloakOf(p);
    app.eyes = fresh ? EYE_IDS[0] : eyesOf(p);
    app.trim = fresh ? TRIM_IDS[0] : trimOf(p);
    app.clothes = fresh ? CLOTHES_IDS[0] : clothesOf(p);
    show('cloak', LOOK_PADS.cloak.findIndex((k) => !k.tab && k.id === app.cloak));
  }
  function closeCloak() {
    if (app.cloakNew) show('name', NAME_PAD.findIndex((k) => k.id === 'ok'));
    else { app.picking = null; show('slots', app.naming); }
  }
  // The flame moves to key i of the open tab's pad; on a tab, that tab opens; on a hero, that
  // choice is picked
  function moveToLook(i) {
    app.chosen = i;
    const k = LOOK_PADS[app.lookTab][i], tab = tabOf(app.lookTab);
    if (k.tab) { app.lookTab = k.id; spoken.textContent = choiceWords(k.id); }
    else if (k.id === 'ok') spoken.textContent = 'OK';
    else { app[app.lookTab] = k.id; spoken.textContent = `${tab.table[k.id].name} ${app.lookTab === 'clothes' ? '' : app.lookTab}`.trim(); }
  }
  // Enter on a tab goes down to its picked choice, on a hero on to OK; a tap stays where it was
  function pressLook(i, tapped = false) {
    const pad = LOOK_PADS[app.lookTab], k = pad[i];
    if (k.id === 'ok' && !k.tab) {
      if (app.cloakNew) { ui.useSlot(app.naming, app.entry, lookOf()); show('title'); }
      else { ui.lookSlot(app.naming, lookOf()); closeCloak(); }
      return;
    }
    moveToLook(i);
    if (tapped) return;
    if (k.tab) moveToLook(LOOK_PADS[k.id].findIndex((p) => !p.tab && p.id === app[k.id]));
    else moveToLook(pad.findIndex((p) => p.id === 'ok'));
  }
  const moveLookBy = (dir) => moveToLook(moveLook(app.lookTab, app.chosen, dir, app[app.lookTab]));
  return { nameWords, openName, closeName, pressName, lookWords, openCloak, closeCloak, moveLookBy, pressLook };
}
