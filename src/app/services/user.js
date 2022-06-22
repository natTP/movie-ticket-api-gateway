import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

// TODO : Change from mock to actual service request

const users = [
  {
    _id: '1',
    email: 'ohmy@gmail.com',
    password: '$2b$10$bi8BiTSOyWutcm/MdUZ.1ev2Ky63pewSbSk5Lp.p9zUNGYVtaBXZK',
  },
]

const getUserList = () => {
  return { data: users }
}

const getUserByEmail = (email) => {
  const response = users.find((x) => x.email === email)
  return { data: response }
}

const getUserByID = (id) => {
  const response = users.find((x) => x._id === id)
  return { data: response }
}

const createUser = (userData) => {
  const response = { _id: uuidv4(), ...userData }
  users.push(response)
  return { data: response }
}

// const updateUser = (id, userData) => {
//   const oldData = users.find((x) => x._id === id)
//   Object.assign(oldData, { ...userData })
//   return {
//     httpCode: '201',
//     message: `${oldData?.name} has been updated.`,
//   }
// }

// const deleteUser = (id) => {
//   const response = users.find((x) => x._id === id)
//   const index = users
//     .map((x) => {
//       return x._id
//     })
//     .indexOf(id)
//   if (response) users.splice(index, 1)
//   return {
//     httpCode: '204',
//     message: `${response?.name} has been deleted.`,
//   }
//}

export default {
  getUserList,
  getUserByID,
  getUserByEmail,
  createUser,
}
