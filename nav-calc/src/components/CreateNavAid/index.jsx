import React from 'react';
import Container from '../Container';
import Content from '../Content';
import Title from '../Title';
import MapWrapper from '../Map';
import cl from './index.module.scss'
import { IMaskInput } from 'react-imask';
import {SphericalUtil, PolyUtil} from "node-geometry-library";


const CreateNavAid = () => {
  const [textInputVal,setTextInputVal]=React.useState('');
  const inputHandler=(e)=>{
    setTextInputVal(e.target.value)
  }
  const[latVal,setLatVal]=React.useState('');
  const[lngVal,setLngVal]=React.useState('');
  const [showMap,setShowMap]=React.useState(false)
  const showMaphandler=()=>{
    setShowMap(prev=>!prev)
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
const latInputHandler=(e)=>{
  setLatVal(e.target.value)
  console.log(latVal)
}
const lngInputHandler=(e)=>{
  setLngVal(e.target.value)
  console.log(lngVal)
}
class WayPoint{
  constructor(lat,lng){
    this.lat=lat
    this.lng=lng
  }
}

const [wpArray,setWpArray]=React.useState([])
const createWaypointHandler=()=>{
  if(latVal=='' || lngVal==''){
    return
  }else{
    setWpArray(prev=>[...prev,new WayPoint(coordsDecimal(latVal),coordsDecimal(lngVal))])

    if(wpArray.length>1){
      function addDistanceToWpt(item,index){
        if(index>0){
          let distToWpt=countDistance(wpArray)[index+1]?countDistance(wpArray)[index+1]:0
        return{
          ...item,
          distanceToWpt:distToWpt
        }
        }else{
          return{
            ...item,
            distanceToWpt:'---'
          }
        }
      }
      setWpArray(prev=>prev.map(addDistanceToWpt))
      console.log(wpArray)
      // wpArray.map(addDistanceToWpt)
    }
  
  }
  
}


function countDistance(arr){
  if(arr.length<2){
    return 0
  }
  let legs=[]
  for (let i = 0; i < arr.length; i++) {
    const fromElem = arr[i];
    const toElem=arr[i+1]?arr[i+1]:fromElem
    legs.push(SphericalUtil.computeDistanceBetween(fromElem,toElem)/1000/1.852)
  }

  return legs.slice(0,-1)
}


  return (
    <Container
      styles={{
        marginTop:70+'px',
        marginBottom:70+'px'
      }}>
      {/* <Title size={20} weight={400}>Создание точки</Title> */}
      {/* <div className={cl.createContent}>
        <Title size={14}>Название</Title>
        <input type="text" style={{marginTop:8+'px'}} className={cl.textInput} value={textInputVal} onChange={inputHandler} />
        <div className={cl.coordinates}>
        <Title size={14}>Координаты</Title>

        <Content styles={{marginTop:10+'px'}}>
        <div className={cl.coordinatesField}>
          <span>Широта</span>
          <IMaskInput
            mask="N00°00'00.0000''" 
            value={latVal}
            ref={ref}
            inputRef={inputRef}
            onChange={latInputHandler}
          />
            <img src="/img/closeIcon2.svg" className={cl.closeImg} width={20} height={20} alt="" />
         
            
        </div>
        <div className={cl.coordinatesField}>
          <span>Долгота</span>
          <IMaskInput
            mask="E00°00'00.0000''" 
            value={lngVal}
            onChange={lngInputHandler}
          /> 
            <img src="/img/closeIcon2.svg" className={cl.closeImg} width={20} height={20} alt="" />
        </div>
        
        </Content>
        
      </div>
      <div className={cl.buttons}>
        <button onClick={createWaypointHandler} className={cl.addButton}>Добавить в план</button>
        <button onClick={showMaphandler} className={cl.addButton}>Показать на карте</button>
      </div>
      </div> */}
      
        <MapWrapper isShown={showMap} hideHandler={showMaphandler}/> 
      
    </Container>
  );
};

export default CreateNavAid;