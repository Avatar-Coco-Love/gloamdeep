# Health check 3: the game

The third health check, at 0.3.420 (D-975), ran hands-off: helper
agents looked at one area each, and every finding was checked again by
another before it was kept (60 found, 40 kept). Nothing in the game
changed. The owner picks which become steps; each step works as before
(D-860): Claude checks the finding still holds, offers 2 or 3 fixes with
a recommendation, and builds only the owner's pick. "Suggests" is
Claude's recommendation, not a decision. Since 0.3.422 (D-980), the
owner's wish, Claude builds its recommended fix at each step without
asking, and lists its picks in the PR; gameplay rulings are still asked. Numbered on from the first two
checks, never reused. How we work (reading less, each PR costing less)
is in `HEALTH-CHECK-3-WAYS.md`; the working notes, with every dropped
finding and why, in `archive/HEALTH-CHECK-3-NOTES.md`.

"Played": in a browser; "ran": the game's own rules in a script;
"read": in the code only; "measured": numbers.

## 1. Most players notice
All four done in 0.3.426 (D-986, D-987).
- **H-68 Card buttons are under 44 px on a phone.** MAKE, STORE, TAKE,
  SELL, DRINK are 42 px tall, DROP 34 (`bag.js:62,72,164-168`,
  `makecard.js:27`, `benchpanel.js:42`, `chestpanel.js:47`); TECH.md
  and D-513 say 44. Measured. Suggests: one shared pad, one test over
  every card.
- **H-69 Choosing a draught hides its "Now" picture** under its look
  line for 4 seconds (`bagturn.js:295`, `frame.js:480`; D-909, D-386).
  Played. Suggests: no look line while the card shows the picture.
- **H-70 "Leap which way?" stays** up to 4 turns after the leap or a
  cancel (`main.js:409-412`, `leap.js:24`; D-962). Ran. Suggests:
  the leap clears it.
- **H-71 The first-day mole costs a new hero 3 of 5 hearts,** striking
  at once: 4 hits, 3 bites, 50 seeds of 50. Its numbers were set for
  depth 5 (D-541); D-781 brought it to the first room. Ran. The owner
  picks: a gentler surface mole; none in the start room on day 1; as is.

## 2. Some players notice
- **H-72 The Shovel digs out a stump with felled Wood on it:** the Wood
  stays, the tree never grows back (`turn.js:96`, `shovel.js:15`;
  D-926, D-934). Only with a full bag as it fell. Ran. Suggests: dig
  only a bare stump.
- **H-73 Walking in a dark big room is over the frame budget,** 17 to
  21 ms on a 4x slower CPU (D-430: 16.7 ms), and `tools/perf.js` plays
  only daylight, so its light reads 0.0 ms (`frame.js:337`). Measured.
  Suggests: perf.js measures a dark room and the arena too. Since
  0.3.425 perf.js reaches play; before, it timed the opening screen,
  and walking on the surface now reads 57 ms (D-985).
- **H-74 Sound On decodes shared files again for each voice:** 314
  copies of 111 files, about 69 MB held, not 28 (`sound.js:283-290`).
  Measured. Suggests: one decoded copy per file.
- **H-75 The text line can cover the hero** low in a room, for up to
  4 s (`textline.js:17-20`; D-381, D-505, D-932). Played. The owner
  picks: as is; the line moves up; the hero on top.

## 3. Few players notice
- **H-76 A phase blow that burns the last oil** starts wary at once:
  it runs out during the breath, so the Lampeater bites on instead of
  hanging back (`snuff.js:40,75`, `creatureturn.js:234`; D-978). Ran.
  Suggests: the snuff owed is known before creatures move.
- **H-77 A gloamling waiting in a re-lit bowl** never comes out but
  counts toward the 6 for good (`brood.js:27-40`, `call.js:22`; D-972).
  Ran. Suggests: lighting the bowl lets it out.
- **H-78 A slam that takes the last heart by a doorway** has the fall,
  and the lost bag, in the next room (`sting.js:36-42`; D-887 is
  silent). Ran. The owner rules: where struck, or past the door.
- **H-79 A Leap gap cuts off a corner, creatures too:** 14% of gap
  rooms have one behind it, under 2% 4 or 5 finds (`leapgap.js:42-50`;
  D-968). Ran. The owner rules: write it in, or keep the corner clear.
- **H-80 A dev jump stops goals, Bestiary and Records** for the whole
  journey, as D-232 decided, with nothing on screen or in DEV-TOOLS.md
  saying so (`main.js:162`). Played. Suggests: a word on the dev line.

## 4. For later steps
- **H-81 Leap is not in How to play** (`howto.js:63-82`): asked at
  D-971's card step.
- **H-82 The page loads 299 files, 1.6 MB, before the title** (H-23
  made only the history wait). Measured. Suggests: measure on a phone;
  later, cards and dev tools load when first used.
- **H-83 Each turn saves the whole world:** 26 KB fresh, about 1 MB
  with every room to depth 60 (`save.js:131`). Measured. Suggests: as
  is until a phone is slow; then a key per room.

## 5. One docs step
- **H-84** The Lampeater: CONTENT-BOSSES says 8 hearts (12, D-950),
  DEV-TOOLS.md:90 4 at half (6); snuffing, calls, guards, wary and
  phases (D-947, D-974 to D-978) are in no CONTENT or GLOSSARY doc.
- **H-85** The falling floor D-967 took out is still in `GLOSSARY-2.md:18`,
  `SOUNDS.md:43` and Q-114's quote (now "Too wide to step. More lies
  beyond.").
- **H-86** `DEV-TOOLS.md:22` lacks Boss; `TECH-2.md:79` sends new
  places to CONTENT-4, CLAUDE.md to -5; STORE.md: ship only the 117
  sound files the game plays (9.9 MB of 23 MB).
