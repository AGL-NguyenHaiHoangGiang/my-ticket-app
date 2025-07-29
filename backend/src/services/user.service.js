'use strict'
const userRepository = require('../models/repositories/user.repository')
const bcrypt = require('bcrypt');
const { BadRequestError, ConflictRequestError } = require('../core/error.response')
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

  // Update user by manager
  static async updateUser(userId, payload) {
    // Hash password if provided
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10)
    }

    // Check email uniqueness if changed
    if (payload.email) {
      const existingUser = await userRepository.findUserByEmail({ 
        email: payload.email 
      })
      if (existingUser) {
        throw new ConflictRequestError('Email already exists')
      }
      payload.email = payload.email.toLowerCase()
    }

    return await userRepository.updateUserById({ userId, updateData: payload })
  }

  // Deactivate user
  static async deactivateUser(userId) {
    return await userRepository.updateUserById({ 
      userId, 
      updateData: { status: 'INACTIVE' } 
    })
  }

  // Activate user
  static async activateUser(userId) {
    return await userRepository.updateUserById({ 
      userId, 
      updateData: { status: 'ACTIVE' } 
    })
  }
}

module.exports = UserService
