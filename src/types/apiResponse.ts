export default interface ApiResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}