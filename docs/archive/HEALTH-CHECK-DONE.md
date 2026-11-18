# Health check: the done findings

Moved word for word from `docs/HEALTH-CHECK.md` and `HEALTH-CHECK-2.md` at
the fifteenth audit, 0.3.313 (D-868), each with the version that did it.
The rest of both files, and `HEALTH-CHECK-ORDER.md` with each step's
version, followed whole at 0.3.422 (D-981), every step done.
Never read whole; grep for an H number.

## From `HEALTH-CHECK.md` (the 0.3.304 health check, D-860)
- **H-01 The bed's gold heart disappears.** Taking a boon, a boon
  ending, or sitting by a campfire caps hearts at the most, so the gold
  heart goes, with no line; D-488 says only a bite or a fall takes it.
  `boon.js:73`, `state.js:35`, `fireside.js:30`, `sleepout.js:56` (the
  last read). Ran. Suggests: none of the four may lower hearts held.
  Done at 0.3.308 (D-863).
- **H-02 A find stepped on with a full bag says nothing.** Wood with
  every stack full has no line, against D-339 (`items.js:128`,
  `turn.js:112`). Any find with none of its kind carried is silent too,
  the locket included, as D-339 has it; D-511 fixed only the herb. Ran.
  Suggests: every find says "Your bag is full.", wood its own line.
  Done at 0.3.309 (D-864).
- **H-18** A second one-of-a-kind piece from the lost bag or a chest
  says "Your bag is full." (`fall.js:16-27`, `chest.js:71`). Ran.
  Done at 0.3.309 (D-864).
- **H-19** The Heart tile counts boon hearts: "Hearts 12 of 10"
  (`growth.js:88`). Ran. Done at 0.3.308 (D-863).
- **H-22** Every sound is `.ogg`; older iPhones may stay silent. Done at 0.3.313 (D-868).
- **H-23** 266 code files at boot, 328 KB of them version history. Done at 0.3.313 (D-868).
- **H-31** Stale comments (`enemies.js:30-32`, `behaviours.js:40-42`,
  `tiles.js:47`, `cave.js:176,369`, `events.js:7-45`); `craft()`
  unused by the game (`bagturn.js:54`); `WORKFLOW.md` 17 bytes under
  its cap; `main.js` 48 KB. Done at 0.3.313 (D-868).
- **H-66** More stale comments: `items.js:244-246`, `tiles.js:127-129`,
  `people.js:7`, `turn.js:81`, `fishing.js:1,16,25` (second pass, D-861). Done at 0.3.313 (D-868).

## From `HEALTH-CHECK-2.md` (the second pass, D-861)
- **H-32 No boon after travelling home.** Arriving on the home plate by
  travel or a fall, the tap opens the travel card, never the boon card;
  D-583 offers one each time the hero sets out (`boon.js:54-56`,
  `main.js:283`). Played. Suggests: arriving opens the boon card.
  Done at 0.3.310 (D-865).
- **H-33 A campfire's and the miners' camp's first words are hidden.**
  The text line isn't drawn over the ask card (`frame.js:409,424`);
  D-757, D-844, D-770 put them on the line. Played. Suggests: draw the
  line over the card when a bump opened it. Done at 0.3.311 (D-866).
- **H-34 The Look card's tabs are 26 px tall on a phone** (`cloak.js:27`);
  D-513's 44 px. Played. Suggests: taller taps, same look. Done at
  0.3.312 (D-867).
- **H-35** The boon's words say "until you are home"; it ends at the
  cave mouth's room (D-753; `render/boons.js:12`, `boons.js:23`,
  `opening.js:12`). Ran. The owner approves the words. Done at
  0.3.310 (D-865).
- **H-37** The Look card by keyboard: Up from RANDOM re-picks every
  cloak passed, losing the rolled one (`looks.js:154-158`,
  `profilescreens.js:73`, D-522). Played. Suggests: Up jumps to the tab.
  Done at 0.3.312 (D-867).
