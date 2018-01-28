import PropTypes from 'prop-types';
import React from 'react'
import Poem from 'src/components/poem/Poem.jsx'
import InfiniteScroll from 'react-infinite-scroller'

import './_indexView.scss'

class IndexView extends React.Component {
  constructor() {
    super()
    this.loadFunc = this.loadFunc.bind(this)
  }
  loadFunc(page) {
    this.props.getMorePoems(page - 1) // first page 0 for easier offset calls
  }
  render() {
    const { poems, allPoemsLoaded } = this.props
    // console.log(poems.map(a => a.id))
    return (
      <div className="index-view">
        <InfiniteScroll
          className="poems-container"
          loadMore={this.loadFunc}
          hasMore={!allPoemsLoaded}
          loader={<div className="loader">Loading ...</div>}
        >
          {poems && poems.map((poem) => <Poem poem={poem} key={poem.id} />)}
        </InfiniteScroll>
      </div>
    )
  }
}

IndexView.propTypes = {
  poems: PropTypes.array,
  getMorePoems: PropTypes.func,
  allPoemsLoaded: PropTypes.bool,
}

export default IndexView
