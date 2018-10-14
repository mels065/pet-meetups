const BOUNDARIES = require('./boundaries');

module.exports = {
  USER: {
    GENERAL: {
      NOT_FOUND: 'Could not find account associated with this email.',
    },
    USERNAME: {
      ALREADY_EXISTS: 'User already exists',
      NONE_PROVIDED: 'No username provided',
      INVALID: `Invalid username. Must not contain characters: [${BOUNDARIES.ILLEGAL_CHAR_STR_PATTERN}]`,
      RANGE: `Username must be between ${BOUNDARIES.USER.USERNAME.MIN} and ${BOUNDARIES.USER.USERNAME.MAX}`,
    },
    EMAIL: {
      ALREADY_EXISTS: 'An existing user is using this email',
      NONE_PROVIDED: 'No email provided',
      INVALID: 'Must be valid email',
    },
    PASSWORD: {
      NONE_PROVIDED: 'No password was given',
      INVALID: `Password must contain at least 1 lowercase and uppercase letter, number, and special character (not including [${BOUNDARIES.ILLEGAL_CHAR_STR_PATTERN}])`,
      RANGE: `Password must be between ${BOUNDARIES.USER.PASSWORD.MIN} and ${BOUNDARIES.USER.PASSWORD.MAX}`,
      NO_MATCH: 'Password and repeat password must match',
      WRONG_PASSWORD: 'Password is wrong',
    },
    BIRTHDAY: {
      NONE_PROVIDED: '',
      TYPE: 'Birthday must be a date',
      TOO_YOUNG: 'You must be 18 years or older to join this site',
    },
    ZIPCODE: {
      NONE_PROVIDED: 'No zipcode was given',
      INVALID: 'Zipcode must be 5 characters and contain only numbers',
    },
  },
  INTERNAL_ERROR: 'Internal error',
};
