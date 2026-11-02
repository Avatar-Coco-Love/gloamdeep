// § place card (WB2, D-322): setting down, its pick, arrows, taps and
// close, moved word for word from screens.js at the eighth audit (D-573). `c` holds
// cardscreens.js's helpers: setToward and tapSide.
export function placeCard(app, ui, show, c) {
  const { setToward, tapSide } = c;
  const pick = () => {}; // Enter and Space don't pick a side
  const dir = (dir) => { setToward(dir); };
  function tap(px, py, held) { if (!held) tapSide(px, py); } // a marked tile sets it there, anywhere else leaves it in the bag
  const close = () => show('play'); // Esc or P
  return { pick, dir, tap, close };
}
