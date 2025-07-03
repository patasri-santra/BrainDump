import mongoose from "mongoose";
import User from "../model/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, user: { name: user.name } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const registerUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const existing = await User.findOne({ name });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, password: hashed });

    res.status(201).json({ message: "User created", user: { name: user.name } });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};