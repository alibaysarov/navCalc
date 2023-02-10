import React from 'react';
import cl from './index.module.scss';
const Planner = () => {
  return (
    <div className={cl.planner}>
      <div className={cl.content}>
        <h1 className={cl.title}>План полёта</h1>
        <div className={cl.flightParams}>
          <div className={cl.input}>
            <span>Скорость</span>
            <div className={cl.inputInner}>
              <input type="text" />
              <img src="img/arrowDown.svg" width={25} height={25} alt="" />
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
            <p>Расстояние: <span>30 км</span></p>
            <p>Время: <span>39 мин</span></p>
            <p>Расход топлива: <span>20 л.</span></p>
          </div>
          <textarea  cols="30" rows="10"></textarea>
        </div>
        <div className={cl.bottom}>
          <button className={cl.button}>Подать план полёта</button>
        </div>
      </div>
    </div>
  );
};

export default Planner;