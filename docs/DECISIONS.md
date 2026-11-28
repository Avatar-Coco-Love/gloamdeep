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

**D-1020 · 2026-11-21 · Ideas from "how will it be special?"** (the
owner's wish) Asked what makes Gloamdeep unique and how far it can go,
Claude's ideas from that talk are kept for later in a new page,
`RESEARCH-3.md`, as `RESEARCH-2.md` is near 8 KB: light decides the boss
fights, your lights a map of your journey, the surface answers the deep,
other players' light, light-routing puzzles, and the bait as the player's
own pull. Nothing in them is decided. D-1015 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-1024 · 2026-11-22 · The spark freed** (the owner's picks, all
recommended, from the mock-up; the first part of the roadmap's 5.04,
builds D-034, D-508, D-633) A knot of gloam, dark threads with violet
edges wound round a dim spark, holds the spark in depth 2's room with
the stairs up, which every journey walks. Bumped with the lantern lit
it melts, a turn, and the spark is free for good: "The gloam lets go. A
small warm light comes to your side." With the lantern off it holds:
"The threads hold fast in the dark.", free. Freed, it floats by the
hero everywhere and glows; brightening near the First Light and talking
come later (offered too: a spider's web, an iron cage; depth 1, a depth 2
side room; only the trap this step; the lines "The spark slips free and
stays close, as if it knows you.", "The threads melt in your light. The
spark is free."; a bump that always frees). Claude's calls: its name,
Gloam knot; never cutting a way, 2 to 4 steps from the stairs where it
fits, not beside them; an ember melts it, as it lights a torch; the
line in two halves, one line, as it is too long for a row; the spark by
the left shoulder, the lantern right, easing and bobbing, rising from
the knot as it is freed, still with reduced motion; its look and the
knot's writhe; no sound yet; an older save's kept room gets its knot,
or the spark freed where none fits; the dev Spark switch. D-1021 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-1025 · 2026-11-22 · The spark speaks in light** (the owner's picks,
from the mock-up; builds D-034, D-508, D-633, D-1024) The spark must never
feel like a fairy: it never blocks a move, says each line once, hints and
never answers, and never calls with a sound. It speaks in light (look A):
its glow warms nearer the First Light and cools to violet and dims near
the gloam; it darts to things worth a look and shies from mimics; words
only on firsts and about once a depth a broken memory of the First Light,
in italics, no name. Later a tap opens its talk box (look B), the answers
leaning it Curious, Careful or Bold, each a small bonus, the leaning
always free to shift. It grows by boss gifts, a memory and a small gift
for each boss beaten (Warmth and Hush, Claude's drafts); later still a
warmth meter and commands (look C: SEND, HOLD, KINDLE) as their own
system, the owner's pick over folding them into the gifts. This step: the
glow (offered too: A alone, B, C; no growth yet; shying from mimics or
the first fall's line first; leanings to the ideas list, or set at each
chapter's end). Claude's calls: of the gloam, the gloamling and the
Lampeater, seen or not, a registry mark; the chill full within a tile,
gone past 4; about a second to turn; warmth by depth over 32 (D-635), the
halo up to 2 pixels wider and a little brighter; its violet; with reduced
motion at once. D-1022 moves to `archive/DECISIONS-SURFACE.md`, word for word.

**D-1026 · 2026-11-28 · A lighter restart** (the owner's picks; changes
D-1003 and how CLAUDE.md's "Propose before building" works) Coming back
after a pause, the owner found the next step hard to start. Three
changes: the Lampeater's polish no longer waits for the owner's ideas,
and the next step is the roadmap's 1.05, the hero at the Lampeater's
door (ideas still welcome any time); every Claude draft and call listed
under "Waiting on the owner" at 0.3.461 is approved as it stands, and any
can still be changed by a new decision (the list, word for word, is in
`archive/PROGRESS-LOG.md`); and fewer questions a step: Claude decides
the small things itself (wording, Bestiary words, colours, pixel looks,
timings, code structure, bug fixes), lists every pick in the PR and the
handoff, and asks only about gameplay and story (mechanics, numbers that
change play, new names, story). One PR a conversation stays, with no
exceptions, the owner's words: careful with the context window
(offered too: a playtest with no decisions first). D-1019 and D-1023 move
to `archive/DECISIONS-SURFACE.md`, word for word.
