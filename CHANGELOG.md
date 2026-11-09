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

## 0.3.170 (2026-11-09)
- The Lightkeeper's Locket's violet glow is now centred on the locket, not pooled below it, and softer: smaller and dimmer, on the floor and on the shelf.
- Decisions: D-717.

## 0.3.169 (2026-11-09)
- Fixed: a journey saved before 0.3.143 could have no Lightkeeper's Locket if you had already been in the depth-4 room it belongs in. Load that journey now and the locket lies in that room, with its warden asleep beside it, as in a new game. If the locket is already yours, nothing changes.
- Behind the scenes: the record-keeping tool no longer writes the same note into the changelog archive every version.
- Decisions: D-716.

## 0.3.168 (2026-11-09)
- The free pick is shown once now, not on every look: locked looks keep LOCK, and "1 FREE PICK" shows in gold at the top of the Look card while yours waits. Try a locked look on to see its price, or that it can be your one free pick, and press FREE to take it.
- The Carriage lamp and the Zebra pattern are now free for everyone. If you bought one, its Glints come back; if you took one as your free pick, the pick waits for you again.
- Decisions: D-715.
