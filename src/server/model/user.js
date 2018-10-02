const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  journals: {
    type: Map,
    of: String,
    default: {},
  },
});

module.exports = mongoose.model('User', UserSchema);
