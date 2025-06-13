const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  age: Number,
  phone: String,
  address: String,
  medicalHistory: [String]
});

module.exports = mongoose.model('Patient', patientSchema);
