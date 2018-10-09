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
};
