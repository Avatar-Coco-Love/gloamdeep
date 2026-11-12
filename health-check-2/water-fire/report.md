# Health check, second pass: water-fire (fishing, campfires and sleeping out, the mortar and draughts)

Version 0.3.305. Nothing in the repo was changed. Five findings, all small; the area is in good shape.
Scripts and screenshots: `/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/water-fire/` (screenshots in `out/`).

### A campfire's first words are hidden while its card is open
- Kind: mismatch (game against a decision)
- Notice: most players (who meet a campfire)
- What a player sees: Bumping a campfire opens its card with only the second half of its words ("Someone was here not long ago.", "Whoever sat here is gone.", "No one has sat here for a long time."). The first half ("A campfire, burning high.", "The coals still glow.", "Cold ashes.") is said, but the text line is not drawn while this card is open. It shows only after the card is closed with the cross or No; if the player picks Sit, Add wood or Yes, the next line replaces it and it is never seen.
- Evidence: D-757 "cold ashes' first sentence on the strip, the rest on the card"; D-844 "says its first words and opens Sit by the fire?, its second words under it"; `src/core/menu.js:28-37` ("the text line saying the first"). `src/main.js:245` says the line, then opens the card; `src/render/frame.js:409` skips the text line on every card, and only the bag, Make, bench, chest and trade cards draw it again (frame.js:427-446); the ask card (frame.js:420) does not. The miners' camp ("A miners' camp, long left.", D-770) goes the same way, read only, outside my area.
- How checked: REPRODUCED in the browser (both). After the bump the saved line is `campfireHigh`, no strip on screen; after Esc the strip shows "A campfire, burning high."
- Screenshot: `/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/water-fire/out/c1-phone-1card.png`, `/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/water-fire/out/c1-pc-1card.png`
- Fix options: (1) Recommended: draw the text line over the ask card when it was opened by a bump, as the bag's card does. (2) Put both sentences on the card, where they fit (the cold ashes' pair may be too wide on a phone). (3) Leave it and change the decisions' wording.
- Sure?: high. Seen on both screens and the cause is one line of drawing code.

### With nine or ten marks, the last ones slide under the map on a phone
- Kind: bug
- Notice: rare
- What a player sees: The marks under the hearts sit in one row. On a phone eight fit; the ninth is half under the round map and the tenth is fully behind it, and a tap there opens the map instead of saying the turns left. On the PC all ten fit.
- Evidence: measured on the 412 px phone with a boon, poisoned, stiff, Warmed and all six draughts: each mark takes 34 px, the map starts near x = 300. Tapping x = 330 gave "Map of the surface…" on the phone and "Shade Draught: 1 turns left." on the PC.
- How checked: REPRODUCED in the browser (phone shows it, PC is fine). Eight marks (a normal heavy case) fit: `/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/water-fire/out/m2-phone-marks.png`.
- Screenshot: `/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/water-fire/out/z-m3-phone.png` (PC for contrast: `/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/water-fire/out/z-m3-pc.png`)
- Fix options: (1) Recommended: wrap the row to a second line when it would reach the map. (2) Draw the marks a little closer together on a narrow screen. (3) Leave it: it needs nine things at once.
- Sure?: high that it happens; it takes a boon, both bad marks or Warmed, and nearly every draught together.

### "1 turns left."
- Kind: bug (words)
- Notice: few
- What a player sees: Tapping a mark on its last turn says "Shade Draught: 1 turns left." The same goes for every draught, Warmed, Stiff and (read only) Poisoned.
- Evidence: `src/core/lines.js:236` (stiffHeld), `:320, :327, :329, :336, :343, :351, :358` — all "{n} turns left."
- How checked: REPRODUCED in the browser (pc, the Shade Draught at 1); the others READ only.
- Screenshot: none
- Fix options: (1) Recommended: "1 turn left." when n is 1. (2) Reword so no plural is needed, e.g. "Turns left: 1." The owner approves the words.
- Sure?: high.

### Sitting by a fire on the turn of a fall leaves the hero Warmed after waking
- Kind: mismatch (game against a decision); the same cause as H-17, in another place
- Notice: rare
- What a player sees: If the hero sits by a fire while creatures stand beside them and their bites take the last heart that same turn, the hero wakes after the fall still Warmed (60 or 30 turns), though a fall ends everything else.
- Evidence: D-845 "a fall ends it"; `src/core/fireside.js:33` sets Warmed after the turn has ended, so after the fall has cleared it (`fall.js:46`). Measured: 1 heart, 3 rats beside, Sit by embers: fell, then `warmed` 30.
- How checked: REPRODUCED in a script (`r4.mjs`).
- Screenshot: none
- Fix options: (1) Recommended: fix with H-17, the same way: don't start the count when the turn ended in a fall. (2) Start the count before the turn ends and add one, so the fall clears it.
- Sure?: high.

