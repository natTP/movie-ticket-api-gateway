import showtimeController from '../controllers/showtime'

const typedefs = /* GraphQL */ `
  type Movie {
    _id: ID!
    name: String!
    releaseDate: String
    poster: String
    duration: Int
    genre: [String]
    synopsis: String
  }

  type MovieListPayload {
    data: [Movie]
  }
`

const queries = /* GraphQL */ `
	getMovieList: MovieListPayload
	getMovieByID(_id: ID!): Movie
`

const resolvers = {
  Query: {
    getMovieList: async (_, args, { dataSources }) => {
      const data = await showtimeController.getMovieList(
        dataSources.showtimeService
      )
      return { data }
    },
    getMovieByID: async (_, { _id }, { dataSources }) => {
      return await showtimeController.getMovieByID(
        dataSources.showtimeService,
        _id
      )
    },
  },
}

export default {
  typedefs,
  queries,
  resolvers,
}
