import ApiResponse from "../types/apiResponse";
import { RelationStatusType } from "../types/relation";
import { IUser } from "../types/user";
import api from "./api";
import axiosInstance from "./axios";

export const fetchSuggestions = () => {
  return axiosInstance.get<ApiResponse<IUser[]>>(api.getSuggestions);
};

export const fetchFriendRequest = () => {
  return axiosInstance.get<ApiResponse<IUser[]>>(api.getFriendRequest);
};

export const fetchMyFriendRequest = () => {
  return axiosInstance.get<ApiResponse<IUser[]>>(api.getMyFriendRequest);
};

export const fetchFriends = () => {
  return axiosInstance.get<ApiResponse<IUser[]>>(api.getFriends);
};

export const sendFriendRequest = (id: string) => {
  return axiosInstance.post<ApiResponse<undefined>>(api.sendFriendRequest, {
    receiver: id,
  });
};

export const replyFriendRequest = (
  idRelation: string,
  status: RelationStatusType
) => {
  return axiosInstance.post(api.replyFriendRequest, {
    idRelation,
    status,
  });
};

export const deleteRequest = (idRelation: string) => {
  return axiosInstance.delete(api.deleteRequest(idRelation));
};

export const resendRequest = (idRelation: string) => {
  return axiosInstance.post(api.resendRequest, {
    idRelation,
  });
};
