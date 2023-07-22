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
      .json({ error:true,message: "Failed to update profilephoto FileName" });
  }
};


/*
 Update User-Profile Data   ( Url Expected : updateUserData )

  The frontend form to update user-data here is considered something similar to
  instagram's details page which consists all the feilds of pre-existing data 
  and alreadyany of them can be altered.
  
  Here the validation is being performed for all the fields and all these data
  are being updated in database.

  Datas that can updated are (Expected fields) :
    => user.name
    => user.rollNum
    => user.department
    => user.year

  as of now, validations for name and department are done to restrict them to 
  contain only alphabets and spaces.
  Similarly, validations for rollNum was done to restrict them to contain only
  digits.
  Validations to year are done as per year of passing of students
*/

export const updateUserData = async ( req, res ) => {
  try {
    const id = req.params.id;

    const name = req.body.name;
    const rollNum = req.body.rollNum;
    const department = req.body.department;
    const year = req.body.year;

    if( !( new RegExp("^[ A-Za-z]+$").test(name) && 
          new RegExp("[A-Za-z]").test(name) ) ) {
      throw { message: "Enter a valid Name"};
    } else {

    }

    if( !( new RegExp("^\d+$").test(rollNum) ) ) {
      throw { message: "Enter a valid Roll Number" };
    }

    if( !( new RegExp("^[ A-Za-z]+$").test(department) && 
        new RegExp("[A-Za-z]").test(department) ) ) {
      throw { message: "Enter a valid Department" };
    }
    
    if( ! new RegExp("^(19|20)\d{2}$").test(year) ) {
      throw { message: "Enter a valid Year" };
    }

    await user.findByIdAndUpdate(id, {
      name: name,
      rollNum: rollNum,
      department: department,
      year: year
    });

    console.log("[✅] User Data Updated Successfully");
    return res.status(200).json("User Data updated successfully");

  } catch( e ) {
    console.log("[❌] Thrown error ", e);
    return res
      .status(500)
      .json({ error:true,message: "Failed to update profilephoto FileName" });
  }
}


/*
  Change Existing Password  ( Url Expected : changePassword )
  
  Fields Required are
      => Old Password
      => New Password
      => Confirmed Password
      
      export const changePassword = async ( req, res ) => {
        
      }
*/
      

/*
  Get User Data ( Url Expected : getUserData )
  
  Expecting the get request to send Accessor ID by URL and
  Accessed Id by request's body.
*/

export const getUserData = async ( req, res ) => {
  try {
    // const accessorid = req.params.id;     // Accessor Id 
    await findById(req.body.id, ( err, result ) => {
      if( err ) {
        throw err;
      } else {
        console.log("[✅] User Data Sent Successfully");
        return res.status(200).json(result);
      }
    });

  } catch ( e ) {
    console.log("[❌]Thrown error ", e);
    return res
      .status(500)
      .json({ error:true,message: "Failed to update profilephoto FileName" });
  }

}
