import React from 'react'
import { connect } from 'react-redux'
import * as poemDuck from 'src/ducks/poems'
import IndexView from 'src/components/manyPoemViews/IndexView'

class HomeView extends React.Component {
  render() {
    const { poems, handleFetchIndexPoems, allPoemsLoaded } = this.props
    return (
      <div className="index-view">
        <h5>Browse through all the communitys poems!</h5>
        <IndexView
          poems={poems}
          getMorePoems={handleFetchIndexPoems}
          allPoemsLoaded={allPoemsLoaded}
        />
      </div>
    )
  }
}

HomeView.propTypes = {
  poems: React.PropTypes.array,
  handleFetchIndexPoems: React.PropTypes.func,
  allPoemsLoaded: React.PropTypes.bool,
}

const mapDispatchToProps = {
  handleFetchIndexPoems: poemDuck.handleFetchIndexPoems,
}

function mapStateToProps(state) {
  return {
    poems: poemDuck.getLoadedIndexPoems(state),
    allPoemsLoaded: !!state.current.allPoemsLoaded,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
