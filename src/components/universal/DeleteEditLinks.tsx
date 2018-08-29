import * as React from "react";
import { Link } from "react-router-dom";
import { Query, Mutation, QueryResult } from "react-apollo";
import gql from "graphql-tag";

const DELETE_POEM = gql`
  mutation DeletePoem($id: ID!) {
    deletePoem(id: $id) {
      id
    }
  }
`;

const GET_POEM_AUTHOR = gql`
  query GetSinglePoem($id: ID!) {
    poem(id: $id) {
      id
      author {
        id
      }
    }
    current {
      id
    }
  }
`;

interface IGetPoemAuthorResp {
  poem: {
    id: string;
    author: {
      id: string;
    };
  };
  current: {
    id: string;
  };
}

const DeleteEditLinksWData = ({ poemId }: { poemId: string }) => (
  <Query query={GET_POEM_AUTHOR} variables={{ id: poemId }}>
    {({ loading, error, data }: QueryResult<IGetPoemAuthorResp>) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      if (!data) return <p>No data</p>;
      return (
        <DeleteEditLinks
          isCurrentUser={
            data.current && data.current.id === data.poem.author.id
          }
          poemId={poemId}
        />
      );
    }}
  </Query>
);

const DeleteEditLinks = ({
  isCurrentUser,
  poemId,
}: {
  isCurrentUser: boolean;
  poemId: string;
}) => (
  <span className="delete-edit-links">
    {isCurrentUser && (
      <span>
        <Mutation mutation={DELETE_POEM} refetchQueries={["GetPoems"]}>
          {(deletePoem, { data }) => (
            <a
              href="#"
              onClick={() =>
                confirm("Are you sure you want to delete your poem?") &&
                deletePoem({ variables: { id: poemId } })
              }
            >
              delete
            </a>
          )}
        </Mutation>
        {" / "}
        <Link to={`/edit/write/${poemId}`}>edit</Link>
      </span>
    )}
  </span>
);

export default DeleteEditLinksWData;
