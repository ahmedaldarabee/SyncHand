import React, { ReactNode } from 'react'
import { LayoutTemplate , BotMessageSquare , Grid2x2,AlignLeft } from 'lucide-react';

const Menu = () => {

  const icons :ReactNode[] = [
    <Grid2x2 />,
    <LayoutTemplate />,
    <BotMessageSquare />,
  ];

  return (
    <div className='flex flex-col gap-2 items-center'>
      {
        icons.map((icon,index) => (
          <div key={index} className='transition-all delay-150  text-slate-400 text-[25px] cursor-pointer hover:text-sky-500 hover:-translate-y-1 hover:rotate-6'> {icon} </div>
        ))
      }
    </div>
  )
}

export default Menu