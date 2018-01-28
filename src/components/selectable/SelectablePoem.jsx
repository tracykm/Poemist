import PropTypes from 'prop-types';
import React from 'react'
import 'src/components/poem/_poem.scss'
import Word from './Word'

class SelectablePoem extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick({ wordIdx, letterIdx }) {
    const { toggleSelectedLetters } = this.props
    toggleSelectedLetters({ wordIdx, letterIdx })
  }

  render() {
    const { wordLetters } = this.props.selectablePoem

    return (
      <div className="poem">
        <div className="poem-body">
          <div className="background-img" />
          <div
            className={
              this.props.isSelectingByWord ? 'selecting-by-word' : 'selecting-by-letter'
            }
          >
            {wordLetters
              ? wordLetters.map((word, i) => (
                  <Word
                    word={word}
                    key={i}
                    wordIdx={i}
                    handleClick={this.handleClick}
                  />
                ))
              : 'loading'}
          </div>
        </div>
      </div>
    )
  }
}

SelectablePoem.propTypes = {
  selectablePoem: PropTypes.object.isRequired,
  toggleSelectedLetters: PropTypes.func.isRequired,
}

export default SelectablePoem
