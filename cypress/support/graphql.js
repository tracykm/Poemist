import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { graphql } from 'graphql'
// Your schema in SDL format exported as a string
import typeDefs from '../schema'

const schema = makeExecutableSchema({ typeDefs })
addMockFunctionsToSchema({ schema })

export function runQuery(query, variables) {
  return graphql(schema, query, {}, {}, variables)
}
