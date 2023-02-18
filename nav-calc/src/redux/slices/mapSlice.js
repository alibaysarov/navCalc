import { createSlice } from "@reduxjs/toolkit";
export const mapSlice=createSlice({
  name:'map',
  initialState:{
    isLineAdded:false
  },
  reducers:{

    drawHandler:(state)=>{
      if(state.isLineAdded==false){
        state.isLineAdded=true
      }else{
        state.isLineAdded=false;
      }
    }
  }
})

export const {drawHandler}=mapSlice.actions;
export default mapSlice.reducer;