const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  sellerEmail: { type: String, required: true },
  buyerName: { type: String, required: true },
  buyerEmail: { type: String, required: true },
  itemTitle: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentId: { type: String, required: true },
  razorpayOrderId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);