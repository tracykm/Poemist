import gql from "graphql-tag";
import { IPoem, IUser } from "src/components/types";

export const GET_SINGLE_POEM = gql`
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

export interface IGetSinglePoemResponse {
  poem: IPoem;
  current: IUser;
}

export const GET_BLANK_POEM = gql`
  {
    getBlankPoem {
      textChunks {
        isSelected
        text
      }
      passage
      book {
        author
        id
      }
    }
  }
`;

export interface IGetBlankPoem {
  getBlankPoem: Pick<IPoem, "textChunks" | "passage" | "book">;
}
