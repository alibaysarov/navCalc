import React from 'react';
import cl from './index.module.scss'
const Result = (props) => {
    return (
        <div className={cl.container}>
            
            <div className={cl.items}>
            <div className={cl.item}>
                <span>Путевая скорость</span>
                <strong>{props.groundSpeed} КМ/Ч</strong>
            </div>
            <div className={cl.item}>
                <span>Курс самолёта</span>
                <strong>{props.heading}°</strong>
            </div>
            </div>
            <hr />
            <div className={cl.items}>
                <div className={cl.item}>
                    <span>Угол сноса</span>
                    <strong>{props.driftAngle}°</strong>
                </div>
            </div>
        </div>
    );
};

export default Result;