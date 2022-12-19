import React from "react";
import Number from './mathLogic.js';
import {groundSpeed} from './aeroNavLogic.js'
import Input from './components/Input';
import SelectInput from "./components/SelectInput";
import Content from "./components/Content";
import Container from './components/Container';
import Result from "./components/Result";

function App() {
  const [airspeedInput,setAirSpeedInput]=React.useState({value:'',measure:'kmh'});
  const [windSpeedInput,setWindSpeedInput]=React.useState({value:'',measure:'ms'});
  const [course,setCourse]=React.useState('');
  const [windDirection,setWindDirection]=React.useState('');
  

  const airSpd={...airspeedInput}
  const windSpd={...windSpeedInput};
  const magnetCourse=Number(course.trim());
  const windDir=Number(windDirection.trim());

  const res=groundSpeed(airSpd,windSpd,magnetCourse,windDir)
  console.log(res)
  
  
 
 const styles={
  title:{
    textTransform:'uppercase',
    textAlign:'center'
  }
 }
 const options=[
  {
    text:'КМ/ч',
    val:'kmh'
  },
  {
    text:'MPH',
    val:'mph'
  },
  {
    text:'KTS',
    val:'kts'
  },
 ]
 const windOptions=[
  {
    text:'М/С',
    val:'ms'
  },
  {
    text:'КМ/Ч',
    val:'kmh'
  },
  {
    text:'KN',
    val:'kts'
  },
 ]
  return (
   <>
    <Container>
      <h3 style={styles.title}>Путевая скорость</h3>
        <Content>
            <SelectInput
              label='Воздушная скорость'
              value={airspeedInput}
              setValue={setAirSpeedInput}
              options={options}
              
            />
            <SelectInput
              label="Скорость ветра"
              value={windSpeedInput}
              setValue={setWindSpeedInput}
              options={windOptions}
            />
            <Input label="Путевой угол" maxLength={3} value={course} setValue={setCourse}/>
            <Input label="Направление ветра" maxLength={3} value={windDirection} setValue={setWindDirection}/>
        </Content>
        <Result {...res} />
    </Container>
   </>
  );
}

export default App;
