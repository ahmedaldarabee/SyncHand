"use client"

import { Project } from '@/app/Data/AllProjects';
import getIconComponent from '@/app/Functions/IconsActions';
import { useContextApp } from '@/app/pages/contextApp';
import { List } from 'lucide-react';
import React, { useEffect, useRef } from 'react'

const ProjectsDropDown = () => {

    const {

        allProjectsObject: {allProjects, setAllProjects},
        openProjectsDropDownObject: {openProjectsDropDown,setOpenProjectsDropDown},
        projectsDropDownPositionsObject: {projectsDropDownPositions,setProjectsDropDownPositions}

    } = useContextApp();

    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent){
            if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)){
                setOpenProjectsDropDown(false);
            }
        }

        function handleResize(){
            setOpenProjectsDropDown(false);
        }

        function removeListener(){
            document.removeEventListener("mousedown",handleClickOutside);
            document.removeEventListener("resize",handleResize);
        }

        if(openProjectsDropDown){
            document.addEventListener("mousedown",handleClickOutside);
            document.addEventListener("resize",handleResize);
        }else{
            removeListener();
        }
        
        return () => {
            removeListener();
        }
    },[openProjectsDropDown]);

    return (
        <div
            ref={dropDownRef}
            style={{
                top: projectsDropDownPositions.top + 36,
                left: projectsDropDownPositions.left,
            }}
            className={`
                ${openProjectsDropDown ? "block" : "hidden"}
                bg-white absolute p-3 top-12 left-44
                z-[90] border w-[210px] border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2
            `}
        >

            <AllProjectsItems />

            <hr className='w-[80%] text-slate-400 mx-auto my-1 opacity-55'/>

                <>
                    {
                        allProjects.map((singleProject,index) => (
                            <SingleProject singleProject={singleProject} key={index} />
                        ))
                    }
                </>
        </div>
    )
}

const AllProjectsItems = () => {

    const {
        chosenProjectObject: {chosenProject, setChosenProject},
        openProjectsDropDownObject: { openProjectsDropDown,setOpenProjectsDropDown},
    } = useContextApp();

    return(
        <div 
        
        onClick={() =>{
                setChosenProject(null)
                setOpenProjectsDropDown(false)
            }
        }

        className={` flex items-center justify-between gap-7 p-2 rounded-lg text-slate-500 cursor-pointer`}>

            <div className='flex gap-2 items-center'>
                <div>
                    <List className='text-sky-600 text-[22px]' />
                </div>

                <span className='capitalize text-[16px] mt-1 hover:text-sky-600 cursor-pointer transition-all'>
                    all projects
                </span>

            </div>

        </div>
    )
}

const SingleProject = ({singleProject}:{singleProject: Project}) => {
    const {
        chosenProjectObject: { chosenProject, setChosenProject },
        allProjectsObject: { allProjects , setAllProjects},
        openProjectsDropDownObject: { openProjectsDropDown, setOpenProjectsDropDown },
    } = useContextApp();

    function handleTheProjectClicked(projectId: string){
        const findProject = allProjects.find((project) => project.id === projectId);
        
        if(findProject){
            setChosenProject(findProject);
        }

        setOpenProjectsDropDown(false);
    }

    return(
        <div 
        onClick={() => handleTheProjectClicked(singleProject.id)}
        className={` ${chosenProject?.id === singleProject.id && "border border-sky-600 bg-sky-50"} flex items-center justify-between gap-7 p-2 rounded-lg text-slate-600 cursor-pointer`}>

            <div className='flex gap-2 items-center'>
                <div>
                    <List className="text-[13px] text-black" />
                </div>                    
                <span className='capitalize text-[16px] mt-1 hover:text-sky-600 cursor-pointer'>
                    {singleProject.title}
                </span>
            
            </div>
        </div>
    )
}

export default ProjectsDropDown