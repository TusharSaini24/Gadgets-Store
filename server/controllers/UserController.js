import userModel from "../models/userModel";
import { generateToken } from "../utils/generateToken";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      res.status(400).json({ success: false, message: "email already exist" });
    }

    const user = await userModel.create({ name, email, password });
    if (user) {
      res.status(200).json({
        success: true,
        message: "user registered successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No user found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: err,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "server error",
      error: err,
    });
  }
};

export { registerUser, loginUser };
