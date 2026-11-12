# Health check steps

The 0.3.304 health check (D-860) played the game, read `src/` and
compared both with the decisions and docs. The owner picked these
findings to become steps. Each has its number in the report, H-01 on,
never reused. One step at a time, in `HEALTH-CHECK-ORDER.md`'s order
(D-862): Claude checks the finding still holds, offers 2 or 3 fixes with a recommendation, and
builds only the owner's pick. "Suggests" is Claude's recommendation,
not a decision. A done step's line gets its version, and moves to
`archive/HEALTH-CHECK-DONE.md` at the next audit. The full report, with every option:
https://claude.ai/artifact/Lv8sNA91e7X949uKDe4E4s
The second pass's steps, H-32 on, are in `HEALTH-CHECK-2.md` (D-861).

"Ran" means reproduced with the game's rules in a script; "read" means
seen in the code only.

## 1. Most players notice
All done: in `archive/HEALTH-CHECK-DONE.md` (D-868).

## 2. Clear bugs, one step each
- **H-05 A scorpion's rest is cut short near a spit grub.**
  `spit.js:33-35,54` lowers any creature's `rests`, and
  `creatureturn.js:178-180` lowers it again; D-729. Ran. Suggests: the
  spit code touches only spitters.
- **H-09 The Peddler's room refuses torches.** His sealed tile makes
  the room count as cut in two (`regrow.js:67`, `cave.js:253-254,313`,
  `bagturn.js:297`): no Torch or Glow Lamp set down (D-478), no deposit
  grown back, no flask mimic (D-366), until a heap is dug. Ran.
  Suggests: the joined check leaves his tile out.
- **H-11 The oil tick's drink never warns.** `endturn.js:42` checks the
  oil before creatures act, so `oilLow` and `oilEmpty` never come from
  a drink (`creatureturn.js:56`). Ran. Suggests: check again after.

## 3. The game against a decision: the owner picks which holds
- **H-04 Waystone travel counts down poison and draughts.** D-593:
  "no turn passes"; `travel.js:51` ends with `endTurn`. Ran: a heart
  lost to poison on travelling. Suggests: travel skips the countdowns.
- **H-06 A mole bitten up close still digs away.** D-726: "already
  beside the hero as it notices, it never digs"; `creatureturn.js:190`
  never records it. Ran. Suggests: follow the decision.
- **H-10 Goals ticked quietly still pay.** D-752: "paid nothing";
  `goals.js:149-164` always pays. D-746 and D-735 say unpaid, D-705
  paid. Ran. Suggests: follow D-752 for the oil goal; the owner rules
  on the rest.

## 4. Balance: the owner picks the rule
- **H-07 Nothing grows back at home while the hero stays.** Daylight
  lights every tile and sleep keeps the hero in the room, so D-307's
  "out of the hero's light" never comes (`regrow.js:88`, `sight.js:41`).
  Ran. Suggests: sleeping counts as being away.
- **H-08 Cave pools are half as common as decided.** D-500: about 1
  room in 2; measured about 27% (`cave.js:271-280`), since rooms shrank
  (D-645). Suggests: try more spots, measure, show a map preview.

## 5. Sounds only when On
- **H-03** The first tap fetches all 115 sound files (7.9 MB) and
  unpacks all five tunes, with Sound Off (`sound.js:270-296`). Read.
  Suggests: fetch once Sound is On, and only the place's tune.

## 6. Small fixes, a few a step
- **H-12** How to play: the pick "In the bag"; it is the Tool slot
  (D-552, `howto.js:56`). The owner approves the words.
- **H-13** Two goals done on one turn: only the first is announced
  (`main.js:155`). Read.
- **H-14** An error that repeats every frame skips drawing and saving
  (`main.js:610-622`). Read. Suggests: a net each.
- **H-15** A stuck mole "bursts up beside you" from far off (D-857,
  `creatureturn.js:252`). The owner picks the words.
- **H-16** A fall can wake the hero inside a workbench set on the
  journey's first tile (`waking.js:16`, D-737). Ran.
- **H-17** A draught drunk on the turn of a fall still works after
  waking (`bagturn.js:149-151`, D-791). Ran.
- **H-20** "Healing herb" on cards, "Herb" in lines (`lines.js:331`).
  The owner picks the name.

## 7. Save safety
- **H-21** One unreadable profile slot blanks all three, then is
  saved over (`profile.js:57-63,112-116`); a newer version's journey
  is dropped unsaid (`save.js:98`). Read. Suggests: keep what reads,
  set the rest aside under another key.

## 8. One docs-only step
- **H-25** `README.md` says "one room so far".
- **H-26** `GLOSSARY-2.md:12,14,17,34`: lampmoth, scorpion, mole and
  the ways, against D-534, D-729, D-726, D-857, D-858.
- **H-27** `CONTENT.md` ways lack pack and lurks; `CONTENT-4.md:20`
  lacks the centipede and spit grub; `CONTENT-3.md:35` the deeper
  waystones; `regions/starting-region.md:81` "a pond at home".
- **H-28** Quick Pour, Guard and Thrift (D-816 to D-818) are in no doc.
- **H-29** Finds' uses behind: `GLOSSARY-FINDS.md:22-24`,
  `CONTENT-FINDS.md:15,22,27`.
- **H-30** `GLOSSARY-CODE.md:73` Quests "later"; `GLOSSARY.md:48`
  Glints from goals too; no entry for hall, large room, dead end,
  cache; `SOUNDS.md:27,29` 52 for 51; `screens.js:140`'s boon words.
- Joined from the second pass (D-861): **H-62** `ART-DIRECTION-2.md`
  behind (the dungeon bricks built, D-229; cloaks, heads, lights);
  **H-63** glossary gaps (Settings words, Tough, the herb mimic's room,
  "Earn more from Feats."); **H-64** `GLOSSARY-FINDS.md:34-56,103`,
  `GLOSSARY-2.md:32`, `CONTENT-2.md:18`: marks' numbers (D-847), the
  minnow's pond (D-734); **H-65** `DEV-TOOLS.md`'s switch names.

## For 0.3.314, after the audit (D-868)
- **H-24** Read only: a boulder may grow back on a waystone's ring
  (`regrow.js:47-54`); a drop may land on water (`spread.js:16`); dev
  Spawn onto a person (`spawn.js:27`).
- From H-31: `craft()`, used by no screen (`bagturn.js:54`), taken
  out (D-868).
