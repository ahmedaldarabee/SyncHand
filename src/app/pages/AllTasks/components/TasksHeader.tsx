import React, { useEffect, useRef } from 'react'
import { SearchBar } from '../../AllProjects/components/ProjectsHeader'
import { useContextApp } from '../../contextApp';
import { ListPlus, Menu, SearchIcon } from 'lucide-react';

const TasksHeader = () => {
    return (
        <div className='w-full flex justify-between items-center flex-wrap gap-3 sm:gap-4'>
            <SearchBarTasks />
            <AddTask />
        </div>
    )
}

function SearchBarTasks() {
    const { taskSearch, setTaskSearch } = useContextApp();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      // Restore focus to the input element after each render
        if (inputRef.current) {
            const len = inputRef.current.value.length;
            inputRef.current.focus();
            inputRef.current.setSelectionRange(len, len);
        }
    });

    return (
        <div className=" flex  items-center">
            <div className="border-b-2 border-sky-600 h-[39px] w-11 justify-center flex items-center">
            <SearchIcon
                className="text-slate-400 outline-none h-4 w-4"
            />
            </div>

            <div className=" border-b-2 border-slate-200">
            <input
                ref={inputRef}
                value={taskSearch}
                onChange={(e) => setTaskSearch(e.target.value)}
                placeholder="Search a Task..."
                className={`p-2 bg-transparent text-[14px] outline-none`}
            />
            </div>
        </div>
    );
}

function AddTask(){
    const {
        openSideBarObject: { openSideBar, setOpenSideBar },
        openTasksWindowObject:{openTasksWindow, setOpenTasksWindow},
        allProjectsObject: { allProjects },

    } = useContextApp();

    return(
        <div className='flex items-center gap-2 max-sm:ml-auto md:ml-auto'>
            
            <button
                // disabled={allProjects.length === 0}
                onClick={() => setOpenTasksWindow(!openTasksWindow)}
                type='button'
                className='bg-sky-700 transition-all hover:bg-sky-500 text-white p-2 text-[14px] rounded-md text-center flex items-center'>

                <ListPlus />
                <span className='capitalize'> add task </span>
            </button>

            <div className="max-[940px]:block hidden">
                <Menu onClick={() => setOpenSideBar(prev => !prev)} className='text-slate-400 h-9 cursor-pointer hidden max-[940px]:block' />
            </div>
        </div>
    )
}

export default TasksHeader