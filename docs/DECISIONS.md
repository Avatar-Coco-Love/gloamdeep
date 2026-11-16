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

**D-952 · 2026-11-16 · The audit's bugs F-6 to F-8, the fixes** (the
owner's picks, all recommended; fixes F-6, F-7, F-8) F-6: a catch begun
on the turn the Lampeater is halved counts as begun after half (D-947),
so getting free from it owes one more snuff (offered too: keep it as
"the catch it was halved in"). F-7: the spear's blow on the one behind
and the Warden's Fist's knock into another are marked `sank` too when
they sink into the Lampeater, so it neither flashes nor counts as hit;
the creature in front still flashes (offered too: no flash for any
creature whose hearts didn't drop). F-8: a New journey, or a profile
loaded, after the #lampeater link's fight saves again; the link's fight
itself is still kept nowhere (D-948) (offered too: reload the page
without the link on leaving the fight). The bot's fights are the same
before and after.

**D-953 · 2026-11-16 · The Lampeater beaten, and whole again** (D-939's
step 9, its first part; the owner's picks, all recommended but the last)
Step 9 is split: now the door and the fall; the way in sealed, the
one-off Feat and the trophy each at its own step later (offered too: the
door now and the fall next; all of step 9 at once). Only beating the
Lampeater opens the arena's sealed door, which sinks open at once; the 4
braziers lit no longer do, so the fight can't be skipped (changes D-940's
"until then"; offered too: either one; beaten and all 4 lit). The
gloamlings left crumble away as it goes, counting nothing (offered too:
they stay and fight). Left unbeaten, by a fall or by walking out, it is
whole again when the hero comes back: on its own tile, all 12 hearts, the
braziers cold, the gloamlings gone (the owner's pick: the same as a fall;
offered too: only a fall; the way in sealed now). The owner's ideas for
the sealed way in are kept in Q-112. Claude's calls: the vault's line and
`open` event for the door; a level gained on the same blow shows its own
line in the door's place, as ever; its Bestiary words unchanged. D-948
moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-954 · 2026-11-16 · The rest of step 9, in order; 0.4.0; chapters**
(the owner's picks, all recommended but the last; answers part of Q-112)
The rest of D-939's step 9 comes one step each: the one-off Feat first,
then the sealed way in (Q-112), then the trophy (offered too: the sealed
way in first; the way in, then Leap, the rewards later). The trophy waits
for creature materials (Q-061) and comes as the first of all trophies, at
the workbench, hung at home, as D-466 has it (offered too: the material
now, the trophy later; straight from the fight). Version 0.4.0 comes when
the way to depth 9 opens: the Lampeater's steps all done, through Leap,
the escape, its sounds and lore and the Leap gaps (offered too: at the
first step of biome 2; once the fight is done). The surface and depths 1
to 8 are **chapter 1**, from the surface to its boss; D-635's four
stretches of 8 floors are the four chapters, and the crypt, warrens and
dungeon are each a biome, a look of their own (offered too: biome 1 as
it was, its areas inside; the surface split off). Claude's calls: new
text says chapter where old text said biome for a stretch ("chapter 1's
boss"); old lines keep "biome 1", read as chapter 1, until the next
audit offers to change them. D-949 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-955 · 2026-11-16 · The Lampeater's one-off Feat** (the owner's
picks, all recommended; builds D-467, D-695, D-939, D-954, part of
Q-083) Beating the Lampeater once reaches a one-off Feat named
Lampeater, its Bestiary name, paying 3 Glints, one look's price (offered
too: Chapter 1; Lampeater beaten; 6 or 1 Glint). On the Feats tab it is
a row of its own below the six, after a small gap: the name grey, no
count, one mark on the right, gold once beaten; its name stays out of
the counts' column, so nothing moves on the upright card (offered too: a
row like the others, "0 of 1"; the same row under a heading "Once"). The
row shows once the Lampeater is met, as the Bestiary (offered too:
always; only once beaten). Claude's calls: it reads the Bestiary's
beaten count, so a Lampeater beaten before this pays too, and the boss
bench, a dev jump, never; the note says "Feat reached: Lampeater. +3
Glints.", waiting behind the door's line and joining a tier reached on
the same turn (D-719); the screen reader says "Lampeater, reached" or
"not yet". The Feats now pay 39 Glints. Next, the sealed way in (Q-112).
D-950 moves to `archive/DECISIONS-SURFACE.md`, word for word.
