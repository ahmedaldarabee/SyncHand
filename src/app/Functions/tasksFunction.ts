import { Priority } from "../components/windows/TasksWindow";
import { Project, Task } from "../Data/AllProjects";

interface DeleteTaskProps {
    taskToDelete: Task;
    allProjects: Project[];
    chosenProject: Project | null;
    setAllTasks: (tasks: Task[]) => void;
    setChosenProject: (project: Project) => void;
    setAllProjects: (project: Project[]) => void;
}

export default function addNewTask(
    newTask: Task,
    allProjects: Project[],
    setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>,
    chosenProject: Project | null,
    setChosenProject: React.Dispatch<React.SetStateAction<Project | null>>,
    allTasks: Task[],
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    project: Project | null
){
    const updateAllProjects = allProjects.map((proj) => ({
        ...proj,
        tasks: proj.id === project?.id ? [...proj.tasks, newTask] : [...proj.tasks],
    }))

    if(chosenProject && chosenProject.id === project?.id){
        const copyChosenProject: Project = {
            ...chosenProject,
            tasks: [...chosenProject.tasks , newTask],
        };
        setChosenProject(copyChosenProject);
    }
    
    setAllTasks([...allTasks,newTask]);
    setAllProjects(updateAllProjects);
}

interface UpdateTaskAndProjectProps {
    selectedTask: Task;
    data: FormData;
    selectedIcon: {name: string} | null;
    project: Project | null;
    priority: Priority | null;
    allProjects: Project[];
    chosenProject: Project | null;
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    setChosenProject: React.Dispatch<React.SetStateAction<Project | null>>;
    setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export const updateTaskAndProjectProps = ({
    updateTask,
    project,
    allProjects,
    chosenProject,
    setAllTasks,
    setChosenProject,
    setAllProjects
}: {
    updateTask: Task,
    project: Project | null,
    allProjects: Project[],
    chosenProject: Project | null,
    setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setChosenProject: React.Dispatch<React.SetStateAction<Project | null>>,
    setAllProjects: React.Dispatch<React.SetStateAction<Project[]>>,
}) :void => {
    const updateProjects = allProjects.map((proj) => {
        if(proj.title === updateTask.projectName){
            const taskExists = proj.tasks.some((task) => task.id === updateTask.id)
            
            if(taskExists){
                return {
                    ...proj,
                    tasks: proj.tasks.map((task) =>
                        task.id === updateTask.id ? updateTask: task
                    ),
                };
            }else{
                return {
                    ...proj,tasks: [...proj.tasks,updateTask]
                };
            }
        }else{
            return{
                ...proj,
                tasks: proj.tasks.filter((task) => task.id !== updateTask.id)
            }
        }
    });
    
    const updateAllTasks = updateProjects.flatMap((proj) => proj.tasks);
    setAllTasks(updateAllTasks);
    
    if(chosenProject && project){
        let updateTasksOfChosenProject: Task[] = [];
        if(chosenProject.id === project.id){
            updateTasksOfChosenProject = chosenProject.tasks.map((task) => {
                if(task.id === updateTask.id){
                    return updateTask;
                }
                return task;
            });
        }else{
            updateTasksOfChosenProject = chosenProject.tasks.filter((task) => task.id !== updateTask.id);
        };
        const updatedChosenProject : Project = {
            ...chosenProject,
            tasks: updateTasksOfChosenProject,
        }
        setChosenProject(updatedChosenProject);
    }
    setAllProjects(updateProjects);
}

export const deleteTask = ({
    taskToDelete,
    allProjects,
    chosenProject,
    setAllTasks,
    setChosenProject,
    setAllProjects
}: DeleteTaskProps ): void => {
    
    const updatedProjects = allProjects.map((proj) => ({
        ...proj,
        tasks: proj.tasks.filter((task) => task.id !== taskToDelete.id)
    }));

    const updateAllTasks: Task[] = updatedProjects.flatMap((proj) => proj.tasks);
    setAllTasks(updateAllTasks);

    if(chosenProject && chosenProject.tasks.some((task) => task.id === taskToDelete.id)){
        const updatedChosenProject: Project = {
            ...chosenProject,
            tasks: chosenProject.tasks.filter((task) => task.id !== taskToDelete.id),
        };
        setChosenProject(updatedChosenProject);
    }
    setAllProjects(updatedProjects);
};
