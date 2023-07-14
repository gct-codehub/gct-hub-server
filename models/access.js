import mongoose from "mongoose";

const accessSchema = mongoose.Schema(
  {
    accessNumber: {
      type: Number,
    },
    createPost: {
      type: Boolean,
    },
    updatePost: {
      type: Boolean,
    },
    deletePost: {
      type: Boolean,
    },
    createRole: {
      type: Boolean,
    },
    assignRole: {
      type: Boolean,
    },
    deleteRole: {
      type: Boolean,
    },
    createOrg: {
      type: Boolean,
    },
    updateOrgProfile: {
      type: Boolean,
    },
    deleteOrg: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const accessModel = mongoose.model("Access", accessSchema);
export default accessModel;
