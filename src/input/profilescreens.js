// § profile screens: a new profile's name pad, then its cloak, eyes, trim and clothes, and
// Rename and Look from the slot screen (D-272, D-273, P3 to P6). Split from screens.js at the
// fourth audit (D-421): `app` and `ui` as there, and `show` to open a screen.
import { NAME_PAD, typeLetter } from '../core/namepad.js';
import { CLOAKS, CLOAK_PAD, CLOAK_IDS, cloakOf, EYES, EYES_PAD, EYE_IDS, eyesOf, TRIMS, TRIM_PAD, TRIM_IDS, trimOf, CLOTHES, CLOTHES_PAD, CLOTHES_IDS, clothesOf } from '../core/looks.js';

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
  // § cloak (P3): a new profile's comes after its name; the cross returns to the name pad with the
  // name kept. Look opens on the profile's own look, and the cross leaves it as it was. OK goes on
  // to the eyes (P4).
  const cloakWords = () => `Choose a cloak. ${CLOAKS[app.cloak].name} picked. ${CLOAK_IDS.map((id) => CLOAKS[id].name).join(', ')}. Arrows choose, then OK.`;
  function openCloak(i, fresh) {
    app.naming = i; app.cloakNew = fresh;
    app.cloak = fresh ? CLOAK_IDS[0] : cloakOf(app.profiles.slots[i]);
    app.eyes = fresh ? EYE_IDS[0] : eyesOf(app.profiles.slots[i]);
    app.trim = fresh ? TRIM_IDS[0] : trimOf(app.profiles.slots[i]);
    app.clothes = fresh ? CLOTHES_IDS[0] : clothesOf(app.profiles.slots[i]);
    show('cloak', CLOAK_IDS.indexOf(app.cloak));
  }
  function closeCloak() {
    if (app.cloakNew) show('name', NAME_PAD.findIndex((k) => k.id === 'ok'));
    else { app.picking = null; show('slots', app.naming); }
  }
  // The flame moves to key i; on a hero, that cloak is picked
  function moveToCloak(i) {
    app.chosen = i;
    const id = CLOAK_PAD[i].id;
    if (CLOAKS[id]) { app.cloak = id; spoken.textContent = `${CLOAKS[id].name} cloak`; } else spoken.textContent = 'OK';
  }
  function pressCloak(i, tapped = false) {
    const id = CLOAK_PAD[i].id;
    if (CLOAKS[id]) { moveToCloak(i); if (!tapped) moveToCloak(CLOAK_PAD.findIndex((k) => k.id === 'ok')); } // Enter on a hero goes on to OK
    else show('eyes', EYE_IDS.indexOf(app.eyes));
  }
  // § eyes (P4): after the cloak, the same shape. OK goes on to the trim (P5); the cross returns
  // to the cloak with the choices kept.
  const eyesWords = () => `Choose your eyes. ${EYES[app.eyes].name} picked. ${EYE_IDS.map((id) => EYES[id].name).join(', ')}. Arrows choose, then OK.`;
  const backToCloak = () => show('cloak', CLOAK_PAD.findIndex((k) => k.id === 'ok'));
  function moveToEyes(i) {
    app.chosen = i;
    const id = EYES_PAD[i].id;
    if (EYES[id]) { app.eyes = id; spoken.textContent = `${EYES[id].name} eyes`; } else spoken.textContent = 'OK';
  }
  function pressEyes(i, tapped = false) {
    const id = EYES_PAD[i].id;
    if (EYES[id]) { moveToEyes(i); if (!tapped) moveToEyes(EYES_PAD.findIndex((k) => k.id === 'ok')); }
    else show('trim', TRIM_IDS.indexOf(app.trim));
  }
  // Esc or P: a new profile goes back to its cloak; a profile's Look ends with nothing changed
  const escEyes = () => (app.cloakNew ? backToCloak() : closeCloak());
  // § trim (P5): after the eyes, the same shape. OK goes on to the clothes (P6); the cross returns
  // to the eyes with the choices kept.
  const trimWords = () => `Choose a trim. ${TRIMS[app.trim].name} picked. ${TRIM_IDS.map((id) => TRIMS[id].name).join(', ')}. Arrows choose, then OK.`;
  const backToEyes = () => show('eyes', EYES_PAD.findIndex((k) => k.id === 'ok'));
  function moveToTrim(i) {
    app.chosen = i;
    const id = TRIM_PAD[i].id;
    if (TRIMS[id]) { app.trim = id; spoken.textContent = `${TRIMS[id].name} trim`; } else spoken.textContent = 'OK';
  }
  function pressTrim(i, tapped = false) {
    const id = TRIM_PAD[i].id;
    if (TRIMS[id]) { moveToTrim(i); if (!tapped) moveToTrim(TRIM_PAD.findIndex((k) => k.id === 'ok')); }
    else show('clothes', CLOTHES_IDS.indexOf(app.clothes));
  }
  // Esc or P: a new profile goes back to its eyes; a profile's Look ends with nothing changed
  const escTrim = () => (app.cloakNew ? backToEyes() : closeCloak());
  // § clothes (P6): after the trim, four heroes two to a row. OK makes a new profile and opens the
  // title, or keeps a profile's new look; the cross returns to the trim with the choices kept.
  const clothesWords = () => `Choose your clothes. ${CLOTHES[app.clothes].name} picked. ${CLOTHES_IDS.map((id) => CLOTHES[id].name).join(', ')}. Arrows choose, then OK.`;
  const backToTrim = () => show('trim', TRIM_PAD.findIndex((k) => k.id === 'ok'));
  function moveToClothes(i) {
    app.chosen = i;
    const id = CLOTHES_PAD[i].id;
    if (CLOTHES[id]) { app.clothes = id; spoken.textContent = CLOTHES[id].name; } else spoken.textContent = 'OK';
  }
  function pressClothes(i, tapped = false) {
    const id = CLOTHES_PAD[i].id, look = { cloak: app.cloak, eyes: app.eyes, trim: app.trim, clothes: app.clothes };
    if (CLOTHES[id]) { moveToClothes(i); if (!tapped) moveToClothes(CLOTHES_PAD.findIndex((k) => k.id === 'ok')); }
    else if (app.cloakNew) { ui.useSlot(app.naming, app.entry, look); show('title'); }
    else { ui.lookSlot(app.naming, look); closeCloak(); }
  }
  // Esc or P: a new profile goes back to its trim; a profile's Look ends with nothing changed
  const escClothes = () => (app.cloakNew ? backToTrim() : closeCloak());
  return { nameWords, openName, closeName, pressName, cloakWords, openCloak, closeCloak, moveToCloak, pressCloak,
    eyesWords, backToCloak, moveToEyes, pressEyes, escEyes, trimWords, backToEyes, moveToTrim, pressTrim, escTrim,
    clothesWords, backToTrim, moveToClothes, pressClothes, escClothes };
}
