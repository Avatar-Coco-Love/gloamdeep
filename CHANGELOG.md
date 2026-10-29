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

## 0.2.165 (2026-10-28)
- Tap to walk is now Off at first, and switched off once for everyone, saved games too. Turn it back on in Settings. You walk by swiping or with the arrow pad.
- A ring about a thumb wide round the arrow pad now ignores taps and held fingers, so a thumb that misses the pad no longer sends the hero walking. A swipe that starts there still steps.
- A tap or held finger past the room's edge, where there is no way, now does nothing; before, the hero headed that way. A tap on a wall or unexplored dark inside the room still walks as near as it can.
- Decided, not built yet: past a doorway that leads outside, the woods will go on instead of brick, with a grass path and daylight. Pictures come first.
- Decisions: D-422, which supersedes part of D-406, D-423 and D-424.

## 0.2.164 (2026-10-28)
- Nothing in the game changes. The fourth audit: the screens for a new profile's name and look, and Rename and Look, move word for word from screens.js into their own file, profilescreens.js.
- Docs: CHANGELOG.md keeps its newest 3 entries, the rest moved to archive/CHANGELOG-STAGE-0.2-1.md; CLAUDE.md's file table is tidied, its rules word for word. The next audit is at 0.2.184.
- Decisions: D-421.

## 0.2.163 (2026-10-28)
- The name pad (Name and Rename) is much bigger and split for thumbs: A to M on the left half of the card, N to Z on the right, the middle left open. Del sits bottom left after M, OK bottom right after Z.
- The keys grow to fill the card, about three times as wide and twice as tall as before, and their letters, the typed name and its box are twice as big. The arrows walk across the split; tapping, clicking and typing work as before.
- Decisions: D-420.
