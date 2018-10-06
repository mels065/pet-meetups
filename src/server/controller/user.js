const User = require('../model/user');

module.exports = {
  getUsers: async () => {
    try {
      return await User.find({});
    } catch (err) {
      throw err;
    }
  },

  getUserById: async (_id) => {
    try {
      return await User.findOne({ _id });
    } catch (err) {
      throw err;
    }
  },

  // getUserByUsername: async (username) => {},

  updateUser: async (_id, payload) => User.update({ _id }, payload),

  destroyUser: async _id => User.deleteOne({ _id }),
};
