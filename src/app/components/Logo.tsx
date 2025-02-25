"use client"

import React from 'react'
import { CircleCheckBig } from 'lucide-react';
import { useContextApp } from '../pages/contextApp';

const Logo = () => {
    const mainIcon = "flex w-8 h-8 font-bold text-sky-600";
    const projectNameStyle = "capitalize text-[20px] text-slate-500 font-bold"

    const {
        openSideBarObject: {openSideBar , setOpenSideBar},
    } = useContextApp();

    const SpanElement = ({data}:{ data: string }) => (
        <span className={projectNameStyle}>{data}</span>
    )

    return (
        <div className='rounded-md h-10 w-10 flex items-center justify-center cursor-pointer'>
            <CircleCheckBig className={mainIcon}/>

            {/* the name of this project rather than icon! */}
            {openSideBar && (
                <div className='text-xl flex items-center gap-1'>
                    <CircleCheckBig className={mainIcon}/>
                    <SpanElement data="sync"/>
                    <SpanElement data="hand"/>
                </div>
            )}
        </div>
    )
}

export default Logo