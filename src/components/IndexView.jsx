import React from 'react';
import Poem from 'src/components/poem/Poem.jsx';
import InfiniteScroll from 'react-infinite-scroller';

import './_indexView.scss';

class IndexView extends React.Component {
  constructor() {
    super();
    this.loadFunc = this.loadFunc.bind(this);
  }
  loadFunc(page) {
    this.props.getMorePoems(page);
  }
  render() {
    const { poems, allPoemsLoaded } = this.props;
    return (
      <div className="home-view">
        <InfiniteScroll
          loadMore={this.loadFunc}
          hasMore={!allPoemsLoaded}
          loader={<div className="loader">Loading ...</div>}
        >
          {
            poems && poems.reverse().map((poem, i) => ( // make oldest to newest
              poem && // TODO: remove this hack around null values when deleted
                <Poem poem={poem} key={i} />
            ))
          }
        </InfiniteScroll>
      </div>
    );
  }
}

IndexView.propTypes = {
  poems: React.PropTypes.array,
  getMorePoems: React.PropTypes.func,
  allPoemsLoaded: React.PropTypes.bool,
};

export default IndexView;
