import gql from "graphql-tag"
import { IPoem, IPagination } from "src/components/types"

export const POEM_LIMIT = 10

export const GET_POEMS = gql`
  query GetPoems($offset: Int!, $authorId: ID) {
    poems(limit: ${POEM_LIMIT}, offset: $offset, authorId: $authorId) {
      count
      hasMore
      items {
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
    }
  }
`

export type IGetPoemsResponse = { poems: IPagination<IPoem> }
export type IGetPoemsArgs = { offset: Number; authorId: Number }
