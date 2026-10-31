// § full screen on Play (D-377, D-505): on a phone that can (Android), Play,
// Continue and Resume go full screen, held either way: the game plays upright
// and sideways, so nothing is locked. iPhone browsers can't go full screen.
// Called from a tap or key, as browsers ask; never throws.
const phone = matchMedia('(pointer: coarse)'); // a finger is its pointer: a phone or tablet, not a PC
export function goFullScreen() {
  const page = document.documentElement;
  if (!phone.matches || !page.requestFullscreen || document.fullscreenElement) return;
  page.requestFullscreen({ navigationUI: 'hide' }).catch(() => {}); // refused: the page plays as it is
}
