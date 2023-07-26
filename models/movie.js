const mongoose = require('mongoose');
const { checkURL } = require('../utils/config');

const { Schema } = mongoose;
const { model } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: [checkURL],
  },
  trailerLink: {
    type: String,
    required: true,
    match: [checkURL],
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = model('movie', movieSchema);
