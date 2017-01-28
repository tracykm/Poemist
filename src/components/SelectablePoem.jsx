import React from 'react'
import formatLetters from 'src/utils/formatLetters.js';
import Word from './Word';

import 'src/components/poem/_poem';

class SelectablePoem extends React.Component {
  render() {
    const { wordLetters } = this.props;

    return (
      <div className="poem">
        <div className="background-img" />
        {wordLetters ?
          wordLetters.map((word, i) => <Word word={word} key={i} wordIdx={i} />) : 'loading'
        }
      </div>
    );
  }
}

SelectablePoem.propTypes = {
  wordLetters: React.PropTypes.array,
};

export default SelectablePoem;
