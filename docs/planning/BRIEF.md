# Planning run: the groundwork brief

For every agent of the planning run (`docs/PLANNING.md`, D-996). Grep
an ID for more (`grep -rn "D-635" docs/`). Nothing proposed is decided.

## 1. Where the game stands (0.3.434, 2026-11-19)
Stage 0.3, the world (D-168). Words: a **chapter** is 8 floors ending in
its boss; a **biome** is an area's own look (D-954). Older text and
`PLANNING.md` say "biome 1 to 4" for chapters 1 to 4.
- **Chapter 1 is nearly whole:** surface (depth 0) and depths 1 to 8:
  the crypt, rock caves, warrens (5-7), the dungeon (8), floors of
  11 x 13 cells, halls and large rooms, side branches ending in caches
  (D-645, D-650). Its boss, **the Lampeater**, gloam that moves only
  through dark and is hurt only when lit, in a sealed arena on depth 8;
  beaten it gives **Leap** (jump 2 tiles) and a Feat (D-939, D-955,
  D-992, D-994). Version 0.4.0 comes when the way to depth 9 opens
  (D-954).
- **Surface:** Hearthwood, 3 x 3 rooms, home in the centre (D-734);
  day and night (D-217); campfires (Q-088); waystones, boons.
- **Hero:** hearts, LV, embers, Growth tree (first upgrades), Glints
  (looks) from Feats; bag; gear: weapon (knife, spear), tool, armour, 2
  charms; Copper Wick, the first lantern part; Leap. Gentle, Normal,
  Hardcore (D-334). The guide, a spark of the First Light (D-633).
- **Creatures:** about 19 kinds, surface ones too; the centipede
  poisons, the spit grub shoots (D-654, D-688).
- **Crafting and home:** workbench, stash chest, bed, garden bed,
  shelf; a mortar with 4 draughts (Q-093); herbs, the Duskstar flower;
  chopping, digging, a shovel (D-926).
- **Puzzles:** the first four planned, L1, L3, P1, T1 (D-889, D-890);
  built so far: braziers, sealed vaults, plinths, rune walls.
- **Next build steps:** the Lampeater's polish, bug F-10, step 26 more
  flowers, step 27 the tank slot (D-991). Next audit 0.3.473.

## 2. The pillars (D-013); an idea serving none is cut
1. **The lantern is your world.** The only light you carry; the dark
   beyond feels alive. Oil sets reach, nothing else (D-014).
2. **Always one floor deeper.** Each descent somewhere new; "how far
   can I get?"
3. **Curiosity pays off.** Corners hold loot, monsters, the mystery.
4. **Stronger, slowly.** Earned bit by bit; first steps feel unlike
   the fiftieth.

**Story (D-633, `LORE.md`):** Underhearth fell when its First Light
dimmed; the hero, a lamplighter who has forgotten, follows Old Maren's
pages down to relight it; Maren, taken by the gloam, is fought last;
the journey goes on after (D-634).

## 3. Already decided for later
**Now (finish chapter 1):** Lampeater polish; tank slot (D-991); more
flowers; the trophy waits for creature materials (Q-061, D-954); the
Grave Beetle, planned (D-643), is not built; D-644: ~70 rooms a
chapter. Leap gaps lead to a small extra place, 2-4 rooms (D-969,
D-970).
**Next (chapters 2-4):** old mines and caves 9-16, glowing fungal
caverns 17-24, sunken ruins / Underhearth 25-32, the First Light at the
bottom (D-028, D-635). About 10 creature kinds a chapter, some carried
down +1 heart (D-643); a boss each, own room, changes at half hearts,
beaten once for good; found abilities Leap, Heave, Flare (burst of
light, costs oil), Swim (D-636). One new metal a chapter (+1 to every
hit, D-638); 5 weapon kinds: knife, spear, axe, hammer, sling (D-636);
rare found weapons. Elements Flame, Venom, Light (D-636). A lantern
part per slot a chapter: tank and wick climb, glass a choice (D-641).
2-3 plants a chapter incl. an oil plant (D-451, D-642). 8-12 new makes
a chapter (D-456); stations: forge, kitchen fire, power bench
(mines), altar (ruins), all on the surface (D-455).
Growth tree ~50 places, knacks, 26 boons, challenge rooms (D-639).
Two kinds of place a chapter; a village each; secrets opened by
later abilities; a Quests tab (D-640). Rescued people move home, a
first vendor, trade coins only from selling (D-470 to D-472). Lore
sets, relics, trophies, Feats (D-464 to D-467). Portals to twisted
depths, remade each visit, in every biome (D-019, D-032), unbuilt.
4 bosses, then Old Maren (D-634); ~8 wanderers, rare named (D-993).
12-20 h to the First Light, ~30 for all; ~150 things; 30-40 of
Maren's pages (D-634). Built and tuned a chapter at a time.
**Toward publishing:** Google Play first (D-590, `STORE.md`). Done:
secure site, touch/mouse/keys, home-screen icon, no ads or tracking.
Needed: Play account, 12 testers for 14 days, privacy policy,
manifest, offline play, save export/import, Android back button,
`storage.persist()`, store pictures, paid or unlock, safe areas, an
older-iPhone sound test (H-22), ship only played sounds (H-86).
Later: Play Billing, gamepads, Steam. Start-up screens (Q-063).

