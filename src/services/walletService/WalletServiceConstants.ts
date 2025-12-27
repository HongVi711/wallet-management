export enum WalletField {
  userId = "userId",
  walletName = "walletName",
  balance = "balance",
  currency = "currency",
  status = "status",
  createdBy = "createdBy",
}

export const errorValidateMessage = {
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required`,
  FIELD_INVALID: (fieldName: string) => `Invalid ${fieldName} value`,
  FIELD_NUMBER: (fieldName: string) => `${fieldName} must be a number`,
};
