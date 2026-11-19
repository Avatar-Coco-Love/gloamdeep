# Area 7: Toward publishing
This area looked at the store checklist, saves, offline play, speed, accessibility and what version 1.0 needs.

## Now
- **7.01 Save export to a code** · builds on D-238, D-590 · A button in the menu that turns the save into a short text code you can copy, so a phone's journey can be kept safe or moved. Nothing is sent anywhere. One small step.
- **7.02 Save import from a code** · builds on D-238, D-266 · A second button that reads such a code back, upgrades an old save through the usual steps, and asks before it replaces the journey you have now.
- **7.03 A real manifest file** · builds on D-590, D-375 · Move the home-screen details into a proper manifest file with the drawn icons, so the game installs the same way on every phone. Invisible to play.
- **7.04 Ask the phone to keep the save** · builds on D-590 · Call the browser's "keep this data" request (`storage.persist()`) once, quietly, so a phone short on room does not wipe a journey. Shown only as a short note in the options.

## Next
- **7.05 Offline play** · builds on D-590 · A small service worker keeps the game's files on the phone so it opens in a cave with no signal. The version number decides when old files are swapped, so nobody plays a stale copy.
- **7.06 Android back button** · builds on D-590 · On Android, the back button opens the game's menu (and closes a card first) instead of leaving the game. Needed before Play lets the game in, and easy to test on a real phone.
- **7.07 Safe-area and rotation check** · builds on D-505, D-590 · Check notches, rounded corners and turning the phone on a few real screens, so no button hides under a camera. Fix only what is found.
- **7.08 Speed check each chapter** · builds on D-430, D-995 · When a chapter's floors arrive, run the speed tool on its busiest room and note the frames a second, so a new biome never sneaks the game below the budget.

## Toward publishing
- **7.09 Only ship the sounds that play** · builds on D-773, D-590 · Pack only the sound files the game really plays (about 117 of the pack's files) into the store build, so the app stays small. The game's own folder stays as it is.
- **7.10 Older-iPhone sound test** · builds on D-868 · Every sound is an `.ogg` file, which some old iPhones cannot play. Test on one real older iPhone; if it is silent, the game must say so and still work.
- **7.11 Privacy page and Data safety answers** · builds on D-992, D-590 · One plain page saying what the game keeps (saves on your device, and play notes only if you opt in) and the store form answers that follow from it: no ads, no tracking.
- **7.12 Store pictures from the game itself** · builds on D-425, D-590 · Draw the 512 px icon, the wide 1024 by 500 picture and the screenshots with the game's own code, like the share card, so they match the game and need no outside art.
- **7.13 Reading and seeing options** · new: needs the owner's OK · A small options group: bigger words, a stronger-contrast look for the dark, and a quiet-screen choice that builds on reduced motion. Each is one step; the owner picks which.
- **7.14 Testers' notes and the closed test** · builds on D-590, D-992 · Plan the 12 testers for 14 days: how they get the build, the opt-in play notes, and a one-page list of what to watch. Allow about three weeks before launch.
- **7.15 The 1.0 checklist** · new: needs the owner's OK · One short list of what 1.0 must have: four chapters, the First Light reached, saves safe, offline, store ready, a clean test run. The owner decides which items are truly required.
- **7.16 Paid or free with an unlock** · wild · builds on D-590 · Decide before launch: a one-off price up to $5, or free with an unlock after chapter 1. A free game can never turn paid later, so this is a game-direction choice.

## Someday
- **7.17 Gamepad play** · builds on D-590 · Let a pad walk, pick and open menus, which also opens the door to a Steam build. Needs nothing that works only by hover.
- **7.18 A Steam wrapper** · wild · builds on D-590 · A desktop wrapper for Steam and the Steam Deck, reading the same game folder, if Play goes well.
