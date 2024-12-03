import ApiResponse from "../types/apiResponse";
import api from "./api";
import axiosPublic from "./axiosPublic";

interface LoginData {
  pseudo: string;
  password: string;
}

export interface LoginResponse {
  user: any;
  accessToken: string;
  refreshToken: string;
}
export interface RegisterData {
  firstName: string;
  lastName: string;
  pseudo: string;
  password: string;
}

export const login = (value: LoginData) => {
  return axiosPublic.post<ApiResponse<LoginResponse>>(api.login, value);
};

export const register = (value: RegisterData) => {
  return axiosPublic.post<ApiResponse<LoginResponse>>(api.register, value);
};
