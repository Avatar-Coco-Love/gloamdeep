// § cutscene: the Lampeater's, the first time on a journey its way in seals (Q-112, D-957). Plain
// timing, no drawing: from { start, door, boss } and the time, where the camera looks, how far it
// is zoomed in, the black bars, the door's rise and the Lampeater's flare. Three shots, about 3 s:
// the camera zooms in on the door as it rises out of the floor, glides up to the Lampeater, whose
// eyes flare as its body swells once and settles, then zooms back out to the hero. No skip: taps
// and keys do nothing till it ends (main.js). With reduced motion the shots cut instead of gliding,
// the door is simply there, and the eyes flare with no swell. Every later seal, the door rises only.
export const CUT = { inEnd: 400, panAt: 1000, panEnd: 1600, flareAt: 1600, flareEnd: 2500, outAt: 2500, end: 3000 };
export const RISE = { at: 100, ms: 800 }; // the door rising out of the floor, from the seal (RISE.at in, every time)
export const CLOSE_ROWS = 7; // zoomed in, about this many tiles across the screen's short side

const ramp = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
const smooth = (k) => k * k * (3 - 2 * k);
const mix = (a, b, k) => ({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k });

// (cutscene, t, still, hero) → { focus, close, bars, flare, swell }: focus in tiles (the camera's
// middle, as the hero's tile is in play), close 0 to 1 (zoomed out to in), bars 0 to 1 (slid in),
// flare 0 to 1 (the eyes), swell 0 to 1 (the body); `hero`, where the hero is shown, in tiles
export function shotAt(cs, t, still, hero) {
  if (cs.end) return endShotAt(cs, t, still, hero); // its end (D-1014)
  const e = t - cs.start, { door, boss } = cs;
  if (still) { // cuts: the door, the Lampeater, the hero
    const on = e < CUT.outAt ? 1 : 0;
    return { focus: e < CUT.panAt ? door : e < CUT.outAt ? boss : hero, close: on, bars: on, flare: e >= CUT.flareAt && e < CUT.flareEnd ? 1 : 0, swell: 0 };
  }
  const zin = smooth(ramp(e, 0, CUT.inEnd)), out = smooth(ramp(e, CUT.outAt, CUT.end));
  const pan = smooth(ramp(e, CUT.panAt, CUT.panEnd));
  const looking = e < CUT.outAt ? mix(mix(hero, door, zin), boss, pan) : mix(boss, hero, out);
  const f = ramp(e, CUT.flareAt, CUT.flareEnd); // up fast, then fading back
  const flare = f <= 0 || f >= 1 ? 0 : f < 0.25 ? f / 0.25 : 1 - (f - 0.25) / 0.75;
  const swell = f <= 0 || f >= 1 ? 0 : Math.sin(Math.min(1, f / 0.6) * Math.PI); // once, then settled
  return { focus: looking, close: zin * (1 - out), bars: zin * (1 - out), flare, swell };
}
export const cutOver = (cs, t) => t - cs.start >= (cs.end ? END : CUT).end;

// § its end (D-1014): the first time on a journey the Lampeater is beaten, about 3 s. The bars slide
// in as the camera glides from the hero to where it fell; its eyes flare one last time; its body
// sinks and fades as its gloamlings and wisps crumble; Leap's find shows where it fell; then back
// out to the hero. { start, end: true, boss, brood }: `boss` the Lampeater as it was, `brood` the
// arena's own that crumble with it, kept to be drawn as they go. With reduced motion the shots cut,
// the eyes flare with no rise, and the fade and the find are simply there at their times.
export const END = { inEnd: 500, flareAt: 500, flareEnd: 1100, fadeAt: 1000, fadeEnd: 2000, findAt: 1800, findEnd: 2400, outAt: 2400, end: 3000 };
export const SINK = 0.25; // its body sinks this far into the floor as it fades, in tiles
export const CRUMBLE = 0.3; // its brood drops this far as it crumbles, as far as a gloamling rises from a bowl (CRAWL_DROP, D-949)
function endShotAt(cs, t, still, hero) {
  const e = t - cs.start, at = (a, b) => (still ? (e >= (a + b) / 2 ? 1 : 0) : smooth(ramp(e, a, b)));
  const on = still ? (e < END.outAt ? 1 : 0) : smooth(ramp(e, 0, END.inEnd)) * (1 - smooth(ramp(e, END.outAt, END.end)));
  const look = still ? (e < END.outAt ? cs.boss : hero) : e < END.outAt ? mix(hero, cs.boss, smooth(ramp(e, 0, END.inEnd))) : mix(cs.boss, hero, smooth(ramp(e, END.outAt, END.end)));
  const f = ramp(e, END.flareAt, END.flareEnd);
  const flare = still ? (f > 0 && f < 1 ? 1 : 0) : f <= 0 || f >= 1 ? 0 : f < 0.3 ? f / 0.3 : 1 - (f - 0.3) / 0.7;
  return { end: true, focus: look, close: on, bars: on, flare, swell: 0, fade: at(END.fadeAt, END.fadeEnd), find: at(END.findAt, END.findEnd) };
}

// (rise, t) → how far the door has risen, 0 to 1, or 1 once done
export const risenAt = (rise, t) => smooth(ramp(t - rise.start, RISE.at, RISE.at + RISE.ms));
export const rising = (rise, t) => !!rise && t - rise.start < RISE.at + RISE.ms;
