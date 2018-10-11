const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
require('./src/server/auth/jwt')(passport);

mongoose.Promise = global.Promise;
(async () => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.NODE_ENV === 'production' ? process.env.MONGO_URI : process.env.MONGO_DEV_URI}`,
      { useNewUrlParser: true },
    );
    console.log('Successfully connected to database');
  } catch (err) {
    console.log(`Error connecting to database: ${err}`);
  }
})();

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./src/server/routes/auth')(passport));

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
