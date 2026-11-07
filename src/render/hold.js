// § hold: under a card the room behind the veil is drawn once and kept (S3, D-686).
// It is drawn again only when what it shows changes: the state (a find eaten or
// dropped), the screen's size, the camera, a dev switch or the motion setting.
// While a moment is still running (a slide, a shake, a "+1", a beam, a rune
// kindling) it keeps being drawn, so nothing is frozen halfway. The card itself,
// on the screen layer, is drawn every frame as before. With reduced motion the
// room in play is held the same way, as nothing in it moves by itself (D-687);
// the corner pieces and the text line are still drawn every frame.
import { KINDLE_MS } from './kindle.js';
import { GAIN_MS } from './walk.js';
import { JAB_MS } from './jab.js';

// True while any of the room's timed moments is still running at time t;
// beamMs comes from beam.js, which needs a page to load
export function running(app, t, beamMs) {
  const { nudge, hit, bitten, jab, gain, beam, kindle, travel, fall } = app;
  if (travel || fall) return true;
  if (nudge && t < nudge.until) return true;
  if (hit && (t < hit.until || t < hit.shakeUntil)) return true;
  if (bitten && (t < bitten.until || t < bitten.shakeUntil)) return true;
  if (jab && t < jab.start + JAB_MS) return true;
  if (t < (app.alertUntil || 0)) return true;
  if (gain && t < Math.max(gain.at, app.alertUntil || 0) + GAIN_MS) return true;
  if (beam && t < beam.start + beamMs) return true;
  if (kindle && t < kindle.start + KINDLE_MS) return true;
  return false;
}

// What the held picture was drawn from; a new key draws the room again
export const sameKey = (a, b) => !!a && !!b && a.length === b.length && a.every((v, i) => v === b[i]);

// Whether the room's picture may be kept on this screen: under a card, or in play
// (and while placing a workbench or chest) with reduced motion on (D-687)
export const holdsRoom = (screen, card, still) => card || (still && (screen === 'play' || screen === 'place'));
