import userModel from "../models/userModel.js";
import generateToken from "../utility/tokenGen.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    console.log(password.length);
    if (!password || password.toString().length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 6 characters" });
    }

    const existingUser = await userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Another account already exists with this email ID" });
    }

    const user = await userModel.create({ name, email: email.toLowerCase(), password });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    const user = await userModel.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid username or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid username or password" });
    }

    user.password = undefined;
    const token = generateToken(user);
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

