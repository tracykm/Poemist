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
    return (
      <div className="index-view">
        <InfiniteScroll
          className="poems-container"
          loadMore={this.loadFunc}
          hasMore={!allPoemsLoaded}
          loader={<div className="loader">Loading ...</div>}
        >
          {poems && poems.map((poem, i) => <Poem poem={poem} key={i} />)}
        </InfiniteScroll>
      </div>
    )
  }
}

IndexView.propTypes = {
  poems: React.PropTypes.array,
  getMorePoems: React.PropTypes.func,
  allPoemsLoaded: React.PropTypes.bool,
}

export default IndexView
