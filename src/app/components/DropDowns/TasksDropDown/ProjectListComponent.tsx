import React from 'react'
import { ProjectWithSelection, useTaskFormContext } from '../../windows/TasksWindow'
import getIconComponent from '@/app/Functions/IconsActions';

const ProjectListComponent = () => {

    const {
        updatedAllProjectsObject:{updatedAllProjects, setUpdatedAllProjects},
    } = useTaskFormContext();

    return (
        <div className='flex flex-col gap-3'>
            {
                updatedAllProjects.map((singleProject,index) => (
                    <SingleProject key={index} index={index} singleProject={singleProject} />
                ))
            }
        </div>
    );

    function SingleProject({
        singleProject,
        index
    }:{
        singleProject: ProjectWithSelection
        index: number
    }){
        const {
            setProject,
            setOpenTasksDropDown
        } = useTaskFormContext();

        function updateTheProjectState(index: number){
            setProject(singleProject);
            setUpdatedAllProjects((prevProjects) =>
                prevProjects.map((project,i) => ({
                    ...project,
                    isSelected: index === i
                }))
            );
            setOpenTasksDropDown(false);
        }
        return (
            <div
                onClick={() => updateTheProjectState(index)}
                className={`
                    ${ singleProject.isSelected && "bg-sky-50 border border-sky-200"}
                    flex items-center gap-2 p-[7px] rounded-md cursor-pointer
                `}
            >

                <div className='flex gap-2 items-center'>
                    <div>
                        {getIconComponent(singleProject.icon)}
                    </div>
                    <span className='mt-[3px] hover:text-sky-600 text-slate-500'>
                        {singleProject.title}
                    </span>
                </div>

            </div>
        )
    }
}

export default ProjectListComponent