### Docs behind: marks' numbers and where the minnow lives
- Kind: docs
- Notice: never (players can't see it)
- What a player sees: Nothing. A later conversation reading these would be misled.
- Evidence: `docs/GLOSSARY-FINDS.md:34-56` (all six draughts: "mark under the hearts with the turns left") and `docs/GLOSSARY-2.md:32` (Warmed: "mark with its turns left") — D-847 took the number away for the timer rim. `docs/GLOSSARY-FINDS.md:103` ("from the pond at home") and `docs/CONTENT-2.md:18` ("caught at the home pond") — D-734: "every woods room has its … pond … each pond holding the Pond Minnow" (H-27 names only `regions/starting-region.md:81`). Also the comments at `src/core/fishing.js:1,16,25` still say "the home pond".
- How checked: READ only (the game itself matches D-847 and D-734: seen in the browser).
- Fix options: (1) Recommended: fold into H-26/H-27/H-29's docs step. (2) Leave for the 0.3.312 audit.
- Sure?: high.

## Seen, but with no decision to measure against (not findings)
- A night's sleep counts poison and stiff down by one turn only, while the draughts and Warmed lose the whole night (script: poisoned 6 → 5 after sleeping out or in the bed). No decision says which is right for poison. Stiff can't normally last till dusk, so it can't be met.
- Two lasting effects ending on the same turn show only the last one's line (script). It needs two counts that end together, which drinking one a turn doesn't give.
- Seed 4128, depth 2: one floor tile juts into the pool and the pool's soft edge covers most of it, so the herb on it looks as if it floats (`/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/water-fire/out/z-pool.png`). It can be reached and picked.
- Met H-01 again (Sit and the bedroll cap hearts) and H-20 ("Healing herb" on the mortar's card); not re-reported.

## Checked and found sound
Played in the browser on both the phone and the PC:
- Pond fishing: the cast (a turn, "You cast the line."), WAIT and PULL on the quick slot, the nibble then the bite the next turn, the "!" and float, the strike card (STRIKE!, "Tap in the light", bar, zone, needle; it fits both screens), a hit ("You catch a pond minnow."), a miss and three passes with no tap ("It got away.", the line in). D-608 to D-614.
- A cave pool (depth 2): the Blind Cavefish, its zone a fifth of the bar (54 of 276 px), three tenths with the Bone Hook (82 px). D-618, D-807.
- The bag's cards for both fish (EAT left of POUR), the rod (HOLD), the Bone Hook (FIT), the mortar, the campfire, the bedroll (SLEEP dim by day, SET DOWN) and the draughts (DRINK): all fit, all first look lines as decided.
- A found campfire, all three levels: the card's heading and words, Sit (2 hearts blazing, 1 embers, Warmed 60 or 30, the longer kept, the fire a level down), Add wood (1 Wood, embers to blazing, grey on blazing or with no Wood), Sit grey when nothing would change, Sit picked first. D-844, D-845, D-849.
- Your own campfire: made on the Make tab for 3 Stone and 2 Wood, a second refused with "You already carry a campfire.", Set down ("You lay the stones in a ring."), the three-button card with No picked, its own three notes, lit for one turn's oil (1/60 of a tank), Yes grey with an empty lantern, Take up both ways. D-850 to D-854.
- Sleeping out: the moon button (44 × 44 px) from dusk, its ask and words, No picked, waking at the next morning stiff for 20 turns with its line and Zz mark on red glass; with the Fur Bedroll "Your fur bedroll is warm.", 2 hearts back, not stiff. The bedroll's SLEEP (and C), SET DOWN, a bump from dusk and by day (Roll up the bedroll?), and SLEEP by day ("You aren't tired."). D-758, D-759, D-803, D-804.
- The mortar: its card with nothing to make, with one recipe too short, and with all six in the decided order; each made for its cost in a turn with its line; each drunk; eight marks at once with rims matching the share of time left; a tap or the mouse on each mark says its line; the 40-letter lines fit the phone's strip. D-786 to D-806, D-847, D-848.

Checked with the game's rules in a script only:
- The nibble comes about 1 wait in 6 (0.179 over 1,306 waits); an unpulled bite gets away and the float stays; a catch with a full bag slips back with its line; the zone's edges count as hits.
- The minnow pours 15% and the cavefish 20%, a turn each, never above full, and Quick Pour doesn't make them free; eating gives 1 heart, and at full hearts says "You aren't hurt.", free.
- Each draught: 60 turns, counted from the turn after drinking; drunk again, back to 60; its ending line; the Mending Draught's hearts at turns 15, 30, 45 and 60; the Ward Draught ends poison at once; a full tank lasts 60 turns, 70 with Slowburn or Warmed, 82 with both; the Glow Draught adds one tile, on top of Wide Glow, none with an empty lantern; a fall ends them all; a night uses their turns and the Mending Draught gives no hearts for it.
- Sleeping out is offered on turns 170 to 299 of a day only; a bunny or lure wisp near doesn't stop it (D-827), a rat, mole or gloamling in the light does, one asleep doesn't; a bedroll in a chest or on a diagonal doesn't count; a stiff swing misses 0.341 of the time.
- The Bone Hook's FIT is free and refuses with no rod; the rod's and bedroll's "too few" lines; the mortar, campfire and bedroll say "Only on the surface." below ground; the mortar's take-down lines.
- The found campfire: each of the 8 rooms and 3 levels comes up about equally over 3,000 seeds, every one of 150 seeds really has its fire, and it glows 3 tiles blazing, 2 as embers.

## Not reached
- The sideways phone (`phoneWide`) was not played; the strike card is 160 game pixels wide, so I expect it to fit, but did not look.
- Stiff's missed swing, the Ward, Spitproof and Shade draughts' effects on a real creature, and a campfire's and Glow Draught's light at night were checked in the rules or read, not watched in the browser.
- Making the rod, the Bone Hook and the bedroll at the workbench, and fitting the hook, were run in the rules only (their bag cards were seen).
- Selling fish to the Peddler (D-616) and Thrift at the mortar (D-818) were not played.
- Whether a dim button reads clearly as dim against a plain one on the ask cards: they looked close in the screenshots, but I did not measure it, and it belongs to the cards in general.
- Q-088 and Q-091 (cooking at a fire, sleeping by a fire, waking robbed, chilled) are knowingly undecided and were left alone.
