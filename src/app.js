import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { expressjwt } from 'express-jwt'
import { resolvers, typeDefs } from './app/schemas/rootSchema'
import UserService from './app/services/user'

const app = express()
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return { userService: new UserService() }
  },
  context: ({ req }) => {
    return {
      user: req.auth,
    }
  },
  formatError: (error) => {
    if (error.message === '400: Bad Request') {
      return new Error(error.extensions.response.body.errors[0].msg)
    }
    return error
  },
})

async function startServer() {
  await apolloServer.start()
  app.use(
    expressjwt({
      secret: process.env.JWT_SECRET,
      algorithms: ['HS256'],
      credentialsRequired: false,
    })
  )
  apolloServer.applyMiddleware({ app: app, path: '/graphql' })
}

startServer()

export { apolloServer }
export default app
