# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`PR-CHECKLIST.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force: `archive/README.md`
says which file holds which IDs; grep there for an ID or topic.

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

**D-338 · 2026-10-25 · Audits lose nothing** (the owner's wish) Nothing
important, useful, educational or insightful is lost in a cleanup. Text is
moved word for word, never cut; only pointers, indexes and rules may be
reworded. Each audit compares every removed line with the whole repo and
lists, in its PR, each line not found word for word, with why.

**D-363 · 2026-10-25 · A content index and an adding checklist** (the
owner's picks, both recommended) `docs/CONTENT.md` lists every creature,
find, tile, light and place with its numbers, where it turns up and its
decisions, so proposals build on what exists. `TECH.md`'s "Adding content"
lists the files each kind of content touches. A PR that adds or changes
content updates both.

**D-431 · 2026-10-29 · How we work: one step a conversation** (the owner's
pick, recommended) The owner keeps choosing every question. Each
conversation does one step, ends with its handoff, and the next step
starts in a fresh conversation, so less is read again each time.

**D-518 · 2026-10-31 · An audit every 40 versions** (the owner's pick,
recommended; supersedes D-337's 20) The owner asked if audits help. The
start-of-conversation read stays near 11.5 KB (17 KB before the first),
but the size test already makes normal steps trim, and code splits are
outgrown in an audit or two, while 20 versions is about a day. So an
audit comes every 40 versions; the size test still guards in between.

**D-732 · 2026-11-09 · A playbook of how we work** (the owner's picks,
all recommended) The owner wants this project's way of working kept for
future projects. `docs/WORKFLOW.md` gathers it in one place: the steps
of a step, each habit and why, what changed along the way, and how to
start a new project. Each audit adds what that stretch taught us about
working together. Built now as its own step, nothing visible changed.

**D-741 · 2026-11-09 · The playbook caught up, and kept up** (the owner's
picks, all recommended; builds D-732) The owner asked that the playbook
hold everything done so far and grow as we go. Four parts are added:
how the game grew (stages, a playtest setting each plan, groundwork
first, only what works shows), our tools, lessons from bugs and design
habits. They go in a new `docs/WORKFLOW-2.md`, so `WORKFLOW.md` stays
under its cap. When a step teaches something about working together,
its PR adds one line to `WORKFLOW.md`'s "Since the last audit"
(`PR-CHECKLIST.md` reminds), and each audit moves the lines into place.
Nothing visible changed.

**D-790 · 2026-11-10 · Copyable next prompts** (the owner's request)
Each PR's handoff ends, before merging, with a few short prompts the
owner can copy to pick the next direction, one per choice, or a single
one when there is only one way on (`PR-CHECKLIST.md`). When they are
given changed by D-795 (2026-11-10): once, after the merge.

**D-799 · 2026-11-10 · The finds plan** (the owner's picks, all
recommended, from a plan page: https://claude.ai/artifact/GnPo6RnybF7g6ogTdiET6y;
narrows Q-061 and Q-093) Each find kept for crafts later gets one first
use, with more uses free to come later: Crab Shell, the Shell Vest
(D-801); Grub Skin, a Spitproof Draught; Bunny Fur, a Fur Bedroll for
sleeping out; Bat Wing, an Echo Charm showing creatures in the dark
near by; Lurker Claw, a Shade Draught, creatures noticing the hero only
near; Rat Bone, a Bone Hook for the rod; Glow Gland, a Glow Lamp, a
longer torch; Bat Fang, a Fang Charm, a heart back now and then from a
beaten creature; Mole Claw, the Mole Claw Pick. With later steps: Oil
Bladder, the lantern's first tank; Gloam Eye, its first glass, showing
creatures in disguise; Stinger, a Stinger Spear poisoning creatures;
Venom Sac, a Venom Oil for weapons. Kept for later too: Bunny Fur, a
warm lining; Bat Wing, arrows' fletching; Stinger, arrowheads; Rat Bone,
a Bone Club; claw weapons. They are built one a step, in that order,
each one's numbers settled at its step (the plan's are drafts). The
owner's wish for weapons (Q-094): a switch to show creatures' coming
attacks and one to show the hero's. Others offered: two or three a PR;
a waterskin, a Bat Wing torch, a Sting Salve, Bone Meal, a Tick Charm,
an Eye Charm, a Wayglow, a Mole Charm, a long Ward.

**D-826 · 2026-11-11 · The fourteenth audit** (the owner's picks, all
recommended, and the near-full docs split too) At 0.3.272, nothing
visible changed. A conversation's start reads 10.5 KB, not 10.8:
"Waiting on the owner" lists the later questions on one line. The
in-game history's 0.3.201 to 0.3.250 go to `src/core/history-0.3-4.js`
(39 KB to 13 and 27). The draughts and rare materials go to a new
`CONTENT-FINDS-2.md`, and the places' sounds, "Maybe" and "Later" to
`SOUNDS-2.md`. D-782 and D-783 move to `archive/DECISIONS-AUDITS.md`,
D-822 to D-825 to `archive/DECISIONS-SOUNDS.md`; the playbook's lines
since the last audit go to a new `WORKFLOW-4.md`; all word for word.
A bug hunt reads the code since 0.3.233; its findings come to the owner
as a list to pick from, each fix its own step. The next audit is at
0.3.312.

**D-827 · 2026-11-11 · The audit's bug fixes** (the owner's picks, all
five and the Tab tick, in one PR, each with a test checked against the
old code first) At 0.3.273: a herb's card draws the mortar's line
beside EAT; MAKE with a full bag says "Your bag is full." unless one is
carried; a creature that never bites and isn't chasing doesn't stop
sleeping out; a tool's hold is silent, its event marked `tool`; the
mortar's notes say it lists six; Tab on Settings ticks as a tap does.

**D-828 · 2026-11-11 · Home's sounds** (the owner's picks, all
recommended, from a board of 4, 4, 4 and 3; answers part of Q-095) An
item sold to the peddler jingles: RPG Audio's handleCoins at a quarter
loudness, in place of the tick (offered too: the short clink; the two
taking turns; a pouch, then coins). A relic set on the shelf is a book
set on wood: RPG Audio's bookPlace 1 to 3 at a quarter (offered too: a
light wooden knock; a plank; the workbench's thunk, softer). A seed
planted is two quick burrow steps, 0.13 s apart, the second softer
(offered too: a soft thud; snow pressed; a leather bag set down). Bat
Guano fed is the bag's cloth pat, muffled like the burrows' earth
(offered too: a small soft thud; a carpet step). Each plays as its
page closes, follows Finds' loudness and has its own line under Finds:
Coins, Shelf, Planting, Feeding.

**D-829 · 2026-11-11 · The elemental pack** (the owner's purchase and
picks, all recommended; for Q-095) MorphonautAudio's Elemental Forces
Sound Pack, bought by the owner on itch.io, is kept whole in
`sounds/packs/morphonaut-elemental-forces/`: 134 sounds in four folders,
`Earth`, `Fire`, `Water` and `Wind`, under the pack's own names. Its
listing says CC0, so it may sit in the public repo; its `License.txt`
says where it came from. Saved from the pack's 24-bit WAVs (113 MB) as
`.ogg`, good quality, stereo (6 MB), nothing else changed; little
silence to cut. Nothing in the game plays from it yet: the next sound
steps pick from it, for fire, oil, water, wind and falls.

**D-830 · 2026-11-11 · The lantern and the light's sounds** (the owner's
picks, all recommended, from a board of 4, 4, 4 and 4; answers part of
Q-095) The first sounds from the elemental pack (D-829). A flask poured,
by hand or by itself, is seven quick glugs: Water-027 at 0.47 (offered
too: three glugs, higher; two big gloops; a steady bubbling pour); a
minnow poured stays silent. The oil running out, as "The lantern gutters
to an ember." shows, is a crackle that slows and fades: Fire-017's first
1.3 s, fading over its last second, its pitch sliding to 0.7, at 0.22
(offered too: a small puff; the crackle, then the puff; a soft falling
whoosh). A torch lit is a quick whoosh: Fire-030 from 0.1 s, 1.2 s of
it, fading over 0.5 s, at 0.24 (offered too: a deep whoomp; a fuller
burst; a softer rising whoosh). Cold ashes lit into a campfire catch and
burn: Fire-021 from 0.18 s, 2.4 s of it, fading over 0.9 s, at 0.27
(offered too: a sharper catch; the torch's whoosh, then a crackle; a
bright flare). Each follows Steps' loudness, with the lantern, and has
its own line under Steps: Flask poured, Oil runs out, Torch lit,
Campfire lit.

