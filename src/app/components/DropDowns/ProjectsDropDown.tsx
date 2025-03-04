"use client"

import { Project } from '@/app/Data/AllProjects';
import getIconComponent from '@/app/Functions/IconsActions';
import { useContextApp } from '@/app/pages/contextApp';
import { List } from 'lucide-react';
import React, { useEffect, useRef } from 'react'

const ProjectsDropDown = () => {
    const {
        chosenProjectObject: {chosenProject, setChosenProject},
        allProjectsObject: {allProjects, setAllProjects},
        tabsOptionsObject: { tabsOptions, setTabsOptions },
    } = useContextApp();

    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

    },[])

    return (
        <div
            ref={dropDownRef}
            className={`bg-white absolute p-3 top-12 left-44
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
    return(
        <div className={`flex items-center justify-between gap-7 p-2 rounded-lg text-slate-500 cursor-pointer`}>

            <div className='flex gap-2 items-center'>
                {/* icons */}
                <div>
                    <List className='text-sky-600 text-[22px]' />
                </div>

                <span className='capitalize text-[13px] mt-1 hover:text-sky-600 cursor-pointer transition-all'>
                    all projects
                </span>

            </div>

        </div>
    )
}

const SingleProject = ({singleProject}:{singleProject: Project}) => {
    return(
        <div className={`flex items-center justify-between gap-7 p-2 rounded-lg text-slate-600 cursor-pointer`}>

            <div className='flex gap-2 items-center'>

                <div>
                    {""}
                    {getIconComponent(singleProject.icon)}
                    {""}
                </div>

                <span className='text-[13px] mt-1 hover:text-sky-600 cursor-pointer'>
                    {singleProject.title}
                </span>
            
            </div>
        </div>
    )
}

export default ProjectsDropDown