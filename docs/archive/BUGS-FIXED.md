# Fixed bugs

Bugs from `docs/BUGS.md`, moved here word for word once fixed (D-852),
newest first, each with the version that fixed it. Grep only.

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
