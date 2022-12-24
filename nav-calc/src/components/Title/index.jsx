import React from 'react';
import cl from './index.module.scss'
const Title = ({children,size=30,weight=400}) => {
  
  return (
    <h2 style={{
      fontWeiht:weight,
      fontSize:size+'px'
    }} className={cl.title}>
      {children}
    </h2>
  );
};

export default Title;