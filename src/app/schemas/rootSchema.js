import { gql } from 'apollo-server-express'
import { merge } from 'lodash'

const moduleTypeDefs = []

const moduleQueries = []

const moduleMutations = []

const typeDefs = gql`
  ${moduleTypeDefs.join('\n')}

  type Query {
    ${moduleQueries.join('\n')}
  }

  type Mutation {
    ${moduleMutations.join('\n')}
  }

  schema {
    query: Query,
    mutation: Mutation
  }
`

const resolvers = merge(product.resolvers)

export { typeDefs, resolvers }
