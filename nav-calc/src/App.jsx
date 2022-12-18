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
 const styles={
  title:{
    textTransform:'uppercase',
    textAlign:'center'
  }
 }
  return (
   <div>
    
    <div className="container">
    <h3 style={styles.title}>Путевая скорость</h3>
      <div className="groundSpeedInputs">

        <div className="groundSpeedInput">
        <span>Скорость самолёта</span>
          <input type="text" value={airspeedInput} onChange={airspeedInputHandler} />
        <div className="select">
          <img src="/img/arrowDn.svg" alt="Стрелка" width={10} height={7} />
          <div className="options">

          <div className="option">
            КМ/Ч
          </div>
          <div className="option">
            MPH
          </div>
          <div className="option">
            KTS
          </div>

          </div>
          
        </div>
        </div>

        <div className="groundSpeedInput">
        <span>Скорость ветра</span>
        <input type="text" value={windSpeedInput}  onChange={windSpeedInputHandler} />
        </div>

        <div className="groundSpeedInput">
        <input type="text" value={course} placeholder="Путевой угол" onChange={courseInputHandler}  />
        </div>
        <div className="groundSpeedInput">
        <input type="text" value={windDirection} placeholder="Направление ветра" onChange={windDirectionHandler} />
        </div>
      </div>

    </div>
   </div>
  );
}

export default App;
