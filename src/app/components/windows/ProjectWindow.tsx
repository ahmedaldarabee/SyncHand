"use client"

import { useContextApp } from '@/app/pages/contextApp';
import React, { useEffect, useLayoutEffect } from 'react'
import { BookMarked, BookmarkX, Wrench } from 'lucide-react';
import IconWindow from "../windows/IconWindow";

// for input verifications
import {useForm , SubmitHandler, UseFormRegister , FieldErrors} from 'react-hook-form'
import { zodResolver }  from '@hookform/resolvers/zod';
import * as z from 'zod'
import getIconComponent from '@/app/Functions/IconsActions';

const schema = z.object({
    projectName:z.string()
    .min(1,{message:"project name is required!"})
    .max(35,{message:"project name must be less than or equal 35 character"})
})

type FormData = z.infer<typeof schema>;

const ProjectWindow = () => {
    const {
        openProjectWindowObject: {openProjectWindow , setOpenProjectWindow}
    } = useContextApp();

    const {
        register,handleSubmit,setValue,formState: {errors},reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        handleClose();
    }

    const handleClose = () => {
        setOpenProjectWindow(false);
        reset();
    }

    useLayoutEffect(() => {
        if(openProjectWindow){
            reset();
        } 
    },[openProjectWindow,reset]);

    return (
        // ${openProjectWindow? 'block':'hidden'}
        <div className={`${openProjectWindow ? 'block':'hidden'} w-[45%] max-sm:w-[82%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50 bg-white rounded-lg drop-shadow-lg `}>

            {/* header */}
            <Header handleClose={handleClose} />

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 p-8'>
                <ProjectInput register={register} errors={errors} />
                <Footer handleClose={handleClose}/> 
            </form>

        </div>
    )
}

const Header = ({handleClose}:{handleClose:()=> void }) => {

    const {
        openProjectWindowObject: { openProjectWindow , setOpenProjectWindow },

        selectedIconObject:{ setSelectedIcon },
    } = useContextApp();

    return (
        <div className='flex justify-between items-center p-7'>
            <div className='flex items-center gap-2'>
                
                <div className='p-2 bg-sky-800 rounded-lg flex items-center justify-center'>
                    <Wrench className=' cursor-pointer w-4 h-4 text-white' onClick={() => setOpenProjectWindow(false)} />
                </div>

                <span className='font-semibold text-lg'>add project</span>
            </div>

            <BookmarkX onClick={() => {
                setOpenProjectWindow(false);
                handleClose();
                setSelectedIcon(null);
            }} className='hover:text-red-600 hover:scale-110 text-slate-300 w-4 h-4 cursor-pointer transition-all' />
        </div>
    )
}

const ProjectInput = ({
        register,
        errors,
    }: {
        register: UseFormRegister<FormData>;
        errors: FieldErrors<FormData>;
    }) => {
        const {
        openProjectWindowObject: { openProjectWindow },
        selectedIconObject: { selectedIcon },
        openIconWindowObject: { openIconWindow, setOpenIconWindow },
        } = useContextApp();
  
        useEffect(() => {
        if (openProjectWindow) {
            const inputElement = document.querySelector<HTMLInputElement>(
            'input[name="projectName"]'
            );
            if (inputElement) {
            inputElement.focus();
            }
        }
        }, [openProjectWindow]);

        useEffect(() => {
        console.log("openIconWindow changed:", openIconWindow);
        }, [openIconWindow]);

        return (
        <div className="flex flex-col gap-2 relative">
            <span className="text-[14px] font-medium">Project Name</span>
    
            <div className="flex gap-3 justify-between">
            {/* input */}
            <div className="w-full">
                <input
                {...register("projectName")}
                className="p-2 text-[13px] w-full rounded-md border outline-none"
                type="text"
                placeholder="Enter project name"
                />
    
                {errors.projectName && (
                <p className="text-[11px] mt-2 text-red-700">
                    {errors.projectName.message}
                </p>
                )}
            </div>
    
            <div
                onClick={() => {
                setOpenIconWindow(true);
                }}
                className="hover:bg-sky-500 transition-all w-9 h-9 text-white flex items-center justify-center bg-sky-700 rounded-lg cursor-pointer"
            >
                {selectedIcon ? (
                getIconComponent(selectedIcon?.name, "text-white")
                ) : (
                <BookMarked />
                )}
            </div>
            </div>
    
    
            {openIconWindow && <IconWindow />}
        </div>
        );
};

const Footer = ({handleClose}:{handleClose:() => void }) => {
    const {
        selectedIconObject:{ setSelectedIcon },
    } = useContextApp();

    return (
        <div className='w-[100%] p-3 mt-2 flex gap-3 justify-end items-center'>

            {/* cancel button */}
            <button type='button' onClick={() => {handleClose();setSelectedIcon(null)}} className='border border-slate-200 text-slate-400 text-[13px] p-2 rounded-md capitalize hover:border-slate-300 transition-all'>
                close
            </button>

            <button className='text-white text-[13px] p-2 px-4 rounded-md bg-sky-600 hover:bg-sky-700 transition-all capitalize'>
                add project
            </button>
        </div>
    )
}

export default ProjectWindow