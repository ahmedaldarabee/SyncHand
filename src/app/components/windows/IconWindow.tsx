"use client";

import AllIcons from "@/app/Data/AllIcons";
import { BookmarkX, ChevronsLeftRightEllipsis } from "lucide-react";
import React from "react";
import { useContextApp } from "@/app/pages/contextApp";

const IconWindow = () => {
    const {
        openIconWindowObject: { openIconWindow, setOpenIconWindow },
    } = useContextApp();

    if (!openIconWindow) return null;

    return (
        <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 rounded-lg p-3 h-[300px] lg:w-[40%] max-sm:w-[90%] md:w-[80%] bg-white shadow-md z-[600]">
            <Header setOpenIconWindow={setOpenIconWindow} />
                <span className="mx-8 text-[13px] mt-10 text-slate-400">
                    {`Please select an icon from this list:`}
                </span>
            <IconsArea />
        </div>
    );
}

const Header = ({ setOpenIconWindow }: { setOpenIconWindow: (value: boolean) => void }) => {
    return (
        <div className="flex justify-between items-center pt-5 mb-2">
        <div className="flex items-center gap-2">
            <div className="p-2 bg-sky-200 rounded-lg flex items-center justify-center">
                <ChevronsLeftRightEllipsis className="w-4 h-4 text-sky-400 text-[17px]" />
            </div>
            <span className="capitalize font-semibold text-lg">All Icons</span>
        </div>

        <BookmarkX
            onClick={() => setOpenIconWindow(false)}
            className="hover:text-red-600 hover:scale-110 text-slate-300 w-4 h-4 cursor-pointer transition-all"
        />
        </div>
    );
}

const IconsArea = () => {
    return (
        <div className="w-full flex flex-col items-center mt-3">
            <div className="projects-bar w-[92%] h-[120px] overflow-auto rounded-md bg-slate-100">
                <AllIcons />
            </div>
        </div>
    );
}

export default IconWindow;
