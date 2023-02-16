import { configureStore } from "@reduxjs/toolkit";
import planReducer  from "./slices/planSlice.js";

export default configureStore({
  reducer:planReducer
})