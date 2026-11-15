// § runes: the rune wall's three faint violet runes (L3 step 1, mock-up look A, D-928), drawn over
// the light so they show in the dark, only while the hero sees them (runesSeen, sight.js). They
// light nothing. The stairs' violet, each rune's darker shade a pixel below it as if cut into
// the stone; they brighten and dim over 4 seconds, as a relic does (sprites.js), steady with
// reduced motion.
const BRIGHT = '#a58ce0', SHADE = '#6e58a8'; // the stairs' violet and the duskstar's shade (ART-DIRECTION.md)
// Three runes, 3 by 5 pixels, side by side across the wall's face
const RUNES = [
  ['.#.', '###', '.#.', '.#.', '.#.'],
  ['#.#', '.#.', '#.#', '...', '###'],
  ['##.', '#.#', '##.', '#..', '#..'],
];
const LEFT = 2, GAP = 4, TOP = 7; // the first rune's left column, from one rune to the next, the top row
const PIXELS = RUNES.flatMap((rows, k) => rows.flatMap((row, j) => [...row].flatMap((ch, i) => (ch === '#' ? [[LEFT + GAP * k + i, TOP + j]] : []))));
const PULSE_S = 4;

// (c, at, t, still): the runes on the wall tile `at` ({ x, y }), in the room's pixels
export function drawRunes(c, at, t, still) {
  const x = at.x * 16, y = at.y * 16;
  c.save();
  c.globalAlpha = still ? 0.92 : 0.8 + 0.2 * Math.sin(t / 1000 * (2 * Math.PI / PULSE_S));
  c.fillStyle = SHADE;
  for (const [px, py] of PIXELS) c.fillRect(x + px, y + py + 1, 1, 1);
  c.fillStyle = BRIGHT;
  for (const [px, py] of PIXELS) c.fillRect(x + px, y + py, 1, 1);
  c.restore();
}
