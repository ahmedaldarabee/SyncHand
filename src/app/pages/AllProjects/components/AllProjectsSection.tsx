import React from 'react'
import { useContextApp } from '../../contextApp'
import ProjectCard from './ProjectCard'

const AllProjectsSection = () => {
  const {
    allProjectsObject: {allProjects , setAllProjects}
  } = useContextApp();

  return (
    <div className='projects-bar h-[80%] flex gap-4 flex-wrap overflow-auto mt-3 max-sm:m-auto'>
      {
        allProjects.map((project) => (
          <ProjectCard project={project} key={project.id}/>
        ))
      }
    </div>
  )
}

export default AllProjectsSection