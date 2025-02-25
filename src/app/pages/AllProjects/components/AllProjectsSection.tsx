import React from 'react'
import ProjectCard from './ProjectCard'

const AllProjectsSection = () => {
  return (
    <div className='projects-bar h-[80%] flex gap-4 flex-wrap overflow-auto mt-3 max-sm:m-auto'>
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
    </div>
  )
}

export default AllProjectsSection