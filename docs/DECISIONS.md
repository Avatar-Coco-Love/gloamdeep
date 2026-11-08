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

**D-698 · 2026-11-08 · Flasks, the third Feat** (the owner's picks, all
recommended; builds D-695, D-697, narrows Q-055 and Q-057) The third
Feat reads Flasks poured, reached at 5, 25 and 100 flasks and paying 1,
2 and 3 Glints as every set does, smaller than Beaten's since a flask is
poured less often than a creature is beaten. On the Feats tab and in its
note it is named Flasks ("Feat reached: Flasks 5. +1 Glint."), not
Flasks poured, so its row fits the upright card; Records keeps Flasks
poured. Flasks poured before this count. The owner wants Glints to match
the shop: with 18 to earn and 9 of patterns to buy, new looks come next,
each kind its own step (more cloak patterns, then lantern looks, then
hats or hoods), Claude showing a set and the owner choosing which join.
D-688 moved to `archive/DECISIONS-BIOME-1.md`, word for word.

**D-699 · 2026-11-08 · The eleventh audit** (the owner's picks, all
recommended) At 0.3.152, nothing visible changed. A conversation's start
reads 9.7 KB, not 10.6. The in-game history's stage 0.3 file is split
word for word: 0.3.0 to 0.3.75 go to `src/core/history-0.3-1.js` (78 KB
to 40 and 39). D-689 to D-694 move to `archive/DECISIONS-RELICS.md` and
D-660 to `archive/DECISIONS-AUDITS.md`; Q-037 and Q-038 to
`OPEN-QUESTIONS-2.md`; TECH's "Adding content" to `TECH-2.md`;
PROGRESS's ideas for later to `RESEARCH-2.md`; ticked step 20 is
archived; all word for word. One bug hunt read the code since 0.3.113
(Relics, Feats, Glints); its findings are listed for the owner to pick
from (https://claude.ai/artifact/MqecMUebWQKqaiK9gPPMBH), each fix its own small step with a test. The next audit is at
0.3.192.

**D-700 · 2026-11-08 · Three more cloak patterns** (the owner's picks,
all recommended, from a mock-up,
https://claude.ai/artifact/H1tbjmS1PxQxBkWLX9fdCV; builds D-515, D-533,
D-695, D-698, narrows Q-055) Three of nine drafts join, each in its own
colours: Tiger (rust with dark stripes from both sides), Stars (night
indigo with bone and sky specks) and Moth (sand with two eyespots, a
pale middle in each). Each costs 3 Glints, so the six patterns cost 18,
what the three Feats pay. They are the CLOAK tab's fourth row, and every
tab keeps as many rows. On a view too short for four rows (the menus'
176 × 221 picture upright), the boxes drop their names. While a pattern
is tried on, the note takes the big hero's name line instead of
covering the boxes: "Tiger: 3 Glints. You have 4.", adding "Earn more
from Feats." with too few, wrapping up over the floor's foot.
