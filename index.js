/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

// Installed packages
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
// Import modules
const indexRoute = require('./routes/index');
const handleErrors = require('./errors/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiterOptions } = require('./config');

const { PORT = 3500 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(rateLimit(limiterOptions));
app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());

app.use(indexRoute);

// handle errors
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);
