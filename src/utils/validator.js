const REGEX_PATTERNS = require('../constants/regex-patterns');
const calculator = require('./calculator');

module.exports = {
  validateUsername: username => !REGEX_PATTERNS.ILLEGAL_CHARS.test(username),
  validatePassword: password => (
    /[A-Z]/.test(password)
    && /[a-z]/.test(password)
    && /\d/.test(password)
    && !REGEX_PATTERNS.ILLEGAL_CHARS.test(password)
  ),
  isOldEnough: birthday => (
    (
      birthday instanceof Date ? birthday : new Date(birthday)
    ) <= calculator.calculateDateEighteenYearsAgo()
  ),
};
