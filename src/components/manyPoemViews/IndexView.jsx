import React from 'react'
import Poem from 'src/components/poem/Poem.jsx'
import InfiniteScroll from 'react-infinite-scroller'
import { Query } from 'react-apollo'
import { GET_POEMS, POEM_LIMIT } from './graphql'

import './_indexView.scss'

const IndexView = ({ poems, allPoemsLoaded, loadMore }) => {
  return (
    <div className="index-view">
      <InfiniteScroll
        initialLoad={false}
        threshold={0}
        pageStart={0}
        className="poems-container"
        loadMore={loadMore}
        hasMore={!allPoemsLoaded}
        loader={<div className="loader">Loading ...</div>}
      >
        {poems && poems.map(poem => <Poem poem={poem} key={poem.id} />)}
      </InfiniteScroll>
    </div>
  )
}

class IndexViewWData extends React.PureComponent {
  state = {
    allPoemsLoaded: false,
  }
  getMorePoems = () => {
    this.setState({ offset: this.state.offset + 10 })
  }
  render() {
    return (
      <Query
        query={GET_POEMS}
        variables={{
          offset: 0,
          authorId: this.props.userId,
        }}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
      >
        {({ error, data, fetchMore }) => {
          if (!data.poems) return <p>Loading...</p>
          if (error) return <p>Error :(</p>

          return (
            <IndexView
              poems={data.poems.items}
              allPoemsLoaded={this.state.allPoemsLoaded}
              loadMore={() => {
                const that = this
                return fetchMore({
                  variables: {
                    offset: data.poems.items.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (fetchMoreResult.poems.length < POEM_LIMIT) {
                      that.setState({ allPoemsLoaded: true })
                    }
                    if (!fetchMoreResult) return prev
                    return Object.assign({}, prev, {
                      poems: [...prev.poems, ...fetchMoreResult.poems],
                    })
                  },
                })
              }}
            />
          )
        }}
      </Query>
    )
  }
}

export default IndexViewWData
