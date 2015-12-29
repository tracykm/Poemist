module.exports = {
  selectLetter: function (idx, letters){
    var letter = letters[idx];
    letter.is_selected = !letter.is_selected;
    letters[idx] = letter;
  },

  // always select or unselect
  selectLetterSame: function (idx, letters, always_select){
    var letter = letters[idx];
    if(always_select){
      letter.is_selected = true;
    }else{
      letter.is_selected = false;
    }
    letters[idx] = letter;
  },

  wordStartEnd: function (idx, letters){
    if(idx === null){
      return null;
    }
    var endIdx = idx;

    var last_idx = letters.length -2;
    // find end of word
    while (letters[endIdx].ch !== " " && idx < last_idx) {

      endIdx++;
    }
    // find start of word
    var first_idx = 1;
    var startIdx = idx;
    while (letters[startIdx].ch !== " " && idx > first_idx) {
      startIdx--;
    }
    return [startIdx, endIdx];
  }
};
