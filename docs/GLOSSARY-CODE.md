# Glossary: in the code

The words for parts of the code and its screens, moved word for word
from `GLOSSARY.md` at 0.2.186, the fifth audit (D-468), so that page
has room to grow, and the menus and tools at 0.2.204 (D-490). Its
rules hold here too: use these words in the game, the docs and the
code; where this page and a decision disagree, the decision wins.

## In the code (D-263)
- **Event:** one thing that happened in a turn ("rat died"); each turn
  writes a short list of them, `state.events`; the kinds are listed in
  `src/core/events.js` (D-267).
- **Profile:** one person's save on a device, in one of 3 slots: a
  name, a look, Records, its play time (D-290) and their own journey (D-268).
- **Slot:** one of the 3 places for a profile; empty or in use (D-268).
- **Slot screen, Profiles:** where the game opens, to pick, start or
  delete a profile (D-271); a glass card since D-397.
- **Name pad:** the page of letters for naming a new profile (D-272), or
  renaming one (D-273); a glass card since D-398, split for thumbs since D-420.
- **Opening card:** the glass card a new journey opens on, its first
  words and BEGIN (D-628).
- **Ask card:** the small glass card in the middle that asks Yes or No:
  Start over?, Delete …? and Play …? (D-400).
- **Cloak, eyes, trim, clothes, look:** a profile's look is what its hero
  wears: the cloak's colour, the eyes' colour and the lantern's trim (its
  cap and base), six of each, and the clothes, four shapes (Cloak, Belted,
  Short, Tattered), chosen after the name or with Change look (the CHANGE LOOK
  button) on the slot screen (D-275 to D-278, D-289, D-397, D-513); each a glass
  card since D-399, and one LOOK card with a tab each since D-521 (its
  screen is still called `cloak` in the code). **Patterns:** cloaks in
  their own colours (Zebra, Cow, Camo, Tiger, Stars, Moth, D-700), `locked` until bought with Glints;
  shown dim with LOCK and tried on, never kept (D-515, D-533); `price` 3
  each, bought with BUY and kept in the profile's `bought` (D-696).
- **Lamp:** the lantern's shape, the LAMP tab, fifth on the Look card
  (`lamp` in a look; `LAMPS` in `looks.js`, pixels in `pictures.js`): the
  Lantern, free, then Carriage, Dish and Pierced, locked at 3 Glints (D-702).
- **Behaviour, way:** a reusable way a creature acts, named in its
  registry entry's `ways`, defined in `src/core/behaviours.js` (D-269).
- **Registry:** the one list of all content (TECH.md, D-048).
- **Landmark, plan, stamp:** a place bigger than one tile, as data in
  `src/core/landmarks.js` (`LANDMARKS` in the registry): its `plan` is rows
  of tile letters, and `stamp` sets it on a room (D-587, D-589).
- **Stamper:** `src/core/stamper.js`, which finds a landmark's spot in a
  generated room and sets it aside as the room is dug (D-587, D-592).
- **Travel, travel card:** `src/core/travel.js` lists the waystones
  (`stonesOf`) and goes to a woken one (`travel`); the card is the
  `travel` screen, `src/input/cards/travel.js`, drawn as the way to play
  card's rows (D-593); its list scrolls with `waysScrollTo` and
  `waysPage` in `src/render/ways.js` (D-595).
- **Checker:** `tests/checker.test.js`, which names any piece a registry
  entry still lacks and the file to fix (D-621).
- **Maker, blank:** `tools/make.js`, which writes a new creature's,
  find's, tile's or person's empty pieces; each piece still waiting on
  real numbers, words or art is a blank, marked `/* blank */` or
  `// blank:`, and the grey "?" picture is `BLANK` (D-622).

## Menus and tools
- **Glass panel:** the see-through panel over the room's top left with the
  hearts, level, oil and depth; it fades while the hero is under it (D-378, D-380).
- **Journal:** one book with tabs: Records, Growth, Bestiary and Feats, later
  quests and Lore (D-262, D-293, D-464, D-467, D-630, D-695); a glass card (D-391);
  upright, its tabs in two rows (D-695).
- **Bestiary:** the Journal's third tab, a table of the creatures met, how many met and
  beaten (D-630); more of a page shows the more you meet and fight that creature (D-350): how it acts after one is beaten, how to fight it after 3 (D-631, D-632).
- **Met:** a creature lit for the first time, showing itself, each one once (D-630).
- **Growth:** the Journal's tab for spending embers (D-293), a tree with
  three branches, Light, Body and Hands (D-462, D-481).
- **Records:** the Journal's facts about how you've played: deepest,
  beaten, falls, rooms found, steps, flasks poured, torches lit, time played
  (D-262, D-270, D-283, D-285, D-286, D-291).
- **Seed Explorer:** the title's map of a whole seed (D-214).
- **Dev tools:** on for everyone (D-086, `DEV-TOOLS.md`).
