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

**D-963 · 2026-11-16 · The escape, its first step** Partly superseded by
D-964 (2026-11-16): when the floor gives way, and the last blow's line. Superseded by D-967 (2026-11-17): no gap in the boss fight. (the owner's picks,
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

**D-965 · 2026-11-16 · The crumble** Superseded by D-967 (2026-11-17): kept, unused. (the owner's picks: crack, then all
fall, over recommended one by one; the rest recommended; answers part of
Q-113; builds D-964) As the floor gives way, the seal stones stand a
moment over the Gap while cracks run across them, then all fall together
into the dark (offered too: one by one from the door outward; sinking and
fading). Just the stones (offered too: a puff of dust; chips falling). It
lasts about half a second, ending with the shake (offered too: about 1 s;
1.5 s). With reduced motion the stones are simply gone (offered too: a
quick fade). Claude's calls: the cracks show in two steps over 200 ms;
then each stone shrinks to 40% of its size, drops 3 pixels and darkens
and fades away within its own tile (`render/crumble.js`).

**D-966 · 2026-11-17 · The crumble's sound** Superseded by D-967 (2026-11-17): kept, unused. (the owner's picks, all
recommended; answers the rest of Q-113; builds D-965) As the floor gives
way, a sharp, low knock of stone as the cracks run, then a heavy earth
rumble under the fall, fading into the dark with the shake (offered too:
the rubble's crumble, lower and louder; just a deep rumble). Nothing is
heard from below: the stones never land (offered too: a faint far thud; a
few far clatters). It follows Steps' loudness, with the fall and the new
floor's rumble (offered too: Fighting; Finds). Claude's calls: `giveWay`
in `render/sound.js`, the mining knock at 0.6 with the cave's echo, again
0.1 s later at 0.55 as the cracks' second step, then `Earth-024` at 0.8
from 0.2 s, 0.8 s long, fading 0.5 s, muffled above 1000 Hz; its own line
in Steps' list, "Floor gives way"; heard with reduced motion too.

**D-967 · 2026-11-17 · No falling ground in the boss fight** (the
owner's choice, then the rest recommended; supersedes D-963 to D-966) Offered: the hall's floor falling in behind the hero, a row a
turn, never their row or the door's two tiles; the owner asked how a
later trip would get back down past a fallen hall, then chose no falling
ground at all, saved for another time (offered too: a narrow road left
standing; the hall whole again later; it stops at the Gap). Beaten, the
Lampeater's door sinks open and the seal stones stand, the gap round the
stairs gone too: the hero walks through the door and over the stones
onto the stairs, or leaps from the door (offered too: keep the Gap
only). The last blow says "The door sinks open. You learn Leap." The
work is kept in the code, unused (offered too: notes only): the Gap
tile, `floorGives` in `beaten.js`, its crumble, shake and sound, and its
Settings line; for a later falling floor such as T4, the collapse. Next,
the first Leap gaps. Claude's calls: a journey saved with the Gap
already there keeps it, leapt as before. D-951 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-968 · 2026-11-17 · The first Leap gaps** (the owner's picks, all
recommended; builds D-463, D-650, D-954, D-962, D-967) The first gaps go
above depth 8, seen before Leap and reached once the Lampeater is beaten:
the locked door shown before its key, the owner's reason; gaps below
depth 8 come at a later step (offered too: both at once; below 8 only).
From depth 5 to 8, one dead end a floor has its cache behind a line of
Gap tiles, its finds in sight across it (offered too: a chest on a
ledge; a short cut over a loop; from depth 7 or 1; about half the
caches, or every one). Claude's calls: the line is a straight run of
open floor, up to 4 tiles along a row or a column between walls, that
leaves every find out of walking reach, every one reached by a leap and
within 4 tiles, in sight; the nearest the finds wins; nothing stands on
it; the floor's dead ends are tried in the seed's order, and where none
fits the floor has none (about 4 floors in 10); never in a waystone's,
the peddler's or the locket's room; rooms
already kept in a save keep their shape, so no hero is shut behind a new
gap; the Gap's look and its line, "Too wide to step across.", as at the
arena (`leapgap.js`). Next, the gaps below depth 8. D-964 moves to
`archive/DECISIONS-SUPERSEDED.md`, word for word.
