# The garden (D-562, D-566 to D-569)

Moved unchanged from `docs/DECISIONS.md` at 0.3.32, the eighth audit
(D-570): the garden in six steps, all built (step 14). D-563 to D-565
are in `DECISIONS-CREATURES-2.md` and `DECISIONS-GLOAMBERRY.md`.
These are still in force unless marked superseded. Grep for an ID or
topic; never read this whole.

---

**D-562 · 2026-11-02 · The garden in six steps** (the owner's picks, all
recommended; builds D-452, D-530, D-531) Each its own step, one visible
change each, starting in the next conversation: a Gloamberry seed; a
place to plant it; planting, a sprout showing; growing while the hero
is below; picking what grew; then guano (D-539) and water (Q-071). The
seed is made in the bag from Gloamberries with Make, the oilcap's way.
The place is a garden bed, made at the workbench and set down on the
surface the chest's and bed's way, holding one plant. Costs, names,
looks, lines and numbers are asked at each step. D-553 and D-555 moved
to `archive/DECISIONS-BAGS.md`, word for word.

**D-566 · 2026-11-02 · Planting** (the owner's picks, all recommended;
garden step 3, builds D-562, D-565; mock-up:
https://claude.ai/artifact/QueSWrh1aiDsgA8eCocXqB) Bumped, day or night,
the garden bed opens its card, now named "Garden bed", with PLANT and
DECONSTRUCT in place of Yes and No, Plant picked; the buttons widen to
fit. Plant puts 1 Gloamberry Seed from the bag in the bed, a turn,
saying "You plant a gloamberry seed."; with no seed, or one already in,
Plant is dim and does nothing. A planted bed shows a sprout, look A, two
round leaves on a short stem above the rim, and its card's note is "A
sprout grows here." instead of "Nothing grows here yet." Deconstruct
takes the bed back with no further ask, a turn; a planted one gives back
its seed too, when the bag has room, else the seed is lost. D-563 moved
to `archive/DECISIONS-CREATURES-2.md`, word for word.

**D-567 · 2026-11-02 · Growing** (the owner's picks, three recommended;
garden step 4, builds D-562, D-566, partly supersedes D-452; mock-up:
https://claude.ai/artifact/1qvVPSZohApfe2vV1De75i) A planted sprout
grows a day after planting, 300 turns, the wild bush's time. Every turn
counts, on the surface too, not only below: the owner's wish, so a plant
watched never stalls. Grown, it is look A, a small gloamberry bush with
ripe berries over the bed's rim, and its card's note is "Gloamberries grow
here."; Plant stays dim. Taken down, it gives back the bed and the seed, as
a sprout does. Dev mode's Room section gets Grow, every planted bed's time
up, one in this room growing at once. D-564 moved to
`archive/DECISIONS-GLOAMBERRY.md`, word for word.

**D-568 · 2026-11-02 · Picking** (the owner's picks, all recommended;
garden step 5, builds D-562, D-567) The grown bed's card shows PICK and
DECONSTRUCT, Pick picked, in place of Plant. Pick gives 3 Gloamberries,
one more than a wild bush, a turn, saying "You pick three
gloamberries."; the bed goes back to a sprout that grows again 300
turns later, so a seed is planted once. With no room, the wild bush's
"You can't carry more gloamberries.", free, the berries kept; with room
for fewer, the rest lies on the nearest open tiles, the wild bush's way.
D-557 moved to `archive/DECISIONS-BAGS.md`, word for word.

**D-569 · 2026-11-02 · Guano feeds the garden** (the owner's picks, all
recommended; garden step 6, builds D-539, D-562, D-567) A sprout's card
shows FEED and DECONSTRUCT, Feed picked, in place of Plant. Feed puts 1
Bat Guano from the bag on its soil, a turn, saying "You feed the soil
with guano."; the fed sprout shows a few guano flecks on the soil and
grows in half the time, 150 turns, counted from planting, so fed late it
grows at once. With no guano, or fed already, Feed is dim and does
nothing. It lasts one growing: picked, the bed is a plain sprout again.
Taken down, the guano is spent. Water waits for a way to carry it (Q-071
stays open), and the garden is done for now. D-561 and D-565 moved to
`archive/DECISIONS-GLOAMBERRY.md`, word for word.
