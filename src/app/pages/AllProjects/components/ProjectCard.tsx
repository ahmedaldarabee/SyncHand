import React from 'react'
import { Bolt,Target } from 'lucide-react';
import { Project } from '@/app/Data/AllProjects';
import getIconComponent from '@/app/Functions/IconsActions';

const ProjectCard = ({project}:{project: Project}) => {

    return (
        <ul className='max-sm:m-auto max-sm:mt-3'>
            <li className='w-[280px] cursor-pointer flex flex-col max-sm:gap-1 md:gap-y-1 rounded-lg max-sm:p-4 md:p-7 drop-shadow-lg bg-white transition-all hover:-translate-y-1'>
                <ProjectHeader project={project} />
                <ProjectBody project={project}/>
                <ProjectFooter project={project}/>
            </li>
        </ul>
    )
}

const ProjectHeader = ({project}:{project: Project}) => {
    return (
        <div className='flex justify-between items-center relative'>
            <div className='flex gap-1 items-center relative'>

                <div className='flex gap-2'>

                    <div className='bg-sky-700 flex justify-center items-center text-white w-[38] h-[38] rounded-md'>
                        {getIconComponent(project.icon)}
                    </div>

                    <div className='flex flex-col'>
                        <span className='capitalize font-bold text-[19px]'>{ truncateString(project.title,25)}</span>
                        <span className='text-[14px] text-slate-400'>{project.createdAt}</span>
                    </div>
                </div>

                <div>
                    <Bolt className='text-slate-400 text-[20px] transition-all hover:text-sky-400'/>
                </div>
            </div>
        </div>
    )
}

const ProjectBody = ({project}:{project: Project}) => {
    return(

        <div className='h-[90px] flex flex-col gap-3 mb-1'>
            <ul className='mt-2 text-slate-400 text-[13px] flex flex-col gap-1 max-sm:ml-1 md:ml-3 list-none'>

                {
                    project.tasks.slice(0,3).map((task) => (
                        <li key={task.id} className='flex gap-2 items-center'>
                            <Target className='text-sky-600 self-start' />
                            <span> {truncateString(task.title,40)} </span>
                        </li>
                    ))
                }
            </ul>

            <div className='text-[11] text-slate-400'>
                {
                    project.tasks.length > 3 && (
                        <span>+ {project.tasks.length -3} tasks</span>
                    )
                }
            </div>
        </div>
    )
}

const ProjectFooter = ({project}:{project: Project}) => {
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

function truncateString(str: string, maxLength: number): string {
    if(str.length > maxLength){
        return str.slice(0, maxLength) + '...';
    }else{
        return str
    }
}

function calculateDaysLeft(createDate: string): number {
    
    const creation = new Date(createDate);
    const now = new Date();

    const differenceInTime = now.getTime() - creation.getTime();
    return Math.floor(differenceInTime / (1000*3600 * 24));
}

function calculateProgressPerennate(totalTasks: number,completedTasks: number
): number {
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100 ) : 0;
}

export default ProjectCard