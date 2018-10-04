const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Schema.Types;
const bcrypt = require('bcryptjs');
const emailValidator = require('email-validator');

const {
  ERROR_MESSAGES,
  validator,
} = require('../../../config');

const AccountSchema = {
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
  user: {
    type: ObjectId,
    ref: 'User',
  },
};

AccountSchema.pre('save', async function preSave(next) {
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
    console.log(err);
    throw new Error(ERROR_MESSAGES.INTERNAL_ERROR);
  }
});

AccountSchema.methods('comparePasswords', async function compare(password) {
  try {
    return await new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, (err, same) => {
        if (err) reject(err);
        resolve(same);
      });
    });
  } catch (err) {
    console.log(err);
    throw new Error(ERROR_MESSAGES.INTERNAL_ERROR);
  }
});

module.exports = mongoose.model('Account', AccountSchema);
