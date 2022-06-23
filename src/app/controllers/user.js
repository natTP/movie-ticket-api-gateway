const getUserList = async (userService) => {
  try {
    const response = await userService.getUserList()
    return response
  } catch (error) {
    // TODO : how to make error message show here
    throw error
  }
}

const getUserByID = async (userService, id) => {
  try {
    const response = await userService.getUserByID(id)
    return response
  } catch (error) {
    throw error
  }
}

const getUserByEmail = async (userService, email) => {
  try {
    const response = await userService.getUserByEmail(email)
    return response[0]
  } catch (error) {
    throw error
  }
}

const createUser = async (userService, userData) => {
  try {
    const response = await userService.createUser(userData)
    return response
  } catch (error) {
    throw error
  }
}

export default {
  getUserList,
  getUserByID,
  getUserByEmail,
  createUser,
}
