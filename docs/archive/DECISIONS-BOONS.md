# The boons' first steps (D-596 to D-604)

Moved word for word from `docs/DECISIONS.md` at 0.3.57 (D-600), so it
stays under 12 KB. Still in force. D-599 moved the same way at 0.3.58
(D-601), D-600 at 0.3.59 (D-602), D-601 at 0.3.60 (D-603), D-602 at 0.3.61 (D-604), and D-603 at 0.3.62 (D-605). D-596 and D-604 moved the same way at 0.3.63 (D-606), after the rest.

---

**D-597 · 2026-11-05 · The next boons** (the owner's picks, recommended;
builds on D-596) Built next: Wide Glow (+1 tile of light while there is
oil; the empty ember stays), Hard Blow (+1 on every hit, the spear's
second hit too) and Greedy Hands. Getting around waits until after the
small ones, each of its boons its own step.

**D-598 · 2026-11-05 · Hungry Flame and Reckless** (the owner's picks,
all recommended; builds on D-596) Built next: Hungry Flame (+2 tiles of
light while there is oil, the empty ember stays; burns half again as
fast, with gear) and Reckless (+1 on every hit, the spear's second hit
too; 2 fewer hearts, any above the new most cut as it is taken, and back
empty when it ends).

**D-599 · 2026-11-05 · Deep Pour, Kind Herbs and Lucky Find** (the
owner's picks, all recommended; builds on D-596) Built next: Deep Pour
(a flask pours 60%; by itself it waits until none is wasted, at 40% or
lower), Kind Herbs (anything eaten or drunk heals 1 heart more, walked
onto or from the bag, never above full) and Lucky Find (rare drops 25%;
it stacks with the Wisp Charm, each adding its part above the usual
10%: 35% with both). D-595 archived.

**D-600 · 2026-11-05 · Soft Step** (the owner's picks, both recommended;
builds on D-596) A creature that notices by light needs the lantern's
light 1 tile short of its reach: the last tile of light wakes no one, so
a rat at its edge stays put until it is 1 tile further in. Torches, the
stairs' glow and daylight wake as before, and the gloamling and the cave
spider, who see along any clear line, are unchanged. D-597 and D-598
archived.

**D-601 · 2026-11-05 · Waymark** (the owner's picks, all recommended;
builds on D-596) While Waymark is held, the floor's stairs down show on
the map from the moment the hero arrives, in a room not yet entered too,
the room around them still dark. They are the found stairs' violet,
slowly pulsing (steady with reduced motion), on the big map and on the
round map when near. Stairs the hero has seen show as found stairs. The
marks are never remembered: they go when the boon ends. Its line on
the card: "Each floor's stairs down show on the map." D-599
archived.

**D-602 · 2026-11-05 · Far Sight** (the owner's picks, all recommended;
builds on D-596) While Far Sight is held, arriving in a room never seen
shows the third of its floor nearest the hero, counted in steps, with
the walls and water beside it. It is remembered as if the lantern had
found it, and stays when the boon ends; stairs in it count as found, so
their glow lights (D-194). A room with anything remembered is unchanged.
No sound and no line. All 14 boons are built. D-600 archived.

**D-603 · 2026-11-05 · The boon cards, and waking first** (the owner's
fix and picks, recommended; supersedes D-596's card look) The step that
wakes the home waystone only wakes it, so the waking is seen; the hero
steps off and back on for a boon. The card is three upright cards side
by side under "PICK A BOON", with the round cross. Each has its kind's
picture and colour in a band at its top (a flame, amber: light and oil;
a heart, red: hearts and fighting; a gem, bone: finding things;
footsteps, violet: getting around), its name and, under a rule, its
line. The chosen one lifts and turns gold; Left and Right choose too.
"Lasts until you are home." under them. Dealing them face down, then
turning them, is its own later step. D-601 archived. Mock-ups:
https://claude.ai/artifact/9Ab8N8New9hya5ynghrjjA

**D-596 · 2026-11-05 · The boon list, and the boon card** (the owner's
picks, answers Q-077; builds on D-583) The pool holds 14 boons, all in
the registry (`src/core/boons.js`), one line each, so the owner can add,
drop or change any at any time. Light and oil: Slow Wick (burns a
quarter slower), Wide Glow (+1 tile of light), Deep Pour (a flask pours
60%), Hungry Flame (+2 tiles, burns half again as fast). Hearts and
fighting: Stout Heart (+2 hearts, full), Hard Blow (+1 on every hit),
Kind Herbs (heal 1 more), Reckless (+1 hit, 2 fewer hearts). Finding:
Keen Eye (parts drop 75%), Lucky Find (rare drops 25%), Greedy Hands
(parts always drop, burns a quarter faster). Getting around: Soft Step
(noticed 1 tile later), Waymark (the way down shown), Far Sight (a third
of a room's map shown). Boons stack with gear (Slow Wick and the Copper
Wick: 100 steps); still 1 a trip. Stepping onto the woken home plate
with none held opens the card, the travel card's rows: 3 boons, each
of a different kind; the cross skips. A soft two-bell chime, the line
"The waystone grants you …", its name on the panel under the oil bar.
Built first: Slow Wick, Stout Heart, Keen Eye; the rest a few at a time.
The card's look superseded by D-603 (2026-11-05); the name on the panel by D-604 (2026-11-05).

**D-604 · 2026-11-05 · The boon's mark** (the owner's idea and picks,
all recommended; supersedes D-596's name on the panel) The boon held is
no longer named on the panel. Its kind's picture and colour from its
card show in a small glass square under the panel, the creature list
under it; later, what else the hero carries for a while lines up beside
it. A tap on it, or the mouse coming onto it, says the boon's name and
its card's line; no turn passes and the hero stays. A line too wide
for the screen wraps onto more rows, growing upward. D-602 archived.
