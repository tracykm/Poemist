import gql from "graphql-tag";
import { IUser } from "src/components/types";

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

export type ICurrentResponse = { current: IUser };
