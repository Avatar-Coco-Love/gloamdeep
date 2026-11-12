# Health check: the done findings

Moved word for word from `docs/HEALTH-CHECK.md` and `HEALTH-CHECK-2.md` at
the fifteenth audit, 0.3.313 (D-868), each with the version that did it.
Never read whole; grep for an H number.

## From `HEALTH-CHECK.md` (the 0.3.304 health check, D-860)
- **H-01 The bed's gold heart disappears.** Taking a boon, a boon
  ending, or sitting by a campfire caps hearts at the most, so the gold
  heart goes, with no line; D-488 says only a bite or a fall takes it.
  `boon.js:73`, `state.js:35`, `fireside.js:30`, `sleepout.js:56` (the
  last read). Ran. Suggests: none of the four may lower hearts held.
  Done at 0.3.308 (D-863).
- **H-02 A find stepped on with a full bag says nothing.** Wood with
  every stack full has no line, against D-339 (`items.js:128`,
  `turn.js:112`). Any find with none of its kind carried is silent too,
  the locket included, as D-339 has it; D-511 fixed only the herb. Ran.
  Suggests: every find says "Your bag is full.", wood its own line.
  Done at 0.3.309 (D-864).
- **H-18** A second one-of-a-kind piece from the lost bag or a chest
  says "Your bag is full." (`fall.js:16-27`, `chest.js:71`). Ran.
  Done at 0.3.309 (D-864).
- **H-19** The Heart tile counts boon hearts: "Hearts 12 of 10"
  (`growth.js:88`). Ran. Done at 0.3.308 (D-863).
- **H-22** Every sound is `.ogg`; older iPhones may stay silent. Done at 0.3.313 (D-868).
- **H-23** 266 code files at boot, 328 KB of them version history. Done at 0.3.313 (D-868).
- **H-31** Stale comments (`enemies.js:30-32`, `behaviours.js:40-42`,
  `tiles.js:47`, `cave.js:176,369`, `events.js:7-45`); `craft()`
  unused by the game (`bagturn.js:54`); `WORKFLOW.md` 17 bytes under
  its cap; `main.js` 48 KB. Done at 0.3.313 (D-868).
- **H-66** More stale comments: `items.js:244-246`, `tiles.js:127-129`,
  `people.js:7`, `turn.js:81`, `fishing.js:1,16,25` (second pass, D-861). Done at 0.3.313 (D-868).

## From `HEALTH-CHECK-2.md` (the second pass, D-861)
- **H-32 No boon after travelling home.** Arriving on the home plate by
  travel or a fall, the tap opens the travel card, never the boon card;
  D-583 offers one each time the hero sets out (`boon.js:54-56`,
  `main.js:283`). Played. Suggests: arriving opens the boon card.
  Done at 0.3.310 (D-865).
- **H-33 A campfire's and the miners' camp's first words are hidden.**
  The text line isn't drawn over the ask card (`frame.js:409,424`);
  D-757, D-844, D-770 put them on the line. Played. Suggests: draw the
  line over the card when a bump opened it. Done at 0.3.311 (D-866).
- **H-34 The Look card's tabs are 26 px tall on a phone** (`cloak.js:27`);
  D-513's 44 px. Played. Suggests: taller taps, same look. Done at
  0.3.312 (D-867).
- **H-35** The boon's words say "until you are home"; it ends at the
  cave mouth's room (D-753; `render/boons.js:12`, `boons.js:23`,
  `opening.js:12`). Ran. The owner approves the words. Done at
  0.3.310 (D-865).
- **H-37** The Look card by keyboard: Up from RANDOM re-picks every
  cloak passed, losing the rolled one (`looks.js:154-158`,
  `profilescreens.js:73`, D-522). Played. Suggests: Up jumps to the tab.
  Done at 0.3.312 (D-867).
- **H-44** Skipping the boon card and stepping off and on draws three
  new boons (`boon.js:61`). Played. The owner rules if that's allowed.
  Done at 0.3.310 (D-865).
- **H-67** A second one-of-a-kind piece put into a stash chest that
  holds one says "The chest is full." when the chest has room
  (`chest.js:66`, `bag.js:26`; H-18's other side, added by the owner
  at 0.3.309). Ran. Suggests: its own line, as H-18's. Done at
  0.3.310 (D-865).

## For 0.3.314, after the audit (D-868)
- **H-24** Read only: a boulder may grow back on a waystone's ring
  (`regrow.js:47-54`); a drop may land on water (`spread.js:16`); dev
  Spawn onto a person (`spawn.js:27`).
- From H-31: `craft()`, used by no screen (`bagturn.js:54`), taken
  out (D-868).
  Done at 0.3.314 (D-869).
