import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decoded =  jwt.verify(token, process.env.ACCESS_TOKEN);
      req.params.id = decoded?._id;
    }
    console.log("[✅]User authorized successfully");
    next();
  } catch (e) {
    console.log("[❌]Thrown error ", e);
    return res.status(403).json({
      error:true,
      message: "User is not authorized",
    });
  }
};
