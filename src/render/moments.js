// § moments: the sounds of a turn read from what changed, beside main.js's `hear` (D-833): which
// voices of render/sound.js play, each [voice, arg], from the state before an action, the state
// after it and its events (events.js). The game's own rules stay as they are; this only listens.
// A fall slides and thuds (its waking is main.js's, at the fall's deepest dark); a new floor rumbles,
// a room never stood in before rings a small note, travel by waystone hums. A herb or heartcap eaten
// crunches, a potion drunk gulps; a person leaving for home or arriving shimmers; sleeping breathes out.
// The creatures' own sounds: a pack's squeaks as its warning line is said, a mimic's jolt or a warden's
// stone as it wakes, a scorpion's tail raised or a warden's fists (its stone too), a mole digging down or coming up, a bone rat's bones
// falling or standing up again, a glob spat and its splat. "You can't carry more" plays the Can't tock (D-819).
import { get } from '../core/registry.js';
import { LINES } from '../core/lines.js';
import { depthOf } from '../core/room.js';

const has = (events, type) => events.some((e) => e.type === type);
const count = (enemies, mark) => enemies.filter((e) => e[mark]).length;
const said = (before, after) => (after.line && after.line !== before.line ? after.line.id : null);
export const carryMore = (id) => !!LINES[id]?.text?.startsWith("You can't carry more");

export function moments(before, after, events) {
  const out = [], fell = has(events, 'fall'), line = said(before, after);
  if (fell) out.push(['fall']);
  if (has(events, 'travel')) out.push(['hum']);
  else if (!fell && has(events, 'enter') && depthOf(after.place) !== depthOf(before.place)) out.push(['floor']);
  else if (!fell && has(events, 'found')) out.push(['room']);
  const eaten = events.find((e) => e.type === 'eat');
  if (eaten) out.push(['eat', get(eaten.id)?.verb === 'DRINK']);
  if (has(events, 'leave') || has(events, 'arrive')) out.push(['shimmer']);
  if (has(events, 'sleep')) out.push(['breath']);
  if (line === 'ratPack') out.push(['pack']);
  const woke = events.find((e) => e.type === 'wake');
  if (woke) out.push([woke.id === 'warden' ? 'statue' : 'jolt']);
  const up = events.find((e) => e.type === 'raise');
  if (up) out.push([up.id === 'warden' ? 'statue' : 'tail']); // a warden's fists up: heavy stone shifting (D-885)
  if (after.place === before.place && !fell) { // the same room's creatures, before and after
    const was = before.enemies, now = after.enemies;
    if (count(now, 'under') > count(was, 'under')) out.push(['burrow', false]); // digs down
    else if (count(now, 'dug') > count(was, 'dug')) out.push(['burrow', true]); // comes up
    if (count(now, 'pile') > count(was, 'pile')) out.push(['bonesFall']);
    else if (count(now, 'pile') < count(was, 'pile') && !has(events, 'scatter')) out.push(['bonesStand']);
  }
  if (has(events, 'spit')) out.push(['spit']);
  if (has(events, 'splash')) out.push(['splat']);
  if (carryMore(line)) out.push(['refuse']);
  return out;
}
