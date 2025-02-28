import React from 'react';
import ProjectsHeader from './components/ProjectsHeader';
import ProjectsSubHeader from './components/ProjectsSubHeader';
import AllProjectsSection from './components/AllProjectsSection';
import StatusRightSide from './components/StatusRightSide';

const AllProjects = () => {
    return (
        <div className='bg-slate-50  w-full min-h-screen flex justify-center flex-grow overflow-auto'>
            <AllProjectArea/>
            <StatusRightSide />
        </div>
    )
};

function AllProjectArea() {
    return (
        <div className='max-[1000px]:w-[100%] w-[78%] sm:flex-col lg:p-8 max-sm:p-5 flex flex-col max-sm:gap-1 lg:gap-3 border-r-2 overflow-auto'>
            <ProjectsHeader/>
            <ProjectsSubHeader/>
            <AllProjectsSection/>
        </div>
    )
}

export default AllProjects