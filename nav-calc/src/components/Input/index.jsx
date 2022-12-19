import React from 'react';
import cl from './index.module.scss';
const Input = ({label,value,setValue,maxLength}) => {
    const inputHandler=(e)=>{
        e.target.value=e.target.value.replace(/(^0{1,1}|[A-Za-zА-Яа-я])/g,'');
        setValue(e.target.value)
    }
    return (
        <div className={cl.InputSimple}>
        <span>{label}</span>
        <input type="text" value={value}  onChange={inputHandler} maxLength={maxLength}/>
        </div>
    );
};

export default Input;