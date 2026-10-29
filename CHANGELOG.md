# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.2.js` (D-254).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- Later minor versions (`0.3`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.2.167 (2026-10-29)
- Fixed: a creature standing where you arrive (on stairs, through a doorway) or wake after a fall now steps aside to the nearest free tile. Before, you and it shared one tile, both stuck: it couldn't bite and you couldn't hit it.
- The lighting is worked out about twice as fast, so play should run smoother on phones. Every pixel looks exactly as before; this was checked picture by picture.
- If your journey can't be saved, because the browser's storage is full or blocked, the text line now says "Your journey could not be saved." in amber, once. Before, saving failed silently.
- Decisions: D-426, D-427 and D-428. Questions opened: Q-068.

## 0.2.166 (2026-10-29)
- A shared link to the game now shows a card: the title screen without its menu, the hero in the lantern's light under the name, with the line "Carry a lantern down through the gloam." Nothing in the game itself changes.
- The picture, `share.png`, is the one image file allowed. A script, `tools/sharecard.js`, draws it with the game's own code; it is drawn again when the title art changes.
- Decisions: D-425.

## 0.2.165 (2026-10-28)
- Tap to walk is now Off at first, and switched off once for everyone, saved games too. Turn it back on in Settings. You walk by swiping or with the arrow pad.
- A ring about a thumb wide round the arrow pad now ignores taps and held fingers, so a thumb that misses the pad no longer sends the hero walking. A swipe that starts there still steps.
- A tap or held finger past the room's edge, where there is no way, now does nothing; before, the hero headed that way. A tap on a wall or unexplored dark inside the room still walks as near as it can.
- Decided, not built yet: past a doorway that leads outside, the woods will go on instead of brick, with a grass path and daylight. Pictures come first.
- Decisions: D-422, which supersedes part of D-406, D-423 and D-424.
