// § cards: the title's screens and the cards over play, each frame (split from frame.js, H-99).
// It changes nothing in the game; frame.js draws the room under them.
import { benchKnown } from '../core/recall.js';
import { view } from './screen.js';
import { spriteOf, heroIn, SPRITES } from './sprites.js';
import { canSleepOut } from '../core/sleepout.js';
import { drawTitle, drawScene, drawName } from './title.js';
import { drawTitleCard, nameTop } from './titlecard.js';
import { drawSeedCard } from './seedpad.js';
import { drawNameCard } from './namepad.js';
import { drawHowTo } from './howto.js';
import { drawHistory } from './history.js';
import { drawJournal } from './journal.js';
import { drawSlots } from './slots.js';
import { drawAskCard } from './askcard.js';
import { drawOpening } from './openingcard.js';
import { drawAbility } from './abilitycard.js';
import { ABOUT_BOONS, ABOUT_BOONS_BUTTON } from '../core/opening.js';
import { drawLook } from './cloak.js';
import { drawMap } from './map.js';
import { drawBag, hidesPicture } from './bag.js';
import { drawBenchPanel } from './benchpanel.js';
import { drawMakeCard } from './makecard.js';
import { bagMakes, makeFor, stationFor } from '../core/bagmake.js';
import { get } from '../core/registry.js';
import { refills, draughtTurns } from '../core/numbers.js';
import { drawChestPanel } from './chestpanel.js';
import { drawTradePanel } from './tradepanel.js';
import { drawPauseCard } from './pausecard.js';
import { drawSettingsCard } from './settingscard.js';
import { drawWays, TRAVEL_TITLE } from './ways.js';
import { drawBoons } from './boons.js';
import { stashAt, chestsNear, nearStacks } from '../core/chest.js';
import { kitRow } from '../core/gear.js';
import { drawStrikeCard } from './strikecard.js';
import { needleAt, zoneWidth } from '../core/fishing.js';
import { isFitted } from '../core/parts.js';
import { bagSize } from '../core/bag.js';
import { maxHealth } from '../core/turn.js';
import { tileAt } from '../core/room.js';
import { shownSeed, canGoBack } from '../core/explorer.js';
import { playing, slotName } from '../core/profile.js';
import { shopOf, newShop } from '../core/feats.js';
import { bagWindow, drawBagBar } from './bagscroll.js';
import { chestWindow } from './chestscroll.js';
import { tradeWindow } from './tradescroll.js';
import { stepScroll } from './scroll.js';
import { cloakOf, eyesOf, trimOf, clothesOf, lampOf, headOf } from '../core/looks.js';
import { PAUSE_MENU, pauseFacts, stationMakes, stationTitle, STATION_NONE, SURE_MENU, ENDED_MENU, ENDED_HEADING } from '../core/menu.js';

// What the chosen find's MAKE makes, for the line above it on the Bag tab, or null (D-787);
// a find made into something at a station only, { into, at }, "Makes a Glow Draught at the mortar" (D-791)
function makesOf(state, i) {
  const s = state.bag[i], at = s && get(s.id)?.craft ? makeFor(state, s.id) : -1;
  return at >= 0 ? bagMakes(state)[at].item : s && !get(s.id)?.craft ? stationFor(state, s.id) : null;
}
// The bumped tile's own first words, still the line out: drawn over its ask card (H-33), so
// an older line never shows over a bed's, a garden bed's or a shelf's
const saysOver = (state, at) => { const says = at && tileAt(state.room, at.x, at.y)?.says; return !!says && state.line?.id === says; };
// A bag or gear slot's sprite: the rod drawn with its hook once the Bone Hook is fitted (D-807)
// The Make card's pictures' facts for an entry, as if made and used now (D-916)
const picsOf = (state) => (entry) => ({ held: state.held ?? null, refill: refills(state, entry), sips: draughtTurns(state, entry) });
const kitOf = (state) => (it) => (it?.id === 'rod' && isFitted(state, 'boneHook') ? SPRITES.rodHooked : spriteOf(it));

