# peddler-stones notes (running)

## Confirmed findings
1. Travel home (or wake there after a fall) ends the boon, hero stands on the home plate; Space/tap opens the travel card, never the boon card; hero can set out again by waystone with no boon offered. D-583 "Each time the hero sets out from the home waystone, it offers 3". REPRODUCED browser pc (w3.mjs) and phone (w4.mjs). main.js:283 (!went), boon.js:54-56 stepOffersBoons needs a step.
2. Boon re-draw: cross skips, step off and on (2 turns) gives 3 new boons (offer seeded by seed^turn, boon.js:61). REPRODUCED pc (w1.mjs: turn 4 Far Sight/Reckless/Keen Eye, turn 6 Waymark/Wide Glow/Greedy Hands). No decision on it.
3. Trade card: dim SELL on an empty slot jumps the frame to the last stack; 2nd press sells it (Venom Sac sold). cardscreens.js:181. REPRODUCED phone + pc (p7.mjs). D-494 "a stray one never sells".
4. Kind Herbs: card "Whatever heals you heals 1 heart more."; D-599 "anything eaten or drunk". Mending Draught (drunk) gives 4 with or without (mending.js:25); herb 2->3, minnow 1->2 ok. REPRODUCED script t5/t6.
5. Peddler's home spot ignores the hero, creatures (homeward.js:64 taken). resettle puts him on hero's tile; goHome onto a creature. REPRODUCED script t8. Rare.
6. Bumping the freed Peddler in his first 2 turns makes him leave sooner (leaves 8 -> 7), comments say "stays a little longer". rescue.js:50. REPRODUCED pc+phone. D-496 letter is met ("3 turns after the last bump").
7. Boon mark tap target 30 px on phone (marks.js MARK=15, no pad), a miss walks the hero. READ + tapped ok at centre.

## Checked and sound
- Rescue: calls, digging lines, freed, waiting lines in turn, leaving at 5 / 3 turns, beam, corner heap frees no one (script), phone taps + pc keys.
- Peddler found in all 2000 seeds' depth-3 room; home spot 1 tile from middle in 272/274, 2 in 2.
- Trade card sell/buy, prices 1/2/5, flask 3 torch 2, too few coins, no room, last of stack, 6/9/12 slots, phone + pc + keys + mouse + Space. Free, no turn.
- Greeting once within 2 tiles (pc).
- Home stone wakes on step, no boon on waking step, boon card 3 kinds, all 14 boons' cards fit on phone and pc, mark says name+line, about-boons card.
- Boon numbers match D-596..D-599 (script t5).
- Travel card list, ???, You are here, dim rows do nothing, scroll on pc, each-to-each, creature near barred (adjacent, corner, chasing far), asleep adjacent allowed; phone + pc.
- Deeper stones wake at 2, 5, 8, 12, 16.
- Sideways phone: boon cards, travel card (scrolls, 5 rows), trade card 12 slots all fit.
- report.md written.
