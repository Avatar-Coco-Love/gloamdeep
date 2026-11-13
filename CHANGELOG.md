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

## 0.3.339 (2026-11-13)
- Nothing in the game changed. Older decisions moved to the archive to keep the decisions page small: the two health checks and their order, all done.
- Decisions: D-894. D-860 to D-862 moved to the archive, word for word.

## 0.3.338 (2026-11-13)
- The braziers light: bump a cold brazier with your lantern lit and it asks "Light the brazier?". Yes spends 5 turns' oil and a turn, and a flame sways in its bowl, lighting the dark 2 tiles round it. With less oil, Yes is grey.
- Each lit brazier makes one notch glow violet under the sealed door's flame rune. The door opens in the next step.
- Decisions: D-893. D-890 moved to the archive, word for word.

## 0.3.337 (2026-11-13)
- The first vault: from depth 2, one dead-end room on each floor is a vault, built in the crypt's bricks. Two cold stone braziers stand before a sealed stone door with a flame rune, and a small vault waits behind it, empty for now.
- Bump a brazier or the door to hear its words. Lighting the braziers and opening the door come in the next steps.
- Decisions: D-892. D-889 moved to the archive, word for word.
