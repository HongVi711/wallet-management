import { Model } from "@/constants/appConstants";
import mongoose, { Types } from "mongoose";

const WalletsModel = mongoose.model(
  Model.wallets,
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.ObjectId,
        ref: Model.users,
        required: true,
      },
      walletName: {
        type: String,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
      balance: {
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

export default WalletsModel;
