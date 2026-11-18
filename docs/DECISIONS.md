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

**D-977 · 2026-11-18 · The Lampeater wary** (the owner's picks, all
recommended, and dimmed eyes too; builds D-971 and D-972, their step 5)
Struck and free again, with no cold brazier it can reach or 6 gloamlings
alive (counting any waiting in a bowl), it is wary 3 turns instead of
calling (offered too: only with no cold brazier); a call spoilt with no
other cold one, too. Wary, it keeps to the dark tile just past the
lantern's reach nearest it, following the hero and drinking at the edge;
with the lantern off it keeps the same distance as if it were lit, so
lighting it never catches it (offered too: only while lit; staying where
it stands). Its line as it starts, its eyes at half their glow while wary,
and its Bestiary words end "With none to call, it waits at your light's
edge." (Claude's draft). After 3 turns the struck mark clears and it comes
on as ever (offered too: wary again while nothing changes). The approved
line, "The Lampeater draws back to the edge of your light.", is too wide
for the strip; "The Lampeater draws back, wary." (Claude's) is in its place.
Claude's calls: nearest by steps, up, down, left, right on a tie; its turns
count down caught or not; it never calls while wary; with no way to such a
tile it acts as ever (`wary.js`). The bench, from 12%, 80% and 83%: Lean
7%, Middling 79%, Strong 85% (Q-111). D-974 moves to
`archive/DECISIONS-SURFACE.md`, word for word.

**D-978 · 2026-11-18 · The Lampeater's phases** (the owner's picks, all
recommended; builds D-971 and D-972, their step 6) At 8 and 4 of its 12
hearts it owes a snuff, done once free, as its breath was; caught, it waits
(offered too: at once). The call it makes for being struck is the phase's
second gloamling, so 2 from that blow (offered too: an extra call, 3). With
no brazier lit when it is free, the phase is spent and it only calls
(offered too: calling twice; waiting to snuff). The bench's half start
counts the first phase done (offered too: owing it). The line at a phase
and the 6 limit, Claude's to judge: no new line, the breath's says it; a
snuffed bowl keeps a gloamling only while fewer than 6 are out. Claude's
calls: owing or breathing, it neither calls nor is wary; its call after a
snuff is from another cold brazier, else wary (D-972); one blow past both
owes both; its Bestiary words "At two thirds and one third of its hearts,
it snuffs a brazier." (Claude's draft). The bench, from 5%, 79% and 83%:
Lean 35%, Middling 84%, Strong 94%, the catch's snuffs gone (Q-111).
D-976 moves to `archive/DECISIONS-SURFACE.md`, word for word.

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

**D-988 · 2026-11-18 · The game's findings some players notice**
(Claude's picks, hands-off, D-980, but H-75's ruling, the owner's, recommended;
H-72 to H-75) The Shovel digs only a bare stump: one with a find on it,
such as Wood a full bag left, is walked onto, so the tree still grows
back (H-72). `tools/perf.js` times three scenes, the surface, a dark
room on depth 3 with the lantern lit and the Lampeater's arena, and
prints any error the page logs (H-73). Each sound file is fetched and
decoded once, shared by every sound that plays it (H-74). A text line
that would cover the hero stands 2 px above the hero's tile until it
doesn't (H-75; offered too: the hero on top; as is). Found doing H-73:
0.3.424's split left 13 names out of `frame.js`'s imports, so since then
no darkness was drawn in play and the effect marks went missing; the
imports are back, and `tests/imports.test.js` checks every file uses
only names it imports or makes.

**D-989 · 2026-11-18 · The game's findings few players notice**
(Claude's picks, hands-off, D-980, but H-78's, H-79's and H-81's rulings,
the owner's, recommended; H-76 to H-81) What the Lampeater owes at a phase
is known before the creatures move, so a phase blow that burns the last
oil never starts it wary (H-76). A gloamling waiting in a bowl lit again
comes out onto a free tile beside it, lit or not (H-77). A slam that
takes the last heart slides nowhere: the hero falls where struck (H-78;
offered too: past the door). Behind a Leap gap only the cache and the
Archway: every other creature and find moves to the nearest bare floor
on the near side, not within 2 tiles of the way in, a flask's rat
nearest its flask, a pack moved left its lead alone; with no space left
it is not made (H-79; the owner's pick, asked again once the check's 14%
measured 47%: 440 of 927 gap rooms had a creature behind; offered too:
leaving them out; as is). The stats line says "jumped: no goals or
records" after a dev jump, and DEV-TOOLS.md says what a jump stops
(H-80). Once Leap is learnt, How to play's Touch and Mouse pages say
"The Leap button, then a way", Keyboard "J, then a way" (H-81; offered
too: always; not yet). D-984 and D-985 move to
`archive/DECISIONS-AUDITS.md`, word for word.

**D-990 · 2026-11-18 · The docs step** (Claude's picks, hands-off, D-980;
H-84 to H-86) CONTENT-BOSSES gives the Lampeater 12 hearts and, below
its row, its later steps in short: the phases' snuffs, the brood, calls,
guards and wary; GLOSSARY-2 has their words, GLOSSARY-CREATURES points
there. DEV-TOOLS says the bench's At half starts on 6 hearts, its first
phase done, and lists the Boss tab (H-84, H-86). GLOSSARY-2's Gap, the
`giveWay` sound's row and Q-114's line no longer have the falling floor
D-967 took out (H-85). TECH-2 sends newer tiles and places to
CONTENT-5; STORE.md's Needed row: ship only the 117 sound files the game
plays, 9.9 MB of 23 MB (H-86). D-979, D-986 and D-987 move to
`archive/DECISIONS-AUDITS.md`, word for word.

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
