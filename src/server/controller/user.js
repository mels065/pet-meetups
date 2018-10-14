const User = require('../model/user');

module.exports = {
  createUser: async (payload) => {
    try {
      return await User.create(payload);
    } catch (err) {
      throw err;
    }
  },
  getUsers: async () => {
    try {
      return await User.find({});
    } catch (err) {
      throw err;
    }
  },

  getUserById: async (_id) => {
    try {
      return await User.findById(_id);
    } catch (err) {
      throw err;
    }
  },

  getUserByUsername: async (username) => {
    try {
      return await User.findOne({ username });
    } catch (err) {
      throw err;
    }
  },

  updateUser: async (_id, payload) => {
    try {
      User.update({ _id }, payload);
    } catch (err) {
      throw err;
    }
  },

  destroyUser: async (_id) => {
    try {
      User.deleteOne({ _id });
    } catch (err) {
      throw err;
    }
  }
};
