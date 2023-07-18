import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.params.id = decoded?._id;
    }
    next();
  } catch (e) {
    return res.status(403).json({
      message: "User not authorized",
    });
  }
};
