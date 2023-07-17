import user from "../models/user.js";
import bycryt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const salt = await bycryt.genSalt(10);
    const hashedPassword = await bycryt.hash(req.body.password, salt);

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
    return res.json({
      message: e.message,
    });
  }
};

export const login = async (req, res) => {
  try{
    const mailId = req.body.mailId;

    //validating email id
    let emailRegExp = new RegExp("[a-z0-9]+@gct+.ac.in");
    if(!emailRegExp.test( mailId )) {
      throw {
        message: "Please enter a GCT mail ID",
      };
    }

    //check if email is registered
    const oldUser = await user.findOne({ mailId });
    
    if (!oldUser) throw { message: "Mail ID is not registered. Please register." };
    else{
      //authenticate access
      const validPassword = bycryt.compareSync(
        req.body.password, user.password
      );

      if(!validPassword) throw { message: "Invalid Password!" }
      else {
        //generating jwt token
        const token = jwt.sign(
          user, 
          process.env.ACCESS_TOKEN,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    }
  } catch (e) {
      console.log("[❌]Error:  ", e);
      return res.json({
        message: e.message,
      });
  }
};
