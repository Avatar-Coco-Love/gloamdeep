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

## 0.2.164 (2026-10-28)
- Nothing in the game changes. The fourth audit: the screens for a new profile's name and look, and Rename and Look, move word for word from screens.js into their own file, profilescreens.js.
- Docs: CHANGELOG.md keeps its newest 3 entries, the rest moved to archive/CHANGELOG-STAGE-0.2-1.md; CLAUDE.md's file table is tidied, its rules word for word. The next audit is at 0.2.184.
- Decisions: D-421.

## 0.2.163 (2026-10-28)
- The name pad (Name and Rename) is much bigger and split for thumbs: A to M on the left half of the card, N to Z on the right, the middle left open. Del sits bottom left after M, OK bottom right after Z.
- The keys grow to fill the card, about three times as wide and twice as tall as before, and their letters, the typed name and its box are twice as big. The arrows walk across the split; tapping, clicking and typing work as before.
- Decisions: D-420.

## 0.2.162 (2026-10-28)
- Docs only: skills and abilities now come two ways, not four: embers buy a Growth tree, and big abilities are found deep down. Learning by doing and skills taught by NPCs are left out for now, to keep growth simple; NPCs may still teach or sell recipes.
- Decisions: D-419, which supersedes D-416.
