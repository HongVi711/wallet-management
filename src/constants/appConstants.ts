export enum Enviroment {
  dev = "development",
  prod = "production",
}

export enum ErrorCode {
  userNotFound = "USER_NOT_FOUND",
  unauthorized = "UNAUTHORIZED",
  DuplicateFieldDB = "DUPLICATE_FIELD_DATABASE",
  ValidationErrorDB = "VALIDATION_ERROR_DATABASE",
  CastErrorDB = "CAST_ERROR_DATABASE",
}

export enum ErrorName {
  castError = "CastError",
  validationError = "ValidationError",
}

export enum ResponseStatus {
  fail = "fail",
  error = "error",
}

export enum StatusCode {
  Success = 200,
  Created = 201,
  NotFound = 404,
  BadRequest = 400,
  InternalServer = 500,
  Conflict = 419,
}

export enum StatusMessage {
  ok = "OK",
}

export const errorMessage = {
  DUPLICATE_FIELD: (value: string) =>
    `Duplicate field value: ${value}. Please use another value!`,
  CAST_ERROR_DB: (path: string, value: string) => `Invalid ${path}: ${value}.`,
  VALIDATION_ERROR_DB: (value: string[]) =>
    `Invalid input data. ${value.join(". ")}`,
  UNKNOWN: () => "Something went very wrong!",
};
