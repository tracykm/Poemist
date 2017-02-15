import React from 'react';
import Poem from 'src/components/poem/Poem.jsx';
import InfiniteScroll from 'react-infinite-scroller';

import './_indexView.scss';

class IndexView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [] }
    this.loadFunc = this.loadFunc.bind(this);
  }
  loadFunc() {
    this.state.list.push(this.state.list.length);
    this.setState({ list: this.state.list });
  }
  render() {
    return (
      <div className="home-view">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadFunc}
          hasMore={true}
          loader={<div className="loader">Loading ...</div>}
          >
          {this.state.list.map(item => <div key={item}>{item}</div>)}
        </InfiniteScroll>
      </div>
    )
  }
}

export default IndexView;
