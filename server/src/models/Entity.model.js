const mongoose = require('mongoose');

const { Schema } = mongoose;
const EntitySchema = new Schema({
  entityName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  accountOwner_FirstName: {
    type: String,
    required: true,
  },
  accountOwner_LastName: {
    type: String,
    required: true,
  },
  accountOwner_PhoneType: {
    type: String,
    required: true, 
  },
  accountOwner_PhoneNumber: {
    type: String,
    required: true,
  },
  entityPhoneNumber: {
    type: Number,
    required: true,
  },
  street: {
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
  contracts: {
    type: Schema.Types.ObjectId,
  },
  rating: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  messages: {
    type: Schema.Types.ObjectId,
  }
});


module.exports = mongoose.model('Entity', EntitySchema);