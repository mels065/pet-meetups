const mongoose = require('mongoose');

const {
  ERROR_MESSAGES,
  REGEX_PATTERNS,
  RANGES,
} = require('../../../config');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, ERROR_MESSAGES.USER.USERNAME.NO_USERNAME],
    minLength: [RANGES.USER.USERNAME.MIN, ERROR_MESSAGES.USER.USERNAME_RANGE],
    maxLength: [RANGES.USER.USERNAME.MAX, ERROR_MESSAGES.USER.USERNAME_RANGE],
    validate: {
      validator: username => !REGEX_PATTERNS.ILLEGAL_CHARS.test(username),
      message: ERROR_MESSAGES.USER.USERNAME.INVALID,
    },
  },
  birthday: {
    type: Date,
    validate: {
      validator: date => date >= RANGES.USER.BIRTHDAY.MIN && date <= new Date(),
      message: ERROR_MESSAGES.USER.BIRTHDAY.RANGE,
    },
  },
  zipcode: {
    type: String,
    required: [true, ERROR_MESSAGES.USER.ZIPCODE],
    match: [REGEX_PATTERNS.USER.ZIPCODE, ERROR_MESSAGES.USER.ZIPCODE.INVALID],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
