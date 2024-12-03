import ApiResponse from "../types/apiResponse";
import { NotificationCounts } from "../types/notification";
import api from "./api"
import axiosInstance from "./axios"

export const fetchNotification = ()=>{
    return axiosInstance.get<ApiResponse<NotificationCounts>>(api.getNoficationCount);
}