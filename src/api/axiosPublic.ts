import axios from "axios";

const axiosPublic = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 60000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosPublic;
