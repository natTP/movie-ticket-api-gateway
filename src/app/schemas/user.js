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
    me: async (_, args, { user }) => {
      if (!user) throw new Error('You are not authenticated!')
      const { data } = await userController.getUserByID(user._id)
      return data
    },
  },

  Mutation: {
    register: async (_, { input }) => {
      const { email, password } = input

      if (password.length < 8) throw new Error('Password not secure enough!')

      const user = await userController.createUser({
        email,
        password: await bcrypt.hash(password, 10),
      })

      // TODO : Handle user already created message received from service

      return {
        token: JWTtoken.sign(
          { _id: user.data._id, email: user.data.email },
          process.env.JWT_SECRET,
          { expiresIn: '1 day' }
        ),
      }
    },
    login: async (_, { input }) => {
      const { email, password } = input

      const user = await userController.getUserByEmail(email)
      if (!user) throw new Error('No user by that email!')

      const valid = await bcrypt.compare(password, user.data.password)
      if (!valid) throw new Error('Incorrect password')

      return {
        token: JWTtoken.sign(
          { _id: user.data._id, email: user.data.email },
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
