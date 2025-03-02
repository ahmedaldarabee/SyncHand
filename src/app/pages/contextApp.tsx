"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppType, IconData, SidebarMenuItem } from './types/AppTypes';
import { allIconsArray } from '../Data/AllIcons';
import { Project, projectData } from '../Data/AllProjects';

const defaultState: AppType = {
    openSideBarObject:{openSideBar:false,setOpenSideBar:() => {},},
    sideBarMenuObject:{sideBarMenu:[],setSideBarMenu:() => {}},
    openProjectWindowObject:{ openProjectWindow:false,setOpenProjectWindow:() => {}},

    allIconDataObject : {allIconsData:[],setAllIconsData:()=>{}},
    openIconWindowObject: {openIconWindow:false,setOpenIconWindow:()=>{}},
    selectedIconObject : {selectedIcon:null,setSelectedIcon:()=>{}},

    allProjectsObject: {allProjects: [], setAllProjects:() => {}},
    openDropDownObject: {openDropDown: false, setOpenDropDown:() => {}},
    
    dropDownPositionObject: {dropDownPosition: {top:0, left:0}, setDropDownPosition:() => {}},
    openConfirmationWindowObject: {openConfirmationWindow:false , setOpenConfirmationWindow:() => {}},
    selectedProjectObject: {selectedProject:null , setSelectedProject:()=>{}},
    
    loadingObject: {isLoading:false , setLoading:()=>{}},
    sortingOptionObject: {sortingOptions:[] , setSortingOptions:()=>{}},
    openSortingDropDownObject: {openSortingDropDown:false , setOpenSortingDropDown:()=>{}},

    sortingDropDownPositionObject: {sortingDropDownPositions: {top:0, left:0}, setSortingDropDownPositions:() => {}},

};

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

    const [dropDownPosition, setDropDownPosition] = useState({ top:0, left:0 });

    const [openDropDown, setOpenDropDown] = useState<boolean>(false);
    
    const [openConfirmationWindow, setOpenConfirmationWindow] = useState<boolean>(false);

    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const [isLoading, setLoading] = useState<boolean>(false);

    const [sortingOptions , setSortingOptions] = useState([
        {
            category: "Order",
            options: [
                {label: "A-Z", value: "asc" , selected: true},
                {label: "Z-A", value: "desc" , selected: false},
            ]
        },
        {
            category: "Date",
            options: [
                {label: "Newest", value: "newest" , selected: false},
                {label: "Oldest", value: "oldest" , selected: false},
            ]
        }
    ])

    const [openSortingDropDown , setOpenSortingDropDown] = useState<boolean>(false);
    const [sortingDropDownPositions, setSortingDropDownPositions] = useState({ top:0, left:0 });

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
                
                allProjectsObject: { allProjects , setAllProjects},
                openDropDownObject: { openDropDown, setOpenDropDown},
                dropDownPositionObject: { dropDownPosition, setDropDownPosition},
                
                openConfirmationWindowObject: { openConfirmationWindow, setOpenConfirmationWindow },
                selectedProjectObject: { selectedProject, setSelectedProject },
                loadingObject: { isLoading, setLoading },
                
                sortingOptionObject: { sortingOptions, setSortingOptions },
                openSortingDropDownObject: { openSortingDropDown, setOpenSortingDropDown },
                sortingDropDownPositionObject: { sortingDropDownPositions, setSortingDropDownPositions },
            }}>

                {children}
            </ContextApp.Provider>
        </>
    )
}

export function useContextApp(){
    return useContext(ContextApp);
}