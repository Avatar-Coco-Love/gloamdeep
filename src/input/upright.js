// § upright: the game plays sideways only (D-377). A phone held upright
// pauses play and shows a picture asking to turn it; turned back, the pause
// menu waits. A PC window is never asked, whatever its shape. Thin layer:
// it only calls onUpright() and covers the page.
import { drawText, textWidth } from '../render/font.js';

const WORDS = 'Turn your phone sideways';
const PW = 124, PH = 50; // the picture, in game pixels
const STONE = '#9790a4', GOLD = '#ffc65c', INK = '#c9c2d6';

// A phone's outline w × h at x, y, its screen one pixel in, and a dot for the button
function drawPhone(c, x, y, w, h, colour, dot) {
  c.fillStyle = colour;
  c.fillRect(x + 1, y, w - 2, 1); c.fillRect(x + 1, y + h - 1, w - 2, 1);
  c.fillRect(x, y + 1, 1, h - 2); c.fillRect(x + w - 1, y + 1, 1, h - 2);
  c.fillRect(dot.x, dot.y, 1, 1);
}

function drawPicture(c) {
  drawPhone(c, 16, 4, 12, 20, STONE, { x: 21, y: 21 }); // upright
  drawPhone(c, 88, 8, 20, 12, GOLD, { x: 104, y: 13 }); // sideways
  c.fillStyle = INK; // the arrow between them
  c.fillRect(40, 14, 34, 1);
  for (let i = 1; i <= 3; i++) { c.fillRect(74 - i, 14 - i, 1, 1); c.fillRect(74 - i, 14 + i, 1, 1); }
  drawText(c, WORDS, Math.floor((PW - textWidth(WORDS)) / 2), 36, INK);
}

// A phone, not a PC: a finger is its pointer, and the screen stands upright
const phone = matchMedia('(pointer: coarse)'), tall = matchMedia('(orientation: portrait)');
export const isUpright = () => phone.matches && tall.matches;

export function createUpright({ onUpright }) {
  const cover = document.createElement('div');
  cover.id = 'upright';
  cover.setAttribute('role', 'alert');
  const picture = document.createElement('canvas');
  picture.width = PW; picture.height = PH;
  drawPicture(picture.getContext('2d'));
  const said = document.createElement('span');
  said.className = 'px-said';
  said.textContent = `${WORDS} to play.`;
  cover.append(picture, said);
  document.body.append(cover);
  const fit = () => { // the biggest whole zoom that fits four fifths of the width
    const z = Math.max(1, Math.floor(innerWidth * 0.8 / PW));
    picture.style.width = PW * z + 'px'; picture.style.height = PH * z + 'px';
  };
  const check = () => {
    const on = isUpright();
    cover.hidden = !on;
    if (on) { fit(); onUpright(); }
  };
  phone.addEventListener('change', check); tall.addEventListener('change', check);
  addEventListener('resize', () => { if (!cover.hidden) fit(); });
  check();
}

// § sideways on Play (D-377): on a phone that can (Android), full screen and
// locked sideways. iPhone browsers can't, so the picture covers them; an
// installed game opens sideways by its app card (core/install.js). Called
// from a tap or key, as browsers ask; never throws.
export function goSideways() {
  const page = document.documentElement;
  if (!phone.matches || !page.requestFullscreen || document.fullscreenElement) return;
  page.requestFullscreen({ navigationUI: 'hide' })
    .then(() => screen.orientation?.lock?.('landscape'))
    .catch(() => {}); // refused, or no lock: the picture still asks
}
