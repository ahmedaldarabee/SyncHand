"use client"

import { useContextApp } from '@/app/pages/contextApp'
import { Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const MoreDropDown = () => {

    const {
        openDropDownObject: {openDropDown, setOpenDropDown},
        dropDownPositionObject: {dropDownPosition, setDropDownPosition},
    } = useContextApp();

    const [dropDownOptions , setDropDownOption] = useState([
        {id: 1 , name: "Edit" , icon: <Pencil />},
        {id: 2 , name: "Delete" , icon: <Trash2 />},
    ]);

    const menuRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(menuRef.current && !menuRef.current.contains(event.target as Node)){
                setOpenDropDown(false);
            }
        }

        if(openDropDown){
            document.addEventListener("mousedown", handleClickOutside);
        }else{
            document.removeEventListener("mousedown", handleClickOutside);
        }
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    },[openDropDown , setOpenDropDown]);

    return (
        <div className={`
            bg-white fixed z-[90] top-14 left-24 border-slate-50 p-5 w-[130px] select-all shadow-md rounded-lg flex flex-col gap-5 ${openDropDown ? "block" : "hidden"}
        `} ref={menuRef} style={{top: dropDownPosition.top, left: dropDownPosition.left}}>

            {
                dropDownOptions.map((dropDownOption) => (
                    <div className={` transition-all flex gap-1 items-center text-slate-400 cursor-pointer hover:text-sky-600 ${dropDownOption.id === 2 && "hover:text-red-600"}`}>

                        {/* edit icon */}
                        {dropDownOption.icon}

                        <span className='text-[14px]'>{dropDownOption.name}</span>

                    </div>
                ))
            }

        </div>
    )
}

export default MoreDropDown