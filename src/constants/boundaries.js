/* eslint-disable no-useless-escape */

// Any value that creates restrictions or illegal operations goes here

module.exports = {
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
  ILLEGAL_CHAR_STR_PATTERN: '<>$={}[\]\'"',
};
