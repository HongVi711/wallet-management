import { Operator, SortOrder } from "@/constants/appConstants";
import WalletsModel from "@/models/WalletsModel";
import {
  CreateWalletRequest,
  GetWalletRequest,
  WalletSearchQuery,
} from "@/types/wallets";
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
      throw error;
    }
  };

  const GetOne = async (data: GetWalletRequest) => {
    try {
      return await WalletsModel.findById(data.id);
    } catch (error) {
      throw error;
    }
  };

  const SearchWallet = async (req: WalletSearchQuery) => {
    try {
      const query = WalletsModel.find();

      req.conditions?.forEach((condition) => {
        switch (condition.operator) {
          case Operator.equal:
            query.where(condition.fieldName).equals(condition.searchValue);
            break;

          case Operator.notEqual:
            query.where(condition.fieldName).ne(condition.searchValue);
            break;

          case Operator.greaterThan:
            query.where(condition.fieldName).gt(Number(condition.searchValue));
            break;

          case Operator.greaterThanOrEqual:
            query.where(condition.fieldName).gte(Number(condition.searchValue));
            break;

          case Operator.lessThan:
            query.where(condition.fieldName).lt(Number(condition.searchValue));
            break;

          case Operator.lessThanOrEqual:
            query.where(condition.fieldName).lte(Number(condition.searchValue));
            break;

          case Operator.in:
            query
              .where(condition.fieldName)
              .in(condition.searchValue as string[]);
            break;

          case Operator.regex:
            query
              .where(condition.fieldName)
              .regex(new RegExp(condition.searchValue as string, "i"));
            break;
        }
      });

      if (req.skip !== undefined) {
        query.skip(req.skip);
      }

      if (req.limit !== undefined) {
        query.limit(req.limit);
      }

      if (req.sort) {
        const order = req.sort.sortOrder === SortOrder.asc ? 1 : -1;
        query.sort({ [req.sort.sortField]: order });
      }

      query.select(
        "userId walletName currency balance status createdAt updatedAt"
      );

      const data = await query.exec();

      return {
        total: data.length,
        data,
      };
    } catch (error) {
      throw error;
    }
  };

  return { Create, GetOne, SearchWallet };
};

export default walletsRepository;
