import React, { SetStateAction } from 'react';
import { useContextApp } from '../../contextApp';
import ProjectCard from './ProjectCard';
import ProjectsEmptyScreen from '@/app/EmptyScreen/ProjectsEmptyScreen';
import { CircularProgress } from '@mui/material';

const AllProjectsSection = ({
  globalSearchProject,
  setGlobalSearchProject,
}: {
  globalSearchProject: string;
  setGlobalSearchProject: React.Dispatch<SetStateAction<string>>;
}) => {
  const {
    allProjectsObject: { allProjects },
    loadingObject: { isLoading },
  } = useContextApp();
  console.log(setGlobalSearchProject);

  const filterProjectsBySearch = globalSearchProject
    ? allProjects.filter((proj: any) =>
        proj.title.toLowerCase().includes(globalSearchProject.toLowerCase())
      )
    : allProjects;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 py-40 justify-center items-center w-full mt-16">
        <CircularProgress value={100} className="text-sky-600" />
        <span className="text-slate-400 text-sm">Loading...</span>
      </div>
    );
  }

  return (
    <div className="projects-bar h-[80%] flex gap-4 flex-wrap overflow-auto mt-3 max-sm:m-auto">
      {allProjects.length === 0 ? (
        <ProjectsEmptyScreen />
      ) : (
        filterProjectsBySearch.map((project: any) => (
          <ProjectCard project={project} key={project.id} />
        ))
      )}
    </div>
  );
};

export default AllProjectsSection;
