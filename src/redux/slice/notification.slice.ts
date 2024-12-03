import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationCounts } from "../../types/notification";

const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    notificationCounts: {
      "friend-accept": 0,
      "friend-reject": 0,
      "friend-request": 0,
    } as NotificationCounts,
  },
  reducers: {
    setNotificationCount: (
      state,
      action: PayloadAction<NotificationCounts>
    ) => {
      state.notificationCounts = action.payload;
      return state;
    },
  },
});

export const { setNotificationCount } = NotificationSlice.actions;
export const notificationReducer = NotificationSlice.reducer;
