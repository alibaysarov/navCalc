import React from 'react';
import cl from './index.module.scss'
const Content = ({children,styles}) => {
    
    return (
        <div style={styles} className={cl.content}>
            {children}
        </div>
    );
};

export default Content;