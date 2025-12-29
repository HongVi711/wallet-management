import { Operator } from "@/constants/appConstants";

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

export interface WalletSearchQuery {
  sort?: {
    sortField: string;
    sortOrder: string;
  };
  skip?: number;
  limit?: number;
  conditions?: [
    {
      fieldName: string;
      searchValue: string[] | string;
      operator: Operator;
    }
  ];
}
