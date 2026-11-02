// § card table (D-573): each card screen's own file, by its screen's name. screens.js asks
// the table first for a pick (choose), an arrow or swipe (onDir), a tap (onPoint) and Esc
// or P (pause). A new card is one file here and one line below. Every card returns
// { pick(i), dir(dir, how), tap(px, py, held), close() }; tests/cardtable.test.js checks it.
import { bagCard } from './bag.js';
import { placeCard } from './place.js';
import { benchCard } from './bench.js';
import { chestCard } from './chest.js';
import { tradeCard } from './trade.js';
import { bedCard } from './bed.js';
import { sureCard } from './sure.js';
import { dropCard } from './drop.js';
import { easierCard } from './easier.js';
import { titleCard } from './title.js';
import { pausedCard } from './paused.js';
import { settingsCard } from './settings.js';
import { waysCard } from './ways.js';
import { modeCard } from './mode.js';
import { endedCard } from './ended.js';
import { howtoCard } from './howto.js';
import { historyCard } from './history.js';
import { journalCard } from './journal.js';

export const CARD_TABLE = { bag: bagCard, place: placeCard, bench: benchCard, chest: chestCard, trade: tradeCard, bed: bedCard, sure: sureCard, drop: dropCard, easier: easierCard, title: titleCard, paused: pausedCard, settings: settingsCard, ways: waysCard, mode: modeCard, ended: endedCard, howto: howtoCard, history: historyCard, journal: journalCard };

// Every card made once, sharing `app`, `ui`, `show` and the helpers `c` from cardscreens.js and screens.js
export const makeCards = (app, ui, show, c) => Object.fromEntries(Object.entries(CARD_TABLE).map(([id, make]) => [id, make(app, ui, show, c)]));
