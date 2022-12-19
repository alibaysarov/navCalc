import React from "react";
import Number from './mathLogic.js';
import {groundSpeed} from './aeroNavLogic.js'
import Input from './components/Input';
import SelectInput from "./components/SelectInput";
import Content from "./components/Content";
import Container from './components/Container';

function App() {
  const [airspeedInput,setAirSpeedInput]=React.useState('');
  
  const [windSpeedInput,setWindSpeedInput]=React.useState('');
  
  const [course,setCourse]=React.useState('');
  
  const [windDirection,setWindDirection]=React.useState('');
  
  const airSpd=Number(airspeedInput.trim());
  const windSpd=Number(windSpeedInput.trim());
  const magnetCourse=Number(course.trim());
  const windDir=Number(windDirection.trim());
  const res=groundSpeed(airSpd,windSpd,magnetCourse,windDir)

  
  
 
 const styles={
  title:{
    textTransform:'uppercase',
    textAlign:'center'
  }
 }
  return (
   <div>
    
    <Container>
      <h3 style={styles.title}>Путевая скорость</h3>
        <Content>
            <SelectInput label='Воздушная скорость' value={airspeedInput} setValue={setAirSpeedInput}/>
            <Input label="Скорость ветра" value={windSpeedInput} setValue={setWindSpeedInput}/>
            <Input label="Путевой угол" value={course} setValue={setCourse}/>
            <Input label="Направление ветра" value={windDirection} setValue={setWindDirection}/>
        </Content>
          <h2>{res}</h2>
    </Container>
   </div>
  );
}

export default App;
