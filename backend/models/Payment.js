// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema({
//   userName: String,
//   userEmail: String,
//   userPhone: String,
//   items: [
//     {
//       title: String,
//       description: String,
//       price: Number,
//       category: String
//     }
//   ],
//   razorpay_order_id: String,
//   razorpay_payment_id: String,
//   razorpay_signature: String,
// }, { timestamps: true });

// module.exports = mongoose.model("Payment", paymentSchema);




const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
    phone: String,
  },
  items: [
    {
      title: String,
      description: String,
      price: Number,
      category: String,
      pdf: String,
      cover: String,
    },
  ],
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  amountPaid: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
