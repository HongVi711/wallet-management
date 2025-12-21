import { ResponseStatus } from "../constants/appConstants";

class AppError extends Error {
  public statusCode: number;
  public status: ResponseStatus;
  public isOperational: boolean;
  public errorCode?: string;

  constructor(message: string, statusCode: number, errorCode?: string) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.status = statusCode.toString().startsWith("4")
      ? ResponseStatus.fail
      : ResponseStatus.error;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
