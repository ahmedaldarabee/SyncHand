"use client";

import React, { useEffect, useRef } from 'react';
import Logo from './Logo';
import Menu from './Menu';
import Profile from './Profile';
import { useContextApp } from '../pages/contextApp';

const Sidebar = () => {
    const { openSideBarObject: { openSideBar, setOpenSideBar } } = useContextApp();
    const sideBarMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sideBarMenuRef.current && !sideBarMenuRef.current.contains(event.target as Node)) {
                setOpenSideBar(false); 
            }
        };

        if (openSideBar) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSideBar, setOpenSideBar]);

    return (
        <div ref={sideBarMenuRef} className={`${openSideBar ? 'w-[280px]' : 'w-[87px] max-[940px]:hidden'} transition-all drop-shadow-lg min-h-screen py-8 bg-white flex flex-col items-center justify-between border-r z-[60]`}>
            <Logo />
            <Menu />
            <Profile />
        </div>
    );
};

export default Sidebar;
