const mongoose = require('mongoose');

const { Schema } = mongoose;

const DriverSchema = new Schema ({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  phoneType: {
    type: String,
    required: true,
  },
  contracts: [{
    type: Schema.Types.ObjectId,
  }],
  paymentInfo: [{
    type: Schema.Types.ObjectId,
  }],
  // Could add more. Just don't know what's what yet.
});

module.exports = mongoose.model('Driver', DriverSchema);