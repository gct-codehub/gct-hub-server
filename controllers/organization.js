import OrganizationModel from "../models/organization.js"


async function create(req,res){
    try{


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
        console.log('[+]Error in creating organization...',e.message.split(" ")[0])
        if(e.message.split(" ")[0]==="E11000"){
            throw "[+]There is a organization in the name you have created try a different name.."
        }
    }

    res.json({
        error:false,
        message:"Org created..."
    })
    }
    catch(e){
        return res.json({
            error:true,
            message:e
        })
    }
}




async function search(req,res){
    console.log('[+]Search parameter of organization ',req.query)
    const searchResult = await OrganizationModel.find({orgName:new RegExp(req.query.search,'i')})
    console.log('[+]Search result ',searchResult)
    return res.json({
        error:false,
        message:"[+]Search completed...",
        searchResult:searchResult
    })
}

function update(req,res){
    try{
        console.log("[+]Update request")
        throw "[+]This feature is still in build phase"

    }catch(e){
        return res.json({
            error:true,
            message:e
        })
    }
}

export default {create,search,update}