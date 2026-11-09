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

**D-732 · 2026-11-09 · A playbook of how we work** (the owner's picks,
all recommended) The owner wants this project's way of working kept for
future projects. `docs/WORKFLOW.md` gathers it in one place: the steps
of a step, each habit and why, what changed along the way, and how to
start a new project. Each audit adds what that stretch taught us about
working together. Built now as its own step, nothing visible changed.

**D-733 · 2026-11-09 · A bigger surface, the plan** (the owner's picks,
all recommended but where a fall wakes; builds D-182 to D-184, answers
Q-081) The surface grows to Hearthwood's 3 × 3 rooms, mountains in the
north row, woods elsewhere, home in the centre (D-182, D-183). A new
journey no longer begins in the crypt nor at home or the cave: the seed
picks one of the south woods rooms, never the cave's, and the hero walks
north to find the waystone. A fall wakes the hero (the owner's own
answer): in the last bed slept in; with none, at the home waystone once
woken; otherwise in the room where the journey began. The rooms differ:
mountain rooms, and woods from thick to open glades, the seed picking.
The order, one step each: 1 the 9 rooms, all woods, walking off an edge
into the next; home stays today's woods room, so what was set down keeps
its place, and the cave mouth moves to a room beside home (D-184); 2 the
south start, its teaching goal's words with it; 3 waking after a fall
(supersedes D-119's crypt when built); 4 mountain rooms; 5 thick woods
and open glades. Nothing is built yet. D-712 and D-713 move to
`archive/DECISIONS-GOALS.md`, word for word.

**D-734 · 2026-11-09 · Hearthwood's 9 rooms built** (the owner's picks,
all recommended; builds D-733's step 1, opens Q-087) The surface is
Hearthwood's 3 × 3 woods rooms, home in the centre. Every room is joined
to every room beside it, 12 joins, each a path 3 tiles wide through the
edge trees, at the same spot on both sides, the seed picking where, kept
3 tiles from the corners; the fewest trees are cut from it to the room's
open ground. Claude's calls: home grows as before, so its trees stay,
and an older save's home keeps everything, only its mouth and rocks
made trees and its paths cut; the cave mouth stands in the room beside
home the way the seed picked (D-184), on that room's far edge, the same
spot along it, so the crypt is reached as before; only home has the
waystone; every woods room has its sticks, branch, pond and bush, each
pond holding the Pond Minnow. D-705 and D-706 move to
`archive/DECISIONS-GOALS.md`, word for word.

**D-735 · 2026-11-09 · Where a journey begins** (the owner's picks,
recommended but where noted; builds D-733's step 2, answers Q-087) A
start is one entry in the registry (`src/core/starts.js`): its rooms,
its tile, the lantern, the opening card's words and its goal rules, so
a later start is a new entry; its own aims beyond teaching are settled
at that start. The one start, South woods: one of the south row's rooms,
the seed picking, never the cave mouth's; the hero on the open tile
nearest its middle; by day, so the lantern starts off (the owner's own
answer). The card: "You wake among the trees of Hearthwood." / "Your
lantern is cold; keep its oil for the dark." / "Something waits below."
"Find the waystone" shows from the first turn, its how line "Home is in
the middle of the woods."; "Go home to the woods" never shows; every
other goal keeps its own moment. Until step 3, a fall wakes where the
journey began, a Hardcore one starting there again. Next, the owner's
own idea: a teaching goal "Light your lantern" / "Tap the lantern, or
press L.", shown at dusk or on stepping into the dark with it off, done
once lit. Claude's calls the owner may change: a start's skipped goal
is never paid; the tile is one the room's paths reach, with nothing on
it. Partly supersedes D-628's words and D-119's crypt. D-727 and D-728
move to `archive/DECISIONS-PACK.md`, word for word.

**D-736 · 2026-11-09 · Light your lantern** (the owner's picks, all
recommended; builds D-735's goal) "Light your lantern" / "Tap the
lantern, or press L." shows when daylight no longer lights the room:
halfway through dusk under the sky, or on stepping where the sky doesn't
reach. It is done once the lantern is lit, by hand or By itself, paid
and gold. A lantern lit before then, by day or from a crypt start, ticks
it quietly, so every journey has it. While the dark is here and the
lantern is off, it goes ahead of any goal waiting, as the ember's does.
Claude's call the owner may change: switching the lantern, which passes
no turn, checks the goals at once.

**D-737 · 2026-11-09 · Waking after a fall** (the owner's picks, all
recommended; builds D-733's step 3, supersedes D-119's crypt and D-735's
"until step 3") A Normal or Gentle fall wakes the hero in the last bed
slept in, on the tile they lay down from; with something there now, on
the nearest open tile beside the bed. With no bed, on the home
waystone's plate once it is woken, no boon offered until the hero steps
off and back on. Otherwise in the room where the journey began, on its
tile. Taking the bed down forgets it until it is slept in again. The
fall line stays "You fall, and wake again." Hardcore still begins the
world again. Claude's call the owner may change: the code is
`src/core/waking.js`.

**D-738 · 2026-11-09 · Mountain rooms** (the owner's picks, all
recommended but the rock's look; builds D-733's step 4) Hearthwood's
north row, every seed, is mountain rooms: rocky slopes, the woods' grass
with rock where the trees would stand and a few lone trees inside. Each
holds 3 grey boulders, as a Cave room does (D-282), and the woods' 3
sticks and fallen branch; no pond or bush. The three are made the same
way, only the seed differing. The next step, the owner's own picks:
outside rock drawn rounded, as cave walls are, and rock going on past a
mountain room's edges; till then it is drawn as the mouth's rocks.
Claude's calls the owner may change: a tree 2 or more tiles in from the
edge stays a tree 1 time in 4; a room grows as a woods room, its paths
cut, then its trees made rock, so the paths stay where they were; a
mountain room already visited in an older save stays woods; on the map,
rock and boulders on the surface show in the cave rock's grey.

**D-739 · 2026-11-09 · Rounded rock** (the owner's picks, all
recommended; builds D-738's next step, added to D-733's plan before its
step 5) The surface's rock,
in the mountain rooms and by the cave mouth, is drawn rounded, as the cave
walls are, but lit by day: a sunlit grey top, not the cave's near-black,
and fuller, so a lone rock stays a lump, not a chip. Trees stand in front
of the rock. Past a mountain room's edge the rock goes on, but for a
grass passage straight out from each way on. The cave mouth's rocks are
only rounded; the mouth's own look waits for its step. Next, the owner's
picks: after the audit, a new cave mouth, one of a few looks the seed
picks, shown first as mock-ups (rock arch in a mound, an overgrown mouth,
a hole in the ground, a fallen-stone doorway); the outside art polished
in steps of its own. Claude's calls the owner may change: a room's rock
goes on past its edge when its edge holds rock and no tree or stump, so
a mountain room an older save keeps as woods keeps its trees there; the
code is `src/render/outcrop.js`.
