// § boons: the home waystone's 1 of 3 (D-583, D-596)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld, maxHealth, step, wait, heroHit, pour, eat, pourByItself, HERO_HEALTH, LANTERN_HIT } from '../src/core/turn.js';
import { goToPlace, goToDepth } from '../src/core/stairs.js';
import { withTile } from '../src/core/room.js';
import { get, BOONS, BOON_SORTS } from '../src/core/registry.js';
import { offer, offerable, takeBoon, offersBoons, onHomePlate, dropOf, pourOf, healOf, rareChance, boonRow, lanternReach, boonBurn, OFFERED } from '../src/core/boon.js';
import { fall } from '../src/core/fall.js';
import { OIL, reach } from '../src/core/oil.js';
import { DROP_CHANCE, RARE_CHANCE } from '../src/core/enemies.js';

const SEED = 5;
const plate = (room) => { for (let y = 0; y < room.rows; y++) { const x = room.map[y].search(/[ZA]/); if (x >= 0) return { x, y }; } return null; };
// In the woods, on the home plate woken, no creature near
function onHome() {
  const s = goToPlace(makeWorld('first', SEED), 'woods'), at = plate(s.room);
  return { ...s, room: withTile(s.room, at.x, at.y, get('wokenPlate')), hero: at, enemies: [] };
}

test('boons: every entry has a known kind, a name and one short line', () => {
  for (const b of Object.values(BOONS)) {
    assert.ok(BOON_SORTS[b.sort], b.id);
    assert.ok(b.name && b.words && b.words.length <= 60, b.id);
    assert.equal(b.kind, 'boon');
  }
  assert.equal(Object.keys(BOONS).length, 14); // the owner's list (D-596)
  assert.deepEqual(offerable().map((b) => b.id).sort(), ['deepPour', 'greedyHands', 'hardBlow', 'hungryFlame', 'keenEye', 'kindHerbs', 'luckyFind', 'reckless', 'slowWick', 'softStep', 'stoutHeart', 'waymark', 'wideGlow']); // built so far
});

test('boons: the offer is 3, each of a different kind, the same for the same seed and turn', () => {
  for (let turn = 0; turn < 40; turn++) {
    const s = { ...onHome(), turn }, ids = offer(s);
    assert.equal(ids.length, OFFERED);
    assert.equal(new Set(ids.map((id) => BOONS[id].sort)).size, OFFERED);
    assert.deepEqual(offer(s), ids);
  }
  assert.deepEqual(boonRow('slowWick'), { id: 'slowWick', text: 'Slow Wick', note: 'Light and oil. The lantern burns a quarter slower.' });
});

test('boons: the woken home plate offers them while none is held', () => {
  const s = onHome();
  assert.ok(onHomePlate(s) && offersBoons(s));
  const held = takeBoon(s, 'keenEye');
  assert.equal(held.boon, 'keenEye');
  assert.equal(held.line.id, 'boonTake');
  assert.ok(held.events.some((e) => e.type === 'boon'));
  assert.ok(!offersBoons(held));
  assert.equal(takeBoon(held, 'slowWick'), held); // only one at a time
  assert.equal(takeBoon(s, 'farSight'), s); // not built yet, never taken
  const away = goToDepth(s, 2);
  assert.ok(!offersBoons(away));
});

test('boons: Stout Heart gives 2 more hearts, full, and they go home again', () => {
  const s = takeBoon(onHome(), 'stoutHeart');
  assert.equal(maxHealth(s), HERO_HEALTH + 2);
  assert.equal(s.health, HERO_HEALTH + 2);
  const down = goToDepth(s, 2);
  assert.equal(down.boon, 'stoutHeart');
  const home = goToPlace(down, 'woods');
  assert.equal(home.boon, null);
  assert.equal(home.health, HERO_HEALTH);
  assert.equal(maxHealth(home), HERO_HEALTH);
});

test('boons: Slow Wick burns a quarter slower, and stacks with the Copper Wick', () => {
  const turns = (s) => { let n = 0; for (s = { ...s, oil: 1 }; s.oil > 0; n++) s = wait(s); return n; };
  const s = goToDepth(takeBoon(onHome(), 'slowWick'), 2);
  const bare = { ...s, enemies: [] }, plain = { ...bare, boon: null };
  assert.equal(turns(plain), Math.round(1 / OIL.burn));
  assert.equal(turns(bare), 80);
  assert.equal(turns({ ...bare, parts: { wick: 'copperWick' } }), 100);
});

test('boons: Keen Eye drops the part 3 times in 4', () => {
  const s = onHome();
  assert.equal(dropOf(s, DROP_CHANCE), DROP_CHANCE);
  assert.equal(dropOf(takeBoon(s, 'keenEye'), DROP_CHANCE), 0.75);
});

test('boons: a fall ends the boon', () => {
  const s = goToDepth(takeBoon(onHome(), 'stoutHeart'), 2), after = fall(s);
  assert.equal(after.boon, null);
  assert.equal(after.health, HERO_HEALTH);
});

