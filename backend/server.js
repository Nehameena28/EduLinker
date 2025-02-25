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
app.use(cors());







connectdb();

const PORT = process.env.PORT ||  7000;

console.log("PORT:", PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);


app.get("/", (req, res) => {
  res.send("Hello, server is running!");
});

// Signup 
app.post("/api/Signup", (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Request body:", req.body);

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

   
    //  Salt password
   bcrypt.genSalt(10,(err,salt)=>{
    if (err) return err;


    // Hash password
    bcrypt.hash(password,salt, async (err,hash)=>{
     if(err) return err;
     console.log(`Hash ${hash}`)
   

// Generate Token

  // const token = jwt.sign({email},"yggdjdjkhj");
  // res.cookie("token",token);


    // res.status(200).json({
    //   message: "Signup successful",
    //   token: token 
    // });



     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(400).json({ message: "Email already exists" });
     }


   
    const newUser = new User({ name, email, password:hash});


    await newUser.save();

    console.log("User signup processed successfully:", newUser);
    
    res.status(201).json({
      message: "Signup successful",
      user: newUser,
    });


  })
})

  } catch (error) {
    console.error("Error while saving user:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});




// Start 
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});






