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

**D-1013 · 2026-11-21 · The peddler's grid scrolls** (the owner's pick,
recommended; D-1011's last step) On the peddler's card, where the grid's
slots don't all fit, they scroll as the bag card's do. Upright, the window
ends where the chosen thing's name, its "carried" line and the price line
still fit above SELL or BUY (offered too: as the bag card, the name and
count only; down to the card's foot). Sideways, at the card's foot.
Claude's calls: one scroll for both tabs, the grid the bag's shape on
each (D-548); picking a ware or a slot brings its row into view; it
switches on only on a short upright window (176 × 264 and smaller), so
on every phone measured the card looks as before. D-1009 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-1014 · 2026-11-21 · The Lampeater's end, a cutscene** (the owner's
picks, both recommended, from a [page of sketches](https://claude.ai/artifact/BxhPDkuCvmqHcqT2KexMwM);
the Lampeater's polish, roadmap Now step 1) The first time on a journey
the Lampeater is beaten, a cutscene of about 3 s, as the way in's (D-957):
the black bars slide in and the controls fade as the camera glides from
the hero to where it fell; its eyes flare one last time; its body sinks
and fades as its gloamlings and wisps crumble; Leap's find shows where it
fell; then back out to the hero, and its line, "The Lampeater fades.
Something glows." (offered too: the door sinking open; a brazier going out
at each phase; a longer way in showing its brood; every time). No skip,
no sound, the shots cut with reduced motion. Claude's calls: about 3 s;
on a later beating, none; `fadeSeen` marks it seen, a save during it never
plays it again; the "+" of experience waits for its end. The owner's idea,
kept for later (`RESEARCH-2.md`): a rematch, something in the arena the
hero goes up to and asks for a harder Lampeater. D-1010 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-1015 · 2026-11-21 · The Homestone, a way home** (the owner's idea and
picks, all recommended but the cost and the carry, the owner's own) A
thing made to go home, the Homestone: one use, one way, onto the home
waystone's plate, the stairs' fade, as travel by waystone (D-593): free,
no oil burnt, the creatures there not acting before the hero's first
move. Instant (offered too: held 3 turns, a hit breaking it), and barred
with a creature awake beside the hero or chasing them, with its line
(offered too: always working; a portal back; once a trip, recharged at
home). Made at the workbench, its recipe showing once the home waystone
is woken (offered too: the bag's Make tab; the mortar), from 5 Duskstar
and 5 Stone (offered too: 3 or 8 Duskstar), at most 3 carried (offered
too: 4 or 5; one only), so it stays special and the waystones the way
back down. The owner's wish: it is not easy to get hold of, never used
willy-nilly. Claude's calls: the GEAR tab, its last slot; one stack of
3, a chest holding one stack too; USE in the bag, never dim; at home
already, or the home stone asleep, its own line, kept and free; its
lines and picture (a grey chip with the home rune in violet) Claude's
drafts. The owner's wish, kept for its step (2.13): each waystone a look
of its own by where it stands. D-1011 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-1016 · 2026-11-21 · The Peddler's gift** (the owner's idea and
picks, all recommended) Home on the surface, the Peddler gives one
Homestone (D-1015) on the first bump with room in the bag: his gift line,
free, the Homestone in the bag, and his card shut that bump (offered too:
his card opening after it). With no room, 3 Homestones carried counting
as none (offered too: a 4th past the cap), he says he has a gift and
his card opens as ever; the gift waits for a later bump with room
(offered too: nothing said). The owner's idea, in steps: this one first,
then a talk box on a bump, one of its choices Shop, then gifts now and
then (offered too: the box first; both at once). Claude's calls: the
waiting line on every bump with no room; a Peddler made by the dev tools
has his gift too; a save's Peddler already home gives it on the next
bump; his two lines Claude's drafts. D-1012 moves to
`archive/DECISIONS-SURFACE.md`, word for word.
