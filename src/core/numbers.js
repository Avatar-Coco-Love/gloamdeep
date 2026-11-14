// § numbers (D-902): what an item does, in rows of words for the bag card, each with its
// icon's name, what it does and its number, all read from the item's registry entry, so a new
// item with these fields shows its rows by itself. An item with none of them has no rows.
import { OIL } from './oil.js';
import { SHADE_NEAR } from './shade.js';
import { LANTERN_HIT } from './turn.js';
import { healOf, pourOf } from './boon.js';
import { maxHealth, turnOil } from './state.js';
import { grown } from './upgrades.js';
import { drinkKey, givesOf, shareLeft, LONGEST } from './lasting.js';

const TANK = Math.round(1 / OIL.burn); // a full lantern's turns, with nothing to slow it
const many = (n, one, more = `${one}s`) => `${n} ${n === 1 ? one : more}`;
const oneIn = (p) => `1 in ${Math.round(1 / p)}`;
const lasts = (burn) => many(Math.round(TANK / burn), 'turn'); // a full lantern burning `burn` of a plain turn's oil

// entry: an item's registry entry → [{ icon, label, value }]; value '' when the words say it all
export function itemNumbers(entry) {
  const rows = [], add = (icon, label, value = '') => rows.push({ icon, label, value });
  if (!entry) return rows;
  const wear = entry.wear ?? {}, part = entry.part ?? {};
  if (entry.hit) add('blade', 'Hits for', `${entry.hit}`);
  if (entry.through) add('through', 'And the one behind', `${entry.through}`);
  if (entry.knocks) add('knock', 'Knocks it back', many(entry.knocks, 'tile'));
  if (entry.heal) add('heart', 'Heals', many(entry.heal, 'heart'));
  if (entry.rest?.heal) add('heart', 'Sleeping out heals', many(entry.rest.heal, 'heart'));
  if (entry.oil) add('drop', 'Fills the lantern', `${Math.round(entry.oil * 100)}%`);
  if (entry.cures) add('cure', 'Ends poison');
  if (wear.glance) add('shield', 'Bites glance off', oneIn(wear.glance));
  if (wear.blunt) add('shield', 'Bites of 2+ hurt', `${wear.blunt} less`);
  if (wear.rare) add('star', 'Rare drops', oneIn(wear.rare));
  if (wear.burn) add('drop', 'Full lantern lasts', lasts(wear.burn));
  if (wear.poison) add('cure', 'Poison lasts', many(wear.poison, 'turn'));
  if (wear.echo) add('eye', 'Senses creatures', many(wear.echo, 'tile'));
  if (wear.fang) add('heart', 'A beaten one heals', oneIn(wear.fang));
  if (part.burn) add('drop', 'Full lantern lasts', lasts(part.burn * TANK));
  if (part.wide) add('star', 'Strike zone', `${part.wide}x wider`);
  if (entry.quick) add('pick', 'Breaks rock in', 'half the bumps');
  if (entry.glow) add('sun', 'Light reaches', `+${many(entry.glow.reach, 'tile')}`);
  if (entry.slow) add('drop', 'Full lantern lasts', lasts(entry.slow.burn));
  if (entry.mend) add('heart', 'A heart every', many(entry.mend.every, 'turn'));
  if (entry.ward) add('cure', 'Ends poison, then', 'no new poison');
  if (entry.spitproof) add('shield', 'Spit splashes off');
  if (entry.shade) add('eye', 'Noticed only within', many(SHADE_NEAR, 'step'));
  const turns = (entry.glow ?? entry.slow ?? entry.mend ?? entry.ward ?? entry.spitproof ?? entry.shade)?.turns;
  if (turns) add('time', 'For', many(turns, 'turn'));
  if (entry.sets?.burns) add('time', 'Burns for', many(entry.sets.burns, 'turn'));
  if (entry.grows) add('bag', 'Bag grows to', many(entry.grows.to, 'slot'));
  if (entry.sells) add('coin', 'Sells for', many(entry.sells, 'coin'));
  return rows;
}

// § hits (D-902, D-907): a weapon's hits on the grid, for the bag card's picture: a row for the
// weapon looked at, "This one", then one for what the hand holds now, "Held now", the lantern's
// LANTERN_HIT when nothing is (turn.js). Each row's tiles, after the hero's: a creature's, with
// what it takes, or an arrow where a knocked one stood. The weapon's own numbers, without a
// boon's (D-907). One row, "Held now", for the weapon in the hand, or one just like it; none
// for a thing that doesn't hit.
// entry: the weapon's registry entry; held: the held one's, or null for the lantern
export function weaponHits(entry, held) {
  if (!entry?.hit) return [];
  const row = (label, e) => {
    const tiles = [];
    for (let k = 0; k < (e?.knocks ?? 0); k++) tiles.push({ knock: true });
    tiles.push({ hit: e?.hit ?? LANTERN_HIT });
    if (e?.through) tiles.push({ hit: e.through });
    return { label, tiles };
  };
  if (held?.id === entry.id) return [row('Held now', entry)];
  return [row('This one', entry), row('Held now', held)];
}

// § refills (D-902, D-908): hearts or oil now and after, for the bag card's picture: one for the
// hearts an eaten item heals, one for the oil a poured one fills (a minnow has both, each as its
// own use would leave it). The real amounts, a boon's included (healOf, pourOf in boon.js); what
// would pass the top is `lost`. Eating at full health heals nothing, so all of it is lost there.
// A pour that passes a turn burns that turn's oil first, as pour does (bagturn.js, D-912).
// state: the hero's; entry: the item's registry entry → [{ kind: 'hearts'|'oil', now, after, lost, max }]
export function refills(state, entry) {
  const out = [];
  if (!state || !entry) return out;
  if (entry.heal) {
    const max = maxHealth(state), add = healOf(state, entry), now = state.health, after = now >= max ? now : Math.min(max, now + add);
    out.push({ kind: 'hearts', now, after, lost: now + add - after, max });
  }
  if (entry.oil) {
    const add = pourOf(state, entry), now = state.oil, free = !entry.byHand && grown(state, 'quickPour'); // Quick Pour: a flask passes no turn (D-816)
    const burnt = free ? now : turnOil(state), after = Math.min(1, burnt + add); // a pour's turn burns first (D-247, D-912)
    out.push({ kind: 'oil', now, after, lost: burnt + add - after, max: 1 });
  }
  return out;
}

// § sips (D-902, D-909): a draught's turns, for the bag card's picture: its HUD mark's rim
// "Now", the share of its time left, 0 when none is working, and "After", as drinking one
// again starts the count from the full again. Null for a thing that isn't drunk for a while.
// state: the hero's; entry: the item's registry entry → { key, now, after } or null
export function draughtTurns(state, entry) {
  const key = drinkKey(entry);
  if (!key || !state) return null;
  return { key, now: shareLeft(state, key), after: Math.min(1, givesOf(entry, key) / LONGEST[key]) };
}
