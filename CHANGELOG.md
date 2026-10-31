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

## 0.2.228 (2026-10-31)
- Behind the scenes: the seventh tidy-up, nothing in the game changed. The code that picks, makes, renames and deletes a profile has its own file now, ready for the new hero creator.
- Behind the scenes: tidy-ups now come every 40 versions instead of 20, as the size checks already keep the notes small in between.
- Decisions: D-518, D-519.

## 0.2.227 (2026-10-31)
- Behind the scenes: the look currency is named Glints. Feats will pay them, and they will be spent in the Look card, where a locked look shows with a lock.
- Behind the scenes: making a hero gets one Look card after the name, the hero shown big with tabs for cloak, eyes, trim and clothes, each choice named, and a Random button. It will be built in small steps after the next tidy-up.
- Decisions: D-516, D-517.

## 0.2.226 (2026-10-31)
- Behind the scenes: the first cloak patterns are zebra stripes, cow spots and camo, the three named in D-280. Each has its own colours: zebra bone with dark stripes, cow bone with dark patches, camo moss with brown and deep green blotches. None is free; all three wait for the look currency.
- Decisions: D-515. Question closed: Q-073.

## 0.2.225 (2026-10-31)
- On the Profiles card, the Look button now reads Change Look and has a wide button of its own, above Rename and Delete.
- The Profiles card's buttons look the same size, but taps around them now count too, so each is at least 44 px tall on a phone, easier to hit.
- Behind the scenes: a plan for more looks, cloak patterns first, then more clothes shapes and colours, hoods or hats, the lantern's style and a scarf or cape. Decisions: D-513, D-514. Question opened: Q-073.

