import { RotateCcw, ListCheck ,UserCog, Trash2 } from 'lucide-react';
import React from 'react'

// add box-shadow to each box
// add animation on in progress status

const TasksList = () => {
    return (
        <div className='m-10 flex flex-col gap-4 max-sm:m-0 max-sm:mt-7  max-sm:gap-1 h-[80%]'>
            <Tabs />
            <div className='projects-bar flex flex-col gap-4 w-full h-full overflow-auto'>
                <SingleTask />
                <SingleTask />
                <SingleTask />
                <SingleTask />
            </div>
        </div>
    )
}

const Tabs = () => {
    return(
        <div className='flex max-sm:flex-col max-sm:items-start items-center max-sm:gap-2 gap-6 ml-3 mt-8 mb-5 max-sm:m-1'>

            <div className='flex gap-2 text-sky-400 font-semibold'>
                <span className='capitalize'>on going task</span>
                <span className='bg-sky-600 text-white px-2 rounded-md'>7</span>
            </div>

            <div className='text-slate-400 flex gap-2 items-center'>
                <span className='capitalize'> completed tasks </span>
                <span className='bg-slate-200 px-2 rounded-md'>8</span>
            </div>
        </div>
    )
}

const SingleTask = () => {
    return (
        <div className=' flex gap-2 items-center max-sm:flex-col cursor-pointer'>
            {/* <Checkbox /> */}
            <div className='w-full bg-white hover:bg-slate-200 transition-all drop-shadow-lg rounded-lg border border-slate-300 max-sm:flex-col md:flex-col lg:flex-row flex gap-3 items-center justify-between p-5 py-6 max-sm:p-2 max-sm:py-2 max-sm:gap-1 flex-wrap'>
                
                {/* intro info */}
                <div className='flex gap-3 items-center'>
                    {/* intro icon */}
                    <div>
                        <div className='max-sm:hidden bg-sky-600 rounded-lg p-2 flex items-center justify-center'>
                            <ListCheck className='w-4 h-4 text-white'/>
                        </div>
                    </div>

                    {/* into info */}
                    
                    <div className='flex flex-col max-sm:text-[14px] md:text-[20px]'>

                        <span className='capitalize font-bold hover:text-sky-400 cursor-pointer transition-all'> create the ui design of the test</span>

                        <div className='flex'>
                            <span className='text-slate-400 text-[13px] p-[2px] capitalize'>project
                            </span>
                        </div>
                    </div>
                </div>

                {/* status info */}
                <div className='flex lg:gap-36 font-bold items-center max-sm:gap-1 md:gap-5 max-sm:flex-col md:flex-col lg:flex-row'>

                    <div className='flex gap-2 items-center'>
                        <RotateCcw className='text-[24px] text-sky-700' />
                        <span className='text-[14px] text-slate-400 capitalize'> in progress
                        </span>
                    </div>

                    {/* priority */}
                    <div className='flex gap-2 items-center'>
                        <RotateCcw className='text-[10px] text-sky-700' />
                        <span className='text[14px] text-slate-400'>low</span>
                    </div>

                    {/* actions */}
                    <div className='flex gap-2 items-center'>

                        {/* edit btn */}
                        <div className='rounded-lg p-2 bg-sky-600 hover:bg-sky-400 transition-all cursor-pointer flex items-center justify-center'>
                            <UserCog className='w-4 h-4 text-white' />
                        </div>
                        
                        {/* trash btn */}
                        <div className='rounded-lg p-2 bg-sky-600 hover:bg-sky-400 transition-all cursor-pointer flex items-center justify-center'>
                            <Trash2 className='w-4 h-4 text-white' />
                        </div>
                        
                    </div>


                </div>
            </div>
        </div>
    )
}

export default TasksList