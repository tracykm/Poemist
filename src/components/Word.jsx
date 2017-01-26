const React = require('react');

const Word = ({ word, wordIdx }) => (
  <span className="word" data-word-idx={wordIdx}>
    {word.map(({ ch, isSelected }, idx) => (
      <span
        className={`letter ${isSelected ? 'is' : 'not'}-selected`}
        data-idx={idx} key={idx}
      >
        {ch}
      </span>
    ))}
  </span>
);

Word.propTypes = {
  word: React.PropTypes.array,
  wordIdx: React.PropTypes.number,
};

export default Word;
