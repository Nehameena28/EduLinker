
// // require('dotenv').config();

// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// const User = require("./models/User");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const connectdb = require("./db");

// const app = express();

// app.use(cookieParser());
// app.use(express.json());
// // app.use(cors());
// app.use(cors({
//   origin: "http://localhost:5173", // frontend origin
//   credentials: true,              // allow cookies
// }));


// // Connect to DB
// connectdb();

// const PORT = process.env.PORT || 7000;

// console.log("PORT:", PORT);
// console.log("MONGO_URI:", process.env.MONGO_URI);

// // Root route
// app.get("/", (req, res) => {
//   res.send("Hello, server is running!");
// });

// // Signup Route
// app.post("/api/Signup", async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     console.log("Request body:", req.body);

//     // 1. Validate
//     if (!name || !email || !password || !role) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // 2. Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     // 3. Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     console.log("Password hashed:", hashedPassword);

//     // 4. Create new user
//     const newUser = new User({ name, email, password: hashedPassword, role });
//     await newUser.save();
//     console.log("New user saved:", newUser);

//     // 5. Generate JWT Token
//     console.log("Generating token...");
//     const token = jwt.sign(
//       { email: newUser.email, id: newUser._id, role: newUser.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );
//     // res.cookie("token",token);
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false, // use true only with HTTPS
//       sameSite: "lax", // or "none" if using HTTPS
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });

//     console.log("Token:", token);

//     // 6. Send response
//   //   res.status(201).json({
//   //      role: user.role,
//   //     // message: "Signup successful",
//   //     // user: newUser,
//   //     token: token
//   //   });

//   // }
//   res.status(201).json({
//   user: {
//     id: newUser._id,
//     name: newUser.name,
//     email: newUser.email,
//     role: newUser.role
//   },
//   token
// });
//   }
//    catch (error) {
//     console.error("Error during signup:", error);
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }



// });


// // Login Route
// app.post("/api/Login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1. Validate fields
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//     }

//     // 2. Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 3. Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // 4. Generate JWT token
//     const token = jwt.sign(
//       { email: user.email, id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     // 5. Set token in cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax",
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });

//     // 6. Send response
//     // res.status(200).json({
//     //   message: "Login successful",
//     //   user,
//     //   token
//     // });
//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role, // this is important
//       },
//       token
//     });


//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// });



// app.get("/api/logout", (req, res) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     secure: false, // same as you set during login
//     sameSite: "lax",
//   });
//   res.status(200).json({ message: "Logged out successfully" });
// });


// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running at http://localhost:${PORT}`);
// });












import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";

// Models
import User from "./models/User.js";
import StudyMaterial from "./models/StudyMaterial.js";

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB error:", err));
// Default Route
app.get("/", (req, res) => {
  res.send("Hello, server is running!");
});

// ===============================
// ✅ Signup
// ===============================
app.post("/api/Signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

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
        role: newUser.role
      },
      token
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

// ===============================
// ✅ Login
// ===============================
app.post("/api/Login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

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
      token
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// ===============================
// ✅ Logout
// ===============================
app.get("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// ===============================
// ✅ Upload Study Material
// ===============================
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
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
