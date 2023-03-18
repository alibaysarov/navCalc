import React from 'react';
import cl from './index.module.scss'
import { useDispatch,useSelector } from 'react-redux';
import { ctaCtrHandler,airportsHandler } from '../../redux/slices/uislice';
import { getMeAirports, getMeZones,removeZones,removeAirports } from '../../redux/slices/mapSlice.js';

const AirSpaceFilter = () => {
    const dispatch=useDispatch();
    const {zonesIsShown,airportsIsShown}=useSelector(state=>state.ui);
    
    //handlers
    const zonesToggleHandler=()=>{        
          dispatch(ctaCtrHandler());
          if(zonesIsShown!==true){
            dispatch(getMeZones());
          }else{
            dispatch(removeZones());
          } 
    }
    const airportsToggleHandler=()=>{
      dispatch(airportsHandler());
      if(airportsIsShown!==true){
        dispatch(getMeAirports())

      }else{
        dispatch(removeAirports())
      }
    }
    return (
        <div className={cl.filterContent}>
          <h2>Воздушное пространство</h2>
            <div className={cl.filterItem} onClick={zonesToggleHandler}>
              <input type="checkbox" checked={zonesIsShown} onChange={zonesToggleHandler}  />
              <span>Зоны и районы</span>
            </div>
            <div className={cl.filterItem} onClick={airportsToggleHandler}>
              <input type="checkbox" checked={airportsIsShown} onChange={airportsToggleHandler}  />
              <span>Аэродромы и вертодромы</span>
            </div>
        </div>
    );
};

export default AirSpaceFilter;