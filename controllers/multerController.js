import multer from "multer";
import { v4 } from "uuid";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/profilePhotos");
  },
  filename: (req, file, cb) => {
    const fileName = v4() + ".jpg";
    cb(null, fileName);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Check if the file type is an image
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Allow the file to be uploaded
      console.log("[✅]ProfilePhotoImage uploaded successfully");
    } else {
      cb(new Error("Only images are allowed!"), false); // Reject the file
    }
  },
});
