import mongoose from "mongoose";

const accessSchema = mongoose.Schema(
  {
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
    updateOrgProfile: {
      type: Boolean,
      default:false

    },
    deleteOrg: {
      type: Boolean,
      default:false

    },
  },
  {
    timestamps: true,
  }
);

const accessModel = mongoose.model("Access", accessSchema);
export default accessModel;
