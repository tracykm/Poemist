import { from } from 'seamless-immutable';
import { flatten } from 'lodash';

function getSelectedTexts(wordLetters) {
  const letters = flatten(wordLetters);
  const selects = [];
  let currentlySelected = false;
  let pair = [];

  letters.forEach((letter, idx) => {
    // only push index when switching
    if (letter.isSelected !== currentlySelected) {
      if (!currentlySelected) { // starting
        pair = [idx]; // new pair
      } else { // stopping
        pair.push(idx);
        selects.push(pair); // complete pair
      }
      currentlySelected = !currentlySelected;
    }
  });

  // if selected at end, close it
  if (currentlySelected) {
    pair.push(letters.length);
    selects.push(pair); // complete pair
  }
  return from(selects);
}

export default getSelectedTexts;
