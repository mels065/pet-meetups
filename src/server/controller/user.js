const User = require('../model/user');

module.exports = {
  createUser: async payload => User.create(payload),
  getUsers: async includePassword => (await User.find({})).select(`${includePassword ? '' : '-password'}`),
  getUser: async (id, includePassword) => (await User.findOne({ id })).select(`${includePassword ? '' : '-password'}`),
  updateUser: async (id, payload) => User.update({ id }, payload),
  destroyUser: async id => User.deleteOne({ id }),
};
