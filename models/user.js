const mongoose = require('mongoose');
const { checkEmail } = require('../config');

const { Schema } = mongoose;
const { model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: checkEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

module.exports = model('user', userSchema);
