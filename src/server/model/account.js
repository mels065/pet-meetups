const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Schema.Types;
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const ERROR_MESSAGES = require('../../constants/error-messages');
const validator = require('../../utils/validator');

const AccountSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, ERROR_MESSAGES.USER.NO_EMAIL],
    validate: {
      validator: isEmail,
      message: ERROR_MESSAGES.USER.INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: [true, ERROR_MESSAGES.USER.NO_PASSWORD],
  },
  user: {
    type: ObjectId,
    ref: 'User',
  },
});

AccountSchema.pre('save', async function preSave(next) {
  try {
    const user = this;

    if (!user.isModified('password')) next();
    else {
      if (!validator.validatePassword(user.password)) {
        throw new Error(ERROR_MESSAGES.USER.PASSWORD.INVALID);
      }

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

AccountSchema.method('comparePasswords', async function compare(password) {
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
