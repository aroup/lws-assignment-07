import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "../features/jobsSlice";
import filterReducer from "../features/filtersSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    filters: filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
