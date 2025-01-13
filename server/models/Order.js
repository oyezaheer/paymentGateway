const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  items: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  stripePaymentIntentId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);