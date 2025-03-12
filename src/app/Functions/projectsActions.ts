import React , { Dispatch, SetStateAction} from "react"
import { v4 as uuidv4 } from 'uuid'
import {Project, Task} from '@/app/Data/AllProjects';
import {IconData} from '../pages/types/AppTypes'
import {FormData} from '../components/windows/ProjectWindow'
import { useUser } from '@clerk/nextjs';

export function addNewProject (
    data: FormData,
    allProjects:Project[],
    setAllProjects: Dispatch<SetStateAction<Project[]>>,
    setOpenProjectWindow:Dispatch<SetStateAction<boolean>>,
    selectedIcon:IconData | null,
    reset: () => void,
    userId: string | undefined 
) {    
    try {

        if (!userId) {
            throw new Error("User ID is required to add a project.");
        }

        const newProject: Project = {
            id:uuidv4(),
            title:data.projectName,
            icon: selectedIcon?.name || "List",
            tasks:[],
            clerkUserId: userId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setAllProjects([...allProjects, newProject]);
        setOpenProjectWindow(false);
        reset();

        const postProject = async () => {
            try {
                
                const response = await fetch("/api/projects",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify(newProject),
                })
    
                if(!response.ok){
                    throw new Error(`Failed to add the project: ${response.statusText}`);
                }
    
                const savedProject = await response.json();
                console.log("project added successfully", savedProject);
            } catch (error) {
                console.error("Error adding new project: ",error);
                throw error;
            }
        };
        
        postProject();
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProject(
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project|null>>,
    allProjects: Project[],
    setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    allTasks:Task[],
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>
    
){
    if(selectedProject){

        try {
            const response = await fetch(`/api/projects?projectId=${selectedProject.id}`,{
                method:"DELETE"
            });

            const data = await response.json();

            if(response.ok){
                const updateAllProjects = allProjects.filter((project: any) => project.id !== selectedProject.id);
                const updateAllTasks = allTasks.filter((task:any) => 
                    task.projectName.toLowerCase() !== selectedProject.title.toLowerCase()
                )
            
                setAllProjects(updateAllProjects);
                setAllTasks(updateAllTasks)
                setSelectedProject(null);
                setOpenConfirmationWindow(false);
            }else{
                console.error("Failed to delete the project!")
            }

        } catch (error) {
            console.error("Error in deletion operation: ",error)   
        }
    }
}

export function editProject( 
    selectedProject: Project | null,
    setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>,
    data: FormData,
    selectedIcon: IconData | null,
    allProjects: Project[],
    allTasks: Task[],
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    setOpenConfirmationWindow:  React.Dispatch<React.SetStateAction<boolean>>,
) {
    if(selectedProject){
        const updateProject: Project = {
            ...selectedProject,
            title: data.projectName,
            icon: selectedIcon?.name || "List",
            tasks: selectedProject.tasks.map((task: any) => ({
                ...task,
                projectName: data.projectName
            })),
        };

        const updateAllProjects = allProjects.map((project: any) => {
            if(project.id === selectedProject.id){
                return updateProject;
            }
            return project;
        })

        const updateAllTasks = allTasks.map((task: any) => 
            task.projectName === selectedProject.title ? {...task , projectName: data.projectName} : task
        );

        setAllTasks(updateAllTasks);
        setAllProjects(updateAllProjects);
        
        setSelectedProject(null);
        setOpenConfirmationWindow(false);

        const putProject = async () => {
            try {
                const response = await fetch("/api/projects",{
                    method:"PUT",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        projectId: selectedProject.id,
                        projectName: data.projectName,
                        icon: selectedIcon?.name,
                        tasks: updateProject.tasks,
                    }),
                });

                if(!response.ok){
                    throw new Error(`Failed to update the project: ${response.statusText}`)
                }

                const updatedProject = await response.json();
                console.log("Project updated successfully!", updatedProject);
            } catch (error) {
                console.error("put error: ",error);
            }
        }

        putProject();
    }
}
