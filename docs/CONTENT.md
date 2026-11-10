# Content

Everything in the game today, one row each, with its numbers, where it
turns up and the decisions behind it (D-363). The words themselves are in
`GLOSSARY.md`; the numbers come from the registry files named in each
heading, and where this page and the code disagree, the code and the
decisions win. Read this before proposing new content, so it builds on
what exists. Every PR that adds or changes content updates its row
(the checklist is in `TECH-2.md`, "Adding content").

Turns are the hero's turns. A creature beaten gives its hearts plus its
bite in experience (D-371). "Grows back" is the `regrow` time (D-306).

## Creatures (`src/core/enemies.js`, ways in `behaviours.js`)

| id | Hearts | Bite | Ways | Where | Decisions |
| --- | --- | --- | --- | --- | --- |
| `rat` | 2 | 1 | chases, fleesHurt, pack | the first rooms; the pool from depth 2, and always the one by each room's flask; from depth 3 about 1 room in 3, that one in a pack of 3 | D-106, D-110, D-114, D-126, D-149, D-231, D-292, D-301, D-474, D-534, D-727, D-728 |
| `gloamling` | 2 | 1 | chases, shunsLight | the pool from depth 5; on the surface, a rare one each night in one woods room round home, gone by day | D-240, D-244, D-475, D-476, D-534, D-780 |
| `lampmoth` | 1 | 1 | seeksLight | the pool from depth 2; on the surface, one each night in each woods room round home, gone by day | D-351, D-356, D-475, D-534, D-778 |
| `flaskMimic` | 3 | 1 | chases, once bumped awake; asleep it looks like a flask, for 6 turns | depths 3 to 5, about 1 room in 4, as well as the rest | D-365 to D-369, D-475, D-476 |
| `caveSpider` | 2 | 1 | shunsLight only, so it never comes: waits in the dark, backs out of light, bites only from the dark | the pool from depth 2 | D-365, D-535, D-536 |
| `scorpion` | 1 | 2 | strikes; wears one of 5 colour sets | the pool from depth 3 | D-370, D-373, D-475, D-476, D-534, D-729 |
| `bat` | 2 | 1 | seeksLight, fleesHurt | the pool from depth 3; on the surface, one each night in each woods room round home, gone by day, no guano | D-365, D-537, D-538, D-779 |
| `mole` | 4 | 1 | burrows, never flees: digs down on noticing, comes under the floor as a mound that can't be hit, up beside the hero, biting the turn after | the pool from depth 5; on the surface, one each day in each woods room round home, gone by night | D-365, D-541, D-542, D-726, D-781 |
| `snapcap` | 2 | 1 | none, so it never moves and bites whoever stands beside it; drawn `shutAs` a heartcap, in its tone, until the hero is beside it | the pool from depth 2 | D-365, D-543, D-544 |
| `herbMimic` | 2 | 1 | chases, once bumped awake; asleep it looks like a herb, for 6 turns | the pool from depth 3; on the surface, a rare one each day in one woods room round home, asleep, gone by night | D-549, D-550, D-793 |
| `boneRat` | 3 | 1 | chases, never flees; beaten, a pile of bones that stands up whole 3 turns later unless stepped on | the pool from depth 4 | D-549, D-551, D-731 |
| `oilTick` | 2 | 1 | chases; beside the hero `drinks` 5% oil instead of biting, biting once the lantern is empty | the pool from depth 3 | D-606, D-607 |
| `lureWisp` | 1 | 0 | lures: within 3 steps of the hero it drifts a tile away, toward the nearest other creature in the room, or just away; never bites; its glow shows in the dark, lighting no tiles | the pool from depth 4 | D-643, D-649 |
| `centipede` | 2 | 1 | chases; a bite that hurts `poisons` the hero | the pool from depth 3 | D-652, D-654 |
| `spitGrub` | 1 | 1 | spits: never moves or bites; at the lit lantern down a clear row or column, up to 5 tiles, a glob flying a tile a turn, then rests 2 turns; `glows` | the pool from depth 4 | D-659, D-688 |
| `warden` | 4 | 1 | chases, once bumped awake; `sleeps` as itself, a statue with dull eyes, then stands still again after 6 turns; an old stone guard of Underhearth | beside the locket only, never the pool | D-692 |
| `bunny` | 1 | 0 | shy: within 3 steps of the hero it hops a tile away, just away, never toward another creature; never bites; soft brown, the first creature that means no harm | never underground; on the surface, one each day in the home room and in each woods room round home, gone by night | D-784 |
| `skulkerCrab` | 2 | 1 | none, so it never moves and pinches whoever stands beside it; drawn `shutAs` a loose stone until the hero is beside it; a stony grey shell, rust legs and claws | never underground; on the surface, one each day in each mountain room, gone by night | D-796 |
| `rimLurker` | 3 | 2 | lurks: waits where it stands until the hero is within 3 steps along a clear line, lit or not, then chases and never flees; a hunched dusky violet shade, long arms, pale claws | never underground; on the surface, one each night in each mountain room, beside the rock where it can, gone by day | D-797 |

The ways so far: **chases** (notices in light along a clear line, then
comes), **shunsLight** (never steps into light, backs out of it, sees
along any clear line), **fleesHurt** (1 in 2, flees 4 turns once hurt),
**seeksLight** (walks to the lit lantern, else the nearest lit torch),
**lures** (drifts away from a near hero toward another creature, never bites),
**shy** (hops just away from a near hero, never bites; D-784),
**spits** (a glob down a clear row or column at the lit lantern, hitting what it meets; `spit.js`),
**burrows** (notices as one that chases, then digs down and comes `under` the floor, up beside the hero, `dug`, then on foot),
**strikes** (comes as one that chases, never bites beside; in line within 2 tiles it is `raised` a turn, then strikes both tiles ahead, then `rests`; `sting.js`)
(D-269, D-351, D-649, D-688, D-726, D-729). One that `drinks` takes that much oil instead of biting, lit or not (D-606). One that `poisons` leaves the hero poisoned: 6 turns, a heart every 3 (D-654), the last one too, now the Antidote is in (D-655). A creature that `looksLike` a find sleeps in its disguise
until bumped, then wakes for its `awakeTurns` (D-368). A creature with `colours` wears one of that many colour sets, picked by the seed (D-373). Creatures walk over finds, which stay where they lie (D-727). Creatures stand still on their shadow; one that `flies` is held 2 pixels above it (D-563), and may fly over water, where walking into it strikes it (D-718). One that `glows` is drawn over the dark (D-649).
Which creatures a generated room holds, and the pool by depth: in `CONTENT-3.md`, "Places" (moved word for word at 0.3.100).
Each says how it acts in words, its `acts`, on its Bestiary page once one is beaten (D-631), and how to fight it, its `fights`, once 3 are (D-632).
A new creature mixes these by name; a new way is a new
mechanic and its own step.

## Finds and things made
Moved to `CONTENT-FINDS.md` word for word at 0.3.113 (D-660).

## Tiles
Moved to `CONTENT-2.md` word for word at 0.3.7 (D-535); now in `CONTENT-3.md` (D-618).

## Lights, places
Moved to `CONTENT-2.md` word for word at 0.3.3 (D-531); now in `CONTENT-3.md` (D-618).

## People, the hero's looks, Growth upgrades
In `CONTENT-2.md`.
