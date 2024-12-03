import ApiResponse from "../types/apiResponse";
import { IDiscussions, IMessage } from "../types/message";
import api from "./api";
import axiosInstance from "./axios";

export const fetchDiscussions = () => {
  return axiosInstance.get<ApiResponse<IDiscussions[]>>(api.getDiscussions);
};

export const getConversations = (id: string, start: number, limit: number) => {
  return axiosInstance.get<
    ApiResponse<{ conversations: IMessage[]; totalMessages: number }>
  >(api.getConversations(id), {
    params: { skip: start, limit },
  });
};

export const sendMessage = (content: string, receiver: string) => {
  return axiosInstance.post<ApiResponse<IMessage>>(api.sendMessage, {
    content,
    receiver,
  });
};

export const markAsSeen = (id: string) => {
  return axiosInstance.post(api.markAsSeen, { otherUser: id });
};
