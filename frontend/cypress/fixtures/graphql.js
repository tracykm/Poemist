import poems from './poems.js'
import blankPoem from './blankPoem.js'

const graphql = {
  data: {
    current: {
      id: 11,
      username: 'la',
      sessionToken: 'wpC-mFOUCIks6lFfah03-w',
      __typename: 'User',
    },
    getBlankPoem: blankPoem,
    poem: poems[0],
    createPoem: {
      id: 114,
      textChunks: poems[0].textChunks,
      __typename: 'Poem',
    },
    updatePoem: poems[0],
    poems,
  },
}

export default graphql
