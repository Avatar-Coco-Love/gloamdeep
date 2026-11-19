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

**D-991 · 2026-11-18 · The tank slot next** (the owner's picks, both
recommended; builds D-459) Of the RPG upgrades talked over, the lantern's
tank slot is planned first (offered too: the glass slot; the forge). It
comes as build step 27, after the Lampeater's polish or step 26 (offered
too: right away; after the 0.3.433 audit). Its part, recipe and numbers
are the owner's picks at its step.

**D-992 · 2026-11-18 · Leap's find and its card** (the owner's picks, all
recommended; builds D-971 and D-972, their step 7; answers Q-083's note)
Beaten, the Lampeater leaves Leap's find on its tile, always (its `sure`
find), drawn as the Leap button's icon in gold; the door stays sealed.
Stepped on, it is used up, Leap learnt; a card opens: "A new ability",
the icon, "Leap", "Jump 2 tiles in a line, over a creature, water or a
gap. Tap the Leap button or press J." and OK (offered too: shorter; a
story line). Closed, the door sinks open, "The stone door sinks open."
For every boss, its big rewards (found ability, Feat, relic) are never
lost, whatever lands the last blow (offered too: stings and globs can't
hurt it; the rule as it was). Your ideas for its cutscenes, phases and
more are asked after step 8, the sound (offered too: now; no more).
Claude's calls: the lines "The Lampeater fades. Something glows." and its
look "A mark glows where it fell." (drafts); fallen before taking it, the
find stays and the way in opens to come back; a journey saved under the
card opens the door on the next step. D-971 and D-972 move to
`archive/DECISIONS-SURFACE.md`, word for word.

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

**D-994 · 2026-11-19 · Leap's card's sound** (the owner's picks, all
recommended, from a [board of 3 mixes](https://claude.ai/artifact/As9JukRhEKXvG3nBsGcDrf);
builds D-971 and D-992, their step 8) As a new ability's card opens, the
flame rises: a whoosh of fire, four bells rising, a low bell held under
them (offered too: five glass notes rising over a soft hum; one deep bell
with a breath). The page still turns with it (offered too: the sound
alone). It follows Finds' loudness (offered too: Fighting; Menus).
Claude's calls: `learn` in `render/sound.js`, `Fire-030` from 0.1 s, 1 s,
fading 0.5 s, at 0.2; the waystone's bell at 1, 1.26, 1.5 and 2, from
0.25 s, 0.2 s apart, at 0.16 to 0.13; `impactBell_heavy_001` from 0.25 s,
2.6 s, fading 1.6 s, muffled above 1500 Hz, at 0.2. Finds' list is full on
the smallest card, so it is heard under Places' line, as the drips (D-836).
Next, the owner's Lampeater polish is asked.

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
