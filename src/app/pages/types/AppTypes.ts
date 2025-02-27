// structure of the context!

import { ReactNode } from "react";

export interface SidebarMenuItem  {
    id:number,
    name:string,
    isSelected:boolean
};

export interface IconData extends SidebarMenuItem{
    icon:ReactNode
}

export type AppType = {
    openSideBarObject : {
        openSideBar:boolean,
        // React.Dispatch that response to update the sate and return state!
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
        setSelectedIcon:React.Dispatch <React.SetStateAction<IconData | null>>
    }
}