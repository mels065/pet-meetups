const { isEmail, toDate } = require('validator');

const Account = require('./model/account');
const User = require('./model/user');

const { ERROR_MESSAGES, BOUNDARIES, REGEX_PATTERNS } = require('../config');
const { validator } = require('../utils');

module.exports = {
  accountAndUserErrorHandler: async (payload) => {
    const { userData, accountData, repeatedPassword } = payload;
    try {
      // Email
      if (!accountData.email) {
        throw new Error(ERROR_MESSAGES.USER.EMAIL.NONE_PROVIDED);
      }
      if (!isEmail(accountData.email)) {
        throw new Error(ERROR_MESSAGES.USER.EMAIL.INVALID);
      }
      if (await Account.findOne({ email: accountData.email })) {
        throw new Error(ERROR_MESSAGES.USER.EMAIL.ALREADY_EXISTS);
      }

      // Username
      if (!userData.username) {
        throw new Error(ERROR_MESSAGES.USER.USERNAME.NONE_PROVIDED);
      }
      if (
        userData.username.length < BOUNDARIES.USER.USERNAME.MIN
        || userData.username.length > BOUNDARIES.USER.USERNAME.MAX
      ) {
        throw new Error(ERROR_MESSAGES.USER.USERNAME.RANGE);
      }
      if (REGEX_PATTERNS.ILLEGAL_CHARS.test(userData.username)) {
        throw new Error(ERROR_MESSAGES.USER.USERNAME.INVALID);
      }
      if (await User.findOne({ username: userData.username })) {
        throw new Error(ERROR_MESSAGES.USER.USERNAME.ALREADY_EXISTS);
      }

      // Password
      if (!accountData.password) {
        throw new Error(ERROR_MESSAGES.USER.PASSWORD.NONE_PROVIDED);
      }
      if (
        accountData.password < BOUNDARIES.USER.PASSWORD.MIN
        || accountData.password > BOUNDARIES.USER.PASSWORD.MAX
      ) {
        throw new Error(ERROR_MESSAGES.USER.PASSWORD.RANGE);
      }
      if (!validator.validatePassword(accountData.password)) {
        throw new Error(ERROR_MESSAGES.USER.PASSWORD.INVALID);
      }
      if (typeof repeatedPassword === 'string') {
        if (accountData.password !== repeatedPassword) {
          throw new Error(ERROR_MESSAGES.USER.PASSWORD.NO_MATCH);
        }
      }

      // Birthday
      if (!userData.birthday) {
        throw new Error(ERROR_MESSAGES.USER.BIRTHDAY.NONE_PROVIDED);
      }
      if (!toDate(userData.birthday)) {
        throw new Error(ERROR_MESSAGES.USER.BIRTHDAY.TYPE);
      }
      if (!validator.isOldEnough(userData.birthday)) {
        throw new Error(ERROR_MESSAGES.USER.BIRTHDAY.TOO_YOUNG);
      }

      // Zipcode
      if (!userData.zipcode) {
        throw new Error(ERROR_MESSAGES.USER.ZIPCODE.NONE_PROVIDED);
      }
      if (!REGEX_PATTERNS.USER.ZIPCODE.test(userData.zipcode)) {
        throw new Error(ERROR_MESSAGES.USER.ZIPCODE.INVALID);
      }
    } catch (err) {
      throw err;
    }
  },
};
