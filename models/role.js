import mongoose from "mongoose";

const Role = mongoose.Schema({
    orgId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"organization"
    },
    roleName : {
        type: String,
    },
    access:{
        createPost: {
            type: Boolean,
            default:false
          },
          updatePost: {
            type: Boolean,
            default:false
      
          },
          deletePost: {
            type: Boolean,
            default:false
      
          },
          createRole: {
            type: Boolean,
            default:false
      
          },
          assignRole: {
            type: Boolean,
            default:false
      
          },
          deleteRole: {
            type: Boolean,
            default:false
      
          },
          createOrg: {
            type: Boolean,
            default:false
      
          },
          updateOrg: {
            type: Boolean,
            default:false
          },
          deleteOrg: {
            type: Boolean,
            default:false
      
          },      
    }
},
{
    timestamps: true,
})

const roleModel = mongoose.model("Role",Role)

export default roleModel