# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.2.js` (D-254).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- Later minor versions (`0.3`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.2.224 (2026-10-31)
- On the title's screens and the pause menu, the cards now end a little higher, so the version number in the bottom left corner no longer sits on the card's edge.
- Every card's round close button now sits in the middle of the title's strip, as far from the right edge as the title is from the left, and the line under the title stops short of it instead of touching it.
- The hearts panel now stands as far in from the screen's edges as the round buttons, its top level with theirs. The dev drawer opens under the hearts panel instead of over its foot.
- Decisions: D-512.

## 0.2.223 (2026-10-31)
- Walk onto a healing herb with full hearts and it now goes into your bag, instead of staying on the floor without a word. Pick it in the bag and Eat to heal 2 hearts. Hurt, you still eat it on the spot.
- Herbs stack 5 to a slot. With no room in the bag, the herb stays where it lies and the game says "Your bag is full."
- Decisions: D-511, which replaces D-156.

## 0.2.222 (2026-10-31)
- The text line now colours a line by where it comes from: what people say, like the trapped peddler's calls, is bone white, and a creature biting or stinging you is red. Warnings stay amber and everything else grey.
- Behind the scenes: every other line stays grey for now, and a bite your vest turns stays grey too. Older decisions moved to the archive, word for word. Decisions: D-510; this builds D-509.

## 0.2.221 (2026-10-31)
- How to play has a new first tab, Basics, and now opens on it. It says what to aim for and how to keep your lantern lit: find the stairs down, searching each room for them; your lantern burns oil, and less oil means less light; pour a flask from the bag or the quick slot; 3 oilcaps make a flask; oilcaps are the amber mushrooms in rooms.
- Upright, How to play's tabs still take two rows: Basics, Touch and Mouse on top, Keyboard, Bag and Bench under them.
- Behind the scenes: the guide who joins you later won't be a faery; what it is waits for the owner. Next, the text line will colour what people say white and harm red. Older decisions moved to the archive, word for word.
- Decisions: D-507, D-508, D-509. Questions opened: Q-072.

## 0.2.220 (2026-10-31)
- Held upright, the title's screens are bigger: the title, Profiles, Settings, How to play and the name and seed pads fill the screen's width, the same size as the cards in play. Sideways nothing changed.
- Upright, Journal, How to play and Settings stand in a row under the big button, in thumb reach.
- Upright, the name pad's keys are square and sit at the bottom of the card, and the seed pad's keys fill the card's width at its bottom, their digits twice as big.
- Behind the scenes: old decisions that 0.2.219 lost from the archive by mistake are back, word for word.
- Decisions: D-506.

## 0.2.219 (2026-10-31)
- You can now play holding your phone upright, not only sideways. Turn it any time, even in the middle of a fight or with the bag open: the game no longer pauses or asks you to turn it.
- The tiles are the same size whichever way you hold it. Upright you see about 9 tiles across and more of the room above and below you; sideways, as before, more to the left and right.
- Upright, the cards stack their two sides: the bag's item words under its slots, the pause card's journey facts under its lines, the stash chest's bag under the chest, and the workbench's and peddler's words under their slots. The Growth tree stands across the bottom of the Journal, its words above it.
- Upright, How to play shows its tabs in two rows, long ways and long Settings values wrap onto a second line, and long version titles end in '..'. The text line stands above the bottom buttons instead of behind them.
- Installed on a home screen, the game now turns with the phone. On Android, Play still goes full screen, but no longer locks it sideways.
- Decisions: D-505. Questions closed: Q-065.

## 0.2.218 (2026-10-31)
- Water is done for now: the still cave pools and the pond at home stay as they are. Water comes back later: streams, rivers above and below ground, oceans and more.
- The garden comes next. Nothing in the game changed.
- Decisions: D-504.

## 0.2.217 (2026-10-31)
- Home in the woods now has a pond: 5 to 9 tiles of the cave pool's blue-grey water, with a dark grassy lip under its bank, in an open spot away from where you start and the cave mouth. You can't step in yet. Only a new journey has it; a journey already started keeps its woods as they were.
- Still water ripples calmly now: a ring widens on about 1 tile in 5, every 7 seconds, and the shimmer is slower, so the cave pool no longer bubbles like a hot spring.
- Decisions: D-503.

## 0.2.216 (2026-10-31)
- The map now shows a cave pool's water in its own blue-grey, once you've seen it, instead of as a wall.
- Decisions: D-502.

## 0.2.215 (2026-10-31)
- The peddler no longer floats: he stands still on his shadow, feet on the ground, as you do.
- He now faces forward, his hood face-on with two pale eyes and his bundle behind his head. He turns left or right to face you only when you're within 2 tiles and not straight above or below him.
- Decisions: D-501.

## 0.2.214 (2026-10-31)
- About 1 grey-rock Cave room in 2, at depths 2 to 4, now has a still pool of blue-grey water, 5 to 9 tiles, in a chamber away from the stairs.
- It ripples and shimmers, and your lantern's warm light shows on it. You can't step in yet, and creatures can't cross it. Light passes over it, and it never blocks the way.
- Decisions: D-500.

## 0.2.213 (2026-10-31)
- The owner's ideas for how places are made are kept: pools, rivers above and below ground, different biomes, parts of a room you reach only through another door, and later debris and cobwebs.
- Water comes next, before the garden and fishing. Nothing in the game changed.
- Decisions: D-499. Questions opened: Q-071.

## 0.2.212 (2026-10-30)
- Clearing a corner heap of the rubble around the peddler no longer frees him: you can't reach him through a corner. He keeps cheering you on.
- Clear a heap straight up, down, left or right of him to free him. His 5 turns start then, so you have time to step in and talk.
- Decisions: D-498.

## 0.2.211 (2026-10-30)
- Free the peddler and, when he heads home, a column of warm lantern light now drops onto him. He comes apart in thin bands that rise up the beam, then it goes out.
- Go home to the woods next and he beams in the same way beside the middle, once the room has faded in.
- The first time you come within 2 tiles of him at home, he greets you, once.
- Decisions: D-497.

## 0.2.210 (2026-10-30)
- Free the peddler and he no longer vanishes at once. He thanks you and stays where he stood. Bump him to talk: free, his lines taking turns.
- Left alone 5 turns, or 3 after your last bump, he says goodbye and fades away, heading home to the woods. Leave the room first and he goes home anyway.
- Digging him out, his first call is for help; after that he cheers the digging on. Creatures no longer step onto a person.
- Decisions: D-496.
