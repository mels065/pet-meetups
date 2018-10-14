const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const UserController = require('../controller/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = async (passport) => {
  passport.use(new JwtStrategy(
    opts,
    async (_id, done) => {
      try {
        const user = await UserController.getUser({ _id });
        if (user) done(null, user);
        else done(null, false);
      } catch (err) {
        done(err, false);
      }
    },
  ));
};
