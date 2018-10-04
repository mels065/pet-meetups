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
    AGE: {
      MIN: 18,
      MAX: 100,
    },
    ZIPCODE: {
      RANGE: 5,
    },
  },
};

const ILLEGAL_CHAR_STR_PATTERN = '<>$={}[\]\'"';
const REGEX_PATTERNS = {
  USER: {
    ZIPCODE: new RegExp(`^\d${RANGES.ZIPCODE.RANGE}$`),
  },
  ILLEGAL_CHARS: new RegExp(`[^${ILLEGAL_CHAR_STR_PATTERN}]`),
};

module.exports = {
  ERROR_MESSAGES: {
    USER: {
      USERNAME: {
        ALREADY_EXISTS: 'User already exists',
        NONE_PROVIDED: 'No username provided',
        INVALID: `Invalid username. Must not contain characters: [${ILLEGAL_CHAR_STR_PATTERN}]`,
        RANGE: `Username must be between ${RANGES.USERNAME.MIN} and ${RANGES.USERNAME.MAX}`,
      },
      EMAIL: {
        ALREADY_EXISTS: 'An existing user is using this email',
        NONE_PROVIDED: 'No email provided',
        INVALID: 'Must be valid email',
      },
      PASSWORD: {
        NONE_PROVIDED: 'No password was given',
        INVALID: `Password must contain at least 1 lowercase and uppercase letter, number, and special character (not including [${ILLEGAL_CHAR_STR_PATTERN}])`,
        RANGE: `Password must be between ${RANGES.PASSWORD.MIN} and ${RANGES.PASSWORD.MAX}`,
        NO_MATCH: 'Password and repeat password must match',
      },
      AGE: {
        TYPE: 'Age must be a number',
        RANGE: `Age must be between ${RANGES.AGE.MIN} and ${RANGES.AGE.MAX}`,
      },
      ZIPCODE: {
        INVALID: 'Zipcode must be 5 characters and contain only numbers',
      },
    },
    INTERNAL_ERROR: 'Internal error',
  },
  REGEX_PATTERNS,
  RANGES,
  validator: {
    validatePassword: password => (
      /[A-Z]/.test(password)
      && /[a-z]/.test(password)
      && /\d/.test(password)
      && REGEX_PATTERNS.ILLEGAL_CHARS.test(password)
    ),
  },
};
