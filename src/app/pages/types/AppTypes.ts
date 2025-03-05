import { Project } from "@/app/Data/AllProjects";
import { ReactNode } from "react";

export interface SidebarMenuItem  {
    id:number,
    name:string,
    isSelected:boolean
};

export interface IconData extends SidebarMenuItem{
    icon:ReactNode
}

export type SortingOption = {
    category: string,
    options: {
        label:string,
        value:string,
        selected:boolean;
    }[];
}

export type sortingDropDownPosition = {
    top:number,
    left:number,
    width?:number
}

export type TabOption = {
    id: number,
    name: string,
    isSelected: boolean
}


export type AppType = {

    tabsOptionsObject: {
        tabsOptions: TabOption[];
        setTabsOptions: React.Dispatch<React.SetStateAction<TabOption[]>>;
    }

    sortingOptionObject: {
        sortingOptions: SortingOption[];
        setSortingOptions: React.Dispatch<React.SetStateAction<SortingOption[]>>;
    };

    openSortingDropDownObject: {
        openSortingDropDown: boolean,
        setOpenSortingDropDown: React.Dispatch<React.SetStateAction<boolean>>;
    }

    sortingDropDownPositionObject:{
        sortingDropDownPositions:sortingDropDownPosition,
        setSortingDropDownPositions: React.Dispatch<React.SetStateAction<sortingDropDownPosition>>;
    }

    openSideBarObject : {
        openSideBar:boolean,
        setOpenSideBar:React.Dispatch<React.SetStateAction<boolean>>;
    };

    sideBarMenuObject : {
        sideBarMenu: SidebarMenuItem[];
        setSideBarMenu: React.Dispatch<React.SetStateAction<SidebarMenuItem[]>>;
    }

    openProjectWindowObject:{
        openProjectWindow:boolean,
        setOpenProjectWindow:React.Dispatch<React.SetStateAction<boolean>>;
    }

    allIconDataObject: {
        allIconsData: IconData[],
        setAllIconsData:React.Dispatch <React.SetStateAction<IconData[]>>
    }

    openIconWindowObject:{
        openIconWindow:boolean,
        setOpenIconWindow:React.Dispatch<React.SetStateAction<boolean>>;
    }

    selectedIconObject: {
        selectedIcon: IconData | null,
        setSelectedIcon:React.Dispatch<React.SetStateAction<IconData | null>>
    }

    allProjectsObject:{
        allProjects:Project[];
        setAllProjects: React.Dispatch <React.SetStateAction<Project[]>>;
    }

    openDropDownObject:{
        openDropDown:boolean;
        setOpenDropDown: React.Dispatch <React.SetStateAction<boolean>>;
    }

    dropDownPositionObject:{
        dropDownPosition:{
            top:number,
            left:number
        };
        setDropDownPosition: React.Dispatch<React.SetStateAction<{ top: number; left: number }>>;
    }

    openConfirmationWindowObject: {
        openConfirmationWindow:boolean,
        setOpenConfirmationWindow: React.Dispatch <React.SetStateAction<boolean>>;
    }

    selectedProjectObject: {
        selectedProject: Project | null,
        setSelectedProject:React.Dispatch <React.SetStateAction<Project | null>>;
    }
    
    loadingObject:{
        isLoading: boolean,
        setLoading:React.Dispatch <React.SetStateAction<boolean>>;
    }
    
    chosenProjectObject: {
        chosenProject: Project | null,
        setChosenProject:React.Dispatch <React.SetStateAction<Project | null>>;
    }

    openProjectsDropDownObject:{
        openProjectsDropDown:boolean;
        setOpenProjectsDropDown: React.Dispatch <React.SetStateAction<boolean>>;
    }
    
    projectsDropDownPositionsObject:{
        projectsDropDownPositions: sortingDropDownPosition;
        setProjectsDropDownPositions: React.Dispatch<React.SetStateAction<sortingDropDownPosition>>;
    }

    openTasksWindowObject:{
        openTasksWindow:boolean;
        setOpenTasksWindow: React.Dispatch <React.SetStateAction<boolean>>;
    }
}