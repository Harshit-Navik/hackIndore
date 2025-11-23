import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register
export const registerUser = async (req, res) => {
  try {
    console.log("📥 Received registration data:", req.body);

    const { role, fullName, phone, email = "", licenseNumber = "", dob = "", password } = req.body;

    // 🧠 Validate essential fields
    if (!phone || !password || !fullName || !role) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    // 📱 Check if user already exists by phone number
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("📥 Received registration data:", req.body);

    // 🧾 Create new user document
    const newUser = await User.create({
      role,
      fullName,
      phone,
      email,
      licenseNumber,
      dob,
      password: hashedPassword,
    });

    // 🎟️ Generate token immediately after registration (optional)
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    

    // ✅ Respond with success
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        role: newUser.role,
        fullName: newUser.fullName,
        phone: newUser.phone,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required" });
    }

    // 🔍 Find user by phone
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🔐 Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    // 🧾 Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Respond
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        role: user.role,
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: error.message });
  }
};


// controllers/authController.js
export const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // assuming user is attached by auth middleware
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to load user profile" });
  }
};
