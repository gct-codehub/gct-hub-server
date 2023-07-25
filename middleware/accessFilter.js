
import OrganizationModel from "../models/organization.js";
import RoleModel from "../models/role.js";
import user from "../models/user.js";

const accessFilter=(access)=>{
    var returnFunction;
    // console.log('[+]Ecex access filter')
    switch(access){
      case "createOrg":
      case "updateOrg":
      case "deleteOrg":
        //compare the organization to admin organization
      returnFunction=async(req,res,next)=>{
          try{
          const needUser =await user.findById(req.user._id).populate("roles").exec()
          console.log('[+]User ',req.user._id," requesting for create org access")
          if(!needUser){
            throw "[+]Invalid user"
          }
  
          for(var i =0;i <needUser.roles.length;i++){
            var roleAccessObj  = needUser.roles[i].access
            // let isCreateAllowedForThisRole = roleAccessObj ;
            console.log("[+]roleAccess object" ,roleAccessObj[access])
            if(roleAccessObj[access]){
              next()
              return
            }
          }
        throw "[+]You don't have permission to carry on the operation"
        }catch(e){
          res.json({
            error:true,
            message:e
          })
        }
      }
        break;
      case "createPost":
      case "updatePost":
      case "deletePost":
        returnFunction=async(req,res,next)=>{
          const needUser =await user.findById(req.user._id).populate("roles").exec()
  
          try{
            res.json({
              error:false,
              message:"CUD Post"
            })
          }catch(e){
            return res.json({
              error:true,
              message:e
            })
          }
        }
        break;
  
      case "createRole":
      case "assignRole":
      case "deleteRole":
        returnFunction=async(req,res,next)=>{
            try{
            const needUser =await user.findById(req.user._id).populate("roles").exec()
            const orgid = req.body.orgId
                // console.log('[+]Roling access filter',orgid)
            console.log('[+]userNeeded ',needUser.roles)
            for(var i=0;i<needUser.roles.length;i++){
                if(needUser.roles[i].orgId===orgid && needUser.roles[i].access[access]){
                    next();
                    return;
                }
            }
            throw "[+]You have no permision to do the operation"
          }catch(e){
            return res.status(401).json({
                error:true,
                message:e
            })
          }
        }
      
    }
  
    return returnFunction
  }
  
  export default accessFilter;