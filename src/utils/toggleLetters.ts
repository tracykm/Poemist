import { IWordLetter } from "src/components/types";
import { ImmutableArrayMixin } from "seamless-immutable";

function toggleLetters({
  wordLetters,
  wordIdx,
  letterIdx,
  isSelectingByWord
}: {
  wordLetters: ImmutableArrayMixin<IWordLetter[]>;
  wordIdx: number;
  letterIdx: number;
  isSelectingByWord: boolean;
}) {
  if (isSelectingByWord) {
    const isSelected = !wordLetters[wordIdx][letterIdx].isSelected; // current letter's state
    // all letters in word should change together
    // @ts-ignore
    return wordLetters.update(wordIdx, word =>
      word.map(letter => letter.set("isSelected", isSelected))
    );
  } else {
    // @ts-ignore
    return wordLetters.updateIn(
      [wordIdx, letterIdx, "isSelected"],
      isSelected => !isSelected
    );
  }
}

export default toggleLetters;
