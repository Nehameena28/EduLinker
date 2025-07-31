
require('dotenv').config();


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const cloudinary = require("cloudinary");

const { Readable } = require("stream");



const upload = multer({ storage: multer.memoryStorage() });



//  Models 
const User = require("./models/User");
const StudyMaterial = require("./models/StudyMaterial.js");

const SavedNote = require("./models/SaveNotes.js"); 


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


 
const connectdb = require("./db");

const app = express();

app.use(cookieParser());
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true,              // allow cookies
}));
// app.options("*", cors());



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



const streamUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder,
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};




app.post("/api/upload", upload.fields([{ name: "pdf" }, { name: "cover" }]), async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    const pdfBuffer = req.files["pdf"][0].buffer;
    const coverBuffer = req.files["cover"][0].buffer;

    // Upload to Cloudinary
    const uploadedPdf = await streamUpload(pdfBuffer, "edulinker/notes");
    const uploadedCover = await streamUpload(coverBuffer, "edulinker/covers");

    const newMaterial = new StudyMaterial({
      title,
      description,
      category,
      price,
      pdf: {
        url: uploadedPdf.secure_url,
        public_id: uploadedPdf.public_id,
      },
      cover: {
        url: uploadedCover.secure_url,
        public_id: uploadedCover.public_id,
      },
    });

    await newMaterial.save();
    res.status(201).json({ message: "Material uploaded successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});




// GET /api/seller/notes
app.get("/seller/notes", async (req, res) => {
  try {
    const notes = await StudyMaterial.find(); // Replace with your actual model
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notes" });
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


// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

