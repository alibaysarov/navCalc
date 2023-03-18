import { createSlice } from '@reduxjs/toolkit';

import { getMeZones } from './mapSlice.js';


const uiSlice=createSlice({
    name:"ui",
    initialState:{
        openAirSpaceSelector:false,
        zonesIsShown:false,
        airportsIsShown:false
    },
    reducers:{
        airSpaceOpenHandler:(state,action)=>{
            state.openAirSpaceSelector=!state.openAirSpaceSelector;
        },
        ctaCtrHandler:(state,action)=>{
            state.zonesIsShown=!state.zonesIsShown;
            return state;
        },
        airportsHandler:(state)=>{
            state.airportsIsShown=!state.airportsIsShown
            return state
        }
    },
    
})
export const {airSpaceOpenHandler,ctaCtrHandler,airportsHandler}=uiSlice.actions
export default uiSlice.reducer