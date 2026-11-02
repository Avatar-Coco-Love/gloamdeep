// § screens: the game opens on the title screen (D-177); in play, the pause button,
// Esc or P open the pause menu over the room (D-187). Settings opens from either,
// and Back, Esc or P return there (D-189). On a menu, arrows and swipes
// move the flame; Enter, Space or a tap on a line picks it. The Seed line opens
// the seed pad; Esc or P leave it with nothing changed (D-191). How to play opens
// from either menu on the way of playing last used, and returns there the same way (D-193).
// In play, the map button or M opens the map; the button (a cross while it is open), M, Esc,
// P or a tap outside its box closes it. Drags, pinches, the wheel and arrows move it (D-205).
// Its heading's arrows, < and >, Page Up and Page Down, or a tap on stairs found turn it a floor (D-206).
// Seed Explorer on the title opens the same map for any seed, all revealed, with no
// hero (D-214); the cross, Esc, P, M or a tap outside the box return to the title.
// In play, the bag button or I opens the bag over the room's foot; Left and Right or a tap
// pick a slot, Enter, Space or Pour pours the chosen flask, which closes it and takes the
// turn; the button (a cross while it is open), I, Esc, P or a tap outside it closes it (D-247).
// On oilcaps, Enter, Space or Make crafts a flask, a turn, and the bag stays open on it (D-299).
// On heartcaps, Enter, Space or Eat eats one, a turn, and the bag stays open (D-308); C or
// Make beside it makes a healing potion from 3, and Drink, on one, drinks it (D-309).
// On any item, Drop or X sets its whole stack down at the hero's feet, free (D-546).
// On the workbench, Enter, Space or Set down closes it and marks the sides it can go on;
// an arrow, a swipe or a tap on a marked tile sets it there, a turn; Esc, P, I or a tap
// elsewhere leave it in the bag (WB2, D-322).
// Bumping a set-down workbench, or a click or tap on one beside the hero, opens its panel,
// free (WB3, D-323): Up and Down choose, Enter, Space or a tap picks; Deconstruct workbench
// takes it down, a turn, and closes it; Close, Esc, P or a tap outside the box close it.
// Stash chest, above it, makes one into the bag, a turn, and the panel stays open (CH1, D-326).
// Bumping a set-down stash chest, or a click or tap on one, opens its card the same way,
// free (CH3, D-330; a card, D-387): arrows move the gold frame over its 12 slots and,
// Right from them, the bag's 6; the round cross, Esc, P or a tap outside the card close
// it. Enter, Space, a click or a tap on a filled slot moves its whole stack to the other
// side, free (CH4, D-331). Deconstruct, Down from either grid's bottom row, takes it
// down the bench's way, only when empty (CH5).
// Bumping the peddler at home, or a click or tap on him, says his line and opens his card,
// free (D-494): arrows or a tap pick a bag slot; Sell, Enter or Space sell one of it, free;
// the round cross, Esc, P or a tap outside the card close it. Its tabs, Sell and Buy (D-495):
// a tap turns one, or Up from the grid's top row moves the frame onto them, Left and Right
// or Enter turn them there, and Down goes back; on Buy the grid holds his wares, and Buy,
// Enter or Space buy one, free.
// Continue goes back to the saved journey; New journey, while one is saved, asks
// "Start over?" first, and No, Esc or P return to the title (D-238).
// A Hardcore fall shows "Your journey ends.": Same world or New world wakes the hero in the
// world begun again (D-344); Esc or P return to the title, Continue there.
// Version history in Settings opens its card of every version (D-254, D-393): Up and Down choose
// one, Enter, Space, Right or a tap on its row opens or closes it (Left closes it), swipes and
// Page Up and Page Down scroll a page; the round cross, a tap outside the card, Esc or P return
// to Settings.
// Journal, on the title and the pause menu, opens its card on Records (D-270, D-391); Right,
// Enter or Space, or a tap on a tab turn to Growth (D-293), a tree (D-481): the arrows or a tap
// move the gold outline over its places, Left past Light back to Records, and Enter or Space,
// as a tap on the button, buys the picked upgrade (ADD A HEART on Body's heart). The round
// cross, a tap outside the card, Esc or P return to the menu it was opened from.
// The game opens on the slot screen (D-271), a card (D-397): Up and Down or a tap pick a slot's box, which
// plays as that profile (a new one in an empty slot) and opens the title. Delete, then a box,
// asks "Delete …? Lost for good." with No picked; No, Esc or P go back. Profiles on the title
// opens the slot screen again, with the round cross, Esc, P or a tap outside returning to the title. An empty box first
// opens the name pad (D-272), a card (D-398): letters typed, tapped or picked, Del, and OK makes the profile;
// the round cross, a tap outside or Esc goes back to the slot screen with nothing made. Rename, then a profile's box, opens the
// pad on its name; OK keeps the new name, Esc the old (D-273). Cancel, Esc or P stop picking.
// After the name, a new profile chooses its cloak, its eyes, its lantern's trim and its clothes on
// one look card, a tab each; Look, then a box, changes them later (P3 to P6, D-521). Arrows,
// swipes or a tap pick one, OK makes it, and the round cross, a tap outside, Esc or P go back
// (D-399), leaving a profile's old look as it was.
// Split from main.js (D-235): `app` holds what the screens share with play and drawing.
import { depthOf, areaAt, tileAt } from '../core/room.js';
import { lineAt, pauseTop } from '../render/menu.js';
import { titleTop } from '../render/title.js';
import { titleCardAt, chipOf } from '../render/titlecard.js';
import { seedCardAt } from '../render/seedpad.js';
import { howtoAt } from '../render/howto.js';
import { historyRows, historyAt, historyLayout, headRow, lastRow, ROW_H } from '../render/history.js';
import { HISTORY, versionWords, scrollToShow, clampScroll } from '../core/history.js';
import { nextPage, howtoWords } from '../core/howto.js';
import { PAD, moveKey } from '../core/seedpad.js';
import { NAME_PAD, moveName } from '../core/namepad.js';
import { nameCardAt } from '../render/namepad.js';
import { createProfileScreens } from './profilescreens.js';
import { createWorldScreens } from './explorerscreens.js';
import { lookCardAt } from '../render/cloak.js';
import { titleMenu, PAUSE_MENU, benchMakes, BENCH_TAKE, moveBench, SURE_MENU, SURE_NOTE, SURE_HEADING, BED_HEADING, BED_NOTE, DROP_NOTE, MODE_MENU, MODE_HEADING, MODE_FIRST, easeMenu, easeHeading, EASE_NOTE, ENDED_MENU, ENDED_HEADING, settingsMenu, moveChoice } from '../core/menu.js';
import { saveSettings, swipeText, tapText, nextTap, padText, nextOnOff, stopText, nextStop, nextMotion, motionText, lanternText, nextLantern, flasksText, nextFlasks, soundText, nextSound, statsText } from '../core/settings.js';
import { floorPlan, wholeSurface, roomsFound, fitView, panView, zoomView, floorsShown, turnFrom, stairsNear, stairsIn, centreView } from '../core/map.js';
import { setMap, mapLayout, mapCardAt } from '../render/map.js';
import { shownSeed, explorerWorld } from '../core/explorer.js';
import { bagSize, bagCols, canCraft } from '../core/bag.js';
import { setSides, DIRS } from '../core/turn.js';
import { get } from '../core/registry.js';
import { playing as inPlay, SLOTS, slotName, playedText } from '../core/profile.js';
import { slotLines, slotsAt, slotsHeading, moveSlots } from '../render/slots.js';
import { askCardAt } from '../render/askcard.js';
import { journalWords, growthWords } from '../core/journal.js';
import { addHeart, movePick, told, START_PICK } from '../core/growth.js';
import { journalAt } from '../render/journal.js';
import { bagAt, twoButtons, setVersionGap, gearChosen, BAG_STORE, BAG_SORT } from '../render/bag.js';
import { benchAt } from '../render/benchpanel.js';
import { pauseCardAt } from '../render/pausecard.js';
import { settingsCardAt } from '../render/settingscard.js';
import { waysAt } from '../render/ways.js';
import { chestAt } from '../render/chestpanel.js';
import { CHEST_BAG, CHEST_TAKE, CHEST_STORE, chestWords, moveChest, stashAt, chestsNear } from '../core/chest.js';
import { tradeAt } from '../render/tradepanel.js';
import { tradeWords, slotWords, priceOf, wares, wareWords, buyWords } from '../core/trade.js';
import { gearWords, GEAR, gearRow, canTakeOff } from '../core/gear.js';
import { view } from '../render/screen.js';

