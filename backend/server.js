
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("./models/User");
const StudyMaterial = require("./models/StudyMaterial.js");

// 🧾 Razorpay payment route
const paymentRoutes = require("./routes/payment");

const connectdb = require("./db");
const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// DB Connection
connectdb();

const PORT = process.env.PORT || 7000;

// Test route
app.get("/", (req, res) => {
  res.send("Hello, server is running!");
});

// 🔐 Signup Route
app.post("/api/Signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup error", error: error.message });
  }
});

// 🔑 Login Route
app.post("/api/Login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Required fields missing" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
});

// 🚪 Logout Route
app.get("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// 📦 Upload Notes
const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/upload", upload.fields([{ name: "pdf" }, { name: "cover" }]), async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    const newMaterial = new StudyMaterial({
      title,
      description,
      category,
      price,
      pdf: {
        data: req.files["pdf"][0].buffer,
        contentType: req.files["pdf"][0].mimetype,
      },
      cover: {
        data: req.files["cover"][0].buffer,
        contentType: req.files["cover"][0].mimetype,
      },
    });

    await newMaterial.save();
    res.status(201).json({ message: "Material uploaded successfully" });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

// 📚 Fetch all uploaded notes
app.get("/seller/notes", async (req, res) => {
  try {
    const notes = await StudyMaterial.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

// 💳 Razorpay Payment API
app.use("/api/payment", paymentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
