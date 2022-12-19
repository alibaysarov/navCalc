import React from 'react';

const Input = ({label,value,setValue}) => {
    const inputHandler=(e)=>{
        e.target.value=e.target.value.replace(/(^0{1,1}|[A-Za-zА-Яа-я])/g,'');
        setValue(e.target.value)
    }
    return (
        <div className="groundSpeedInputSimple">
        <span>{label}</span>
        <input type="text" value={value}  onChange={inputHandler} />
        </div>
    );
};

export default Input;