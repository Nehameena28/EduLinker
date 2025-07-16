const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  userPhone: String,
  items: [
    {
      title: String,
      description: String,
      price: Number,
      category: String
    }
  ],
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
