// § strike card (D-614): the needle swept across the bar, the world paused. Enter, Space or a
// tap or click anywhere strikes; arrows do nothing; Esc and P do nothing, as closing it would
// be a free escape. The strike itself is main.js's (`ui.strike`).
export function strikeCard(app, ui) {
  const pick = () => ui.strike();
  const tap = (px, py, held) => { if (!held) pick(); };
  return { pick, dir: () => {}, tap, close: () => {} };
}
