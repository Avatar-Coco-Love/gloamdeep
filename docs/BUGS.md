# Bugs the owner noticed

Things the owner saw in play that look wrong, or ideas that came with
them (D-852). Each has its own number, B-001 on, never reused. Claude
looks into one at a time: finds the cause, offers 2 or 3 fixes with a
recommendation, and builds only the owner's pick. A fixed bug's entry
moves to `archive/BUGS-FIXED.md` word for word, with the version that
fixed it. The owner's ideas here are not decisions until picked.

Format: `B-xxx · date noticed · title`, then what the owner saw, in
their words where possible, and any ideas they gave.

---

None open.

## Found by the sixteenth audit's bug hunt (D-910)

Read in the code from 0.3.314 to 0.3.352 and checked with small scripts.
The owner picked all five as steps, in this order, each fix still the
owner's pick at its step. The fixes offered are the hunt's, the first
one recommended.

- **F-1 · Flyers over things can't be hit.** A bat, lampmoth or lure
  wisp over a workbench, stash chest, garden bed, the bed by day, a
  campfire, a bedroll from dusk or a cold brazier: walking into it opens
  the thing's card, not a strike (against D-901). `panelBeside` and
  `campAsks` (`bagturn.js:273`) come before `step()` in `main.js:250`.
  Fixes: no card while a creature is on the tile; or check for a flyer
  first in `tryStep`.
- **F-2 · The oil's "After" shows too much.** A pour that passes a turn
  burns that turn's oil first (`bagturn.js:48`), which the preview
  (`numbers.js:85`) leaves out: at 0.467 it shows 10 segments, the pour
  gives 9 (against D-908). Fixes: take off one turn's burn when the pour
  passes a turn; or mark "After" as near.
- **F-3 · Kind Herbs' words.** "Herbs, potions and fish heal 1 heart
  more" (`boons.js:25`), but heartcaps and gloamberries do too
  (`boon.js:38`). Fixes: the words cover all food; or the rule keeps to
  herbs, potions and fish.
- **F-4 · Copies of an unreadable save pile up.** Each load of a broken
  or newer save copies it aside again (`aside.js:7`, `save.js:132`),
  which could fill storage. Fixes: skip the copy when the newest one is
  the same; or keep one copy per save.
- **F-5 · An empty reward read aloud.** The two goals ticked without a
  reward (H-10) read "done, ." to screen readers (`goals.js:197`).
  Fixes: leave the reward part out; or say "done, no reward".