const WORDS = {
  title: 'Gloamdeep. New journey, Journal, How to play, Settings, Profiles or Seed Explorer: press Enter, or tap one.',
  saved: 'Gloamdeep. Continue, New journey, Journal, How to play, Settings, Profiles or Seed Explorer: press Enter, or tap one.',
  sure: `${SURE_HEADING} ${SURE_NOTE} Yes or No.`,
  mode: `${MODE_HEADING}. ${MODE_MENU.map((l) => `${l.text}: ${l.note}`).join(' ')}`,
  ended: `${ENDED_HEADING} Same world or New world.`,
  paused: 'Paused. Resume, Journal, Settings, How to play, or Back to title.',
  play: '',
};
const HISTORY_WORDS = `Version history, ${HISTORY.length} versions, newest first. Up and Down choose one, Enter opens or closes it. Esc or the close button goes back.`;
const SEED_WORDS = 'Seed. Type up to 5 digits, then OK. Random gives a new world each journey. Esc leaves it unchanged.';
const EXPLORE_PAD_WORDS = 'Seed. Type up to 5 digits, then OK to see that seed. Random shows a random one. Esc leaves it unchanged.';
const PAN = 8; // game pixels an arrow key scrolls the map
const STAIRS_REACH = 8; // game pixels from found stairs' centre that a tap still picks them

