import React from 'react';
import cl  from "./index.module.scss";
import RouteItem from "../RouteItem";
const RouteBlock = ({routes,date}) => {
  return (
    <div className={cl.RouteBlock}>
      <div className={cl.RouteBlockDate}>
        <p>{date}</p>
        <hr />
      </div>
      
      <RouteItem name={'UWUU-UUEE'} time={'2h 35min'}/>
      <RouteItem name={'UWUU-UUEE'} time={'2h 35min'}/>
      <RouteItem name={'UWUU-UUEE'} time={'2h 35min'}/>
      
    </div>
  );
};

export default RouteBlock;