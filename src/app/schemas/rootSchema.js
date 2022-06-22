import { gql } from 'apollo-server-express'
import { merge } from 'lodash'
import user from './user'

const moduleTypeDefs = [user.typeDefs]

const moduleQueries = [user.queries]

const moduleMutations = [user.mutations]

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

const resolvers = merge(user.resolvers)

export { typeDefs, resolvers }
