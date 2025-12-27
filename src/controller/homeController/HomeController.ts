import { sendMessage } from "@/common/apiResponse";
import catchAsync from "@/common/catchAsync";

import { Request, Response } from "express";

const homeController = () => {
  const homeIndex = catchAsync(async (req: Request, res: Response) => {
    return sendMessage(res);
  });

  return { homeIndex };
};

export default homeController;
