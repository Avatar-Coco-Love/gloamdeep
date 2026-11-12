# Health check steps, second pass

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

## 1. Most players notice
- **H-32 No boon after travelling home.** Arriving on the home plate by
  travel or a fall, the tap opens the travel card, never the boon card;
  D-583 offers one each time the hero sets out (`boon.js:54-56`,
  `main.js:283`). Played. Suggests: arriving opens the boon card.
- **H-33 A campfire's and the miners' camp's first words are hidden.**
  The text line isn't drawn over the ask card (`frame.js:409,424`);
  D-757, D-844, D-770 put them on the line. Played. Suggests: draw the
  line over the card when a bump opened it.
- **H-34 The Look card's tabs are 26 px tall on a phone** (`cloak.js:27`);
  D-513's 44 px. Played. Suggests: taller taps, same look.

## 2. Some players notice
- **H-35** The boon's words say "until you are home"; it ends at the
  cave mouth's room (D-753; `render/boons.js:12`, `boons.js:23`,
  `opening.js:12`). Ran. The owner approves the words.
- **H-36** The boon's mark is a 30 px tap on a phone, a miss walks the
  hero (`marks.js:15,47-52`, D-604). Suggests: a pad around each mark.
- **H-37** The Look card by keyboard: Up from RANDOM re-picks every
  cloak passed, losing the rolled one (`looks.js:154-158`,
  `profilescreens.js:73`, D-522). Played. Suggests: Up jumps to the tab.
- **H-39** How to play never names the bag (I) or map (M) keys or
  buttons (`howto.js`, D-193 came first). Suggests: a row for each.
- **H-40** Names capitalised two ways ("Oil flask", "Stone Pick";
  "Cave spider", "Spider Silk"). The owner picks one rule, with H-20.

## 3. Few players notice
- **H-41** Kind Herbs: "Whatever heals you heals 1 heart more", but the
  Mending Draught, bed, fire and bedroll give no more (`boons.js:25`,
  `mending.js:25`, D-599, D-794). Ran. The owner picks words or rule.
- **H-42** The Peddler's dim SELL on an empty slot moves the frame; a
  second press sells (`cardscreens.js:181`, D-494). Played. Suggests:
  a press that sells nothing leaves the frame.
- **H-43** "1 turns left." on every mark's last turn (`lines.js:236`
  and on). Played.
- **H-44** Skipping the boon card and stepping off and on draws three
  new boons (`boon.js:61`). Played. The owner rules if that's allowed.
- **H-45** The Bestiary's lure wisp "always" drifts to a creature
  (D-649); the bone rat "Beaten" as a pile (D-731). Read.
- **H-46** The warden's page: "Beat 2 more…", one warden a journey
  (D-632, D-691). Played. Suggests: one-of-a-kind guards at 1.
- **H-47** Settings' "Run ends" (`settings.js:116`); the game says
  journey (`GLOSSARY.md:9-10`). Suggests: "Journey ends".

## 4. One art step
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

## 5. Rare
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

## 6. The dev tools, one step
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

## Not picked, kept in the report only
None now: H-38 and H-48 to H-50 became step 6 (D-862).
H-62 to H-65 joined `HEALTH-CHECK.md`'s docs step and H-66 its audit list.
