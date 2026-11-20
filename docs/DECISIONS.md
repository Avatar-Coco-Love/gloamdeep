# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`PR-CHECKLIST.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force: `archive/README.md`
says which file holds which IDs; grep there for an ID or topic.
The standing rules on how we work (D-338, D-363, D-431, D-518, D-732,
D-741, D-790, D-852, D-923) are in `archive/DECISIONS-WAYS.md`.

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

**D-980 · 2026-11-18 · The health check's steps, hands-off** (the owner's
wish) The owner, at work, asked that the third health check's steps
(D-979) be done without their picks: Claude builds its own recommended
fix for each finding, keeps to what the finding and the decisions
already say, invents nothing new, and lists every pick in the PR and the
handoff, so the owner can change any before merging. Merging stays the
owner's call, one step a conversation as before. `CLAUDE.md` says it
too. Changed before the merge, the owner's words: not a rule never to
ask; what really matters, such as the five gameplay rulings (H-71, H-75,
H-78, H-79, H-81), is still asked, as multiple choice.

**D-993 · 2026-11-18 · Four open questions settled** (the owner's picks)
A picked duskstar never grows back on a waystone's ring, as boulders
(answers Q-103; offered too: leave it). Claude's plan for special
creatures' stories is approved: the lore pages tell the past, the
Bestiary page what it is now, the guide and people rumours of where it
is; bosses get all three and every reward, wanderers rumours, a Bestiary
page, a Feat and perhaps a relic, rare named ones a Bestiary page, a
Feat and a trophy (part of Q-083; offered too: everything for all;
later). Play data is kept on the device, with a dev button to save it,
and near 1.0 also sent if the player opts in, with a privacy note
(answers Q-052, the owner's own answer). Half and Automatic light are
measured again at the next audit, then the owner chooses (Q-069;
offered too: drop them; make Half do more).

**D-995 · 2026-11-19 · The eighteenth audit** (the owner's picks, all
recommended) At 0.3.433, nothing visible changed. Half and Automatic
light are dropped, no Light line in Settings (answers Q-069; supersedes
D-432, D-433, D-435, D-437; offered too: build them as decided; keep
waiting): measured again on the simulated slow phone (4× slower), Full
takes 5 to 6 ms of light a frame and 55 to 60 fps in the dark and the
arena; Half, built for the measure and taken out again, saves about
1.5 ms and no fps; at 6× slower, walking in the dark, Full 46 fps,
Half 54. They can come back if a slow phone struggles. Sound's file
list goes from `render/sound.js` to `sound-files.js` and `-2`, so
sound.js is under 20 KB (offered too: sprites.js in two; a section of
main.js); D-977, D-978 and D-988 to D-990 move to the archive (offered
too: the health check's three only; none); the lines since the last
audit to `archive/WORKFLOW-8.md`; all word for word. perf.js's surface
walk takes the first way with 4 open tiles, as it was chopping a tree
(offered too: a digging scene as well; as is). A bug hunt over the code
since 0.3.394, and the measure: F-9 and F-10 in `BUGS.md`; which to fix,
and when, is the owner's pick. The next audit is at 0.3.473.

**D-996 · 2026-11-19 · The big planning run** (the owner's idea and
picks, all recommended) Before building more, Claude and a team of
agents plan the game's future, as the third health check found its
faults; the method is in `PLANNING.md`. Up to 1.0, in three horizons:
Now, Next, Toward publishing (offered too: the next stage only; launch
and beyond). Grounded ideas plus a marked wild tier (offered too:
strictly grounded; blue sky). Reviewed on an interactive planning board,
Keep, Maybe or Drop a card (offered too: chat rounds; a written
roadmap). Every area in one run, then the review an area a sitting
(offered too: an area at a time). Eight areas, Claude's list the owner
liked. Run in a fresh conversation; nothing it proposes is decided until
picked. The Lampeater's polish waits until after it. Each conversation stays
well under 200k tokens (the owner's ask): the run split across
conversations, agents writing to files and reporting back short, Claude
reading briefs, not sources (`PLANNING.md`).

**D-997 · 2026-11-19 · The board's recommendations** (the owner's picks, all
recommended; builds D-996) Each planning board card shows Claude's
recommendation, Keep, Maybe or Drop with a short reason, from one agent's
pass over the areas, checks and synthesis (`docs/planning/RECS-*.md`;
offered too: from the synthesis only; Claude reading each area). It shows
as a line on the card and a dot on that button, the pick left to the owner
(offered too: a pre-filled pick; the line only). The owner's own answer is a
box always open beside the pick, saved with it (offered too: a clearer
button; a fourth choice, Other).

**D-998 · 2026-11-20 · The roadmap to 1.0** (the owner's picks, all
recommended; builds D-996) The planning board's 141 cards are picked: 97
Keep, 29 Maybe, 15 Drop. The kept ideas make the roadmap, `ROADMAP.md`, by
Now, Next and Toward publishing, in build order, one line an idea with its
full text left in `planning/` (offered too: Now as PROGRESS's build steps;
a file per horizon). The maybes and drops go to `RESEARCH-PLANNING.md`
with why and when to look again; the owner's two new ideas (the lantern's
mods and kinds of light; talking with the spark) to `RESEARCH-2.md`
(offered too: all in `RESEARCH-2.md`; maybes in the roadmap). A few
decisions, not one an idea (offered too: one; one an area). `planning/`
and the board stay as the record (offered too: archive `planning/`). A
kept idea's names, numbers and story are still drafts, picked at its step.

**D-999 · 2026-11-20 · The choices the picks settle** (the owner's picks on
the board; builds D-998) Firedamp is the mines' rule-bender, one a chapter
to start (2.07, 8.07); minecarts wait. Portals come after all four
chapters (8.09, D-019, D-032). About 10 creature kinds a chapter, as D-643
(3.08; 8.08 dropped). All four stations, as D-455 and D-771 (8.10
dropped). The Gloam Eye stays chapter 1's glass, as D-799 (1.10
dropped). One phone playtest of the first hour comes first and decides
the teaching goals 6.01 and 6.02 (6.04). The first mole gets gentler, not
gone on day 1 (6.05). Chapter 1 is finished in 8.01's order, the
Lampeater's polish first.

**D-1000 · 2026-11-20 · The owner's notes on the board** (the owner's own
answers; builds D-998) The lure wisps (3.04, D-939) are built as part of
the Lampeater's polish (D-992). The first fall's words (8.04) match D-020:
levels, unlocks and lore kept, the pack waits where you fell; Gentle and
Normal only; the words a draft. 7.06 and 7.07 fold into 6.12; 7.14 and
6.15 into 1.15; 8.05 into 6.04. Paid or free (7.16) is decided once
chapter 1 is done; 8.15 and 8.16 at 0.4.0, with 8.06's count. The
privacy page says nothing is sent; play notes only if decided later
(7.11, D-993). Music is new from chapter 2 only (8.11, D-837 to D-841).

