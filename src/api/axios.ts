import axios from "axios";
import { localStorageKey } from "../utils/constant";
import axiosPublic from "./axiosPublic";
import api from "./api";
import ApiResponse from "../types/apiResponse";
import { LoginResponse } from "./authentification";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem(localStorageKey.accessToken);
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    if (err.response?.status === 401) {
      const prevRequest = err.config;
      const refreshToken = localStorage.getItem(localStorageKey.refreshToken);

      if (refreshToken && !prevRequest.sent) {
        prevRequest.sent = true;

        try {
          const response = await axiosPublic.get<ApiResponse<LoginResponse>>(
            api.refreshToken,
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
            }
          );

          const newAccessToken = response.data.data.accessToken;
          const newRefreshToken = response.data.data.refreshToken;

          localStorage.setItem(localStorageKey.accessToken, newAccessToken);
          localStorage.setItem(localStorageKey.refreshToken, newRefreshToken);

          err.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance.request(err.config);
        } catch {
          // toast.error("Accès non autorisé.", {
          //   position: "top-right",
          //   autoClose: 2500,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   pauseOnFocusLoss: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "colored",
          // });
          // return deconnexion();
        }
      }
    } else return Promise.reject(err);
  }
);
export default axiosInstance;
