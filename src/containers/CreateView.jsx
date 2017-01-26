import React from 'react';
import { connect } from 'react-redux';
import { getNewPassage } from 'src/actions/ajaxActions';

import SelectablePoem from 'src/components/SelectablePoem.jsx';

class CreateView extends React.Component {
  componentWillMount() {
    this.props.getNewPassage(this.props.params.id);
  }
  render() {
    const { passage } = this.props;

    const poem = {
      passage: passage.text,
      bookTitle: passage.title,
    }
    return (
      <div className="close-up-poem-view">
        <SelectablePoem poem={poem} />
      </div>
    );
  }
}

CreateView.propTypes = {
  passage: React.PropTypes.object,
  getNewPassage: React.PropTypes.func,
};

const mapDispatchToProps = {
  getNewPassage,
};

function mapStateToProps(state) {
  return {
    passage: state.passage,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateView);
