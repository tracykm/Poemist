import { IWordLetter } from "src/components/types";
import { ImmutableArrayMixin } from "seamless-immutable";

function toggleLetters({
  wordLetters,
  wordIdx,
  letterIdx,
  isSelectingByWord,
}: {
  wordLetters: ImmutableArrayMixin<IWordLetter[]>;
  wordIdx: number;
  letterIdx: number;
  isSelectingByWord: boolean;
}): ImmutableArrayMixin<IWordLetter[]> {
  if (isSelectingByWord) {
    if (!wordLetters[wordIdx]) {
      console.warn(
        `Word out of range, tried to access ${wordIdx} of ${
          wordLetters.flatMap.length
        }`,
      );
      return wordLetters;
    }
    const isSelected = !wordLetters[wordIdx][letterIdx].isSelected; // current letter's state
    // all letters in word should change together
    // @ts-ignore
    return wordLetters.update(wordIdx, word =>
      // @ts-ignore
      word.map(letter => letter.set("isSelected", isSelected)),
    );
  } else {
    // @ts-ignore
    return wordLetters.updateIn(
      [wordIdx, letterIdx, "isSelected"],
      // @ts-ignore
      isSelected => !isSelected,
    );
  }
}

export default toggleLetters;
