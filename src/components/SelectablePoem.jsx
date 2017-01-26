import React from 'react'
import formatLetters from 'src/utils/formatLetters.js';
import Word from './Word';

import 'src/components/poem/_poem';

class SelectablePoem extends React.Component {
  render() {
    const { poem } = this.props;

    if (!poem || !poem.passage) {
      return (
        <div className="poem">
          <div className="background-img" />
          loading
        </div>
      );
    }

    const { passage, selectedTexts } = poem;
    const letters = formatLetters({ passage, selectedTexts });
    return (
      <div className="poem">
        <div className="background-img" />
        {letters.map((word, i) => <Word word={word} key={i} wordIdx={i} />)}
      </div>
    );
  }
}

SelectablePoem.propTypes = {
  poem: React.PropTypes.object,
};

export default SelectablePoem;
