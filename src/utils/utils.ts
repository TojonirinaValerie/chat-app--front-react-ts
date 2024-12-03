import { localStorageKey } from "./constant";

export const isAuth = () => {
  const accessToken = localStorage.getItem(localStorageKey.accessToken);
  const refreshToken = localStorage.getItem(localStorageKey.refreshToken);
  if (accessToken && refreshToken) return true;
  return false;
};

export const toProfilUrl = (userId: string, pictureName: string): string => {
  return `${import.meta.env.VITE_API_URL}/files/${userId}/${pictureName}`;
};
