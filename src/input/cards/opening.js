// § opening card (D-628): a new journey's first words. Enter, Space, Esc, P or a tap anywhere
// begin play; arrows do nothing.
export function openingCard(app, ui, show) {
  const begin = () => show('play');
  return { pick: begin, dir: () => {}, tap: (px, py, held) => { if (!held) begin(); }, close: begin };
}
