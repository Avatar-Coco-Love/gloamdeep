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

## 0.3.392 (2026-11-16)
- Gloamlings crawl out of the braziers the Lampeater snuffs: one from each, onto a dark tile beside the cold bowl, rising out of it through the smoke. With no dark tile there, it waits in the bowl. The first time, "A gloamling crawls out of the ashes." follows "The brazier gutters out."
- It is a plain gloamling, but the arena's own: it drops nothing, counts in no Records, Feat or Bestiary, never follows you out, and is gone when you leave the arena. The Lampeater's Bestiary line adds "Gloamlings crawl from the braziers it snuffs."
- The bot now strikes a gloamling beside it. Its 200 fights a build: Lean wins 25% (was 32%), Middling 98% (was all), Strong all; still about 26 turns and one snuff, so about one gloamling a fight.
- Decisions: D-949.

## 0.3.391 (2026-11-16)
- The Lampeater is tougher: 12 hearts, not 8. It still bites for 2 and is hurt only while caught in light. It now snuffs a brazier about once a fight (at 6 hearts), where before it was almost always beaten first. The boss bench's At half starts it on 6 hearts.
- The bot's 200 fights a build: Lean now wins about 1 in 3 (was every one), Middling and Strong still every one, in about 26 turns (was 19). To be tuned again once there is more before the boss.
- Decisions: D-950. Questions: part of Q-111 answered. D-945 moved to the archive, word for word.

## 0.3.390 (2026-11-16)
- A boss test bench, in the dev sheet's new Boss tab: each button starts the Lampeater's fight afresh, just inside its arena on depth 8, with a rough build (Lean, Middling or Strong), from the start or at half (4 hearts, 3 braziers lit). No turn passes, and you can start over any time.
- The playtest's #lampeater link opens straight into the fight with the Middling build, and that fight is never saved. A bot, tools/bossrun.js, plays the fight on many seeds and prints one line a fight. Nothing changes in a real game.
- Decisions: D-948, D-949. Questions raised: Q-111.
