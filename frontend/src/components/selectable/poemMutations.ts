import gql from "graphql-tag"
import { IPoem, ITextChunk } from "../types"

export const CREATE_POEM = gql`
  mutation createPoem(
    $passage: String!
    $textChunks: [TextChunkInput]!
    $backgroundId: Int!
    $colorRange: Int!
  ) {
    createPoem(
      backgroundId: $backgroundId
      colorRange: $colorRange
      bookId: 1
      passage: $passage
      textChunks: $textChunks
    ) {
      id
      textChunks {
        text
        isSelected
      }
    }
  }
`

export interface ICreatePoemResp {
  createPoem: IPoem
}

export interface ICreatePoemArgs {
  passage: string
  textChunks: ITextChunk
}

export const UPDATE_POEM = gql`
  mutation updatePoem(
    $textChunks: [TextChunkInput]!
    $id: ID!
    $backgroundId: Int
    $colorRange: Int
  ) {
    updatePoem(
      textChunks: $textChunks
      id: $id
      backgroundId: $backgroundId
      colorRange: $colorRange
    ) {
      id
      backgroundId
      colorRange
      textChunks {
        text
        isSelected
      }
    }
  }
`

export interface IUpdatePoemResp {
  updatePoem: IPoem
}

export interface ICreatePoemArgs {
  textChunks: ITextChunk
  id?: string
  backgroundId: Number
  colorRange: Number
}
