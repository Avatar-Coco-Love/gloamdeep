# Relics from the old city (D-689 to D-694)

Moved word for word from `docs/DECISIONS.md` at 0.3.152, the eleventh
audit (D-699), so it stays under 12 KB: step 20, the relics, the shelf,
the Lightkeeper's Locket, its warden, its look and glow, set on the
shelf and what it does there, all built. Still in force.

---

**D-689 · 2026-11-08 · Relics from the old city** (the owner's picks,
all recommended; step 20 of D-482, builds D-465, D-469, D-633) Relics
are things left from Underhearth and the Lightkeepers, found, never
made, each with a line or two of story. Their boosts help the hero set
out (*e.g.* a find in the bag at a trip's start) or soften a fall (*e.g.*
one more find kept). They lie in hidden spots (the end of a hidden path,
a sealed old-city room) and in guarded rooms. The shelf holds every
relic found, each working once set there. The shelf comes first, built
at the workbench and set down at home, empty; biome 1's first relic,
next, keeps one find on a fall that would otherwise be lost. Each
relic's name, look, story line and place, and the shelf's recipe and
look, are proposed at their own steps. D-676 and D-677 moved to
`archive/DECISIONS-AUDITS.md`, word for word.

**D-690 · 2026-11-08 · The shelf** (the owner's picks, all recommended;
builds D-689) Look A, a tall wooden case in the trunk's browns, two
empty shelves. Made at the workbench from 4 Wood and 2 Stone, its last
slot (the panel still shows 12 at most, as only one bag upgrade shows
at a time); one carried; set down on the surface the bed's way.
Bumped, day or night, it asks "Deconstruct shelf?", "Nothing on it
yet.", No picked, as the bed by day; Yes puts it back in the bag.
Claude's drafts the owner may change: its lines and the tile's id,
`relicShelf`. D-678 moved to `archive/DECISIONS-AUDITS.md`, word for
word.

**D-691 · 2026-11-08 · The Lightkeeper's Locket** (the owner's picks,
all recommended; builds D-689, D-690) Biome 1's first relic is the
Lightkeeper's Locket, look A: a tarnished brass oval on a thin chain, a
tiny flame scratched on its face. Its story line: "Kept close, whatever
the dark took." (the owner picked "A Lightkeeper kept one thing close,
whatever the dark took.", too wide for the line strip). One per world
lies in a room at depth 4 the seed picks, never the stairs' room, on its
farthest free tile with a rat beside it guarding it, left once. Set on
the shelf, a Normal fall brings home the bag's stack the peddler would
pay most for. Three steps: found and carried (0.3.143), set on the
shelf, then the fall. Claude's drafts the owner may change: its lines,
the rat, the id `locket`. D-679 and D-680 moved to
`archive/DECISIONS-AUDITS.md`, word for word. Its rat and its look
superseded by D-692 (2026-11-08).

**D-692 · 2026-11-08 · The warden and the relics' look** (the owner's
ask and picks; supersedes D-691's rat and look) The locket's guard is a
new creature, the old-city warden, made by Underhearth's people to guard
their things: look A4 of six stone takes, an old cracked stone guard,
mossy, a chipped gold band, its eye slit violet. It stands asleep as a
statue, eyes dull, until bumped, then chases for 6 turns and stands still
again, the flask mimic's way; 4 health, a bite of 1 (recommended). Not
in the pool, no drop yet. Relics get their own glow, a violet halo with
a slow shimmer, and the locket look D: open, violet and gold, a flame
inside (all recommended). The warden first (0.3.144), then the look.
Claude's drafts the owner may change: its lines, the name Warden.
Mock-ups: https://claude.ai/artifact/SHECVsemXBRvSVV36HZtnK
D-681 and D-682 moved to `archive/DECISIONS-AUDITS.md`, word for word.

Its waking and settling changed in part by D-937 (2026-11-15): once cracked it never stands still again.