- **H-44** Skipping the boon card and stepping off and on draws three
  new boons (`boon.js:61`). Played. The owner rules if that's allowed.
  Done at 0.3.310 (D-865).
- **H-67** A second one-of-a-kind piece put into a stash chest that
  holds one says "The chest is full." when the chest has room
  (`chest.js:66`, `bag.js:26`; H-18's other side, added by the owner
  at 0.3.309). Ran. Suggests: its own line, as H-18's. Done at
  0.3.310 (D-865).

## For 0.3.314, after the audit (D-868)
- **H-24** Read only: a boulder may grow back on a waystone's ring
  (`regrow.js:47-54`); a drop may land on water (`spread.js:16`); dev
  Spawn onto a person (`spawn.js:27`).
- From H-31: `craft()`, used by no screen (`bagturn.js:54`), taken
  out (D-868).
  Done at 0.3.314 (D-869).

## From `HEALTH-CHECK-ORDER.md`, the steps and their versions (moved whole at 0.3.422, D-981)

### Health check: the order of the steps

Both health checks' steps (D-860, D-861) in one order, the owner's pick
(D-862): grouped where findings share a cause or a card, the things most
players notice first. Each finding's details stay in `HEALTH-CHECK.md`
(H-01 to H-31) and `HEALTH-CHECK-2.md` (H-32 on). One step a
conversation: Claude checks each finding still holds, offers 2 or 3
fixes with a recommendation, and builds only the owner's picks. A done
step gets its version here. No new content until every step is done.
The audit came in at 0.3.313, after step 5 (D-867), and took H-22,
H-23, H-31 and H-66 (D-868); H-24 and `craft()` were 0.3.314, before
step 6 (D-869).

1. **Hearts:** the bed's gold heart (H-01); the Heart tile's count (H-19).
   Done at 0.3.308 (D-863).
2. **A full bag:** silent finds (H-02); a second one-of-a-kind piece
   (H-18). Done at 0.3.309 (D-864).
3. **Boons at the home stone:** none after travelling home (H-32);
   drawing again (H-44); "until you are home" (H-35); and the chest's
   second one-of-a-kind piece (H-67), the owner's find. Done at 0.3.310
   (D-865).
4. **First words over the ask card** (H-33). Done at 0.3.311 (D-866).
5. **The Look card:** the tabs' taps (H-34); the keyboard (H-37). Done
   at 0.3.312 (D-867).
6. **One words page,** every wording approved at once: H-12, H-15,
   H-20, H-39, H-40, H-41, H-43, H-45, H-47. Done at 0.3.315 (D-870).
7. **The marks:** a pad round each (H-36); a second row (H-55). Done
   at 0.3.316 (D-871).
8. **Two clear bugs:** the scorpion's rest (H-05); the drink's oil
   warning (H-11). Done at 0.3.317 (D-872).
9. **The Peddler's room refuses torches** (H-09). Done at 0.3.318
   (D-873).
10. **The owner's rulings:** travel and countdowns (H-04); the mole up
    close (H-06); the warden's tip (H-46); with Q-098 and Q-100. Done
    at 0.3.319 (D-874).
11. **Goals:** paid when quiet (H-10); two at once (H-13); with Q-099.
    Done at 0.3.320 (D-875).
12. **Balance:** growing back at home (H-07); cave pools (H-08), with a
    map preview; with Q-101. Done at 0.3.321 (D-876).
13. **Sounds only when On** (H-03). Done at 0.3.322 (D-877).
14. **The Peddler:** the dim SELL (H-42); his home spot (H-58); leaving
    sooner (H-59); with Q-102. Done at 0.3.323 (D-878).
15. **Falls:** inside the workbench (H-16); a draught (H-17); Warmed
    (H-56). Done at 0.3.324 (D-879).
16. **Saves kept safe:** the lost Peddler (H-57), tested with the two
    old saves on the branch `claude/gloamdeep-health-check-2-5uv4gm`,
    deleted after this step; an unreadable slot (H-21); the repeating
    error (H-14). Done at 0.3.325 (D-880); the two saves kept as tests.
