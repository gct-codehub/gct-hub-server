import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import OrganizationModel from "../models/organization.js";
import RoleModel from "../models/role.js";

dotenv.config();

export const register = async (req, res) => {
  try {
    // validate email
    let emailRegExp = new RegExp("[a-z0-9]+@gct+.ac.in");
    if (!emailRegExp.test(req.body.mailId)) {
      throw {
        message: "Please,Enter GCT mail ID",
      };
    }

    //check whether user email is already registered
    const mailId = req.body.mailId;
    const oldUser = await user.findOne({ mailId });
    if (oldUser) throw { message: "Given mail ID is already registered" };

    //check wether password and conform password fields are same
    if (req.body.password != req.body.confirmpass)
      throw { message: "Password and Confirm password are not same" };

    //password needs to be minimum 8 character long
    if (req.body.password.length < 8)
      throw { message: "Password needs minimum 8 characters" };

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //save new user
    const newUser = new user({ ...req.body, password: hashedPassword });
    await newUser
      .save()
      .then(() => {
        console.log("[✅]New user saved into Database");
        res.status(200).json("User Registered Successfully");
      })
      .catch((e) => {
        console.log("[❌] Error in saving the new user ", e.message);
        throw { message: e.message };
      });
  } catch (e) {
    console.log("[❌]Thrown error ", e);
    return res.status(500).json({
      error: true,
      message: e.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const mailId = req.body.mailId;

    //validating email id
    let emailRegExp = new RegExp("[a-z0-9]+@gct+.ac.in");
    if (!emailRegExp.test(mailId)) {
      throw {
        message: "Please enter a GCT mail ID",
      };
    }

    //check if email is registered
    const existingUser = await user.findOne({ mailId });

    if (!existingUser)
      throw { message: "Mail ID is not registered. Please register." };
    else {
      //authenticate access
      const validPassword = bcrypt.compareSync(
        req.body.password,
        existingUser.password
      );

      if (!validPassword) throw { message: "Password is wrong" };
      else {
        //generating jwt token
        const JWTtoken = jwt.sign(
          { id: existingUser._id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        console.log("[✅]user loggedIn Successfully");
        res.status(200).json({
          message: "User LoggedIn Successfully",
          JWT: JWTtoken,
          user: existingUser,
        });
      }
    }
  } catch (e) {
    console.log("[❌]Thrown error ", e);
    return res.status(500).json({
      error: true,
      message: e.message,
    });
  }
};


export const isSignedIn =async(req,res,next)=>{
  console.log('[+]Signin controller')
  try{
    if(!req.headers['authorization']){
      throw "token not found"
    }
      var token = req.headers['authorization'].split(" ")[1]
      console.log('[+] RequiredSignin ',token)
      if(token===undefined)throw "User not loggedin"
      var tokenData = jwt.verify(token,process.env.JWT_SECRET_KEY)
      var tempUser = await user.findById(tokenData.id)
      // user.password=undefined
      req.user=tempUser
      if(!user){
          throw "user not found"
      }else{
          console.log('[+]User trying to login ',user)
          req.userId=user._id
      }

  }catch(e){
      return res.status(403).json({
          error:true,
          message:e
      })
  }

  next()
}


export const accessFilter= (access)=>{
  return async (req,res,next)=>{
    console.log('[+]User ',req.user._id)
    const needUser =await user.findById(req.user._id).populate("roles").exec()
    console.log('[+]Access filter active',needUser)
  }
}