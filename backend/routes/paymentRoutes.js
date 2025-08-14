
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();

const Payment = require("../models/Payment");
const StudyMaterial = require("../models/StudyMaterial");

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
    try {
      // Save payment for each item (for seller dashboard)
      for (const item of items) {
        // Find the study material to get seller email
        const material = await StudyMaterial.findOne({ title: item.title });
        
        const payment = new Payment({
          sellerEmail: material?.uploadedBy || 'unknown@seller.com',
          buyerName: user.name,
          buyerEmail: user.email,
          itemTitle: item.title,
          amount: item.price,
          paymentId: razorpay_payment_id,
          razorpayOrderId: razorpay_order_id,
          status: 'completed',
          date: new Date()
        });

        await payment.save();
      }

      res.json({ success: true });
    } catch (saveError) {
      console.error('Payment save error:', saveError);
      res.json({ success: true }); // Still return success as payment was verified
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

module.exports = router;
