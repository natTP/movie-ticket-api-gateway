import app, { apolloServer } from './app'
import { NODE_PORT } from './app/config'

const port = NODE_PORT || 8080

app.listen(port, (err) => {
  if (err) console.log('Error in server setup!')
  console.log(`Server running at port ${port}${apolloServer.graphqlPath}`)
})
