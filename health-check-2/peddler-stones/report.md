# peddler-stones: the Peddler and the waystones (0.3.305, second pass)

Played on the phone (412×915, taps) and the PC (1600×900, keys and mouse); the three cards also looked at on a phone held sideways. Seven findings, none a crash. Scripts and screenshots are in
`/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/peddler-stones/` (screenshots in its `out/`).

Met again, not re-reported: H-01 (Stout Heart's hearts cut on travelling home, 7 to 5), H-04, and the boon card's "until you are home" words.

### Coming home by waystone, the hero is never offered a boon for the next trip
- Kind: mismatch (game against a decision)
- Notice: most players, once they travel by waystone
- What a player sees: They travel Home from a deeper waystone. The boon ends as they arrive, and they stand on the home plate. A tap on the hero (or Space, Enter) opens the travel card, and they can go straight back down with no boon and no boon card ever shown. To get one they must know to step off the plate and back on.
- Evidence: D-583 "Each time the hero sets out from the home waystone, it offers 3 boons". D-596 opens the card only on "stepping onto the woken home plate"; `src/core/boon.js:54-56` (`stepOffersBoons` needs the hero to have moved within the room) and `src/main.js:283` (`!went`). Measured: Depth 16 → Home (boon `waymark` → none) → Depth 8, turn 6 throughout, no card. Waking on the home plate after a fall (`fall.js:45`) takes the same path: read only.
- How checked: REPRODUCED in the browser (both): `w3.mjs` (pc), `w4.mjs` (phone)
- Screenshot: `/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/peddler-stones/out/w4-phone-homecard.png` (on the home plate, no boon, the travel card open)
- Fix options: (1) **Recommended**: arriving on the home plate by travel or a fall opens the boon card once the fade ends, as a step onto it does. (2) On the home plate with no boon held, the tap on the hero opens the boon card first, then the travel card. (3) Keep it, and say so: a line on arriving ("Step off and on for a boon.", the owner's words).
- Sure?: high that it happens; medium that the owner sees it as wrong, since D-596 only speaks of stepping.

### Skipping the boon card and stepping back on draws three new boons
- Kind: mismatch (no decision covers it; it weakens D-583's "offers 3 … picks 1")
- Notice: few (those who try the cross)
- What a player sees: The boon card shows three boons. The cross closes it; one step off the plate and one back on shows three different ones. Two turns in daylight, as often as they like, until the wanted boon comes up.
- Evidence: `src/core/boon.js:61`, the draw is seeded by the seed and the turn. Measured, seed 1: turn 4 Far Sight / Reckless / Keen Eye; skipped; turn 6 Waymark / Wide Glow / Greedy Hands. Nothing in the decisions or open questions on drawing again (grep "boon" in `OPEN-QUESTIONS*.md`: nothing).
- How checked: REPRODUCED in the browser (pc), `w1.mjs`
- Screenshot: `/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/peddler-stones/out/w1-pc-boons.png` and `/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/peddler-stones/out/w1-pc-boonsB.png`
- Fix options: (1) **Recommended**: the three offered stay the same until the hero has left the stone's room (kept in the state). (2) Seed the draw by the day, so a new morning brings new ones. (3) Leave it: the owner says drawing again is allowed.
- Sure?: high that it happens; low that it is unwanted. It is the owner's call.

### On the Peddler's Sell tab, the dim SELL on an empty slot moves the frame, and a second press sells
- Kind: bug
- Notice: few
- What a player sees: They tap an empty bag slot on the Peddler's card; SELL goes dim. Pressing SELL anyway makes the gold frame jump to the last thing in the bag. Pressing again sells one of it. In the test that was the only Venom Sac, and he never sells materials back.
- Evidence: `src/input/cardscreens.js:181`, after any press the frame is clamped to the last filled slot, even when nothing sold. D-494: "A tap picks a slot" and SELL is "dim for what he doesn't buy". Measured: bag flask 2, Rat Tail 3, Venom Sac 1; frame on slot 6 (empty); press 1: frame on Venom Sac, 0 coins; press 2: 5 coins, Venom Sac gone.
- How checked: REPRODUCED in the browser (both), `p7.mjs`
- Screenshot: `/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/peddler-stones/out/p7-phone-jumped.png`
- Fix options: (1) **Recommended**: a press that sells nothing leaves the frame where it is. (2) Empty slots can't be picked on the Sell tab.
- Sure?: high. Reproduced on both screens.
- Seen beside it, by design as far as I can tell: selling the last of a stack leaves the frame on the same slot, where the next stack has slid in, so a fourth quick tap on SELL after three Rat Tails sells one of the next thing. No decision speaks of it; the owner may want the frame to stop there.

### Kind Herbs says "Whatever heals you", but only food and the potion gain a heart
- Kind: mismatch (card words against the effect, and D-599 against the Mending Draught)
- Notice: few
- What a player sees: With Kind Herbs, a herb heals 3 and a minnow 2, as promised. A Mending Draught still gives 4 hearts, not 5, and a bed, a campfire or a bedroll gives nothing more either. The card and the mark say "Whatever heals you heals 1 heart more."
- Evidence: `src/core/boons.js:25` (the words); D-599 "anything eaten or drunk heals 1 heart more"; D-794, later, the Mending Draught "4 in all"; `src/core/mending.js:25` adds a plain 1. Measured: herb 1→3 and 1→4 with the boon; Mending Draught 1→4 after 46 turns, with and without it.
- How checked: REPRODUCED in a script (`t5.mjs`, `t6.mjs`); the card's words seen in the browser (both)
- Fix options: (1) **Recommended**: change the words to what it does, e.g. "What you eat or drink heals 1 heart more." and leave the draught at 4 (the owner approves the words, and says whether a drunk draught counts). (2) The Mending Draught gives 1 more with Kind Herbs. (3) Leave it.
- Sure?: high on the numbers; medium that it matters.

### The Peddler's spot at home ignores the hero and creatures
- Kind: risky code
- Notice: rare
- What a player sees: Usually nothing. If a creature happens to stand on the tile just south of the room's middle as he goes home, he lands on it; in an older save, moved once to the stone's room (D-855), he can land on the hero's own tile.
- Evidence: `src/core/homeward.js:64`, `taken` looks at the stone, finds and people only. D-492: "nothing set down or grown back goes on his tile" is kept by the other code; this is the other way round. Also `homeward.js:57`: with no spot found he is dropped for good, since `leave` has already taken him out of the room (read only; I found no real room where it happens: 274 of 274 seeds placed him, 272 one tile from the middle, 2 two tiles).
- How checked: REPRODUCED in a script (`t8.mjs`): hero on (8,11), Peddler set on (8,11); a rat on (8,11), the same.
- Fix options: (1) **Recommended**: `taken` also counts the hero, creatures and lights there. (2) Leave it; it clears itself when either moves.
- Sure?: high that the code allows it; it will be seen very rarely.

### Talking to the freed Peddler straight away makes him leave sooner
- Kind: mismatch (small; the code's own notes against what it does)
- Notice: rare
- What a player sees: Freed, he waits 5 turns. Bumped in the first turn or two, he then leaves 3 turns after that bump, so sooner than if left alone.
- Evidence: `src/core/rescue.js:50` sets `leaves` to now + 3, whatever it was. D-496: "goes 3 turns after the last bump", so the letter is met; but `people.js:7` and `turn.js:81` say he "stays a little longer". Measured: freed on turn 3 (leaves on 8); bumped on turn 4; he left on turn 7.
- How checked: REPRODUCED in the browser (both), `p1.mjs`, `p5.mjs`
- Fix options: (1) **Recommended**: a bump never brings his leaving forward (the later of the two). (2) Leave it, and fix the two notes in the code.
- Sure?: high on the numbers; low that anyone will mind.

### The boon's mark is a small target on the phone
- Kind: bug (tap size)
- Notice: some
- What a player sees: The mark under the hearts is about 30 px square on the phone. A tap on its middle says the boon's name and line; a tap just beside it is a tap on the room, and the hero walks off toward the top left.
- Evidence: `src/render/marks.js:15` (15 game pixels, 2× on the phone) and `:47-52` (no room around it); the brief's 44 px. D-604: "A tap on it … says the boon's name".
- How checked: tapped at its middle in the browser (phone), `w2.mjs`: it works; the size was measured on the screenshot and read in the code. A miss was not played.
- Screenshot: `/tmp/claude-0/-home-user-gloamdeep/b51b3cef-1381-54c0-a93a-a9758be8f70d/scratchpad/hc/peddler-stones/out/w2-phone-T7-mark.png`
- Fix options: (1) **Recommended**: the tap counts a few pixels around each mark, as the cards' buttons do (`TAP_PAD`). (2) Draw the marks bigger on a phone.
- Sure?: medium. It shares its row with the draughts' marks, so another worker may report the same.

## Checked and found sound
- **Finding him**: a Peddler stands in the seed's depth-3 room in all 2000 seeds tried (script).
- **Freeing him** (browser, both): first bump his call for help, then "Keep digging!" lines in turn, the third bump "I'm free! Thank you, friend!"; 3 bumps, a turn each (D-491). A corner heap frees no one and says the rubble's own line (script, D-498).
- **Waiting and leaving** (browser, both): his three waiting lines in turn, free; goes after 5 turns or 3 after a bump with "Thank you! I'll head for the surface." and the lantern beam (D-496, D-497).
- **At home**: he stands in the home waystone's room one tile from its middle, off the stone's 3 × 3 (D-855); greets once within 2 tiles, "There you are, friend! Welcome!" (pc); his two home lines take turns.
- **Trade card** (browser, both; keys, taps, mouse, Space): opens on a bump, free, no turn. Prices: common 1, Wisp Glass and Blind Cavefish 2, rare 5; flask 3, torch 2; never runs out, nothing changes or refills (D-494, D-495, D-616, D-618, D-649). "He doesn't buy this.", "You have too few coins.", "Your bag has no room for it." all show and BUY/SELL go dim. Selling the last of a stack closes the gap. Fits with 6, 9 and 12 slots on phone, PC and a phone sideways.
- **Home waystone** (browser, both): wakes on the first step, "The waystone wakes."; that step offers no boon (D-603); the next step on does.
- **Boon cards**: all 14 boons seen on a card on phone and PC, none cut off; three kinds each time; Left/Right, Enter, taps, the cross. "The waystone grants you …", the first-time card, the mark and its words (D-596, D-603, D-604, D-712).
- **Boon numbers** (script): Slow Wick ×0.75, Hungry Flame +2 tiles and ×1.5, Greedy Hands ×1.25, Wide Glow +1 tile and none on the empty ember, Deep Pour 60%, Stout Heart +2 (3 → 5 of 7), Reckless −2, Hard Blow +1, Kind Herbs +1 on food (D-596 to D-599). Hearts wrap onto a second row with 7.
- **A boon ending**: gone on arriving in the stone's room by travel, with no line (D-753).
- **Deeper waystones** (browser): wake at depths 2, 8, 12, 16 (pc) and 5 (phone).
- **Travel card** (browser, both): Home first, then by depth, "???" for unwoken and the next one below, "You are here." dim; dim rows do nothing; opens on the first woken one; travelled 16 → Home → 8 → 2; no turn and no oil; scrolls on the PC and sideways phone with its bar (D-593 to D-595).
- **A creature near** (browser, both): awake beside, awake at a corner, or chasing: "Not with a creature so near.", no turn; asleep beside: the card opens.

## Not reached
- The older-save steps (`homestone.js`, `movestone.js`, `smallstone.js`, `resettle.js`): read only, but for the one script on `resettle`. No old save was loaded in the browser.
- A fall with a boon held, and waking on the home plate: read only.
- Soft Step, Waymark, Far Sight, Keen Eye, Lucky Find: their cards and marks seen; their effects not played.
- The travel card scrolling by swipe and Page keys on a phone held upright (7 rows fit there without scrolling); it needs a waystone far deeper than 16.
- "Several mornings": boons were taken on several returns to the plate, not across slept nights.
- The Peddler's greeting on the phone (my taps missed the tiles; it was seen on the PC only).
