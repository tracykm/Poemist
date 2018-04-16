import React from 'react'
// import { Link } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const DELETE_POEM = gql`
  mutation DeletePoem($id: ID!) {
    deletePoem(id: $id) {
      id
      passage
    }
  }
`

const GetPoemAuthor = gql`
  query GetSinglePoem($id: ID!) {
    poem(id: $id) {
      id
      authorId
    }
    current {
      id
    }
  }
`

const DeleteEditLinksWData = ({ poemId }) => (
  <Query query={GetPoemAuthor} variables={{ id: Number(poemId) }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error :(</p>
      return (
        <DeleteEditLinks
          isCurrentUser={data.current && data.current.id === data.poem.authorId}
          poemId={poemId}
        />
      )
    }}
  </Query>
)

const GET_POEMS = gql`
  query GetPoems($offset: Int!, $authorId: Int) {
    poems(limit: 4, offset: $offset, authorId: $authorId) {
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

const DeleteEditLinks = ({ isCurrentUser, poemId }) => (
  <div className="delete-edit-links">
    {isCurrentUser && (
      <span>
        <Mutation
          mutation={DELETE_POEM}
          update={(cache, { data: { deletePoem } }) => {
            const { poems } = cache.readQuery({
              query: GET_POEMS,
              variables: { offset: 0 },
            })
            cache.writeQuery({
              query: GET_POEMS,
              variables: { offset: 0 },
              data: { poems: poems.filter(p => p.id !== deletePoem.id) },
            })
          }}
        >
          {(deletePoem, { data }) => (
            <a
              href="#"
              onClick={() =>
                confirm('Are you sure you want to delete your poem?') &&
                deletePoem({ variables: { id: poemId } })
              }
            >
              delete
            </a>
          )}
        </Mutation>
        {/* <Link to={`edit/write/${poemId}`}>edit</Link> */}
      </span>
    )}
  </div>
)
export default DeleteEditLinksWData
