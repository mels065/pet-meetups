const Account = require('../model/account');
const User = require('../model/user');

const { ERROR_MESSAGES, REGEX_PATTERNS } = require('../../../config');

module.exports = {
  createAccount: async (accountPayload, userPayload) => {
    try {
      if (!accountPayload.email) {
        throw new Error(ERROR_MESSAGES.USER.EMAIL.NONE_PROVIDED);
      }
      if (await Account.find({ email: accountPayload.email })) {
        throw new Error(ERROR_MESSAGES.USER.EMAIL.ALREADY_EXISTS);
      }
      if (!accountPayload.username) {
        throw new Error(ERROR_MESSAGES.USER.USERNAME.NONE_PROVIDED);
      }
      if (REGEX_PATTERNS.test(accountPayload.username)) {
        throw new Error(ERROR_MESSAGES.USER.USERNAME.INVALID);
      }
      if (await User.findOne({ username: userPayload.username })) {
        throw new Error(ERROR_MESSAGES.USER.USERNAME.ALREADY_EXISTS);
      }
      if (!accountPayload.password) {
        throw new Error(ERROR_MESSAGES.USER.PASSWORD.NONE_PROVIDED);
      }
      if (accountPayload.password !== accountPayload.repeatedPassword) {
        throw new Error(ERROR_MESSAGES.USER.PASSWORD.NO_MATCH);
      }

      const user = User(userPayload);
      user.save();

      return await new Promise((resolve, reject) => {
        Account.create(async (err, account) => {
          if (err) {
            await user.remove();
            reject(err);
          }
          resolve(account);
        });
      });
    } catch (err) {
      throw err;
    }
  },
};
