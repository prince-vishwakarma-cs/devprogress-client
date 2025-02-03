import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {
    userExist: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state) => {
      state.loading = false;
      state.user = null;
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { userExist, userNotExist, setLoading } = authReducer.actions;

export default authReducer.reducer;
