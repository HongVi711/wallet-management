import WalletsModel from "@/models/WalletsModel";
import { CreateWalletRequest, GetWalletRequest } from "@/types/wallets";
import { stringToObjectId } from "@/utils/utils";

const walletsRepository = () => {
  const Create = async (data: CreateWalletRequest) => {
    try {
      await WalletsModel.create({
        userId: stringToObjectId(data.userId),
        walletName: data.walletName,
        currency: data.currency,
        balance: data.balance,
        status: data.status,
        createdBy: stringToObjectId(data.createdBy),
        updatedBy: stringToObjectId(data.updatedBy),
      });
    } catch (error) {
      console.log("Repository Error: ", error);
    }
  };

  const GetOne = async (data: GetWalletRequest) => {
    return await WalletsModel.findById(data.id);
  };
  return { Create, GetOne };
};

export default walletsRepository;
