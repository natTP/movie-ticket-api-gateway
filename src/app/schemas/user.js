import { AuthenticationError } from 'apollo-server-express'
import bcrypt from 'bcrypt'
import JWTtoken from 'jsonwebtoken'
import userController from '../controllers/user'

const typeDefs = `
	type User {
		_id: ID!
		email: String!
		password: String!
		# reservations: [Reservation]
	}

	input UserInput {
		email: String!
		password: String!
	}

	type AuthPayload {
		token: String!
	}
`

const queries = `
	me: User
`

const mutations = `
	register(input: UserInput): AuthPayload
	login(input: UserInput): AuthPayload
`

const resolvers = {
  Query: {
    me: async (_, args, { dataSources, user }) => {
      if (!user) throw new AuthenticationError('You must be logged in.')
      return await userController.getUserByID(dataSources.userService, user._id)
    },
  },

  Mutation: {
    register: async (_, { input }, { dataSources }) => {
      const { email, password } = input

      if (password.length < 8)
        throw new Error('Password must be at least 8 characters long.')

      const user = await userController.createUser(dataSources.userService, {
        email,
        password: await bcrypt.hash(password, 10),
      })

      return {
        token: JWTtoken.sign(
          { _id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1 day' }
        ),
      }
    },
    login: async (_, { input }, { dataSources }) => {
      const { email, password } = input

      const user = await userController.getUserByEmail(
        dataSources.userService,
        email
      )
      if (!user) throw new Error('No user by that email.')

      const valid = await bcrypt.compare(password, user.password)
      if (!valid) throw new Error('Incorrect password.')

      return {
        token: JWTtoken.sign(
          { _id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1 day' }
        ),
      }
    },
  },
}

export default {
  typeDefs,
  queries,
  mutations,
  resolvers,
}
