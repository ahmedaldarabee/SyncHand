"use client"

import { useContextApp } from '@/app/pages/contextApp';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';

const MoreDropDown = () => {
const {
    openDropDownObject: { openDropDown, setOpenDropDown },
    dropDownPositionObject: { dropDownPosition },
    openConfirmationWindowObject: { setOpenConfirmationWindow },
    selectedProjectObject: { setSelectedProject },
    openProjectWindowObject: { setOpenProjectWindow },
} = useContextApp();

const [dropDownOptions] = useState([
    { id: 1, name: "Edit", icon: <Pencil className='w-4 h-4' /> },
    { id: 2, name: "Delete", icon: <Trash2 className='w-4 h-4' /> },
]);

const menuRef = useRef<HTMLDivElement>(null);

const clickedItemHandler = (id: number) => {
    if (id === 1) {
        setOpenProjectWindow(true);
    }

    if (id === 2) {
        setOpenConfirmationWindow(true);
        setOpenDropDown(false);
    }

    setOpenDropDown(false);
};

useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setOpenDropDown(false);
            setSelectedProject(null);
        }
    };

    const handleResize = () => {
        setOpenDropDown(false);
    };

    if (openDropDown) {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("resize", handleResize);
    } else {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("resize", handleResize);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("resize", handleResize);
    };
}, [openDropDown, setOpenDropDown]);

return (
    <div
        ref={menuRef}
        className={`bg-white fixed z-[90] top-14 left-24 border-slate-50 p-5 w-[130px] select-all shadow-md rounded-lg flex flex-col gap-5 ${openDropDown ? "block" : "hidden"}`}
        style={{ top: dropDownPosition.top, left: dropDownPosition.left }}
    >
        {
            dropDownOptions.map((dropDownOption: any, index: number) => (
                <div
                    onClick={() => clickedItemHandler(dropDownOption.id)}
                    key={index}
                    className={`transition-all flex gap-1 items-center text-slate-400 cursor-pointer hover:text-sky-600`}
                >
                    <span className={`${dropDownOption.id === 2 ? 'text-red-600' : ''}`}>
                        {dropDownOption.icon}
                    </span>
                    <span className={`${dropDownOption.id === 2 ? 'text-red-600' : ''} text-[16px]`}>
                        {dropDownOption.name}
                    </span>
                </div>
            ))
        }
    </div>
);
};

export default MoreDropDown;
