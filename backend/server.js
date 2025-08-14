
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require('fs');




//  Models 
const User = require("./models/User");
const StudyMaterial = require("./models/StudyMaterial.js");
const SavedNote = require("./models/SaveNotes.js");
const Payment = require("./models/Payment.js"); 

// Routes
const uploadRoutes = require("./routes/upload");
const paymentRoutes = require("./routes/paymentRoutes");


 
const connectdb = require("./db");

const app = express();

// ✅ Increase payload limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(cookieParser());
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true,              // allow cookies
}));




// Connect to DB
connectdb();

const PORT = process.env.PORT || 7000;

console.log("PORT:", PORT);

console.log("MONGO_URI:", process.env.MONGO_URI);



// Root route
app.get("/", (req, res) => {
  res.send("Hello, server is running!");
});

// Signup Route
app.post("/api/Signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("Request body:", req.body);

    // 1. Validate
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Password hashed:", hashedPassword);

    // 4. Create new user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    console.log("New user saved:", newUser);

    // 5. Generate JWT Token
    console.log("Generating token...");
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // res.cookie("token",token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // use true only with HTTPS
      sameSite: "lax", // or "none" if using HTTPS
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    console.log("Token:", token);

  
 
  res.status(201).json({
  user: {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role
  },
  token
});
  }
   catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }



});


// Login Route
app.post("/api/Login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 5. Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // this is important
      },
      token
    });


  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});


// Log out Route
app.get("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // same as you set during login
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
});





// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use upload routes
app.use("/api/upload", uploadRoutes);


// GET /api/seller/notes - Get user-specific materials
app.get("/seller/notes", async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    const notes = await StudyMaterial.find({ uploadedBy: email });
    res.json(notes);
  } catch (err) {
    console.error("Failed to fetch notes:", err);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

// DELETE /seller/notes/:id - Delete a specific note
app.delete("/seller/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the note first to get the file path
    const note = await StudyMaterial.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    
    // Delete the file from uploads folder
    const fs = require('fs');
    if (note.pdf && note.pdf.url) {
      const filePath = path.join(__dirname, note.pdf.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    // Delete from database
    await StudyMaterial.findByIdAndDelete(id);
    
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("Failed to delete note:", err);
    res.status(500).json({ message: "Failed to delete note" });
  }
});



app.post("/api/save-note", async (req, res) => {
  try {
    const { userId, title, description, category, price, fileName, previewUrl } = req.body;

    // Prevent duplicates
    const existing = await SavedNote.findOne({ userId, title });
    if (existing) {
      return res.status(409).json({ message: "Note already saved" });
    }

    const newNote = new SavedNote({ userId, title, description, category, price, fileName, previewUrl });
    await newNote.save();

    res.status(201).json({ message: "Note saved" });
  } catch (error) {
    res.status(500).json({ message: "Save failed", error: error.message });
  }
});




app.get("/api/saved-notes/:userId", async (req, res) => {
  try {
    const notes = await SavedNote.find({ userId: req.params.userId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching saved notes", error: err.message });
  }
});



app.delete("/api/saved-notes/:id", async (req, res) => {
  try {
    await SavedNote.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Note unsaved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to unsave note" });
  }
});


app.get("/api/materials/count", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const count = await StudyMaterial.countDocuments({ uploadedBy: email });
    res.json({ count });
  } catch (error) {
    console.error("Error fetching material count:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Payment routes
app.use("/api/payment", paymentRoutes);


// get all study material for buyer
app.get('/api/all-materials', async (req, res) => {
  try {
    // Replace 'StudyMaterial' with your actual model name
    const materials = await StudyMaterial.find({});
    res.json(materials);
  } catch (error) {
    console.error('Error fetching all materials:', error);
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
});

//payment endpoint 
app.get('/api/seller/payments', async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    console.log('\n=== FETCHING PAYMENTS FOR SELLER ===');
    console.log('Seller email:', email);
    
    // Directly find payments by sellerEmail field
    const payments = await Payment.find({ sellerEmail: email })
      .sort({ createdAt: -1, date: -1 });
    
    console.log('Found payments with sellerEmail:', payments.length);
    
    // Format payments for display
    const formattedPayments = payments.map(payment => {
      const plainPayment = payment.toObject ? payment.toObject() : payment;
      
      console.log('Processing payment:', {
        id: plainPayment._id,
        itemTitle: plainPayment.itemTitle,
        amount: plainPayment.amount,
        buyerName: plainPayment.buyerName
      });
      
      return {
        itemTitle: plainPayment.itemTitle || 'Unknown Item',
        buyerName: plainPayment.buyerName || plainPayment.user?.name || 'Unknown Buyer',
        buyerEmail: plainPayment.buyerEmail || plainPayment.user?.email || 'Unknown Email',
        date: plainPayment.date || plainPayment.createdAt || new Date(),
        paymentId: plainPayment.paymentId || plainPayment.razorpay_payment_id || plainPayment._id,
        amount: plainPayment.amount || plainPayment.amountPaid || 0,
        status: plainPayment.status || 'completed'
      };
    });
    
    console.log('\n=== FINAL RESULTS ===');
    console.log('Seller:', email);
    console.log('Total payments found:', formattedPayments.length);
    
    // Calculate earnings
    const total = formattedPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const thisMonth = formattedPayments
      .filter(p => {
        const paymentDate = new Date(p.date);
        const currentDate = new Date();
        return paymentDate.getMonth() === currentDate.getMonth() && 
               paymentDate.getFullYear() === currentDate.getFullYear();
      })
      .reduce((sum, p) => sum + (p.amount || 0), 0);
    const pending = formattedPayments
      .filter(p => p.status === 'pending')
      .reduce((sum, p) => sum + (p.amount || 0), 0);
    
    console.log('Total earnings: ₹' + total);
    console.log('This month: ₹' + thisMonth);
    console.log('Pending: ₹' + pending);
    
    res.json({
      payments: formattedPayments,
      earnings: { total, thisMonth, pending }
    });
  } catch (error) {
    console.error('Payment fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch payment data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

