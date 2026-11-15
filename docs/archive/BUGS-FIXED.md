# Fixed bugs

Bugs from `docs/BUGS.md`, moved here word for word once fixed (D-852),
newest first, each with the version that fixed it. Grep only.

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
