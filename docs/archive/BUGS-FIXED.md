# Fixed bugs

Bugs from `docs/BUGS.md`, moved here word for word once fixed (D-852),
newest first, each with the version that fixed it. Grep only.

Fixed in 0.3.446 (D-1010):

**B-013 · 2026-11-18 · DECONSTRUCT under the bag's slots, on the smallest view**
Found while testing H-68 (0.3.426), not seen in play: on the stash
chest's card on the smallest upright view (176 × 221 game px), the
bag's last rows of slots lie over DECONSTRUCT, so most taps on it pick
a slot. A phone's view is bigger; whether any phone gets so small is
not known. To look into at its own step.

Fixed in 0.3.439 (D-1003):

- **F-9 · A bump on the surface stalls the screen.** Each chop or dig
  bump, and anything else that changes the room (the first turn's
  `day` too), repaints the whole woods room and its border
  (`frame.js:195-205`, `drawRoom`, `drawBeyond`): about 0.1 s on
  Claude's machine, 0.4 s on the simulated slow phone. It is why
  perf.js's surface walk read 57 ms (H-73): it was chopping a tree.
  Fixes: repaint only the tiles that changed, and their neighbours; or
  keep the grass and rock painted once and draw the changed tiles over.

Fixed in 0.3.438 (D-1001):

- **F-10 · Older saves' arenas are never brought up to date.** The save
  format stayed at 37 (`save.js:33`), so an arena kept in an older save
  keeps its old shape: from 0.3.394, with all 4 braziers lit, the door
  is open and the Lampeater alive, so the hero walks down past the fight
  and never gets Leap; from 0.3.395 to 0.3.403, a Lampeater beaten
  before Leap was given leaves no find, so that journey can never learn
  Leap; before 0.3.413, the fight starts with no gloamlings until the
  hero leaves by a fall. Fixes: an upgrade step to format 38 lays Leap's
  find where it fell, or seals the door, cools the braziers and gives
  the brood, as `wholeAgain` does; or the same three checks each time
  the hero comes into the arena.

Fixed in 0.3.394 (D-952):

- **F-6 · A catch at half owes no extra snuff.** When the blow that takes
  the Lampeater to half its hearts lands on a catch's first turn, the
  catch is not counted as begun after half (D-947), so it owes 1 snuff,
  not 2: fewer snuffs and gloamlings than the rule says
  (`snuff.js:30` reads `was.halved`, set only on line 29). Fixes: check
  `next.halved` there; or set half before the turn's blows.
- **F-7 · The spear flashes on a Lampeater its blow sank into.** The
  spear's second tile (and the Warden's Fist's knock) gives no `sank`
  mark, so the Lampeater in the dark behind a gloamling flashes white and
  sounds a hit while taking none (D-941) (`turn.js:188`, `main.js`'s
  `app.hit`). Fixes: `strike` reports `sank` for the one behind too, left
  out of the flash; or no flash for any creature whose hearts didn't drop.
- **F-8 · After the #lampeater link, nothing is saved in that tab.**
  `app.benchLink` is set once and never cleared, so a New journey or a
  profile picked after the link's fight is never saved
  (`main.js:589`, `main.js:135`). Fixes: clear it in `newJourney` and
  when a profile loads; or reload the page without the link on leaving
  the fight.

Fixed in 0.3.378 (D-936): B-011, its second part: several kinds on one tile.

Fixed in 0.3.377 (D-935): B-012.

**B-012 · 2026-11-15 · The stash chest's words run off its foot on a PC**
Found by the text-fit test once it tried PC screens (B-010, D-933): full
screen at 3840 × 2160 and at 1366 × 768, the stash chest card's last line
under a chosen find ("Tap to move to the chest.", "…to the bag.") runs
below the card's bottom edge, for many finds.

Fixed in 0.3.376 (D-934): B-011, its first part; several kinds on one tile is Q-110.

