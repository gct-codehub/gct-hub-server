
import userModel from "../models/user.js";

export async function search(req,res){
    const {mailId,rollno,name} =req.body;

    console.log('[+]data for searching ',mailId,rollno,name)
    var user;
    if(mailId){
       user = await userModel.find({mailId:new RegExp(mailId, 'i')})
       console.log('[+]Searched user ',user)
 
    }
    // else if(rollno){
    //     const user = await userModel.find({})
    // }
    else if(name){
        user= await userModel.find({name:new RegExp(name,'i')})
        console.log('[+]Searched user ',user)
    }

    else{
        user = await userModel.find()
    }

    return res.json({
        error:false,
        userData:user
    })

}