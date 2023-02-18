import { configureStore } from "@reduxjs/toolkit";
import planReducer  from "./slices/planSlice.js";
import mapReducer from "./slices/mapSlice.js";

export default configureStore({
  reducer:{
    plan:planReducer,
    map:mapReducer
  }
})