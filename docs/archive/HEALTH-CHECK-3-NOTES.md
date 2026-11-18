# Health check 3: working notes (D-975)

The third health check, at 0.3.420, run hands-off: no game code changed,
findings only. Each area is looked at by a helper agent (Sonnet), then
each finding is checked by another (Opus) before it is kept. This file is
saved and pushed as each area is done, so a new conversation can carry
on from the checklist. Grep only; the kept findings go to
`docs/HEALTH-CHECK-3.md` at the end.

Finding IDs: H-68 on (H-01 to H-67 are the first two checks', never
reused); while working, each area numbers its own (A-1, B-1...).

## Checklist
- [x] 0. Set up: this file, baseline `npm test` 2050 of 2050 pass, 72 s.
- [ ] A. A conversation's start: what it reads, and how that grows.
- [ ] B. A PR's overhead: the checklist, release, history, conflicts.
- [ ] C. The code's shape: big files, boot, duplication, the rules.
- [ ] D. Tests and tools: speed, noise, what's slow or doubled.
- [ ] E. The Lampeater's fight (0.3.381 to 0.3.420).
- [ ] F. Leap, the crumbling floor, gaps, the archway, the seal hall.
- [ ] G. The Warden's Fist, vaults, the rune wall, shovel, doorways, flyers.
- [ ] H. Played as a player, on a phone and a PC, the screens since 0.3.329.
- [ ] I. Saves and speed: old saves, save size, frame time, boot.
- [ ] J. The docs against the code since 0.3.329.
- [ ] K. Every finding checked (Opus); IDs H-68 on given.
- [ ] L. `HEALTH-CHECK-3.md`, the report page, the questions, one PR.

Not done, and why:
- The every-3-hours check-in (D-975) could not be made: the session's
  permission check refused creating a scheduled task. This checklist,
  pushed after each area, is what a new conversation carries on from.

## Findings as found, then as checked
