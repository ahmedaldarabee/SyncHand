import React from 'react'
import { CirclePower } from 'lucide-react';

const ProjectsEmptyScreen = () => {
    return (
        <div className='cursor-pointer transition-all flex gap-5 flex-col justify-center items-center absolute lg:top-[50%] lg:left-[50%] lg:translate-x-[-70%] lg:translate-y-[-32%]
        max-sm:top-[50%] max-sm:left-[50%] max-sm:translate-x-[-50%] max-sm:translate-y-[-32%]
        '>
            <CirclePower className='w-32 h-32 text-slate-400 transition-all hover:text-sky-700'/>

            <div className='flex flex-col items-center gap-2'>
                <h3 className='font-semibold text-slate-600 text-[16px] mb-1 text-center'>
                    nothing created right now
                </h3>
                <p className='text-slate-400 w-[340px] text-center text-[13px]'>
                    you hav't any project or notes or tasks now, try to create a new project to start managing your tasks!
                </p>
            </div>
        </div>
    )
}

export default ProjectsEmptyScreen