import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../schema/User/User.js";
dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    else if(!user.token){
      return res.status(400).json({ message: "Creat New Session" });
    }
    next();
  } 
  catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid token" });
  }
};

export default verifyToken;
