import { Model } from "@/constants/appConstants";
import mongoose, { Types } from "mongoose";

const UsersModel = mongoose.model(
  Model.users,
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      createdBy: {
        type: Types.ObjectId,
        required: true,
      },
      updatedBy: {
        type: Types.ObjectId,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default UsersModel;
