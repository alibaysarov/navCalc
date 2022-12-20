import React from 'react';
import cl from './index.module.scss';
const Header = () => {
    return (
        <header className={cl.header}>
            <div className={cl.content}>
                <div>
                    <img src="/img/logo.svg" width={137} height={37} alt="Логотип" />
                </div>
                <div className={cl.utc}>
                17:30:21 <strong>UTC</strong>
                </div>
            </div>
        </header>
    );
};

export default Header;