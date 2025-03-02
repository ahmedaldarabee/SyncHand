"use client"

import React, { useRef } from 'react'
import { ArrowDownZA } from 'lucide-react';
import { useContextApp } from '../../contextApp';
import SortingDropDown from '@/app/components/DropDowns/SortingDropDown';

const ProjectsSubHeader = () => {
  const {
      allProjectsObject: {allProjects}
    } = useContextApp();
    
  return (
    <div className='mt-5 flex justify-between font-bold items-center max-sm:space-x-3 md:space-x-3'>
      {
        allProjects.length === 0 ? ' ' : (
          <>
            <ProjectTxt />
            <SortingButton />
            <SortingDropDown />
          </>
        )
      }
    </div>
  )
};

function ProjectTxt(){
  return(
    <p className='outline-slate-400 cursor-pointer capitalize lg:text-[26px] md:text-[14px] max-sm:hidden font-bold'>project dashboard</p>
  )
}

export const SortingButton = () => {

  const {
      openSortingDropDownObject:{ openSortingDropDown, setOpenSortingDropDown},
      sortingDropDownPositionObject:{ sortingDropDownPositions, setSortingDropDownPositions},
  } = useContextApp();

  const sortingLinkRef = useRef<HTMLDivElement>(null);

  function clickedSortingLink() {
    if(sortingLinkRef.current){

      const rect = sortingLinkRef.current.getBoundingClientRect();
      const {top , left , width } = rect;

      setSortingDropDownPositions({
        top: top + window.scrollY + 30,
        left: left + window.scrollX,
        width: width
      });
    }

    setOpenSortingDropDown(true);
  }

  return(
    <div className='max-sm:mt-3 flex text-[15px] font-semibold gap-3'>
      <span className='text-sky-800 capitalize'>sort by</span>
      
      <div 
        ref={sortingLinkRef}
        onClick={clickedSortingLink}
        className='flex gap-1 items-center cursor-pointer'>
        <span className='capitalize text-slate-800 max-sm:text-[12px]'> recent projects</span>
        <ArrowDownZA className='max-sm:text-[10px] cursor-pointer hover:text-sky-600 transition-all' />
      </div>
    </div>
  )
}

export default ProjectsSubHeader;