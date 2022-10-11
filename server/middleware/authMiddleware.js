import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log(req.headers.authorization);
      token = req.headers.authorization.split(" ")[1];
      console.log(process.env.JWT_KEY);
      const decode = jwt.verify(token, process.env.JWT_KEY);
      console.log("second", process.env.JWT_KEY, (err, decode) => {
        if (err) {
          console.log(err);
        }
        console.log(decode);
      });
      console.log("decode", decode);
      req.user = await userModel.findById(decode.id).select("-password");
      next();
    } catch (error) {
      console.log(" error ", error.stack);
      res
        .status(401)
        .json({ success: false, message: "Not Authorized, token failed" });
    }
  }
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "Not Authorized, not token" });
  }
};
export { protect };
