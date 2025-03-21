import { Project } from "../Data/AllProjects";
import { Task } from "../Data/AllProjects";

interface DeleteTaskProps {
  taskToDelete: Task;
  allProjects: Project[];
  chosenProject: Project | null;
  setAllTasks: (tasks: Task[]) => void;
  setChosenProject: (project: Project) => void;
  setAllProjects: (projects: Project[]) => void;
}

export default async function addNewTask(
  newTask: Task,
  allProjects: Project[],
  setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>,
  chosenProject: Project | null,
  setChosenProject: React.Dispatch<React.SetStateAction<Project | null>>,
  allTasks: Task[],
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  project: Project | null
) {
  console.log(newTask);

  // Update the all projects array
  const updateAllProjects = allProjects.map((proj) => ({
    ...proj,
    tasks: proj.id === project?.id ? [...proj.tasks, newTask] : [...proj.tasks],
  }));

  // Update the chosen project state
  if (chosenProject && chosenProject.id === project?.id) {
    const copyChosenProject: Project = {
      ...chosenProject,
      tasks: [...chosenProject.tasks, newTask],
    };
    setChosenProject(copyChosenProject);
  }

  // Update the states
  setAllTasks([...allTasks, newTask]);
  setAllProjects(updateAllProjects);

  // Update the project in the database
  if (project) {
    try {
      const response = await fetch("/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project.id,
          projectName: project.title,
          icon: project.icon,
          tasks: [...project.tasks, newTask],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const updatedProject = await response.json();
      console.log("Project updated successfully:", updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  }
}

export const updateTaskAndProjects = async ({
  updateTask,
  project,
  allProjects,
  chosenProject,
  setAllTasks,
  setChosenProject,
  setAllProjects,
}: {
  updateTask: Task;
  project: Project | null;
  allProjects: Project[];
  chosenProject: Project | null;
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setChosenProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}): Promise<void> => {
  // 1. Create updated task

  // 2. Update all projects tasks array
  const updatedProjects = allProjects.map((proj: any) => {
    if (proj.title === updateTask.projectName) {
      const taskExists = proj.tasks.some((task: any) => task.id === updateTask.id);
      if (taskExists) {
        return {
          ...proj,
          tasks: proj.tasks.map((task: any) =>
            task.id === updateTask.id ? updateTask : task
          ),
        };
      } else {
        return { ...proj, tasks: [...proj.tasks, updateTask] };
      }
    } else {
      return {
        ...proj,
        tasks: proj.tasks.filter((task: any) => task.id !== updateTask.id),
      };
    }
  });

  // 3. Update all tasks array
  const updateAllTasks = updatedProjects.flatMap((proj: any) => proj.tasks);
  setAllTasks(updateAllTasks);

  // 4. Update the chosen project
  if (chosenProject && project) {
    let updateTasksOfChosenProject: Task[] = [];

    if (chosenProject.id === project.id) {
      updateTasksOfChosenProject = chosenProject.tasks.map((task: any) =>
        task.id === updateTask.id ? updateTask : task
      );
    } else {
      updateTasksOfChosenProject = chosenProject.tasks.filter(
        (task: any) => task.id !== updateTask.id
      );
    }

    const updatedChosenProject: Project = {
      ...chosenProject,
      tasks: updateTasksOfChosenProject,
    };

    setChosenProject(updatedChosenProject);
  }

  setAllProjects(updatedProjects);

  try {
    const projectToUpdate = updatedProjects.find(
      (p: any) => p.title === updateTask.projectName
    );
    if (projectToUpdate) {
      const response = await fetch("/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: projectToUpdate.id,
          projectName: projectToUpdate.title,
          icon: projectToUpdate.icon,
          tasks: projectToUpdate.tasks,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const updatedProject = await response.json();
      console.log("Project updated successfully:", updatedProject);
    }
  } catch (error) {
    console.error("Error updating project:", error);
  }
};

export const deleteTask = async ({
  taskToDelete,
  allProjects,
  chosenProject,
  setAllTasks,
  setChosenProject,
  setAllProjects,
}: DeleteTaskProps): Promise<void> => {
  const updatedProjects = allProjects.map((proj: any) => ({
    ...proj,
    tasks: proj.tasks.filter((task: any) => task.id !== taskToDelete.id),
  }));

  const updateAllTasks = updatedProjects.flatMap((proj: any) => proj.tasks);
  setAllTasks(updateAllTasks);

  if (
    chosenProject &&
    chosenProject.tasks.some((task: any) => task.id === taskToDelete.id)
  ) {
    const updatedChosenProject: Project = {
      ...chosenProject,
      tasks: chosenProject.tasks.filter((task: any) => task.id !== taskToDelete.id),
    };
    setChosenProject(updatedChosenProject);
  }

  setAllProjects(updatedProjects);

  try {
    const projectToUpdate = allProjects.find((p: any) =>
      p.tasks.some((t: any) => t.id === taskToDelete.id)
    );
    if (projectToUpdate) {
      const response = await fetch("/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: projectToUpdate.id,
          projectName: projectToUpdate.title,
          icon: projectToUpdate.icon,
          tasks: projectToUpdate.tasks.filter((t) => t.id !== taskToDelete.id),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const updatedProject = await response.json();
      console.log("Project updated successfully:", updatedProject);
    }
  } catch (error) {
    console.error("Error updating project:", error);
  }
};

interface UpdateStatusProps {
  task: Task;
  allProjects: Project[];
  allTasks: Task[];
  checked: boolean;
  chosenProject: Project | null;
  setAllProjects: (projects: Project[]) => void;
  setAllTasks: (tasks: Task[]) => void;
  setChecked: (checked: boolean) => void;
  setChosenProject?: (project: Project) => void;
}

export async function updateStatus2({
  task,
  allProjects,
  allTasks,
  checked,
  chosenProject,
  setAllProjects,
  setAllTasks,
  setChecked,
  setChosenProject,
}: UpdateStatusProps): Promise<void> {
  const newStatus = checked ? "In Progress" : "Completed";

  // Update allProjects
  const updatedProjects: Project[] = allProjects.map((project: any) => ({
    ...project,
    tasks: project.tasks.map((t: any) =>
      t.id === task.id ? { ...t, status: newStatus } : t
    ),
  }));

  // Update allTasks
  const updatedTasks: Task[] = allTasks.map((t:any) =>
    t.id === task.id ? { ...t, status: newStatus } : t
  );

  let updatedChosenProject: Project | null = null;
  if (chosenProject) {
    updatedChosenProject = {
      ...chosenProject,
      tasks: chosenProject.tasks.map((t:any) => {
        if (task.id === t.id) {
          return { ...t, status: newStatus };
        }
        return t;
      }),
    };

    setChosenProject?.(updatedChosenProject);
  }

  console.log(updatedChosenProject);

  // Update state
  setAllProjects(updatedProjects);
  setAllTasks(updatedTasks);
  setChecked(!checked);

  // Update the project in the database
  try {
    const projectToUpdate = updatedProjects.find((p: any) =>
      p.tasks.some((t: any) => t.id === task.id)
    );

    if (projectToUpdate) {
      const response = await fetch("/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: projectToUpdate.id,
          projectName: projectToUpdate.title,
          icon: projectToUpdate.icon,
          tasks: projectToUpdate.tasks.map((t: any) => ({
            ...t,
            projectName: projectToUpdate.title,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      const { project: updatedProject } = await response.json();
      console.log("Project updated successfully:", updatedProject);
    }
  } catch (error) {
    console.error("Error updating project:", error);
  }
}
