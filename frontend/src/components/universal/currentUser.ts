import gql from "graphql-tag";
import { IUser } from "src/components/types";

export const CURRENT_USER = gql`
  query getCurrentUser {
    current {
      id
      username
      sessionToken
    }
  }
`;

export type ICurrentResponse = { current: IUser };
