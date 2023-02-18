import { createSlice } from "@reduxjs/toolkit";
export const planSlice=createSlice({
  name:'plan',
  initialState:{
    distance:'---',
    speed:200,
    time:'---',
    waypoints:[]
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
          const timeToString=(num)=>{
            let date1=new Date();
            let year=date1.getFullYear();
            let month =date1.getMonth()
            let day=date1.getDate()
            num=Math.round(num)
            let hours=num%60;
            let minutes=num-(hours*60)
            let date = new Date(year,month,day,hours, minutes);
           
           return date.toLocaleTimeString().slice(0,-3)
          }
          
          state.time=timeToString(Number(state.distance/state.speed*60).toFixed(1));
        }
        
      }else{
        state.time="---"
      }
    },
    pointsList:(state,action)=>{
      // let wps=action.payload.join('=>');
      state.waypoints=action.payload
      console.log(state.waypoints);
    }
  }
})

export const {showDistance,showTime,spdInputHandler,deleteInputHandler,pointsList}=planSlice.actions;
export default planSlice.reducer