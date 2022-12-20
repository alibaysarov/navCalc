import React from 'react';
import NavItem from '../NavItem';
import cl from './index.module.scss';   
const FooterNav = () => {
    
    const menuList=[
        {
            title:'Главная',
            activeImg:'/img/menuIcons/HomeActive.svg',
            defImg:'/img/menuIcons/Home.svg'
        },
        {
            title:'Сообщения',
            activeImg:'/img/menuIcons/MessageActive.svg',
            defImg:'/img/menuIcons/Message.svg'
        },
        {
            title:'Мои маршруты',
            activeImg:'/img/menuIcons/BookmarkActive.svg',
            defImg:'/img/menuIcons/Bookmark.svg'
        },
        {
            title:'Настройки',
            activeImg:'/img/menuIcons/SettingsActive.svg',
            defImg:'/img/menuIcons/Settings.svg'
        },
        {
            title:'Мой профиль',
            activeImg:'/img/menuIcons/UserActive.svg',
            defImg:'/img/menuIcons/User.svg'
        },
    ]
    return (
        <footer className={cl.footer}>
            <div className={cl.navList} >
                {
                    menuList.map((item,index)=>
                    <NavItem key={index+1} {...item}/>
                // <div key={index+1} className={cl.navItem} onClick={clickHandler}>
                // <img src={active?item.activeImg:item.defImg} width={43} height={43} alt="" />
                // <span className={active?cl.navText+' '+cl.clicked:cl.navText}>{item.title}</span>
                // </div>
                )
                }
                
            </div>
        </footer>
    );
};

export default FooterNav;