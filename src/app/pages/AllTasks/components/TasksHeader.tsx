import React from 'react'
import { AddProject, SearchBar } from '../../AllProjects/components/ProjectsHeader'

const TasksHeader = () => {
    return (
        <div className='w-full flex justify-between items-center flex-wrap gap-3 sm:gap-4'>
            <SearchBar />
            <AddProject />
        </div>
    )
}

export default TasksHeader