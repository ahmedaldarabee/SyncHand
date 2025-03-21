"use client"

import React, { useEffect, useRef } from 'react'
import { Search, ListPlus, Menu } from 'lucide-react';
import { useContextApp } from '../../contextApp';

interface ProjectsHeaderProps {
    globalSearchProject: string;
    onChange: (value: string) => void;
}

const ProjectsHeader = ({
    globalSearchProject,
    onChange,
}: ProjectsHeaderProps) => {
    return (
        <div className='flex justify-between items-center flex-wrap gap-3 sm:gap-4'>
            <SearchBar globalSearchProject={globalSearchProject} onChange={onChange} />
            <AddProject />
        </div>
    )
};

interface SearchBarProps {
    globalSearchProject: string;
    onChange: (value: string) => void;
}

function SearchBar({ globalSearchProject, onChange }: SearchBarProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            const len = inputRef.current.value.length;
            inputRef.current.focus();
            inputRef.current.setSelectionRange(len, len);
        }
    }, [globalSearchProject]);  // إضافة [globalSearchProject] كـ dependency

    return (
        <div className='flex items-center'>

            {/* search icon */}
            <div className='border-b-2 border-sky-500 h-[39px] w-11 flex justify-center items-center cursor-pointer'>
                <Search className='w-[26px] text-slate-400 outline-none' />
            </div>

            {/* search input */}
            <div className='border-b-2 border-slate-200 transition-all'>
                <input
                    ref={inputRef}
                    value={globalSearchProject}
                    onChange={handleInputChange}
                    className='lg:focus:w-[300px] w-[200px] transition-all cursor-pointer outline-none p-2 bg-transparent text-[14px]'
                    type="text"
                    placeholder='Search here...'
                />
            </div>
        </div>
    )
}

function AddProject() {
    const {
        openSideBarObject: { setOpenSideBar },
        openProjectWindowObject: { setOpenProjectWindow }
    } = useContextApp();

    function handleClickedAddProjectBtn() {
        setOpenProjectWindow(true);
    }

    return (
        <div className='flex items-center gap-2 max-sm:ml-auto md:ml-auto'>
            <button
                type='button'
                onClick={handleClickedAddProjectBtn}
                className='bg-sky-700 transition-all hover:bg-sky-500 text-white p-2 text-[14px] rounded-md text-center flex items-center'>
                <ListPlus />
                <span className='capitalize'>new project</span>
            </button>

            <Menu
                onClick={() => setOpenSideBar(prev => !prev)}
                className='text-slate-400 h-9 cursor-pointer hidden max-[940px]:block'
            />
        </div>
    )
}

export default ProjectsHeader;
export { AddProject, SearchBar };
