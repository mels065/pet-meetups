const { REGEX_PATTERNS } = require('./config');

module.exports = {
  validator: {
    validatePassword: password => (
      /[A-Z]/.test(password)
      && /[a-z]/.test(password)
      && /\d/.test(password)
      && !REGEX_PATTERNS.ILLEGAL_CHARS.test(password)
    ),
  },
};