## 4. Still open, most important first
- Q-083 each boss's and special creature's story, look, fight.
- Q-076 which new creature kinds, in which pools.
- Q-111 how hard the Lampeater is (12 hearts now; Lean wins ~7-35%).
- Q-037 / Q-038 how regions join; kinds, shapes and sizes of rooms.
- Q-115 what lies across a Leap gap; Q-114 where falling ground goes.
- Q-105 each puzzle's details; Q-061 creature materials' looks, recipes.
- Q-093 the alchemy lab, cooking; Q-094 the bow (and showing attacks).
- Q-084 the keeper; Q-086 rooms refilling; Q-096 deep moles; Q-039
  swimming; Q-089 holes; Q-056 region names.
- Smaller: Q-035 weather, Q-027, Q-034, Q-040, Q-097, Q-066, Q-071,
  Q-092, Q-106, Q-108, Q-091, Q-095 (sounds, music).

## 5. The owner's wish list, condensed (`RESEARCH.md`, `RESEARCH-2.md`)
Deeper, find, craft and grow, deeper. More enemies (debuffs, ranged,
and defences), NPCs, a lit cult that talks first, friendships, rumours,
quests, vendors, a companion or two. Abilities, waystone travel, a ship
to another region. Mining, fishing, farming. Unusual layouts, water
cutting rooms, villages below. Looks earned, never bought. Stats,
Feats, maybe leaderboards. Music. Later: Stories (D-621), rifts,
battery lights, lit torches staying lit, a reason to go dark, set
pieces, a fall card, each biome bending the rules, a 10-minute
vertical slice (D-658), a world with no bottom.

## 6. Hard limits
- Plain HTML, CSS, JS; Canvas 2D; no images, fonts, CDNs, frameworks,
  build step; only sound files (D-773) and `share.png`. Seeded RNG; all
  content in one data registry; state apart from drawing; dev tools for
  all (`CLAUDE.md`, `TECH.md`).
- Phone first: touch, mouse, keys; nothing hover-only.
- Oil is the only clock; no hunger (D-414). Death never wipes progress
  (D-020, D-021). One journey, world generated once (D-019).
- Tiny steps: one small visible change a step, never a new mechanic
  with a new system. Never invent: names, numbers, story are drafts;
  tag ideas "builds on D-xxx" or "new: needs the owner's OK".

## 7. Where to look
1. Core loop, progression: `docs/SCOPE-FRAME.md`, `docs/SCOPE-2.md`,
   `docs/GLOSSARY-HERO.md`, `docs/GLOSSARY-2.md`.
2. The world: `docs/WORLD.md`, `docs/regions/starting-region.md`,
   `docs/PUZZLES-3.md`, `docs/RESEARCH-TRAVEL.md`.
3. Creatures, bosses: `docs/CONTENT-CREATURES.md`,
   `docs/CONTENT-BOSSES.md`, `docs/GLOSSARY-CREATURES.md`,
   `docs/RESEARCH-GAMES.md`.
4. Crafting, home: `docs/SCOPE.md`, `docs/GLOSSARY-HOME.md`,
   `docs/CONTENT-FINDS.md`, `docs/RESEARCH-SYSTEMS.md`.
5. Story, lore: `docs/LORE.md`, `docs/OPEN-QUESTIONS-3.md`,
   `docs/CONTENT-2.md` (people).
6. First hour on a phone: `docs/GLOSSARY-CODE.md` (menus),
   `docs/HEALTH-CHECK-3.md`, `docs/ART-DIRECTION.md`, `docs/BUGS.md`.
7. Toward publishing: `docs/STORE.md`, `docs/TECH.md`,
   `docs/RESEARCH-PAGES.md`, `docs/SOUNDS.md`.
8. Outside critics: `docs/VISION.md`, `docs/DESIGN.md`,
   `docs/RESEARCH-2.md`, and the other area files in `docs/planning/`.
