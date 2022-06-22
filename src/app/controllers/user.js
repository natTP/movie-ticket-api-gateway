import userService from '../services/user'

const getUserList = async () => {
  try {
    const response = await userService.getUserList()
    return response
  } catch (error) {
    // TODO : Handle error
    console.log(error)
  }
}

const getUserByID = async (id) => {
  try {
    const response = await userService.getUserByID(id)
    return response
  } catch (error) {
    console.log(error)
  }
}

const getUserByEmail = async (email) => {
  try {
    const response = await userService.getUserByEmail(email)
    return response
  } catch (error) {
    console.log(error)
  }
}

const createUser = async (userData) => {
  try {
    const response = await userService.createUser({ ...userData })
    return response
  } catch (error) {
    console.log(error)
  }
}

// const updateUser = async (id, userData) => {
//   try {
//     const response = await userService.updateUser(id, { ...userData })
//     return response
//   } catch (error) {
//     console.log(error)
//   }
// }

// const deleteUser = async (id) => {
//   try {
//     const response = await userService.deleteUser(id)
//     return response
//   } catch (error) {
//     console.log(error)
//   }
// }

export default {
  getUserList,
  getUserByID,
  getUserByEmail,
  createUser,
}
