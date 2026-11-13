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

## 0.3.327 (2026-11-13)
- Fixed (dev tools): on a PC, after clicking the wrench or a dev button, Space waits a turn again instead of pressing that button a second time.
- Dev Spawn's Peddler now works: tap a free floor tile and he moves there from wherever he was, ready to trade as he is at home.
- Dev Spawn's Torch and Glow Lamp lights can now go on a free floor tile, standing on a torch's stone foot as one set down. They never burn out.
- Dev Spawn's pictures that share a name now show their code word after it, such as "Campfire · ownEmbers", and the search finds them by it.
- Dev Room: TIME now comes second, with +10, +50 and Grow side by side, so Grow is never hidden under the sheet's edge.
- Decisions: D-882. D-878 moved to the archive, word for word.

## 0.3.326 (2026-11-13)
- The quick slot's picture and the round map are now enlarged by exactly 2, so every pixel in them is the same size. The quick slot's picture is a little bigger.
- The version number on the title screen is now in the game's own pixel font.
- Lines that can't be picked, empty profile slots and unlit marks now share one dim grey, a little easier to read. Bright words in the menus, profiles and history now use the same bone white as everywhere else.
- A few colours one shade apart now match, and torch handles use the same wood browns as the trees. You won't see a difference.
- The art rules now say glows and light may be soft, and list every colour the code uses.
- Decisions: D-881.

## 0.3.325 (2026-11-13)
- Fixed: in a very old save made while the freed Peddler was still waiting in his room, he no longer vanishes when the game updates. He is back at home by the waystone and greets you when you come near.
- Fixed: if one profile can't be read, the other profiles are kept instead of all three being wiped. The one that can't be read shows as Empty, and its old data is kept aside, never written over.
- A save that can't be read, or one made by a newer version of the game, is now kept aside before anything is saved over it.
- Fixed: an error that repeats every moment no longer stops the game from drawing and saving.
- Decisions: D-880. D-877 moved to the archive, word for word.
