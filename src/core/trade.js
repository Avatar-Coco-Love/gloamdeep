// § trade: selling to a person at home who `buys` (step 13a, D-494). Bumping them opens
// their card on the bag's 6 slots; each thing with a `sells` price in the registry, so far
// the creature materials, sells one at a time for its trade coins, free, no turn. Coins
// are `state.coins`, kept on a fall in Gentle and Normal, gone with the world in
// Hardcore (D-472, D-494). An older save has none yet (`coins ?? 0`). Plain data, no drawing.
import { get } from './registry.js';
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
export const tradeWords = (state) => `Peddler. ${coinWords(coins(state))}. Your bag on the left. Pick one, then Sell, Enter or Space to sell one of it, or Close.`;
export const priceWords = (id) => (priceOf(id) ? `He pays ${coinWords(priceOf(id))} each.` : "He doesn't buy this.");

