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

## 0.3.206 (2026-11-09)
- Once you have found the way down, a few dust motes now stay in the lantern light, each wandering its own slow way: 3 in the crypt and earth, 2 in grey rock and the dungeon, none under the sky.
- Decisions: D-755.

## 0.3.205 (2026-11-09)
- With Waymark, when the nearest stairs down are too far to fit on the round map, a violet dot now sits on its rim, pointing toward them. It pulses as the map's marks do, and counts stairs you have already found too.
- Decisions: D-754.

## 0.3.204 (2026-11-09)
- The home waystone now stands in the room with the cave mouth, the crypt's door, 2 tiles north of the room's middle, as it stood in the middle room. Where it stood in the middle room is grass now.
- A boon now lasts until you are back in the waystone's room, however you come: up from the crypt, by waystone or through the woods. The middle room no longer ends it.
- Find the waystone shows on reaching its room, and in a journey begun in the south woods it says "Old standing stones, by the crypt's door."
- In a saved game the waystone moves there too, still awake if you woke it. Anything you set down where it stood stays.
- Decisions: D-753.
