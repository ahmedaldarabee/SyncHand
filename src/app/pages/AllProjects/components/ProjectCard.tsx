"ure client"

import React, { useRef } from 'react'
import { Target,BadgePlus, EllipsisVertical } from 'lucide-react';
import { Project } from '@/app/Data/AllProjects';
import getIconComponent from '@/app/Functions/IconsActions';
import { useContextApp } from '../../contextApp';

const ProjectCard = ({project}:{project: Project}) => {
    const daysLeft = calculateDaysLeft(project.createdAt);
    const progressPercentage = calculateProgressPerennate(
        project.tasks.length,
        project.tasks.filter((task) => task.status === "Completed").length
    );

    const threeDotsRef = useRef<HTMLDivElement>(null);

    const {
        openDropDownObject: {setOpenDropDown},
        dropDownPositionObject: {setDropDownPosition},
        selectedProjectObject: { setSelectedProject },

        chosenProjectObject: { chosenProject, setChosenProject },
        sideBarMenuObject:{sideBarMenu,setSideBarMenu},
    } = useContextApp();

    function openDropDown(event: React.MouseEvent){
        event.preventDefault();
        event.stopPropagation();

        if(threeDotsRef.current){
            const rect = threeDotsRef.current.getBoundingClientRect();

            const { top , left } = rect;
            setDropDownPosition({
                top: top + window.scrollY + 30,
                left: left + window.scrollX,
            });

            setOpenDropDown(true);
            setSelectedProject(project);
        }
    }

    return (
        <> 
            <ul className='max-sm:m-auto max-sm:mt-3'>
                <li className='max-w-[100%] w-[280px] overflow-hidden flex-wrap cursor-pointer flex flex-col max-sm:gap-1 md:gap-y-1 rounded-lg max-sm:p-4 md:p-7 drop-shadow-lg bg-white transition-all hover:-translate-y-1'>
                    <ProjectHeader daysLeft={daysLeft}/>
                    <ProjectBody />
                    <ProjectFooter/>
                </li>
            </ul>
        </>
    )

    function ProjectHeader ({daysLeft}:{daysLeft: number}) {
        
    function showAllTasksOfProject(){
        setChosenProject(project);

        setSideBarMenu((preState) => preState.map((item) => ({
            ...item,
            isSelected: item.id === 2 ? true : false, 
        })))
    }

    return (
        <div className='flex items-center w-full flex-wrap'>
            <div className='flex gap-2 items-center '>

                <div className='bg-sky-700 flex justify-center items-center p-1  text-white w-[38] h-[38] rounded-md'>
                    {getIconComponent(project.icon)}
                </div>

                <div className='flex flex-col max-w-[100%] w-[140px] flex-wrap'>
                    <span
                        onClick={showAllTasksOfProject}
                        className='font-semibold hover:text-sky-600 cursor-pointer transition'
                    >
                        { truncateString(project.title,15)}
                    </span>                     
                    <span className='text-[14px] text-slate-400'>
                        {daysLeft === 0 ? "Today" :daysLeft + ` day${daysLeft > 1 ? "'s":""} age`}
                    </span>
                </div>

                <div className='w-6 h-6 flex items-center justify-end'
                ref={threeDotsRef}
                onClick={openDropDown}
                >
                    <EllipsisVertical className='text-slate-400 text-[17px] transition-all hover:text-sky-400'/>
                </div>
            </div>
        </div>
    )
    }
    
    function ProjectBody () {
        const {
            openTasksWindowObject:{setOpenTasksWindow},
            projectClickedObject:{setProjectClicked},
            allProjectsObject: {setAllProjects,allProjects}
        } = useContextApp();

        function openTheTaskWindow(){
            setOpenTasksWindow(true);
            const findProject = allProjects.find((proj) => proj.title.toLowerCase() === project.title.toLowerCase());
            
            if(findProject){
                setProjectClicked(findProject);
            }
        }

        return(
    
            <div className='h-[90px] flex flex-col gap-3 mb-1'>
                {
                    project.tasks.length === 0 && (
                        <div className='flex justify-center flex-col gap-3 mt-[25px] items-center h-full'>
                            <BadgePlus
                                onClick={openTheTaskWindow}
                            className='text-slate-400 text-[25px] cursor-pointer hover:text-sky-500 transition-all'/>

                            <span className='text-slate-700 opacity-45 text-[13px]'>
                                No tasks created yet...
                            </span>
                        </div>
                    )
                }

                <ul className='mt-2 text-slate-400 text-[13px] flex flex-col gap-1 max-sm:ml-1 md:ml-3 list-none'>
    
                    {
                        project.tasks.slice(0,3).map((task) => (
                            <li key={task.id} className='flex gap-2 items-center'>
                                <Target className='w-4 h-4 text-sky-600 self-start' />
                                <span> {truncateString(task.title,40)} </span>
                            </li>
                        ))
                    }
                </ul>
    
                <div className='-mt-3 '>
                    {
                        project.tasks.length > 3 && (
                            <small className='text-slate-400'>+ {project.tasks.length -3} tasks</small>
                        )
                    }
                </div>
            </div>
        )
    }
    
    function ProjectFooter () {
        return(
            <div className='flex max-sm:gap-1 gap-4 flex-col m-2 w-full flex-wrap'>
                
                <div className='text-[12px] flex gap-3 items-center w-full'>
                    <div className='w-full max-sm:w-[80%] h-[7px] rounded-xl bg-slate-100 overflow-hidden'>
                        <div style={{width: `${progressPercentage}%`}} className='bg-red-600 h-full rounded-r-xl'></div>
                    </div>
                </div>
    
                <div className='flex justify-between gap-1 max-sm:flex-col'>
    
                    <p className='text-[13px] text-slate-400'>
                        on progress
                    </p>
    
                    <div className='flex'>
                        <span className='text-[12px]'> {progressPercentage}% </span>
                    </div>
                </div>
            </div>
        )
    }
}

export function truncateString(str: string, maxLength: number): string {
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

export default ProjectCard;