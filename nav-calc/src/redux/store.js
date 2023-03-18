import { configureStore } from "@reduxjs/toolkit";
import planReducer  from "./slices/planSlice.js";
import mapReducer from "./slices/mapSlice.js";
import uiSliceReducer from "./slices/uislice.js";

export default configureStore({
  reducer:{
    plan:planReducer,
    map:mapReducer,
    ui:uiSliceReducer
  }
})