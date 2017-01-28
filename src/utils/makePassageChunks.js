function makePassageChunks({ selectedTexts, passage }) {
  const returnVal = [];

  // no selections
  if (selectedTexts.length === 0) {
    return [{ text: passage, isSelected: false }];
  }

  let emptyStart = 0;
  let emptyStop;

  selectedTexts.forEach((ends) => {
    const start = ends[0];
    const stop = ends[1];

    emptyStop = start;
    const unselectedText = passage.slice(emptyStart, emptyStop);
    if (unselectedText) returnVal.push({ text: unselectedText, isSelected: false });
    emptyStart = stop;

    const text = passage.slice(start, stop);
    returnVal.push({ text, isSelected: true });
  });

  const leftOverText = passage.slice(emptyStart, passage.length);
  if (leftOverText) returnVal.push({ text: leftOverText, isSelected: false });

  return returnVal;
}

export default makePassageChunks;
