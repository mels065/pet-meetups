const router = require('express').Router();
const jwt = require('jsonwebtoken');

const AccountController = require('../controller/account');
const UserController = require('../controller/user');

const { ERROR_MESSAGES } = require('../../config');

module.exports = () => {
  router.post('/register', async (req, res) => {
    try {
      const { payload } = req.body;

      const newAccount = await AccountController.createAccount(payload);
      const newUser = await UserController.getUserById(newAccount.user);
      const token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET);
      res.json({ success: true, token: `JWT ${token}` });
    } catch (err) {
      res.json({ success: false, msg: err.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { payload: { email, password } } = req.body;

      if (!email) throw new Error(ERROR_MESSAGES.USER.EMAIL.NONE_PROVIDED);
      if (!password) throw new Error(ERROR_MESSAGES.USER.PASSWORD.NONE_PROVIDED);

      const account = await AccountController.getAccountByEmail(email);

      if (!account) throw new Error(ERROR_MESSAGES.USER.GENERAL.NOT_FOUND);
      if (!account.comparePasswords(password)) {
        throw new Error(ERROR_MESSAGES.USER.PASSWORD.WRONG_PASSWORD);
      }

      const user = await UserController.getUserById(account.user);
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      res.json({ success: true, token: `JWT ${token}` });
    } catch (err) {
      res.json({ success: false, msg: err.message });
    }
  });

  return router;
};
