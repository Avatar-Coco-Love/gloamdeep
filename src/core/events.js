// § events: what happened this turn, as a short list on the state (D-263,
// D-267). The turn rules write it; sounds read it now, and later Records,
// quests and feats. Plain data, no drawing. Each passed turn, and each free
// action (the lantern's switch), starts a new list; what follows in the same
// action (the lantern or a flask by itself) adds to it.
//
// The kinds, each { type, ...details }:
//   step                 the hero walked onto a new tile
//   hit { id, held }     the hero hit creature `id`, with the item held (or null, the lantern)
//   miss { id, held }    the hero, stiff, swung at creature `id` and missed (D-759)
//   beat { id, unmet, spawned }  that creature was beaten; `unmet` when not met before, in the dark (D-630); `spawned` by the dev tools (D-720)
//   meet { id }          creature `id` was met: lit and showing itself for the first time (D-630)
//   bite { id, hurt }    creature `id` bit, taking `hurt` hearts (god mode keeps them, D-625)
//   poison { hurt }      poisoned's count reached a hurt, taking `hurt` hearts, 0 at 1 heart (D-654; god mode keeps them)
//   drink { id, oil }    creature `id` drank `oil` from the lantern instead of biting (D-606; Endless oil keeps it, D-626)
//   wake { id }          the hero bumped creature `id` awake from its disguise (D-368)
//   fall                 the hero fell (D-119)
//   lantern { lit }      the lantern went on or off
//   enter { place }      the hero came into another room
//   found { place }      a room never stood in before (D-245)
//   level { n }          level n reached (D-246)
//   take { id }          an item went into the bag or the hand
//   eat { id }           a herb was eaten, or a heartcap or potion from the bag (D-308, D-309)
//   pour { id, by, spawned }  a flask was poured, by 'hand' or by 'self' (D-249); `spawned`, one the dev tools made (D-720)
//   torch                a torch was lit (D-121)
//   chip { id, n, broke }  the hero bumped deposit `id`, its n-th bump; the last breaks it, `broke` (O2, D-825); rubble too (D-491)
//   free { id }          person `id` was freed from the rubble (D-491)
//   leave { id, x, y }   person `id`, freed, left x, y for home (D-496)
//   arrive { id, x, y }  person `id`, gone home, beamed in at x, y as the hero came (D-496)
//   set { id }           tile `id` was set down from the bag, the workbench's bench (WB2)
//   hold { id }          weapon `id` went from the bag into the hand (D-479)
//   sell { id, coins }   one of item `id` was sold at home for `coins`, free (D-494)
//   plant { id }         seed `id` was planted in a garden bed (D-566)
//   shelve { id }        relic `id` was set on the shelf from the bag (D-693)
//   kindle { id }        cold ashes were lit with the lantern's oil, now tile `id` (D-757)
//   cast                 the fishing line was cast, with a plop (D-613)
//   catch { id }         fish `id` was pulled from the water, with a splash (D-613)
//   feed { id }          `id`, Bat Guano, was fed to a sprout in a garden bed (D-569)
//   stoneWake { x, y }   the waystone's plate at x, y woke as the hero stepped on it (D-591, D-662)
//   travel { place }     the hero went by waystone to place `place`, free (D-593)
//   spit { id }          creature `id` spat a glob (spit.js, D-688); a glob's hit on the hero is a `bite`
//   splash { x, y }      a glob broke or hit, at x, y (D-688)
//   scatter { id }       the hero stepped onto creature `id`'s pile of bones and scattered it (D-731)

// (state, type, details) → the state with that event added to this turn's list
export const note = (state, type, details) => ({ ...state, events: [...state.events, { type, ...details }] });
// A new, empty list, for a turn or a free action starting
export const fresh = (state) => ({ ...state, events: [] });
// The events an action brought, from the state before it to the one after:
// those added to the list it had, or a new list; none when the action changed
// nothing, as a bump into a wall (D-043)
export function eventsSince(before, after) {
  const was = before.events, now = after.events;
  return was.every((e, i) => now[i] === e) ? now.slice(was.length) : now;
}
// Whether a list holds an event of that type
export const has = (events, type) => events.some((e) => e.type === type);
