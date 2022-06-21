import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { resolvers, typeDefs } from './app/schemas/rootSchema'

const app = express()
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    products: new Products(productModel),
  }),
})

async function startServer() {
  await apolloServer.start()
  apolloServer.applyMiddleware({ app: app, path: '/graphql' })
}

startServer()

export { apolloServer }
export default app
