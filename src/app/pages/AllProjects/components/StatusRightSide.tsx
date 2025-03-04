"use client"

import React, { useMemo } from 'react'
import { AudioLines } from 'lucide-react';
import { useContextApp } from '../../contextApp';
import { Project } from '@/app/Data/AllProjects';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { truncateString } from './ProjectCard';

const StatusRightSide = () => {

  const {
    allProjectsObject: {allProjects, setAllProjects},
  } = useContextApp();

  const {completedProjects , completedTasks , completedPercentage} = useMemo(() => {
    let completedProjects: Project[] = [];
    let totalTasks = 0;
    let completedTasks = 0;

    allProjects.forEach((project) => {
      const projectCompleted = project.tasks.every((task) => task.status === "Completed");

      if(projectCompleted)
        completedProjects.push(project);

      project.tasks.forEach((task) => {
        totalTasks++;
        if(task.status === "Completed")
          completedTasks++;
      });
    });

    const percentage = completedProjects.length > 0 ? Math.round((completedProjects.length / allProjects.length) * 100) : 0;

    return {
      completedProjects: completedProjects,
      completedTasks,
      completedPercentage: percentage,
    };

  },[allProjects]);

  return (
    <div className='w-[22%] bg-white overflow-hidden max-w-[300px] max-[1000px]:hidden flex justify-end items-center cursor-pointer'>
      <div className='h-[92%] w-[94%] max-w-[100%] rounded-l-2xl p-3 flex flex-col items-center'>
          <Header/>

          <div className='flex flex-col gap-11 items-center justify-center mt-6'>
            <CircularChart percentage={completedPercentage} />
            <ProjectCompletedLabels completedTasks={completedTasks}  completedProjects={completedProjects}/>
          </div>
          
          <ProjectList completedProjects={completedProjects}/>
      </div>
    </div>
  )
}

const Header = () => {
  return(
    <h2 className='text-[22px] font-bold text-center mt-7 capitalize'>
      projects completed
    </h2>
  )
}

const CircularChart = ({percentage}:{percentage: number}) => {
  return(
    <div className='w-40 h-40 flex text-center justify-center items-center'>
        <CircularProgressbar
          value={percentage}
          styles={
            buildStyles({
              pathColor:"#3590c1",
              textColor:"#1475aa",
              trailColor:"#dbddde",
            })
          }
        />
        <div className="absolute text-[#1475aa] font-bold text-2xl">
          {percentage}%
      </div>
    </div>
  )
}

const ProjectCompletedLabels = ({ completedProjects , completedTasks}: {completedProjects: Project[], completedTasks:number}) => {
  return(
    <div className='flex justify-center flex-col gap-1 items-center text-center'>
      <p className='font-bold text-[17px]'>{completedProjects.length} completed</p>
      <p className='text-[13px] text-slate 400 capitalize'>{completedTasks} tasks done</p>
    </div>
  )
}

const ProjectList = ({completedProjects,}: {completedProjects:Project[]}) => {
  return(
      <ul className='projects-bar flex flex-col gap-3 mx-4 overflow-auto'>
          <div className='h-[100%] text-center flex items-center justify-center w-full'>
            {
              completedProjects.length === 0 && (
                <div className={`p-1 flex gap-5 flex-col opacity-40 items-center`}>
                    <AudioLines className='w-10 h-10 cursor-pointer text-slate-600'/>
                    <div className='p-2 flex flex-col flex-wrap w-[180px] justify-center gap-2'>
                      <p>{`No projects completed yet...`}</p>
                    </div>
                </div>
              )
            }

          </div>
          {completedProjects.map((project,index) => (
            <div key={index}>
              <SingleProject project={project} />
              {index < completedProjects.length-1 && (
                <hr className='w-[80%] mx-auto text-slate-200 opacity-50'/>
              )}
            </div>
          ))}
      </ul>
  )
}

const SingleProject = ({project}: {project: Project}) => {
  return(
    <li className='p-3 flex gap-2 items-center'>
      <div className='w-8 h-8 bg-sky-600 rounded-md justify-center items-center flex text-slate-100'>
        <AudioLines className='w-4 h-4'/>
      </div>

      <ul>
        <li className='text-[14px] font-semibold'>
          {truncateString(project.title,20)}
        </li>
        <li className='text-[12px] text-slate-400'>+{project.tasks.length} tasks</li>
      </ul>
    </li>
  )
}

export default StatusRightSide