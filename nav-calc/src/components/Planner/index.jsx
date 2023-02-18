import React,{useState} from 'react';
import cl from './index.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { showTime, spdInputHandler,deleteInputHandler } from '../../redux/slices/planSlice';
const Planner = () => {
  const dispatch=useDispatch()
  const {distance,speed,time,waypoints}=useSelector((state)=>state.plan);
  
  
  const inputHandler=(e)=>{
    e.target.value=e.target.value.replace(/[^0-9]/g,'')
    dispatch(spdInputHandler({value:e.target.value}))
    dispatch(showTime())
  }
  const deleteHandler=(e)=>{
    dispatch(deleteInputHandler({name:e.target.name}))
    // console.log(e.target.name); 
  }
  return (
    <div className={cl.planner}>
      <div className={cl.content}>
        <h1 className={cl.title}>План полёта</h1>
        <div className={cl.flightParams}>
          <div className={cl.input}>
            <span>Скорость</span>
            <div className={cl.inputInner}>
              <input type="text" value={speed} onChange={(e)=>{inputHandler(e);}}  />
              <img name={'speed'} onClick={e=>deleteHandler(e)} src="img/arrowDown.svg" width={25} height={25} alt="" />
            </div>
          </div>
          <div className={cl.input}>
            <span>Высота полёта (м.)</span>
            <div className={cl.inputInner}>
              <input type="text" />
              <img src="img/arrowDown.svg" width={25} height={25} alt="" />
            </div>
          </div>
        </div>
        <div className={cl.row}>
          <div className={cl.input}>
            <span>Аэропорт вылета</span>
            <div className={cl.inputInner}>
              <input type="text" />
              <img src="img/arrowDown.svg" width={25} height={25} alt="" />
            </div>
          </div>
          <div className={cl.input}>
            <span>Правила полетов</span>
            <div className={cl.inputInner}>
              <select>
              <option value="vfr">ПВП</option>
                <option value="ifr">ППП</option>
              </select>
              <img src="img/downChevron.svg" width={12} height={9} alt="" />
            </div>
          </div>
        </div>
        <div className={cl.row}>
          <div className={cl.input}>
            <span>Аэропорт назначения</span>
            <div className={cl.inputInner}>
              <input type="text" />
              <img src="img/arrowDown.svg" width={25} height={25} alt="" />
            </div>
          </div>
        </div>
        <div className={cl.textarea}>
          <div className={cl.flightInfo}>
            <p>Расстояние: <span>{distance} км</span></p>
            <p>Время: <span>{time==NaN?'---':time}</span></p>
            <p>Расход топлива: <span>20 л.</span></p>
          </div>
          <div className={cl.routeContent}>
            {waypoints.length
            ?waypoints.map((item,id)=>(
              <div className={cl.routeItem}>
                 <span className={cl.itemNumber}>{id+1}</span>
                 <div className={cl.coords}>
                  {item.latlng}
                  <strong>Координаты:</strong>
                  </div>
                 <div className={cl.distance}>
                    {item.distFrom?item.distFrom+" Км.":'---'} 
                    <strong>Расстояние:</strong>
                  </div>
                  <div className={cl.time}>
                    {item.time}
                    <strong>ETE:</strong>
                  </div>
              </div>
            ))
            :''}
          </div>
        </div>
        <div className={cl.bottom}>
          <button className={cl.button}>Подать план полёта</button>
        </div>
      </div>
    </div>
  );
};

export default Planner;