17. **The art,** the owner picks from a picture: H-51 to H-54, H-60,
    H-61. Done at 0.3.326 (D-881).
18. **The dev tools:** H-38, H-48 to H-50. Done at 0.3.327 (D-882).
19. **The docs:** H-25 to H-30, H-62 to H-65. Done at 0.3.328 (D-883).
Every step is done.

## From `HEALTH-CHECK.md`, the rest (moved whole at 0.3.422, D-981)

### Health check steps

The 0.3.304 health check (D-860) played the game, read `src/` and
compared both with the decisions and docs. The owner picked these
findings to become steps. Each has its number in the report, H-01 on,
never reused. One step at a time, in `HEALTH-CHECK-ORDER.md`'s order
(D-862): Claude checks the finding still holds, offers 2 or 3 fixes with a recommendation, and
builds only the owner's pick. "Suggests" is Claude's recommendation,
not a decision. A done step's line gets its version, and moves to
`archive/HEALTH-CHECK-DONE.md` at the next audit. The full report, with every option:
https://claude.ai/artifact/Lv8sNA91e7X949uKDe4E4s
The second pass's steps, H-32 on, are in `HEALTH-CHECK-2.md` (D-861).

"Ran" means reproduced with the game's rules in a script; "read" means
seen in the code only.

#### 1. Most players notice
All done: in `archive/HEALTH-CHECK-DONE.md` (D-868).

#### 2. Clear bugs, one step each
- **H-05 A scorpion's rest is cut short near a spit grub.**
  `spit.js:33-35,54` lowers any creature's `rests`, and
  `creatureturn.js:178-180` lowers it again; D-729. Ran. Suggests: the
  spit code touches only spitters.
- **H-09 The Peddler's room refuses torches.** His sealed tile makes
  the room count as cut in two (`regrow.js:67`, `cave.js:253-254,313`,
  `bagturn.js:297`): no Torch or Glow Lamp set down (D-478), no deposit
  grown back, no flask mimic (D-366), until a heap is dug. Ran.
  Suggests: the joined check leaves his tile out.
- **H-11 The oil tick's drink never warns.** `endturn.js:42` checks the
  oil before creatures act, so `oilLow` and `oilEmpty` never come from
  a drink (`creatureturn.js:56`). Ran. Suggests: check again after.

#### 3. The game against a decision: the owner picks which holds
- **H-04 Waystone travel counts down poison and draughts.** D-593:
  "no turn passes"; `travel.js:51` ends with `endTurn`. Ran: a heart
  lost to poison on travelling. Suggests: travel skips the countdowns.
- **H-06 A mole bitten up close still digs away.** D-726: "already
  beside the hero as it notices, it never digs"; `creatureturn.js:190`
  never records it. Ran. Suggests: follow the decision.
- **H-10 Goals ticked quietly still pay.** D-752: "paid nothing";
  `goals.js:149-164` always pays. D-746 and D-735 say unpaid, D-705
  paid. Ran. Suggests: follow D-752 for the oil goal; the owner rules
  on the rest.

#### 4. Balance: the owner picks the rule
- **H-07 Nothing grows back at home while the hero stays.** Daylight
  lights every tile and sleep keeps the hero in the room, so D-307's
  "out of the hero's light" never comes (`regrow.js:88`, `sight.js:41`).
  Ran. Suggests: sleeping counts as being away.
- **H-08 Cave pools are half as common as decided.** D-500: about 1
  room in 2; measured about 27% (`cave.js:271-280`), since rooms shrank
  (D-645). Suggests: try more spots, measure, show a map preview.

#### 5. Sounds only when On
- **H-03** The first tap fetches all 115 sound files (7.9 MB) and
  unpacks all five tunes, with Sound Off (`sound.js:270-296`). Read.
  Suggests: fetch once Sound is On, and only the place's tune.