// `ui` as frame.js's; overPlay draws the card the screen shows over the room, onTitleScreens the title's
export function createCards(app, ui) {
  const { ctx, roomCtx: rc, hudCtx: hc, canvas, textLine, dev, screens, still } = ui;
  // The picture's top left on the room canvas; on the title's screens both have the same zoom (screen.js)
  function pictureAt() {
    const r = canvas.getBoundingClientRect(), b = rc.canvas.getBoundingClientRect(), k = rc.canvas.width / b.width;
    return { x: Math.round((r.left - b.left) * k), y: Math.round((r.top - b.top) * k) };
  }
  // § title scene: the floor, hero and light fill the whole screen behind the title's lines
  // and its cards
  function titleScene(count, t) {
    const at = pictureAt();
    drawScene(rc, count, t, still(), at.x, at.y);
  }

  // § the Journal's card, on the title's scene or the room (D-391), and the boons card on either (D-712)
  function journalOn(c, t) {
    const p = playing(app.profiles);
    drawJournal(c, view.w, view.h, p.records, p.played, app.state, app.tab, t, still(), app.growthPick, p.bestiary, SPRITES, app.beastPick, app.beastPage, p.bought, p.goals, p.glints, app.journalScroll ?? 0);
  }
  const aboutBoonsOn = (c) => drawOpening(c, view.w, view.h, ABOUT_BOONS, ABOUT_BOONS_BUTTON);

  function onTitleScreens(t) {
    const { screen } = app;
    if (screen === 'explore') { titleScene(0, t); drawMap(rc, view.w, view.h, app.view, t, still(), screens.turns(), { seed: shownSeed(app.seeds), back: canGoBack(app.seeds) }); } // the map's card on the title's scene (D-395)
    else if (screen === 'seed') { titleScene(0, t); drawSeedCard(rc, view.w, view.h, app.entry, app.chosen, t, still()); } // the card on the title's scene (D-394)
    else if (screen === 'howto') { titleScene(0, t); drawHowTo(rc, view.w, view.h, app.page, app.settings, t, still(), !!app.state?.leap); } // the card on the title's scene (D-390)
    else if (screen === 'history') { titleScene(0, t); drawHistory(rc, view.w, view.h, app.rows, app.opened, app.scroll, app.chosen, t, still()); } // the card on the title's scene (D-393)
    else if (screen === 'mode') { titleScene(0, t); drawWays(rc, view.w, view.h, screens.menuOf(screen), app.chosen, t, still()); } // the card on the title's scene (D-396)
    else if (screen === 'settings') { titleScene(0, t); drawSettingsCard(rc, view.w, view.h, screens.menuOf(screen), app.chosen, t, still(), app.settingsTab, app.soundList); } // the card on the title's scene (D-389)
    else if (screen === 'slots') { titleScene(0, t); drawSlots(rc, view.w, view.h, app.profiles, (p) => heroIn(cloakOf(p), eyesOf(p), trimOf(p), clothesOf(p), lampOf(p), headOf(p)), app.chosen, app.picking, screens.slotsBack(), t, still()); } // the card on the title's scene (D-397)
    else if (screen === 'name') { titleScene(0, t); drawNameCard(rc, view.w, view.h, app.entry, app.chosen, t, still(), app.renaming, heroIn(app.cloak, app.eyes, app.trim, app.clothes, app.lamp, app.head), app.digits); } // the card on the title's scene (D-398)
    else if (screen === 'cloak') { titleScene(0, t); drawLook(rc, view.w, view.h, heroIn, { cloak: app.cloak, eyes: app.eyes, trim: app.trim, clothes: app.clothes, lamp: app.lamp, head: app.head }, app.lookTab, app.chosen, slotName({ name: app.cloakNew ? app.entry : app.profiles.slots[app.naming]?.name }, app.naming), app.cloakNew, t, still(), app.lookTry, app.cloakNew ? newShop(app.gift) : shopOf(app.profiles.slots[app.naming]), app.lookScroll); } // the look card on the title's scene (D-399), the big hero named (D-520), a tab a part (D-521)
    else if (screen === 'drop' || screen === 'sure') { titleScene(0, t); drawAskCard(rc, view.w, view.h, ...screens.askOf(screen), SURE_MENU, app.chosen); } // the ask card on the title's scene (D-400)
    else if (screen === 'journal') { titleScene(0, t); journalOn(rc, t); } // the card on the title's scene (D-391)
    else if (screen === 'aboutBoons') { titleScene(0, t); journalOn(rc, t); aboutBoonsOn(rc); } // the boons card over the Journal (D-712)
    else if (screen === 'title') { // laid out like a phone game's (D-401)
      const p = playing(app.profiles);
      titleScene(3, t);
      drawName(rc, view.w / 2, nameTop(view.h));
      drawTitleCard(rc, view.w, view.h, screens.menuOf(screen), app.chosen, { ...screens.chip(), hero: heroIn(cloakOf(p), eyesOf(p), trimOf(p), clothesOf(p), lampOf(p), headOf(p)) }, t, still());
    } else {
      const [menu, heading, note] = screen === 'ended' ? [ENDED_MENU, ENDED_HEADING, null] // after a Hardcore fall (D-344)
        : [screens.menuOf(screen), null, null];
      titleScene(menu.length, t);
      drawTitle(ctx, menu, app.chosen, t, still(), heading, note);
    }
  }

  // § over play: the card the screen shows on the room, the text line over it where it says so
  function overPlay(state, line, t, cam) {
      if (app.screen === 'paused') drawPauseCard(hc, view.w, view.h, PAUSE_MENU, app.chosen, pauseFacts(state), t, still()); // a card on the room (D-388)
      else if (app.screen === 'settings') drawSettingsCard(hc, view.w, view.h, screens.menuOf(app.screen), app.chosen, t, still(), app.settingsTab, app.soundList); // a card on the room (D-389)
      else if (app.screen === 'ways') drawWays(hc, view.w, view.h, screens.menuOf('ways'), app.chosen, t, still()); // a card on the room (D-396)
      else if (app.screen === 'travel') drawWays(hc, view.w, view.h, screens.menuOf('travel'), app.chosen, t, still(), TRAVEL_TITLE, app.scroll); // the travel card, its rows the ways' (D-593)
      else if (app.screen === 'strike') drawStrikeCard(hc, view.w, view.h, state.float?.strike ?? 0, needleAt(t - (app.strike?.start ?? t)), zoneWidth(state.float, state)); // the strike meter, the room paused (D-614)
      else if (app.screen === 'opening') drawOpening(hc, view.w, view.h); // a new journey's first words, on the room (D-628)
      else if (app.screen === 'ability') drawAbility(hc, view.w, view.h); // Leap learnt, its card on the room (D-992)
      else if (app.screen === 'boons') drawBoons(hc, view.w, view.h, app.offer || [], app.chosen); // the boon card, three cards in a row (D-603)
      else if (app.screen === 'easier' || app.screen === 'bed' || app.screen === 'sleepOut') {
        drawAskCard(hc, view.w, view.h, ...screens.askOf(app.screen), screens.menuOf(app.screen), app.chosen); // the ask card on the room (D-400); the bed's by day (D-488), the garden bed's (D-566)
        if (app.screen === 'bed' && saysOver(state, app.bench)) textLine.draw(hc, line, t, still()); // a campfire's or the miners' camp's first words, over their card (H-33)
      }
      else if (app.screen === 'seed') drawSeedCard(hc, view.w, view.h, app.entry, app.chosen, t, still()); // a card on the room (D-394)
      else if (app.screen === 'howto') drawHowTo(hc, view.w, view.h, app.page, app.settings, t, still(), !!app.state?.leap); // a card on the room (D-390)
      else if (app.screen === 'history') drawHistory(hc, view.w, view.h, app.rows, app.opened, app.scroll, app.chosen, t, still()); // a card on the room (D-393)
      else if (app.screen === 'journal') journalOn(hc, t); // a card on the room (D-391)
      else if (app.screen === 'aboutBoons') { if (app.boonsFrom === 'journal') journalOn(hc, t); aboutBoonsOn(hc); } // the boons card on the room, or over the Journal (D-712)
      else if (app.screen === 'map') drawMap(hc, view.w, view.h, app.view, t, still(), screens.turns()); // a card on the room (D-395)
      else if (app.screen === 'bag') {
        const entry = get(state.bag[app.chosen]?.id), refill = refills(state, entry), sips = draughtTurns(state, entry);
        const win = bagWindow(view.w, view.h, bagSize(state)), sc = app.bagScroll; // its slots' window, gliding on (D-1011)
        if (sc) stepScroll(sc, t, win.max, win.pitch);
        drawBag(hc, view.w, view.h, state.bag, app.chosen, kitOf(state), kitRow(state), state.health >= maxHealth(state), state.told, bagSize(state), chestsNear(state).length > 0, t, still(), state.poisoned > 0, makesOf(state, app.chosen), canSleepOut(state), refill, sips, { win, y: sc?.y ?? 0 }); // hearts or oil, or a draught's turns, now and after (D-908, D-909) // a card on the room (D-385), its STORE with a chest in reach (D-558)
        drawBagBar(hc, win, sc?.y ?? 0, sc?.lit ?? 0);
        if (!hidesPicture(entry, state.line, refill, sips)) textLine.draw(hc, line, t, still()); // over the card, so a line said in the bag shows ("Only on the surface."); not the chosen find's look line over its "Now" picture (H-69)
      }
      else if (app.screen === 'make') {
        drawMakeCard(hc, view.w, view.h, bagMakes(state), app.chosen, spriteOf, state.told, picsOf(state)); // the bag's Make tab, a card on the room (D-787)
        textLine.draw(hc, line, t, still()); // "You make an oil flask."
      }
      else if (app.screen === 'bench') {
        const station = tileAt(state.room, app.bench.x, app.bench.y); // the workbench or the mortar (D-786)
        drawBenchPanel(hc, view.w, view.h, stationMakes(station, state.bag, bagSize(state), nearStacks(state), benchKnown(state), app.benchTab), app.chosen, spriteOf, state.told, t, still(), stationTitle(station), STATION_NONE, station.makes ? null : app.benchTab, picsOf(state)); // a card on the room (D-387)
        textLine.draw(hc, line, t, still()); // "You make a stash chest."
      }
      else if (app.screen === 'chest') {
        const win = chestWindow(view.w, view.h, bagSize(state)), sc = app.chestScroll; // the bag's slots' window, gliding on (D-1011)
        if (sc) stepScroll(sc, t, win.max, win.pitch);
        drawChestPanel(hc, view.w, view.h, stashAt(state, app.bench.x, app.bench.y), state.bag, app.chosen, kitOf(state), t, still(), bagSize(state), picsOf(state), { win, y: sc?.y ?? 0 }); // a card on the room (D-387)
        drawBagBar(hc, win, sc?.y ?? 0, sc?.lit ?? 0);
        textLine.draw(hc, line, t, still()); // "Your bag is full."
      }
      else if (app.screen === 'trade') {
        const win = tradeWindow(view.w, view.h, bagSize(state)), sc = app.tradeScroll; // the grid's window, gliding on (D-1013)
        if (sc) stepScroll(sc, t, win.max, win.pitch);
        drawTradePanel(hc, view.w, view.h, state, app.chosen, spriteOf, app.tab, t, still(), { win, y: sc?.y ?? 0 }); // a card on the room (D-494), its tabs (D-495)
        drawBagBar(hc, win, sc?.y ?? 0, sc?.lit ?? 0);
        textLine.draw(hc, line, t, still()); // his home line, said as it opens
      }
      else dev.draw(rc, state, cam);
  }
  return { onTitleScreens, overPlay };
}
