import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register
export const registerUser = async (req, res) => {
  try {
    const { role, fullName, phone, email, licenseNumber, dob, password } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser)
      return res.status(400).json({ message: "Phone number already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      role,
      fullName,
      phone,
      email,
      licenseNumber,
      dob,
      password: hashedPassword,
    });

    // ✅ Generate token directly after signup
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        role: newUser.role,
        phone: newUser.phone,
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

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.password) {
      console.log("❌ User has no password in DB:", user);
      return res.status(400).json({ message: "Invalid account. Please register again." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

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

// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const updateData = req.body;
//     if (req.file) updateData.profilePic = `/uploads/${req.file.filename}`;

//     const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
//     res.json({ message: "Profile updated successfully", user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
