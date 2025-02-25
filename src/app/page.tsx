import Sidebar from "./components/Sidebar";
import AllProjects from "./pages/AllProjects/AllProjects";
import StatusRightSide from "./pages/AllProjects/components/StatusRightSide";
import AllTasks from "./pages/AllTasks/AllTasks";

const Home = () => {
  return (
    <main className="flex w-full h-screen poppins">
        <Sidebar/>
        <AllProjects />
        <StatusRightSide />
        {/* <AllTasks /> */}
    </main>
  );
}
export default Home;