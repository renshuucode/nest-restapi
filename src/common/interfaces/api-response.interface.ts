export interface ApiResponse<T> {
  info: string;
  success: boolean;
  data: T | null;
}
