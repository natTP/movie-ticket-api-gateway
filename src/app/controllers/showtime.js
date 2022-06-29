const getMovieList = async (showtimeService) => {
  try {
    const response = await showtimeService.getMovieList()
    return response
  } catch (error) {
    throw error
  }
}

const getMovieByID = async (showtimeService, id) => {
  try {
    const response = await showtimeService.getMovieByID(id)
    return response
  } catch (error) {
    throw error
  }
}

const getShowtimeListByMovie = async (showtimeService, movieID, dateString) => {
  try {
    const response = await showtimeService.getShowtimeListByMovie(
      movieID,
      dateString
    )
    return response
  } catch (error) {
    throw error
  }
}

const getShowtimeByID = async (showtimeService, id) => {
  try {
    const response = await showtimeService.getShowtimeByID(id)
    return response
  } catch (error) {
    throw error
  }
}

const updateShowtimeReservedSeats = async (showtimeService, id, seatData) => {
  try {
    const response = await showtimeService.updateShowtimeReservedSeats(
      id,
      seatData
    )
    return response
  } catch (error) {
    throw error
  }
}

const getTheaterByID = async (showtimeService, id) => {
  try {
    const response = await showtimeService.getTheaterByID(id)
    return response
  } catch (error) {
    throw error
  }
}

export default {
  getMovieList,
  getMovieByID,
  getShowtimeListByMovie,
  getShowtimeByID,
  updateShowtimeReservedSeats,
  getTheaterByID,
}
