const User = require('../model/user');

module.exports = {
  createUser: async payload => User.create(payload),
  getUsers: async query => User.find(query),
  getUser: async query => User.findOne(query),
  updateUser: async (query, payload) => User.update(query, payload),
  destroyUser: async query => User.deleteOne(query),
};
