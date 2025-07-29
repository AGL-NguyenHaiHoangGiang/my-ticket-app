'use strict'
const userService = require('../services/user.service')

const { OK } = require('../core/success.response')

class UserController {
  //GET
  getAllUsers = async (req, res, next) => {
    new OK({
      message: 'List all user success',
      metadata: await userService.findAllUsers(req.query),
    }).send(res)
  }

  // Get user by ID
  getUserById = async (req, res, next) => {
    const requestedUserId = req.params.id
    const currentUserId = req.user?.userId
    const userRoles = req.user?.roles

    // Check if user own or has MANAGER role
    const isOwner = currentUserId === requestedUserId
    const isManager = userRoles.includes('MANAGER')

    if (!isOwner && !isManager) {
      return res.status(403).json({
        message: 'Access denied',
      })
    }

    new OK({
      message: 'Get user success',
      metadata: await userService.findUserById({ userId: req.params.id }),
    }).send(res)
  }

  // Update user by manager
  updateUser = async (req, res, next) => {
    new OK({
      message: 'Update user success',
      metadata: await userService.updateUser(req.params.id, req.body),
    }).send(res)
  }

  // Deactivate user
  deactivateUser = async (req, res, next) => {
    new OK({
      message: 'Deactivate user success',
      metadata: await userService.deactivateUser(req.params.id),
    }).send(res)
  }

  // Activate user
  activateUser = async (req, res, next) => {
    new OK({
      message: 'Activate user success',
      metadata: await userService.activateUser(req.params.id),
    }).send(res)
  }
}

module.exports = new UserController()
