import React from 'react';
import { Link } from 'react-router';

function up(num) {
  return num + 1;
}

class StyleToolbar extends React.Component {
  styleUp() {
    const backgroundId = this.props.backgroundId + 1;
    this.props.updateStyle(backgroundId);
  }
  styleDown() {
    const backgroundId = this.props.backgroundId - 1;
    this.props.updateStyle(backgroundId);
  }
  colorUp() {
    const colorRange = this.props.colorRange + 1;
    this.props.updateColor(colorRange);
  }
  colorDown() {
    const colorRange = this.props.colorRange - 1;
    this.props.updateColor(colorRange);
  }
  render() {
    const { updateStyle, backgroundId, updateColor, colorRange } = this.props;
    return (
      <div className="style-toolbar">
        <div>
          Style
          <button onClick={this.styleDown.bind(this)}>-</button>
          {backgroundId}
          <button onClick={this.styleUp.bind(this)}>+</button>
        </div>

        <div>
          Color
          <button onClick={this.colorDown.bind(this)}>-</button>
          {colorRange}
          <button onClick={this.colorUp.bind(this)}>+</button>
        </div>
        <Link to={{ pathname: '/' }}>Finish</Link>
      </div>
    );
  }
}

StyleToolbar.propTypes = {
  updateStyle: React.PropTypes.func,
  backgroundId: React.PropTypes.number,
};

export default StyleToolbar;
