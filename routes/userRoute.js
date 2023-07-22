import express from "express";
import { uploadProfilePhoto, updateUserData, changePassword, getUserData } from "../controllers/userController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { errorHandler } from "../middleware/multerError.js";
import { upload } from "../controllers/multerController.js";

const router = express.Router();

router.post("/uploadProfilePhoto/:id", isLoggedIn,upload.single("file"), errorHandler, uploadProfilePhoto);
router.post("/updateUserData/:id", isLoggedIn, updateUserData );
// router.post("/changePassword/:id", isLoggedIn, changePassword );
router.post("/getUserData/:id", isLoggedIn, getUserData );

export default router;