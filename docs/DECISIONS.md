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

**D-705 · 2026-11-08 · Teaching goals, the plan** (the owner's picks,
recommended where marked; builds D-629's first kind of quest and D-640,
opens Q-087) The game should teach its many systems. A teaching map
(https://claude.ai/artifact/5bSXQiKobcF8yNcf3tTQor) lists 32 systems,
where each is first met and what tells the player today: 9 taught, 16
half, 5 not (fighting; levels, embers and Growth; going home to the
woods; the waystone; the Journal), 2 to check in a playtest (sleep, the
map). Teaching goals come first for those 5, one at a time
(recommended), each appearing when it becomes useful: "beat a rat" once
a rat is seen; going up to the woods any time; finding the waystone,
then stepping on its plate to wake it; if no boon was ever held,
stepping off the home plate asks the hero to come back for one; the
first boon picked opens a glass card, like the opening card, saying
what boons are, with a Journal entry too. The goal shows as a small
line until done, unless something else is chosen; later, with several
waiting, the player may choose which to follow. Goals live in the
Quests tab (recommended, D-640), side quests joining later. A goal's
reward is rolled from a short list, the seed picking (recommended):
Glints, useful finds and so on. Goals already done in an older save are
ticked on loading and pay their reward, never shown (recommended).
The half-taught lines, finds saying what they are but not what next,
are fixed later at their own step (recommended). Nothing is built yet.

**D-706 · 2026-11-08 · The first teaching goals' words** (the owner's
picks, all recommended but the order; builds D-705, answers Q-087) From
a mock-up (https://claude.ai/artifact/1KHuhUs8hCtGHxYhaxeHJa). Six goals,
each worded as a goal in amber and one grey line saying how: "Beat a
rat" / "Walk into it to strike.", once a rat is seen; "Go home to the
woods" / "Take the stairs up from the crypt." (how line changed by
D-708, 2026-11-08), once the rat goal is done;
"Find the waystone" / "Old standing stones, near home.", on reaching the
woods; "Wake the waystone" / "Step on the plate in its middle.", once it
is seen; "Take a boon" / "Step back on the plate. Pick 1 of 3.", on
stepping off the woken plate with no boon ever held; "Spend your ember" /
"Tap here, then Growth.", at level 2, going ahead of any goal waiting.
The owner's own answer on the order: each goal's moment is its own, no
one rule for all; with two waiting, the older shows (Claude's call). The
goal line sits under the hearts panel, below the boon's mark, fading
with it; tapping it opens the Journal at its Quests tab. Done turns it
gold for a few turns, and the text line says "Goal done: Beat a rat. +1
Oil flask." Each goal's reward is rolled from: Oil flask 30%, 2 Healing
herbs 25%, 3 Oilcaps 20%, 1 Glint 15%, Healing potion 10%; goal Glints
are kept on the profile beside the Records' (Claude's call), and a find
with the bag full is set at the hero's feet (Claude's call). The boons
card, once, after the first boon is picked: "That is a boon: a small
help for one trip down." / "It lasts until you come home, or you fall."
/ "Its mark sits under your hearts. Each time you set out, pick a new
one." and Go; picking the done "Take a boon" in the Quests tab shows it
again. D-695 to D-698 moved to `archive/DECISIONS-FEATS.md`, word for
word.

**D-727 · 2026-11-09 · Creatures walk over finds; the rat pack planned**
(the owner's picks, all recommended; builds D-726) Creatures no longer
go around a find on the floor: they step onto it and it stays there,
drawn under them. A foe beaten on a find leaves its drop on that tile
too, so one step takes both; its rare one, with both, still lies on the
nearest open tile (D-476). Built first, its own step. The rat pack,
next: the plain rat gets the Pack way, so a rat alone acts as now. Once
one rat of a pack notices the hero, its whole pack does, and each heads
for its own free side of the hero, away from its packmates first. From
depth 3, about 1 room in 3, the rat by the flask has 2 packmates, on top
of the room's creatures. With 2 or more of its pack left a hurt rat
stands its ground; the last one may flee as now. D-721 to D-723 move to
`archive/DECISIONS-FEATS.md`, word for word.

**D-728 · 2026-11-09 · The rat pack built** (the owner's ask; builds
D-727) The plain rat now has the Pack way, built as D-727 says. Claude's
drafts the owner may change: a pack is the rat by a room's first flask,
so a room holds one pack at most; its 2 packmates stand within 2 tiles
of it, by the guard's rules (out of the torch's light, 3 tiles from the
stairs), and with no room for both it stays alone; the 1 in 3 is rolled
for every room from depth 3, so a room whose flask lost its rat (D-725)
has no pack, about 1 room in 4 in all. A rat heads for the free side
farthest from its packmates, then the nearest to it; a pack that
notices says no line. The rat's Bestiary words say so. D-724 moves to
`archive/DECISIONS-FEATS.md`, word for word.

**D-729 · 2026-11-09 · The scorpion's tail strike** (the owner's picks;
builds D-726) The next creature way,
the owner's pick: the scorpion gets Tail strike, `strikes`. It notices
and comes as one that chases does, but never bites beside the hero:
with them in its row or column within 2 tiles and a clear line, it
stops and raises its tail for a turn, with a warning line, and both
tiles ahead are marked; on its next turn it strikes them, 2 hearts on
the hero there, else it misses. A blow still beats it while raised.
Claude's drafts the owner may change: after a strike it stands still
one more turn; it strikes only the hero; armour can't turn it aside;
its lines; a raised tail trembles and stops a walk. D-725 moves to
`archive/DECISIONS-CREATURES-2.md`, word for word.

**D-730 · 2026-11-09 · Attack marks in Settings; the bone rat comes
back next** (the owner's picks, all recommended; builds D-349) A new
Settings switch, Attack marks, after Flasks: On at first, kept on the
device. Off, no creature's next move shows: not the icons on the
creature list's plaques, the framed one's arrow, a glob's next tile nor
a raised tail's tiles. The plaques, the lines, the glob and the tremble
stay. Built in 0.3.182 with the tail strike. The owner meant to pick
the bone rat and wants it in the game, next: beaten, it falls into a
pile of bones and stands up again 3 turns later, unless the hero steps
onto the pile to scatter it.

**D-731 · 2026-11-09 · The bone rat comes back** (the owner's picks, all
recommended; builds D-730, D-551) Beaten, the bone rat falls into a pile
of bones, look A of its mock-up: a low heap, its skull on top with the
pink eye. 3 turns later it stands up again, whole with 3 hearts, every
time, unless the hero steps onto the pile first and scatters it. Only
the scatter beats it: the Rat Bone (about 1 in 2), the Beaten count and
its experience. Small pink dots over the pile count its turns, 3, 2, 1,
hidden with Attack marks Off, and on its last turn "The bones stir."
Claude's drafts the owner may change: a pile bites no one, can't be
hit, and no creature steps onto it; it stands up chasing, acting from
the next turn; the count waits while the hero is in another room; a
scatter rattles; its lines and the Bestiary words. D-726 moves to
`archive/DECISIONS-CREATURES-2.md`, word for word.

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
