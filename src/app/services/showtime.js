import { RESTDataSource } from 'apollo-datasource-rest'
import { URL_SHOWTIME_SERVICE } from '../config'

class ShowtimeService extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = URL_SHOWTIME_SERVICE
  }

  async getMovieList() {
    return this.get('/movies')
  }

  async getMovieByID(ID) {
    return this.get(`/movies/${encodeURIComponent(ID)}`)
  }

  async getShowtimeListByMovie(movieID, dateString) {
    return this.get(
      `/showtimes/movie/${encodeURIComponent(
        movieID
      )}?date=${encodeURIComponent(dateString)}`
    )
  }

  async getShowtimeByID(ID) {
    return this.get(`/showtimes/${encodeURIComponent(ID)}`)
  }

  async updateShowtimeReservedSeats(ID, seatData) {
    return this.patch(`/showtimes/${encodeURIComponent(ID)}`, seatData)
  }

  async getTheaterByID(ID) {
    return this.get(`/theaters/${encodeURIComponent(ID)}`)
  }
}

export default ShowtimeService
