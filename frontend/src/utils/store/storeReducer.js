import { configureStore } from "@reduxjs/toolkit";
import AuthReducers from "../../feature/authSlice";

const store = configureStore({
  reducer: {
    user: AuthReducers,
  },
});

export default store;
