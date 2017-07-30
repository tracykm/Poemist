import React from 'react'
import { connect } from 'react-redux'
import { _getIndexPoems, getLoadedIndexPoems } from 'src/ducks/poems'
import IndexView from 'src/components/IndexView.jsx'

class HomeView extends React.Component {
  render() {
    const { poems, getIndexPoems, allPoemsLoaded } = this.props
    return (
      <div className="index-view">
        <h5>Browse through all the communitys poems!</h5>
        <IndexView
          poems={poems}
          getMorePoems={getIndexPoems}
          allPoemsLoaded={allPoemsLoaded}
        />
      </div>
    )
  }
}

HomeView.propTypes = {
  poems: React.PropTypes.array,
  getIndexPoems: React.PropTypes.func,
  allPoemsLoaded: React.PropTypes.bool,
}

const mapDispatchToProps = {
  getIndexPoems: _getIndexPoems,
}

function mapStateToProps(state) {
  return {
    poems: getLoadedIndexPoems(state),
    allPoemsLoaded: !!state.current.allPoemsLoaded,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
