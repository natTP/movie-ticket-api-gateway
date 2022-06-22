import { URL_USER_SERVICE } from '../config'
import { RESTDataSource } from 'apollo-datasource-rest'

class UserService extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = URL_USER_SERVICE
  }

  async getUserList() {
    return this.get('/users')
  }

  async getUserByID(ID) {
    return this.get(`/users/${encodeURIComponent(ID)}`)
  }

  async getUserByEmail(email) {
    return this.get(`/users/email/${encodeURIComponent(email)}`)
  }

  async createUser(userData) {
    return this.post('/users', userData)
  }
}

export default UserService
