// § opening (D-628): the words on the card a new journey opens with, in the crypt, once,
// before the first turn. Three sentences, each its own paragraph on the card.
export const OPENING = [
  'You wake in the dark of the crypt.',
  'Your lantern still burns, but its oil will not last.',
  'Something waits below.',
];
export const OPENING_BUTTON = 'Begin';
export const openingWords = () => `${OPENING.join(' ')} ${OPENING_BUTTON}: press Enter, or tap.`;
