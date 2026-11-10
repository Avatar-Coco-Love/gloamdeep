// § sound: the game's sounds. All silent for now (D-773): the sounds made in code
// with Web Audio were wiped, and sound files (a free pack, Kenney's first) take
// their place one by one, each from the list in docs/SOUNDS.md.
// What stays is each sound's name and the moment it plays (main.js's `hear`, the
// creatures' `sound` and `sips` in enemies.js), so a file plugs straight in.
// A browser plays sound only after a tap, click or key, and with Sound: Off nothing
// plays; the sound maker that waits for that tap comes back with the first file.

// § voices: every sound the game asks for, each silent until its file is in
const VOICES = ['footstep', 'lantern', 'hit', 'teeth', 'glass', 'sting', 'hiss', 'squeak', 'snuffle', 'snap', 'rustle', 'rattle', 'sip', 'bells', 'chime', 'plop', 'splash'];
const silent = () => {};

export function createSound() {
  const { footstep, lantern, hit, teeth, glass, sting, hiss, squeak, snuffle, snap, rustle, rattle, sip, bells, chime, plop, splash } = Object.fromEntries(VOICES.map((v) => [v, silent]));
  return { footstep, lantern, hit, teeth, glass, sting, hiss, squeak, snuffle, snap, rustle, rattle, sip, bells, chime, plop, splash };
}
