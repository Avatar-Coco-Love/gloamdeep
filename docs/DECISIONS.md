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

**D-712 · 2026-11-08 · The boons card built** (the owner's picks, all
recommended; builds D-706) The boons card shows right after the first
boon is picked, on the same glass card as the opening's, the room dimmed.
A profile whose "Take a boon" was ticked quietly is never shown it on its
own. Picking the done "Take a boon" in the Quests tab shows it over the
Journal, and Go goes back to the Quests tab. Claude's calls the owner may
change: Enter on the Quests tab shows it too; the first pick is the one
that marks "Take a boon" done, so a profile that never held a boon sees
it even if the goal was ticked quietly at that pick.

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

**D-713 · 2026-11-08 · The sixth teaching goal built** (the owner's
picks, all recommended; builds D-706) "Spend your ember" / "Tap here,
then Growth." shows at level 2 and is done on the first buy in Growth
(a heart or Tough); no turn passes in the Journal, so the line turns gold
and the text line says so once it closes. Tapping the line opens the
Quests tab, as every goal's does. Ticked quietly, never shown, when an
ember is spent already this journey. Claude's call the owner may change:
it goes ahead of an older goal waiting only while an ember is there to
spend, so after a fall back to level 1 the older goal shows. A stray
bracket from 0.3.165 that stopped the game from starting is fixed here,
with a test that every code file parses (the owner's pick, recommended).

**D-718 · 2026-11-09 · Flyers over water** (the owner's picks, all
recommended; builds D-717) The bat, the lampmoth and the lure wisp (the
registry's `flies`) may fly over water, a cave pool or the home pond; no
other creature may. Walking into a flyer over water strikes it as on the
floor, rod held or not; with none there the water acts as before. One
beaten there leaves its drop on the nearest dry tile, as drops already
lie. A spit grub's glob already flies over water and hits a flyer there.
Next, the owner orders the audit's other fixes (B2, B3, B4, Q1).

**D-719 · 2026-11-09 · The Feat note: two in one, after the turn's line**
(the owner's picks, all recommended; the eleventh audit's B2 and B3,
D-699) The owner grouped the audit's rest as two steps: B2 and B3 now,
then B4 and Q1. B2: two Feats reached in one turn share one note,
"Feat reached: Beaten 10, Flasks 5. +2 Glints.", their Glints added up.
B3: a turn that says its own line (a level-up, "The locket kept…", a
goal done) shows it, and the Feat note waits for the next move that says
none; a tier reached while it waits joins it. Next, B4 and Q1.

**D-720 · 2026-11-09 · The audit's last fixes: the warden asleep, the
spawned ones** (the owner's picks, all recommended; the eleventh audit's
B4 and Q1, D-699) B4: the creature plaques are drawn only, for every
creature, and one asleep gets none; the warden asleep as a statue never
moves or notices the hero, so it needs none, as meant. Nothing changes.
Q1: a creature the dev tools' Spawn makes is marked; beating it adds
nothing to Beaten, the Feats or the Bestiary's beaten count (it is still
met), and it still gives experience and drops. A spawned flask the same:
poured, it adds nothing to Flasks poured. The bag keeps count of the
spawned flasks picked up, and a flask poured while any are carried is
one of them; a fall clears the count. Teaching goals are as before.
Next, more Feats (Q-057). D-714 and D-715 move to
`archive/DECISIONS-LOOKS.md`.

**D-721 · 2026-11-09 · More Feats: Rooms first** (the owner's picks;
builds D-695, narrows Q-057) Three more Records get a Feat, each its
own step: Rooms found, then Steps, then Torches lit; Falls and Time
played get none. Each pays 1, 2 and 3 Glints as every set does. Rooms
comes now, from Rooms found, at 10, 50 and 200 rooms, the fourth row.
On the Feats tab and in its note it is named Rooms ("Feat reached:
Rooms 10. +1 Glint."), not Rooms found, so its row fits the upright
card, as Flasks (D-698); Records keeps Rooms found. Rooms found before
this count. Steps comes next, at 1000, 5000 and 20000; then Torches
lit, at 5, 25 and 100. With Rooms, the Feats pay 24 Glints. D-716
moves to `archive/DECISIONS-AUDITS.md`, word for word.

**D-722 · 2026-11-09 · Steps, the fifth Feat** (the owner's picks, both
recommended; builds D-721, narrows Q-057) Steps comes now, from Steps,
at 1000, 5000 and 20000 steps, paying 1, 2 and 3 Glints, the fifth row.
It keeps its Records name, Steps ("Feat reached: Steps 1000. +1
Glint."). "19999 of 20000" ran 17 pixels into the marks on the upright
card, so on the tab a goal of a thousand or more is written in k
("4321 of 5k", "20k" once all are reached), the count whole; the note
and the screen reader say it whole. The gap between the names and the
counts goes from 16 to 8 pixels on every card. Steps taken before this
count. With Steps, the Feats pay 30 Glints. D-717 moves to
`archive/DECISIONS-RELICS.md`, word for word.
