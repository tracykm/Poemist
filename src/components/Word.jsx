const React = require('react');
import './_word';

const Word = ({ word, wordIdx, handleClick }) => (
  <span className="word" data-word-idx={wordIdx}>
    {word.map(({ ch, isSelected }, letterIdx) => (
      <span
        onClick={handleClick.bind(null, { wordIdx, letterIdx })}
        className={`letter ${isSelected ? 'is' : 'not'}-selected`}
        data-idx={letterIdx} key={letterIdx}
      >
        {ch}
      </span>
    ))}
  </span>
);

Word.propTypes = {
  word: React.PropTypes.array,
  wordIdx: React.PropTypes.number,
  handleClick: React.PropTypes.func,
};

export default Word;
