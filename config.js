/* eslint-disable no-useless-escape */

const RANGES = {
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
    LENGTH: 5,
  },
};

const ILLEGAL_CHAR_STR_PATTERN = '<>$={}[\]\'"';

module.exports = {
  ERROR_MESSAGES: {
    USERNAME: {
      NONE_PROVIDED: 'No username provided',
      INVALID: `Invalid username. Must not contain characters: [${ILLEGAL_CHAR_STR_PATTERN}]`,
      RANGE: `Username must be between ${LENGTHS.USERNAME.MIN} and ${LENGTHS.USERNAME.MAX}`,
    },
    EMAIL: {
      NONE_PROVIDED: 'No email provided',
      INVALID: 'Must be valid email',
    },
    PASSWORD: {
      NONE_PROVIDED: 'No password was given',
      INVALID: `Password must contain at least 1 lowercase and uppercase letter, number, and special character (not including [${ILLEGAL_CHAR_STR_PATTERN}])`,
      RANGE: `Password must be between ${LENGTHS.PASSWORD.MIN} and ${LENGTHS.PASSWORD.MAX}`,
    },
    AGE: {
      TYPE: 'Age must be a number',
      RANGE: `Age must be between ${LENGTHS.AGE.MIN} and ${LENGTHS.AGE.MAX}`,
    },
    ZIPCODE: {
      INVALID: 'Zipcode must be 5 characters and contain only numbers',
    },
    INTERNAL_ERROR: 'Internal error',
  },
  REGEX_PATTERNS: {
    ILLEGAL_CHARS: new RegExp(`[^${ILLEGAL_CHAR_STR_PATTERN}]`),
    ZIPCODE: new RegExp(`^\d${LENGTHS.ZIPCODE.LENGTH}$`),
  },
  RANGES,
};
