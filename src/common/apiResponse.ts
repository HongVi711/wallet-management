import { Response } from "express";
import { ApiResponse } from "@/types/apiResponse";

export const sendResponse = <T>(
  res: Response<ApiResponse<T>>,
  data: T,
  options?: {
    message?: string;
    statusCode?: number;
  }
) => {
  const { message, statusCode = 200 } = options ?? {};

  const response: ApiResponse<T> = { data };

  if (message) {
    response.message = message;
  }

  res.status(statusCode).json(response);
};

export const sendMessage = (
  res: Response<ApiResponse<null>>,
  message = "Success",
  statusCode = 200
) => {
  res.status(statusCode).json({ message });
};
