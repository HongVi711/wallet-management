export enum WalletField {
  userId = "userId",
  walletName = "walletName",
  balance = "balance",
  currency = "currency",
  status = "status",
  createdBy = "createdBy",
  updatedBy = "updatedBy",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}

export const WalletFieldsSelected = [
  WalletField.userId,
  WalletField.walletName,
  WalletField.currency,
  WalletField.balance,
  WalletField.status,
  WalletField.createdAt,
  WalletField.updatedAt,
].join(" ");

export const errorValidateMessage = {
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required`,
  FIELD_INVALID: (fieldName: string) => `Invalid ${fieldName} value`,
  FIELD_NUMBER: (fieldName: string) => `${fieldName} must be a number`,
};
