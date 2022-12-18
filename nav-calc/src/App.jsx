import React from "react";
import Number from './mathLogic.js';
import {groundSpeed} from './aeroNavLogic.js'
function App() {
  const [airspeedInput,setAirSpeedInput]=React.useState('');
  const airspeedInputHandler=(e)=>{
    e.target.value=e.target.value.replace(/(^0{1,1}|[A-Za-zА-Яа-я])/g,'')
    setAirSpeedInput(e.target.value);
    
  }
  const [windSpeedInput,setWindSpeedInput]=React.useState('');
  const windSpeedInputHandler=(e)=>{
    e.target.value=e.target.value.replace(/(^0{1,1}|[A-Za-zА-Яа-я])/g,'')
    setWindSpeedInput(e.target.value);
    
  }
  const [course,setCourse]=React.useState('');
  const courseInputHandler=(e)=>{
    e.target.value=e.target.value.replace(/(^0{1,1}|[A-Za-zА-Яа-я])/g,'')
    setCourse(e.target.value);
    
  }
  const [windDirection,setWindDirection]=React.useState('');
  const windDirectionHandler=(e)=>{
    e.target.value=e.target.value.replace(/(^0{1,1}|[A-Za-zА-Яа-я])/g,'')
    setWindDirection(e.target.value);
    
  }
  const airSpd=Number(airspeedInput);
  const windSpd=Number(windSpeedInput);
  const magnetCourse=Number(course);
  const windDir=Number(windDirection);
  const res=groundSpeed(airSpd,windSpd,magnetCourse,windDir)
 console.log(res)
  return (
   <div>
    <input type="text" value={airspeedInput} placeholder="Воздушная скорость" onChange={airspeedInputHandler} />
    <input type="text" value={windSpeedInput} placeholder="Скорость ветра" onChange={windSpeedInputHandler} />
    <input type="text" value={course} placeholder="Путевой угол" onChange={courseInputHandler}  />
    <input type="text" value={windDirection} placeholder="Направление ветра" onChange={windDirectionHandler} />
    <h3>{`Путевая скорость равна ${res}`}</h3>
   </div>
  );
}

export default App;
