import { createSlice } from "@reduxjs/toolkit";
export const planSlice=createSlice({
  name:'plan',
  initialState:{
    distance:'---',
    speed:200,
    time:'---'
  },
  reducers:{
    showDistance:(state,action)=>{
      state.distance=action.payload.distance;
    },
    spdInputHandler:(state,action)=>{
      state.speed=action.payload.value;

    },
    deleteInputHandler:(state,action)=>{
      state[action.payload.name]=''
    },
    showTime:(state)=>{
      
      if(state.distance && state.speed){
        if(state.speed=='NaN'){
          state.time='---'
        }else{
          state.time=Number(state.distance/state.speed*60).toFixed(1);
        }
        
      }else{
        state.time="---"
      }
    }
  }
})

export const {showDistance,showTime,spdInputHandler,deleteInputHandler}=planSlice.actions;
export default planSlice.reducer