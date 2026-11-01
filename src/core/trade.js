// § trade: selling to a person at home who `buys` (step 13a, D-494). Bumping them opens
// their card on the bag's 6 slots; each thing with a `sells` price in the registry, so far
// the creature materials, sells one at a time for its trade coins, free, no turn. On the
// card's other tab, their `wares`, { itemId: price }, each bought one at a time, free, and
// never running out (step 13b, D-495). Coins
// are `state.coins`, kept on a fall in Gentle and Normal, gone with the world in
// Hardcore (D-472, D-494). An older save has none yet (`coins ?? 0`). Plain data, no drawing.
import { get } from './registry.js';
import { bagAdd, bagSize } from './bag.js';
import { note, fresh } from './events.js';
import { personAt } from './people.js';

export const coins = (state) => state.coins ?? 0;
// What one of item `id` sells for, or 0 when it isn't bought
export const priceOf = (id) => get(id)?.sells ?? 0;
const coinWords = (n) => `${n} coin${n === 1 ? '' : 's'}`;

// The person at home who buys, on x, y, or undefined
export function buyerAt(state, x, y) {
  const p = personAt(state, x, y);
  return p?.home && get(p.id).buys ? p : undefined;
}

// The state after selling one of bag slot i: the stack one smaller, gone at none and the
// ones after it moving up, the coins more by its price; unchanged when it isn't bought
export function sell(state, i) {
  const s = state.bag[i], price = s && priceOf(s.id);
  if (!price) return state;
  const bag = s.n > 1 ? state.bag.map((o, k) => (k === i ? { ...o, n: o.n - 1 } : o)) : state.bag.filter((o, k) => k !== i);
  return note(fresh({ ...state, bag, coins: coins(state) + price }), 'sell', { id: s.id, coins: price });
}

// What the frame on a slot says, for the card and a screen reader
export function slotWords(state, i) {
  const s = state.bag[i];
  if (!s) return 'Empty';
  const price = priceOf(s.id);
  return `${get(s.id).name}, ${s.n} carried, ${price ? `sells for ${coinWords(price)}` : 'not bought'}`;
}
export const tradeWords = (state) => `Peddler. ${coinWords(coins(state))}. Tabs: Sell and Buy, Up from the top row. Sell: your bag on the left. Pick one, then Sell, Enter or Space to sell one of it, or Close.`;
export const priceWords = (id) => (priceOf(id) ? `He pays ${coinWords(priceOf(id))} each.` : "He doesn't buy this.");


// § buying (step 13b, D-495): what the peddler sells, [{ id, price }], in his `wares` order;
// one vendor so far
export const wares = () => Object.entries(get('peddler').wares ?? {}).map(([id, price]) => ({ id, price }));
// Why ware i can't be bought now: 'coins' (too few), 'room' (the bag can't take it), or null
export function cantBuy(state, i) {
  const w = wares()[i];
  if (!w) return 'none';
  if (coins(state) < w.price) return 'coins';
  return bagAdd(state.bag, w.id, undefined, bagSize(state)) ? null : 'room';
}
// The state after buying one of ware i: the coins less by its price, one more in the bag;
// unchanged when it can't be bought
export function buy(state, i) {
  if (cantBuy(state, i)) return state;
  const w = wares()[i];
  return note(fresh({ ...state, bag: bagAdd(state.bag, w.id, undefined, bagSize(state)), coins: coins(state) - w.price }), 'buy', { id: w.id, coins: w.price });
}
const CANT = { coins: 'You have too few coins.', room: 'Your bag has no room for it.' };
export const costWords = (state, i) => [`It costs ${coinWords(wares()[i].price)}.`, CANT[cantBuy(state, i)]].filter(Boolean).join(' ');
// What the frame on ware i says, for the card and a screen reader
export function wareWords(state, i) {
  const w = wares()[i];
  return w ? `${get(w.id).name}. ${costWords(state, i)}` : 'Empty';
}
export const buyWords = (state) => `Buy. ${coinWords(coins(state))}. His wares on the left. Pick one, then Buy, Enter or Space to buy one of it, or Close.`;
