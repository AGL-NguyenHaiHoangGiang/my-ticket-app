'use strict'
const userRepository = require('../models/repositories/user.repository')

class UserService {
  // Find all users
  static async findAllUsers({
    limit = 10,
    sort = 'ctime',
    page = 1,
    select = ['-password'],
    status, //Filter ACTIVE OR INACTIVE
  }) {
    //Convert into array
    let selectFields = select
    if (typeof select === 'string') {
      selectFields = select.split(',').map((field) => field.trim())
    }

    const filter = {}
    if (status) filter.status = status

    return await userRepository.findAllUsers({
      limit,
      sort,
      page,
      filter,
      select: selectFields,
    })
  }

  // Find user by ID
  static async findUserById({ userId }) {
    return await userRepository.findUserById({ userId })
  }
}

module.exports = UserService
