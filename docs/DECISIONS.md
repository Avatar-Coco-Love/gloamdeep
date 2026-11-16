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

**D-790 · 2026-11-10 · Copyable next prompts** (the owner's request)
Each PR's handoff ends, before merging, with a few short prompts the
owner can copy to pick the next direction, one per choice, or a single
one when there is only one way on (`PR-CHECKLIST.md`). When they are
given changed by D-795 (2026-11-10): once, after the merge.

**D-852 · 2026-11-12 · A bug list** (the owner's pick, recommended;
the owner's wish to say just "Next up") Bugs the owner notices go in
`docs/BUGS.md`, each with its own number, B-001 on, in the owner's
words, with their ideas (offered too: as questions in
`OPEN-QUESTIONS.md`; in `PROGRESS.md`). Next up and "Waiting on the
owner" name them, so a new conversation finds them. Fixed ones move to
`archive/BUGS-FIXED.md`. D-844 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-923 · 2026-11-14 · The next prompts, once** (the owner's find and
pick, recommended; sharpens D-790 and D-795) Twice the next prompts came
before a merge and again after, and the owner, back later, took the
early ones as a sign they had merged. Before the merge, the handoff ends
"Tell me when it's merged" and gives no prompts; once the owner says so,
Claude checks the PR is merged on GitHub, then gives them once (offered
too: the words only; no prompts at all). CLAUDE.md says it too.

**D-939 · 2026-11-15 · Biome 1's boss: the Lampeater** (the owner's
picks, all recommended; answers part of Q-105; builds D-463, D-636,
D-643, W4, G3; [ideas page](https://claude.ai/artifact/GcWfnvHi4HAwfkugqyHtXR))
Biome 1's boss is a piece of the gloam given shape, pooled against the
Lightkeepers' old seal at the bottom of the dungeon, the Lampeater for
now: light decides the fight (offered too: the Seal Warden, a 2 x 2
stone guard; the Warren Mother, rising from linked holes; both kept on
the page). It moves only through dark tiles and can't step onto a lit
one, and can be hurt only while caught in light: lantern off, it comes;
switched on beside it, it is caught a turn and struck. Lit braziers in
its arena cut off its dark; caught with no dark tile beside it, it is
pinned. Standing lit, it drinks from the light's edge. At half its
hearts it snuffs braziers, and gloamlings crawl out of them; lure wisps
show where it lurks. It fights in its own arena on depth 8, guarding the
stairs down; the way in seals until it is beaten or the hero falls, and
after a fall it is whole again (offered too: the door left open; off the
way down; no special room). Beaten, it gives Leap, biome 1's found
ability as drafted (offered too: Flare; Hold breath); the floor gives
way and the hero leaps across to the way down at once (offered too: a
shrine before the fight; no escape). Built one visible step at a time,
in about 13 steps (the page's list); every name, number, look and line
is set at its own step. D-927 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-951 · 2026-11-16 · The seventeenth audit** (the owner's picks, all
recommended) At 0.3.393, nothing visible changed. The in-game history's
0.3.301 to 0.3.350 go from `history-0.3.js` to a new
`src/core/history-0.3-6.js` (52 KB to 24 and 28; offered too: the place
and people lines out of `lines.js`; a section out of `main.js`). The
playbook's lines since the last audit, and the one 0.3.390's PR kept, go
to a new `WORKFLOW-7.md`; the hero to a new `GLOSSARY-HERO.md`; the
creature list to a new `CONTENT-CREATURES.md` (its test and
`tools/make.js` follow it); D-946 and D-947 to
`archive/DECISIONS-SURFACE.md` (offered too: D-948 and D-949 as well;
none); all word for word. "Waiting on the owner" is on fewer lines. A
bug hunt reads the code since 0.3.353: three findings, F-6 to F-8 in
`BUGS.md`; which to fix, and when, is the owner's pick (the owner was
away; the owner asked that the audit be merged once done). The next
audit is at 0.3.433.

**D-962 · 2026-11-16 · Leap, its first step** (the owner's picks, all
recommended, and the owner's change to where it is kept; builds D-636,
D-939, D-954) Beating the Lampeater gives Leap, said with its door: "The
door sinks open. You learn Leap." From then the hero can leap 2 tiles in
a straight line, landing on the second, one turn, like a step (offered
too: only learnt, no use yet; a first pit with it; a turn and some oil;
a turn, then 3 turns' rest). The tile between can be open floor, a
creature or a low thing (water, rubble, the bench, a brazier), never a
wall or a tall solid thing (offered too: floor and creatures only;
anything but walls). A round Leap button on the lantern's arc, left of
the quick slot, shown once Leap is learnt: a tap gets a leap ready,
"Leap which way?", its arc turning amber, and the next way picked (a
swipe, the arrow pad, a tap toward a way, the arrow keys) leaps; tapped
again, or a tap on the hero, lets it go; J does the same (offered too: a
tap on a tile 2 away, Shift + arrow; both). Leap is kept on the journey
only, never the profile: a new journey, or a hardcore fall's fresh
start, has to earn it again (the owner's change; Claude had offered it
on the save, as the Feat). Claude's calls: blocked, it is free, "No room
to land." or "Too tall to leap over."; landing takes what lies there and
stairs, as a step; no leap across a doorway into the next room yet; a
level reached on the same blow says "Level {n}. You learn Leap."; the
hero rises 7 pixels at the middle over about a quarter of a second, a
shadow left on the ground, and simply lands with reduced motion; no
sound till its sounds' step; the dev sheet's Hero has a Leap switch.
The fight is unchanged, so no boss-bot run. Next, the escape. D-959 and
D-960 move to `archive/DECISIONS-SURFACE.md`, word for word.

**D-963 · 2026-11-16 · The escape, its first step** (the owner's picks,
all recommended, and the line fitted to the strip; builds D-939, D-954,
D-962) With the last blow on the Lampeater, at once, as its door sinks
open, the old seal's stones round the stairs down fall away into a gap,
the stairs left standing on their own; the hero leaps from the open door
over the gap onto the stairs, which take them down, as D-962's landing
does (offered too: a band of floor before the door; one tile before it;
the gap on reaching the door, or a turn after, rumbling). Just the gap,
standing for good: whether the floor keeps crumbling, a shake or a sound
each come later as steps of their own (offered too: a chase now; a shake
now). The last blow says "The floor gives way. You learn Leap.", the door
seen sinking; the owner had picked "The door sinks open and the floor
gives way. You learn Leap.", too wide for the strip, then this (offered
too: the old line; "Door open, floor gone."). Claude's calls: the Gap, a
name to change any time, solid but low, so leapt over and never walked
into, light passing; a bump says "Too wide to step across.", free; drawn a
black drop, its far face and a ragged broken edge below standing ground;
the map shows it as a wall's outline; a level on the same blow keeps
"Level {n}. You learn Leap.". The fight is unchanged, so no boss-bot run.
D-961 moves to `archive/DECISIONS-SURFACE.md`, word for word.
