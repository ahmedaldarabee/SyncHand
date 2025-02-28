"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppType, IconData, SidebarMenuItem } from './types/AppTypes';
import { allIconsArray } from '../Data/AllIcons';
import { Project, projectData } from '../Data/AllProjects';

// setting the default state
const defaultState: AppType = {
    openSideBarObject:{openSideBar:false,setOpenSideBar:() => {},},
    sideBarMenuObject:{sideBarMenu:[],setSideBarMenu:() => {}},
    openProjectWindowObject:{ openProjectWindow:false,setOpenProjectWindow:() => {}},

    allIconDataObject : {allIconsData:[],setAllIconsData:()=>{}},
    openIconWindowObject: {openIconWindow:false,setOpenIconWindow:()=>{}},
    selectedIconObject : {selectedIcon:null,setSelectedIcon:()=>{}},

    allProjectsObject: {allProjects: [], setAllProjects:() => {}},
};

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

    const [ allIconsData , setAllIconsData ] = useState<IconData[]>(allIconsArray);
    
    const [openIconWindow, setOpenIconWindow] = useState<boolean>(false);
    
    const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);

    const [allProjects, setAllProjects] = useState<Project[]>([]);

    useEffect(() => {
        setOpenSideBar(false);  
    },[sideBarMenu]);    

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve,1000))
                setAllProjects(projectData);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    },[]);

    return (
        <>
            <ContextApp.Provider value={{
                openSideBarObject: { openSideBar , setOpenSideBar },
                sideBarMenuObject: { sideBarMenu , setSideBarMenu },
                openProjectWindowObject: { openProjectWindow , setOpenProjectWindow },
                allIconDataObject : {allIconsData,setAllIconsData},
                openIconWindowObject:{ openIconWindow , setOpenIconWindow },
                selectedIconObject:{ selectedIcon , setSelectedIcon },
                allProjectsObject: {allProjects , setAllProjects},
            }}>
                {children}
            </ContextApp.Provider>
        </>
    )
}

export function useContextApp(){
    return useContext(ContextApp);
}