import { sendMessage, sendResponse } from "@/common/apiResponse";
import catchAsync from "@/common/catchAsync";
import { ErrorMessage, StatusCode } from "@/constants/appConstants";
import walletsServices from "@/services/walletService/walletService";

import { NextFunction, Request, Response } from "express";

const walletsController = () => {
  const walletServices = walletsServices();

  const homeIndex = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      return sendMessage(res);
    }
  );

  const createWallet = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const response = await walletServices.createWallet(req.body);

        if (response) {
          sendResponse(res, undefined, { statusCode: StatusCode.Created });
        } else {
          sendResponse(res, undefined, {
            message: ErrorMessage.UNKNOWN(),
            statusCode: StatusCode.BadRequest,
          });
        }
      } catch (error) {
        next(error);
      }
    }
  );

  return { homeIndex, createWallet };
};

export default walletsController;
