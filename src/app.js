import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { expressjwt } from 'express-jwt'
import { resolvers, typeDefs } from './app/schemas/rootSchema'

const app = express()
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      user: req.auth,
    }
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
