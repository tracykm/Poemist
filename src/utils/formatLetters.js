import { from } from 'seamless-immutable';
// inclusive on lower isBetween(1,1,5) = true
function isBetween(lower, middle, higher) {
  if (middle < lower) {
    return false;
  }
  if (middle > higher) {
    return false;
  }
  if (middle === higher) {
    return false;
  }
  return true;
}

function isHighlighted({ selectedTexts, idx }) {
  if (!selectedTexts) {
    return false;
  }
  for (let i = 0; i < selectedTexts.length; i++) {
    const selectedText = selectedTexts[i];
    if (isBetween(selectedText[0], idx, selectedText[1])) {
      return true;
    }
  }
  return false;
}

function splitWords(passage) { // takes 'but--I have' => ['but-', '-', 'I ', 'have' ]
  const words = [];
  let word = '';

  passage.split('').forEach((ch) => {
    word += ch;
    if (ch === ' ' || ch === '-') {
      words.push(word);
      word = '';
    }
  });
  words.push(word); // last few letters with no space after
  return words;
}

function formatLetters({ passage, selectedTexts }) {
  if (!passage) return null;
  const wordArr = splitWords(passage);
  let idx = -1;
  const wordLetters = wordArr.map((word) => {
    return word.split('').map((ch) => {
      idx++;
      const isSelected = isHighlighted({ selectedTexts, idx });
      return { ch, isSelected };
    });
  });
  return from(wordLetters);
}

export default formatLetters;