#### 6. Small fixes, a few a step
- **H-12** How to play: the pick "In the bag"; it is the Tool slot
  (D-552, `howto.js:56`). The owner approves the words.
- **H-13** Two goals done on one turn: only the first is announced
  (`main.js:155`). Read.
- **H-14** An error that repeats every frame skips drawing and saving
  (`main.js:610-622`). Read. Suggests: a net each.
- **H-15** A stuck mole "bursts up beside you" from far off (D-857,
  `creatureturn.js:252`). The owner picks the words.
- **H-16** A fall can wake the hero inside a workbench set on the
  journey's first tile (`waking.js:16`, D-737). Ran.
- **H-17** A draught drunk on the turn of a fall still works after
  waking (`bagturn.js:149-151`, D-791). Ran.
- **H-20** "Healing herb" on cards, "Herb" in lines (`lines.js:331`).
  The owner picks the name.

#### 7. Save safety
- **H-21** One unreadable profile slot blanks all three, then is
  saved over (`profile.js:57-63,112-116`); a newer version's journey
  is dropped unsaid (`save.js:98`). Read. Suggests: keep what reads,
  set the rest aside under another key.

#### 8. One docs-only step
- **H-25** `README.md` says "one room so far".
- **H-26** `GLOSSARY-2.md:12,14,17,34`: lampmoth, scorpion, mole and
  the ways, against D-534, D-729, D-726, D-857, D-858.
- **H-27** `CONTENT.md` ways lack pack and lurks; `CONTENT-4.md:20`
  lacks the centipede and spit grub; `CONTENT-3.md:35` the deeper
  waystones; `regions/starting-region.md:81` "a pond at home".
- **H-28** Quick Pour, Guard and Thrift (D-816 to D-818) are in no doc.
- **H-29** Finds' uses behind: `GLOSSARY-FINDS.md:22-24`,
  `CONTENT-FINDS.md:15,22,27`.
- **H-30** `GLOSSARY-CODE.md:73` Quests "later"; `GLOSSARY.md:48`
  Glints from goals too; no entry for hall, large room, dead end,
  cache; `SOUNDS.md:27,29` 52 for 51; `screens.js:140`'s boon words.
- Joined from the second pass (D-861): **H-62** `ART-DIRECTION-2.md`
  behind (the dungeon bricks built, D-229; cloaks, heads, lights);
  **H-63** glossary gaps (Settings words, Tough, the herb mimic's room,
  "Earn more from Feats."); **H-64** `GLOSSARY-FINDS.md:34-56,103`,
  `GLOSSARY-2.md:32`, `CONTENT-2.md:18`: marks' numbers (D-847), the
  minnow's pond (D-734); **H-65** `DEV-TOOLS.md`'s switch names.

## From `HEALTH-CHECK-2.md`, the rest (moved whole at 0.3.422, D-981)

### Health check steps, second pass

The 0.3.305 second health check (D-861) played, as a player would, on a
phone and a PC, what the first (`HEALTH-CHECK.md`, D-860) did not reach,
read `src/render/` and the game's words against the docs, and loaded old
saves of every format. The owner picked these findings to become steps,
numbered on from the first, never reused. They are done in
`HEALTH-CHECK-ORDER.md`'s order with the first list's (D-862), and work
the same way: one step at a time,
Claude checks the finding still holds, offers 2 or 3 fixes with a
recommendation, and builds only the owner's pick. "Suggests" is
Claude's recommendation, not a decision. The full report, with every
option: https://claude.ai/artifact/6pEthoRVefYZUSCYPbE17e

"Played" means reproduced in the browser; "ran" with the game's rules
in a script; "read" seen in the code only.

#### 1. Most players notice
All done: in `archive/HEALTH-CHECK-DONE.md` (D-868).

#### 2. Some players notice
- **H-36** The boon's mark is a 30 px tap on a phone, a miss walks the
  hero (`marks.js:15,47-52`, D-604). Suggests: a pad around each mark.
- **H-39** How to play never names the bag (I) or map (M) keys or
  buttons (`howto.js`, D-193 came first). Suggests: a row for each.
