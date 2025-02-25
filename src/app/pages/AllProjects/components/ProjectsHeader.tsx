import React from 'react'
import { Search , ListPlus } from 'lucide-react';

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
    return(
        <button type='button' className='bg-sky-700 transition-all hover:bg-sky-500 text-white p-2 text-[14px] rounded-md text-center flex items-center'>
            <ListPlus />
            <span className='capitalize'> new project </span>
        </button>
    )
}

export default ProjectsHeader;
export {AddProject , SearchBar}