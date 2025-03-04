import React from 'react'
import { SquareSplitVertical,ChevronDown } from 'lucide-react';
import { SortingButton } from '../../AllProjects/components/ProjectsSubHeader';
import { useContextApp } from '../../contextApp';
import { Task } from '@/app/Data/AllProjects';

const TasksSubHeader = () => {
    return (
        <div className='mt-4 flex justify-between items-center cursor-pointer  max-sm:flex-col md:flex-row'>
            <MyProjectsTxt />
            <SortingButton />
        </div>
    )
};

const MyProjectsTxt = () => {
    const {
        chosenProjectObject: { chosenProject, setChosenProject },
        allProjectsObject: {allProjects, setAllProjects},
    } = useContextApp();

    function allTasksInAllProjects(){
        return allProjects.reduce((acc,project) => acc + project.tasks.length,0)
    }  
    
    function calculateCompletedTasks(tasks: Task[]){
        return tasks.filter((task) => task.status === "Completed").length;
    }

    const totalTasks = chosenProject ? chosenProject.tasks.length : allTasksInAllProjects()
    
    const completedTasks = chosenProject ? calculateCompletedTasks(chosenProject.tasks) : allProjects.reduce((acc,project) => acc + calculateCompletedTasks(project.tasks),0);
    
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return(
        <div className='flex items-center gap-2 flex-wrap'>

            <div className='max-sm:hidden w-[41px] mt-1 flex justify-center items-center h-[44px] rounded-md bg-slate-200 border-sky-800'>
                <SquareSplitVertical className='w-5 h-5 text-sky-600'/>
            </div>

            <ul className='flex flex-col gap-[7px] -mb-2'>
                <li className='text-[17px] font-semibold flex gap-2 items-center'>
                    <div className='text-slate-700 flex gap-2 items-center'>
                        <span className='text-lg capitalize -mb-2 hover:text-sky-800 transition-all'>
                            {chosenProject?.title || " all projects"}
                        </span>
                        <span className='-mb-2 bg-slate-700 text-white text-[14px] p-[2px] px-2 rounded-md'>
                            {totalTasks}
                        </span>
                    </div>
                    <ChevronDown className='-mb-2 text-lg text-slate-600'/>
                </li>

                <div className='flex gap-1 items-center justify-between'>
                    <li className='text-[12px] h-[4px] w-[280px] max-sm:w-[180px] border-y-slate-200 rounded-md'>
                        <div
                        style={{width:`${completionPercentage}%`}}
                        className={`h-[100%] bg-sky-600 rounded-r-xl`}>
                        </div>
                    </li>

                    <p className='text-[14px] max-sm:text-center text-slate-400 ml-3'>{completionPercentage.toFixed(0)}%</p>
                </div>
            </ul>
        </div>
    )
}

export default TasksSubHeader