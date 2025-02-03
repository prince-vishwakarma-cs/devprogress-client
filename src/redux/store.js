import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authSlice";
import { userAPI } from "./api/userAPI";
import { platformUPI } from "./api/platformAPI";

const store = configureStore({
  reducer: {
    [authReducer.reducerPath]: authReducer.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [platformUPI.reducerPath]: platformUPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userAPI.middleware)
      .concat(platformUPI.middleware),
});

export default store;
