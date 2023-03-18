import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { airData } from "../../aeroNavLogic";
export const getMeWind=createAsyncThunk('plan/getMeWind',async(point)=>{
  if(point==null){
    return '---'
  }
  const [lng,lat]=point
  const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=3a815b785d67d3ea0361d8ba93fc7199&units=metric`);
  if(!res.ok){
      throw Error('Ошибка при рассчете ветра')
  }else{
      let json=await res.json()
      let wind=await json.wind;
      return {speed:wind.speed,deg:wind.deg}
  }

})
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
      state.waypoints=action.payload.map(el=>{
        
        const {trueHeading,magnetHeading}=airData(el.leg)
        return{
          ...el,
          trueHeading,
          magnetHeading
          
        }
      })
      console.log(state.waypoints);
    }
  },
  extraReducers:{
    [getMeWind.fulfilled]:(state,action)=>{
      state.waypoints=state.waypoints.map(el=>{
        return{
          ...el,
          ...action.payload
        }
      })
    }
  }
})

export const {showDistance,showTime,spdInputHandler,deleteInputHandler,pointsList}=planSlice.actions;
export default planSlice.reducer