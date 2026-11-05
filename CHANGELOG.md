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

## 0.3.60 (2026-11-05)
- The home waystone no longer offers a boon on the step that wakes it, so you see it wake. Step off the plate and back on for your boon.
- The boon card is now three cards side by side. Each shows its kind's picture and colour at its top (an amber flame for light and oil, a red heart for hearts and fighting, a bone-white gem for finding things, violet footsteps for getting around), then its name and its line. The chosen card lifts and turns gold. Left and Right choose too.
- Decisions: D-603.

## 0.3.59 (2026-11-05)
- The last boon can now be offered at the home waystone: Far Sight. While you hold it, the first time you enter a room, the third of its floor nearest you shows at once, with the walls beside it, as if your lantern had already been there. It stays remembered after the boon ends, and stairs in it count as found, so their glow lights up. Rooms you have already seen any of are left as they are.
- All 14 boons work now.
- Decisions: D-602.

## 0.3.58 (2026-11-05)
- A new boon can now be offered at the home waystone: Waymark. While you hold it, each floor's stairs down show on the map as soon as you arrive, even in a room you haven't entered yet: a violet mark that slowly pulses (steady with reduced motion), on the big map and on the round map when it is near. Once you have seen the stairs yourself they show as usual, and the marks go when the boon ends.
- Thirteen of the 14 boons work now; Far Sight is the last.
- Decisions: D-601.
