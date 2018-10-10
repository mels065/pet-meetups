const Account = require('../model/account');
const User = require('../model/user');

const { accountAndUserErrorHandler } = require('../error-handler');

module.exports = {
  createAccount: async (payload) => {
    try {
      await accountAndUserErrorHandler(payload);

      const { accountData, userData } = payload;

      const user = new User(userData);
      await user.save();

      return await new Promise((resolve, reject) => {
        Account.create({ ...accountData, user: user._id }, async (err, account) => {
          if (err) {
            await user.remove();
            await account.remove();
            reject(err);
          }
          resolve(account);
        });
      });
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
      await User.deleteOne({ _id: user });
    } catch (err) {
      throw err;
    }
  },
};
