import OrganizationModel from "../models/organization.js"
import RoleModel from "../models/role.js"
import userModel from "../models/user.js"

export async function create(req,res){
    console.log('[+]Creating organization...')
    const {orgName,orgDesc}= req.body

    if(!orgName ||!orgDesc) return res.status(400).send
    //create org here and send response back with success or failure
    var org = new OrganizationModel();

    org.orgName=orgName
    org.desc=orgDesc
    try{
        await org.save()
    }catch(e){
        console.log('[+]Error in creating organization...')
    }

    res.json({
        error:false,
        message:"Org created..."
    })
}

export async function createRole(req,res){
    const orgId=req.body.orgId
    const roleName=req.body.roleName
    const access=req.body.access

    var newRole = new RoleModel();
    console.log('[+]Creating new role ')

    try{

        var organization= await OrganizationModel.findById(orgId)
        if(!organization){
            throw "[+]Not a valid organization"
        }

        //check for already existing roleNames    

        var rolesOfOrg = await RoleModel.find({orgId:orgId})
        console.log('[+]Roles of the org found ',rolesOfOrg)

        rolesOfOrg.map((e)=>{
            if(e.roleName==roleName){
                throw `The role name "${roleName}" already exist in the organization`
            }
        })

        //create a function in role schame to fill the document

        newRole.orgId=orgId,
        newRole.roleName=roleName
        newRole.access=access

        try{
            newRole=await newRole.save()
            console.log('[+]Create role success...', newRole)

        }catch(e){
            console.log('[+]Error in saving new roll ',e)
        }

        organization.roles.push(newRole._id)

        try{
            organization = await organization.save()
            console.log('[+]Updated in organization...')
        }catch(e){
            throw "[+]Error in updating in organization..."
        }

        return res.json({
            error:false,
            message:"[+]Role success fully created"
        })

    }catch(e){
        return res.json({
            error:true,
            message:e
        })
    }


}

export async function assign(req,res){
    try{
        console.log("[+]Assigning user...")
        const userRolePair=req.body.userRolePair
        console.log('[+]User role pair',userRolePair)

        for(var userRole of userRolePair){
            const roleId=userRole.roleId
            const role =await RoleModel.findById(roleId)
            if(!role){
                throw `[+]Invalid role id ${roleId}`
            }  
            for(var userId of userRole.userId){
                const user= await userModel.findById(userId)
                if(!user){
                    throw `[+]Invalid user id ${userId}`
                }
                console.log("[+]User roles",user.roles.toString().split(","))
                if(user.roles.toString().split(",").includes(roleId)){
                    throw "Role already assigned to this user"
                }
                user.roles.push(roleId)
                await user.save()
                console.log(`[*]${user._id} ${user.name}'s roles are updated`)
            }
            
        }
        res.json({
            error:false,
            message:"[+]Roles updated ..."
        })
    }catch(e){
        console.log('[*]Error in role assignment...',e)
        res.json({
            error:true,
            message:e
        })
    }
}



export async function searchOrg(req,res){
    console.log('[+]Search parameter of organization ',req.query)
    const searchResult = await OrganizationModel.find({orgName:new RegExp(req.query.search,'i')})
    console.log('[+]Search result ',searchResult)
    return res.json({
        error:false,
        message:"[+]Search completed...",
        searchResult:searchResult
    })
}
  
export async function searchRole(req,res){
    console.log('[+]Search parameter of role ',req.query)
    const orgId = req.params.orgId
    const searchResult= await RoleModel.find({orgId:orgId,roleName:new RegExp(req.query.search,'i')})
    console.log('[+]Search result ',searchResult)
    return res.json({
        error:false,
        message:"[+]Search completed...",
        searchResult:searchResult
    })
}