# Research: games like Gloamdeep

What similar games do well, gathered on 2026-10-21 at the owner's
request. **Nothing here is decided.** An idea becomes part of the game only
through a decision in `DECISIONS.md`. Each idea is checked against the
pillars (`VISION.md`).

## The owner's wish list (2026-10-21)
Inventory, saving and loading, more enemies, NPCs, companion(s), and new
items: collectables, craftables, weapons and more. Where they stand:
- Saving and loading: build step 37.
- More enemies: step 38 added the gloamling, which shuns light (D-240).
- New items and weapons: the first, a knife, 0.2.50 (D-252); more later.
- Inventory: the bag, step 41a (D-247); Auto pouring, a stack limit and
  the stash chest come next (D-248).
- A companion: the guide, not a faery (D-023, D-034, D-508, Q-072). More than one would be a new
  decision.
- NPCs, crafting, collectables: ideas for later, below.
- Sound (2026-10-23): background music and more sounds; later, Settings
  lets players turn each sound on or off, keeping what they like. The
  first footstep (D-255) sounds a little like mining; judge it again
  once music and other sounds play with it.
- Looks and gathering (2026-10-23): many more looks and unique things,
  earned in play, never bought, such as zebra, cow-spot or camo
  cloaks (D-280; co-op someday, if the game grows, would need many
  looks); calm and intense play chosen by
  where you go (D-281); mining, fishing, farming and harvesting, with
  Stardew Valley's ore deposits and walls that stay (D-282).
- A stats page (2026-10-23): all sorts of facts about how you've played,
  the deepest depth first (D-260). Later quests, challenges,
  achievements, maybe leaderboards. Achievements in tiers on each
  record, with rewards (D-284).
- Going deeper, and growing (2026-10-24): one loop, deeper → find →
  craft and grow → deeper. Resources to find and things to craft;
  experience to spend (embers, D-293), then abilities such as a double
  jump over gaps and magic or elemental powers for big fights. Much more
  variety in how the underground and the surface are made. Waystones to
  wake for fast travel. A ship found to sail the ocean to another region.
  New enemies, secrets and bosses. NPCs and groups, such as a secret cult
  in a lit place underground that confronts you and talks first: your
  choices set how they feel about you, with friendships as in Stardew
  Valley, rumours, quests, vendors, a companion or two, and their
  equipment to use when they allow it.
- How places are made (2026-10-31): unique, even unusual layouts.
  Pools, and rivers above and below ground, leading to fishing (water
  first, D-499); later streams, oceans and more (D-504); different biomes; part of a room cut off by water or
  something else, reached by going through another room and coming
  back in by a different door. Later, a pass that dresses rooms with
  debris, cobwebs and the like.

## The games, bosses and talks
`RESEARCH-GAMES.md` (D-376): what similar games do, how they do bosses,
talks to hear, and the sources.

## Ideas the owner wants kept for later
- **Creatures show their next move** (Hoplite, Into the Breach). To try:
  every move of every creature the hero can see (D-349).
- **Lights that run on batteries** (the owner, 2026-10-25, much later): a
  flashlight and an electric lamp. Their light stays at full reach however
  low the charge, unlike oil (D-014). Batteries are crafted and charged at a
  charging station that must be joined to some power.
- **Light-shy creatures**: some fear or are hurt by light, so the lantern
  is a tool in a fight (Golden Krone Hotel).
- **Creature materials** (the owner, 2026-10-26, D-372): beaten creatures
  leave materials of their own, each with its own chance, for new recipes.
- **Creatures that vary** (the owner, 2026-10-26, D-374): each kind its
  own way. Rats in a spread of greys, and in shape: fur messy or not, the
  tail held differently, injuries. Injuries could be their own thing, as
  in Dwarf Fortress, where a wound to a part changes what a creature can do.
- **Rising sparks for a death** (the owner, 2026-10-30, D-496): look B
  of the peddler's mock-up, a person's pixels drifting up as amber
  sparks, played more slowly, when an important NPC dies.
- **Crafting and a home town**: craft from things you find (mushrooms,
  moss, oil; the Depth Meter could be crafted), and rescued NPCs move to
  the home base and give it a real use.
- **Many enemies from a few building blocks** (2026-10-24, from a talk
  about bosses): mix a handful of parts instead of hand-making each
  enemy: how it moves (chases, keeps away, burrows), how it attacks
  (close, a line, an area, a delayed blast), how it meets light (shuns
  it like the gloamling, seeks it, eats it, can only be hit when lit) and
  one trait (splits, armoured in front, heals others). Each mix is one
  registry entry; keep only the mixes with one clear job (Hoplite).
- **Bosses in phases that test what you know**: each phase asks for
  something learned in normal play, such as braziers, oil, switching the
  lantern off, or pushing a foe into water. For example, a boss that feeds
  on light: hidden until lit, then healing from lit braziers and draining
  oil, then rising water that snuffs light. Each phase can be beaten more
  than one way. To balance: show its moves (D-349); count turns per phase
  against damage and oil; give it fixed rules, using the seeded RNG; test
  phases with the dev tools, perhaps a script that plays them many times.
- **Tools for testing fights and puzzles** (the owner's notes from the
  Into the Breach talk, 2026-10-27, D-376): a combat and strategy
  sandbox, a dev tool with quick switches for each layer, spawning and so
  on; and a seeded puzzle tester. Both sit beside the Seed Explorer: its
  title-menu line becomes a tools menu, Combat, Puzzle and Explorer.

- **From the Brogue talk** (the owner, 2026-10-27, D-379):
  - *Edge-case runner*: a dev bot that makes many seeds and reports
    broken cases (a room you can't reach, stuck creatures), in the tools
    menu (D-376).
  - *Depths line up*: a floor's shape shows through the next (a cave
    over a cave, a river over a lake, a hole dropping you to the matching
    spot). Later maybe seeing down a pit to the floor below.
  - *A dimension rift*: found anywhere in the world; step close and it
    pulls you into a generated other place, not of the ordinary world.
  - *Bizarre creatures*: rift creatures with odd looks and odd rules
    that can claw their way out into the ordinary world.
  - *Generated beginnings*, optional, chosen or rolled: a new start each
    save, start choices, a generated world and world history, and a hero
    backstory that lines up with it. Simple, but it must line up; most of
    the game will be generated.
  - *A bigger world*, all ways: a wider surface first, then structures,
    caves and more in layers; more and bigger regions; no bottom.

## Ideas shown, not picked (2026-10-21)
- A shrine or lit brazier on some floors where you pick one boon.
- A small bag that grows with add-on pouches.
- Pushing creatures into hazards (water, pits).

## Creatures shown, not picked (2026-10-25, D-365; the scorpion picked next, D-370)
Each built only from the ways creatures have
([mock-up](https://claude.ai/artifact/Cqxg6k5PnvFDNfqnbaTiQh)):
- **Snapcap:** a heartcap look-alike with pink eyes; no ways, so it never
  moves and bites whoever stands next to it. 2 hearts, bite 1, depths 2 to 4.
- **Mole** (picked, built at 0.3.10, D-541)**:** chases and never flees. 4 hearts, bite 1, the Warren.
- **Bat** (picked, built at 0.3.8, D-537)**:** seeks light, flees when hurt. 2 hearts, bite 1, depths 3 and 4.
- **Cave spider** (picked, built at 0.3.7, D-535)**:** shuns light only, so it waits in the dark, backs out of
  light and bites when the lantern is off. 2 hearts, bite 1, depths 2 to 4.
