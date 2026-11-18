// § opening (D-628): the words on the card a new journey opens with, once, before the first
// turn. Three sentences, each its own paragraph on the card: the start's (starts.js, D-735).
import { STARTS, START } from './starts.js';
export const OPENING = STARTS[START].opening;
export const OPENING_BUTTON = 'Begin';
export const openingWords = () => `${OPENING.join(' ')} ${OPENING_BUTTON}: press Enter, or tap.`;

// § the boons card (D-706, D-712): once, right after the first boon is picked, what boons are, on the
// same glass card; picking the done "Take a boon" in the Quests tab shows it again, over the Journal
export const ABOUT_BOONS = [
  'That is a boon: a small help for one trip down.',
  'It lasts until you come back to the waystone, or you fall.', // H-35, D-865
  'Its mark sits under your hearts. Each time you set out, pick a new one.',
];
export const ABOUT_BOONS_BUTTON = 'Go';
export const aboutBoonsWords = () => `${ABOUT_BOONS.join(' ')} ${ABOUT_BOONS_BUTTON}: press Enter, or tap.`;

// § the ability card (D-971, D-992): once, as Leap's find is stepped on, what was learnt, on the same
// glass card: its heading, the Leap button's icon, its name and its use (the owner's pick); OK goes on
export const ABILITY = { heading: 'A new ability', name: 'Leap', use: 'Jump 2 tiles in a line, over a creature, water or a gap. Tap the Leap button or press J.' };
export const ABILITY_BUTTON = 'OK';
export const abilityWords = () => `${ABILITY.heading}: ${ABILITY.name}. ${ABILITY.use} ${ABILITY_BUTTON}: press Enter, or tap.`;
