import {
  ErrorCode,
  ErrorMessage,
  SearchQueryField,
  Status,
  StatusCode,
} from "@/constants/appConstants";
import walletsRepository from "@/repositories/walletRepository";
import {
  errorValidateMessage,
  WalletField,
} from "@/services/walletService/WalletServiceConstants";
import { CreateWalletRequest, WalletSearchQuery } from "@/types/wallets";
import AppError from "@/utils/appError";
import {
  isValidCurrency,
  isValidNumber,
  isValidString,
  isValidWalletStatus,
} from "@/utils/utils";

const walletsServices = () => {
  const walletRepository = walletsRepository();

  const handleValidateUpdateOrCreate = (data: CreateWalletRequest) => {
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

  const handleValidateSearchQuery = (data: WalletSearchQuery) => {
    const { conditions, sort, limit, skip } = data;

    if (limit && (!isValidNumber(limit.toString()) || limit < 0)) {
      throw new AppError(
        errorValidateMessage.FIELD_NUMBER(SearchQueryField.limit),
        StatusCode.BadRequest,
        ErrorCode.invalidInput
      );
    }

    if (skip && (!isValidNumber(skip.toString()) || skip < 0)) {
      throw new AppError(
        errorValidateMessage.FIELD_NUMBER(SearchQueryField.skip),
        StatusCode.BadRequest,
        ErrorCode.invalidInput
      );
    }

    if (sort) {
      const { sortField, sortOrder } = sort;

      if (!isValidString(sortField)) {
        throw new AppError(
          errorValidateMessage.FIELD_REQUIRED(SearchQueryField.sortField),
          StatusCode.BadRequest,
          ErrorCode.invalidInput
        );
      }

      if (!isValidString(sortOrder)) {
        throw new AppError(
          errorValidateMessage.FIELD_REQUIRED(SearchQueryField.sortOrder),
          StatusCode.BadRequest,
          ErrorCode.invalidInput
        );
      }
    }

    if (conditions && conditions.length > 0) {
      conditions.forEach((condition) => {
        const { fieldName, operator, searchValue } = condition;

        if (!isValidString(fieldName)) {
          throw new AppError(
            errorValidateMessage.FIELD_REQUIRED(SearchQueryField.fieldName),
            StatusCode.BadRequest,
            ErrorCode.invalidInput
          );
        }

        if (!isValidString(operator)) {
          throw new AppError(
            errorValidateMessage.FIELD_REQUIRED(SearchQueryField.operator),
            StatusCode.BadRequest,
            ErrorCode.invalidInput
          );
        }

        if (
          searchValue === undefined ||
          (Array.isArray(searchValue) && searchValue.length === 0) ||
          (!Array.isArray(searchValue) && !isValidString(searchValue as string))
        ) {
          throw new AppError(
            errorValidateMessage.FIELD_REQUIRED(SearchQueryField.searchValue),
            StatusCode.BadRequest,
            ErrorCode.invalidInput
          );
        }
      });
    }
  };

  const createWallet = async (body: CreateWalletRequest) => {
    handleValidateUpdateOrCreate(body);

    try {
      await walletRepository.Create(body);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const searchWallets = async (searchRequest: WalletSearchQuery) => {
    handleValidateSearchQuery(searchRequest);
    try {
      return await walletRepository.SearchWallet(searchRequest);
    } catch (error) {
      throw error;
    }
  };

  const updateWallet = async (
    id: string,
    body: Partial<CreateWalletRequest>
  ) => {
    handleValidateUpdateOrCreate(body as CreateWalletRequest);
    try {
      const existingWallet = await walletRepository.GetOne({ id });

      if (!existingWallet) {
        throw new AppError(
          ErrorMessage.UNKNOWN(),
          StatusCode.NotFound,
          ErrorCode.notFound
        );
      }

      await walletRepository.UpdateWallet(id, body);
      return true;
    } catch (error) {
      throw error;
    }
  };

  return { createWallet, searchWallets, updateWallet };
};

export default walletsServices;
