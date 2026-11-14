// § numbers (D-902): what an item does, in rows of words for the bag card, each with its
// icon's name, what it does and its number, all read from the item's registry entry, so a new
// item with these fields shows its rows by itself. An item with none of them has no rows.
import { OIL } from './oil.js';
import { SHADE_NEAR } from './shade.js';

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
