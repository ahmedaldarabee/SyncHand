import React from 'react'
import { useContextApp } from '../../contextApp'
import ProjectCard from './ProjectCard'
import ProjectsEmptyScreen from '@/app/EmptyScreen/ProjectsEmptyScreen';

const AllProjectsSection = () => {
  const {
    allProjectsObject: {allProjects}
  } = useContextApp();

  return (
    <div className='projects-bar h-[80%] flex gap-4 flex-wrap overflow-auto mt-3 max-sm:m-auto'>
      {
        allProjects.length === 0 ? <ProjectsEmptyScreen /> : allProjects.map((project) => (
          <ProjectCard project={project} key={project.id}/>
        ))
      }
    </div>
  )
}

export default AllProjectsSection;