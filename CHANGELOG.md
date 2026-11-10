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

## 0.3.225 (2026-11-10)
- The lantern clicks: a small metal click each time it goes on or off, by hand or by itself, higher for on and lower for off, as loud as a footstep. It plays above ground and below. With Sound: Off, nothing plays.
- Decisions: D-775. D-766 moved to the archive, word for word. Questions: Q-095 narrowed.

## 0.3.224 (2026-11-10)
- The first sound from a file: on the surface, each step the hero walks sounds of soft grass, one of 5 recordings in turn, never the same twice running and a little higher or lower each time. Underground stays silent for now. With Sound: Off, nothing plays.
- A fifth free sound pack is saved in the game's files: ObsydianX's Interface SFX Pack 1 (222 menu tones, no credit needed), cut of its silence.
- Decisions: D-774. D-765 moved to the archive, word for word. Questions: Q-095 narrowed.

## 0.3.223 (2026-11-10)
- The game is silent for now: every sound made in code is gone, since none sounded good. Sounds will come from sound files instead, from a free pack (Kenney's first, which needs no credit).
- Four free sound packs from Kenney (335 sounds, no credit needed) are saved in the game's files, ready to choose from; the game doesn't play them yet.
- A new list, docs/SOUNDS.md, names every sound the game needs, when each plays and how it should feel. It grows with the game.
- Decisions: D-773. D-764 moved to the archive, word for word. Questions: Q-095 opened.
