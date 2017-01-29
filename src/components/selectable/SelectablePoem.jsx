import React from 'react'
import formatLetters from 'src/utils/formatLetters.js';
import Word from './Word';

import 'src/components/poem/_poem';


class SelectablePoem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick({ wordIdx, letterIdx }) {
    const { toggleSelectedLetters } = this.props;
    toggleSelectedLetters({ wordIdx, letterIdx });
  }

  render() {
    const { wordLetters, isSelectingByWord } = this.props;

    return (
      <div className="poem">
        <div className="background-img" />
        <div className={isSelectingByWord ? 'selecting-by-word' : 'selecting-by-letter'}>
          {wordLetters ?
            wordLetters.map((word, i) => (
              <Word word={word} key={i} wordIdx={i} handleClick={this.handleClick} />
            )) : 'loading'
          }
        </div>
      </div>
    );
  }
}

SelectablePoem.propTypes = {
  wordLetters: React.PropTypes.array,
  isSelectingByWord: React.PropTypes.bool,
};

export default SelectablePoem;
