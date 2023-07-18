import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      // File size too large error
      console.log("[❌]Thrown error ", err);
      return res
        .status(400)
        .json({ error: true, message: "Image size should not exceed 5MB" });
    }
    // Multer errors
    console.log("[❌]Thrown error ", err);
    return res.status(400).json({ error: true, message: err.message });
  } else if (err) {
    // Other errors
    console.log("[❌]Thrown error ", err);
    return res.status(500).json({ error: true, message: err.message });
  }

  next();
};
