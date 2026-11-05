# Research: travel, boons and the code for them

From research helpers working beside 0.3.48 (D-590), for the next waystone
steps (Q-080) and the boons (D-583, Q-077). Ideas only: nothing here is
decided, and no number here is the game's.

## How games do fast travel
- **Core Keeper:** a waypoint wakes when you stand at it; standing on one,
  you open the map and tap another woken one. Unfound ones don't show.
- **Hollow Knight:** pay once to open a stag station, ring its bell, a short
  tune; then travel is free, picked from a list of names over a small map.
- **Dark Souls:** a big "bonfire lit" banner and a whoosh. Not usable with
  enemies near. You arrive kneeling beside it.
- **Diablo II:** clicking a waypoint wakes it (it turns blue). One tab per
  act; unfound ones greyed out, so you see how many are left. You arrive on
  it, and the menu opens only on a second click, never by accident.
- **Terraria pylons:** tap one on the full map while near any pylon. They
  stop working with enemies close and during boss fights.
- **Valheim portals:** free, but ore can't go through: the one rule that
  keeps long trips for hauling.
- **Don't Starve:** the teleport staff costs sanity and gems, and fails
  underground.
- **Shattered Pixel Dungeon:** Lloyd's Beacon returns to a saved depth, with
  charges; it lands on the nearest open tile beside the spot.

What this suggests for Gloamdeep's open parts of Q-080:
- **The card:** a depth column (home at the top, then 2, 5, 8, every 4th),
  big for thumbs; or a plain list with unfound stones as "???" or greyed;
  or the real map with stone marks (fiddly on a phone).
- **Cost and blocking:** free, the oil being the pressure where you arrive;
  or a little oil; barred with a creature beside you or chasing you, so it
  is no free escape.
- **Arriving and opening:** arrive on the plate, the card opening only with
  a tap or key on it; or arrive beside the plate. Creatures shouldn't act
  before you can move.

## How games do "pick 1 of 3" boons
- **Hades:** 3 boons from one god, each with its own rarity; ones held are
  left out; strong ones need others first; an item redraws the offer.
- **Slay the Spire (Neow):** each option from a different kind: a small
  gift, a bigger one, a big one with a cost, a swap. The closest model.
- **Vampire Survivors, Balatro:** offers mix "upgrade what you have" and
  "something new"; skip, reroll or ban; Balatro pays for skipping.
- **Darkest Dungeon:** trinkets pair an upside with a downside.

Lessons: draw the 3 from 3 different kinds; never two of one boon; put one
boon with a cost in the pool; each must be felt within one trip, since
D-583's boons last until home; bend a rule rather than add "+1"; avoid a
must-pick (oil is life, so light boons need their own trade-offs); one
line of effect, plain words, the number in the registry. On a phone: 3
cards (stacked when narrow), an icon coloured by kind, a 2 to 3 word name,
one line, and a cost line in another colour; a small mark on the screen
shows the boon held.

Ideas per kind, for the owner to pick from (no numbers yet):
- **Light and oil:** the lantern burns slower; its light reaches farther;
  each flask pours more; a creature beaten gives a little oil; oilcaps
  more often; the lantern relights once when dry; *(with a cost)* brighter
  but burns faster.
- **Hearts and fighting:** an extra heart this trip; the first hit of a
  fight lands harder; herbs and heartcaps heal more; the first blow taken
  in each room turned aside; creatures wake later; *(with a cost)* harder
  hits, fewer hearts.
- **Finding things:** parts drop more often; rare drops more often; one
  more find in each room; finds glint beyond your light; one more from
  each bush or deposit; *(with a cost)* more finds, the lantern burns
  faster.
- **Getting around:** more of each room's map shown on entering; the way
  down shown; creatures notice you later; rough ground slows you less;
  once a trip, back to the last waystone; *(with a cost)* faster, but a
  dimmer light.

## The code for the next steps
- **The stamper (depth 2):** `landmarks.js` has the plan and `stamp`,
  `around`; the woods do it in `woods.js` (`joinedFrom` checks it is all
  reached). Cave rooms: `cave.js` `generateRoom`, its extras each on their
  own seed (`withPool`, `withMimic`); rooms are put together in `room.js`
  `placeFor`; a floor's rooms in `region.js` `layoutAt`; pick the room as
  `peddlerRoom` and `mimicRooms` do.
- **The travel card:** cards are listed in `input/cards/table.js` and
  drawn with `render/bag.js`'s helpers (`ways.js` is the simplest list); a
  new card is added in `frame.js` (`CLEAR_OVER`, `CARDS`, its draw),
  `main.js`'s tap list and `screens.js`'s `onTitle` list.
- **Travel itself:** `stairs.js` `arrive(state, to, there, spot)` moves the
  hero between rooms and floors; travel would call it with the plate as
  the spot, inside a turn as `turn.js` does.
- **Waking (built, D-591):** a tile with `wakes` turns into that tile when
  stepped on (`core/wake.js`); woken plates glow through `stairs.js`
  `glowsIn`, so travel can find them by tile.

## Sources
Core Keeper wiki (Map); hollowknight.wiki (Fast Travel); darksouls
wiki.fextralife.com (Bonfire, Lordvessel); diablo2.diablowiki.net
(Waypoint); terraria.wiki.gg (Pylons); pcgamesn.com (Valheim ore and
portals); dontstarve.wiki.gg (Telelocator Staff); the Shattered Pixel
Dungeon GitHub issue 1063; slaythespire.wiki.gg (Neow);
hades.wiki.fextralife.com (Boons); Roguelike Celebration talk "Victory
Choice Design in Roguelikes". Some rules are from general knowledge.
