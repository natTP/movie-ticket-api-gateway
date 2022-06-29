import { AuthenticationError } from 'apollo-server-express'
import userController from '../controllers/user'
import showtimeController from '../controllers/showtime'
import reservationController from '../controllers/reservation'

const typeDefs = /* GraphQL */ `
  type Reservation {
    _id: ID!
    user: User
    showtime: Showtime
    seats: [String]
    price: Int
  }

  input ReservationInput {
    user: String!
    showtime: String!
    seats: [String]
    price: Int!
  }

  type ReservationListPayload {
    data: [Reservation]
  }

  type ResponsePayload {
    reservationID: String
  }
`

const queries = /* GraphQL */ `
	getReservationByID(_id: ID!): Reservation
	getReservationListByUser(userID: ID!): ReservationListPayload
`

const mutations = /* GraphQL */ `
	createReservation(input: ReservationInput!): ResponsePayload
`

const resolvers = {
  Query: {
    getReservationByID: async (_, { _id }, { dataSources }) => {
      const data = await reservationController.getReservationByID(
        dataSources.reservationService,
        _id
      )
      const user = await userController.getUserByID(
        dataSources.userService,
        data.user
      )
      const showtime = await showtimeController.getShowtimeByID(
        dataSources.showtimeService,
        data.showtime
      )
      const movie = await showtimeController.getMovieByID(
        dataSources.showtimeService,
        showtime.movie
      )
      const theater = await showtimeController.getTheaterByID(
        dataSources.showtimeService,
        showtime.theater
      )
      return { ...data, user, showtime: { ...showtime, movie, theater } }
    },

    getReservationListByUser: async (_, { userID }, { dataSources, user }) => {
      const data = await reservationController.getReservationListByUser(
        dataSources.reservationService,
        userID
      )
      const reqUser = await userController.getUserByID(
        dataSources.userService,
        userID
      )
      const formattedData = data.map(async (item) => {
        const showtime = await showtimeController.getShowtimeByID(
          dataSources.showtimeService,
          item.showtime
        )
        const movie = await showtimeController.getMovieByID(
          dataSources.showtimeService,
          showtime.movie
        )
        const theater = await showtimeController.getTheaterByID(
          dataSources.showtimeService,
          showtime.theater
        )
        return {
          ...item,
          user: reqUser,
          showtime: { ...showtime, movie, theater },
        }
      })
      return { data: formattedData }
    },
  },

  Mutation: {
    createReservation: async (_, { input }, { dataSources, user }) => {
      if (!user) throw new AuthenticationError('You must be logged in.')

      const { showtime, seats, price } = input
      const reservation = await reservationController.createReservation(
        dataSources.reservationService,
        { user: input.user, showtime, seats: Array.from(seats), price }
      )

      const { reservedSeats } = await showtimeController.getShowtimeByID(
        dataSources.showtimeService,
        showtime
      )
      await showtimeController.updateShowtimeReservedSeats(
        dataSources.showtimeService,
        showtime,
        { reservedSeats: [...reservedSeats, ...Array.from(seats)] }
      )

      return { reservationID: reservation._id }
    },
  },
}

export default {
  typeDefs,
  queries,
  mutations,
  resolvers,
}
