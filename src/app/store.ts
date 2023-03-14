import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "../features/jobsSlice";

export const store = configureStore({
  reducer: {
    posts: jobsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
