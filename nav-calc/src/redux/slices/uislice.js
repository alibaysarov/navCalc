import { createSlice } from '@reduxjs/toolkit';

import { getMeZones } from './mapSlice.js';


const uiSlice=createSlice({
    name:"ui",
    initialState:{
        openAirSpaceSelector:false,
        openFlightPlanSelector:false,
        zonesIsShown:false,
        airportsIsShown:false
    },
    reducers:{
        flightPlanOpenHandler:(state)=>{
            state.openFlightPlanSelector=!state.openFlightPlanSelector;
        },
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
export const {airSpaceOpenHandler,flightPlanOpenHandler,ctaCtrHandler,airportsHandler}=uiSlice.actions
export default uiSlice.reducer