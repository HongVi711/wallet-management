import { Currency, Status } from "@/constants/appConstants";
import { Types } from "mongoose";

export const isPresent = (value: unknown): boolean => {
  return value !== null && value !== undefined;
};

export const isValidString = (value: unknown): value is string => {
  return typeof value === "string" && value.trim().length > 0;
};

export const isValidNumber = (value: string | number) => {
  const convertedValue = Number(value);

  return typeof convertedValue === "number" && !Number.isNaN(convertedValue);
};

export const isValidObject = (value: unknown): value is object => {
  return (
    typeof value === "object" && value !== null && Object.keys(value).length > 0
  );
};

export const stringToObjectId = (value: string) => {
  if (!value !== value.length <= 0) {
    return undefined;
  }
  return new Types.ObjectId(value);
};

export const isValidWalletStatus = (status: string): status is Status => {
  return Object.values(Status).includes(status as Status);
};

export const isValidCurrency = (value: string): value is Currency => {
  return Object.values(Currency).includes(value as Currency);
};
