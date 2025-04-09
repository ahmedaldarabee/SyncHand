"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppType, IconData, SidebarMenuItem, TabOption } from './types/AppTypes';
import { allIconsArray } from '../Data/AllIcons';
import { Project, Task } from '../Data/AllProjects';
import { useUser } from '@clerk/nextjs';

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

    sortingDropDownPositionObject: {sortingDropDownPositions: {top:0, left:0, width:0}, setSortingDropDownPositions:() => {}},
    chosenProjectObject: {chosenProject: null, setChosenProject:()=>{} },
    tabsOptionsObject: {tabsOptions: [], setTabsOptions:()=>{} },

    openProjectsDropDownObject: { openProjectsDropDown:false,setOpenProjectsDropDown:()=>{} },
    projectsDropDownPositionsObject: { projectsDropDownPositions: {top:0, left:0, width:0},setProjectsDropDownPositions: ()=>{} },

    openTasksWindowObject:{openTasksWindow: false,setOpenTasksWindow: () => {}},
    allTasksObject: {allTasks:[], setAllTasks: () => {}},
    selectedTaskObject: { selectedTask:null , setSelectedTask:() => {}},
    projectClickedObject: {projectClicked: null,setProjectClicked: () => {}},
    projectSearch: "",
    setProjectSearch: () => {},

    taskSearch: "",
    setTaskSearch: () => {},
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
        },{
            id:4,
            name:"notepad app",
            isSelected:false
        },{
            id:5,
            name:"chatting app",
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
    ]);

    const [openSortingDropDown , setOpenSortingDropDown] = useState<boolean>(false);

    const [sortingDropDownPositions, setSortingDropDownPositions] = useState({ top:0, left:0 , width:0});

    const [chosenProject, setChosenProject]  = useState<Project | null>(null);
    
    const [tabsOptions,setTabsOptions] = useState<TabOption[]>([
        {id: 1, name: "On Going Tasks" , isSelected: true},
        {id: 2, name: "Completed Tasks" , isSelected: false},
    ]);

    const [openProjectsDropDown , setOpenProjectsDropDown ]  = useState<boolean>(false);
    const [projectsDropDownPositions , setProjectsDropDownPositions ]  = useState({top:0, left:0,width:0 });
    const [openTasksWindow , setOpenTasksWindow ]  = useState<boolean>(false);
    const [allTasks , setAllTasks] = useState<Task[]>([]);
    
    const [selectedTask , setSelectedTask] = useState<Task | null>(null);
    const [projectClicked , setProjectClicked] = useState<Project | null>(null);

    const {user , isLoaded , isSignedIn} = useUser();

    useEffect(() => {
        setOpenSideBar(false);  
    },[sideBarMenu]);    

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching projects...");
                const response = await fetch(`/api/projects?clerkUserId=${user?.id}`);
                const data = await response.json();
    
                if (!Array.isArray(data.projects)) {
                    throw new Error("Projects should be an array");
                }
    
                setAllProjects(data.projects);
                setAllTasks(data.projects.flatMap((project: any) => project.tasks || []));
            } catch (error) {
                console.error("Failed to fetch projects", error);
            }
        };
    
        if (isLoaded && isSignedIn && user) {
            fetchData();
        }
    }, [isLoaded, isSignedIn, user]);
    

    const [projectSearch, setProjectSearch] = useState("");
    const [taskSearch, setTaskSearch] = useState("");

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
                
                chosenProjectObject: { chosenProject, setChosenProject },
                tabsOptionsObject: { tabsOptions, setTabsOptions },

                openProjectsDropDownObject: { openProjectsDropDown, setOpenProjectsDropDown },
                projectsDropDownPositionsObject: { projectsDropDownPositions, setProjectsDropDownPositions },
                openTasksWindowObject:{openTasksWindow,setOpenTasksWindow},
                allTasksObject: {allTasks, setAllTasks},
                selectedTaskObject: { selectedTask , setSelectedTask},
                projectClickedObject: {  projectClicked,setProjectClicked},
                taskSearch,
                setTaskSearch,
                projectSearch,
                setProjectSearch,
            }}>
                {children}
            </ContextApp.Provider>
        </>
    )
}

export function useContextApp(){
    return useContext(ContextApp);
}