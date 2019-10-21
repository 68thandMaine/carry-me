const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContractSchema = new Schema({
  name: {
    type: String,
  },
  availability: {
    type: Boolean,
    // required: true,
  },
  entity: {
    type: Schema.Types.ObjectId,
    ref: 'Entity',
    // required: true,
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
  },
  createdAt: {
    type: Date,
    required: true,
  },
  vehicles: {
    type: Array,
  },
  max_bid: {
    type: Number,
    required: true,
  },
  current_bid: {
    type: Number,
  },
  winning_bid: {
    type: Number,
  },
  winning_Driver: {
    type: Schema.Types.ObjectId,
    ref: 'Driver',
  },
  location_start: {
    type: String,
    required: true,
  },
  location_end: {
    type: String,
    required: true,
  },
  shipBy: {
    type: Date,
    required: true,
  },
  contractClosed: {
    type: Boolean,
  },
});


module.exports = mongoose.model('Contract', ContractSchema);
