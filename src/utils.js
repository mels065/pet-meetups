// const { toDate } = require('validator');

const { REGEX_PATTERNS } = require('./config');

const calculator = {
  calculateDateEighteenYearsAgo: () => {
    const newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() - 18);
    return newDate;
  },
};

const validator = {
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

const racePromise = async (cb, args, opts = {}) => (
  Promise.race([
    cb(...args),
    new Promise((resolve, reject) => {
      setTimeout(
        () => reject(new Error('Request has timed out')),
        opts.countdown || 30000,
      );
    }),
  ])
);

module.exports = {
  calculator,
  validator,
  racePromise,
};
