const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContractSchema = new Schema({
  availability: {
    type: Boolean,
    required: true,
  },
  entity: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  driver: {
    type: Schema.Types.ObjectId,
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
    required: true
  },
  current_bid: {
    type: Number,
  },
  winning_bid: {
    type: Number,
  },
  winning_Driver: {
    type: Schema.Types.ObjectId,
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
  /** Do I need a bid history property? */
});


module.exports = mongoose.model('Contract', ContractSchema);