**B-011 · 2026-11-15 · A felled tree's wood falls in three spots** The
owner doesn't like that a felled tree drops its wood on three different
tiles, when wood can stack. The owner's idea: items stack on the ground,
and one tile can hold several kinds at once ("I drop 5 wood, 3 rat
tails, and 4 healing herbs in the same spot, they will all be there").
How to show that a tile holds more than one kind is open. Today one tile
holds one stack, and a drop onto a find swaps them (D-546).

Fixed in 0.3.375 (D-933): B-010.

**B-010 · 2026-11-15 · Things overlap on a big PC screen** On a PC, in
Microsoft Edge full screen at 1920 × 1080, some of the screen overlaps.
One example: in the bag, with Healing Herb picked, the green flask's
picture sits right over the word DROP.

Fixed in 0.3.374 (D-932): B-009.

**B-009 · 2026-11-15 · Lines at the bottom stay too long** "Any message
that appears on the bottom stays for too long." The owner's idea: rather
than always wait for a number of turns (or another trigger), it goes
after a few seconds of real time, whichever comes first.

Fixed in 0.3.373 (D-931): B-008.

**B-008 · 2026-11-15 · The round map's dark circle** With the lantern off
and all dark, the round map is barely visible, which the owner likes, but
"there is this circle around the character filled in and darker than the
rest of the map", the hero a bright blinking dot. "That dark circle
around the player doesn't look right." (The spot is D-920's.)

Fixed in 0.3.372 (D-930): B-007, and B-006 closed, not a bug.

**B-006 · 2026-11-15 · Flyers stopped by things to pick up** "Flying
enemies should be able to move over objects that can be picked up."

**B-007 · 2026-11-15 · The boon menu comes too suddenly** "Upon using a
different waystone and going home, the boon menu immediately appears and
it feels kind of abrupt." The owner's idea: a select boon button that
appears while the hero is on the plate just after coming home; walking
off and back on the plate opens the boon choice, so the button isn't
needed again. It could also be a setting, button or automatic.

Fixed in 0.3.358 (D-915):

- **F-5 · An empty reward read aloud.** The two goals ticked without a
  reward (H-10) read "done, ." to screen readers (`goals.js:197`).
  Fixes: leave the reward part out; or say "done, no reward".

Fixed in 0.3.357 (D-914):

- **F-4 · Copies of an unreadable save pile up.** Each load of a broken
  or newer save copies it aside again (`aside.js:7`, `save.js:132`),
  which could fill storage. Fixes: skip the copy when the newest one is
  the same; or keep one copy per save.

Fixed in 0.3.356 (D-913):

- **F-3 · Kind Herbs' words.** "Herbs, potions and fish heal 1 heart
  more" (`boons.js:25`), but heartcaps and gloamberries do too
  (`boon.js:38`). Fixes: the words cover all food; or the rule keeps to
  herbs, potions and fish.

Fixed in 0.3.355 (D-912):

- **F-2 · The oil's "After" shows too much.** A pour that passes a turn
  burns that turn's oil first (`bagturn.js:48`), which the preview
  (`numbers.js:85`) leaves out: at 0.467 it shows 10 segments, the pour
  gives 9 (against D-908). Fixes: take off one turn's burn when the pour
  passes a turn; or mark "After" as near.

Fixed in 0.3.354 (D-911):

- **F-1 · Flyers over things can't be hit.** A bat, lampmoth or lure
  wisp over a workbench, stash chest, garden bed, the bed by day, a
  campfire, a bedroll from dusk or a cold brazier: walking into it opens
  the thing's card, not a strike (against D-901). `panelBeside` and
  `campAsks` (`bagturn.js:273`) come before `step()` in `main.js:250`.
  Fixes: no card while a creature is on the tile; or check for a flyer
  first in `tryStep`.

Fixed in 0.3.343 (D-898):

**B-005 · 2026-11-14 · Built things look like trees on the map** The
chest and the workbench are the same colour on the maps as the trees.
The owner: that should change.

Closed in 0.3.304, works as decided (D-859):

**B-004 · 2026-11-12 · Daylight shows unseen rooms on the map** In
daylight, the other surface rooms show on the map, even ones the hero
has never been to.

Fixed in 0.3.302 (D-857):

**B-003 · 2026-11-12 · A burrowed mole traps the hero** In the home
room, a mole sometimes chases and traps the hero and never comes above
ground: it stays burrowed, and the hero can't walk over it. The owner's
ideas: maybe the hero could walk over a burrowed mole, and maybe the
mole could sometimes run away. The owner also feels the mole comes at
the hero from too far away, and asks: does it have a sight limit?

Fixed in 0.3.301 (D-856):

**B-002 · 2026-11-12 · Sleeping ends a fight** The hero can sleep in a
bed while a bat and a lampmoth chase the hero; when morning comes the
creatures vanish at once, so it is an easy way out of a fight.

Fixed in 0.3.300 (D-855):

**B-001 · 2026-11-12 · The Peddler isn't home after his rescue** Once
the hero rescues the Peddler, he doesn't show up in the home room. The
owner: he should be nearby the home waystone.
