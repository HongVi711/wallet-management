import { Request, Response, NextFunction } from "express";
import {
  ErrorMessage,
  ErrorCode,
  StatusCode,
  ResponseStatus,
  Enviroment,
  ErrorName,
} from "@/constants/appConstants";
import AppError from "@/utils/appError";

/* =======================
   Mongo / Mongoose Errors
======================= */
const handleCastErrorDB = (err: any): AppError => {
  return new AppError(
    ErrorMessage.CAST_ERROR_DB(err.path, err.value),
    StatusCode.BadRequest,
    ErrorCode.CastErrorDB
  );
};

const handleDuplicateFieldsDB = (err: any): AppError => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return new AppError(
    ErrorMessage.DUPLICATE_FIELD(value),
    StatusCode.BadRequest,
    ErrorCode.DuplicateFieldDB
  );
};

const handleValidationErrorDB = (err: any): AppError => {
  const errors: string[] = Object.values(err.errors).map(
    (el: any) => el.message
  );
  return new AppError(
    ErrorMessage.VALIDATION_ERROR_DB(errors),
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
      message: ErrorMessage.UNKNOWN,
    });
  }
};
/* =======================
   Global Error Middleware
======================= */
export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || StatusCode.InternalServer;
  err.status = err.status || ResponseStatus.error;

  if (process.env.NODE_ENV === Enviroment.prod) {
    let error = err as AppError;
    error.message = err.message;
    if (err.name === ErrorName.castError) {
      error = handleCastErrorDB(error);
    }
    if (err.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (err.name === ErrorName.validationError) {
      error = handleValidationErrorDB(error);
    }

    sendErrorProd(error, res);
    return;
  }

  sendErrorDev(err, res);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next(
    new AppError(
      ErrorMessage.UNKNOWN(),
      StatusCode.InternalServer,
      ErrorCode.endpointNotFound
    )
  );
};
