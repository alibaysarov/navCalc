import React from 'react';
import cl from './index.module.scss';
const SelectInput = ({label,value,setValue}) => {
  const inputHandler=(e)=>{
    e.target.value=e.target.value.replace(/(^0{1,1}|[A-Za-zА-Яа-я])/g,'');
    setValue(e.target.value)
    }

    const [selectOpened,setSelectOpened]=React.useState(false);
    const selectHandler=()=>{
      setSelectOpened(prev=>!prev)
    }

    return (
        <div className={cl.Input}>
        <span>Скорость самолёта</span>
          <input type="text" value={value} onChange={inputHandler} />
        <div className={cl.select} onClick={selectHandler}>
          <img src="/img/arrowDn.svg" alt="Стрелка" width={10} height={7} />
          <div className={selectOpened?cl.options+' '+cl.show:cl.options}>

          <div className={cl.option}>
            КМ/Ч
          </div>
          <div className={cl.option}>
            MPH
          </div>
          <div className={cl.option}>
            KTS
          </div>

          </div>
          
        </div>
        </div>
    );
};

export default SelectInput;