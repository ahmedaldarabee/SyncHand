import React from 'react'
import { AudioLines } from 'lucide-react';

const StatusRightSide = () => {
  return (
    // max-sm:hidden max-md:hidden
    <div className='overflow-hidden max-w-[300px] max-[1000px]:hidden flex justify-end items-center cursor-pointer'>
      <div className='h-[98%] max-w-[100%] rounded-l-3xl p-3 flex flex-col items-center'>
          <Header/>
          <div className='flex flex-col gap-11 items-center justify-center mt-6'>
            <CircularChart/>
            <ProjectCompletedLabels/>
          </div>

          <ProjectList/>
      </div>
    </div>
  )
}

const Header = () => {
  return(
    <h2 className='text-[22px] font-bold text-center mt-7 capitalize'>
      projects completed
    </h2>
  )
}

const CircularChart = () => {
  return(
    <div className='flex justify-center items-center'>
      <div className='w-40 h-40 bg-slate-300 mt-5 rounded-full flex items-center justify-center'>
        <div className='w-[86%] flex justify-center items-center h-[86%] bg-white rounded-full'>
          <span className='text-xl font-semibold text-sky-600'>
            90%
          </span>
        </div>
      </div>
    </div>
  )
}

const ProjectCompletedLabels = () => {
  return(
    <div className='flex justify-center flex-col gap-1 items-center'>
      <p className='font-bold text-[17px]'>3 completed</p>
      <p className='text-[13px] text-slate 400'>40 tasks done</p>
    </div>
  )
}

const ProjectList = () => {
  return(
      <ul className='projects-bar flex flex-col gap-3 mt-10 mx-4 overflow-auto'>
          <SingleProject />
          <hr className='w-[80%] mx-auto text-slate-100 opacity-50'/>
          <SingleProject />
          <hr className='w-[80%] mx-auto text-slate-100 opacity-50'/>
          <SingleProject />
      </ul>
  )
}

const SingleProject = () => {
  return(
    <li className='p-3 flex gap-2 items-center'>
      <div className='w-8 h-8 bg-sky-600 rounded-md justify-center items-center flex text-slate-100'>
      <AudioLines className='w-4 h-4'/>
      </div>

      <ul>
        <li className='text-[14px] font-semibold'>project 1</li>
        <li className='text-[12px] text-slate-400'>3 tasks</li>
      </ul>
    </li>
  )
}

export default StatusRightSide