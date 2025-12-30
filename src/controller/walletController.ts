import { sendMessage, sendResponse } from "@/common/apiResponse";
import catchAsync from "@/common/catchAsync";
import { ErrorMessage, StatusCode } from "@/constants/appConstants";
import walletsServices from "@/services/walletService/WalletService";

import { NextFunction, Request, Response } from "express";

const walletsController = () => {
  const walletServices = walletsServices();

  const homeIndex = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      return sendMessage(res);
    }
  );

  const createWallet = catchAsync(async (req: Request, res: Response) => {
    const response = await walletServices.createWallet(req.body);

    if (response) {
      sendResponse(res, undefined, { statusCode: StatusCode.Created });
    } else {
      sendResponse(res, undefined, {
        message: ErrorMessage.UNKNOWN(),
        statusCode: StatusCode.BadRequest,
      });
    }
  });

  const searchWallet = catchAsync(async (req: Request, res: Response) => {
    const responseData = await walletServices.searchWallets(req.body);

    if (responseData) {
      sendResponse(res, responseData, { statusCode: StatusCode.Success });
    } else {
      sendResponse(res, undefined, {
        message: ErrorMessage.UNKNOWN(),
        statusCode: StatusCode.BadRequest,
      });
    }
  });

  const updateWallet = catchAsync(async (req: Request, res: Response) => {
    const response = await walletServices.updateWallet(req.params.id, req.body);

    if (response) {
      sendResponse(res, undefined, { statusCode: StatusCode.Success });
    } else {
      sendResponse(res, undefined, {
        message: ErrorMessage.UNKNOWN(),
        statusCode: StatusCode.BadRequest,
      });
    }
  });

  return { homeIndex, createWallet, searchWallet, updateWallet };
};

export default walletsController;
