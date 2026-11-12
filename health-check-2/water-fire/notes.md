# water-fire notes (running)

## Confirmed findings
F1. Campfire/ashes first words hidden while card open. frame.js:409 draws text line only when screen not in CARDS; 'bed' ask card (frame.js ~420) never draws it. main.js:245 says tile.says then opens panel. D-757 "cold ashes' first sentence on the strip, the rest on the card"; D-844 "says its first words and opens..."; menu.js:28-37 comments. Seen both screens: out/c1-phone-1card.png, out/c1-pc-1card.png (no strip); after Esc the strip shows "A campfire, burning high." (c2.mjs). If Sit/Yes is picked the first words are never seen. REPRODUCED browser both.
F2. Marks row runs under the minimap on phone: 9th mark half covered, 10th (Shade) fully hidden and untappable (tap opens map). out/z-m3-phone.png, m3.mjs. PC fine (out/z-m3-pc.png). Needs boon+poisoned+stiff+warmed+6 draughts = rare; 9 marks = partly covered. REPRODUCED browser phone.
F3. "Shade Draught: 1 turns left." grammar on last turn: all {n} turns left lines (glowHeld, slowHeld, mendHeld, wardHeld, spitproofHeld, shadeHeld, warmHeld, stiffHeld lines.js:236,320-358; poisonHeld too). REPRODUCED browser pc (m3.mjs).
F4. Warmed survives a fall on the turn of sitting (twin of H-17): fireside.js:33 `warming(endTurn(...))`. D-845 "a fall ends it". r4.mjs: hp1, 3 rats, sit embers -> fell, warmed 30. REPRODUCED script.
Low/maybe: poison & stiff count only 1 turn over a night's sleep (r3.mjs: poisoned 6 -> 5; stiff 12 -> 11 with bedroll, though D-803 says "not stiff" - unreachable normally since stiff lasts 20 turns). No decision on poison+sleep.
Low/maybe: two effects ending same turn: only last line shows (r2.mjs). Needs sleep or same-turn; rare.
Low: cave pool floor notch with herb looks like herb floating in pool (out/z-pool.png) seed 4128 depth2 tile (2,4).

## Checked and sound
- Fishing pond, phone+pc browser: cast "You cast the line." a turn; WAIT/PULL quick slot; nibble then bite next turn; strike card STRIKE!/Tap in the light; hit -> "You catch a pond minnow."; miss & 3 passes -> "It got away.", line in. (f2.mjs)
- Cave pool depth 2 seed 4128: Blind Cavefish, zone 1/5 (54 of 276 px), Bone Hook 3/10 (82 px). both screens (f3.mjs)
- Rules script: nibble rate 0.179 over 1306 waits (1/6 decided); unpulled bite "It got away." float stays; minnow pour +15%, cavefish +20%, a turn, never above full; eat +1 heart a turn, full "You aren't hurt." free; Quick Pour doesn't free a fish; full bag "No room. The minnow slips away." (r1.mjs)
- Bag cards for minnow, cavefish, rod, hook, mortar, campfire, bedroll, 5 draughts fit on phone (b1.mjs sheets)
- Draughts rules: each 60 turns, redrink back to 60, lines at end, mending hearts at 15/30/45/60, tank 60/70/70/82 (none/slowburn/warmed/both), fall clears all (r2.mjs)
- Found campfire blazing/embers/ashes both screens: Sit +2/+1, warmed 60/30 (max kept), fire down a level, Add wood 1 wood embers->blazing, dim on blazing/no wood, Sit grey when nothing changes (c3.mjs)
- Own campfire: Make 3 Stone 2 Wood, "You make a campfire.", second "You already carry a campfire.", Set down "You lay the stones in a ring.", ashes card Yes/Take up/No (No picked), own words, kindle costs 1/60 oil, no oil Yes dim, Take up "You take up the stones." / "You already carry a campfire." both screens (c5,c6,c7)
- Sleeping out both screens: moon 44x44 at dusk; ask words; No picked; wake turn 300, stiff 20, "You wake on the cold ground, stiff."; bedroll: "Your fur bedroll is warm.", +2 hearts, not stiff; glow/mending used by the night, no hearts (s1.mjs)
- Bedroll SLEEP in bag (C), SET DOWN, bump at night asks, by day "Roll up the bedroll?"/"You aren't tired.", roll up line; SLEEP by day "You aren't tired." (s2.mjs)
- canSleepOut: 170..299 only; bunny/lure wisp near don't block (D-827); rat/mole/gloamling in light block; asleep doesn't (r3.mjs)
- Mortar card both screens: 6 recipes in order, costs, "Nothing to make here yet.", short lines, each make a turn, each drink, 8 marks fit on phone, rims match share left (m1,m2,m3)
- Long strip lines (40 chars) fit phone width (s-m3-lines.png)
F5 (docs). GLOSSARY-FINDS.md:34-56 six draughts "mark ... with the turns left" and GLOSSARY-2.md:32 Warmed "with its turns left": superseded by D-847 (number gone, rim). GLOSSARY-FINDS.md:103 + CONTENT-2.md:18 minnow "pond at home"/"home pond": D-734 every woods room's pond holds it (H-27 names only regions/starting-region.md:81).
Sound (r7.mjs): hook FIT free, no rod line, zones 3/8 and 3/10; rod/bedroll short lines; mortar/campfire/bedroll "Only on the surface." below ground; campfire room and level even over 3000 seeds, every one of 150 seeds has its fire; glow 3 and 2 tiles; mortar take down lines; Glow reach +1 tile, added to Wide Glow, none when empty.
