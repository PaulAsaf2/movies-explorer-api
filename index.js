/* eslint-disable no-console */

// Installed packages
const express = require('express');
const mongoose = require('mongoose');
// ----------------------------------
// Import modules
const indexRoute = require('./routes/index');
const handleErrors = require('./errors/handleErrors');

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(express.json());
app.use(indexRoute);

app.use(handleErrors);
