import React from 'react';
import { Link } from 'react-router';

const BACKGROUND_ID_COUNT = 10;
const COLOR_RANGE_COUNT = 36;

function keepInRange({ num, upperlimit }) {
  if (num < 0) {
    return upperlimit - 1;
  }
  if (num > upperlimit) {
    return num - upperlimit;
  }
  return num;
}

class StyleToolbar extends React.Component {
  backgroundUp() {
    const num = this.props.backgroundId + 1;
    const backgroundId = keepInRange({ num, upperlimit: BACKGROUND_ID_COUNT });
    this.props.updateStyle({ backgroundId });
  }
  backgroundDown() {
    const num = this.props.backgroundId - 1;
    const backgroundId = keepInRange({ num, upperlimit: BACKGROUND_ID_COUNT });
    this.props.updateStyle({ backgroundId });
  }
  colorUp() {
    const num = this.props.colorRange + 1;
    const colorRange = keepInRange({ num, upperlimit: COLOR_RANGE_COUNT });
    this.props.updateStyle({ colorRange });
  }
  colorDown() {
    const num = this.props.colorRange - 1;
    const colorRange = keepInRange({ num, upperlimit: COLOR_RANGE_COUNT });
    this.props.updateStyle({ colorRange });
  }
  render() {
    const { backgroundId, colorRange } = this.props;
    return (
      <div className="style-toolbar">
        <div>
          Style
          <button onClick={this.backgroundDown.bind(this)} data-ux="background-id-down">
            -
          </button>
          {backgroundId}
          <button onClick={this.backgroundUp.bind(this)} data-ux="background-id-up">
            +
          </button>
        </div>

        <div>
          Color
          <button onClick={this.colorDown.bind(this)} data-ux="color-range-down">
            -
          </button>
          {colorRange}
          <button onClick={this.colorUp.bind(this)} data-ux="color-range-up">
            +
          </button>
        </div>
        <Link to={{ pathname: '/' }}>Finish</Link>
      </div>
    );
  }
}

StyleToolbar.propTypes = {
  updateStyle: React.PropTypes.func.isRequired,
  backgroundId: React.PropTypes.number.isRequired,
  colorRange: React.PropTypes.number.isRequired,
};

export default StyleToolbar;
