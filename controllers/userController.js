import user from "../models/user.js";
import fs from "fs";

export const uploadProfilePhoto = async (req, res) => {
  try {
    if (req.file) {
      const id = req.params.id;
      console.log("File uploaded successfully");

      //update filename to the database
      const olduser = await user.findByIdAndUpdate(id, {
        profilePhoto: req.file.filename,
      });

      //delete old profile photo from storage
      if (olduser.profilePhoto != "defaultProfile.png") {
        fs.unlinkSync(`public/profilePhotos/${olduser.profilePhoto}`);
      }

      return res.status(200).json("File uploaded successfully");
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Failed to upload profile photo." });
  }
};
