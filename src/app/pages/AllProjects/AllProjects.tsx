import React from 'react';
import ProjectsHeader from './components/ProjectsHeader';
import ProjectsSubHeader from './components/ProjectsSubHeader';
import AllProjectsSection from './components/AllProjectsSection';

const AllProjects = () => {
    return (
        // bg-slate-50 w-[78%]  min-h-screen flex
        <div className='bg-slate-50 max-sm:w-[100%] w-[78%] sm:w-[100%] sm:flex-col min-h-screen flex'>
            <AllProjectArea/>
        </div>
    )
};

function AllProjectArea() {
    return (
        <div className='w-full lg:p-10 max-sm:p-5 flex flex-col max-sm:gap-1 lg:gap-3 border-r-2 overflow-auto'>
            <ProjectsHeader/>
            <ProjectsSubHeader/>
            <AllProjectsSection/>
        </div>
    )
}

export default AllProjects