// § profile screens: a new profile's name pad, then its look card, and Rename and Look from the
// slot screen (D-272, D-273, P3 to P6, D-521). Split from screens.js at the
// fourth audit (D-421): `app` and `ui` as there, and `show` to open a screen.
import { NAME_PAD, typeLetter } from '../core/namepad.js';
import { LOOK_TABS, CLOAK_IDS, cloakOf, EYE_IDS, eyesOf, TRIM_IDS, trimOf, CLOTHES_IDS, clothesOf, LAMP_IDS, lampOf, HEAD_IDS, headOf, LOOK_PADS, tabOf, moveLook, rollLook, isLocked, choiceOf, tabRows, clampScroll, lookScrollTo } from '../core/looks.js';
import { shopOf as shopFor, priceNote, plural } from '../core/feats.js';
import { boxesAt } from '../render/cloak.js';
import { view } from '../render/screen.js';

export function createProfileScreens(app, ui, show) {
  const { spoken } = ui;
  // § name pad (D-272): OK makes the profile with the letters typed (none keeps it unnamed,
  // Claude's call) and opens the title; the round cross, a tap outside or Esc goes back to the slot
  // screen with nothing made (D-398). Renaming (D-273) opens on the name kept; OK keeps the new one
  // (none: unnamed again) and goes back to the slot screen; the cross or Esc leaves the old name.
  const nameWords = () => (app.renaming ? `Rename profile. ${app.entry || 'nothing typed'}. Type up to 12 letters, then OK. Esc or the close button goes back.` : 'Name your profile. Type up to 12 letters, then OK. Esc or the close button goes back.');
  function openName(i, renaming) { app.naming = i; app.renaming = renaming; app.entry = renaming ? app.profiles.slots[i].name : ''; wearOf(renaming && app.profiles.slots[i]); show('name'); }
  // The look the name and look cards show: a profile's own, or a new hero's first free one (D-517)
  function wearOf(p) {
    app.cloak = p ? cloakOf(p) : CLOAK_IDS[0]; app.eyes = p ? eyesOf(p) : EYE_IDS[0];
    app.trim = p ? trimOf(p) : TRIM_IDS[0]; app.clothes = p ? clothesOf(p) : CLOTHES_IDS[0];
    app.lamp = p ? lampOf(p) : LAMP_IDS[0]; // D-702
    app.head = p ? headOf(p) : HEAD_IDS[0]; // D-703
  }
  function closeName() { app.picking = null; show('slots', app.naming); }
  function pressName(id) {
    if (id === 'ok' && app.renaming) { ui.renameSlot(app.naming, app.entry); closeName(); }
    else if (id === 'ok') openCloak(app.naming, true);
    else { app.entry = typeLetter(app.entry, id); spoken.textContent = app.entry || 'nothing typed'; }
  }
  // § look (D-517, D-521; were four cards, P3 to P6): a new profile's comes after its name, open
  // on the cloak; the cross returns to the name pad with the name kept. Look opens on the
  // profile's own look, and the cross leaves it as it was. The flame on a tab opens it; on a
  // choice, picks it. RANDOM rolls all four parts and the flame stays on it (D-522). OK from any tab makes a new profile and opens the title, or keeps a
  // profile's new look.
  // The profile on the card's patterns bought and Glints left; a new hero's are none (D-696)
  const shopOf = () => shopFor(!app.cloakNew && app.profiles.slots[app.naming]);
  const lookOf = () => ({ cloak: app.cloak, eyes: app.eyes, trim: app.trim, clothes: app.clothes, lamp: app.lamp, head: app.head });
  const choiceWords = (tab) => { const t = tabOf(tab); return `${t.name.toLowerCase()} tab, ${t.table[app[tab]].name} picked. ${t.ids.map((id) => t.table[id].name + (isLocked(tab, id, shopOf().bought) ? ' locked' : '')).join(', ')}.`; };
  const lookWords = () => `Choose your look. ${choiceWords(app.lookTab)} Tabs: cloak, eyes, trim, clothes, lamp, head. Arrows choose, then OK. Random rolls a whole new look.`;
  const wornWords = () => LOOK_TABS.map((t) => `${t.table[app[t.id]].name} ${t.id === 'clothes' ? '' : t.id}`.trim()).join(', ');
  function openCloak(i, fresh) {
    const p = app.profiles.slots[i];
    app.naming = i; app.cloakNew = fresh; app.lookTab = 'cloak'; app.lookTry = null; app.lookScroll = 0;
    if (!fresh) wearOf(p); // a new hero keeps the look picked before going back to its name (D-517)
    show('cloak', LOOK_PADS.cloak.findIndex((k) => !k.tab && k.id === app.cloak));
  }
  function closeCloak() {
    if (app.cloakNew) show('name', NAME_PAD.findIndex((k) => k.id === 'ok'));
    else { app.picking = null; show('slots', app.naming); }
  }
  // The flame moves to key i of the open tab's pad; on a tab, that tab opens; on a hero, that
  // choice is picked
  // A locked pattern (D-533) is only tried on the big hero, app.lookTry, and the kept choice stays;
  // it stays tried with the flame on the foot's buttons, RANDOM then being BUY (D-696); a locked lamp or head the same (D-702, D-703)
  const tryWords = (id) => { const c = choiceOf(id), { have } = shopOf(); return `${c.name}, locked. ${priceNote(c.name, c.price, have)}`; };
  function moveToLook(i) {
    const k = LOOK_PADS[app.lookTab][i], tab = tabOf(app.lookTab);
    app.chosen = i;
    if (k.tab || (k.id !== 'ok' && k.id !== 'random')) app.lookTry = null;
    if (!k.tab && isLocked(app.lookTab, k.id, shopOf().bought)) { app.lookTry = k.id; spoken.textContent = tryWords(k.id); }
    else if (k.tab) { if (k.id !== app.lookTab) app.lookScroll = 0; app.lookTab = k.id; spoken.textContent = choiceWords(k.id); }
    else if (k.id === 'ok') spoken.textContent = 'OK';
    else if (k.id === 'random' && app.lookTry) spoken.textContent = shopOf().have >= choiceOf(app.lookTry).price ? `Buy ${choiceOf(app.lookTry).name} for ${plural(choiceOf(app.lookTry).price)}` : `Buy, too few Glints. ${tryWords(app.lookTry)}`;
    else if (k.id === 'random') spoken.textContent = 'Random';
    else { app[app.lookTab] = k.id; spoken.textContent = `${tab.table[k.id].name} ${app.lookTab === 'clothes' ? '' : app.lookTab}`.trim(); }
    app.lookScroll = lookScrollTo(app.lookTab, app.lookScroll, i, shownNow()); // the window follows the flame (D-701)
  }
  // Enter on a tab goes down to its picked choice, on a hero on to OK; a tap stays where it was;
// RANDOM rolls and stays
  function pressLook(i, tapped = false) {
    const pad = LOOK_PADS[app.lookTab], k = pad[i];
    if (k.id === 'ok' && !k.tab) {
      if (app.cloakNew) { ui.useSlot(app.naming, app.entry, lookOf()); show('title'); }
      else { ui.lookSlot(app.naming, lookOf()); closeCloak(); }
      return;
    }
    if (k.id === 'random' && app.lookTry) { buy(i); return; }
    if (k.id === 'random') { app.chosen = i; app.lookTry = null; Object.assign(app, rollLook(app.lookRoll, shopOf().bought)); spoken.textContent = `Rolled: ${wornWords()}.`; return; }
    moveToLook(i);
    if (tapped || app.lookTry) return; // the flame stays on a locked pattern, as it can't be picked
    if (k.tab) moveToLook(LOOK_PADS[k.id].findIndex((p) => !p.tab && p.id === app[k.id]));
    else moveToLook(pad.findIndex((p) => p.id === 'ok'));
  }
  // § buy (D-696): BUY spends the tried pattern's Glints at once, with no asking, and wears it;
  // the flame goes on to OK. With too few Glints it does nothing but say so.
  function buy(i) {
    const id = app.lookTry, c = choiceOf(id);
    app.chosen = i;
    if (shopOf().have < c.price) { spoken.textContent = tryWords(id); return; }
    ui.buySlot(app.naming, id);
    app[app.lookTab] = id; app.lookTry = null;
    app.chosen = LOOK_PADS[app.lookTab].findIndex((p) => p.id === 'ok');
    spoken.textContent = `Bought ${c.name}. ${plural(shopOf().have)} left.`;
  }
  // The window's rows on this view: LOOK_SHOWN, one fewer on the smallest (D-702)
  const shownNow = () => boxesAt(view.w, view.h).shown;
  const moveLookBy = (dir) => moveToLook(moveLook(app.lookTab, app.chosen, dir, app[app.lookTab]));
  // § scroll (D-701): a swipe or the wheel moves the choices a row, by > 0 down the list; false
  // when the open tab's choices all fit, so a swipe moves the flame as before
  function scrollLookBy(by) {
    const rows = tabRows(app.lookTab), shown = shownNow();
    if (rows <= shown) return false;
    app.lookScroll = clampScroll((app.lookScroll ?? 0) + by, rows, shown);
    return true;
  }
  return { nameWords, openName, closeName, pressName, lookWords, openCloak, closeCloak, moveLookBy, pressLook, scrollLookBy };
}