test('boons: stepping off the plate and back on offers again only with none held', () => {
  const s = onHome(), off = step(s, 'down');
  assert.ok(!onHomePlate(off));
  assert.ok(offersBoons(step(off, 'up')));
  assert.ok(!offersBoons(step(step(takeBoon(s, 'slowWick'), 'down'), 'up')));
});

test('boons: Wide Glow reaches 1 tile farther, but not the empty ember', () => {
  const s = onHome(), glow = takeBoon(s, 'wideGlow');
  assert.equal(lanternReach(glow), reach(glow.oil) + 16);
  assert.equal(lanternReach({ ...glow, oil: 0 }), reach(0));
  assert.equal(lanternReach(s), reach(s.oil));
});

test('boons: Hard Blow hits for 1 more, with the lantern or a weapon', () => {
  const s = onHome(), hard = takeBoon(s, 'hardBlow');
  assert.equal(heroHit(hard), LANTERN_HIT + 1);
  assert.equal(heroHit({ ...hard, held: 'spear' }), heroHit({ ...s, held: 'spear' }) + 1);
});

test('boons: Greedy Hands always drops the part, and burns a quarter faster', () => {
  const g = takeBoon(onHome(), 'greedyHands');
  assert.equal(dropOf(g, DROP_CHANCE), 1);
  assert.equal(boonBurn(g), 1.25);
});

test('boons: Hungry Flame reaches 2 tiles farther, not the empty ember, and burns half again as fast', () => {
  const s = onHome(), hungry = takeBoon(s, 'hungryFlame');
  assert.equal(lanternReach(hungry), reach(hungry.oil) + 32);
  assert.equal(lanternReach({ ...hungry, oil: 0 }), reach(0));
  assert.equal(boonBurn(hungry), 1.5);
  assert.ok(wait(hungry).oil < wait(s).oil);
});

test('boons: Reckless hits for 1 more, the spear\'s second too, and takes 2 hearts, cut at once', () => {
  const s = onHome(), r = takeBoon(s, 'reckless');
  assert.equal(heroHit(r), LANTERN_HIT + 1);
  assert.equal(heroHit({ ...r, held: 'spear' }), heroHit({ ...s, held: 'spear' }) + 1);
  assert.equal(maxHealth(r), maxHealth(s) - 2);
  assert.equal(r.health, maxHealth(r)); // 5 of 5 becomes 3 of 3
  assert.equal(takeBoon({ ...s, health: 2 }, 'reckless').health, 2); // fewer than the new most: as it was
  const home = goToPlace(goToDepth(r, 1), 'woods'); // the hearts come back empty
  assert.equal(maxHealth(home), maxHealth(s));
  assert.equal(home.health, maxHealth(r));
  const fell = fall({ ...r, health: 1 }); // a fall heals in full, the boon gone
  assert.ok(!fell.boon);
  assert.equal(fell.health, maxHealth(s));
});

test('boons: Deep Pour pours 60% from a flask, by hand or by itself once none is wasted', () => {
  const s = { ...onHome(), oil: 0.3, bag: [{ id: 'flask', n: 2 }] }, deep = takeBoon(s, 'deepPour');
  assert.equal(pourOf(deep, get('flask')), 0.6);
  assert.equal(pourOf(s, get('flask')), get('flask').oil);
  assert.ok(Math.abs(pour(deep, 0).oil - (wait(deep).oil + 0.6)) < 1e-9);
  const at = (state, oil) => pourByItself(state, { ...state, oil, turn: state.turn + 1 });
  assert.equal(at(deep, 0.5).bag[0].n, 2); // at 50% a 60% pour would spill: it waits
  assert.equal(at(deep, 0.4).bag[0].n, 1);
  assert.equal(at(s, 0.5).bag[0].n, 1); // without, 45% pours at 50%
});

test('boons: Kind Herbs heals 1 heart more from anything eaten, never above full', () => {
  const s = { ...onHome(), health: 1, bag: [{ id: 'potion', n: 1 }, { id: 'heartcap', n: 1 }] }, kind = takeBoon(s, 'kindHerbs');
  for (const id of ['herb', 'heartcap', 'potion', 'gloamberry']) assert.equal(healOf(kind, get(id)), get(id).heal + 1, id);
  assert.equal(eat(kind, 1).health, 1 + 2);
  assert.equal(eat(kind, 0).health, maxHealth(kind)); // 1 + 5, cut to full
  assert.equal(eat(s, 1).health, 1 + 1);
});

test('boons: Lucky Find makes rare drops 1 in 4, 35 in 100 with the Wisp Charm', () => {
  const s = onHome(), lucky = takeBoon(s, 'luckyFind'), charm = { worn: { charm: ['wispCharm'] } };
  assert.equal(rareChance(s, RARE_CHANCE), RARE_CHANCE);
  assert.ok(Math.abs(rareChance(lucky, RARE_CHANCE) - 0.25) < 1e-9);
  assert.ok(Math.abs(rareChance({ ...s, ...charm }, RARE_CHANCE) - 0.2) < 1e-9);
  assert.ok(Math.abs(rareChance({ ...lucky, ...charm }, RARE_CHANCE) - 0.35) < 1e-9);
});
