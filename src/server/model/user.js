const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const emailValidator = require('email-validator');

const { ERROR_MESSAGES, REGEX_PATTERNS, RANGES } = require('../../../config');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, ERROR_MESSAGES.NO_USERNAME],
    minLength: [RANGES.USERNAME.MIN, ERROR_MESSAGES.USERNAME_RANGE],
    maxLength: [RANGES.USERNAME.MAX, ERROR_MESSAGES.USERNAME_RANGE],
    match: [REGEX_PATTERNS.ILLEGAL_CHARS, ERROR_MESSAGES.USERNAME.INVALID],
  },
  email: {
    type: String,
    required: [true, ERROR_MESSAGES.NO_EMAIL],
    validate: {
      validator: emailValidator.validate,
      message: ERROR_MESSAGES.INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    validate: {
      validator: password => (
        /[A-Z]/.test(password)
        && /[a-z]/.test(password)
        && /\d/.test(password)
        && REGEX_PATTERNS.ILLEGAL_CHARS.test(password)
      ),
      message: '',
    },
    required: [true, ERROR_MESSAGES.NO_PASSWORD],
  },
  age: {
    type: [Number, ERROR_MESSAGES.AGE.TYPE],
    min: [RANGES.AGE.MIN, ERROR_MESSAGES.AGE.RANGE],
    max: [RANGES.AGE.MAX, ERROR_MESSAGES.AGE.RANGE],
  },
  zipcode: {
    type: String,
    match: [REGEX_PATTERNS.ZIPCODE, ERROR_MESSAGES.ZIPCODE.INVALID],
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
