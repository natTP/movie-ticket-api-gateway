const getUserList = async (userService) => {
  try {
    const response = await userService.getUserList()
    return response
  } catch (error) {
    // TODO : Handle error
    console.log(error)
  }
}

const getUserByID = async (userService, id) => {
  try {
    const response = await userService.getUserByID(id)
    return response
  } catch (error) {
    console.log(error)
  }
}

const getUserByEmail = async (userService, email) => {
  try {
    const response = await userService.getUserByEmail(email)
    return response[0]
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (userService, userData) => {
  try {
    const response = await userService.createUser(userData)
    return response
  } catch (error) {
    console.log(error)
  }
}

export default {
  getUserList,
  getUserByID,
  getUserByEmail,
  createUser,
}
