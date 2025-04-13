const mongoose = require('mongoose');

const formResponseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  mernRating: {
    type: Number,
    required: true
  },
  resumeFileName: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const FormResponse = mongoose.model('FormResponse', formResponseSchema);

module.exports = FormResponse;
