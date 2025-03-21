"use client"

import React from 'react'
import { useContextApp } from '../pages/contextApp';
import img from '../favicon.ico';
import Image from 'next/image';

const Logo = () => {
    const projectNameStyle = "capitalize text-[20px] text-slate-500 font-bold"

    const {
        openSideBarObject: {openSideBar},
    } = useContextApp();

    const SpanElement = ({data}:{ data: string }) => (
        <span className={projectNameStyle}>{data}</span>
    )

    return (
        <div className='rounded-md h-10 w-10 flex items-center justify-center cursor-pointer'>
            
            <Image loading="lazy" className='m-1' src={img} alt="logo of the project" width={32} height={32} />

            {openSideBar && (
                <div className='text-xl flex items-center gap-1'>
                    <SpanElement data="sync"/>
                    <SpanElement data="hand"/>
                </div>
            )}
        </div>
    )
}

export default Logo;