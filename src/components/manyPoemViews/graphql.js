import gql from 'graphql-tag'

export const POEM_LIMIT = 4

export const GET_POEMS = gql`
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
