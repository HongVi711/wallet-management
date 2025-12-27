export interface CreateWalletRequest {
  userId: string;
  walletName: string;
  currency: string;
  balance: string;
  status: string;
  createdBy: string;
  updatedBy: string;
}

export interface GetWalletRequest {
  id: string;
}
