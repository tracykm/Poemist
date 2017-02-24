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
  for (let i = 0; i < selectedTexts.count(); i++) {
    const selectedText = selectedTexts.get(i);
    if (isBetween(selectedText.get(0), idx, selectedText.get(1))) {
      return true;
    }
  }
  return false;
}

function splitWords(passage) { // takes 'but--I have' => ['but-', '-', 'I ', 'have' ]
  const words = [];
  let word = '';

  passage.split('').forEach(function (ch) {
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
  if (!passage) return null
  const wordArr = splitWords(passage);
  let idx = -1;
  const wordLetters = wordArr.map(function(word) {
    return word.split('').map(function(ch) {
      idx++;
      const isSelected = isHighlighted({ selectedTexts, idx });
      return { ch, isSelected };
    });
  });
  return from(wordLetters);
}

export default formatLetters;
