const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();
const Payment = require("../models/Payment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/checkout", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
    });
    res.json({ order });
  } catch (err) {
    console.error("Checkout Error:", err);
    res.status(500).json({ message: "Payment initiation failed" });
  }
});

router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    user,
    items,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const newPayment = new Payment({
      userName: user.name,
      userEmail: user.email,
      userPhone: user.phone,
      items,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    await newPayment.save();
    res.status(200).json({ success: true, message: "Payment saved" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

module.exports = router;
