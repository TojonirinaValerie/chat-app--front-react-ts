import api from "./api";
import axiosInstance from "./axios";
import ApiResponse from "../types/apiResponse";
import { IUser } from "../types/user";
import { LoginResponse } from "./authentification";

export const getUserInfo = () => {
  return axiosInstance.get<ApiResponse<IUser>>(api.getCurrentUserInfo);
};

export const uploadImageProfil = (data: FormData) => {
  return axiosInstance.put<ApiResponse<LoginResponse>>(
    api.uploadProfilPicture,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const getUserById = (id: string) => {
  return axiosInstance.get<ApiResponse<IUser>>(api.getUserById(id));
};
