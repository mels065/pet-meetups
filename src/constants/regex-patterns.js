/* eslint-disable no-useless-escape */

const BOUNDARIES = require('./boundaries');

module.exports = {
  USER: {
    ZIPCODE: new RegExp(`^\\d{${BOUNDARIES.USER.ZIPCODE.RANGE}}$`),
  },
  DATE: new RegExp('\d{1,2}([/\-])\d{1,2}\\1\(?:\d{2}|\d{4})|(?:[A-Za-z]{3}|[A-Z][a-z])'),
  ILLEGAL_CHARS: new RegExp(`[${BOUNDARIES.ILLEGAL_CHAR_STR_PATTERN}]`),
};
