import { User } from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found", user: null });
    }

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.log("Error in getUser", error);
    res.status(500).json({ message: "Error fetching user", user: null });
  }
};

export const createUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const { username, email, image_url } = req.body;

    const existingUser = await User.findOne({ uid });

    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
        success: true,
      });
    }

    if (!uid || !username || !email || !image_url) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    await User.create({ uid, username, email, image_url });

    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log("Error in createUser", error);
    res.status(500).json({
      message: "Error creating user",
      success: false,
    });
  }
};
