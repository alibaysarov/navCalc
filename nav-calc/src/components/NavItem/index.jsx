import React from 'react';
import cl from './index.module.scss';
const NavItem = ({title,defImg,activeImg}) => {
    const [active,setActive]=React.useState(false)
    // const clickHandler=()=>{
    //     setActive(prev=>!prev)
    // }
    return (
        <div className={cl.navItem}>
            <img src={active?activeImg:defImg} width={43} height={43} alt="" />
            <span className={active?cl.navText+' '+cl.clicked:cl.navText}>{title}</span>
        </div>
    );
};

export default NavItem;