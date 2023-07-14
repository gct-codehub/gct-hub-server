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
    orgSubscribed: [],
    roles: [
      {
        orgId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Organizations",
        },
        role: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("Users", userSchema);
export default userModel;
