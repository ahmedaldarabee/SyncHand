"use client"

import Sidebar from "./components/Sidebar";
import ProjectWindow from "./components/windows/ProjectWindow";
import AllProjects from "./pages/AllProjects/AllProjects";
import AllTasks from "./pages/AllTasks/AllTasks";
import { useContextApp } from "./pages/contextApp";

// main component that used to show add components in this project
const Home = () => {
  const {
      openSideBarObject: { openSideBar, setOpenSideBar },
      sideBarMenuObject: { sideBarMenu, setSideBarMenu },
      openProjectWindowObject: { openProjectWindow, setOpenProjectWindow }
    } = useContextApp();

  const componentMap:Record<number,React.ReactNode> = {
    1:<AllProjects/>,
    2:<AllTasks/>,
  }

  // 1 as default page!
  const componentKey = sideBarMenu.find((item) => item.isSelected)?.id || 1;
  const selectedComponent = componentMap[componentKey] || null;

  return (
    <main className="flex w-full h-screen poppins transition-all">
      
      <ProjectWindow />

      {/* soft layer */}

      {(openSideBar) && (
        <div className={`transition-all w-full h-full ${openProjectWindow? 'z-70' : 'z-50'} bg-slate-800 fixed opacity-30`}>  </div>
      )}

        <Sidebar/>
        {selectedComponent}
    </main>
  );
}
export default Home;