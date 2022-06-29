import { gql } from 'apollo-server-express'
import { merge } from 'lodash'
import user from './user'
import showtime from './showtime'
import reservation from './reservation'

const moduleTypeDefs = [user.typeDefs, showtime.typeDefs, reservation.typeDefs]

const moduleQueries = [user.queries, showtime.queries, reservation.queries]

const moduleMutations = [user.mutations, reservation.mutations]

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

const resolvers = merge(
  user.resolvers,
  showtime.resolvers,
  reservation.resolvers
)

export { typeDefs, resolvers }
