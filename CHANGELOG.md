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
- `0.4.0`: when the way to depth 9 opens, chapter 1 done (D-954).
- Later minor versions (`0.5`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.3.403 (2026-11-16)
- The Lampeater has its own boss tune. When its way in seals behind you, a busy, dark, pressing tune starts at once with the door, under the cutscene, and plays the whole fight. Beat it and the tune fades out, and the dungeon's theme comes back a second later.
- Music's list in Settings has a line for it, Lampeater, after Dungeon.
- Decisions: D-961. Questions: Q-112 closed, its last part, the boss tune, answered. D-958 moved to the archive, word for word.

## 0.3.402 (2026-11-16)
- Coming up to the Lampeater, the music goes quiet: the dungeon's theme fades out as you step into the hallway, and the arena stays silent too. Beat it and the theme comes back; step back down out of the hallway and it comes back as well.
- Dev: the boss bench and the playtest's #lampeater link now start you in the room below the hallway, one tile under the way up, that room emptied, so you get the whole way up: the warning, the quiet, the seal and the cutscene. The boss bot still starts in the arena's doorway.
- Decisions: D-960. Questions: Q-112's hallway quiet answered; the boss tune is next. D-957 moved to the archive, word for word.

## 0.3.401 (2026-11-16)
- While the Lampeater's way in is sealed, its name and health show at the bottom middle, above the text line: "Lampeater" over a thin bar running from pink to violet, on the same dark glass as the text line. It appears as the cutscene ends.
- Hurt, the part it lost turns pale, waits a moment, then drains away. A blow that sinks into it in the dark flickers the bar grey and leaves it full.
- Beaten, the bar drains to empty and fades; leave or fall and it's gone at once. It goes faint while you stand under it, like the panel.
- Decisions: D-959. Questions: Q-112's name and health bar answered; the hallway's quiet is next. D-955 and D-956 moved to the archive, word for word.
