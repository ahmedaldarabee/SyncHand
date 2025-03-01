"use client"

import MoreDropDown from "./components/DropDowns/MoreDropDown";
import Sidebar from "./components/Sidebar";
import ConfirmationWindow from "./components/windows/ConfirmationWindow";
import IconWindow from "./components/windows/IconWindow";
import ProjectWindow from "./components/windows/ProjectWindow";
import AllProjects from "./pages/AllProjects/AllProjects";
import AllTasks from "./pages/AllTasks/AllTasks";
import { useContextApp } from "./pages/contextApp";
import { Toaster } from 'react-hot-toast';


// main component that used to show add components in this project

const Home = () => {
  const {

      openSideBarObject: { openSideBar, setOpenSideBar },
      sideBarMenuObject: { sideBarMenu, setSideBarMenu },
      openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
      openConfirmationWindowObject: {openConfirmationWindow,setOpenConfirmationWindow},
      selectedProjectObject: { selectedProject , setSelectedProject },

    } = useContextApp();

  const componentMap:Record<number,React.ReactNode> = {
    1:<AllProjects/>,
    2:<AllTasks/>,
  }

  // 1 as default page!
  const componentKey = sideBarMenu.find((item) => item.isSelected)?.id || 1;
  const selectedComponent = componentMap[componentKey] || <AllProjects/>;

  return (
    <main className="flex w-full h-screen poppins transition-all">
      <Toaster />
      <ConfirmationWindow />
      <MoreDropDown />
      <IconWindow />
      <ProjectWindow />

      {/* soft layer */}

      {(openSideBar) && (
        <div className={`transition-all w-full h-full ${openProjectWindow || openConfirmationWindow ? 'z-700' : 'z-10'} bg-slate-800 fixed opacity-30`}>  </div>
      )}
        <Sidebar/>
        {selectedComponent}
    </main>
  );
}

export default Home;