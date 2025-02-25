"use client"

import React, { createContext, ReactNode, useContext, useState } from 'react'

// structure of the context!
type AppType = {
    openSideBarObject :{
        openSideBar:boolean,
        setOpenSideBar:React.Dispatch<React.SetStateAction<boolean>>;
    }
}

// setting the default state
const defaultState: AppType = {
    openSideBarObject:{
        openSideBar:false,
        setOpenSideBar:() => {},
    }
}

// creating the context
const ContextApp = createContext<AppType>(defaultState);

export default function ContextAppProvider({
    children,
}:{
    children:ReactNode;
}){
    const [openSideBar, setOpenSideBar] = useState(false);
    return (
        // ContextApp: that response to send the data between components
        <ContextApp.Provider value={{openSideBarObject: { openSideBar , setOpenSideBar }}}>
            {children}
        </ContextApp.Provider>
    )
};

export function useContextApp(){
    return useContext(ContextApp);
}

