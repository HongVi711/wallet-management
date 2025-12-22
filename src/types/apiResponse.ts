export interface ApiResponse<T> {
  message?: string;
  data?: T;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: string[];
}
