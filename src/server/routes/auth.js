const router = require('express').Router();

const AccountController = require('../controller/account');
const UserController = require('../controller/user');

module.exports = (passport) => {
  router.post('/register', async (req, res) => {
      try {
        const { accountPayload, userPayload } = req.body;

        const newAccount = await AccountController.createAccount(accountPayload, userPayload);

        // TBC...
      } catch (err) {
        res.json({ success: false, msg: err.message })
      }
    });
};
