// § app icon: the home-screen icon, the lit lantern of the lantern switch
// (hud.js) on nothing at all, drawn in code to PNG data URLs (D-375), and
// the app card added to the page with it (core/install.js).
import { ICON_SIZES, APPLE_ICON_SIZE, appBase, buildManifest, manifestHref, lanternFit } from '../core/install.js';
import { LANTERN_ICON, LANTERN_ON } from './hud.js';

function iconUrl(size) {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const g = c.getContext('2d'), { zoom, at } = lanternFit(size, LANTERN_ICON.length);
  LANTERN_ICON.forEach((row, y) => [...row].forEach((ch, x) => {
    if (LANTERN_ON[ch]) { g.fillStyle = LANTERN_ON[ch]; g.fillRect(at + x * zoom, at + y * zoom, zoom, zoom); }
  }));
  return c.toDataURL('image/png');
}

function addLink(rel, href, sizes) {
  const link = document.createElement('link');
  link.rel = rel; link.href = href;
  if (sizes) link.setAttribute('sizes', sizes);
  document.head.append(link);
}

// Never throws: without it the game plays the same, it just can't be installed
export function addAppCard() {
  try {
    const icons = ICON_SIZES.map((size) => ({ size, src: iconUrl(size) }));
    addLink('manifest', manifestHref(buildManifest(appBase(location.href), icons)));
    addLink('apple-touch-icon', iconUrl(APPLE_ICON_SIZE), `${APPLE_ICON_SIZE}x${APPLE_ICON_SIZE}`);
  } catch {
    // no canvas or no page head: no install
  }
}
