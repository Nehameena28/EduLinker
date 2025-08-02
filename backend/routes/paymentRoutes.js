// const express = require("express");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const router = express.Router();

// require("dotenv").config();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });



// router.post("/orders", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const options = {
//       amount: amount * 100, // paise
//       currency: "INR",
//       receipt: crypto.randomBytes(10).toString("hex"),
//     };

//     const order = await razorpay.orders.create(options);
//     res.status(200).json(order);
//   } catch (err) {
//     console.error("❌ Razorpay order creation failed:", err);
//     res.status(500).json({ error: err.message });
//   }
// });




// router.post("/verify", async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//   const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
//   hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
//   const digest = hmac.digest("hex");

//   if (digest === razorpay_signature) {
//     return res.status(200).json({ message: "Payment verified" });
//   } else {
//     return res.status(400).json({ message: "Invalid signature" });
//   }
// });

// module.exports = router;





// routes/paymentRoutes.js
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();

const Payment = require("../models/Payment");

const razorpay = new Razorpay({
  key_id: "rzp_test_KbKCf8dIP10uNs", // Replace with your key
  key_secret: "EhrvrXGnZahZUvh3Ib5JGAd7", // Replace with your secret
});

// Create Razorpay order
router.post("/checkout", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // amount in paise
      currency: "INR",
    };
    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (err) {
    console.error("Order creation error", err);
    res.status(500).json({ error: "Order creation failed" });
  }
});


// Verify Razorpay payment
router.post("/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user, items } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", razorpay.key_secret)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    const payment = new Payment({
      user,
      items,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amountPaid: items.reduce((total, item) => total + item.price, 0),
      createdAt: new Date(),
    });

    await payment.save();

    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

module.exports = router;
