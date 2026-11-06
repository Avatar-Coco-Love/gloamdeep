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
import { pauseTop } from '../render/menu.js';
import { titleTop } from '../render/title.js';
import { chipOf } from '../render/titlecard.js';
import { historyRows, historyLayout } from '../render/history.js';
import { HISTORY } from '../core/history.js';
import { howtoWords } from '../core/howto.js';
import { createProfileScreens } from './profilescreens.js';
import { createWorldScreens } from './explorerscreens.js';
import { createCardScreens } from './cardscreens.js';
import { makeCards } from './cards/table.js';
import { titleMenu, PAUSE_MENU, SURE_MENU, SURE_NOTE, SURE_HEADING, TAKE_ASKS, gardenMenu, DROP_NOTE, MODE_MENU, MODE_HEADING, easeMenu, easeHeading, EASE_NOTE, ENDED_MENU, ENDED_HEADING, settingsMenu } from '../core/menu.js';
import { floorPlan, wholeSurface, roomsFound, fitView, panView, zoomView, floorsShown, turnFrom, stairsNear, stairsIn, centreView } from '../core/map.js';
import { setMap, mapLayout, mapCardAt } from '../render/map.js';
import { shownSeed, explorerWorld } from '../core/explorer.js';
import { canPlant, canPick, canFeed } from '../core/turn.js';
import { playing as inPlay, slotName, playedText } from '../core/profile.js';
import { slotLines, slotsHeading } from '../render/slots.js';
import { journalWords, growthWords } from '../core/journal.js';
import { START_PICK } from '../core/growth.js';
import { setVersionGap } from '../render/bag.js';
import { chestWords, stashAt } from '../core/chest.js';
import { tradeWords } from '../core/trade.js';
import { stonesOf, stoneName, stoneNote } from '../core/travel.js';
import { offer, boonRow } from '../core/boon.js';
import { view } from '../render/screen.js';
import { waysScrollTo } from '../render/ways.js';

const WORDS = {
  title: 'Gloamdeep. New journey, Journal, How to play, Settings, Profiles or Seed Explorer: press Enter, or tap one.',
  saved: 'Gloamdeep. Continue, New journey, Journal, How to play, Settings, Profiles or Seed Explorer: press Enter, or tap one.',
  sure: `${SURE_HEADING} ${SURE_NOTE} Yes or No.`,
  mode: `${MODE_HEADING}. ${MODE_MENU.map((l) => `${l.text}: ${l.note}`).join(' ')}`,
  ended: `${ENDED_HEADING} Same world or New world.`,
  paused: 'Paused. Resume, Journal, Settings, How to play, or Back to title.',
  strike: 'Strike! A needle sweeps across the bar. Press Enter or Space, or tap, when it is in the light.',
  play: '',
};
const HISTORY_WORDS = `Version history, ${HISTORY.length} versions, newest first. Up and Down choose one, Enter opens or closes it. Esc or the close button goes back.`;
const SEED_WORDS = 'Seed. Type up to 5 digits, then OK. Random gives a new world each journey. Esc leaves it unchanged.';
const EXPLORE_PAD_WORDS = 'Seed. Type up to 5 digits, then OK to see that seed. Random shows a random one. Esc leaves it unchanged.';
const STAIRS_REACH = 8; // game pixels from found stairs' centre that a tap still picks them

