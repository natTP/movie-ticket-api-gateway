import { RESTDataSource } from 'apollo-datasource-rest'
import { URL_RESERVATION_SERVICE } from '../config'

class ReservationService extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = URL_RESERVATION_SERVICE
  }

  async getReservationList() {
    return this.get('/reservations')
  }

  async getReservationByID(ID) {
    return this.get(`/reservations/${encodeURIComponent(ID)}`)
  }

  async getReservationListByUser(userID) {
    return this.get(`/reservations/user/${encodeURIComponent(userID)}`)
  }

  async createReservation(reservationData) {
    return this.post('/reservations', reservationData)
  }
}

export default ReservationService
