import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_KEY);
      req.user = await userModel.findById(decode.id).select("-password");
      next();
    } catch (error) {
      res
        .status(401)
        .json({ success: false, message: "Not Authorized, token failed" });
    }
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Not Authorized, not token" });
  }
};
export { protect };
