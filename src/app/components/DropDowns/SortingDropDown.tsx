"use client";

import { useContextApp } from '@/app/pages/contextApp';
import React, { useEffect, useRef } from 'react'

const SortingDropDown = () => {
    const {
        sortingOptionObject: { sortingOptions, setSortingOptions },
        
        sortingDropDownPositionObject: { sortingDropDownPositions, setSortingDropDownPositions },

        openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },

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
                sortingOptions.map((category,createIndex) => (
                    <div key={createIndex} className='flex flex-col gap-1 text-slate-700 cursor-pointer'>

                        <span className={`text-[13px] font-bold ${
                            category.category === "Date" ? "mt-5":""
                        }`}>
                            {category.category}
                        </span>

                        <div className='flex flex-col gap-2 ml-2 mt-[5px]'>
                            {
                                category.options.map( (option , optionIndex) => (
                                    <div key={optionIndex}>
                                        <span
                                            className={`${option.selected ? "text-sky-600":"text-slate-500"} cursor-pointer hover:text-sky-600`}
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