// `ui`: the spoken line, the buttons, and the dev tools, input and map moves, asked for
// when used (they are made after the screens); `newJourney`, `randomSeed`, `pour(slot)`, `craft(slot)`, `eat(slot)`, `hold(slot)`, `fit(slot)`, `wear(slot)`, `drop(slot)`, `setDown(slot, dir)`,
// `takeDown(x, y)`, `plant(x, y)`, `pick(x, y)`, `feed(x, y)`, `make(item)`, `lookAt(slot)`, `roomTile(px, py)` and `goFullScreen()` from main.js.
export function createScreens(app, ui) {
  const { spoken, lanternButton, pauseButton, mapButton, bagButton, quickSlot, reduceMotion } = ui;
  const version = document.getElementById('version');
  const menuOf = (sc) => (sc === 'title' ? titleMenu(app.saved) : sc === 'paused' ? PAUSE_MENU : sc === 'sure' || sc === 'drop' ? SURE_MENU : sc === 'mode' ? MODE_MENU : sc === 'ended' ? ENDED_MENU
    : sc === 'ways' ? easeMenu(app.state.mode) : sc === 'easier' ? SURE_MENU : sc === 'bed' ? bedMenu() : sc === 'travel' ? travelMenu() : sc === 'boons' ? boonsMenu()
    : app.pageFrom === 'paused' ? settingsMenu(app.settings, reduceMotion.matches, app.journeySeed, app.state.mode) : settingsMenu(app.settings, reduceMotion.matches));
  const exploring = () => app.screen === 'explore' || (app.screen === 'seed' && app.padFrom === 'explore');
  const onTitle = () => ['slots', 'name', 'cloak', 'drop', 'title', 'sure', 'mode', 'ended'].includes(app.screen) || exploring() || (!['play', 'paused', 'map', 'bag', 'place', 'bench', 'chest', 'trade', 'bed', 'travel', 'boons', 'strike'].includes(app.screen) && app.pageFrom === 'title');
  const menuTop = () => (onTitle() ? titleTop(menuOf(app.screen).length) : pauseTop(menuOf(app.screen).length, app.screen === 'settings'));
  // § asks (D-400): the ask card's question and note for Start over?, Delete …? and Play …?
  // The garden bed's card shows Plant and Deconstruct, Plant dim when it can't be planted (D-566),
  // and grown, Pick in Plant's place (D-568)
  const bedMenu = () => { const { x, y } = app.bench, tile = tileAt(app.state.room, x, y); return tile.garden ? gardenMenu(canPlant(app.state, x, y), canPick(app.state, x, y), tile.feeds || tile.fed ? canFeed(app.state, x, y) : undefined) : SURE_MENU; }; // a sprout's Feed (D-569)
  // § the travel card (D-593): a row for each waystone, dim when not woken or stood on
  const travelMenu = () => stonesOf(app.state).map((s) => ({ id: s.place, text: stoneName(s), note: stoneNote(s), dim: !s.woken || s.here }));
  const travelWords = () => `Waystones. ${travelMenu().map((l) => `${l.text}: ${l.note}`).join(' ')} Pick one to go there. Esc or the close button goes back.`;
  function openTravel() { // on the first woken stone not stood on, scrolled into view (D-594)
    app.queued = null;
    const at = Math.max(0, travelMenu().findIndex((l) => !l.dim));
    show('travel', at); app.scroll = waysScrollTo(0, at, view.w, view.h, travelMenu());
  }
  // § the boon card (D-596): the home plate's 3 boons, one row each, drawn as the card opens
  const boonsMenu = () => (app.offer || []).map(boonRow);
  const boonsWords = () => `Pick a boon. ${boonsMenu().map((l) => `${l.text}: ${l.note}`).join(' ')} It lasts until you are home again. Esc or the close button goes on without one.`;
  // § the strike card (D-614): opened on the pull, its clock started
  function openStrike() { app.queued = null; app.strike = { start: performance.now() }; show('strike'); }
  function openBoons() { app.queued = null; app.offer = offer(app.state); show('boons', 0); app.scroll = 0; }
  const askWords = (sc) => `${askOf(sc).join(' ')} ${menuOf(sc).filter((l) => !l.dim).map((l) => l.text).join(' or ')}.`; // Yes or No., or the garden bed's
  const askOf = (sc) => (sc === 'sure' ? [SURE_HEADING, SURE_NOTE] : sc === 'drop' ? [`Delete ${slotName(app.profiles.slots[app.dropping], app.dropping)}?`, DROP_NOTE] : sc === 'bed' ? TAKE_ASKS[tileAt(app.state.room, app.bench.x, app.bench.y).id] : [easeHeading(app.easier), EASE_NOTE]);
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
      : next === 'ways' ? waysWords() : next === 'easier' || next === 'drop' || next === 'bed' ? askWords(next)
      : next === 'title' ? WORDS[app.saved ? 'saved' : 'title'] : next === 'place' ? placeWords() : next === 'bench' ? benchWords() : next === 'chest' ? chestWords(stashAt(app.state, app.bench.x, app.bench.y)) : next === 'trade' ? tradeWords(app.state) : next === 'travel' ? travelWords() : next === 'boons' ? boonsWords() : WORDS[next];
  }
  const backTo = (id) => () => show(app.pageFrom, menuOf(app.pageFrom).findIndex((l) => l.id === id));
  const closeSettings = backTo('settings'), closeHowTo = backTo('howto'), closeJournal = backTo('journal');
  // § journal: its tabs (D-270, D-293), on a card (D-391). It opens on Records.
  // Growth opens on Body's heart (D-481).
  const journalPageWords = () => (app.tab === 'growth' ? growthWords(app.state, app.growthPick) : journalWords(inPlay(app.profiles).records, inPlay(app.profiles).played));
  function openJournal() { app.tab = 'records'; app.growthPick = START_PICK; show('journal'); }
  function openHowTo() { app.page = 'basics'; show('howto'); } // it opens on Basics (D-507)

  // § version history (D-254): opens with every version closed, on the newest, on a card (D-393)
  function openHistory() { app.opened = new Set(); app.rows = historyRows(app.opened, historyLayout(view.w, view.h).bodyW); app.scroll = 0; show('history'); }
  const closeHistory = () => show('settings', menuOf('settings').findIndex((l) => l.id === 'history'));

  // § slots (D-271, a card D-397): the flame starts on the profile in use; the round cross only once
  // there is a title to go back to
  const slotsBack = () => app.slotsBack && app.profiles.current !== null;
  const linesNow = () => slotLines(app.picking);
  const profileWords = (p, i) => (p ? `${slotName(p, i)}, deepest ${p.records.deepest}, played ${playedText(p.played)}` : 'Empty');
  const slotsWords = () => `${app.picking ? slotsHeading(app.picking) : 'Profiles. Pick one to play.'} ${app.profiles.slots.map(profileWords).join('. ')}. ${linesNow().map((l) => l.text).join('. ')}${slotsBack() ? '. Back' : ''}.`;
  function openSlots(back) { app.picking = null; app.slotsBack = back; show('slots', app.profiles.current ?? 0); }
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
  // Page Up and Page Down, < and >: the open card's page, the history's or the map's (D-578)
  function turnMap(way) { cards[app.screen]?.page?.(way === 'up' ? -1 : 1); }
  function turnFloor(way) {
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

  const { bagWords, toggleBag, pickSlot, pickGear, canStore, pickStore, storeNear, pickSort, sortBag, moveBag, dropChosen, useChosen, placeWords, setToward, tapSide, openPanel, takeDownBench, plantBed, pickBed, feedBed, pickChest, openTrade, pickTrade, turnTrade, tradeChosen, moveTrade, benchWords, pickBench, slotWords } = createCardScreens(app, ui, show, menuOf); // the card screens (D-570)

  const titleAt = (id) => show('title', menuOf('title').findIndex((l) => l.id === id));
  const { openExplorer, closeExplorer, showSeeds, pressBar, waysWords, openWays, closeWays, pickWay, closeEasier, openPad, closePad,
    pressKey } = createWorldScreens(app, ui, show, mapFloor, menuOf, titleAt); // the world screens (D-468)
  function pause() {
    if (cards[app.screen]) cards[app.screen].close(); // the card table (D-573)
    else if (app.screen === 'play') { app.queued = null; show('paused'); } // a step waiting in line is dropped
  }
  // A key typed: the open card's own, if it has any (D-578): the bag's C and X, the name pad's
  // letters, the seed pad's digits and the Explorer's R, T and B
  const onType = (key) => cards[app.screen]?.type?.(key) ?? false;

  // § choosing: a line picked, an arrow or a swipe, a tap or click off the room, each the open
  // card's in the card table (D-573, D-578)
  function choose(i = app.chosen) { cards[app.screen]?.pick(i); }
  // Arrows and swipes off the room: menus take swipes always (D-189)
  const onDir = (dir, how) => { cards[app.screen]?.dir(dir, how); };
  const onPoint = (px, py, held) => { cards[app.screen]?.tap(px, py, held); };

  // § chip: the profile in play on the title, its name and deepest depth (D-401)
  const chip = () => chipOf(slotName(inPlay(app.profiles), app.profiles.current), inPlay(app.profiles).records.deepest);
  const cards = makeCards(app, ui, show, { pickBench, takeDownBench, pickChest, tradeChosen, moveTrade, turnTrade, pickTrade, useChosen, moveBag, canStore, pickStore, storeNear, pickSort, sortBag, dropChosen, pickGear, pickSlot, setToward, tapSide, menuOf, askOf, plantBed, pickBed, feedBed, titleAt, closeDrop, closeEasier, chip, menuTop, closeSettings, closeWays, pickWay, openSlots, openJournal, openHowTo, openExplorer, openPad, openWays, openHistory, closeHowTo, closeHistory, closeJournal, journalPageWords, slotsBack, linesNow, slotsWords, openName, openCloak, pressName, closeName, pressLook, moveLookBy, closeCloak, pressKey, closePad, pressBar, closeExplorer, panMap, turnFloor, tapStairs, win, mapCardAt }); // the card table (D-573, D-575, D-576, D-577, D-578)
  const onMapScreen = () => app.screen === 'map' || app.screen === 'explore';

  // § journey ends: a Hardcore fall's page, Same world picked (MO2, D-344)
  const endJourney = () => show('ended');
  return { show, endJourney, openSlots, slotsBack, openPanel, openTrade, openTravel, openBoons, openStrike, pause, toggleMap, toggleBag, turnMap, panMap, zoomMap, onType, choose, onDir, onPoint, onMapScreen, onTitle, menuOf, askOf, turns, chip };
}
