# Drop, bigger bags and gear slots (D-545 to D-548, D-552, D-554, D-556)

Moved unchanged from `docs/DECISIONS.md` at 0.3.15 (D-551), when it
would pass 12 KB: Drop first, then the Pouch and the Big Bag, and
fitting a bigger bag on screen. D-552, gear slots and the Tool slot,
moved the same way at 0.3.20 (D-557), D-554, Take off, at 0.3.22
(D-559), and D-556, Store on the chest's card, at 0.3.23 (D-560).
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

**D-552 · 2026-11-01 · Gear slots and the Tool slot** (the owner's ask
and picks, all recommended; builds D-252, D-458, D-479; supersedes
D-480's "never held"; mock-up: https://claude.ai/artifact/B9shG61XbWhyfXUBiyyYAg)
The hero has five gear slots: Weapon (the hand), Tool, Armour and two
Charms, the owner's list, with D-458's one armour piece and two charms.
They are one row of small slots across the top of the bag's card, where
HELD was (layout A); an empty one shows its kind faintly (a knife, the
pick, the vest, a charm), with "GEAR" after the row when there is room.
The item's words start under the row; the bag's slots keep their size.
The Stone Pick goes in the Tool slot: Hold on it in the bag puts it
there, a turn, "You hold the stone pick.", the one there swapping into
its bag slot, as a weapon does; made with the slot empty it goes
straight in. A copper vein breaks only with the pick in that slot. Its
second Look line becomes "Hold it to use it." A save upgrades with its
pick moved from the bag into the slot (format 9 to 10). Tapping the row
does nothing yet. D-549 and D-550 moved to
`archive/DECISIONS-CREATURES-2.md`, word for word.

**D-554 · 2026-11-01 · Take off** (the owner's picks, all recommended;
the first step of D-553, builds D-552) A gear slot is chosen by a tap,
framed in gold as a bag slot is, its piece's name, its slot's name and
its Look line on the item side. The Weapon's and the Tool's show TAKE
OFF in the bottom right corner: the piece goes back into the bag, free,
"You put the spear away." (knife, stone pick alike), "Your bag is full."
with no room, the slot kept chosen. A worn piece chosen shows its words
and no button (D-484). On a keyboard, Up from the bag's top row reaches
the gear row, Left and Right move along it, Down goes back, Enter takes
off. With the hand empty the hero hits with the lantern, as before.

**D-556 · 2026-11-02 · Store on the chest's card** (the owner's picks,
all recommended; the first button of D-555) STORE sits in the chest
card's bottom right corner, where Take off is on the bag's, apart from
DECONSTRUCT. It moves as much as fits; when some must stay in the bag,
"You store 2 stacks. The chest is full." On a keyboard, Down from the
bag's bottom row reaches STORE (from the chest's, DECONSTRUCT), Up goes
back, Left and Right go between the two buttons.
