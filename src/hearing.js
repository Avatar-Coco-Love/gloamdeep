// § hearing: what the game sounds like as it is played, and off play (D-868)
// Split from main.js at the fifteenth audit (D-868), word for word: `app` and `sound` as there, and
// `spoken`, the text line's words for screen readers. `played` marks a pick that made its own sound.
import { biteSound, drinkSound } from './core/enemies.js';
import { has } from './core/events.js';
import { get } from './core/registry.js';
import { areaAt, depthOf } from './core/room.js';
import { LOUD_KINDS } from './core/settings.js';
import { isFlask } from './core/bag.js';
import { stepOf, cardTurn, KIND_SOUND } from './render/sound.js';

export function createHearing(app, sound, spoken) {
  // § hear: the sounds of an action's events (events.js, D-267): the hit's (D-258), the
  // lantern's tick (D-257), a bite a moment after the hit, when there was one (D-259),
  // a tile walked, its step by the ground, unless the hero fell (D-255, D-774, D-776), a waystone's bells as it wakes (D-591), and
  // the plop of a cast and the splash of a catch (D-613), and a scattered pile's rattle (D-731);
  // a creature beaten, a moment after the hit, unless its bones scattered under the hero's step (D-777);
  // an item into the bag pats, unless it is a fish with its splash; a weapon into the hand is drawn; a tile set down knocks (D-820);
  // a bump on stone clinks, and its last crumbles (D-825); a relic shelved, a seed planted, guano fed (D-828);
  // a stiff swing that misses puffs, a bite that takes a heart is a blow, poison's heart throbs, a level rises (D-831);
  // the last heart beats (D-835)
  function hear(events) {
    const hit = events.find((e) => e.type === 'hit'), bite = biteSound(events), drink = drinkSound(events);
    const swung = !!hit || has(events, 'miss'); // a bite comes a moment after the hero's swing, hit or missed
    if (hit) sound.hit(!!hit.held);
    if (has(events, 'miss')) sound.miss(); // stiff, the swing went wide (D-759)
    if (has(events, 'beat') && !has(events, 'scatter')) sound.beaten(!!hit);
    if (drink) sound[drink](swung); // the oil tick's sip (D-606)
    for (const e of events) if (e.type === 'lantern') sound.lantern(e.lit);
    if (bite) sound[bite](swung);
    if (events.some((e) => e.type === 'bite' && e.hurt > 0)) sound.hurt(swung); // a bite or a glob took a heart (god mode too, as the flash)
    if (events.some((e) => e.type === 'poison' && e.hurt > 0)) sound.poison(); // poison took a heart (D-654)
    if (has(events, 'lastHeart')) sound.heartbeat(swung || has(events, 'poison')); // down to the last heart: a soft lub-dub twice, after the blow or the throb (D-835)
    if (has(events, 'level')) sound.rise(); // a level reached (D-246)
    if (has(events, 'step') && !has(events, 'fall')) sound[stepOf(app.state.room.dark?.sky, areaAt(depthOf(app.state.place))?.look)](); // grass, earth or stone (D-776)
    if (has(events, 'stoneWake')) sound.bells(); // the waystone wakes (D-591); a mimic wakes silently (D-368)
    if (has(events, 'boon')) sound.chime(); // a boon picked (D-596)
    if (has(events, 'cast')) sound.plop(); // the line cast (D-613)
    if (has(events, 'catch')) sound.splash(); // a fish caught (D-613)
    if (has(events, 'scatter')) sound.rattle(); // a pile of bones scattered: the bone rat's rattle (D-731)
    if (has(events, 'take') && !has(events, 'catch')) sound.pat(); // into the bag (D-820)
    if (events.some((e) => e.type === 'hold' && !e.tool)) sound.draw(); // from the bag into the hand; a tool, a rod or a pick, is silent (D-826)
    if (has(events, 'set')) sound.thunk(); // the workbench set down
    const chip = events.find((e) => e.type === 'chip' && get(e.id)?.clinks);
    if (chip) sound[chip.broke ? 'crumble' : 'clink'](); // a deposit, a copper vein or rubble (D-825)
    const cut = events.find((e) => e.type === 'chip' && get(e.id)?.chops);
    if (cut) sound[cut.broke ? get(cut.id).chops : 'chop'](); // a tree or branch chopped, then falling or snapping (D-842, D-843)
    if (has(events, 'shelve')) sound.shelf(); // a relic on the shelf (D-828)
    if (has(events, 'plant')) sound.sow(); // a seed in the garden bed
    if (has(events, 'feed')) sound.feed(); // guano on the sprout
    if (events.some((e) => e.type === 'pour' && isFlask(e.id))) sound.pour(); // a flask, by hand or by itself; a minnow is silent (D-830)
    if (has(events, 'oilLow')) sound.sputter(); // the flame is getting low: two sputters (D-834)
    if (has(events, 'oilOut')) sound.gutter(); // the lantern gutters to an ember
    if (has(events, 'torch')) sound.torch(); // an unlit torch lit (D-121)
    if (has(events, 'kindle')) sound.kindle(); // cold ashes lit into a campfire (D-757)
  }
  // § menu sounds (D-819): off play, a tap, Enter or Space that changes something on the same
  // screen ticks, unless it played its own (`ownSound`): a dim pick that can't be done tocks, a sale's coins (D-828); a
  // card opening or closing turns its page instead (in the loop)
  let ownSound = false, cards = [app.screen], cardShown = app.screen;
  const marks = () => [app.screen, app.state, JSON.stringify(app.settings), spoken.textContent, app.opened.size, app.entry];
  const pressed = (act) => (...args) => {
    if (app.screen === 'play' || app.screen === 'strike') return act(...args); // play's own sounds; the strike's tap is a pull
    const was = marks(), settingsWas = app.settings;
    ownSound = false;
    const out = act(...args); // Tab's answer, whether it used the key (D-826)
    const now = marks();
    if (!ownSound && now[0] === was[0] && now.some((m, i) => m !== was[i])) (hearLoud(settingsWas) ?? sound.tap)();
    return out;
  };
  // A loudness changed: Loudness ticks, a kind plays its own sound, each at the new loudness (D-822, D-823)
  function hearLoud(was) {
    if (was.loud !== app.settings.loud) return sound.tap;
    const on = (app.settings.muted ?? []).length < (was.muted ?? []).length && (was.muted ?? []).find((v) => !app.settings.muted.includes(v));
    if (on) return () => sound.sample(on); // a sound turned On plays itself; turned Off, the tick (D-824)
    const k = LOUD_KINDS.find(({ id }) => was[id] !== app.settings[id]);
    return k ? () => sound[KIND_SOUND[k.kind]]() : null;
  }
  // A chest creaks open before its page turns, and knocks shut just after (D-825)
  function turnPage() {
    if (app.screen === cardShown) return;
    const turn = cardTurn(cards, app.screen), was = cardShown;
    cards = turn.trail; cardShown = app.screen;
    if (turn.open && app.screen === 'chest') { sound.chest(true); setTimeout(() => sound.card(true), CREAK_MS); return; }
    sound.card(turn.open);
    if (!turn.open && was === 'chest') sound.chest(false);
  }
  const CREAK_MS = 300; // the page turns as the creak ends
  return { hear, pressed, hearLoud, turnPage, played: () => { ownSound = true; } };
}
