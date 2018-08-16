import gql from "graphql-tag";

const CURRENT_USER = gql`
  query getCurrentUser {
    current {
      id
      username
      sessionToken
    }
  }
`;

export default CURRENT_USER;
