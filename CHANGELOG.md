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

## 0.3.56 (2026-11-05)
- Three more boons can now be offered at the home waystone: Deep Pour (a flask pours 60% of a tank, not 45%; poured by itself, it waits until none would spill, at 40% or lower), Kind Herbs (anything eaten or drunk heals 1 heart more: herb, heartcap, gloamberry, potion) and Lucky Find (rare drops come 1 time in 4, and with the Wisp Charm 35 times in 100).
- Eleven of the 14 boons work now. Only getting around's 3 are left.
- Decisions: D-599.

## 0.3.55 (2026-11-05)
- Two more boons can now be offered at the home waystone: Hungry Flame (the lantern's light reaches 2 tiles farther while it has oil, but burns half again as fast) and Reckless (every hit you land does 1 more, the spear's second hit too, but you have 2 fewer hearts: full hearts drop to the new most as you take it, and the 2 come back empty when you are home).
- Eight of the 14 boons work now.
- Decisions: D-598.

## 0.3.54 (2026-11-05)
- Three more boons can now be offered at the home waystone: Wide Glow (the lantern's light reaches 1 tile farther while it has oil), Hard Blow (every hit you land does 1 more, the spear's second hit too) and Greedy Hands (creatures always drop their part, but the lantern burns a quarter faster).
- Six of the 14 boons work now. Getting around has none yet, so the card still shows 3, one from each of the other kinds.
- Decisions: D-597.
