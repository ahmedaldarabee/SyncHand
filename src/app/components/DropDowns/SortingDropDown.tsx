"use client";

import { sortProjects } from '@/app/Functions/sortingFunctions';
import { useContextApp } from '@/app/pages/contextApp';
import React, { useCallback, useEffect, useRef } from 'react'

const SortingDropDown = () => {
    const {
        sortingOptionObject: { sortingOptions, setSortingOptions },
        sortingDropDownPositionObject: { sortingDropDownPositions, setSortingDropDownPositions },
        openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
        allProjectsObject: {allProjects, setAllProjects},

    } = useContextApp();

    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        function handleClickOutside(event: MouseEvent) {
            if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)){
                setOpenSortingDropDown(false);
            }
        }

        function handleResize() {
            setOpenSortingDropDown(false);
        }

        if(openSortingDropDown){
            document.addEventListener("mousedown",handleClickOutside);
            window.addEventListener("resize",handleResize);
        }else{
            document.removeEventListener("mousedown",handleClickOutside);
            window.removeEventListener("resize",handleResize);
        }
        
        return () => {
            document.removeEventListener("mousedown",handleClickOutside);
            window.removeEventListener("resize",handleResize);
        }

    }, [openSortingDropDown , setOpenSortingDropDown]);

    const sortAllProjects = useCallback(() => {
        const currentSortingOption = sortingOptions
            .flatMap((category) => category.options)
            .find((option) => option.selected);
    
        return sortProjects(allProjects, currentSortingOption?.value);
    }, [allProjects, sortingOptions]);
    

    useEffect(() => {
        const sortedProjects = sortAllProjects();
        if(JSON.stringify(sortedProjects) !== JSON.stringify(allProjects)){
            setAllProjects(sortedProjects);
        }
    }, [allProjects, sortAllProjects]);
    

    function handleOptionSelected(categoryIndex: number , optionIndex: number){
        const updateSortingOptions = sortingOptions.map((category,cIndex) => ({
            ...category,
            options: category.options.map((option, oIndex) => ({
                ...option,
                selected: cIndex === categoryIndex && oIndex === optionIndex
            }))

        }));

        const selectedOption = updateSortingOptions.flatMap((option) => option.options).find((option) => option.selected);
        setSortingOptions(updateSortingOptions);
        setAllProjects(sortProjects(allProjects, selectedOption?.value));
    }

    return (
        <div

        ref={dropDownRef}

        style={{
            top: `${sortingDropDownPositions.top}px`,
            left: `${sortingDropDownPositions.left}px`,
            width: `${sortingDropDownPositions.width}px`,
        }}
        
        className={`
            bg-white text-sm top-[226px] right-60 z-[60] p-5 border-slate-50 fixed w-[160px] select-none shadow-md rounded-lg flex flex-col ${openSortingDropDown ? 'block':'hidden'}
        `}>
            {
                sortingOptions.map((category,categoryIndex) => (
                    <div key={categoryIndex} className='flex flex-col gap-1 text-slate-700 cursor-pointer'>

                        <span className={`text-[13px] font-bold ${ category.category === "Date" ? "mt-5":""}`}>
                            {category.category}
                        </span>

                        {/* each option */}
                        <div className='flex flex-col gap-2 ml-2 mt-[5px]'>
                            {
                                category.options.map(( option , optionIndex ) => (
                                    <div key={optionIndex}>
                                        <span 
                                            onClick={() => handleOptionSelected(categoryIndex,optionIndex)}
                                            className={`${option.selected ? "text-sky-600":"text-slate-500"} cursor-pointer transition-all hover:text-sky-600`}
                                        >
                                            {option.label}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                ))
            }            
        </div>
    )
}

export default SortingDropDown