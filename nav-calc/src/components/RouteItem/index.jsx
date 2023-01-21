import React from 'react';
import  cl  from "./index.module.scss";
const RouteItem = ({name,time}) => {
  return (
    <div className={cl.RouteItem}>
      <div className={cl.image}>
        <img src="#" alt="Картинка маршрута" />
      </div>

      <div className={cl.info}>
        <h2 className={cl.title}>{name}</h2>
        <span className={cl.time}>{time}</span>
      </div>
    </div>
  );
};

export default RouteItem;