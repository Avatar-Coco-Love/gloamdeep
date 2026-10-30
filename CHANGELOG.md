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

## 0.2.210 (2026-10-30)
- Free the peddler and he no longer vanishes at once. He thanks you and stays where he stood. Bump him to talk: free, his lines taking turns.
- Left alone 5 turns, or 3 after your last bump, he says goodbye and fades away, heading home to the woods. Leave the room first and he goes home anyway.
- Digging him out, his first call is for help; after that he cheers the digging on. Creatures no longer step onto a person.
- Decisions: D-496.

## 0.2.209 (2026-10-30)
- Bump the peddler at home and his card now has two tabs, Sell and Buy. On Buy, his wares: an oil flask for 3 coins and a torch for 2. He never runs out.
- Pick one, then Buy, Enter or Space to buy one, free, no turn. Buy is dim with too few coins or no room in your bag, and the card says why.
- Tap a tab to turn it, or press Up from the top row of slots, then Left or Right. Step 13, the vendor and coins, is done.
- Decisions: D-495.

## 0.2.208 (2026-10-30)
- Bump the peddler at home and, after his line, his card opens: your coins and your bag on the left, what he pays for the chosen thing on the right.
- He buys creature materials, one at a time: 1 coin for a common one, 5 for a rare one. Pick a slot, then Sell, Enter or Space. No turn passes, and Sell is dim for what he doesn't buy.
- Your coins are kept when you fall, except in Hardcore, where they go with the world. Buying from him comes later.
- Decisions: D-494.

## 0.2.207 (2026-10-30)
- Nothing in the game changes. The sixth audit: the Version history's 0.2.121 to 0.2.186 move word for word from history-0.2.js into their own file, history-0.2-3.js.
- Docs: CHANGELOG.md keeps its newest 3 entries, the rest moved to archive/CHANGELOG-STAGE-0.2-1.md; finished decisions D-491 and D-492 moved to the archive; the build plan's ticked steps 9 to 12 moved to archive/PROGRESS-LOG.md. The next audit is at 0.2.227.
- Decisions: D-493.

## 0.2.206 (2026-10-30)
- Free the peddler and he goes straight home: he stands in the woods on the surface, on the open tile nearest their middle, and turns to face you.
- Bump him there and he speaks, his home lines taking turns. No turn passes.
- Nothing you set down, and nothing that grows back, goes on his tile. Rescuing the first person is done; the audit comes next.
- Decisions: D-492.
