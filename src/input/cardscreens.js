// § card screens: the bag and its gear row, Drop, setting a workbench down, and the panels
// and cards of a set-down workbench, stash chest, bed and the peddler (D-247, WB2, WB3,
// CH4, D-387, D-494, D-495, D-546, D-554). Split from screens.js at the eighth audit
// (D-570): `app` and `ui` as there, `show` to open a screen, and `menuOf` for a card's lines.
import { tileAt } from '../core/room.js';
import { benchMakes, BENCH_TAKE, SURE_MENU } from '../core/menu.js';
import { bagSize, bagCols, canCraft } from '../core/bag.js';
import { setSides, DIRS } from '../core/turn.js';
import { get } from '../core/registry.js';
import { gearChosen, BAG_STORE, BAG_SORT } from '../render/bag.js';
import { CHEST_BAG, CHEST_TAKE, CHEST_STORE, stashAt, chestsNear, nearStacks } from '../core/chest.js';
// sellWords: a slot's words with its price, kept apart from the bag's own slotWords below (D-570)
import { tradeWords, slotWords as sellWords, priceOf, wares, wareWords, buyWords } from '../core/trade.js';
import { gearWords, GEAR, gearRow, canTakeOff } from '../core/gear.js';

export function createCardScreens(app, ui, show, menuOf) {
  const { spoken } = ui;
  // § bag (D-247): opens on the first slot; no turn passes until a flask is poured
  const slotWords = (i) => { const s = app.state.bag[i]; return s ? `${get(s.id).name}, ${s.n}` : 'Empty'; };
  const bagWords = () => `Bag. ${gearWords(app.state)}. ${app.state.bag.length ? app.state.bag.map((s, i) => slotWords(i)).join('. ') : 'Empty'}. The arrows choose, Up from the top row reaches the gear, Up again ${canStore() ? 'Store, for the chests nearby, Left of it Sort' : 'Sort'}, Enter pours, makes, eats, drinks, holds, fits, wears or takes off, C makes, E eats a fish, I or Esc closes.`;
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
  // `make`: C or the Make beside Eat, which makes a potion from heartcaps (D-309); for a
  // minnow, E or the Eat beside Pour, which eats it (D-615)
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
    if (make && !entry?.craft && !entry?.eats) return;
    if (entry?.oil && !make) { show('play'); ui.pour(app.chosen); return; }
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
    if (entry?.eats && (!make || entry.oil)) { // a minnow's second button eats (D-615)
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
  // The bed's by day is an ask, No picked (D-488); the garden bed's card, Plant picked (D-566).
  function openPanel(at) { const tile = tileAt(app.state.room, at.x, at.y), panel = tile.panel; app.queued = null; app.bench = at; show(panel, panel === 'bed' && !tile.garden ? SURE_MENU.findIndex((l) => l.id === 'no') : 0); }
  function takeDownBench() { show('play'); ui.takeDown(app.bench.x, app.bench.y); }
  function plantBed() { if (menuOf('bed')[0].dim) return; show('play'); ui.plant(app.bench.x, app.bench.y); } // a dim Plant does nothing
  function pickBed() { show('play'); ui.pick(app.bench.x, app.bench.y); } // the grown bed's berries (D-568)
  function feedBed() { if (menuOf('bed')[0].dim) return; show('play'); ui.feed(app.bench.x, app.bench.y); } // a dim Feed does nothing (D-569)
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
    spoken.textContent = i < 0 ? `Tabs, ${app.tab === 'buy' ? 'Buy' : 'Sell'} open` : app.tab === 'buy' ? wareWords(app.state, i) : sellWords(app.state, i);
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
  const costWords = (m) => `${get(m.item).name}, ${m.cost.map((c) => `${c.n} ${get(c.id).name}, you have ${c.have}`).join(' and ')}${m.dim ? ', too few' : ''}`;
  const benchWords = () => `Workbench. ${benchMakes(app.state.bag, bagSize(app.state), nearStacks(app.state)).map((m) => `${costWords(m)}. `).join('')}Make, Deconstruct workbench, or Close.`;
  // § bench card (D-387): the frame on a slot says what is made there and its cost
  function pickBench(i) {
    app.chosen = i;
    const m = benchMakes(app.state.bag, bagSize(app.state), nearStacks(app.state))[i];
    spoken.textContent = i === BENCH_TAKE ? 'Deconstruct workbench' : m ? costWords(m) : 'Empty';
  }

  return { bagWords, toggleBag, pickSlot, pickGear, canStore, pickStore, storeNear, pickSort, sortBag, moveBag, dropChosen, useChosen, placeWords, setToward, tapSide, openPanel, takeDownBench, plantBed, pickBed, feedBed, pickChest, openTrade, pickTrade, turnTrade, tradeChosen, moveTrade, benchWords, pickBench, slotWords };
}
