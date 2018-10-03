const User = require('../model/user');

const { ERROR_MESSAGES } = require('../../../config');

module.exports = {
  createUser: async (payload) => {
    try {
      if ((await User.findOne({ username: payload.username }))) {
        throw new Error(ERROR_MESSAGES.USER.USERNAME.ALREADY_EXISTS);
      }
      if ((await User.findOne({ email: payload.email }))) {
        throw new Error(ERROR_MESSAGES.USER.EMAIL.ALREADY_EXISTS);
      }
      return await User.create(payload);
    } catch (err) {
      throw err;
    }
  },

  getUsers: async (includePassword) => {
    try {
      return (await User.find({})).select(
        includePassword ? '' : '-password',
      );
    } catch (err) {
      throw err;
    }
  },

  getUserById: async (id, includePassword) => (await User.findOne({ id })).select(`${includePassword ? '' : '-password'}`),

  getUserByUsername: async (username, includePassword) => {},

  updateUser: async (id, payload) => User.update({ id }, payload),

  destroyUser: async id => User.deleteOne({ id }),
};
