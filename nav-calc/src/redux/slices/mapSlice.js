import { createSlice } from "@reduxjs/toolkit";
export const mapSlice=createSlice({
  name:'map',
  initialState:{
    isLineAdded:false
  },
  reducers:{

    drawHandler:(state)=>{
      state.isLineAdded=true
    }
  }
})

export const {drawHandler}=mapSlice.actions;
export default mapSlice.reducer;