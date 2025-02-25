import React from 'react'
import Logo  from './Logo';
import Menu from './Menu';
import Profile from './Profile';

const Sidebar = () => {
    return (
        <div className='drop-shadow-lg w-[87px] min-h-screen py-8 bg-white flex flex-col items-center justify-between border-r'>
            <Logo/>
            <Menu/>
            <Profile/>
        </div>
    )
}

export default Sidebar;