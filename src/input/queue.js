// § the waiting line (D-680): a turn taken while the hero still slides, or while the stairs or
// a fall fade, waits in line until they end, but only in play, where the line is played. A
// card's own action (the bag's Eat, Pour, Craft, Hold, the bench's Make) happens at once and
// the slide goes on by itself; before, it waited until the card closed (audit finding I4).
export const waitsInLine = (screen, settled) => !settled && screen === 'play';
