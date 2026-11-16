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

**D-949 · 2026-11-16 · Gloamlings from snuffed braziers, picked** (D-939's
step 8; the owner's picks, all recommended; built next, at its own step;
[mock-ups](https://claude.ai/artifact/79t25efmNPsBj1M1F6SLhu)) One
gloamling crawls out of each brazier the Lampeater snuffs (offered too:
at most 2 alive; a cold brazier breeding every 8 turns), onto a dark tile
beside it, the seeded dice picking, waiting in the bowl while none is dark
(offered too: the tile nearest you; beside the Lampeater); a plain
gloamling that drops nothing (offered too: its drops; a smaller 1-heart
one); "A gloamling crawls out of the ashes." the first time (offered too:
every time; none). Claude's calls, from the page: no Records, Feat or
Bestiary count; it acts from the next turn; it never leaves the arena;
the gloamling's own sounds; the Lampeater's Bestiary line adds "Gloamlings
crawl from the braziers it snuffs."

**D-950 · 2026-11-16 · The Lampeater on 12 hearts, for now** (the owner's
pick, recommended; answers part of Q-111; changes D-939's step 3's 8
hearts, D-947's half and D-948's At half) The Lampeater has 12 hearts,
not 8; its bite stays 2, its pin 2 turns, its drink as it was (offered
too: 16 hearts; 12 and a bite of 3; 8 until after step 9). The bot's
200 fights: Lean won 32% (was 100%), Middling and Strong all, about 26
turns (was 19), and it snuffs about once a fight (was almost never). To
be tuned again once there are gloamlings or more before the boss, and so
a stronger hero. Its own step, before step 8. Claude's calls: its half
and the bench's At half follow its hearts, 6; D-945 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

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
