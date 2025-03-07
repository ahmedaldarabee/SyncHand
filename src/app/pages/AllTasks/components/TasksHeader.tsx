import React from 'react'
import { SearchBar } from '../../AllProjects/components/ProjectsHeader'
import { useContextApp } from '../../contextApp';
import { ListPlus, Menu } from 'lucide-react';

const TasksHeader = () => {
    return (
        <div className='w-full flex justify-between items-center flex-wrap gap-3 sm:gap-4'>
            <SearchBar />
            <AddTask />
        </div>
    )
}

function AddTask(){
    const {
        openSideBarObject: { openSideBar, setOpenSideBar },
        openTasksWindowObject:{setOpenTasksWindow}
    } = useContextApp();

    return(
        <div className='flex items-center gap-2 max-sm:ml-auto md:ml-auto'>
            
            <button
            onClick={() => {
                setOpenTasksWindow(true);
            }}
            type='button' className='bg-sky-700 transition-all hover:bg-sky-500 text-white p-2 text-[14px] rounded-md text-center flex items-center'>

                <ListPlus />
                <span className='capitalize'> add task </span>
            </button>

            <Menu onClick={() => setOpenSideBar(prev => !prev)} className='text-slate-400 h-9 cursor-pointer hidden max-[940px]:block' />
        </div>
    )
}

export default TasksHeader