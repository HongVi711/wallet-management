import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import {
  errorMessage,
  ErrorCode,
  StatusCode,
  ResponseStatus,
  Enviroment,
} from "../constants/appConstants";

/* =======================
   Mongo / Mongoose Errors
======================= */
const handleCastErrorDB = (err: any): AppError => {
  return new AppError(
    errorMessage.CAST_ERROR_DB(err.path, err.value),
    StatusCode.BadRequest,
    ErrorCode.CastErrorDB
  );
};

const handleDuplicateFieldsDB = (err: any): AppError => {
  const value = err.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] || "unknown";
  return new AppError(
    errorMessage.DUPLICATE_FIELD(value),
    StatusCode.BadRequest,
    ErrorCode.DuplicateFieldDB
  );
};

const handleValidationErrorDB = (err: any): AppError => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  return new AppError(
    errorMessage.VALIDATION_ERROR_DB(errors),
    StatusCode.BadRequest,
    ErrorCode.ValidationErrorDB
  );
};
/* =======================
   Error Responses
======================= */
const sendErrorDev = (err: any, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    errorCode: err.errorCode,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (error: AppError, response: Response): void => {
  // Operational, trusted error
  if (error.isOperational) {
    response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    // Programming or unknown error
    console.error("ERROR 💥:", error);

    response.status(StatusCode.InternalServer).json({
      status: ResponseStatus.error,
      message: errorMessage.UNKNOWN,
    });
  }
};
/* =======================
   Global Error Middleware
======================= */
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || StatusCode.InternalServer;
  err.status = err.status || ResponseStatus.error;

  if (process.env.NODE_ENV === Enviroment.dev) {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === Enviroment.prod) {
    let error: any = { ...err };
    error.message = err.message;
    if (err.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (err.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (err.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }

    sendErrorProd(error, res);
  }
};

export default globalErrorHandler;
