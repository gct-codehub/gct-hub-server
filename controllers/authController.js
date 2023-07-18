import user from "../models/user.js";
import bycryt from "bcrypt";

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


export const isSignedIn =async(req,res,next)=>{
  try{
      var token = req.headers['authorization'].split(" ")[1]
      console.log('[+] RequiredSignin ',token)
      if(token===undefined)throw "User not loggedin"
      var tokenData = jwt.verify(token,process.env.JWT_SECRET)
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