**D-1006 · 2026-11-20 · The lantern's slots, shown** (the owner's picks,
both recommended, from mock-ups; the roadmap's 1.02, picked as the next
content before the Lampeater, its polish saved for later; builds D-459,
D-483) The lantern's three slots, Wick, Tank and Glass, show as a LANTERN
row in the bag: beside the gear row sideways, under it upright, the bag's
slots a row lower there (offered too: a LANTERN tab of its own; the slots
only in a part's own words). An empty slot shows its kind faintly, as the
gear row's; the empty Glass a plain pane outline (offered too: the Gloam
Eye, faint; an empty frame). Offered as the next step too: a second
flower; a gentler first mole; a new creature for depths 1 to 7. Claude's
calls: a lantern slot chosen shows its part's name, slot, numbers and Look
line, as a gear slot's; nothing comes off, Fit still swaps a part; the
pane's picture, a pane of glass between a cap and base of the lantern's
trim (draft); sideways "GEAR" stays when both labels fit, else only
"LANTERN"; the arrows reach the row, sideways along the gear row's line,
upright a row between; the parts' Look lines kept as they are.
D-1003 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-1007 · 2026-11-20 · The Glowcup, and rooted flowers** (the owner's
picks, all recommended, from a [mock-up](https://claude.ai/artifact/T15W9fCHJBLpK6kx15BcNx);
step 26, part of Q-092; the owner's words: "Flowers are rooted to the
Earth.") The second flower is look B of three, the **Glowcup**: a deep
teal cup round a pale green heart, two long leaves; it only looks bright,
giving no light (offered too: a pale bell; a stone rose). One grows in
about half the rooms of every floor from depth 1 down, the heartcap's odds
(offered too: every room; 1 in 4). Walked onto, it goes in the bag for
crafts later; picked, it comes back a day later on another floor tile of
its room, as the duskstar. Flowers are rooted: on their own tile, still,
the stem in a tuft of earth, a grass blade either side, with no shadow
(offered too: herbs, or every growing thing, rooted as well). Claude's
calls: never in a vault, the arena, its hallway or beyond a Gap, nor on a
waystone's ring; stacks of 20; its own shade and way it faces, as the
duskstar; its lines ("You pick a glowcup." and two more); one tuft on grass
and cave floor alike; an older save's rooms never entered get theirs.
D-1004 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-1008 · 2026-11-20 · Herbs and mushrooms rooted** (the owner's
words: "Let's root the herbs and mushrooms too, so they stand on the ground
like the flowers."; one of D-1007's offers) The healing herb, the oilcap
and the heartcap are rooted as the flowers are: on their own tile, still,
their foot on the tile's bottom row in a tuft of earth, with no shadow:
a herb's with a grass blade either side, a mushroom's earth alone, outside
too (changed after the playtest, the owner's pick: "Underground, the
mushroom doesn't need any grass on the side"; offered too: no blades
underground only, for mushrooms or for everything). Claude's calls: their
tuft is open in the middle, so their own foot shows (the flowers' keeps
its stem); a herb
mimic asleep and a snapcap shut stand rooted too, as the finds they copy,
lifted over a shadow again once they show themselves; other finds still
bob. D-1005 moves to `archive/DECISIONS-SURFACE.md`, word for word.
