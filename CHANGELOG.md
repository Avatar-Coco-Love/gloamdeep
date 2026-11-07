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

## 0.3.108 (2026-11-07)
- A new charm, the Centipede Charm: a drop of pale green venom in a copper setting. Make it at the workbench, after the rod, from 3 Centipede Leg and 1 Copper Ore. You have one at a time.
- Choose it in the bag and press Wear; no turn passes. It goes in a charm slot beside the Wisp or Heart Charm.
- While you wear it, poisoned lasts 3 turns, not 6, and takes 1 heart, not 2. A bite still poisons you, so the Antidote still helps.
- Decisions: D-656. D-645 moved to the archive, word for word.

## 0.3.107 (2026-11-07)
- The Antidote: a tall green vial. Make it in the bag from 1 Snapcap Gill and 1 herb; the gill's slot shows MAKE when you carry both.
- Drink it while poisoned and the poison ends at once. It heals nothing. When you aren't poisoned its DRINK is dim, and it stays in the bag.
- Now that the Antidote is in, poison can take your last heart, and you fall. The centipede's Bestiary page says so.
- Decisions: D-655. D-644 moved to the archive, word for word.

## 0.3.106 (2026-11-07)
- A new creature, the centipede: rust red with pale legs and green fangs, drawn side on. It turns up from depth 3, chases you once it sees you in the light, and has 2 hearts, so a knife ends it in one blow.
- Its bite takes a heart and leaves you poisoned. Poisoned lasts 6 turns and takes a heart every 3 turns, 2 in all. Another bite starts it again; it never stacks. Until the Antidote is in, poison never takes your last heart.
- While you are poisoned, a green drop shows beside the boon's mark; tap it to see the turns left. Each heart poison takes flashes green on the panel, and a line says when it wears off.
- A beaten centipede leaves a Centipede Leg about 1 time in 2, sold for 1, and now and then a Venom Sac, as the scorpion does.
- Decisions: D-654.
