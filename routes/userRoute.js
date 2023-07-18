import express from "express";
import { uploadProfilePhoto } from "../controllers/userController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { errorHandler } from "../middleware/multerError.js";
import { upload } from "../controllers/multerController.js";

const router = express.Router();

router.post("/uploadProfilePhoto/:id",isLoggedIn,upload.single("file"), errorHandler, uploadProfilePhoto);

export default router;