const router = require('express').Router();
const jwt = require('jsonwebtoken');

const AccountController = require('../controller/account');
const UserController = require('../controller/user');

module.exports = () => {
  router.post('/register', async (req, res) => {
    try {
      const { accountPayload, userPayload, repeatedPassword } = req.body;

      const newAccount = await AccountController.createAccount(
        accountPayload,
        userPayload,
        repeatedPassword,
      );
      const newUser = await UserController.getUserById(newAccount.user);
      const token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET);
      res.json({ success: true, token: `JWT ${token}` });
    } catch (err) {
      res.json({ success: false, msg: err.message });
    }
  });

  return router;
};
