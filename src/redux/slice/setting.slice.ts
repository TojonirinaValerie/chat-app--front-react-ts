import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ISetting {
  showDetailMessage: boolean;
}
const settingSlice = createSlice({
  name: "setting",
  initialState: {
    showDetailMessage: false,
  } as ISetting,
  reducers: {
    setShowDetailMessage: (state, action: PayloadAction<boolean>) => {
      state.showDetailMessage = action.payload;
      return state;
    },
  },
});

export const { setShowDetailMessage } = settingSlice.actions;
export const settingReducer = settingSlice.reducer;
