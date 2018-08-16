import * as React from "react";
import Poem from "src/components/poem/Poem";
import InfiniteScroll from "react-infinite-scroller";
import { Query } from "react-apollo";
import { GET_POEMS } from "./graphql";
import { last } from "lodash";
import styled from "styled-components";
import { IPoem } from "src/components/types";
import { ApolloQueryResult } from "apollo-boost";

const PoemContainerDiv = styled.div`
  margin: auto;
`;

const IndexView = ({
  poems,
  allPoemsLoaded,
  loadMore
}: {
  poems: IPoem[];
  allPoemsLoaded: boolean;
  loadMore: () => Promise<ApolloQueryResult<IPoem[]>>;
}) => {
  return (
    <PoemContainerDiv>
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
    </PoemContainerDiv>
  );
};

class IndexViewWData extends React.PureComponent<{ userId?: number }> {
  render() {
    return (
      <Query
        query={GET_POEMS}
        variables={{
          offset: 0,
          authorId: this.props.userId
        }}
        notifyOnNetworkStatusChange
        fetchPolicy="cache-and-network"
      >
        {({ error, data, fetchMore }) => {
          if (!data.poems) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return (
            <IndexView
              poems={data.poems.items}
              allPoemsLoaded={!data.poems.hasMore}
              loadMore={() => {
                console.log("fetchmore", data.poems.items.length);
                return fetchMore({
                  variables: {
                    offset: data.poems.items.length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    if (
                      (last(prev.poems.items) || ({} as any)).id ===
                      (last(fetchMoreResult.poems.items) || ({} as any)).id
                    ) {
                      return prev; // getting double called randomly
                    }
                    console.log(
                      fetchMoreResult.poems.items.map(p => p.id),
                      fetchMoreResult
                    );
                    return Object.assign({}, prev, {
                      poems: {
                        ...fetchMoreResult.poems,
                        items: [
                          ...prev.poems.items,
                          ...fetchMoreResult.poems.items
                        ]
                      }
                    });
                  }
                });
              }}
            />
          );
        }}
      </Query>
    );
  }
}

export default IndexViewWData;
