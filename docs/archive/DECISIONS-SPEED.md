# The faster light, the speed check, the light choices (D-429, D-430, D-432 to D-437)

Moved unchanged from `docs/DECISIONS.md` at 0.2.169 (D-432), when it
passed 12 KB: more reuse in the light with the same look, and the speed
check with its frame budget. These are still in force unless marked
superseded. Grep for an ID or topic; never read this whole.
D-432 to D-435, the half-size light and the light choices' names, moved
unchanged at 0.2.171 (D-436). D-436 and D-437, Half on hold and the
light's line, moved unchanged at 0.2.172 (D-438).

---

**D-429 · 2026-10-29 · More reuse in the light, the same look** (the
owner's pick, recommended; a step of D-294, D-295, answers part of Q-068)
The light keeps work that hasn't changed: which pixels show remembered
tiles' darkness is worked once per change of memory, not every frame; the
mix of four cells at a shadow's edge comes from a table of its 256
answers; and a pixel that ends up black is written as 0. Every pixel is
the same as before, checked on 3,456 pictures. On a simulated slow phone
the light takes about 16.5 ms a frame instead of 20.3, about 45 frames a
second instead of 37. Built in 0.2.168.

**D-430 · 2026-10-29 · A speed check and a frame budget** (the owner's
picks, both recommended) `tools/perf.js` times play on a simulated slow
phone (the processor 4 times slower, seed 4127) and prints frames a second
and the milliseconds a frame spends in all and in the light. The frame
budget in `docs/TECH.md`: 16.7 ms a frame in all, the light at most 8 ms.
A PR that changes drawing runs it before and after and gives both in the
PR. Built in 0.2.168.

**D-432 · 2026-10-29 · The half-size light's look: soft** (the owner's pick,
A, recommended; answers part of Q-068) The Half choice works the light out
on one pixel in four (every other one each way); each pixel between takes
the mix of its neighbours, and the dither stays one pixel fine, so shadow
edges are a touch softer. Not B, one light per 2 × 2 pixels, whose dither
looks coarser than the art. On the simulated slow phone, about 35 frames a
second instead of 26 to 30 (pictures:
https://claude.ai/artifact/GbP79PqaMwajfoF8gy4Nvz). The owner's Galaxy S26
Ultra runs today's light at about 120, with one brief dip to 60, likely the
phone's own screen switching down.

**D-433 · 2026-10-29 · Automatic: watch, switch down once** (the owner's
pick, A, recommended; answers part of Q-068) Automatic watches the fps in
play; under 50 for 3 seconds, the light goes to half and stays half until
the game is opened again. It never switches back while playing.

**D-434 · 2026-10-29 · The camera on whole pixels, first** (the owner's
picks, both recommended) A room screen an odd number of game pixels tall
or wide puts the camera on half a pixel in rooms bigger than the screen,
and the whole light goes black (found at depth 2 of seed 4127, 844 × 390).
Its fix, the camera rounded to a whole pixel with a test, is the next
step, on its own; then the Half choice and Automatic (D-432, D-433).
Speeding up the last pass over every pixel (about 10 ms of the light, the
same look) comes later.

**D-435 · 2026-10-29 · The light choices' names** (the owner's pick;
answers Q-068) Settings names the light's choices Full, Half and
Automatic (D-432, D-433).

**D-436 · 2026-10-29 · Half on hold; the last pass first** (the owner's
picks, all recommended) Half, built as D-432 says, looked the same as Full
but ran no faster on the simulated slow phone (24 to 32 fps both): the
work it cuts was about 4 ms of the light's 25. The time was in the last
pass over every pixel, most of it past the room's edge, where the edge's
darkness was worked out again for every pixel, every frame. Now it is
worked once with the memory, in a 4-pixel border around the room, and
only the rows' columns the lights can reach are cleared and read. Every
pixel the same (1,200 pictures); walking about 31 fps instead of 22 to
25, the light about 19.5 ms instead of 25. Half and Automatic wait,
unbuilt, until the light is measured again (Q-069).

**D-437 · 2026-10-29 · The light's line, when it comes** (the owner's
picks, both recommended) The Light line goes after Motion in Settings,
and Automatic is the choice before any pick (D-433, D-435); until
Automatic is built, Full.
