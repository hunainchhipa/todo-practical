import { configureStore } from "@reduxjs/toolkit";
import refreshReducer from "./refreshSlice";

const store = configureStore({
  reducer: {
    dataRefresh: refreshReducer,
  },
});

export default store;
