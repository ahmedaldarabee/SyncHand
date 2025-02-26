"use client"

import React, { useEffect, useRef } from 'react'
import Logo  from './Logo';
import Menu from './Menu';
import Profile from './Profile';
import { useContextApp } from '../pages/contextApp';

const Sidebar = () => {
    const { openSideBarObject: {openSideBar,setOpenSideBar} } = useContextApp();

    const sideBarMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // sideBarMenuRef.current that refer the current value or here is element, this case mean that if be null or not!
            // event.target element that click on it
            // !sideBarMenuRef.current.contains(event.target as Node) to check if clicked element not within sidebar!
            if(sideBarMenuRef.current && !sideBarMenuRef.current.contains(event.target as Node)){
                setOpenSideBar(!openSideBar);
            }
        }

        if(openSideBar){
            document.addEventListener("mousedown",handleClickOutside);
        }else{
            document.removeEventListener("mousedown",handleClickOutside);
        }
        
        return() => {
            document.removeEventListener("mousedown",handleClickOutside);
        }
    },[openSideBar,setOpenSideBar]);

    return (
        // fixed: to be above all of element not next it!
        <div ref={sideBarMenuRef} className={`${openSideBar?'w-[280px] fixed':'w-[87px] max-[940px]:hidden'} transition-all drop-shadow-lg min-h-screen py-8 bg-white flex flex-col items-center justify-between border-r z-[60]`}>
            <Logo/>
            <Menu/>
            <Profile/>
        </div>
    )
}

export default Sidebar;