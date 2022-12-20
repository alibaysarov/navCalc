import React from 'react';
import cl from './index.module.scss';
import { Link } from 'react-router-dom';
const HomeNavCards = () => {
    return (
        <div className={cl.content}>
            <Link to="/createFlightPlan">
            <div className={cl.cardItemLg}>
                <img src="/img/sectional-1.png" alt="" />
                <h2>Создать план полета</h2>
            </div>
            </Link>
            <Link to="/my-routes">
            <div className={cl.cardItem}>
                <img src="/img/myRoutes-1.png" alt="Мои маршруты" />
                <h2>Мои маршруты</h2>
            </div>
            </Link>
            <Link to="/groundspeed">
            <div className={cl.cardItem}>
                <img src="/img/myRoutes-1.png" alt="Мои маршруты" />
                <h2>Калькулятор путевой скорости</h2>
            </div>
            </Link>
            
        </div>
    );
};

export default HomeNavCards;