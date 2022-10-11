import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: "1d",
  });
};

export { generateToken };
