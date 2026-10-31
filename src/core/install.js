// § install: what a phone needs to put the game on its home screen (D-375).
// The app card (a web app manifest) is plain data here; render/appicon.js
// draws the icons and adds it to the page. Installing only: nothing is kept
// offline, so loading and saving work as before. The card is a data URL,
// which can't resolve relative addresses, so start_url, scope and id are
// the page's folder in full.

export const ICON_SIZES = [192, 512]; // the card's icons, in pixels
export const APPLE_ICON_SIZE = 180; // iPhones ignore the card's icons and read this one
export const NIGHT = '#0b0a10'; // the page's background (index.html): the splash and title bar

// The folder a page address sits in: 'https://x.io/gloamdeep/?a=1#b' → 'https://x.io/gloamdeep/'
export function appBase(href) {
  const url = new URL(href);
  url.search = ''; url.hash = '';
  url.pathname = url.pathname.replace(/[^/]*$/, '');
  return url.href;
}

// The app card. `icons`: [{ src, size }], PNG data URLs.
export function buildManifest(base, icons) {
  return {
    id: base, start_url: base, scope: base,
    name: 'Gloamdeep', short_name: 'Gloamdeep',
    description: 'Carry a lantern down through dark places, and the oil runs low.',
    display: 'standalone', orientation: 'any', // installed, it turns with the phone, upright or sideways (D-505)
    background_color: NIGHT, theme_color: NIGHT,
    categories: ['games'],
    icons: icons.map(({ src, size }) => ({ src, sizes: `${size}x${size}`, type: 'image/png', purpose: 'any' })),
  };
}

export const manifestHref = (manifest) => `data:application/manifest+json,${encodeURIComponent(JSON.stringify(manifest))}`;

// Where the lantern's 5 × 5 pixels sit on a square icon `size` wide: the
// biggest whole-number zoom that leaves a tenth of the icon clear on each
// side, centred, so every pixel stays crisp.
export function lanternFit(size, pixels = 5) {
  const zoom = Math.floor(size * 0.8 / pixels), at = Math.floor((size - zoom * pixels) / 2);
  return { zoom, at };
}
