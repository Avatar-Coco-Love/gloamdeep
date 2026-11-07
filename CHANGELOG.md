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

## 0.3.106 (2026-11-07)
- A new creature, the centipede: rust red with pale legs and green fangs, drawn side on. It turns up from depth 3, chases you once it sees you in the light, and has 2 hearts, so a knife ends it in one blow.
- Its bite takes a heart and leaves you poisoned. Poisoned lasts 6 turns and takes a heart every 3 turns, 2 in all. Another bite starts it again; it never stacks. Until the Antidote is in, poison never takes your last heart.
- While you are poisoned, a green drop shows beside the boon's mark; tap it to see the turns left. Each heart poison takes flashes green on the panel, and a line says when it wears off.
- A beaten centipede leaves a Centipede Leg about 1 time in 2, sold for 1, and now and then a Venom Sac, as the scorpion does.
- Decisions: D-654.

## 0.3.105 (2026-11-07)
- Nothing in the game changed yet. The first creature that poisons you is picked: the centipede, rust red with pale legs and green fangs. It chases you, and its bite leaves you poisoned. It turns up from depth 3.
- Poisoned lasts 6 turns and takes a heart every 3 turns, 2 in all. Another bite starts it again; it never stacks. Until the Antidote is in, poison never takes your last heart.
- It will show as a green drop beside the boon's mark, with a line as it starts and wears off, and each heart it takes flashes green.
- Decisions: D-654. D-643 moved to the archive, word for word.

## 0.3.104 (2026-11-07)
- The drifting motes now follow the way you can walk to the stairs down, through openings and round bends, instead of a straight line through the stone. Before, on about 1 floor in 4 they drifted back toward the stairs you had just come down.
- They all drift toward the farthest spot on that way you can see, so at a bend or a junction they swing round together.
- Decisions: D-653, superseding D-605's straight line.
