import React from 'react'
import TasksHeader from './components/TasksHeader'
import TasksSubHeader from './components/TasksSubHeader'
import TasksList from './components/TasksList'

const AllTasks = () => {
    
    return (
        <div className='bg-slate-50 w-full flex-grow p-10 min-h-screen max-sm:p-5 overflow-hidden'>
            <TasksHeader/>
            <TasksSubHeader/>
            <TasksList/>
        </div>
    )
}

export default AllTasks;