import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import jonReducer from "./slices/jobSlice";
import applicationReducer from "./slices/applicationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jonReducer,
    application: applicationReducer,
  },
});