**D-831 · 2026-11-11 · The fight's rest's sounds** (the owner's picks
from a board of 4, 4, 4 and 4, then 4 new for poison; answers part of
Q-095) A stiff swing that misses (D-759) is a short puff of air: the
elemental pack's Wind-012 to 014 at 0.55 (offered too, and recommended:
a quick whoosh; an airier swish; a sleeve's cloth). The hero hurt by a
bite or a glob that takes a heart is a dull blow: Impact Sounds'
impactPunch_heavy, a tenth lower, muffled above 900 Hz, at 0.32, a
quarter second after the hero's swing, hit or missed (offered too: a
leather thump; the blow with a low wince; a low bong). No pack has a
voice, so it is not a gasp. Poison taking a heart is a deep throb,
twice: the same punch at 0.6 then 0.57 pitch, muffled above 400 Hz, at
0.36 then 0.26, 0.35 s apart (the first four, gloops, heartbeats and a
hum, didn't fit; offered too: a queasy swell, recommended; slow sick
bubbles; the blow, then a gloop). A level reached is three glass notes
rising: impactGlass_light 000 to 002 at 1, 1.26 and 1.5, 0.11 s apart,
at 0.2 falling to 0.16, 0.55 s after the turn's sounds, so after the
beaten thud (offered too: a smooth rising tone; a shorter one; an ember
flaring). Each follows Fighting's loudness and has its own line under
Fighting: Stiff miss, Hurt, Poison, Level.

**D-832 · 2026-11-11 · The creatures' bites** (the owner's picks, all
recommended, from a board of 3 for each of ten; answers part of Q-095)
Each kind's bite, a quarter second after the hero's swing as the hurt
blow is: a rat's (a centipede's and an oil tick's too) a quick double
nip; a flask mimic's a glass clink, then a snap; a scorpion's two dry
clicks, then a stab; a cave spider's a soft hiss, then a click; a bat's
two high chirps, then a flap; a mole's three quick sniffs, then a
scrape; a snapcap's a wet squelch, then a snap; a herb mimic's a rustle
of leaves, then teeth; a bone rat's a quick clatter of bones; an oil
tick drinking, a wet slurp, then a gulp. Files and loudness in
`SOUNDS-2.md`. All ten share one line under Fighting, Bites, so the list
fits the smallest card (offered too: two columns; a fifth kind,
Creatures). The gloamling, lampmoth and warden stay silent; their own
board comes later.
