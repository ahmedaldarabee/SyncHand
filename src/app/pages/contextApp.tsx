"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppType, SidebarMenuItem } from './types/AppTypes';


// setting the default state
const defaultState: AppType = {
    openSideBarObject:{openSideBar:false,setOpenSideBar:() => {},},
    sideBarMenuObject:{sideBarMenu:[],setSideBarMenu:() => {}},
    openProjectWindowObject:{
        openProjectWindow:false,
        setOpenProjectWindow:() => {}
    },
}

// creating the context to start sharing data between components
// and assign default state to it!

const ContextApp = createContext<AppType>(defaultState);

// the provider that response to share data between components
export default function ContextAppProvider({
    children,// main children
}:{
    children:ReactNode; // type of these children's
}){
    const [openSideBar, setOpenSideBar] = useState<boolean>(false);

    const [sideBarMenu, setSideBarMenu] = useState<SidebarMenuItem[]>([
        {
            id:1,
            name:"project list",
            isSelected:false
        },
        {
            id:2,
            name:"project progress",
            isSelected:false
        },{
            id:3,
            name:"sync hand ai",
            isSelected:false
        }
    ])

    const [openProjectWindow, setOpenProjectWindow] = useState(false);

    useEffect(() => {
        setOpenSideBar(false);  
    },[sideBarMenu])

    return (
        <>
            {/* ContextApp: that response to send the data between components */}
            <ContextApp.Provider value={{
                openSideBarObject: { openSideBar , setOpenSideBar },
                sideBarMenuObject: { sideBarMenu , setSideBarMenu },
                openProjectWindowObject: { openProjectWindow , setOpenProjectWindow },
            }}>
                {children}
            </ContextApp.Provider>
        </>
    )
}

// ContextAppProvider that define children's and data that we needed to moved between components.

// -> C O R E <- main context to do manager operations on components!
export function useContextApp(){
    return useContext(ContextApp);
}