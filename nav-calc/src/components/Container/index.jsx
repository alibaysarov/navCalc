import React from 'react';
import cl from './index.module.scss';
const Container = ({children,styles}) => {
    return (
        <div style={styles} className={cl.container}>
            {children}
        </div>
    );
};

export default Container;