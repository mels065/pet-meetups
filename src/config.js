/* eslint-disable no-useless-escape */

const VALUES = {
  USER: {
    GENDER: [
      'MALE',
      'FEMALE',
      'TRANS_MALE',
      'TRANS_FEMALE',
      'GENDERQUEER',
      'OTHER',
      'DECLINE_TO_ANSWER',
    ],
    SEXUAL_ORIENTATION: [
      'STRAIGHT',
      'GAY',
      'BISEXUAL',
      'OTHER',
      'DECLINE_TO_ANSWER',
    ],
  },
};

const BOUNDARIES = {
  USER: {
    USERNAME: {
      MIN: 3,
      MAX: 20,
    },
    PASSWORD: {
      MIN: 8,
      MAX: 30,
    },
    ZIPCODE: {
      RANGE: 5,
    },
  },
};

const ILLEGAL_CHAR_STR_PATTERN = '<>$={}[\]\'"';
const REGEX_PATTERNS = {
  USER: {
    ZIPCODE: new RegExp(`^\\d{${BOUNDARIES.USER.ZIPCODE.RANGE}}$`),
  },
  DATE: new RegExp('\d{1,2}([/\-])\d{1,2}\\1\(?:\d{2}|\d{4})|(?:[A-Za-z]{3}|[A-Z][a-z])'),
  ILLEGAL_CHARS: new RegExp(`[${ILLEGAL_CHAR_STR_PATTERN}]`),
};
const ERROR_MESSAGES = {
  USER: {
    GENERAL: {
      NOT_FOUND: 'Could not find account associated with this email.',
    },
    USERNAME: {
      ALREADY_EXISTS: 'User already exists',
      NONE_PROVIDED: 'No username provided',
      INVALID: `Invalid username. Must not contain characters: [${ILLEGAL_CHAR_STR_PATTERN}]`,
      RANGE: `Username must be between ${BOUNDARIES.USER.USERNAME.MIN} and ${BOUNDARIES.USER.USERNAME.MAX}`,
    },
    EMAIL: {
      ALREADY_EXISTS: 'An existing user is using this email',
      NONE_PROVIDED: 'No email provided',
      INVALID: 'Must be valid email',
    },
    PASSWORD: {
      NONE_PROVIDED: 'No password was given',
      INVALID: `Password must contain at least 1 lowercase and uppercase letter, number, and special character (not including [${ILLEGAL_CHAR_STR_PATTERN}])`,
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

module.exports = {
  ERROR_MESSAGES,
  VALUES,
  REGEX_PATTERNS,
  BOUNDARIES,
};
