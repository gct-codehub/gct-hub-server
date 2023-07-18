import mongoose from "mongoose";

const orgSchema = mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
      unique:true
    },
    desc: {
      type: String,
    },
    logo:{
      type:String,
    },
    coverPhoto:{
      type:String,
    },
    roles: [
      {
        type:mongoose.Schema.ObjectId,
        ref:"Roles"
      },
    ],
  },
  {
    timestamps: true,
  }
);

const orgModel = mongoose.model("Organizations", orgSchema);
export default orgModel;
