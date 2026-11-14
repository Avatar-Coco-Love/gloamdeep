// § way: the way of playing last used, 'touch', 'mouse' or 'keyboard' (D-897), so a goal's how
// line names what this player presses: input.js sets it on each tap, click or key; touch until
// then, phone first. Not game state: never saved, never in the seed.
let way = 'touch';
export const setWay = (k) => { way = k; };
export const wayOf = () => way;
