import { gql } from 'apollo-server-express'
import { merge } from 'lodash'
import showtime from './showtime'
import user from './user'

const moduleTypeDefs = [user.typeDefs, showtime.typedefs]

const moduleQueries = [user.queries, showtime.queries]

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

const resolvers = merge(user.resolvers, showtime.resolvers)

export { typeDefs, resolvers }
