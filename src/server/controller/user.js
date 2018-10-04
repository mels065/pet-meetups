const User = require('../model/user');

const { ERROR_MESSAGES } = require('../../../config');

module.exports = {
  getUsers: async (includePassword) => {
    try {
      return (await User.find({})).select(
        includePassword ? '' : '-password',
      );
    } catch (err) {
      throw err;
    }
  },

  getUserById: async (_id) => {
    try {
      return await User.findOne({ _id })
    } catch (err) {
      throw err;
    }
  },

  getUserByUsername: async (username, includePassword) => {},

  updateUser: async (_id, payload) => User.update({ _id }, payload),

  destroyUser: async _id => User.deleteOne({ _id }),
};
