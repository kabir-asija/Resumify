import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Decoded: ",decoded)
      req.user = await User.findById(decoded.id).select("-password");
      // console.log("REQ>user",req.user)
      next();
    } else {
      return (
        res.status(401).json({ message: "Not Authorized, no token found" })
      );
    }
  } catch (error) {
      // console.log(error)
    return res.status(401).json({ message: "Token failed", error: error.message })
  }
};

