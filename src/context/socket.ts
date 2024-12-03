import { io } from "socket.io-client";
import { localStorageKey } from "../utils/constant";

const socket = io(import.meta.env.VITE_API_URL, {
  auth: {
    token: localStorage.getItem(localStorageKey.accessToken),
  },
});

socket.on("connect", () => {
  console.log("loge");
});

socket.on("connect_error", (err) => {
  try {
    const errorData = JSON.parse(err.message) as {
      code: number;
      message: string;
    };
    console.log("Erreur de connexion :", errorData);

    if (errorData.code === 4011) {
      socket.emit("refreshToken", {
        refreshToken: localStorage.getItem(localStorageKey.refreshToken),
      });
    }
  } catch (err) {
    console.log("Erreur de connexion :", err);
  }
});

export default socket;
