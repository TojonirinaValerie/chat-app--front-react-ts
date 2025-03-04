import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILoading {
  loadingDataUser: boolean;
  loadingDiscussions: boolean;
  isDiscussionLoaded: boolean;
  loadingOtherUserInMessage: boolean;
  loadingSendMessage: boolean;
}

const LoadingSlice = createSlice({
  name: "loading",
  initialState: {
    loadingDataUser: true,
    loadingDiscussions: true,
    loadingOtherUserInMessage: false,
    isDiscussionLoaded: false,
    loadingSendMessage: false,
  } as ILoading,
  reducers: {
    setLoadingDataUser: (state, action: PayloadAction<boolean>) => {
      state.loadingDataUser = action.payload;
      return state;
    },
    setLoadingDiscussions: (state, action: PayloadAction<boolean>) => {
      state.loadingDiscussions = action.payload;
      return state;
    },
    setLoadingOtherUserInMessage: (state, action: PayloadAction<boolean>) => {
      state.loadingOtherUserInMessage = action.payload;
      return state;
    },
    setIsDiscussionLoaded: (state, action: PayloadAction<boolean>) => {
      state.isDiscussionLoaded = action.payload;
      return state;
    },
    setLoadingSendMessage: (state, action: PayloadAction<boolean>) => {
      state.loadingSendMessage = action.payload;
      return state;
    },
  },
});

export const {
  setLoadingDataUser,
  setLoadingDiscussions,
  setLoadingOtherUserInMessage,
  setIsDiscussionLoaded,
  setLoadingSendMessage
} = LoadingSlice.actions;
export const loadingReducer = LoadingSlice.reducer;
