# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`PR-CHECKLIST.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force: `archive/README.md`
says which file holds which IDs; grep there for an ID or topic.

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

**D-338 · 2026-10-25 · Audits lose nothing** (the owner's wish) Nothing
important, useful, educational or insightful is lost in a cleanup. Text is
moved word for word, never cut; only pointers, indexes and rules may be
reworded. Each audit compares every removed line with the whole repo and
lists, in its PR, each line not found word for word, with why.

**D-363 · 2026-10-25 · A content index and an adding checklist** (the
owner's picks, both recommended) `docs/CONTENT.md` lists every creature,
find, tile, light and place with its numbers, where it turns up and its
decisions, so proposals build on what exists. `TECH.md`'s "Adding content"
lists the files each kind of content touches. A PR that adds or changes
content updates both.

**D-431 · 2026-10-29 · How we work: one step a conversation** (the owner's
pick, recommended) The owner keeps choosing every question. Each
conversation does one step, ends with its handoff, and the next step
starts in a fresh conversation, so less is read again each time.

**D-518 · 2026-10-31 · An audit every 40 versions** (the owner's pick,
recommended; supersedes D-337's 20) The owner asked if audits help. The
start-of-conversation read stays near 11.5 KB (17 KB before the first),
but the size test already makes normal steps trim, and code splits are
outgrown in an audit or two, while 20 versions is about a day. So an
audit comes every 40 versions; the size test still guards in between.

**D-660 · 2026-11-07 · The tenth audit, part 1** (the owner's picks, all
recommended; the owner asked for a fuller audit) At 0.3.113, nothing
visible changed. A conversation's start reads 10.1 KB, as at the ninth.
Floor layouts are made about 5 times faster with the same floors (6,000
seed and depth pairs checked), and the slowest test is split in three
to run side by side: `npm test` 59 s to 35 s. Touch in play moves from
`main.js` (39 to 35 KB) to `src/input/touch.js`, word for word but for
`heldAt`. `CONTENT.md`'s finds move to `CONTENT-FINDS.md`, the second
half of `WORLD.md` to `WORLD-2.md`, word for word; D-648 to D-651 and
D-653 to `archive/DECISIONS-BIOME-1.md`; ticked steps 18 and 18b are
archived. Four bug hunts, a docs read-through and a phone speed check
read the code alongside: 19 bugs, about 30 stale doc lines and one
freeze on depth 2's first frame, listed for the owner to pick from
(https://claude.ai/artifact/FjFbsg9mGELYQB2aCap496); each fix is its
own small step with a test. The next audit is at 0.3.152.

**D-688 · 2026-11-08 · The Spit grub built** (the owner's picks, all
recommended; mock-ups: https://claude.ai/artifact/2VP35g4oZNwBYigfmoys1L;
builds D-659) Look A, a glowworm side on, a plump grub of bone-white
rings, its tail glowing venom green; it `glows` with a green halo. A
Grub Skin, about 1 in 2, sold for 1; a rare Glow Gland, sold for 5 as
every rare one is. Its new way `spits` (`spit.js`): the glob starts on
the tile beside it, so beside the hero with the lantern lit it hits at
once; a glob hurts a creature in its path as a blow does. Built in one
step, not two (changed in the open PR at the owner's word: the grub
should play as designed from its first version). Claude's drafts the
owner may change: a creature a glob beats leaves no drop and no
experience; armour never turns a glob aside; a glob breaks on a person
unharmed and flies over water; the grub turns to face where it spits; a
tap-walk stops at a spit; the names and lines. D-675 moved to
`archive/DECISIONS-AUDITS.md`, word for word.

**D-689 · 2026-11-08 · Relics from the old city** (the owner's picks,
all recommended; step 20 of D-482, builds D-465, D-469, D-633) Relics
are things left from Underhearth and the Lightkeepers, found, never
made, each with a line or two of story. Their boosts help the hero set
out (*e.g.* a find in the bag at a trip's start) or soften a fall (*e.g.*
one more find kept). They lie in hidden spots (the end of a hidden path,
a sealed old-city room) and in guarded rooms. The shelf holds every
relic found, each working once set there. The shelf comes first, built
at the workbench and set down at home, empty; biome 1's first relic,
next, keeps one find on a fall that would otherwise be lost. Each
relic's name, look, story line and place, and the shelf's recipe and
look, are proposed at their own steps. D-676 and D-677 moved to
`archive/DECISIONS-AUDITS.md`, word for word.

**D-690 · 2026-11-08 · The shelf** (the owner's picks, all recommended;
builds D-689) Look A, a tall wooden case in the trunk's browns, two
empty shelves. Made at the workbench from 4 Wood and 2 Stone, its last
slot (the panel still shows 12 at most, as only one bag upgrade shows
at a time); one carried; set down on the surface the bed's way.
Bumped, day or night, it asks "Deconstruct shelf?", "Nothing on it
yet.", No picked, as the bed by day; Yes puts it back in the bag.
Claude's drafts the owner may change: its lines and the tile's id,
`relicShelf`. D-678 moved to `archive/DECISIONS-AUDITS.md`, word for
word.

**D-691 · 2026-11-08 · The Lightkeeper's Locket** (the owner's picks,
all recommended; builds D-689, D-690) Biome 1's first relic is the
Lightkeeper's Locket, look A: a tarnished brass oval on a thin chain, a
tiny flame scratched on its face. Its story line: "Kept close, whatever
the dark took." (the owner picked "A Lightkeeper kept one thing close,
whatever the dark took.", too wide for the line strip). One per world
lies in a room at depth 4 the seed picks, never the stairs' room, on its
farthest free tile with a rat beside it guarding it, left once. Set on
the shelf, a Normal fall brings home the bag's stack the peddler would
pay most for. Three steps: found and carried (0.3.143), set on the
shelf, then the fall. Claude's drafts the owner may change: its lines,
the rat, the id `locket`. D-679 and D-680 moved to
`archive/DECISIONS-AUDITS.md`, word for word. Its rat and its look
superseded by D-692 (2026-11-08).

**D-692 · 2026-11-08 · The warden and the relics' look** (the owner's
ask and picks; supersedes D-691's rat and look) The locket's guard is a
new creature, the old-city warden, made by Underhearth's people to guard
their things: look A4 of six stone takes, an old cracked stone guard,
mossy, a chipped gold band, its eye slit violet. It stands asleep as a
statue, eyes dull, until bumped, then chases for 6 turns and stands still
again, the flask mimic's way; 4 health, a bite of 1 (recommended). Not
in the pool, no drop yet. Relics get their own glow, a violet halo with
a slow shimmer, and the locket look D: open, violet and gold, a flame
inside (all recommended). The warden first (0.3.144), then the look.
Claude's drafts the owner may change: its lines, the name Warden.
Mock-ups: https://claude.ai/artifact/SHECVsemXBRvSVV36HZtnK
D-681 and D-682 moved to `archive/DECISIONS-AUDITS.md`, word for word.

**D-693 · 2026-11-08 · The locket set on the shelf** (the owner's picks,
all recommended; builds D-689 to D-692) Bumped with the locket in the
bag, the shelf asks "Set the locket on the shelf?", "Kept close,
whatever the dark took.", No picked; Yes sets it there in a turn, "You
set the locket on the shelf." It stays: it never comes back off.
Bumped then, it asks "Deconstruct shelf?", "The locket rests here.";
Yes puts the shelf and the locket back in the bag together, or, with
no room for both, "Your bag is full." and both stay. The shelf shows
the locket small on its top shelf, open, with the relics' violet glow
and glint, look A of three. What it does there comes next. Claude's
drafts the owner may change: the tile's id, `locketShelf`.
Mock-ups: https://claude.ai/artifact/Fmovh4KgJNiBPcNY2YttmJ
D-683 and D-684 moved to `archive/DECISIONS-AUDITS.md`, word for word.

**D-694 · 2026-11-08 · What the locket does on the shelf** (the owner's
picks, all recommended; builds D-691, D-693) With the locket on a shelf
anywhere in the world, a Normal fall brings home the bag's stack worth
most to the peddler in all (his price × how many: 3 Venom Sacs beat 1
Mimic Heart); a tie goes to the stack first in the bag; with nothing he
buys, nothing is kept. The rest is left where the hero fell; a bag
holding only the kept stack is not left. The wake line names it: "The
locket kept Venom Sac ×3." (the owner picked it after the fall line;
both don't fit the strip, so it says it in the fall line's place).
Claude's drafts the owner may change: its words. D-685 moved to
`archive/DECISIONS-AUDITS.md`, word for word.

**D-695 · 2026-11-08 · Feats and Glints begin** (the owner's picks, all
recommended; builds D-284, D-467, D-516, narrows Q-055 and Q-057) A Feat
is one record's set of 3 tiers. The first is Beaten, named as its
Records line, at 10, 50 and 200 creatures. Each set's tiers pay 1, 2
and 3 Glints (6 a set). A cloak pattern (Zebra, Cow, Camo) will cost 3
Glints, all the same. The Journal gets a fourth tab, Feats, after the
Bestiary: the Glints in gold at the top, then a row a Feat as Records'
rows: its name, the count toward the next tier ("12 of 50") and 3 small
marks, gold once reached. Glints are worked out from the Records, so
creatures beaten before this count. Reaching a tier says "Feat reached:
Beaten 10. +1 Glint." On a card too narrow for one row of tabs
(upright), they go in two rows, as the How to play card's. Buying a
pattern with Glints is the next step. Claude's drafts the owner may
change: the note's words and the marks' look. D-686 moved to
`archive/DECISIONS-AUDITS.md`, word for word.

**D-696 · 2026-11-08 · Buying a pattern** (the owner's picks, all
recommended; builds D-516, D-533, D-695) On the Look card, a locked
pattern tried on turns RANDOM into BUY 3; pressing it spends the Glints
at once, with no asking, unlocks the pattern and wears it, and the
flame goes on to OK. The note says "Zebra costs 3 Glints. You have 4.",
adding "Earn more from Feats." with too few, when BUY is dim and does
nothing. A bought pattern is that hero's for good: no LOCK, RANDOM can
roll it. The Feats tab's gold number is the Glints left to spend.
Claude's calls the owner may change: a buy is kept even if the card is
then closed with the cross; the arrows keep the pattern tried on while
they are on BUY or OK. D-687 moved to `archive/DECISIONS-AUDITS.md`,
word for word.

**D-697 · 2026-11-08 · Deepest, the second Feat** (the owner's picks,
all recommended; builds D-695, narrows Q-057) The second Feat is
Deepest, named as its Records line, reached at depth 5, 10 and 20 and
paying 1, 2 and 3 Glints as every set does. Its row shows "3 of 5" as
Beaten's does, and reaching a tier says "Feat reached: Deepest 5. +1
Glint." Depths walked to before this count, as for Beaten; a dev jump
never does (D-232). Claude's call the owner may change: the Feats tab's
gap between names and counts is 16 pixels, not Records' 20, so the rows
fit the upright card. The owner is not sure yet whether Rooms found and
Torches lit belong in Feats or elsewhere (Q-057). D-659 moved to
`archive/DECISIONS-BIOME-1.md`, word for word.
