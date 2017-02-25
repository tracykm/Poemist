import React from 'react';
import { connect } from 'react-redux';
import { _createPoem, _updatePoem } from 'src/actions/ajax/poem';
import { _makePoemUnselectable, _updateStyle, _updateColor } from 'src/actions/selectablePoem.js';
import StyleToolbar from 'src/components/selectable/StyleToolbar';
import Poem from 'src/components/poem/Poem.jsx';

class StyleView extends React.Component {
  componentWillMount() {
    const { makePoemUnselectable, selectablePoem } = this.props;
    if (selectablePoem.passage) {
      makePoemUnselectable(selectablePoem);
    } else {
      this.props.router.push('/new/write');
    }
  }

  componentWillUnmount() {
    const { createPoem, updatePoem, poem, params } = this.props;
    const poemId = params.id;
    if (poemId) {
      updatePoem({ ...poem, id: poemId });
    } else {
      createPoem(poem);
    }
  }

  render() {
    const { poem, updateStyle, updateColor, params } = this.props;
    const backgroundId = poem ? poem.backgroundId : null;
    const colorRange = poem ? poem.colorRange : null;
    const inEditView = !!params.id;
    const styleProps = { updateStyle, updateColor, backgroundId, colorRange, inEditView };
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
  router: React.PropTypes.object,
  params: React.PropTypes.object,
  makePoemUnselectable: React.PropTypes.func,
  updateStyle: React.PropTypes.func,
  updateColor: React.PropTypes.func,
  createPoem: React.PropTypes.func,
  updatePoem: React.PropTypes.func,
};

const mapDispatchToProps = {
  makePoemUnselectable: _makePoemUnselectable,
  updateStyle: _updateStyle,
  updateColor: _updateColor,
  createPoem: _createPoem,
  updatePoem: _updatePoem,
};

function mapStateToProps(state) {
  return {
    selectablePoem: state.selectablePoem, // TODO: make bool
    poem: state.stylingPoem,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StyleView);
