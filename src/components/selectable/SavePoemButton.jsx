import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import React from 'react'
import getSelectedTexts from 'src/utils/getSelectedTexts'
import { withRouter } from 'react-router-dom'

const CREATE_POEM = gql`
  mutation createPoem($passage: String!, $textChunks: [TextChunkInput]!) {
    createPoem(
      backgroundId: 1
      colorRange: 1
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

const UPDATE_POEM = gql`
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
      textChunks {
        text
        isSelected
      }
    }
  }
`

const SavePoemButton = ({ history, poem, match, children, styleView }) => (
  <Mutation mutation={match.params.id ? UPDATE_POEM : CREATE_POEM}>
    {(savePoem, { data, loading }) => {
      if (loading) return <div>saving</div>
      return children({
        onClick: () => {
          savePoem({
            variables: {
              textChunks: poem.wordLetters
                ? getSelectedTexts(poem.wordLetters)
                : poem.textChunks.map(t => ({
                    isSelected: t.isSelected,
                    text: t.text,
                  })),
              id: poem && poem.id && Number(poem.id),
              passage: poem.passage,
              backgroundId: poem.backgroundId,
              colorRange: poem.colorRange,
            },
          }).then(res => {
            const newPoem = res.data.createPoem || res.data.updatePoem
            if (styleView) {
              history.push(`/`)
            } else {
              history.push(`/edit/stylize/${newPoem.id}`)
            }
          })
        },
      })
    }}
  </Mutation>
)

export default withRouter(SavePoemButton)
