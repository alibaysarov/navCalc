import React from 'react';
import Container from '../Container';
import cl from './index.module.scss';
import {Link} from 'react-router-dom';
const HeaderBlue = ({title}) => {
    return (
        <header className={cl.header}>
            <div className={cl.content}>
                <Link to="/">
                    <img src="/img/arrowRight.svg" width={20} height={20} alt="Назад" />
                </Link>
                <div className={cl.titleWrap}>
                <h1 className={cl.title}>{title}</h1>
                </div>
                <img src="/img/question.svg" width={20} height={20} alt="Подробнее" />
            </div>
        </header>
            
        
    );
};

export default HeaderBlue;