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

const getShowtimeListByMovie = async (showtimeService, movieID) => {
  try {
    const response = await showtimeService.getShowtimeListByMovie(movieID)
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
  getTheaterByID,
}
