import gql from "graphql-tag";

const GET_SINGLE_POEM = gql`
  query GetSinglePoem($id: ID!) {
    poem(id: $id) {
      id
      styleId
      backgroundId
      colorRange
      textChunks {
        text
        isSelected
      }
      author {
        id
        username
      }
      createdAt
      updatedAt
    }
    current {
      id
    }
  }
`;

export default GET_SINGLE_POEM;
