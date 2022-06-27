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

  type Showtime {
    _id: ID!
    movie: Movie
    theater: Theater
    reservedSeats: [String]
    dateTime: String!
    language: String
  }

  type TheaterSeat {
    type: String!
    price: Int!
    rows: [String]
  }

  type Theater {
    _id: ID!
    name: String!
    location: String!
    seats: [TheaterSeat]
  }

  type MovieListPayload {
    data: [Movie]
  }

  type ShowtimeListPayload {
    data: [Showtime]
  }
`

const queries = /* GraphQL */ `
	getMovieList: MovieListPayload
	getMovieByID(_id: ID!): Movie
  getShowtimeListByMovie(movieID: ID!, dateString: String!): ShowtimeListPayload
  getShowtimeByID(_id: ID!): Showtime
  getTheaterByID(_id: ID!): Theater
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

    getShowtimeListByMovie: async (
      _,
      { movieID, dateString },
      { dataSources }
    ) => {
      const data = await showtimeController.getShowtimeListByMovie(
        dataSources.showtimeService,
        movieID,
        dateString
      )
      const movie = await showtimeController.getMovieByID(
        dataSources.showtimeService,
        movieID
      )
      const formattedData = data.map(async (item) => {
        const theater = await showtimeController.getTheaterByID(
          dataSources.showtimeService,
          item.theater
        )
        return { ...item, movie, theater }
      })
      return { data: formattedData }
    },

    getShowtimeByID: async (_, { _id }, { dataSources }) => {
      const data = await showtimeController.getShowtimeByID(
        dataSources.showtimeService,
        _id
      )
      const movie = await showtimeController.getMovieByID(
        dataSources.showtimeService,
        data.movie
      )
      const theater = await showtimeController.getTheaterByID(
        dataSources.showtimeService,
        data.theater
      )
      return { ...data, movie, theater }
    },

    getTheaterByID: async (_, { _id }, { dataSources }) => {
      return await showtimeController.getTheaterByID(
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
