import user from "../models/user.js";
import fs from "fs";

export const uploadProfilePhoto = async (req, res) => {
  try {
    if (req.file) {
      const id = req.params.id;

      //update filename to the database
      const olduser = await user.findByIdAndUpdate(id, {
        profilePhoto: req.file.filename,
      });
      //delete old profile photo from storage
      if (olduser.profilePhoto != "defaultProfile.png") {
        fs.unlinkSync(`public/profilePhotos/${olduser.profilePhoto}`);
      }
      console.log("[✅]ProfilePhoto fileName updated successfully");
      return res.status(200).json("Profilephoto FileName updated successfully");
    }
  } catch (e) {
    console.log("[❌]Thrown error ", e);
    return res
      .status(500)
      .json({ message: "Failed to update profilephoto FileName" });
  }
};
