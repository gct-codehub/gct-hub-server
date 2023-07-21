import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mailId: {
      type: String,
      required: true,
    },
    rollNum: {
      type: String,
    },
    department: {
      type: String,
    },
    year: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    orgSubscribed: [{
      orgId:{
        type :mongoose.Schema.Types.ObjectId ,
        ref:"Organizations"
      }
    }],
    roles: [
      {
       type:mongoose.Schema.Types.ObjectId,
       ref:""
      },
    ],
    profilePhoto: {
      type: String,
      default: "defaultProfile.png",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("Users", userSchema);
export default userModel;
