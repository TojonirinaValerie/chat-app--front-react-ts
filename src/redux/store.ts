import { userReducer } from "./slice/user.slice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadingReducer } from "./slice/loading.slice";
import { messageReducer } from "./slice/message.slice";
import { settingReducer } from "./slice/setting.slice";
import { relationReducer } from "./slice/relation.slice";
import { notificationReducer } from "./slice/notification.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    message: messageReducer,
    setting: settingReducer,
    relation: relationReducer,
    notification: notificationReducer
  },
});

export type AppStoreType = typeof store;
export type AppDispatch = typeof store.dispatch;

const useAppSelector: TypedUseSelectorHook<
  ReturnType<AppStoreType["getState"]>
> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();
export { useAppDispatch, useAppSelector };

export default store;
