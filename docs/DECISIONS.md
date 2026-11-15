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

**D-940 · 2026-11-15 · The Lampeater's arena, standing empty** (D-939's
step 1; the owner's picks and idea; [mock-ups](https://claude.ai/artifact/LAE4r9ZW5deNvqUc32rBui))
On depth 8 the way ends in a hallway and, straight above it, the arena;
nothing else joins either (offered too: the stairs room as the arena,
one way in, its stairs seeping gloam or between watch flames; the
stairs room as it is; a room past the end). The way is a room longer,
up to 2 more where depth 8's stairs up sit near the grid's top, as the
hallway is entered from below (Claude's call). The arena, one cell (offered
too: a hall; a large room), is the seal hall: a cold brazier in each
corner, 4 pillars round the middle (offered too: an open floor; the
crossing). The owner's idea: at its top a sealed door, the stairs down 3
tiles behind it in a ring of seal stones, the Lightkeepers' old seal;
beating the Lampeater will open it, so it stands between the hero and
depth 9 and Growth's second row. Until then the 4 braziers lit sink the
door, as a vault's do (offered too: open; sealed now), cold again if left
first (offered too: burning on). The hallway is the processional
(offered too: the eaten road): a road 3 wide, seal stones down its
middle, pillars along its sides, 2 cold braziers where it starts, bending
once, an open stone door into the arena (offered too: a plain gap).
Nothing else in either. The Pillar and the Seal stone, names Claude's
draft. Old saves make every room from depth 8 down again. D-929 moves to
`archive/DECISIONS-SURFACE.md` and D-937 to `archive/DECISIONS-RELICS.md`,
word for word.

**D-941 · 2026-11-15 · The Lampeater standing in its arena** (D-939's
step 2; the owner's picks, all recommended but where it stands;
[mock-ups](https://claude.ai/artifact/8HL2d5eZpf97Ki31Ukg4zn))
Look A, the pool: a low mound of gloam on one tile, a ragged dripping
edge, a dark mouth, pink eyes, in three new deep violets (offered too: B,
the swallowed light, a hunched shape with a stolen flame inside; C, the
reaching shade, two arms of gloam). Its eyes alone glow over the dark,
in the lure wisp's halo turned violet. It waits pooled near the sealed
door: on the tile below the door's own tile, as the door can only be
reached from there (offered too: beside the door's tile; on it, slipping
aside as the door sinks; in the middle), and blocks its tile. For now it
never moves or bites, and every blow, sting, glob or slam sinks into it,
hurting nothing, "Your blow sinks into the gloam." (offered too: no bump
at all). Claude's calls: no hit flash, the swing's puff for a sound, no
hearts shown yet, the Fist knocks it nowhere. Until it can be beaten the
4 braziers still sink the door (offered too: sealed till then). Its
Bestiary page is the Warden's kind: met when lit, the grey hints till
beaten, how to fight it after 1 (offered too: a line of who it is from
the start; not listed till beaten); its words are written at step 9, so
for now they say only what it does. An arena made before gets it once.
D-938 moves to `archive/DECISIONS-RELICS.md`, word for word.

**D-942 · 2026-11-15 · Finished decisions archived** (the owner's picks,
both recommended) With `DECISIONS.md` at 11,885 of its 12,288 bytes,
D-894 and D-910, the health checks' archiving and the sixteenth audit,
move to `archive/DECISIONS-AUDITS.md`, and D-799, the finds plan, its
nine first uses all built, to `archive/DECISIONS-SURFACE.md`, word for
word (offered too: D-790, the first next prompts rule, to
`archive/DECISIONS-AUDITS.md`; kept). The Lampeater's and the standing
rules stay. Its own docs-only version, 0.3.384. No game change.