// `ui`: the spoken line, the buttons, and the dev tools, input and map moves, asked for
// when used (they are made after the screens); `newJourney`, `randomSeed`, `pour(slot)`, `craft(slot)`, `eat(slot)`, `hold(slot)`, `fit(slot)`, `wear(slot)`, `drop(slot)`, `setDown(slot, dir)`,
// `takeDown(x, y)`, `make(item)`, `lookAt(slot)`, `roomTile(px, py)` and `goFullScreen()` from main.js.
export function createScreens(app, ui) {
  const { spoken, lanternButton, pauseButton, mapButton, bagButton, quickSlot, reduceMotion } = ui;
  const version = document.getElementById('version');
  const menuOf = (sc) => (sc === 'title' ? titleMenu(app.saved) : sc === 'paused' ? PAUSE_MENU : sc === 'sure' || sc === 'drop' ? SURE_MENU : sc === 'mode' ? MODE_MENU : sc === 'ended' ? ENDED_MENU
    : sc === 'ways' ? easeMenu(app.state.mode) : sc === 'easier' || sc === 'bed' ? SURE_MENU
    : app.pageFrom === 'paused' ? settingsMenu(app.settings, reduceMotion.matches, app.journeySeed, app.state.mode) : settingsMenu(app.settings, reduceMotion.matches));
  const exploring = () => app.screen === 'explore' || (app.screen === 'seed' && app.padFrom === 'explore');
  const onTitle = () => ['slots', 'name', 'cloak', 'drop', 'title', 'sure', 'mode', 'ended'].includes(app.screen) || exploring() || (!['play', 'paused', 'map', 'bag', 'place', 'bench', 'chest', 'trade', 'bed'].includes(app.screen) && app.pageFrom === 'title');
  const menuTop = () => (onTitle() ? titleTop(menuOf(app.screen).length) : pauseTop(menuOf(app.screen).length, app.screen === 'settings'));
  // § asks (D-400): the ask card's question and note for Start over?, Delete …? and Play …?
  const ASKS = new Set(['sure', 'drop', 'easier', 'bed']); // and the bed's by day (D-488)
  const askOf = (sc) => (sc === 'sure' ? [SURE_HEADING, SURE_NOTE] : sc === 'drop' ? [`Delete ${slotName(app.profiles.slots[app.dropping], app.dropping)}?`, DROP_NOTE] : sc === 'bed' ? [BED_HEADING, BED_NOTE] : [easeHeading(app.easier), EASE_NOTE]);
  const settingsWords = () => `Settings. ${menuOf('settings').slice(0, -1).map((l) => l.text).join('. ')}. Pick one to change it. Version history. Esc or the close button goes back.`;
  function show(next, at = 0) {
    if ((next === 'settings' && !['seed', 'history', 'ways', 'easier'].includes(app.screen)) || next === 'howto' || next === 'journal') app.pageFrom = app.screen;
    const playing = next === 'play';
    if (playing && (onTitle() || app.screen === 'paused')) ui.goFullScreen(); // Play, Continue or Resume: full screen, held either way (D-377, D-505)
    app.screen = next; app.chosen = at;
    lanternButton.hide(!playing); quickSlot.hide(!playing); pauseButton.hide(!playing); ui.dev().hide(!playing);
    mapButton.hide(!playing); bagButton.hide(!playing); // the cards' own crosses close the map and the bag (D-385, D-395)
    version.hidden = !(onTitle() || next === 'paused'); // the version number on the title and the pause menu, not in play (D-407)
    setVersionGap(!version.hidden); // the cards' foot clear of it (D-512)
    app.spokenLine = null;
    spoken.textContent = next === 'settings' ? settingsWords() : next === 'seed' ? (app.padFrom === 'explore' ? EXPLORE_PAD_WORDS : SEED_WORDS)
      : next === 'howto' ? howtoWords(app.page, app.settings) : next === 'bag' ? bagWords() : next === 'history' ? HISTORY_WORDS
      : next === 'journal' ? journalPageWords() : next === 'slots' ? slotsWords() : next === 'name' ? nameWords() : next === 'cloak' ? lookWords()
      : next === 'ways' ? waysWords() : next === 'easier' || next === 'drop' || next === 'bed' ? `${askOf(next).join(' ')} Yes or No.`
      : next === 'title' ? WORDS[app.saved ? 'saved' : 'title'] : next === 'place' ? placeWords() : next === 'bench' ? benchWords() : next === 'chest' ? chestWords(stashAt(app.state, app.bench.x, app.bench.y)) : next === 'trade' ? tradeWords(app.state) : WORDS[next];
  }
  const backTo = (id) => () => show(app.pageFrom, menuOf(app.pageFrom).findIndex((l) => l.id === id));
  const closeSettings = backTo('settings'), closeHowTo = backTo('howto'), closeJournal = backTo('journal');
  // § journal: its tabs (D-270, D-293), on a card (D-391). It opens on Records.
  // Growth opens on Body's heart (D-481).
  const journalPageWords = () => (app.tab === 'growth' ? growthWords(app.state, app.growthPick) : journalWords(inPlay(app.profiles).records, inPlay(app.profiles).played));
  function openJournal() { app.tab = 'records'; app.growthPick = START_PICK; show('journal'); }
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
  function openHowTo() { app.page = 'basics'; show('howto'); } // it opens on Basics (D-507)
  function openPage(id) { app.page = id; spoken.textContent = howtoWords(app.page, app.settings); }
  const flipPage = (back = false) => openPage(nextPage(app.page, back));

  // § version history (D-254): opens with every version closed, on the newest, on a card (D-393)
  const listH = () => historyLayout(view.w, view.h).h; // the card's window, as tall as the screen lets it be
  function openHistory() { app.opened = new Set(); app.rows = historyRows(app.opened, historyLayout(view.w, view.h).bodyW); app.scroll = 0; show('history'); }
  const closeHistory = () => show('settings', menuOf('settings').findIndex((l) => l.id === 'history'));
  const shownRows = () => clampScroll(app.scroll, app.rows.length * ROW_H, listH());
  // The rows wrapped again when the card's width has changed since (the screen turned or resized)
  function fitHistory() {
    const w = historyLayout(view.w, view.h).bodyW;
    if (app.rows.w !== w) { app.rows = historyRows(app.opened, w); app.scroll = shownRows(); }
  }
  // Choose version i, its row scrolled into view
  function pickVersion(i) {
    app.chosen = i;
    const e = HISTORY[i];
    const r = headRow(app.rows, i);
    app.scroll = scrollToShow(app.scroll, r, r, ROW_H, listH(), app.rows.length);
    spoken.textContent = versionWords(e, app.opened.has(e.v));
  }
  // Open or close version i; an opened one shows as much of itself as fits
  function openVersion(i, open = !app.opened.has(HISTORY[i]?.v)) {
    const e = HISTORY[i];
    if (!e || open === app.opened.has(e.v)) return;
    if (open) app.opened.add(e.v); else app.opened.delete(e.v);
    app.rows = historyRows(app.opened, historyLayout(view.w, view.h).bodyW);
    app.scroll = shownRows();
    pickVersion(i);
    if (open) app.scroll = scrollToShow(app.scroll, headRow(app.rows, i), lastRow(app.rows, i), ROW_H, listH(), app.rows.length);
  }
  // Scroll a page down (by > 0) or up; the flame moves to the top version shown if it scrolled away
  function pageHistory(by) {
    fitHistory();
    const h = listH();
    app.scroll = clampScroll(app.scroll + by * (h - ROW_H), app.rows.length * ROW_H, h);
    const top = Math.floor(app.scroll / ROW_H), bottom = Math.floor((app.scroll + h) / ROW_H) - 1;
    const shown = (r) => r >= top && r <= bottom;
    if (!app.rows.some((row, r) => row.i === app.chosen && shown(r))) {
      app.chosen = app.rows[top].i;
      spoken.textContent = versionWords(HISTORY[app.chosen], app.opened.has(HISTORY[app.chosen].v));
    }
  }

  // § slots (D-271, a card D-397): the flame starts on the profile in use; the round cross only once
  // there is a title to go back to
  const slotsBack = () => app.slotsBack && app.profiles.current !== null;
  const linesNow = () => slotLines(app.picking);
  const profileWords = (p, i) => (p ? `${slotName(p, i)}, deepest ${p.records.deepest}, played ${playedText(p.played)}` : 'Empty');
  const slotsWords = () => `${app.picking ? slotsHeading(app.picking) : 'Profiles. Pick one to play.'} ${app.profiles.slots.map(profileWords).join('. ')}. ${linesNow().map((l) => l.text).join('. ')}${slotsBack() ? '. Back' : ''}.`;
  function openSlots(back) { app.picking = null; app.slotsBack = back; show('slots', app.profiles.current ?? 0); }
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
  const { nameWords, openName, closeName, pressName, lookWords, openCloak, closeCloak, moveLookBy, pressLook } = createProfileScreens(app, ui, show); // the profile screens (D-421)
  // After the question: back to the slot screen, the flame on the slot asked about
  function closeDrop(yes) {
    if (yes) ui.dropSlot(app.dropping);
    app.picking = null;
    show('slots', app.dropping);
  }

  // § map: the floor the hero is on, worked out once as it opens; no turn passes
  // (D-205). It turns to other floors seen; the hero stays put (D-206).
  const win = () => mapLayout(view.w, view.h, app.screen === 'explore').win; // the map's window on its card, shorter in the Explorer (D-395)
  const world = () => (app.screen === 'explore' ? explorerWorld(shownSeed(app.seeds)) : app.state); // the world the map shows
  const panMap = (dx, dy) => { app.view = panView(app.view, app.plan, win().w, win().h, dx, dy); };
  const zoomMap = (by, x, y) => { app.view = zoomView(app.view, app.plan, win().w, win().h, by, x - win().x, y - win().y); };
  const turns = () => ({ up: turnFrom(app.floors, app.plan.depth, 'up') !== null, down: turnFrom(app.floors, app.plan.depth, 'down') !== null });
  // The map on floor `depth`, its view from at(plan), and its words for the screen reader
  function mapFloor(depth, at = (p) => fitView(p, win().w, win().h)) {
    const explore = app.screen === 'explore';
    const plan = explore && depth === 0 ? wholeSurface(world()) : floorPlan(world(), explore || ui.dev().revealedMap(), depth);
    app.plan = plan;
    setMap(plan);
    app.view = at(plan);
    const n = roomsFound(plan), own = plan.hero || explore ? '' : ' The hero is on another floor.';
    const area = areaAt(plan.depth), where = `${plan.depth === 0 ? 'the surface' : `depth ${plan.depth}, ${area.area.toLowerCase()}`}. ${n} ${n === 1 ? 'room' : 'rooms'}`;
    spoken.textContent = explore
      ? `Seed Explorer, seed ${shownSeed(app.seeds)}. Map of ${where}. Drag or use the arrows to scroll, pinch or the wheel to zoom. Page Up and Page Down turn a floor. R reseeds, T types a seed, B goes back to the last seed. Esc or the close button returns to the title.`
      : `Map of ${where} found.${own} Drag or use the arrows to scroll, pinch or the wheel to zoom. Page Up and Page Down turn a floor. M or the close button closes it.`;
  }
  function toggleMap() {
    if (app.screen === 'map') { show('play'); return; }
    if (app.screen === 'explore') { closeExplorer(); return; }
    if (app.screen !== 'play') return;
    app.queued = null;
    app.floors = floorsShown(app.state, ui.dev().revealedMap());
    show('map');
    mapFloor(depthOf(app.state.place));
  }
  function turnMap(way) {
    if (app.screen === 'history') { pageHistory(way === 'up' ? -1 : 1); return; }
    if (app.screen !== 'map' && app.screen !== 'explore') return;
    const to = turnFrom(app.floors, app.plan.depth, way);
    if (to !== null) mapFloor(to); // the surface is 0, a floor too (D-395)
  }
  // A tap on found stairs turns the map to the floor they lead to, centred on the matching stairs
  function tapStairs(px, py) {
    const k = app.view.k, near = stairsNear(app.plan, (px - win().x + app.view.x) / k, (py - win().y + app.view.y) / k, STAIRS_REACH / k, world().seed);
    if (!near || !app.floors.includes(near.depth)) return;
    mapFloor(near.depth, (p) => {
      const at = stairsIn(p, near.room, near.arrive);
      return at ? centreView(p, win().w, win().h, k, at.x, at.y) : fitView(p, win().w, win().h);
    });
  }

  // § bag (D-247): opens on the first slot; no turn passes until a flask is poured
  const slotWords = (i) => { const s = app.state.bag[i]; return s ? `${get(s.id).name}, ${s.n}` : 'Empty'; };
  const bagWords = () => `Bag. ${gearWords(app.state)}. ${app.state.bag.length ? app.state.bag.map((s, i) => slotWords(i)).join('. ') : 'Empty'}. The arrows choose, Up from the top row reaches the gear, Up again ${canStore() ? 'Store, for the chests nearby, Left of it Sort' : 'Sort'}, Enter pours, makes, eats, drinks, holds, fits, wears or takes off, C makes, I or Esc closes.`;
  function toggleBag() {
    if (app.screen === 'bag' || app.screen === 'place') show('play');
    else if (app.screen === 'play') { app.queued = null; show('bag'); }
  }
  function pickSlot(i) { app.chosen = i; spoken.textContent = slotWords(i); ui.lookAt(i); } // choosing says an item's look line (D-297)
  // § gear choice: gear slot g chosen is app.chosen -1 - g; its words and Look line, and Take
  // off, the Weapon's or the Tool's piece back in the bag, free, the slot kept chosen (D-554)
  const gearSlotWords = (g) => { const id = gearRow(app.state)[g]; return `${GEAR[g].name}: ${id ? get(id).name : 'empty'}${canTakeOff(app.state, g) ? '. Enter takes it off' : ''}`; };
  function pickGear(g) { app.chosen = -1 - g; spoken.textContent = gearSlotWords(g); ui.lookGear(g); }
  function takeOffChosen() {
    const g = gearChosen(app.chosen);
    if (!canTakeOff(app.state, g)) return;
    ui.takeOff(g);
    spoken.textContent = gearSlotWords(g);
  }
  // The arrows on the bag: Up from its top row onto the gear row, Left and Right along it,
  // Down back to the bag's top row (D-554)
  // Up from the gear row reaches the bag's STORE when it shows, else its SORT; Left and Right
  // go between them; Down from either the gear row's right end, under them (D-558, D-559)
  const canStore = () => chestsNear(app.state).length > 0;
  function pickStore() { app.chosen = BAG_STORE; spoken.textContent = 'Store, in the chests nearby'; }
  function storeNear() { ui.storeNear(); spoken.textContent = 'Store, in the chests nearby'; }
  function pickSort() { app.chosen = BAG_SORT; spoken.textContent = 'Sort the bag'; }
  function sortBag() { ui.sortBag(); spoken.textContent = `Sorted. ${app.state.bag.map((s, i) => slotWords(i)).join('. ') || 'Empty'}`; }
  function moveBag(dir) {
    const g = gearChosen(app.chosen), c = cols();
    if (app.chosen === BAG_STORE) { if (dir === 'down') pickGear(GEAR.length - 1); else if (dir === 'left') pickSort(); return; }
    if (app.chosen === BAG_SORT) { if (dir === 'down') pickGear(GEAR.length - 1); else if (dir === 'right' && canStore()) pickStore(); return; }
    if (g >= 0) {
      if (dir === 'down') pickSlot(Math.min(g, c - 1, bagSize(app.state) - 1));
      else if (dir === 'up') { if (canStore()) pickStore(); else pickSort(); }
      else pickGear(Math.min(GEAR.length - 1, Math.max(0, g + (dir === 'left' ? -1 : 1))));
      return;
    }
    if (dir === 'up' && app.chosen < c) { pickGear(Math.min(app.chosen, GEAR.length - 1)); return; }
    pickSlot(Math.min(bagSize(app.state) - 1, Math.max(0, app.chosen + { left: -1, right: 1, up: -c, down: c }[dir])));
  }
  // Enter, Space or the button: pours a flask, makes one from oilcaps (D-299),
  // or eats a heartcap or drinks a potion, the bag staying open on what is left (D-308, D-309).
  // `make`: C or the Make beside Eat, which makes a potion from heartcaps (D-309)
  // § drop: the chosen stack set down at the hero's feet, free, the bag kept open (D-546)
  function dropChosen() {
    if (!app.state.bag[app.chosen]) return;
    ui.drop(app.chosen);
    if (!app.state.bag[app.chosen]) app.chosen = Math.max(0, app.state.bag.length - 1);
    spoken.textContent = slotWords(app.chosen);
  }
  function useChosen(make = false) {
    if (app.chosen === BAG_STORE) { if (!make) storeNear(); return; }
    if (app.chosen === BAG_SORT) { if (!make) sortBag(); return; }
    if (gearChosen(app.chosen) >= 0) { if (!make) takeOffChosen(); return; }
    const s = app.state.bag[app.chosen], entry = s && get(s.id);
    if (make && !entry?.craft) return;
    if (entry?.oil) { show('play'); ui.pour(app.chosen); return; }
    if (entry?.sets && !make) { startSetting(); return; }
    if ((entry?.hold || entry?.tool) && !make) { // a weapon into the hand or a tool into its slot, the one there into the bag slot, the bag kept open (D-479, D-552)
      ui.hold(app.chosen);
      if (app.fall) show('play'); else spoken.textContent = slotWords(app.chosen);
      return;
    }
    if ((entry?.part || entry?.wear) && !make) { // a lantern part into its slot, or armour put on, free, the bag kept open (D-483, D-484)
      if (entry.part) ui.fit(app.chosen); else ui.wear(app.chosen);
      if (!app.state.bag[app.chosen]) app.chosen = Math.max(0, app.state.bag.length - 1);
      spoken.textContent = slotWords(app.chosen);
      return;
    }
    if (entry?.eats && !make) {
      ui.eat(app.chosen);
      if (app.fall) { show('play'); return; } // a bite in that turn felled the hero
      if (!app.state.bag[app.chosen]) app.chosen = Math.max(0, app.state.bag.length - 1); // the last one eaten
      spoken.textContent = slotWords(app.chosen);
      return;
    }
    if (!entry?.craft || !canCraft(app.state.bag, app.chosen)) return; // dim: nothing happens
    const turn = app.state.turn;
    ui.craft(app.chosen);
    if (app.fall) { show('play'); return; } // a bite in that turn felled the hero
    if (app.state.turn === turn) return; // no room for the flask: its line, and the oilcaps stay
    app.chosen = app.state.bag.findIndex((o) => o.id === entry.craft.into);
    spoken.textContent = slotWords(app.chosen);
  }

  // § set down (WB2, D-322): the bag closes and the sides the workbench can go on are
  // marked (`app.setting.sides`); off the surface, or with no side free, its line, free,
  // and the bag stays open. A side not marked says "There is no room there.", free.
  const placeWords = () => { const s = app.setting.sides.map((d) => d[0].toUpperCase() + d.slice(1)); return `Set down the ${get(app.state.bag[app.setting.slot].id).name.toLowerCase()}: ${s.length > 1 ? `${s.slice(0, -1).join(', ')} or ${s.at(-1)}` : s[0]}. Press an arrow, swipe, or tap a marked tile. Esc keeps it in the bag.`; };
  function startSetting() {
    const sides = setSides(app.state, app.chosen);
    if (!sides.length) { ui.setDown(app.chosen, null); return; }
    app.setting = { slot: app.chosen, sides };
    show('place');
  }
  function setToward(dir) {
    const turn = app.state.turn;
    ui.setDown(app.setting.slot, dir);
    if (app.state.turn !== turn || app.fall) show('play');
  }
  // A tap or click on a marked tile sets it there; anywhere else leaves it in the bag
  function tapSide(px, py) {
    const h = app.state.hero, [tx, ty] = ui.roomTile(px, py);
    const dir = app.setting.sides.find((d) => h.x + DIRS[d][0] === tx && h.y + DIRS[d][1] === ty);
    if (dir) setToward(dir); else show('play');
  }

  // § bench panel (WB3, D-323): `app.bench` is the bench's tile. Deconstruct closes the
  // panel whatever happens, so its line shows, taken down or not; the chest's too (CH5). A stash chest's tile
  // opens the chest's panel instead, on its first slot (CH3, D-330).
  // The bed's by day is an ask, No picked (D-488).
  function openPanel(at) { const panel = tileAt(app.state.room, at.x, at.y).panel; app.queued = null; app.bench = at; show(panel, panel === 'bed' ? SURE_MENU.findIndex((l) => l.id === 'no') : 0); }
  function takeDownBench() { show('play'); ui.takeDown(app.bench.x, app.bench.y); }
  // Its lines for a screen reader: each thing made at it with its cost (CH1, D-326)
  // § chest panel (CH4, D-331): the frame on a slot says what is in it; picking one moves its stack
  const chestSlotWords = (i) => {
    if (i === CHEST_TAKE) return 'Deconstruct chest';
    if (i === CHEST_STORE) return 'Store matching';
    const out = i < CHEST_BAG, s = out ? stashAt(app.state, app.bench.x, app.bench.y)[i] : app.state.bag[i - CHEST_BAG];
    return `${out ? 'Chest' : 'Bag'}: ${s ? `${get(s.id).name}, ${s.n}` : 'empty'}`;
  };
  function pickChest(i) { app.chosen = i; spoken.textContent = chestSlotWords(i); }
  // § trade card (D-494): it opens on the first thing he buys; the frame on a slot says it and its price
  function openTrade() { app.queued = null; app.tab = 'sell'; show('trade', Math.max(0, app.state.bag.findIndex((s) => priceOf(s.id)))); }
  const tradeCount = () => (app.tab === 'buy' ? wares().length : bagSize(app.state));
  const cols = () => bagCols(bagSize(app.state)); // the bag's grid, 3 wide, 4 for 12 (D-548)
  function pickTrade(i) {
    app.chosen = i;
    spoken.textContent = i < 0 ? `Tabs, ${app.tab === 'buy' ? 'Buy' : 'Sell'} open` : app.tab === 'buy' ? wareWords(app.state, i) : slotWords(app.state, i);
  }
  // § trade tabs (D-495): turning one keeps the frame on the tabs, else picks the first slot
  function turnTrade(id, onTabs = app.chosen < 0) {
    if (id !== app.tab) { app.tab = id; spoken.textContent = id === 'buy' ? buyWords(app.state) : tradeWords(app.state); }
    app.chosen = onTabs ? -1 : 0;
  }
  function tradeChosen() {
    if (app.chosen < 0) { turnTrade(app.tab === 'buy' ? 'sell' : 'buy'); return; }
    if (app.tab === 'buy') { ui.buy(app.chosen); pickTrade(app.chosen); return; }
    ui.sell(app.chosen); pickTrade(Math.min(app.chosen, Math.max(0, app.state.bag.length - 1)));
  }
  function moveTrade(dir) {
    if (app.chosen < 0) { if (dir === 'down') pickTrade(0); else if (dir !== 'up') turnTrade(dir === 'left' ? 'sell' : 'buy'); return; }
    if (dir === 'up' && app.chosen < cols()) { pickTrade(-1); return; } // the grid's top row: onto the tabs
    const to = app.chosen + { left: -1, right: 1, up: -cols(), down: cols() }[dir];
    pickTrade(to >= 0 && to < tradeCount() ? to : app.chosen); // the bag's grid, his wares fewer
  }
  const costWords = (m) => `${get(m.item).name}, ${m.cost.map((c) => `${c.n} ${get(c.id).name}, ${c.have} carried`).join(' and ')}${m.dim ? ', too few' : ''}`;
  const benchWords = () => `Workbench. ${benchMakes(app.state.bag, bagSize(app.state)).map((m) => `${costWords(m)}. `).join('')}Make, Deconstruct workbench, or Close.`;
  // § bench card (D-387): the frame on a slot says what is made there and its cost
  function pickBench(i) {
    app.chosen = i;
    const m = benchMakes(app.state.bag, bagSize(app.state))[i];
    spoken.textContent = i === BENCH_TAKE ? 'Deconstruct workbench' : m ? costWords(m) : 'Empty';
  }

  const titleAt = (id) => show('title', menuOf('title').findIndex((l) => l.id === id));
  const { openExplorer, closeExplorer, showSeeds, pressBar, waysWords, openWays, closeWays, pickWay, closeEasier, openPad, closePad,
    pressKey } = createWorldScreens(app, ui, show, mapFloor, menuOf, titleAt); // the world screens (D-468)
  function pause() {
    if (app.screen === 'map' || app.screen === 'bag' || app.screen === 'place' || app.screen === 'bench' || app.screen === 'chest' || app.screen === 'trade' || app.screen === 'bed') show('play');
    else if (app.screen === 'explore') closeExplorer();
    else if (app.screen === 'play') { app.queued = null; show('paused'); } // a step waiting in line is dropped
    else if (app.screen === 'paused') show('play'); // Esc or P again resumes
    else if (app.screen === 'settings') closeSettings();
    else if (app.screen === 'ways') closeWays();
    else if (app.screen === 'easier') closeEasier(false);
    else if (app.screen === 'seed') closePad();
    else if (app.screen === 'howto') closeHowTo();
    else if (app.screen === 'history') closeHistory();
    else if (app.screen === 'journal') closeJournal();
    else if (app.screen === 'sure' || app.screen === 'mode') titleAt('new');
    else if (app.screen === 'ended') titleAt('continue'); // the world begun again is saved, for Continue (D-344)
    else if (app.screen === 'drop') closeDrop(false);
    else if (app.screen === 'name') closeName();
    else if (app.screen === 'cloak') closeCloak();
    else if (app.screen === 'slots' && app.picking) { app.picking = null; spoken.textContent = slotsWords(); } // Cancel
    else if (app.screen === 'slots' && slotsBack()) titleAt('profiles');
  }
  function change(key, next, words) {
    app.settings = { ...app.settings, [key]: next };
    saveSettings(app.settings);
    spoken.textContent = words;
  }
  const changeSwipe = () => { const o = nextOnOff(app.settings.swipe); change('swipe', o, swipeText(o)); };
  const changeTap = (back = false) => { const o = nextTap(app.settings.tap, back); change('tap', o, tapText(o)); };
  const changePad = () => { const o = nextOnOff(app.settings.pad); change('pad', o, padText(o)); };
  const changeStop = () => { const o = nextStop(app.settings.stop); change('stop', o, stopText(o)); };
  const changeMotion = () => { const m = nextMotion(app.settings.motion, reduceMotion.matches); change('motion', m, motionText(m, reduceMotion.matches)); };
  const changeLantern = () => { const l = nextLantern(app.settings.lantern); change('lantern', l, lanternText(l)); };
  const changeFlasks = () => { const f = nextFlasks(app.settings.flasks); change('flasks', f, flasksText(f)); };
  const changeSound = () => { const o = nextSound(app.settings.sound); change('sound', o, soundText(o)); };
  const changeStats = () => { const o = nextOnOff(app.settings.stats); change('stats', o, statsText(o)); };

  // Digits and Backspace type on the seed pad from a keyboard; the flame moves to OK, so Enter keeps it
  // In the Explorer, R reseeds, T types a seed and B goes back (D-214); in the bag, C makes (D-309)
  const onType = (key) => {
    if (app.screen === 'bag' && key === 'c') { useChosen(true); return true; }
    if (app.screen === 'bag' && key === 'x') { dropChosen(); return true; } // X drops (D-546)
    if (app.screen === 'explore') {
      const id = { r: 'reseed', t: 'type', b: 'back' }[key];
      if (id) pressBar(id);
      return !!id;
    }
    if (app.screen === 'name') {
      if (key !== 'backspace' && !/^[a-z]$/.test(key)) return false;
      pressName(key === 'backspace' ? 'del' : key);
      app.chosen = NAME_PAD.findIndex((k) => k.id === 'ok');
      return true;
    }
    if (app.screen !== 'seed' || !/^[0-9]$|^backspace$/.test(key)) return false;
    pressKey(key === 'backspace' ? 'del' : key);
    app.chosen = PAD.findIndex((k) => k.id === 'ok');
    return true;
  };

  // § choosing: a menu line picked; New journey starts in a new world (D-187), asking first
  // while one is saved; Continue and Back to title keep the journey (D-238)
  function choose(i = app.chosen) {
    if (app.screen === 'place') return; // Enter and Space don't pick a side
    const id = menuOf(app.screen)[i]?.id;
    if (app.screen === 'seed') { pressKey(PAD[i].id); return; }
    if (app.screen === 'name') { pressName(NAME_PAD[i].id); return; }
    if (app.screen === 'cloak') { pressLook(i); return; }
    if (app.screen === 'bag') { useChosen(); return; }
    if (app.screen === 'howto') { flipPage(); return; } // Enter turns to the next tab
    if (app.screen === 'history') { fitHistory(); openVersion(i); return; }
    if (app.screen === 'journal') { if (app.tab === 'growth') buyPicked(); else turnTab('growth'); return; } // Enter turns to Growth, and there buys the picked upgrade
    if (app.screen === 'slots') { chooseSlot(i); return; }
    if (app.screen === 'drop') { closeDrop(id === 'yes'); return; }
    if (app.screen === 'mode') { ui.newJourney(id); show('play'); return; }
    if (app.screen === 'ways') { pickWay(id); return; }
    if (app.screen === 'easier') { closeEasier(id === 'yes'); return; }
    if (app.screen === 'ended') { ui.beginAgain(id === 'other'); show('play'); return; }
    if (app.screen === 'bed') { if (id === 'yes') takeDownBench(); else show('play'); return; }
    if (app.screen === 'trade') { tradeChosen(); return; }
    if (app.screen === 'chest') { if (i === CHEST_TAKE) takeDownBench(); else if (i === CHEST_STORE) ui.store(app.bench.x, app.bench.y); else { ui.stash(app.bench.x, app.bench.y, i); pickChest(i); } return; }
    if (app.screen === 'bench') { const m = benchMakes(app.state.bag, bagSize(app.state))[i]; if (i === BENCH_TAKE) takeDownBench(); else if (m) ui.make(m.item); return; }
    if (id === 'profiles') openSlots(true);
    else if (id === 'new' && app.saved) show('sure', SURE_MENU.findIndex((l) => l.id === 'no'));
    else if (id === 'new' || id === 'yes') show('mode', MODE_FIRST); // the way to play asked first (D-334)
    else if (id === 'no') titleAt('new');
    else if (id === 'resume' || id === 'continue') show('play');
    else if (id === 'title') show('title');
    else if (id === 'settings') show('settings');
    else if (id === 'journal') openJournal();
    else if (id === 'howto') openHowTo();
    else if (id === 'explore') openExplorer();
    else if (id === 'swipe') changeSwipe();
    else if (id === 'tap') changeTap();
    else if (id === 'pad') changePad();
    else if (id === 'stop') changeStop();
    else if (id === 'motion') changeMotion();
    else if (id === 'seed') openPad();
    else if (id === 'mode') openWays();
    else if (id === 'lantern') changeLantern();
    else if (id === 'flasks') changeFlasks();
    else if (id === 'sound') changeSound();
    else if (id === 'stats') changeStats();
    else if (id === 'history') openHistory();
  }
  // Arrows and swipes off the room: menus take swipes always (D-189)
  const onDir = (dir, how) => {
    if (app.screen === 'map' || app.screen === 'explore') { if (how !== 'swipe') panMap(...{ up: [0, -PAN], down: [0, PAN], left: [-PAN, 0], right: [PAN, 0] }[dir]); return; }
    if (app.screen === 'seed') { app.chosen = moveKey(app.chosen, dir); return; }
    if (app.screen === 'name') { app.chosen = moveName(app.chosen, dir); return; }
    if (app.screen === 'cloak') { moveLookBy(dir); return; }
    if (app.screen === 'place') { setToward(dir); return; }
    if (app.screen === 'chest') { pickChest(moveChest(app.chosen, dir, bagSize(app.state))); return; }
    if (app.screen === 'trade') { moveTrade(dir); return; } // the grid, the tabs above it (D-495)
    if (app.screen === 'bench') { pickBench(moveBench(app.chosen, dir)); return; } // the bag's grid, Deconstruct under it (D-387)
    if (app.screen === 'bag') { moveBag(dir); return; } // a 3 × 2 grid (D-385), bigger with the Pouch (D-548), the gear row above it (D-554)
    if (app.screen === 'howto') { if (dir === 'left' || dir === 'right') flipPage(dir === 'left'); return; } // the tabs (D-390)
    if (app.screen === 'journal') { if (app.tab === 'growth') pickGrowth(movePick(app.growthPick, dir)); else if (dir === 'right') turnTab('growth'); return; } // the tabs (D-391), on Growth its tree (D-481)
    if (ASKS.has(app.screen)) { app.chosen = moveChoice(app.chosen, { left: 'up', right: 'down' }[dir] ?? dir, SURE_MENU.length); return; } // YES and NO side by side (D-400)
    if (app.screen === 'slots') { app.chosen = moveSlots(app.chosen, dir); return; } // the boxes, then the buttons' row (D-397)
    if (app.screen === 'history') {
      fitHistory();
      if (dir === 'left' || dir === 'right') openVersion(app.chosen, dir === 'right');
      else if (how === 'swipe') pageHistory(dir === 'up' ? 1 : -1); // the list follows the finger
      else pickVersion(moveChoice(app.chosen, dir, HISTORY.length));
      return;
    }
    const id = menuOf(app.screen)[app.chosen]?.id;
    if (id === 'swipe' && (dir === 'left' || dir === 'right')) changeSwipe();
    else if (id === 'tap' && (dir === 'left' || dir === 'right')) changeTap(dir === 'left');
    else if (id === 'pad' && (dir === 'left' || dir === 'right')) changePad();
    else if (id === 'stop' && (dir === 'left' || dir === 'right')) changeStop();
    else if (id === 'motion' && (dir === 'left' || dir === 'right')) changeMotion();
    else if (id === 'lantern' && (dir === 'left' || dir === 'right')) changeLantern();
    else if (id === 'flasks' && (dir === 'left' || dir === 'right')) changeFlasks();
    else if (id === 'sound' && (dir === 'left' || dir === 'right')) changeSound();
    else if (id === 'stats' && (dir === 'left' || dir === 'right')) changeStats();
    else app.chosen = moveChoice(app.chosen, dir, menuOf(app.screen).length);
  };
  // A tap or click off the room
  const onPoint = (px, py, held) => {
    if (app.screen === 'map' || app.screen === 'explore') {
      if (held || ui.mapMoves().dragged()) return;
      const at = mapCardAt(px, py, view.w, view.h, app.screen === 'explore');
      if (at === 'up' || at === 'down') turnMap(at);
      else if (at === 'out' || at === 'close') pause(); // closes the map, or the Explorer to the title
      else if (at) pressBar(at);
      else if (py < win().y + win().h) tapStairs(px, py); // not through the Explorer's row
      return;
    }
    if (app.screen === 'place') { if (!held) tapSide(px, py); return; }
    if (app.screen === 'bench') {
      if (held) return;
      const at = benchAt(px, py, view.w, view.h);
      if (at === 'out' || at === 'close') show('play');
      else if (at === 'make' && app.chosen !== BENCH_TAKE) choose(app.chosen); // Make shows only for a slot
      else if (at === 'take') { app.chosen = BENCH_TAKE; choose(BENCH_TAKE); }
      else if (at) pickBench(at.slot);
      return;
    }
    if (app.screen === 'trade') {
      if (held) return;
      const at = tradeAt(px, py, view.w, view.h, app.tab, bagSize(app.state));
      if (at === 'out' || at === 'close') show('play');
      else if (at === 'act') { if (app.chosen >= 0) tradeChosen(); }
      else if (at?.tab) turnTrade(at.tab, false);
      else if (at) pickTrade(at.slot);
      return;
    }
    if (app.screen === 'chest') {
      if (held) return;
      const at = chestAt(px, py, view.w, view.h, bagSize(app.state));
      if (at === 'out' || at === 'close') show('play');
      else if (at === 'take') { app.chosen = CHEST_TAKE; choose(CHEST_TAKE); }
      else if (at === 'store') { pickChest(CHEST_STORE); choose(CHEST_STORE); }
      else if (at) choose(at.slot);
      return;
    }
    if (app.screen === 'paused') {
      if (held) return;
      const at = pauseCardAt(px, py, view.w, view.h, PAUSE_MENU.length);
      if (at === 'out' || at === 'close') show('play'); // the round cross resumes (D-388)
      else if (at) { app.chosen = at.line; choose(at.line); }
      return;
    }
    if (app.screen === 'settings') {
      if (held) return;
      const at = settingsCardAt(px, py, view.w, view.h, menuOf('settings'));
      if (at === 'out' || at === 'close') closeSettings(); // the round cross goes back (D-389)
      else if (at === 'history') { app.chosen = menuOf('settings').length - 1; openHistory(); }
      else if (at) { app.chosen = at.line; choose(at.line); }
      return;
    }
    if (app.screen === 'mode' || app.screen === 'ways') {
      if (held) return;
      const at = waysAt(px, py, view.w, view.h, menuOf(app.screen));
      if (at === 'out' || at === 'close') pause(); // the round cross goes back (D-396)
      else if (at) { app.chosen = at.line; choose(at.line); }
      return;
    }
    if (app.screen === 'howto') {
      if (held) return;
      const at = howtoAt(px, py, view.w, view.h);
      if (at === 'out' || at === 'close') closeHowTo(); // the round cross goes back (D-390)
      else if (at) openPage(at.page);
      return;
    }
    if (app.screen === 'bag') {
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
      return;
    }
    if (app.screen === 'seed') {
      if (held) return;
      const at = seedCardAt(px, py, view.w, view.h);
      if (at === 'out' || at === 'close') closePad(); // the round cross goes back (D-394)
      else if (at) { app.chosen = at.key; choose(at.key); }
      return;
    }
    if (app.screen === 'name') {
      if (held) return;
      const at = nameCardAt(px, py, view.w, view.h);
      if (at === 'out' || at === 'close') closeName(); // the round cross goes back (D-398)
      else if (at) { app.chosen = at.key; choose(at.key); }
      return;
    }
    if (app.screen === 'cloak') {
      if (held) return;
      const at = lookCardAt(px, py, view.w, view.h, app.lookTab);
      if (at === 'out' || at === 'close') closeCloak(); // the round cross goes back, as Back did (D-399)
      else if (at) pressLook(at.key, true);
      return;
    }
    if (app.screen === 'history') {
      if (held) return;
      fitHistory();
      const at = historyAt(px, py, view.w, view.h, app.scroll, app.rows.length);
      if (at === 'out' || at === 'close') closeHistory(); // the round cross goes back (D-393)
      else if (at && app.rows[at.row].kind === 'head') openVersion(app.rows[at.row].i);
      else if (at) pickVersion(app.rows[at.row].i);
      return;
    }
    if (app.screen === 'journal') {
      if (held) return;
      const at = journalAt(px, py, view.w, view.h, app.tab, app.state, app.growthPick);
      if (at === 'out' || at === 'close') closeJournal(); // the round cross goes back (D-391)
      else if (at === 'buy') buyPicked();
      else if (at?.pick) pickGrowth(at.pick);
      else if (at) turnTab(at.tab);
      return;
    }
    if (ASKS.has(app.screen)) {
      if (held) return;
      const at = askCardAt(px, py, view.w, view.h, ...askOf(app.screen));
      if (at === 'out' || at === 'close') pause(); // the round cross means No (D-400)
      else if (at) { app.chosen = at.line; choose(at.line); }
      return;
    }
    if (app.screen === 'slots') {
      if (held) return;
      const at = slotsAt(px, py, view.w, view.h, linesNow(), slotsBack());
      if (at === 'close' || (at === 'out' && slotsBack())) titleAt('profiles'); // the round cross goes back (D-397)
      else if (at !== null && at !== 'out') { const i = typeof at === 'number' ? at : SLOTS + linesNow().findIndex((l) => l.id === at); app.chosen = i; chooseSlot(i); }
      return;
    }
    const i = app.screen === 'title' ? titleCardAt(px, py, view.w, view.h, menuOf('title'), chip()) // the title's buttons (D-401)
      : lineAt(py, menuOf(app.screen).length, menuTop());
    if (i >= 0) { app.chosen = i; choose(i); }
  };
  // § chip: the profile in play on the title, its name and deepest depth (D-401)
  const chip = () => chipOf(slotName(inPlay(app.profiles), app.profiles.current), inPlay(app.profiles).records.deepest);
  const onMapScreen = () => app.screen === 'map' || app.screen === 'explore';

  // § journey ends: a Hardcore fall's page, Same world picked (MO2, D-344)
  const endJourney = () => show('ended');
  return { show, endJourney, openSlots, slotsBack, openPanel, openTrade, pause, toggleMap, toggleBag, turnMap, panMap, zoomMap, onType, choose, onDir, onPoint, onMapScreen, onTitle, menuOf, askOf, turns, chip };
}
