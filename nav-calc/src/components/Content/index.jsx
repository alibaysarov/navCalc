import React from 'react';
import cl from './index.module.scss'
const Content = ({children}) => {
    
    return (
        <div  className={cl.content}>
            {children}
        </div>
    );
};

export default Content;