"use client"

import { useContextApp } from '@/app/pages/contextApp';
import React, { useEffect, useLayoutEffect } from 'react'
import { BookMarked, BookmarkX, Wrench } from 'lucide-react';

import {useForm , SubmitHandler, UseFormRegister , FieldErrors} from 'react-hook-form'
import { zodResolver }  from '@hookform/resolvers/zod';
import * as z from 'zod'

import getIconComponent from '@/app/Functions/IconsActions';
import { addNewProject, editProject } from '@/app/Functions/projectsActions';

import toast from 'react-hot-toast';
import { allIconsArray } from '@/app/Data/AllIcons';
import { useUser } from '@clerk/nextjs';
import { Project } from '@/app/Data/AllProjects';

const schema = z.object({
    projectName:z.string()
    .min(1,{message:"project name is required!"})
    .max(35,{message:"project name must be less than or equal 35 character"})
})

export type FormData = z.infer<typeof schema>;

const ProjectWindow = () => {

    const {
        openProjectWindowObject: {openProjectWindow , setOpenProjectWindow},
        allProjectsObject: {allProjects , setAllProjects},
        
        selectedIconObject:{ selectedIcon , setSelectedIcon},
        selectedProjectObject: {selectedProject, setSelectedProject},
        
        loadingObject: {setLoading},
        chosenProjectObject: { chosenProject, setChosenProject },
        allTasksObject: {allTasks,setAllTasks}
    } = useContextApp();

    const {
        register,handleSubmit,setValue,setError,setFocus,formState: {errors},reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {

        const existingProject = allProjects.find((project) =>
            project.title.toLowerCase() === data.projectName.toLowerCase()
        );        
        

        if(existingProject && !selectedProject){
            setError("projectName",{
                type:"manual",
                message:"project already exist!"
            });
            setFocus("projectName");
            return;
        }
        projectsFunction();
        async function projectsFunction(){
            try {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve,1000));
    
                if(!selectedProject){
                    const {user} = useUser();           
                    addNewProject(
                        data,
                        allProjects,
                        setAllProjects,
                        setOpenProjectWindow,
                        selectedIcon,
                        reset,
                        user?.id
                    );
                }else{
                    editProject(
                        selectedProject,
                        setSelectedProject,
                        data,
                        selectedIcon,
                        allProjects,
                        allTasks,        
                        setAllTasks,
                        setAllProjects,
                        setOpenProjectWindow
                    );                    
                }
                
                toast.success(`Project ${selectedProject ? "edited" : "added"} successfully`);
                
            } catch (error:any) {
                toast.error(error.message || "An unknown error occurred.");
            }finally{
                setLoading(false);
                if(selectedProject && chosenProject){
                    if(chosenProject.id === selectedProject.id){
                        const updatesChosenProject: Project = {
                            ...chosenProject,
                            title: data.projectName,
                        }
                        setChosenProject(updatesChosenProject);
                    }
                }
            }
        }
    }


    const handleClose = () => {
        setOpenProjectWindow(false);
        reset();
    }

    useLayoutEffect(() => {
        if(openProjectWindow){
            if(!selectedProject){
                reset();
            }else{
                setValue("projectName",selectedProject.title);
                const findIconInAllIconsArr = allIconsArray.find((icon) => icon.name === selectedProject.icon)

                if(findIconInAllIconsArr){
                    setSelectedIcon(findIconInAllIconsArr);
                }
            }
        } 
    },[openProjectWindow,reset]);

    return (
        <div className={`${openProjectWindow ? 'block':'hidden'} w-[45%] max-sm:w-[82%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50 bg-white rounded-lg drop-shadow-lg `}>
            <Header handleClose={handleClose} />

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 p-8'>
                <ProjectInput register={register} errors={errors} />
                <Footer handleClose={handleClose}/> 
            </form>

        </div>
    )
}

const ProjectInput = ({ register, errors }: { register: UseFormRegister<FormData>; errors: FieldErrors<FormData>; }) => {
    const {
        openProjectWindowObject: { openProjectWindow },
        selectedIconObject: { selectedIcon},
        openIconWindowObject: { setOpenIconWindow },
    } = useContextApp();

    useEffect(() => {
        if (openProjectWindow) {
            document.querySelector<HTMLInputElement>('input[name="projectName"]')?.focus();
        }
    }, [openProjectWindow]);

    return (
        <div className="flex flex-col gap-2 relative">
            <span className="text-[14px] font-medium">Project Name</span>
            <div className="flex gap-3 justify-between">
                <div className="w-full">
                    <input {...register("projectName")} className="p-2 text-[13px] w-full rounded-md border outline-none" type="text" placeholder="Enter project name" />
                    {errors.projectName && (<p className="text-[11px] mt-2 text-red-700">{errors.projectName.message}</p>)}
                </div>
                <div onClick={() => setOpenIconWindow(true)} className="hover:bg-sky-500 transition-all w-9 h-9 text-white flex items-center justify-center bg-sky-700 rounded-lg cursor-pointer">
                    {selectedIcon?.name ? getIconComponent(selectedIcon.name) : <BookMarked />}
                </div>
            </div>
        </div>
    );
};

const Footer = ({handleClose}:{handleClose:() => void }) => {
    const {
        selectedIconObject:{ setSelectedIcon },
        selectedProjectObject: {selectedProject, setSelectedProject},
        loadingObject: {isLoading},
    } = useContextApp();

    return (
        <div className='w-[100%] p-3 mt-2 flex gap-3 justify-end items-center'>

            {/* cancel button */}
            <button type='button' onClick={() => {handleClose();setSelectedIcon(null)}} className='border border-slate-200 text-slate-400 text-[13px] p-2 rounded-md capitalize hover:border-slate-300 transition-all'>
                close
            </button>

            <button className='text-white text-[13px] p-2 px-4 rounded-md bg-sky-600 hover:bg-sky-700 transition-all capitalize'>
                {isLoading? "saving..." : selectedProject? "Edit Project ": "Add Project"}
            </button>
        </div>
    )
}
const Header = ({handleClose}:{handleClose:()=> void }) => {

    const {
        openProjectWindowObject: { setOpenProjectWindow },
        selectedProjectObject: {selectedProject},
        selectedIconObject:{ setSelectedIcon },
    } = useContextApp();

    return (
        <div className='flex justify-between items-center p-7'>
            <div className='flex items-center gap-2'>
                
                <div className='p-2 bg-sky-800 rounded-lg flex items-center justify-center'>
                    <Wrench className=' cursor-pointer w-4 h-4 text-white' onClick={() => setOpenProjectWindow(false)} />
                </div>

                <span className='font-semibold text-lg'>
                    {selectedProject? "Edit Project ": "New Project"}
                </span>
            </div>

            <BookmarkX onClick={() => {
                setOpenProjectWindow(false);
                handleClose();
                setSelectedIcon(null);
            }} className='hover:text-red-600 hover:scale-110 text-slate-300 w-4 h-4 cursor-pointer transition-all' />
        </div>
    )
}

export default ProjectWindow;
