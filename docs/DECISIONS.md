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

**D-971 · 2026-11-17 · The Lampeater made harder, and Leap a find**
(the owner's ideas and picks, all recommended; part of the owner's
Lampeater polish, `OPEN-QUESTIONS-3.md`; builds D-939) The owner found
the fight too easy: lantern off, wait for it, lantern on, strike twice,
it backs off, again; no time for snuffs or gloamlings, the braziers not
mattering. It starts with a gloamling beside each of the 4 braziers, on
its outer side (offered too: the room's corner tiles; crawling out of
them), the arena's own as a snuffed bowl's are. It gets 3 new ways, all
together, as the owner asked: struck and free again, it goes to the
nearest cold brazier and calls a gloamling out over 2 turns, seen, and
stopped if caught in light; never from a lit one; with no cold one, it is
wary 3 turns, just past the lantern's reach; at 2/3 and 1/3 of its hearts
it snuffs a lit brazier if one is lit, then calls 2; never more than 4
gloamlings alive (Claude's numbers, approved; offered too: no limit; 3).
Beaten, it leaves Leap where it falls, drawn as the Leap button's icon,
used up when stepped on: a card opens, a new ability, the icon, its name
and its use; closed, the door sinks open (offered too: at the last blow).
Its sound, something special, from a sound board of 2 or 3 mixes (offered
too: Claude's pick; a bigger level-up). Six steps, one a PR, gloamlings
first (offered too: the drop first; the fight in one go): the gloamlings,
the calls, wary, the phases, the drop and card, the sound. Step 1: the 4,
back when it is whole again. The bench: Lean 37% to 52%, Middling 95% to
100%, as they take the tiles beside the hero and it bites less; the next
steps draw it away. D-968 moves to `archive/DECISIONS-SURFACE.md`, word
for word. Its limit of 4 alive changed to 6 by D-972 (2026-11-17).

**D-972 · 2026-11-17 · The Lampeater's calls, wary and phases, and its
gloamlings flanking** (the owner's picks, recommended but one; answers
Q-116; builds D-971) Before building, its steps 2 to 4 planned with the
owner's flanking idea. The gloamlings work with it: while it comes for
the hero (chasing, not caught, calling or wary) and while it calls, they
take the free tiles beside the hero away from it, as a rat pack spreads,
leaving the side toward it open; else they act as ever (offered too:
only stepping out of its way; only the two sides across; always after
its first phase). Struck and free again, it calls (D-971); a call is
stopped by catching it in light, tried again once free, and spoilt by
lighting that brazier, as it never calls from a lit one: it turns to
another cold one, else is wary (offered too: a stopped call spent).
Never more than 6 gloamlings alive, the owner's pick (changes D-971's 4;
offered too: wary at 4, recommended; fighting on as now). Wary, it still
drinks at the light's edge (offered too: only waiting). At each phase, 2/3
and 1/3 of its hearts, the snuffed bowl's crawler is one of the 2, and 1
more is called from another cold brazier (offered too: 2 more; both from
that bowl). The phases replace its half-hearts snuff and the snuff owed
after each catch (D-947; offered too: keep all; keep the half one).
Added before the merge, the owner's idea: only while 6 are alive, 2
guard it, following it and holding the tiles beside it away from the
hero, so its way to them stays open (offered too: each keeping the hero
in sight; both); one bites the hero beside it, then goes back to it, not
chasing (offered too: stepping between); lit, they back off as ever,
back to it in the dark (offered too: holding their ground). Eight steps
now, one a PR, flanking first (offered too: the old order, flanking last;
flanking inside the phases; the guards inside the calls, or after the
phases): flanking, the calls, the guards, wary, the phases, the drop and
card, the sound. Claude's calls, to confirm at their steps: with 6 alive
it is wary, as with no cold brazier; the 2 nearest it guard, and with
fewer than 6 they act as the rest; the bench after each step. D-967 and
D-969 move to `archive/DECISIONS-SURFACE.md`, word for word.

**D-973 · 2026-11-18 · The Lampeater's gloamlings flank you** (the
owner's picks, both recommended; builds D-972, its step 2) While it comes
for the hero, chasing and not caught, the side left open toward it is the
tile beside the hero fewest steps from it, the first of up, down, left,
right on a tie (offered too: the tile its own next step would end on). A
gloamling on that side bites as ever, then steps off it toward another
free side (offered too: staying there and biting). Claude's calls: the
others go round to a free side by the shortest way that never crosses the
open one, the farthest from each other first, as a rat pack spreads; one
beside the hero on another side stays and bites; lit, they back off as
ever, so they flank only in the dark (`flank.js`). The bench, from 52% and
100%: Lean 18%, Middling 96%, Strong 100%, their bites up from about 157 to
about 277 in 100 fights (Q-111). D-970 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-974 · 2026-11-18 · The Lampeater's calls** (the owner's picks, all
recommended, the look's three together; builds D-971 and D-972, their
step 3) Struck and free again, it walks through the dark to a tile beside
the nearest cold brazier and calls from there (offered too: from where it
stands, as its breath does). The call shows as the cold bowl's ashes
stirring with a faint violet glow, with its breath's dashed ring and turn
countdown, its eyes turned a pixel toward the bowl, and "The Lampeater
calls into the ashes." (Claude's draft) as it starts. Until the wary step,
with 6 gloamlings alive or no cold brazier it can reach, it fights on as
now (offered too: waiting where it stands); its half-hearts snuff and the
snuff after each catch stay until the phases replace them (offered too:
gone now). Claude's calls: a blow that hurts it marks it struck, and a
call ended clears the mark, so one call each time it is struck and free;
the nearest brazier by steps through the dark, the first of up, down,
left, right on a tie; gloamlings waiting in a bowl count toward the 6; the
one called crawls out as from a snuffed bowl (brood.js), the arena's own;
its Bestiary words end "Struck, it goes to a cold brazier and calls one
out." (Claude's draft) (`call.js`). The bench's bot now walks to it when it
waits in its place. The bench, from 18%, 96% and 100%: Lean 12%, Middling
79%, Strong 83% (Q-111). D-939 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-975 · 2026-11-18 · The third health check, run hands-off** (the
owner's wish and picks) Once the Lampeater's fight is built (the calls,
guards, wary and phases, each its own PR, the owner's pick; offered too:
the calls alone, recommended; the calls and guards), a third health check
runs while the owner is away: no questions while it runs, nothing in the
game changed, findings only, each picked later as a step, as H-01 on were
(D-860). One coordinating conversation reads little; each area goes to a
helper agent with its own context, Sonnet to look and Opus to check each
finding before it is kept (recommended; offered too: all Opus; all
Sonnet). A checklist of areas, and each area's findings, saved to the
branch and pushed as each is done, so nothing is lost if a session ends.
If it ends or the usage limit is reached, a scheduled check-in every 3
hours carries on from the checklist, and the owner can wake it with any
message (the owner's pick, with their addition; offered too: every hour;
only when the owner is back). At the end: a report page for the phone,
the findings in `HEALTH-CHECK-3.md` (split under 8 KB), one PR, and the
questions for the owner all at the end.
