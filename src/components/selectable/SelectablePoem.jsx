import React from 'react'
import Word from './Word';

import 'src/components/poem/_poem';


class SelectablePoem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ wordIdx, letterIdx }) {
    const { toggleSelectedLetters } = this.props;
    toggleSelectedLetters({ wordIdx, letterIdx });
  }

  render() {
    const { wordLetters, isSelectingByWord } = this.props.selectablePoem;

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
  selectablePoem: React.PropTypes.object.isRequired,
  toggleSelectedLetters: React.PropTypes.func.isRequired,
};

export default SelectablePoem;
