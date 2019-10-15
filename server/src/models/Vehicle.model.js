const mongoose = require('mongoose');
const { Schema } = mongoose;

const VehicleSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  vehcileYear: {
    type: Number,
    required: true,
  },
  vehcileMake: {
    type: String,
    required: true,
  },
  vehcileModel: {
    type: String,
    model: true,
  },
  operable: {
    type: Boolean,
    required: true,
  },
  Pictures: [{
    type: String,
  }],
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
