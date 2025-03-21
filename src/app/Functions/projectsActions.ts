import React, { Dispatch, SetStateAction } from "react";

import { v4 as uuidv4 } from "uuid";

import { Project, Task } from "@/app/Data/AllProjects";

import { IconData } from "@/app/pages/types/AppTypes";
import { FormData } from "../components/windows/ProjectWindow"

export function addNewProject(
  data: FormData,
  allProjects: Project[],
  setAllProjects: Dispatch<SetStateAction<Project[]>>,
  setOpenProjectWindow: Dispatch<SetStateAction<boolean>>,
  selectedIcon: IconData | null,
  reset: () => void,
  user: string | undefined
) {
  try {
    const newProject: Project = {
      id: uuidv4(), // Generate a unique ID for the project
      title: data.projectName,
      icon: selectedIcon?.name || "List",
      tasks: [],
      clerkUserId: user || "", // This will be replaced with the actual user ID when integrated with authentication
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log(user);

    // Update the local state to reflect the new project immediately
    setAllProjects([...allProjects, newProject]);
    setOpenProjectWindow(false); // Close the project window
    reset(); // Reset the form fields

    // Perform the POST request to save the new project to the backend
    const postProject = async () => {
      try {
        const response = await fetch(`/api/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProject), // Send the new project data
        });

        if (!response.ok) {
          throw new Error(`Failed to add the project: ${response.statusText}`);
        }

        const savedProject = await response.json();
        console.log("Project added successfully:", savedProject);
      } catch (error) {
        console.error("Error adding new project:", error);
      }
    };

    // Call the fetch method to persist the new project in the backend
    postProject();
  } catch (error) {
    console.error("Error in adding project:", error);
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
  setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (selectedProject) {
    const updateProject: Project = {
      ...selectedProject,
      title: data.projectName,
      icon: selectedIcon?.name || "LocalLibrary",
      tasks: selectedProject.tasks.map((task: any) => ({
        ...task,
        projectName: data.projectName,
      })),
    };

    const updateAllProjects = allProjects.map((project: any) => {
      if (project.id === selectedProject.id) {
        return updateProject;
      }
      return project;
    });

    const updateAllTasks = allTasks.map((task: any) =>
      task.projectName === selectedProject.title
        ? { ...task, projectName: data.projectName }
        : task
    );

    // Update the state immediately
    setAllTasks(updateAllTasks);
    setAllProjects(updateAllProjects);
    setSelectedProject(null);
    setOpenConfirmationWindow(false);

    // Perform the PUT request to update the project in the backend
    const putProject = async () => {
      try {
        const response = await fetch(`/api/projects`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId: selectedProject.id,
            projectName: data.projectName,
            icon: selectedIcon?.name,
            tasks: updateProject.tasks,
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to update the project: ${response.statusText}`
          );
        }

        const updatedProject = await response.json();
        console.log("Project updated successfully:", updatedProject);
      } catch (error) {
        console.error("Error updating project:", error);
      }
    };

    putProject(); // Call the fetch method to update the backend
  }
}

export async function deleteProject(
  selectedProject: Project | null,
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>,
  allProjects: Project[],
  setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>,
  allTasks: Task[],
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  setOpenConfirmationWindow: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (selectedProject) {
    console.log(selectedProject);

    try {
      // Make DELETE request to remove the project from the database
      const response = await fetch(
        `/api/projects?projectId=${selectedProject.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        // If successfully deleted, update local state
        const updateAllProjects = allProjects.filter(
          (project) => project.id !== selectedProject.id
        );

        // Update the all tasks array
        const updateAllTasks = allTasks.filter(
          (task) =>
            task.projectName.toLowerCase() !==
            selectedProject.title.toLowerCase()
        );

        console.log(updateAllTasks);

        setAllTasks(updateAllTasks);
        setAllProjects(updateAllProjects);
        setSelectedProject(null);
        setOpenConfirmationWindow(false);

        console.log(data.message); // Success message from the server
      } else {
        console.error("Failed to delete the project:", data.message);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }
}
