const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const emailValidator = require('email-validator');

const {
  ERROR_MESSAGES,
  REGEX_PATTERNS,
  RANGES,
  validator,
} = require('../../../config');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, ERROR_MESSAGES.USER.NO_USERNAME],
    minLength: [RANGES.USER.USERNAME.MIN, ERROR_MESSAGES.USER.USERNAME_RANGE],
    maxLength: [RANGES.USER.USERNAME.MAX, ERROR_MESSAGES.USER.USERNAME_RANGE],
    match: [REGEX_PATTERNS.ILLEGAL_CHARS, ERROR_MESSAGES.USER.USERNAME.INVALID],
  },
  email: {
    type: String,
    required: [true, ERROR_MESSAGES.USER.NO_EMAIL],
    validate: {
      validator: emailValidator.validate,
      message: ERROR_MESSAGES.USER.INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    validate: {
      validator: validator.validatePassword,
      message: '',
    },
    required: [true, ERROR_MESSAGES.USER.NO_PASSWORD],
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

UserSchema.pre('save', async function preSave(next) {
  try {
    const user = this;

    if (!user.isModified('password')) next();
    else {
      user.password = await new Promise((resolve, reject) => {
        bcrypt.hash(user.password, 10, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    }
  } catch (err) {
    throw new Error(ERROR_MESSAGES.INTERNAL_ERROR);
  }
});

UserSchema.methods('compare', async function compare(password) {
  try {
    return await new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, same) => {
        if (err) reject(err);
        resolve(same);
      });
    });
  } catch (err) {
    throw new Error(ERROR_MESSAGES.INTERNAL_ERROR);
  }
});

module.exports = mongoose.model('User', UserSchema);
