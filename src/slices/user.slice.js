import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  currUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.currUser = payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const userSelector = (state) => state.user;

export const userReducer = userSlice.reducer;
