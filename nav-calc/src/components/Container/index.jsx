import React from 'react';
import cl from './index.module.scss';
const Container = ({children}) => {
    return (
        <div className={cl.container}>
            {children}
        </div>
    );
};

export default Container;