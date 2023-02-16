import React, { useState } from 'react';
import Container from '../Container';
import Content from '../Content';
import Title from '../Title';
import MapWrapper from '../Map';
import cl from './index.module.scss'
import { IMaskInput } from 'react-imask';
import {SphericalUtil, PolyUtil} from "node-geometry-library";
import Planner from '../Planner';


const CreateNavAid = () => {
  const [textInputVal,setTextInputVal]=React.useState('');
  const inputHandler=(e)=>{
    setTextInputVal(e.target.value)
  }
  

  const ref = React.useRef(null);
const inputRef = React.useRef(null);

const coordsDecimal=(str)=>{
  let sign=str[0]=='N'||str[0]=='E'?+1:-1
  str=str.replace(/[A-Z]/g,'');
  
  let divided=str.split('°')
  let degs=Number(str.match(/[0-9]+\°/g).join('').replace(/[^0-9]/g,''))
  let minutes=Number(str.match(/[0-9]+\'/g)[0].replace(/[^0-9]/g,''))
  let seconds=Number(str.split(/\'/g)[1])
  let output=degs+(minutes/60)+(seconds/3600)
  
  return sign*output.toFixed(5)

}
const [flightParams,setFlightParams]=useState({
  distance:'---',
  time:'---',
  fuelFlow:'---',
})
const paramsChangeHandler=(name)=>{
  console.log(name);
}
const [openFlightPlan,setOpenFlightPlan]=useState(false);

  return (
   <>
    <div className={cl.top}>
      <div className={cl.inputInner}>
        <input type="text" />
        <img src="img/menuIcons/Search.svg" alt="Поиск" width={15} height={15}/>
      </div>
      <div className={cl.createPlan} onClick={()=>setOpenFlightPlan(prev=>!prev)}>
        <span>План полёта</span>
        <img src="img/menuIcons/file-dock_light.svg" width={20} height={20} alt="" />
      </div>
      <div className={cl.question}>
        <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="9.5" stroke="white"/>
          <path d="M9.2462 11.448C9.2462 11.1767 9.2902 10.9383 9.3782 10.733C9.4662 10.5277 9.57987 10.3443 9.7192 10.183C9.85853 10.0217 10.0052 9.87133 10.1592 9.732C10.3205 9.59267 10.4709 9.457 10.6102 9.325C10.7495 9.193 10.8632 9.05367 10.9512 8.907C11.0392 8.76033 11.0832 8.59533 11.0832 8.412C11.0832 8.104 10.9585 7.85467 10.7092 7.664C10.4599 7.47333 10.1262 7.378 9.7082 7.378C9.30487 7.378 8.95287 7.45133 8.6522 7.598C8.35887 7.74467 8.1132 7.95367 7.9152 8.225L6.8482 7.532C7.1562 7.114 7.55953 6.78767 8.0582 6.553C8.55687 6.311 9.1472 6.19 9.8292 6.19C10.3645 6.19 10.8339 6.27067 11.2372 6.432C11.6405 6.586 11.9559 6.81333 12.1832 7.114C12.4105 7.40733 12.5242 7.76667 12.5242 8.192C12.5242 8.48533 12.4765 8.742 12.3812 8.962C12.2932 9.182 12.1759 9.37633 12.0292 9.545C11.8899 9.70633 11.7395 9.86033 11.5782 10.007C11.4169 10.1463 11.2629 10.2857 11.1162 10.425C10.9769 10.5643 10.8632 10.7147 10.7752 10.876C10.6872 11.0373 10.6432 11.228 10.6432 11.448H9.2462ZM9.9502 14.077C9.69353 14.077 9.48087 13.9927 9.3122 13.824C9.15087 13.6553 9.0702 13.4537 9.0702 13.219C9.0702 12.9843 9.15087 12.7863 9.3122 12.625C9.48087 12.4563 9.69353 12.372 9.9502 12.372C10.2069 12.372 10.4159 12.4563 10.5772 12.625C10.7385 12.7863 10.8192 12.9843 10.8192 13.219C10.8192 13.4537 10.7385 13.6553 10.5772 13.824C10.4159 13.9927 10.2069 14.077 9.9502 14.077Z" fill="white"/>
        </svg>
      </div>
    </div>
      {openFlightPlan&&<Planner/>}

      <Container styles={{marginTop:70+'px',marginBottom:70+'px'}}>
        <MapWrapper/>
      </Container>
   </>
  );
};

export default CreateNavAid;