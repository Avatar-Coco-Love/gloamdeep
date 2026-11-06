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

## 0.3.69 (2026-11-06)
- Pulling on a bite opens the strike meter: a needle sweeps back and forth across a bar, and you tap while it is in the amber zone to land the fish. The world waits while it is open.
- Miss, or let the needle pass 3 times, and the fish gets away with the line coming in.
- Decisions: D-614.

## 0.3.68 (2026-11-06)
- A fish nibbles before it bites: the float shakes and the line reads "A nibble...". The next turn it always bites, so wait for the "!" and then pull.
- Casting the line plays a soft plop, and a catch plays a splash with a few drops falling back.
- Decisions: D-613.

## 0.3.67 (2026-11-06)
- Fishing is easier to follow: with the line out, bump the water again to wait a turn. The float stays where it is, so keep bumping until something bites, then bump once more to pull.
- While a line is out, the flask button beside the lantern reads WAIT, and PULL in amber when a fish bites. A tap does the same as bumping the water. The flask comes back once the line is in.
- Planned next for fishing: a nibble turn before each bite, with a plop and a splash, then a short timed strike when a fish bites, played with the world paused.
- Decisions: D-612. D-579 and D-587 moved to the archive, word for word.
