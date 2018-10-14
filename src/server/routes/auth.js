const router = require('express').Router();
const jwt = require('jsonwebtoken');

const AccountController = require('../controller/account');
const UserController = require('../controller/user');

const ERROR_MESSAGES = require('../../constants/error-messages');

module.exports = (passport) => {
  router.post('/register', async (req, res) => {
    try {
      const { payload } = req.body;
      const { accountData, userData, repeatedPassword } = payload;
      const { email, password } = accountData;
      const { username } = userData;

      if (await AccountController.getAccountByEmail(email)) {
        return res.json({ success: false, msg: ERROR_MESSAGES.USER.EMAIL.ALREADY_EXISTS });
      }
      if (await UserController.getUserByUsername(username)) {
        return res.json({ success: false, msg: ERROR_MESSAGES.USER.USERNAME.ALREADY_EXISTS });
      }
      if (password !== repeatedPassword) {
        return res.json({ success: false, msg: ERROR_MESSAGES.USER.PASSWORD.NO_MATCH });
      }

      const newUser = await UserController.createUser(userData);
      try {
        await AccountController.createAccount(payload, newUser._id);
      } catch (err) {
        newUser.delete();
        throw err;
      }

      const token = jwt.sign(newUser._id, process.env.JWT_SECRET);
      return res.json({ success: true, token: `JWT ${token}` });
    } catch (err) {
      return res.json({ success: false, msg: ERROR_MESSAGES.INTERNAL_ERROR });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { payload: { email, password } } = req.body;

      const account = await AccountController.getAccountByEmail(email);

      if (!account) return res.json({ success: false, msg: ERROR_MESSAGES.USER.GENERAL.NOT_FOUND });

      if (!account.comparePasswords(password)) {
        return res.json({ success: false, msg: ERROR_MESSAGES.USER.password.WRONG_PASSWORD });
      }

      const user = await UserController.getUserById(account.user);
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      return res.json({ success: true, token: `JWT ${token}` });
    } catch (err) {
      return res.json({ success: false, msg: ERROR_MESSAGES.INTERNAL_ERROR });
    }
  });

  router.get('/fetch', passport.authenticate('jwt'), (req, res) => {
    res.json(res.user);
  });

  router.post('/destroy', passport.authenticate('jwt'), async (req, res) => {
    try {
      const { user } = req;
      await AccountController.destroyAccount(user._id);
      await UserController.destroyUser(user._id);
    } catch (err) {
      console.log(err);
    } finally {
      res.end();
    }
  });

  return router;
};
