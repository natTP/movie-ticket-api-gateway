const getReservationList = async (reservationService) => {
  try {
    const response = await reservationService.getReservationList()
    return response
  } catch (error) {
    throw error
  }
}

const getReservationByID = async (reservationService, id) => {
  try {
    const response = await reservationService.getReservationByID(id)
    return response
  } catch (error) {
    throw error
  }
}

const getReservationListByUser = async (reservationService, userID) => {
  try {
    const response = await reservationService.getReservationListByUser(userID)
    return response
  } catch (error) {
    throw error
  }
}

const createReservation = async (reservationService, reservationData) => {
  try {
    const response = await reservationService.createReservation(reservationData)
    return response
  } catch (error) {
    throw error
  }
}

export default {
  getReservationList,
  getReservationByID,
  getReservationListByUser,
  createReservation,
}
