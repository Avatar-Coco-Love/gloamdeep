# Superseded decisions

Decisions replaced by later ones, moved out of `docs/DECISIONS.md`.
Each one keeps its original ID and says which decision replaced it.

**D-029 · 2026-10-17 · The companion is an animal** (answers Q-019)
*Superseded by D-034 (2026-10-17).*
For example a dog or fox. It can sniff out hidden things, warn of enemies
in the dark and help in fights. Which animal, and how it joins, is open.

**D-033 · 2026-10-17 · The companion is a dog you rescue** (answers Q-021)
*Superseded by D-034 (2026-10-17).*
You find the dog trapped or lost in the first cave and free it, and it
follows you home.

**D-055 · 2026-10-18 · The lantern's reach for now** (step 12)
*Superseded by D-064 (2026-10-18): oil sets the reach.*
The light reaches as far as the study's lantern with a full tank (5.2
tiles). Oil takes over the reach at step 14 (D-014).

**D-068 · 2026-10-18 · Oil lasts twice as long** (step 14, playtest;
supersedes the burn in D-064)
*Superseded by D-069 (2026-10-18).*
Each passed turn burns 1.25% of a full tank, so 80 turns empty it. The
start, the reach and the ember stay as in D-064.

**D-105 · 2026-10-18 · Walking into the rat** (step 20)
*Superseded by D-109 (2026-10-18).*
For now the rat only sits there. Walking into it flashes it white for
0.14 s, shakes the room a pixel side to side for 0.12 s (none with
reduced motion), and says its line. Like bumping a wall, it passes no
turn and burns no oil. Fighting comes in a later step (Q-030).

**D-416 · 2026-10-28 · Skills, all four ways** *Superseded by D-419
(2026-10-28).* (the owner's picks: all four, "a combination sounds nice") Embers buy a Growth tree; big
abilities are found; NPCs teach some; and learning by doing covers only
mining, woodcutting, fishing, farming and cooking, each level a small
perk, so fighting stays with levels and embers.

**D-489 · 2026-10-30 · The bed ends step 11; the audit on time** *The
audit part superseded by D-492 (2026-10-30).* (the
owner's picks, both recommended) Step 11 ends with the bed: the first
rescue, step 12, comes next, and more home pieces can come later, once
there are reasons to build them. The sixth audit stays at 0.2.206.

**D-168 · 2026-10-19 · Stage 0.3: the world, next** (owner's pick) The
world, made of regions, comes next as stage 0.3, starting with the
starting region. Stage 0.2's steps not yet built (34 to 41) wait and are
slotted in later. ~~Steps of stage 0.3 are versioned 0.3.x.~~ *That part
superseded by D-237 (2026-10-22): versions stay 0.2.x; 0.3.x from
0.3.0 by D-528 (2026-10-31).* The step list
is in `PROGRESS.md` and may change as we go.

**D-337 · 2026-10-25 · An audit every 20 versions** (the owner's picks, both
recommended) `PROGRESS.md` names the next audit's version; when it comes,
the audit is Next up. Each audit also splits one big code file into
smaller ones, nothing visible changed (order may change: `history-0.2.js`,
`screens.js`, `turn.js`, `main.js`). The next audit is at 0.2.129.
*Partly superseded by D-362 (2026-10-25): that audit came at 0.2.123, and
the next is at 0.2.143; and by D-518 (2026-10-31): every 40 versions.*

**D-964 · 2026-11-16 · When the floor gives way** Superseded by D-967 (2026-11-17): kept, unused. (the owner's picks, all
recommended; answers part of Q-113; supersedes part of D-963) The last
blow on the Lampeater sinks its door and teaches Leap, but the seal
stones stand: "The door sinks open. You learn Leap." The floor gives way
the first time the hero comes near the stairs after: onto the tile
before the door, or the door itself, by a step or a leap (offered too:
only onto the door; the hall's top 2 rows). Then the stones fall into the
Gap at once, the room shakes, and the strip says "The floor gives way."
Beaten with the hero already there, it goes on the same blow, saying
"The floor gives way. You learn Leap." (offered too: nothing said near,
the shake alone; the one line kept at the last blow). This step is the
moment and its shake (offered too: the moment alone; with the crumble);
the crumble's look and a sound come next, a step each. Claude's calls:
the shake is the hit's 1-pixel jolt, held 480 ms (a hit's is 120); none
with reduced motion; a level on the same blow keeps "Level {n}. You learn
Leap.".