- **H-40** Names capitalised two ways ("Oil flask", "Stone Pick";
  "Cave spider", "Spider Silk"). The owner picks one rule, with H-20.

#### 3. Few players notice
- **H-41** Kind Herbs: "Whatever heals you heals 1 heart more", but the
  Mending Draught, bed, fire and bedroll give no more (`boons.js:25`,
  `mending.js:25`, D-599, D-794). Ran. The owner picks words or rule.
- **H-42** The Peddler's dim SELL on an empty slot moves the frame; a
  second press sells (`cardscreens.js:181`, D-494). Played. Suggests:
  a press that sells nothing leaves the frame.
- **H-43** "1 turns left." on every mark's last turn (`lines.js:236`
  and on). Played.
- **H-45** The Bestiary's lure wisp "always" drifts to a creature
  (D-649); the bone rat "Beaten" as a pile (D-731). Read.
- **H-46** The warden's page: "Beat 2 more…", one warden a journey
  (D-632, D-691). Played. Suggests: one-of-a-kind guards at 1.
- **H-47** Settings' "Run ends" (`settings.js:116`); the game says
  journey (`GLOSSARY.md:9-10`). Suggests: "Journey ends".

#### 4. One art step
The owner picks from a picture.
- **H-51** The quick slot's flask at 1.5× and the round map at about
  1.9× (`quickslot.js:17`, `mapbutton.js:23`), against whole zooms.
- **H-52** The version number in the browser's font (`index.html:45-48`,
  D-031).
- **H-53** Four dim greys and two brights for one job each (`journal.js`,
  `cloak.js`, `map.js`, `menu.js` and more).
- **H-54** Smooth shapes and gradients (`kindle.js:28-31`, `cloak.js`,
  `hud.js:120-125`) against "No anti-aliased shapes".
- **H-60** Near-miss colours and two sets of wood browns (D-314).
- **H-61** 86 colours written only in the code (`woods.js`, `water.js`).

#### 5. Rare
- **H-55** Nine or ten marks slide under the round map on a phone; the
  tenth can't be tapped. Played. Suggests: wrap to a second row.
- **H-56** Sitting by a fire on the turn of a fall leaves the hero
  Warmed (`fireside.js:33`, D-845). Ran. Suggests: fix with H-17.
- **H-57** An old save (formats 9 to 17) saved while the freed Peddler
  waited loses him: the old steps call today's `goHome`, then `regrove`
  or `renew` remake that room without him (D-496, D-855). Played and
  ran. Suggests: a new upgrade step sends him home.
- **H-58** The Peddler's home spot ignores the hero and creatures
  (`homeward.js:64`). Ran.
- **H-59** Bumping the freed Peddler at once makes him leave sooner
  (`rescue.js:50`; the notes say "stays a little longer"). Played.

#### 6. The dev tools, one step
Added later, the owner's pick (D-862).
- **H-38** On a PC, Space presses the last clicked dev button again:
  the wrench (`dev.js:81`) and the panel's buttons keep the focus
  (`input.js:42`). Played. Suggests: they let go after a click.
- **H-48** Dev Spawn's Peddler does nothing (`spawn.js:37`);
  `DEV-TOOLS.md` says any registry entry, NPCs too (D-006). Played.
  Suggests: Spawn puts a person on a free floor tile.
- **H-49** Dev Spawn's Glow Lamp goes only on walls (D-478 sets it on
  floor); six pictures named "Campfire", four "Garden Bed", four
  "Waystone". Played. Suggests: the floor rule, names with their state.
- **H-50** Dev panel: Room's GARDEN Grow is cut off under the sheet's
  edge (`dev.js:62`, D-623). Played. Suggests: Grow on the TIME row.

#### Not picked, kept in the report only
None now: H-38 and H-48 to H-50 became step 6 (D-862).
H-62 to H-65 joined `HEALTH-CHECK.md`'s docs step and H-66 its audit list.
