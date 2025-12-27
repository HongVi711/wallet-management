import { ErrorCode, Status, StatusCode } from "@/constants/appConstants";
import walletsRepository from "@/repositories/walletRepository";
import {
  errorValidateMessage,
  WalletField,
} from "@/services/walletService/WalletServiceConstants";
import { CreateWalletRequest } from "@/types/wallets";
import AppError from "@/utils/appError";
import {
  isValidCurrency,
  isValidNumber,
  isValidString,
  isValidWalletStatus,
} from "@/utils/utils";

const walletsServices = () => {
  const walletRepository = walletsRepository();

  const handleValidateCreate = (data: CreateWalletRequest) => {
    const { userId, balance, currency, status, walletName, createdBy } = data;

    if (!isValidString(userId)) {
      throw new AppError(
        errorValidateMessage.FIELD_REQUIRED(WalletField.userId),
        StatusCode.BadRequest,
        ErrorCode.invalidInput
      );
    }

    if (!isValidString(currency)) {
      throw new AppError(
        errorValidateMessage.FIELD_REQUIRED(WalletField.currency),
        StatusCode.BadRequest,
        ErrorCode.invalidInput
      );
    }

    if (!isValidNumber(balance)) {
      throw new AppError(
        errorValidateMessage.FIELD_NUMBER(WalletField.balance),
        StatusCode.BadRequest,
        ErrorCode.invalidInput
      );
    }

    if (!isValidString(status)) {
      throw new AppError(
        errorValidateMessage.FIELD_REQUIRED(WalletField.status),
        StatusCode.BadRequest,
        ErrorCode.invalidInput
      );
    }

    if (!isValidString(createdBy)) {
      throw new AppError(
        errorValidateMessage.FIELD_REQUIRED(WalletField.createdBy),
        StatusCode.BadRequest,
        ErrorCode.invalidInput
      );
    }

    if (!isValidString(walletName)) {
      throw new AppError(
        errorValidateMessage.FIELD_REQUIRED(WalletField.walletName),
        StatusCode.BadRequest,
        ErrorCode.invalidInput
      );
    }

    if (!isValidWalletStatus(status)) {
      throw new AppError(
        errorValidateMessage.FIELD_INVALID(WalletField.status),
        StatusCode.BadRequest,
        ErrorCode.invalidInput
      );
    }

    if (!isValidCurrency(currency)) {
      throw new AppError(
        errorValidateMessage.FIELD_INVALID(WalletField.currency),
        StatusCode.BadRequest,
        ErrorCode.invalidInput
      );
    }
  };

  const createWallet = async (body: CreateWalletRequest) => {
    handleValidateCreate(body);

    try {
      await walletRepository.Create(body);
      return true;
    } catch (error) {
      console.error("error: ", error);
      throw error;
    }
  };
  return { createWallet };
};

export default walletsServices;
