# surface-falls notes (appended as I go)

## Findings so far
(none confirmed yet; candidates to disprove below)

## Checked and sound
- Mountain room walked into from the woods (seed 4127, woods:2,1 -> woods:2,0), phone + pc, real keys: 3 boulders, 2 loose stones, 3 sticks, lone trees, rock past the edge, round map and big map show rock grey (D-738, D-761). REPRODUCED both.
- Loose stone lines "You pick up a loose stone." / "A stone from the slope. You keep it." (D-761), both screens. Regrows 300 turns after picking when walked out and back (rules script n2.mjs).
- Skulker crab (D-796): looks like a loose stone 2 tiles off, shows claws beside, pinches for 1 on stepping beside, 2 hearts (2 lantern swings), "The skulker crab pinches you." / "cracks open.", dropped a Crab Shell; by day only. Both screens.
- Rim lurker (D-797): comes out at turn 186 beside rock, notices at 3 steps lit or unlit, chases, waits-for-it strike-first works, 3 lantern swings, claws for 2, "claws you" / "sinks into the dark."; gone at 285, crab back. pc unlit + phone lit; changeover in rules script n1.mjs.
- Invariants over 1500 seeds (inv.mjs): one lamppost a seed, never the campfire's room, 2+ tiles in; camp 6 tiles in a mountain room, never the fire's or lamppost's; every mountain room 3 boulders, 2 stones, 3 sticks, no pond/bush/oilcap, all open ground joined. Fallen branch missing in 13 of 4500 rooms: a path cut it, as D-742 B1 says.
- Dead lamppost (D-769): bump is free, "An old lamppost." then "Its lamp went out long ago.", alternating; day and night; both screens.
- Miners' camp (D-770): card "Take the pick?" / "An old pick leans on the crate.", No picked; No -> "A miners' camp, long left." free; Yes -> Stone Pick in bag, 1 turn, camp bare, "You take the old pick."; bare bump says first words, free; pick in bag or Tool slot -> "You already carry a stone pick."; bag full -> "Your bag is full."; mole claw pick held still takes it. pc all 5 variants; phone plain with a real tap on Yes. Card fits both screens.
- Gentle falls x4 (surface bite, below poison, surface poison, below bite) on phone and pc: bag, knife, pick, vest, charm, 7 coins, xp, day all kept; boon ended, Glow Draught ended, poison ended, full hearts, full oil, turn +1; wakes on start tile / woken home plate / tile lain down from by the bed (D-737); "You fall, and wake again."; Records falls +1; 20 turns on, no errors.
- Hardcore falls x4 on phone and pc: "Your journey ends." Same world / New world page fits; saved at once from the same seed; Same world keeps seed 4127; New world takes a random seed, or Settings' seed (777); Esc -> title -> Continue; bag, gear, coins, level, map memory, day all gone; mode stays Hardcore; "The world begins again."; Records (falls +1), Glints, Bestiary kept (D-334, D-344); 20 turns on, no errors.
- Changing the way to play (D-346): Hardcore -> Normal -> Gentle by keys on pc, pages seen on phone; harder ways grey "Only an easier way can be picked."; "Play Gentle?" "There is no going back." No picked; No goes back to the ways.

## Method notes (to be honest in the report)
- The fatal turn on the phone was a Space key press, not a tap on the hero; the Hardcore page and the camp's Yes were real taps.
- The 20 turns after each fall were keys on both screens.
