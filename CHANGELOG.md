# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.3.js` (D-254, D-528).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- `0.3.x`: stage 0.3, the world (D-168), from 0.3.0, once stage 0.2's
  last steps were done (D-528).
- Later minor versions (`0.4`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.3.311 (2026-11-12)
- Bumping a campfire or the miners' camp now shows its first words ("A campfire, burning high.", "A miners' camp, long left.") on the text line under its card, where before the card hid them.
- Decisions: D-866. D-858 moved to the archive, word for word.

## 0.3.310 (2026-11-12)
- Arriving on the home waystone by travel, or waking there after a fall, now offers the boon card once you stand still, if you hold no boon.
- Skip the boon card and step off and back on, and it shows the same three boons until you leave the room; no more drawing again for free.
- A boon's words now say it lasts "until you are back at the waystone", where it really ends, not "until you are home".
- Putting a second workbench or other one-of-a-kind piece into a stash chest that holds one now says "The chest already holds a workbench.", not "The chest is full." when it isn't.
- Decisions: D-865.

## 0.3.309 (2026-11-12)
- Stepping on a find with no room in your bag now always says why: "Your bag is full.", or its own line when you carry some of it, like "You can't carry more wood."
- A second workbench, chest or other one-of-a-kind piece from your lost bag, a stash chest or a stack you set down now says "You already carry a workbench." (or its own line), not "Your bag is full." when it isn't.
- Decisions: D-864.
