import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import postReducer from "./slices/postsSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
