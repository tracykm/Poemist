import React from 'react';
import { connect } from 'react-redux';
import { getIndexPoems } from 'src/actions/ajax/poem';
import { values } from 'lodash';
import IndexView from 'src/containers/IndexView.jsx';

class HomeView extends React.Component {
  componentWillMount() {
    this.props.getIndexPoems();
  }
  render() {
    const { poems } = this.props;
    return (
      <div className="index-view">
        <h5>Browse through all the communitys poems!</h5>
        <IndexView poems={poems} />
      </div>
    );
  }
}

HomeView.propTypes = {
  poems: React.PropTypes.array,
  getIndexPoems: React.PropTypes.func,
};

const mapDispatchToProps = {
  getIndexPoems,
};

function mapStateToProps(state) {
  return {
    poems: values(state.poems),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
