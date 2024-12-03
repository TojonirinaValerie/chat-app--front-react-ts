import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";


const UserSlice = createSlice({
  name: "user",
  initialState: {} as IUser,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
      return state;
    },
    removeUser: (state) => {
      state = {} as IUser;
      return state;
    },
  },
});

export const { setUser, removeUser } = UserSlice.actions;
export const userReducer = UserSlice.reducer;
