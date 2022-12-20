import React from 'react';
import NavItem from '../NavItem';
import cl from './index.module.scss';   
import {Link} from 'react-router-dom';
const FooterNav = () => {
    
    const menuList=[
        {
            title:'Главная',
            activeImg:'/img/menuIcons/HomeActive.svg',
            defImg:'/img/menuIcons/Home.svg',
            link:'/'
        },
        {
            title:'Сообщения',
            activeImg:'/img/menuIcons/MessageActive.svg',
            defImg:'/img/menuIcons/Message.svg',
            link:'/messages'
        },
        {
            title:'Мои маршруты',
            activeImg:'/img/menuIcons/BookmarkActive.svg',
            defImg:'/img/menuIcons/Bookmark.svg',
            link:'/my-routes'
        },
        {
            title:'Настройки',
            activeImg:'/img/menuIcons/SettingsActive.svg',
            defImg:'/img/menuIcons/Settings.svg',
            link:'/settings'
        },
        {
            title:'Мой профиль',
            activeImg:'/img/menuIcons/UserActive.svg',
            defImg:'/img/menuIcons/User.svg',
            link:'/profile'
        },
    ]
    return (
        <footer className={cl.footer}>
            <div className={cl.navList} >
                {
                    menuList.map((item,index)=>
                    <Link to={item.link}>
                    <NavItem key={index+1} {...item}/>
                    </Link>
                    
                
                )
                }
                
            </div>
        </footer>
    );
};

export default FooterNav;