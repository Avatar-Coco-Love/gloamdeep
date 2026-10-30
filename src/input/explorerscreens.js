// § world screens: the Seed Explorer, Settings' ways to play and the seed pad (D-214, MO4,
// D-191). Split from screens.js at the fifth audit (D-468): `app` and `ui` as there, `show` to open
// a screen, `mapFloor` to draw a floor, `menuOf` for a screen's lines and `titleAt` for the title.
import { startSeeds, addSeed, backSeed } from '../core/explorer.js';
import { floorsShown } from '../core/map.js';
import { SURE_MENU, MODE_HEADING, modeAt, modeText, easier, easeMenu } from '../core/menu.js';
import { typeKey, entrySeed } from '../core/seedpad.js';
import { saveSettings, seedText } from '../core/settings.js';

export function createWorldScreens(app, ui, show, mapFloor, menuOf, titleAt) {
  const { spoken } = ui;
  // § explorer (D-214): opens on the Settings seed, else a random one, on the surface;
  // Reseed, a typed seed and Back keep the floor shown, fitted whole. Settings never changes.
  function openExplorer() {
    app.seeds = startSeeds(app.settings.seed || ui.randomSeed());
    app.floors = floorsShown(null, true);
    show('explore');
    mapFloor(0);
  }
  const closeExplorer = () => titleAt('explore');
  function showSeeds(next) {
    if (next === app.seeds) return;
    app.seeds = next;
    mapFloor(app.plan.depth);
  }
  function pressBar(id) {
    if (id === 'back') showSeeds(backSeed(app.seeds));
    else if (id === 'reseed') showSeeds(addSeed(app.seeds, ui.randomSeed()));
    else if (id === 'type') openPad('explore');
  }

  // § ways (MO4, D-346): Settings' Way to play line opens the ways, the one played picked; a harder
  // one can't be picked, the one played goes back, an easier one asks first (No picked)
  const waysWords = () => `${MODE_HEADING}. ${easeMenu(app.state.mode).map((l) => `${l.text}: ${l.note}`).join(' ')}`;
  const openWays = (at = app.state.mode) => show('ways', modeAt(at));
  const closeWays = () => show('settings', menuOf('settings').findIndex((l) => l.id === 'mode'));
  function pickWay(id) {
    if (easier(app.state.mode, id)) { app.easier = id; show('easier', SURE_MENU.findIndex((l) => l.id === 'no')); }
    else if (id === app.state.mode) closeWays();
  }
  function closeEasier(yes) {
    if (!yes) { openWays(app.easier); return; }
    ui.ease(app.easier); closeWays();
    spoken.textContent = modeText(app.state.mode);
  }

  // § seed pad (D-191): OK keeps the typed seed, or Random when none is typed; Random
  // keeps Random. Either starts the next New journey; this one goes on as it is.
  // From the Explorer it starts empty; OK shows the seed typed, or keeps the one shown
  // when none is typed, and Random shows a random one (D-214).
  function openPad(from = 'settings') {
    app.padFrom = from;
    app.entry = from === 'settings' && app.settings.seed ? String(app.settings.seed) : '';
    show('seed');
  }
  function closePad() {
    if (app.padFrom === 'explore') { show('explore'); mapFloor(app.plan.depth, () => app.view); }
    else show('settings', menuOf('settings').findIndex((l) => l.id === 'seed'));
  }
  function pressKey(id) {
    if (app.padFrom === 'explore' && (id === 'ok' || id === 'random')) {
      const seed = id === 'ok' ? entrySeed(app.entry) : ui.randomSeed();
      closePad();
      if (seed) showSeeds(addSeed(app.seeds, seed));
    } else if (id === 'ok' || id === 'random') {
      const seed = id === 'ok' ? entrySeed(app.entry) : null;
      app.settings = { ...app.settings, seed };
      saveSettings(app.settings);
      closePad();
      spoken.textContent = seedText(seed);
    } else { app.entry = typeKey(app.entry, id); spoken.textContent = app.entry || 'nothing typed'; }
  }
  return { openExplorer, closeExplorer, showSeeds, pressBar, waysWords, openWays, closeWays, pickWay, closeEasier, openPad, closePad, pressKey };
}
