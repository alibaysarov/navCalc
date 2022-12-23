import React from 'react';
import cl from './index.module.scss';
const SelectInput = ({label,value,setValue,options,maxLength}) => {
  const inputHandler=(e)=>{
    e.target.value=e.target.value.replace(/(^0{1,1}|[A-Za-zА-Яа-я])/g,'');
    setValue({...value,value:e.target.value.trim()})
    }

    const [selectOpened,setSelectOpened]=React.useState(false);
    const selectHandler=(unit)=>{
      setSelectOpened(prev=>!prev)
    }
    const deleteHandler=(e)=>{
      setValue({...value,value:''})
    }
    const [defUnit,setDefUnit]=React.useState(options[0].text)
    const measureUnitSelect=(unit)=>{
      if(selectOpened){
        setValue({...value,measure:unit.val})
        setDefUnit(unit.text)
      }
      return
    }
    console.log(value)

    return (
        <div className={cl.Input}>
        <span>{label}</span>
          <input type="text" value={value.value} onChange={inputHandler} maxLength={maxLength}/>

          <img onClick={deleteHandler} className={cl.closeImg} src='/img/closeIcon.svg' width={15} height={15} alt="Закрыть" />

        <div className={cl.select} onClick={selectHandler}>
          <img src="/img/arrowDn.svg" alt="Стрелка" width={10} height={7} />
          <div className={selectOpened?cl.options+' '+cl.show:cl.options}>
            <div className={cl.option}>{defUnit}</div>
          {
            options.map((opt,index)=>
            <div key={index+1} className={cl.option} onClick={()=>measureUnitSelect(opt)}>{opt.text}</div>)
          }
          

          </div>
          
        </div>
        </div>
    );
};

export default SelectInput;