**D-693 · 2026-11-08 · The locket set on the shelf** (the owner's picks,
all recommended; builds D-689 to D-692) Bumped with the locket in the
bag, the shelf asks "Set the locket on the shelf?", "Kept close,
whatever the dark took.", No picked; Yes sets it there in a turn, "You
set the locket on the shelf." It stays: it never comes back off.
Bumped then, it asks "Deconstruct shelf?", "The locket rests here.";
Yes puts the shelf and the locket back in the bag together, or, with
no room for both, "Your bag is full." and both stay. The shelf shows
the locket small on its top shelf, open, with the relics' violet glow
and glint, look A of three. What it does there comes next. Claude's
drafts the owner may change: the tile's id, `locketShelf`.
Mock-ups: https://claude.ai/artifact/Fmovh4KgJNiBPcNY2YttmJ
D-683 and D-684 moved to `archive/DECISIONS-AUDITS.md`, word for word.

**D-694 · 2026-11-08 · What the locket does on the shelf** (the owner's
picks, all recommended; builds D-691, D-693) With the locket on a shelf
anywhere in the world, a Normal fall brings home the bag's stack worth
most to the peddler in all (his price × how many: 3 Venom Sacs beat 1
Mimic Heart); a tie goes to the stack first in the bag; with nothing he
buys, nothing is kept. The rest is left where the hero fell; a bag
holding only the kept stack is not left. The wake line names it: "The
locket kept Venom Sac ×3." (the owner picked it after the fall line;
both don't fit the strip, so it says it in the fall line's place).
Claude's drafts the owner may change: its words. D-685 moved to
`archive/DECISIONS-AUDITS.md`, word for word.

**D-717 · 2026-11-09 · The relic's softer glow, and what comes next**
(the owner's ask and picks, all recommended; changes D-692's halo) The
relic's violet glow sat 2 pixels below the locket and 1 to its left, and
was too bright, 31 pixels across. Look A of three: centred on the
locket's case, 21 pixels across, its violets dimmer; on the shelf the
same smaller, dimmer glow round the small locket. The glint, the slow
swell and the steady glow with reduced motion stay. Next, every flyer
(the bat, the lampmoth, the lure wisp) may fly over water, all
recommended; then the audit's fixes and more Feats.
Mock-up: the picture in the conversation, now / A / B.

**D-718 · 2026-11-09 · Flyers over water** (the owner's picks, all
recommended; builds D-717) The bat, the lampmoth and the lure wisp (the
registry's `flies`) may fly over water, a cave pool or the home pond; no
other creature may. Walking into a flyer over water strikes it as on the
floor, rod held or not; with none there the water acts as before. One
beaten there leaves its drop on the nearest dry tile, as drops already
lie. A spit grub's glob already flies over water and hits a flyer there.
Next, the owner orders the audit's other fixes (B2, B3, B4, Q1).

**D-937 · 2026-11-15 · A harder Warden** (the owner's ask and picks,
[mock-ups](https://claude.ai/artifact/3P1t5ADXs6NW8BewfKZVtX); supersedes
in part D-692, D-886 and its Bestiary tip) Every blow and hurt rings off
the warden's stone, "Your blow rings off the stone.", with no flash, until
its slam misses: "The warden's fists sink into the floor!" Then it is open
till it next acts, so the hero steps back beside it and strikes once
(offered too: open 2 turns; open after every slam). Stone skin: each blow
does 1 less, never below 1, so four openings beat it. A bump only wakes
it. Once cracked it never stands still again (offered too: the count
restarts each slam; awake till beaten). Its tip: "Your blows ring off its
stone. When its fists go up, step out of the way. When they sink into the
floor, step back beside it and strike before it pulls them free. Four
openings beat it." Two steps: these rules, then its look and sounds:
stuck take C (stooped, a jolt and chips), a grey spark, the clink
`impactMetal_light_000`, the thud A6 (the heavy punch slowed with an
earth rumble and its stone knock a touch lower). D-935 moves to
`archive/DECISIONS-CARDS-2.md`, word for word.

**D-938 · 2026-11-15 · The Warden's look and sounds** (D-937's step 2,
the owner's picks; [sound board](https://claude.ai/artifact/ThY4FkXmmTFKHnK6V3cC1a))
The light metal clink was already Making's, two taps at their own pitch,
so a blow that rings off the warden plays it once, a quarter lower (75%;
offered too: 85%, 65%, the medium metal, the light stone plate). Claude's
calls: the clink plays in the hit's place, with no punch; it and the thud
A6 go under Creatures in Settings; the thud plays as the fists sink,
with the line. The grey spark shows with reduced motion too; the jolt and
the chips don't. D-936 moves to `archive/DECISIONS-BAGS.md`, word for word.
