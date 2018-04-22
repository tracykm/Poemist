import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import React from 'react'
import getSelectedTexts from 'src/utils/getSelectedTexts'

const CREATE_POEM = gql`
  mutation createPoem($passage: String!, $textChunks: [TextChunkInput]!) {
    createPoem(
      backgroundId: 1
      colorRange: 1
      bookId: 1
      authorId: 1
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

const SavePoemButton = ({ passage, wordLetters }) => {
  const t = getSelectedTexts(wordLetters)
  console.log(t)
  return (
    <Mutation mutation={CREATE_POEM}>
      {createPoem => (
        <a
          href="#"
          onClick={() => createPoem({ variables: { textChunks: t, passage } })}
        >
          save
        </a>
      )}
    </Mutation>
  )
}

export default SavePoemButton
