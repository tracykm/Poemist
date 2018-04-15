import PropTypes from 'prop-types';
import React from 'react'
import Poem from 'src/components/poem/Poem.jsx'
import InfiniteScroll from 'react-infinite-scroller'
import { Query } from "react-apollo";
import gql from "graphql-tag";

import './_indexView.scss'

class IndexView extends React.Component {
  render() {
    const { poems, allPoemsLoaded } = this.props
    // console.log(poems.map(a => a.id))
    return (
      <div className="index-view">
        <InfiniteScroll
          initialLoad={false}
          threshold={0}
          pageStart={0}
          className="poems-container"
          loadMore={this.props.getMorePoems}
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



const POEM_LIMIT = 4;

const GetPoems = gql`
  query GetPoems($offset: Int!, $authorId: Int) {
    poems(limit: ${POEM_LIMIT}, offset: $offset, authorId: $authorId) {
      id
      styleId
      backgroundId
      colorRange
      textChunks {
        text
        isSelected
      }
      author
      authorId
      createdAt
      updatedAt
    }
  }
`

class IndexViewWData extends React.PureComponent {
  state = {
    allPoemsLoaded: false
  }
  getMorePoems = () => {
    this.setState({ offset: this.state.offset + 10 })
  }
  render() {
    return (
      <Query
        query={GetPoems}
        variables={{
          offset: 0,
          authorId: this.props.userId
        }}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data, fetchMore }) => {
          if (!data.poems) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <IndexView
              poems={data.poems}
              allPoemsLoaded={this.state.allPoemsLoaded}
              getMorePoems={(page) => {
                const that = this
                return fetchMore({
                  variables: {
                    offset: data.poems.length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (fetchMoreResult.poems.length < POEM_LIMIT) that.setState({ allPoemsLoaded: true })
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      poems: [...prev.poems, ...fetchMoreResult.poems]
                    });
                  }
                })
              }}
            />)
        }}
      </Query>)
  }
}

export default IndexViewWData
