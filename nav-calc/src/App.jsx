import React from "react";
import Number from './mathLogic.js';
import {findMeDriftAngle} from './aeroNavLogic.js'
function App() {
  const [airspeedInput,setAirSpeedInput]=React.useState('');
  const airspeedInputHandler=(e)=>{
    e.target.value=Number(e.target.value.replace(/\D/g,''))
    setAirSpeedInput(e.target.value);
    
  }
  const [windSpeedInput,setWindSpeedInput]=React.useState('');
  const windSpeedInputHandler=(e)=>{
    e.target.value=Number(e.target.value.replace(/\D/g,''))
    setWindSpeedInput(e.target.value);
    
  }
  const [course,setCourse]=React.useState('');
  const courseInputHandler=(e)=>{
    e.target.value=Number(e.target.value.replace(/\D/g,''))
    setCourse(e.target.value);
    
  }
  const [windDirection,setWindDirection]=React.useState('');
  const windDirectionHandler=(e)=>{
    e.target.value=Number(e.target.value.replace(/\D/g,''))
    setWindDirection(e.target.value);
    
  }
  
  let res=findMeDriftAngle(airspeedInput,windSpeedInput,course,windDirection)
 
  return (
   <div>
    <input type="text" value={airspeedInput} placeholder="Воздушная скорость" onChange={airspeedInputHandler} />
    <input type="text" value={windSpeedInput} placeholder="Скорость ветра" onChange={windSpeedInputHandler} />
    <input type="text" value={course} placeholder="Путевой угол" onChange={courseInputHandler} onBlur={()=>setCourse('')} />
    <input type="text" value={windDirection} placeholder="Направление ветра" onChange={windDirectionHandler} />
    <h3>{'Угол сноса равен:'+res}</h3>
   </div>
  );
}

export default App;
