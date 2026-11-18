# How we work, 5: what the fifteenth audit added

`WORKFLOW-4.md` continued (D-868), so that page stays under its cap. Each
audit adds what its stretch taught us about working together (D-518,
D-741). The rules in force are in `CLAUDE.md` and `PR-CHECKLIST.md`.

## What the fifteenth audit added (0.3.273 to 0.3.313)

The lines each step added to `WORKFLOW.md`'s "Since the last audit",
word for word, sorted (D-741), then what the stretch as a whole taught
(D-868).

**Finding sounds.**

- A bought pack goes in the public repo whole only once its licence allows sharing; check the listing's licence first and say where it came from in its `License.txt` (0.3.275).
- Music packs are too big for the chat or a repo folder (25 MB a file by browser); a temporary GitHub release takes them and this session can download it. Track names said nothing, so 139 were measured (busy, dark, loud, long) down to 8 for a board with each way to play them (0.3.283).
- A place's music board gets the tune already playing elsewhere as a row to compare, the place's own sounds playing along (the drips), and a "walk down the stairs" with the real fades; the zips stay on the temporary release, so the next place's board needs no new upload (0.3.284).
- Match a tune's loudness by the ear's measure (ffmpeg's ebur128): gain = 0.4 × 10^((−15.8 − its loudness) / 20) gives every tune so far (0.3.286).
- Count note starts (numpy) to find still tracks, not loudness (0.3.287).

**Letting the owner hear before picking.**

- When none of a moment's 4 fit, offer 4 new ones of other kinds on the same board, keeping the moments already picked marked (0.3.277).
- Ten moments on one board, 3 each with "Alone" and "In a fight" buttons, were picked in three rounds of questions; check that Settings' lists still fit the smallest card before adding a line per sound (0.3.278).
- When the owner hands over a batch of picks, many moments with no event of their own can still be heard by comparing the state before and after a turn (a creature under the earth, a line said), with no change to the rules; grouped Settings lines keep the lists on the smallest card (0.3.279).
- A new sound that must not be mistaken for an old one goes on the board beside it, with "after" buttons for each moment it follows (the bite's blow, poison's throb), so the owner hears the pair as the game plays it (0.3.281).
- A sound that plays on its own over time gets a "walk" on its board, the steps with it at each pace offered, so the owner hears how often as well as what; and check Settings' list fits before promising a line, since the text-fit test can say no after the pick (0.3.282).

**Checking the moment in the code first.**

- Picking sounds by their measured shape and spectrogram works when the names say nothing, but check in the code what the moment really does before writing an "In play" button: the oil running out dims the lantern, it doesn't click it off (0.3.276).
- Before picking when a new sound plays, grep the lines and events for that moment: the oil already had "The flame is getting low." at 20%, so the owner chose to tie the sound to it rather than add a second warning (0.3.280).
- Check what a place really is in the code before its board: the crypt was two parts (two top rooms counted as the surface, and floor 1), so the board's walk let the owner hear both ways and the question asked where it starts (0.3.285).

**Testing.**

- A string has `.at` (a built-in method), so `x?.at` can't tell a station's { into, at } from an id; test a field only objects have (`into`), and run the full suite, not just the new test (0.3.273).

**What the stretch taught.**

- **Sounds are picked by ear, on a board.** Every sound and tune this
  stretch came from a board the owner played: the moment as the game
  plays it, its neighbours beside it, and a walk for sounds that come
  over time. Measuring the files (loudness, note starts) narrowed
  hundreds of tracks to a few worth hearing.
- **Look at the code's moment before naming it.** The oil's sound, the
  crypt's two parts and the low-oil warning were each checked in the
  code first, so the board asked the right question.
- **A health check finds what steps miss.** Two health checks (D-860,
  D-861) played and read the whole game; their findings became steps
  in one order (D-862), and the audit took the ones nobody sees.
- **Fewer lines kept.** From 0.3.288 on, no step added a line here,
  though the health check's steps had lessons of their own.
