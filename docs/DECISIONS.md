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

**D-799 · 2026-11-10 · The finds plan** (the owner's picks, all
recommended, from a plan page: https://claude.ai/artifact/GnPo6RnybF7g6ogTdiET6y;
narrows Q-061 and Q-093) Each find kept for crafts later gets one first
use, with more uses free to come later: Crab Shell, the Shell Vest
(D-801); Grub Skin, a Spitproof Draught; Bunny Fur, a Fur Bedroll for
sleeping out; Bat Wing, an Echo Charm showing creatures in the dark
near by; Lurker Claw, a Shade Draught, creatures noticing the hero only
near; Rat Bone, a Bone Hook for the rod; Glow Gland, a Glow Lamp, a
longer torch; Bat Fang, a Fang Charm, a heart back now and then from a
beaten creature; Mole Claw, the Mole Claw Pick. With later steps: Oil
Bladder, the lantern's first tank; Gloam Eye, its first glass, showing
creatures in disguise; Stinger, a Stinger Spear poisoning creatures;
Venom Sac, a Venom Oil for weapons. Kept for later too: Bunny Fur, a
warm lining; Bat Wing, arrows' fletching; Stinger, arrowheads; Rat Bone,
a Bone Club; claw weapons. They are built one a step, in that order,
each one's numbers settled at its step (the plan's are drafts). The
owner's wish for weapons (Q-094): a switch to show creatures' coming
attacks and one to show the hero's. Others offered: two or three a PR;
a waterskin, a Bat Wing torch, a Sting Salve, Bone Meal, a Tick Charm,
an Eye Charm, a Wayglow, a Mole Charm, a long Ward.

**D-852 · 2026-11-12 · A bug list** (the owner's pick, recommended;
the owner's wish to say just "Next up") Bugs the owner notices go in
`docs/BUGS.md`, each with its own number, B-001 on, in the owner's
words, with their ideas (offered too: as questions in
`OPEN-QUESTIONS.md`; in `PROGRESS.md`). Next up and "Waiting on the
owner" name them, so a new conversation finds them. Fixed ones move to
`archive/BUGS-FIXED.md`. D-844 moves to `archive/DECISIONS-SURFACE.md`,
word for word.

**D-894 · 2026-11-13 · The health checks' decisions archived** (the
owner's picks, all recommended) Before L1 step 3, with `DECISIONS.md`
at 12,004 of its 12,288 bytes, D-860 to D-862, the two health checks
and their order, all 19 steps done (0.3.308 to 0.3.328), move to
`archive/DECISIONS-AUDITS.md` beside D-868, the audit they fed, word
for word (offered too: D-799, the finds plan, as well, to
`archive/DECISIONS-SURFACE.md`; to `archive/DECISIONS-SURFACE.md`
instead). Its own docs-only version, 0.3.339 (offered too: folded into
L1 step 3's PR). No game change.

**D-910 · 2026-11-14 · The sixteenth audit** (the owner's picks, all
recommended) At 0.3.353, nothing visible changed. The finds' pictures,
from the flask to the ember, go from `pictures.js` to a new
`src/render/pictures-finds.js` (48 KB to 27 and 22). The in-game
history's 0.3.251 to 0.3.300 go to `src/core/history-0.3-5.js` (59 KB
to 30 and 30). D-897 and D-903 move to `archive/DECISIONS-SURFACE.md`;
the playbook's lines since the last audit, and the four that waited in
0.3.341's, 0.3.342's and 0.3.345's PRs, go to a new `WORKFLOW-6.md`; all
word for word. "Waiting on the owner" lists the any-time and later
questions on fewer lines. Step 19, Lore, stays open: its quests (D-629)
are still to come (offered: ticked, before that was found). A bug hunt
reads the code since 0.3.313: five findings, F-1 to F-5 in `BUGS.md`,
all picked as steps, in order, each fix its own step. The next audit
is at 0.3.393.

**D-923 · 2026-11-14 · The next prompts, once** (the owner's find and
pick, recommended; sharpens D-790 and D-795) Twice the next prompts came
before a merge and again after, and the owner, back later, took the
early ones as a sign they had merged. Before the merge, the handoff ends
"Tell me when it's merged" and gives no prompts; once the owner says so,
Claude checks the PR is merged on GitHub, then gives them once (offered
too: the words only; no prompts at all). CLAUDE.md says it too.

**D-929 · 2026-11-15 · The rune wall opens** (L3 step 2, the owner's
picks, all recommended; builds D-927, D-928) Bumped dark from the tile in
front of its face, the rune wall becomes the room's plain floor, a 1-tile
gap, and the tile behind it a plinth with a vault's prize draw (offered
too: a framed rune doorway; the vault's open door). Its line: "The runes
flare, the stone sinks away." (offered too: "The wall sinks open."; "The
stone slides back into the dark."; first drafted with "and", too wide for
the strip). No sound yet, as the vault door's (offered too: the dig's).
The runes are gone once open (offered too: stay faintly). D-927's lit line
said a sentence a bump, "Faint marks." then "Too pale to see by lantern
light.", too wide whole (offered too: "Faint marks, too pale for lantern
light."). Claude's calls: from the side it is a wall as any other; a
turn, no oil; the plinth set as it opens, so a room seen before opens the
same; each floor's prize its own draw. D-907 moves to
`archive/DECISIONS-CARDS-2.md`, word for word.

**D-937 · 2026-11-15 · A harder Warden** (the owner's ask and picks,
[mock-ups](https://claude.ai/artifact/3P1t5ADXs6NW8BewfKZVtX); supersedes
in part D-692, D-886 and its Bestiary tip) Every blow and hurt rings off
the warden's stone, "Your blow rings off the stone.", with no flash, until
its slam misses: "The warden's fists sink into the floor!" Then it is open
till it next acts, so the hero steps back beside it and strikes once
(offered too: open 2 turns; open after every slam). Stone skin: each blow
does 1 less, never below 1, so four openings beat it. A bump only wakes
it. Once cracked it never stands still again (offered too: the count
restarts each slam; awake till beaten). Its tip: "Your blows ring off its
stone. When its fists go up, step out of the way. When they sink into the
floor, step back beside it and strike before it pulls them free. Four
openings beat it." Two steps: these rules, then its look and sounds:
stuck take C (stooped, a jolt and chips), a grey spark, the clink
`impactMetal_light_000`, the thud A6 (the heavy punch slowed with an
earth rumble and its stone knock a touch lower). D-935 moves to
`archive/DECISIONS-CARDS-2.md`, word for word.

**D-938 · 2026-11-15 · The Warden's look and sounds** (D-937's step 2,
the owner's picks; [sound board](https://claude.ai/artifact/ThY4FkXmmTFKHnK6V3cC1a))
The light metal clink was already Making's, two taps at their own pitch,
so a blow that rings off the warden plays it once, a quarter lower (75%;
offered too: 85%, 65%, the medium metal, the light stone plate). Claude's
calls: the clink plays in the hit's place, with no punch; it and the thud
A6 go under Creatures in Settings; the thud plays as the fists sink,
with the line. The grey spark shows with reduced motion too; the jolt and
the chips don't. D-936 moves to `archive/DECISIONS-BAGS.md`, word for word.

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
