import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      // File size too large error
      return res
        .status(400)
        .json({ message: "Image size should not exceed 5MB" });
    }
    // Multer errors
    console.log(err);
    return res.status(400).json({ message: err.message });
  } else if (err) {
    // Other errors
    console.log(err);
    return res.status(500).json({ message: err.message });
  }

  next();
};


