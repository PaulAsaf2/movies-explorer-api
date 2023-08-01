/* eslint-disable no-console */
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
// ----------------------------------------
const indexRoute = require('./routes/index');
const handleErrors = require('./errors/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiterOptions, mongodbPath, corsOptions } = require('./utils/config');

const { PORT = 3500 } = process.env;
const app = express();
mongoose.connect(mongodbPath);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(cors(corsOptions));
app.use(helmet());
app.use(rateLimit(limiterOptions));
app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());

app.use(indexRoute);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);
