const mongoose = require('mongoose');

const {
  ERROR_MESSAGES,
  REGEX_PATTERNS,
  RANGES,
} = require('../../../config');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, ERROR_MESSAGES.USER.NO_USERNAME],
    minLength: [RANGES.USER.USERNAME.MIN, ERROR_MESSAGES.USER.USERNAME_RANGE],
    maxLength: [RANGES.USER.USERNAME.MAX, ERROR_MESSAGES.USER.USERNAME_RANGE],
    match: [REGEX_PATTERNS.ILLEGAL_CHARS, ERROR_MESSAGES.USER.USERNAME.INVALID],
  },
  age: {
    type: Number,
    min: [RANGES.USER.AGE.MIN, ERROR_MESSAGES.USER.AGE.RANGE],
    max: [RANGES.USER.AGE.MAX, ERROR_MESSAGES.USER.AGE.RANGE],
  },
  zipcode: {
    type: String,
    match: [REGEX_PATTERNS.USER.ZIPCODE, ERROR_MESSAGES.USER.ZIPCODE.INVALID],
  },
});

module.exports = mongoose.model('User', UserSchema);
