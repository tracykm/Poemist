import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  // MockList,
} from 'graphql-tools'
import { graphql } from 'graphql'
import { random } from 'lodash'
import typeDefs from '../schema'
import poems from '../fixtures/poems'
// import getBlankPoem from '../fixtures/blankPoem'
// import text from '../fixtures/text'

const schema = makeExecutableSchema({ typeDefs })
addMockFunctionsToSchema({
  schema,
  mocks: {
    Int: () => random(100),
    // getBlankPoem: () => getBlankPoem,
    Poem: () => {
      // debugger
      return poems[random(2)]
    },
    // TextChunk: () => ({
    //   text: text.slice(random(text.length), random(text.length)),
    //   isSelected: random(1) / 2 === 0,
    // }),
    // Poem: () => ({
    //   // a list of length between 2 and 6 (inclusive)
    //   textChunks: () => new MockList([5, 20]),
    // }),
  },
})

export function runQuery(query, variables) {
  return graphql(schema, query, {}, {}, variables)
}
