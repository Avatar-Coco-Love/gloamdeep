# More creatures, the flask mimic and the scorpion (D-364 to D-374)

Moved unchanged from `docs/DECISIONS.md` at 0.2.129 (D-379), when it
passed 12 KB: more creatures next, the flask mimic, the scorpion,
experience from creatures, creature materials and how creatures vary.
D-534, mixed creatures, joined at 0.3.9 (D-540).
These are still in force unless marked superseded. Grep for an ID or
topic; never read this whole.

---

**D-364 · 2026-10-25 · More creatures next** (the owner's pick,
recommended) After the audit, the next content is more creatures for the
region we have, built on the creatures' ways and the creature list. Each
is designed with the owner before it is built.

**D-365 · 2026-10-25 · Six creature ideas, the flask mimic picked** (the
owner's pick, with their girlfriend; not the recommended Snapcap) A
mock-up showed six creatures built only from the ways creatures have:
Snapcap, Mole, Bat, Scorpion, Cave spider and Flask mimic. The flask
mimic comes first; the other five are kept in `RESEARCH.md`.

**D-366 · 2026-10-25 · The flask mimic** (the owner's picks: the name
Flask mimic over the recommended Mimic, about 1 room in 4 over the
recommended 1 room a floor, and the recommended no reward) An oil flask
with pink eyes and teeth: 3 hearts and a bite of 1 (changed after the
owner's look: no ways, never moving → asleep in disguise, then chasing,
D-368). On depths 3 to 5,
each generated room has a 1 in 4 chance, from the seed, of one as well as
all the room holds. It stands where a flask could lie: at least 5 steps
from the way in, not beside the stairs or an opening, and never cutting
the room in two. Beating it gives the usual XP only; things left behind
are Q-061. Its lines: "The flask mimic cracks and falls still." and "The
flask mimic bites you."

**D-367 · 2026-10-25 · A bite of glass** (the owner's pick, not the
recommended silence) The flask mimic's bite is a bright ringing clink
with a faint high ping, then one dry snap of the rat's teeth. It is on
the sound board.

**D-368 · 2026-10-25 · The flask mimic sleeps in disguise** (the owner's
idea; fully hidden and the name Flask mimic recommended, giving up and a
silent wake not; answers Q-062) Asleep, it is drawn just like an oil flask,
is left off the creature list, the next-move arrows and framing, and does
nothing. A bump wakes it, with no harm, no flash and no sound, and passes a
turn in which it only stirs, so the hero can run. Awake, it shows its own
look and chases (the Chases way) for 6 turns, then settles back down asleep
where it stands; leaving the room settles it too. Its lines: "The flask
opens its eyes!" and "The flask mimic settles down."

**D-369 · 2026-10-25 · The flask mimic's hurt line, and no freeze
without one** (the owner's picks, both recommended but the line, which
was one of three) Hurt, the flask mimic says "The flask mimic cracks."
A line a creature doesn't have is never said, so the line already
showing stays, and a line that isn't there, as an old save may hold,
shows nothing. A test checks that every line a creature names exists.

**D-370 · 2026-10-26 · The scorpion** (the owner's picks, all recommended;
one of the five kept by D-365) Seen from above, as the lampmoth is: two
big pincers, eight legs, a striped body with the pink hostile eyes, and
the tail curled to one side with a pale sting (changed after the owner's
look: amber-brown and side on → from above, in its colour set, D-373;
[mock-up](https://claude.ai/artifact/5C8yz3Cu5SkVAvGjE8jkFr)).
1 heart and a bite of 2, the first creature to bite that hard; it chases
(the Chases way), so one hit of anything kills it. On each floor of
depths 3 and 4, one room the seed picks, never the lampmoth's, holds a
scorpion in place of its rat. *Where and how many superseded by D-534 (2026-11-01).* Its lines: "The scorpion stings you." and
"The scorpion curls up and falls still." Its sting is its own sound, a
dry double click of claws, then a short sharp stab; it is on the sound
board.

**D-371 · 2026-10-26 · Experience from creatures: hearts and bite** (the
owner's pick, recommended; supersedes D-245 in part) A creature beaten
gives its hearts and its bite added together: a lampmoth 2, a rat 3, a
gloamling 3, a flask mimic 4, a scorpion 3. A new creature follows the
rule by itself. A new room still gives 1, and levels cost the same.

**D-372 · 2026-10-26 · Creature materials, later** (the owner's picks;
narrows Q-061) Beaten creatures will one day leave materials of their
own, to make new things with, each creature with its own chance from the
seed. Not built yet: the names, looks, chances and recipes are Q-061.

**D-373 · 2026-10-26 · A creature's colour sets** (the owner's idea and
picks, all recommended) One drawing, worn in one of a small set of colours
made for that creature. Each one a room lays out picks its set from the
seed and its tile, like a mushroom's tone (D-305), so the same world shows
the same colours. The scorpion's five: Sand, Rust, Coal, Olive and Bone,
never the oil's amber. One the dev tools place wears the first, Sand.

**D-374 · 2026-10-26 · Each creature varies its own way** (the owner's
answer) Whether a creature varies, and how, is decided creature by
creature: colours, or its shape itself. Ideas kept in `RESEARCH.md`.

**D-534 · 2026-11-01 · Mixed creatures, more of them** (the owner's
picks, from a playtester's note that one kind a floor felt empty and
easy; supersedes where and how many in D-231, D-244, D-356, D-370) Each
generated room holds 2 creatures at depth 2, 3 at depths 3 and 4, and
4 from depth 5; the rooms are big, and it can be pulled back if too
hard. Each depth has a pool: the rat and lampmoth from depth 2, the
scorpion from 3, the gloamling from 5, and none stops lower down. The
rat by the flask stays a rat for now (a chance of no guard is Q-075);
the others are picked from the pool by the seed, and every room holds
at least two kinds. The flask mimic stays as it was (D-366). New kinds
and stronger creatures come later, each its own step. D-531 and D-532
moved to `archive/DECISIONS-GLOAMBERRY.md`, word for word.
