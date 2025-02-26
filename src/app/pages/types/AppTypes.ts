// structure of the context!

export type SidebarMenuItem = {
    id:number,
    name:string,
    isSelected:boolean
};

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
}