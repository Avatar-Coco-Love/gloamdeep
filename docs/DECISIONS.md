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

**D-732 · 2026-11-09 · A playbook of how we work** (the owner's picks,
all recommended) The owner wants this project's way of working kept for
future projects. `docs/WORKFLOW.md` gathers it in one place: the steps
of a step, each habit and why, what changed along the way, and how to
start a new project. Each audit adds what that stretch taught us about
working together. Built now as its own step, nothing visible changed.

**D-741 · 2026-11-09 · The playbook caught up, and kept up** (the owner's
picks, all recommended; builds D-732) The owner asked that the playbook
hold everything done so far and grow as we go. Four parts are added:
how the game grew (stages, a playtest setting each plan, groundwork
first, only what works shows), our tools, lessons from bugs and design
habits. They go in a new `docs/WORKFLOW-2.md`, so `WORKFLOW.md` stays
under its cap. When a step teaches something about working together,
its PR adds one line to `WORKFLOW.md`'s "Since the last audit"
(`PR-CHECKLIST.md` reminds), and each audit moves the lines into place.
Nothing visible changed.

**D-780 · 2026-11-10 · Night creatures, third: the rare gloamling**
(the owner's picks, all recommended; builds D-779) Each night the seed
and the night pick one of the 5 woods rooms round home, and a gloamling
comes out there beside that room's lampmoth and bat, with the same
rules (D-778). It acts and leaves finds as it does below: a Gloam Wisp
about 1 in 2, a Gloam Eye about 1 in 10. Claude's calls the owner may
change: it may pick the same room two nights running; it never shares a
tile with the others. D-778 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-781 · 2026-11-10 · Day creatures, first: the mole** (the owner's
picks, from the herb mimic, scorpion, centipede and mole; builds D-778,
D-771's order) Day creatures are night creatures turned round, starting
with a creature the game has: the mole. One comes out each day in each
woods room round home, never home and never a mountain room, from
halfway through dawn, and any still standing are gone from halfway
through dusk. It acts and leaves finds as it does below. Claude's calls
the owner may change: as daylight shows every tile, it comes out on
open grass off the edge at least 4 steps from the hero, picked by the
seed and the day; one beaten stays beaten till the next day; the start
room is one of these rooms, so a mole may meet a new journey on its
first turn. D-779 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-782 · 2026-11-10 · The thirteenth audit** (the owner's picks: every
split, every archive and the playbook; ponds as recommended) At
0.3.232, nothing visible changed. A conversation's start reads 10.4 KB,
not 11.0. Three code files are split word for word: the in-game
history's 0.3.151 to 0.3.200 go to `src/core/history-0.3-3.js` (42 KB
to 16 and 26); the creatures' pictures, rat to mimic leaf, to
`src/render/pictures-creatures.js` (49 KB to 39 and 10); each
creature's lines and its finds' to `src/core/lines-creatures.js` (42 KB
to 31 and 13; `tools/make.js` still starts new ones in the old files).
D-740 and D-742 move to `archive/DECISIONS-AUDITS.md`, D-743 to
`archive/DECISIONS-CARDS-2.md`, and D-773 to D-777 to a new
`archive/DECISIONS-SOUNDS.md`; ticked steps 23, 24, 25 and 27 are
archived; Q-088, Q-091 and Q-092 move to `OPEN-QUESTIONS-2.md`; the
playbook's audit lessons go to a new `WORKFLOW-3.md`; all word for
word. Docs that drifted are fixed: the lampmoth, bat, gloamling and
mole's surface visits; the packs in use; most woods rooms have a pond,
not each (about 1 thick-woods room in 20 has none). The bug hunt found
three bugs, all to be fixed in the next PR (the owner's call): night
or day creatures piling up across nights (B1), a bite on waking from
sleeping out (B2), night creatures coming out beside the hero in the
dark (B3). The next audit is at 0.3.272.
