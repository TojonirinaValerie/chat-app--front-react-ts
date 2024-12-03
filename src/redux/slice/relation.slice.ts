import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";

interface RelationState {
  friends: IUser[];
  receiveRequest: IUser[];
  myPendingRequest: IUser[];
  myRejectedRequest: IUser[];
  suggestions: IUser[];
}
const relationSlice = createSlice({
  name: "relations",
  initialState: {
    receiveRequest: [],
    friends: [],
    myPendingRequest: [],
    myRejectedRequest: [],
    suggestions: [],
  } as RelationState,
  reducers: {
    setFriendsList: (state, action: PayloadAction<IUser[]>) => {
      state.friends = action.payload;
      return state;
    },
    setReceiverRequest: (state, action: PayloadAction<IUser[]>) => {
      state.receiveRequest = action.payload;
      return state;
    },
    setMyPendingRequest: (state, action: PayloadAction<IUser[]>) => {
      state.myPendingRequest = action.payload;
      return state;
    },
    setMyRejectedRequest: (state, action: PayloadAction<IUser[]>) => {
      state.myRejectedRequest = action.payload;
      return state;
    },
    setSuggestion: (state, action: PayloadAction<IUser[]>) => {
      state.suggestions = action.payload;
      return state;
    },
  },
});

export const {
  setFriendsList,
  setReceiverRequest,
  setSuggestion,
  setMyPendingRequest,
  setMyRejectedRequest,
} = relationSlice.actions;
export const relationReducer = relationSlice.reducer;
