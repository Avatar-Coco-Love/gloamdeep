# Drop and bigger bags (D-545 to D-548)

Moved unchanged from `docs/DECISIONS.md` at 0.3.15 (D-551), when it
would pass 12 KB: Drop first, then the Pouch and the Big Bag, and
fitting a bigger bag on screen.
These are still in force unless marked superseded. Grep for an ID or
topic; never read this whole.

---

**D-545 · 2026-11-01 · Drop first, then bigger bags** (the owner's picks,
all recommended; narrows D-418) Dropping things comes first, as its own
step (D-546); bag upgrades are a later step. They come in two: a Pouch
takes the bag from 6 slots to 9, then a Big Bag to 12, both made at the
workbench from hides (*e.g.* Rat Tails, Mole Fur); recipes and looks are
shown at that step.

**D-546 · 2026-11-01 · Drop** (the owner's picks, all recommended) Every
item in the bag has a Drop button, at the bottom left of the item's side
(a row up when the card is too narrow), and X on a keyboard. It sets the
whole chosen stack down on the hero's tile, free (no turn passes), with
"You set it down." Stepping back onto it takes it all back, never eaten
or held, and it never grows back; what doesn't fit stays, "Your bag is
full." Dropped while standing on a find, the find comes into the bag in
its place: a swap. D-539 and D-540 moved to
`archive/DECISIONS-CREATURES-2.md`, word for word.

**D-547 · 2026-11-01 · The Pouch and the Big Bag** (the owner's picks,
all recommended; builds D-545; mock-up: https://claude.ai/artifact/4aCZQTvAoyCAsaFCiu9jzh) The Pouch takes 4 Rat Tail
and 2 Spider Silk, the Big Bag 4 Mole Fur and 3 Spider Silk. The Pouch
is a round rat hide pouch tied with a grey cord, the Big Bag a mole fur
backpack with a copper buckle (look A of each). Made at the workbench,
it never goes in the bag: the bag grows at once, a turn passing, with
"Your bag holds 9 now." (12 for the Big Bag), and stays that size for
good. The Big Bag's line shows on the workbench only once the Pouch is
made; with both made, neither shows (Claude's choice, the owner may
change it). The other lines are Claude's, the owner may change them.
D-541 and D-542 moved to `archive/DECISIONS-CREATURES-2.md`, word for
word.

**D-548 · 2026-11-01 · Fitting a bigger bag** (the owner's pick,
recommended, over the 3-wide grid first picked; found while planning:
three rows of today's slots don't fit a sideways screen) The Pouch's 9 slots are a
3 × 3 grid, the Big Bag's 12 a 4 × 3, the chest's shape. Above 6 slots,
each slot is 26 pixels, not 30, the sprites the same size; the held slot
stays where it is. It is the same on the bag's, chest's and peddler's
cards.
