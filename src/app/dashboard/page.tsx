"use client"

import MoreDropDown from "../components/DropDowns/MoreDropDown";
import SortingDropDown from "../components/DropDowns/SortingDropDown";
import Sidebar from "../components/Sidebar";
import ConfirmationWindow from "../components/windows/ConfirmationWindow";
import IconWindow from "../components/windows/IconWindow";
import { ProjectWindow } from "../components/windows/ProjectWindow";
import AllProjects from "../pages/AllProjects/AllProjects";
import AllTasks from "../pages/AllTasks/AllTasks";
import { useContextApp } from "../pages/contextApp";
import { Toaster } from 'react-hot-toast';
import AiPage from "../pages/AI/AiPage";
import ProjectsDropDown from "../components/DropDowns/ProjectsDropDown";
import { TasksWindow } from "../components/windows/TasksWindow";
import TasksDropDown from "../components/DropDowns/TasksDropDown";
import NotePage from "../pages/Note/NotePage";
import ChattingApp from "../pages/chat/ChattingApp";

const Main = () => {
    const {
        openSideBarObject: { openSideBar },
        sideBarMenuObject: { sideBarMenu },
        openProjectWindowObject: { openProjectWindow },
        openConfirmationWindowObject: {openConfirmationWindow},
    } = useContextApp();

    const componentMap:Record<number,React.ReactNode> = {
        1:<AllProjects/>,
        2:<AllTasks/>,
        3:<AiPage />,
        4:<NotePage />,
        5:<ChattingApp />
    }

    // 1 as default page!
    const componentKey = sideBarMenu.find((item) => item.isSelected)?.id || 1;
    const selectedComponent = componentMap[componentKey] || <AllProjects/>;

    return (
        <main className="flex w-full h-screen poppins transition-all">
            <TasksDropDown />
            <TasksWindow />
            <ProjectsDropDown />
            <SortingDropDown />
            <Toaster />

            <ConfirmationWindow />
            <MoreDropDown />
            <IconWindow />
            <ProjectWindow />
            {/* soft layer */}

            {(openSideBar) && (
                <div className={`transition-all w-full h-full ${openProjectWindow || openConfirmationWindow ? 'z-700' : 'z-10'} bg-slate-800 fixed opacity-30`}></div>
            )}

            <Sidebar/>
                {selectedComponent}
        </main>
    )
}

export default Main;