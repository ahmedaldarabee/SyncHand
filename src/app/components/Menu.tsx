"use client"
import React, { ReactNode } from 'react'
import { LayoutTemplate , BotMessageSquare , Grid2x2,Minimize2 } from 'lucide-react';
import { useContextApp } from '../pages/contextApp';

const Menu = () => {

  const {
      openSideBarObject: {openSideBar , setOpenSideBar},
  } = useContextApp();

  const icons :ReactNode[] = [
    <Minimize2 className='md:hidden'/>,
    <Grid2x2 />,
    <LayoutTemplate />,
    <BotMessageSquare />,
  ];

  // <span>close screen</span>,
  const iconElement:ReactNode[] = [
    "close screen","projects list","project progress","sync hand ai"
  ]

  const handleCloseIcon = (index:number):void => {
    if(index === 0){
      setOpenSideBar(!openSideBar);
    }
  }

  return (
    <div className='flex flex-col gap-2 items-center'>
      {
        icons.map((icon,index) => (
          <div key={index} onClick={()=>handleCloseIcon(index)} className='transition-all delay-150  text-slate-400 text-[25px] cursor-pointer hover:text-sky-500'>
              {openSideBar ? <span className={`${index===0?'md:hidden':'block'} text-[14px] flex gap-1 items-center`}>{icon}{iconElement[index]}  </span>: icon}
            </div>
        ))
      }
    </div>
  )
}

export default Menu