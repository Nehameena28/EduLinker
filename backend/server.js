
require('dotenv').config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/User"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connectdb = require("./db");

const app = express();

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
    const { name, email, password } = req.body;
    console.log("Request body:", req.body);

    // 1. Validate
    if (!name || !email || !password) {
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
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    console.log("New user saved:", newUser);

    // 5. Generate JWT Token
    console.log("Generating token...");
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET ,
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

    // 6. Send response
    res.status(201).json({
      message: "Signup successful",
      user: newUser,
      token: token
    });

  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }

let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  console.log(data);



});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
