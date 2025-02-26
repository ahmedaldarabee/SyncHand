"use client"

import React from 'react'
import Logo  from './Logo';
import Menu from './Menu';
import Profile from './Profile';
import { useContextApp } from '../pages/contextApp';

const Sidebar = () => {
    const { openSideBarObject: {openSideBar} } = useContextApp();

    return (
        // fixed: to be above all of element not next it!
        <div className={`${openSideBar?'w-[280px] fixed':'w-[87px] max-[940px]:hidden'} transition-all drop-shadow-lg min-h-screen py-8 bg-white flex flex-col items-center justify-between border-r z-[90]`}>
            <Logo/>
            <Menu/>
            <Profile/>
        </div>
    )
}

export default Sidebar;