const mongoose = require('mongoose');
const _ = require('lodash');

const {
  ERROR_MESSAGES,
  REGEX_PATTERNS,
  VALUES,
  BOUNDARIES,
} = require('../../constants');
const validator = require('../../utils/validator');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, ERROR_MESSAGES.USER.USERNAME.NO_USERNAME],
    minLength: [BOUNDARIES.USER.USERNAME.MIN, ERROR_MESSAGES.USER.USERNAME_RANGE],
    maxLength: [BOUNDARIES.USER.USERNAME.MAX, ERROR_MESSAGES.USER.USERNAME_RANGE],
    validate: {
      validator: validator.validateUsername,
      message: ERROR_MESSAGES.USER.USERNAME.INVALID,
    },
  },
  gender: {
    type: String,
    default: _.last(VALUES.USER.GENDER),
  },
  genderExplanation: {
    type: String,
    default: '',
  },
  birthday: {
    type: Date,
    validate: {
      validator: validator.isOldEnough,
      message: ERROR_MESSAGES.USER.BIRTHDAY.INVALID,
    },
    required: [true, ERROR_MESSAGES.USER.BIRTHDAY.NONE_PROVIDED],
  },
  sexualOrientation: {
    type: String,
    default: _.last(VALUES.USER.SEXUAL_ORIENTATION),
  },
  sexualOrientationExplanation: {
    type: String,
    default: '',
  },
  showGender: {
    type: Boolean,
    default: true,
  },
  showAge: {
    type: Boolean,
    default: true,
  },
  zipcode: {
    type: String,
    required: [true, ERROR_MESSAGES.USER.ZIPCODE.NONE_PROVIDED],
    match: [REGEX_PATTERNS.USER.ZIPCODE, ERROR_MESSAGES.USER.ZIPCODE.INVALID],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
