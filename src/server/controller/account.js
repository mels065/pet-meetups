const Account = require('../model/account');

module.exports = {
  createAccount: async (payload, user) => {
    try {
      return await Account.create({ ...payload, user });
    } catch (err) {
      throw err;
    }
  },
  getAccountByEmail: async (email) => {
    try {
      return await Account.findOne({ email });
    } catch (err) {
      throw err;
    }
  },
  getAccountByUser: async (user) => {
    try {
      return await Account.findOne({ user });
    } catch (err) {
      throw err;
    }
  },
  // Search is done by User ID
  updateAccountPassword: async (user, password) => {
    try {
      await Account.updateOne({ user }, { password });
    } catch (err) {
      throw err;
    }
  },
  // Search is done by User ID
  destroyAccount: async (user) => {
    try {
      await Account.deleteOne({ user });
    } catch (err) {
      throw err;
    }
  },
};
