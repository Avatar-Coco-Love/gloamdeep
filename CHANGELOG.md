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

## 0.3.372 (2026-11-15)
- Coming home by a waystone or a fall, the boon card no longer opens by itself. A round button with the waystone's violet rune shows up and left of the lantern instead. Tap it to choose a boon. Step off the plate and it goes; step back on and the card opens, as before.
- Checked: bats and lampmoths already fly over finds lying on the floor, so that note is closed. A test now makes sure it stays that way.
- Decisions: D-930. D-908 and D-909 moved to the archive, word for word.

## 0.3.371 (2026-11-15)
- Bump the rune wall with your lantern off and the runes flare: the stone sinks away for good, into a small nook. On a plinth inside lies a vault's prize, an ember or 2 of a rare material, taken with a bump.
- Bumped with the lantern lit, the rune wall now says so: "Faint marks.", then "Too pale to see by lantern light."
- Decisions: D-929. D-907 moved to the archive, word for word.

## 0.3.370 (2026-11-15)
- From depth 1, one room on each floor now has a rune wall. Switch your lantern off and three faint violet runes glow on that wall's face, seen from across the room. With the lantern lit it looks like any other wall.
- Nothing opens it yet: bumping it in the dark comes next.
- Your six notes are on the bug list: flyers over things to pick up, the boon menu on coming home, the round map's dark circle, lines at the bottom staying too long, overlaps on a big PC screen, and a felled tree's wood landing in three spots.
- Decisions: D-928. D-902 moved to the archive, word for word.
