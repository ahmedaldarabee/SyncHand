"use client"

import React from 'react'
import { Search , ListPlus , Menu } from 'lucide-react';
import { useContextApp } from '../../contextApp';

const ProjectsHeader = () => {
    return (
        <div className='flex justify-between items-center flex-wrap gap-3 sm:gap-4'>
            <SearchBar/>
            <AddProject/>
        </div>
    )
};

function SearchBar(){
    return (
        <div className='flex items-center'>
            {/* search icon */}
            <div className='border-b-2 border-sky-500 h-[39px] w-11 flex justify-center items-center cursor-pointer'>
                <Search className='w-[26px]  text-slate-400 outline-none'/>
            </div>
            {/* search input */}
            <div className='border-b-2 border-slate-200'>
                <input className='outline-none p-2 bg-transparent text-[14px]' type="search" placeholder='Search here...' />
            </div>
        </div>
    )
}

function AddProject(){
    const {
        openSideBarObject: { openSideBar, setOpenSideBar },
        openProjectWindowObject: { openProjectWindow, setOpenProjectWindow }
    } = useContextApp();

    return(
        <div className='flex items-center gap-2 max-sm:ml-auto md:ml-auto'>
            {/* onClick={setOpenProjectWindow(true)} */}
            <button type='button' className='bg-sky-700 transition-all hover:bg-sky-500 text-white p-2 text-[14px] rounded-md text-center flex items-center'>
                <ListPlus />
                <span className='capitalize'> new project </span>
            </button>
            <Menu onClick={() => setOpenSideBar(!openSideBar)} className='text-slate-400 h-9 cursor-pointer hidden max-[940px]:block' />
        </div>
    )
}

export default ProjectsHeader;
export {AddProject , SearchBar}