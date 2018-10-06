/* eslint-disable no-useless-escape */

const RANGES = {
  USER: {
    USERNAME: {
      MIN: 3,
      MAX: 20,
    },
    PASSWORD: {
      MIN: 8,
      MAX: 30,
    },
    BIRTHDAY: {
      MIN: new Date(1900),
    },
    ZIPCODE: {
      RANGE: 5,
    },
  },
};

const ILLEGAL_CHAR_STR_PATTERN = '<>$={}[\]\'"';
const REGEX_PATTERNS = {
  USER: {
    ZIPCODE: new RegExp(`^\\d{${RANGES.USER.ZIPCODE.RANGE}}$`),
  },
  ILLEGAL_CHARS: new RegExp(`[${ILLEGAL_CHAR_STR_PATTERN}]`),
};

module.exports = {
  ERROR_MESSAGES: {
    USER: {
      USERNAME: {
        ALREADY_EXISTS: 'User already exists',
        NONE_PROVIDED: 'No username provided',
        INVALID: `Invalid username. Must not contain characters: [${ILLEGAL_CHAR_STR_PATTERN}]`,
        RANGE: `Username must be between ${RANGES.USER.USERNAME.MIN} and ${RANGES.USER.USERNAME.MAX}`,
      },
      EMAIL: {
        ALREADY_EXISTS: 'An existing user is using this email',
        NONE_PROVIDED: 'No email provided',
        INVALID: 'Must be valid email',
      },
      PASSWORD: {
        NONE_PROVIDED: 'No password was given',
        INVALID: `Password must contain at least 1 lowercase and uppercase letter, number, and special character (not including [${ILLEGAL_CHAR_STR_PATTERN}])`,
        RANGE: `Password must be between ${RANGES.USER.PASSWORD.MIN} and ${RANGES.USER.PASSWORD.MAX}`,
        NO_MATCH: 'Password and repeat password must match',
      },
      BIRTHDAY: {
        TYPE: 'Birthday must be a date',
        RANGE: `Birthday must be between ${RANGES.USER.BIRTHDAY.MIN} and ${new Date()}`,
      },
      ZIPCODE: {
        NONE_PROVIDED: 'No zipcode was given',
        INVALID: 'Zipcode must be 5 characters and contain only numbers',
      },
    },
    INTERNAL_ERROR: 'Internal error',
  },
  REGEX_PATTERNS,
  RANGES,
};
