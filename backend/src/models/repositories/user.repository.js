const userModel = require('../user.model')

// Find all user customer
const findAllUsers = async ({ limit, sort, page, filter, select }) => {
  const skip = (page - 1) * limit
  const sortBy = sort === 'ctime' ? { createAt: -1 } : { createAt: 1 }

  return await userModel
    .find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(select)
    .lean()
}

// Find user by ID
const findUserById = async ({ userId, select = '-password' }) => {
  const user = await userModel.findById(userId).select(select).lean()

  if (!user) {
    throw new BadRequestError(`User not found with ID: ${userId}`)
  }

  return user
}

// Find user by email
const findUserByEmail = async ({ email }) => {
  return await userModel.findOne({ email }).select('-password').lean()
}

// Update user by ID
const updateUserById = async ({ userId, updateData }) => {
  const user = await userModel
    .findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
    .select('-password')

  if (!user) {
    throw new BadRequestError(`User not found with ID: ${userId}`)
  }

  return user
}

module.exports = {
  findAllUsers,
  findUserById,
}
