import React from 'react';
import { connect } from 'react-redux';
import { createPoem } from 'src/actions/ajax/poem';
import { makePoemUnselectable, updateStyle, updateColor } from 'src/actions/selectablePoem.js';
import StyleToolbar from 'src/components/selectable/StyleToolbar';
import Poem from 'src/components/poem/Poem.jsx';

class StyleView extends React.Component {
  componentWillMount() {
    const { makePoemUnselectable, selectablePoem } = this.props;
    if (selectablePoem) {
      makePoemUnselectable(selectablePoem);
    } else {
      // redirect to create
    }
  }

  componentWillUnmount() {
    this.props.createPoem(this.props.poem);
  }

  render() {
    const { poem, updateStyle, updateColor } = this.props;
    const backgroundId = poem ? poem.backgroundId : null
    const colorRange = poem ? poem.colorRange : null
    const styleProps = { updateStyle, updateColor, backgroundId, colorRange };
    return (
      <div className="close-up-poem-view">
        <h1>Stylize</h1>
        <StyleToolbar {...styleProps} />
        <Poem poem={poem} />
      </div>
    );
  }
}

StyleView.propTypes = {
  selectablePoem: React.PropTypes.object,
  poem: React.PropTypes.object,
  makeCurrentPoemSelectable: React.PropTypes.func,
  updateStyle: React.PropTypes.func,
  updateColor: React.PropTypes.func,
  createPoem: React.PropTypes.func,
};

const mapDispatchToProps = {
  makePoemUnselectable,
  updateStyle,
  updateColor,
  createPoem,
};

function mapStateToProps(state) {
  return {
    selectablePoem: state.selectablePoem, // TODO: make bool
    poem: state.currentPoem,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StyleView);
