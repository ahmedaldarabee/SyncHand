import React from 'react'
import { ShieldCheck,Bolt,Target } from 'lucide-react';
const ProjectCard = () => {
    return (
        <ul>
            <li className='w-[280px] max-sm:w-[240px] cursor-pointer flex flex-col max-sm:gap-0 md:gap-y-1 rounded-lg max-sm:p-1 md:p-7 drop-shadow-lg bg-white transition-all hover:-translate-y-1'>
                <ProjectHeader />
                <ProjectBody />
                <ProjectFooter />
            </li>
        </ul>
    )
}

const ProjectHeader = () => {
    return (
        <div className='flex justify-between items-center relative'>
            <div className='flex gap-3 items-center relative'>

                <div className='bg-sky-700 flex justify-center items-center text-white w-[38] h-[38] rounded-md'>
                    <ShieldCheck className='w-5 h-5' />
                </div>

                <div className='flex flex-col'>
                    <span className='capitalize font-bold text-[19px]'>project title</span>
                    <span className='text-[14px] text-slate-400'>3day ago</span>
                </div>

                <div className='absolute -right-14 top-[50%]'>
                    <Bolt className='text-slate-400 text-[20px] transition-all hover:text-sky-400'/>
                </div>
            </div>
        </div>
    )
}

const ProjectBody = () => {
    return(
        <ul className='mt-2 text-slate-400 text-[13px] flex flex-col gap-1 max-sm:ml-1 md:ml-3 list-none'>

            <li className='flex gap-2 items-center'>
                <Target className='text-sky-600 self-start' />
                <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, qui!</span>
            </li>
            <li className='flex gap-2 items-center'>
                <Target className='text-sky-600 self-start' />
                <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas, qui!</span>
            </li>
        </ul>
    )
}

const ProjectFooter = () => {
    return(
        <div className='flex max-sm:gap-1 gap-4 flex-col m-2'>
            <div className='text-[12px] flex gap-3 items-center w-full'>
                <div className='w-full max-sm:w-[80%] h-[7px] rounded-xl bg-slate-100 overflow-hidden'>
                    <div className='w-[60%] transition-all bg-red-600 h-full rounded-r-xl'></div>
                </div>
            </div>

            <div className='flex justify-between gap-1 max-sm:flex-col'>

                <p className='text-[13px] text-slate-400'>
                    on progress
                </p>

                <div className='flex'>
                    <span className='text-[12px]'>50%</span>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard