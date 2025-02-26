"use client"

import { useContextApp } from '@/app/pages/contextApp';
import React from 'react'
import { BookmarkX, Wrench } from 'lucide-react';


const ProjectWindow = () => {
    const {
        openSideBarObject: {openSideBar , setOpenSideBar},
    } = useContextApp();

    return (
        <div className={`${openSideBar? 'block':'hidden'} w-[45%] max-sm:w-[82%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50 bg-white rounded-lg drop-shadow-lg `}>

            {/* header */}
            <Header />

            <form className='flex flex-col gap-2 p-8 mt-3'>
                <ProjectInput />
                {/* <Footer /> */} 
            </form>
        </div>
    )
}

const Header = () => {
    const {
        openProjectWindowObject: {openProjectWindow , setOpenProjectWindow},
    } = useContextApp();

    return (
        <div className='flex justify-between items-center p-7'>
            <div className='flex items-center gap-2'>
                <div className='p-2 bg-sky-800 rounded-lg flex items-center justify-center'>
                    <Wrench onClick={() => setOpenProjectWindow(false)} className='w-4 h-4 text-white'/>
                </div>
                <span className='font-semibold text-lg'>add project</span>
            </div>

            <BookmarkX onClick={() => setOpenProjectWindow(false)} className='text-slate-300 w-4 h-4 cursor-pointer' />
        </div>
    )
}

const ProjectInput = () => {
    return(
        <div></div>
    )
}

export default ProjectWindow