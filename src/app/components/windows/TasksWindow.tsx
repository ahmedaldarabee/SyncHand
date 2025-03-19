"use client";

import React, { createContext,useContext,useEffect,useLayoutEffect,useRef,useState,} from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import getIconComponent from "@/app/Functions/IconsActions";
import { Project, Task } from "@/app/Data/AllProjects";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleIcon from "@mui/icons-material/Circle";
import { sortingDropDownPosition } from "@/app/pages/types/AppTypes"
import TasksDropDown from "../DropDowns/TasksDropDown";
import ListAltIcon from "@mui/icons-material/ListAlt";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { z } from "zod";
import { FieldErrors,SubmitHandler, useForm,UseFormRegister,} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { allIconsArray } from "@/app/Data/AllIcons";
import { v4 as uuidv4 } from "uuid";
import addNewTask, { updateTaskAndProjects} from "@/app/Functions/tasksFunction"
import toast from "react-hot-toast";
import { useContextApp } from "@/app/pages/contextApp";
export type SelectionOption = "priority" | "project";

export type Priority = {
  id: number;
  name: "Low" | "Medium" | "High";
  icon: React.ReactNode;
  isSelected: boolean;
};

export type ProjectWithSelection = Project & { isSelected: boolean };

type SelectionError = {
  id: number;
  label: string;
  message: string;
  show: boolean;
};

//Define the structure of our context
type TaskFormType = {
  clickedSelection: SelectionOption | null;
  setClickedSeletion: React.Dispatch<
    React.SetStateAction<SelectionOption | null>
  >;
  //
  openTasksDropDown: boolean;
  setOpenTasksDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  //
  tasksDropDownPositions: sortingDropDownPosition;
  setTasksDropDownPositions: React.Dispatch<
    React.SetStateAction<sortingDropDownPosition>
  >;
  //priority states
  priority: Priority | null;
  setPriority: React.Dispatch<React.SetStateAction<Priority | null>>;
  //project states
  project: Project | null;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  //
  priorityListObject: {
    priorityList: Priority[];
    setPriorityList: React.Dispatch<React.SetStateAction<Priority[]>>;
  };
  updatedAllProjectsObject: {
    updatedAllProjects: ProjectWithSelection[];
    setUpdatedAllProjects: React.Dispatch<
      React.SetStateAction<ProjectWithSelection[]>
    >;
  };
  selectionErrorsObject: {
    selectionErrors: SelectionError[];
    setSelectionErrors: React.Dispatch<React.SetStateAction<SelectionError[]>>;
  };
};

//Set the default state
const TaskFormState = {
  clickedSelection: null,
  setClickedSeletion: () => {},
  //
  openTasksDropDown: false,
  setOpenTasksDropDown: () => {},
  tasksDropDownPositions: { left: 0, top: 0 , width:0 },
  setTasksDropDownPositions: () => {},
  priority: null,
  setPriority: () => {},
  project: null,
  setProject: () => {},
  priorityListObject: {
    priorityList: [],
    setPriorityList: () => {},
  },

  selectionErrorsObject: {
    selectionErrors: [],
    setSelectionErrors: () => {},
  },

  updatedAllProjectsObject: {
    updatedAllProjects: [],
    setUpdatedAllProjects: () => {},
  },
};

//Create context
const TaskFormContext = createContext<TaskFormType>(TaskFormState); // Error is here

// Create a custom hook to consume our context
export function useTaskFormContext() {
  return useContext(TaskFormContext);
}

// Zod schema
const schema = z.object({
  taskName: z
    .string()
    .min(1, { message: "Task name is required" })
    .max(50, { message: "Task name must be 50 characters or less" }),
});

// Infer the type from the schema
type FormData = z.infer<typeof schema>;

export function TasksWindow() {
  //Usage of the form Data
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setFocus,
    setError,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [clickedSelection, setClickedSeletion] =
    useState<SelectionOption | null>(null);

  const [openTasksDropDown, setOpenTasksDropDown] = useState(false);
  const [tasksDropDownPositions, setTasksDropDownPositions] =
    useState<sortingDropDownPosition>({
      left: 0,
      top: 0,
      width: 0,
    });
  const [priority, setPriority] = useState<Priority | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [priorityList, setPriorityList] = useState<Priority[]>([
    {
      id: 1,
      name: "Low",
      icon: <CircleIcon className="text-[14px] text-green-500" />,
      isSelected: false,
    },
    {
      id: 2,
      name: "Medium",
      icon: <CircleIcon className="text-[14px] text-yellow-500" />,
      isSelected: false,
    },
    {
      id: 3,
      name: "High",
      icon: <CircleIcon className="text-[14px] text-red-500" />,
      isSelected: false,
    },
  ]);

  const {
    allProjectsObject: { allProjects, setAllProjects },
    openTasksWindowObject: { openTasksWindow, setOpenTasksWindow },
    selectedIconObject: { selectedIcon, setSelectedIcon },
    allTasksObject: { allTasks, setAllTasks },
    chosenProjectObject: { chosenProject, setChosenProject },
    selectedTaskObject: { selectedTask, setSelectedTask },
    projectClickedObject: { projectClicked, setProjectClicked },
  } = useContextApp();

  const [updateAllProjects, setUpdateAllProjects] = useState<
    ProjectWithSelection[]
  >([]);

  //Add the isSelected Property to allProjects
  //I added this useEffect, so whenever the all projects is updated
  //we are going to add the isSelected proprety
  useEffect(() => {
    const tempAllProjects: ProjectWithSelection[] = allProjects.map(
      (project) => ({
        ...project,
        isSelected: false,
      })
    );

    setUpdateAllProjects(tempAllProjects);
  }, [allProjects]);

  console.log(updateAllProjects);

  useLayoutEffect(() => {
    //Reset the input
    if (!selectedTask) {
      if (chosenProject) {
        setProject(chosenProject);
        setUpdateAllProjects((prevProjects) =>
          prevProjects.map((proj) => ({
            ...proj,
            isSelected: proj.id === chosenProject.id ? true : false,
          }))
        );
      }

      if (projectClicked) {
        setProject(projectClicked);
        setUpdateAllProjects((prevProjects) =>
          prevProjects.map((proj) => ({
            ...proj,
            isSelected: proj.id === projectClicked.id ? true : false,
          }))
        );
      }

      if (!chosenProject || !projectClicked) {
        setProject(null);
      }
      reset();
      //Rest the priority and project states
      setPriority(null);
    } else {
      //Update the input name
      setValue("taskName", selectedTask.title);

      //Update the priority list selection
      setPriorityList((prevList) =>
        prevList.map((list) => ({
          ...list,
          isSelected: selectedTask.priority === list.name ? true : false,
        }))
      );

      //extract the priority from the priority list and update the priority state
      const getPriority = priorityList.find(
        (priority) => priority.name === selectedTask.priority
      );
      if (getPriority) {
        setPriority(getPriority);
      }

      //Update the project selection in the drop down
      setUpdateAllProjects((prevProjects) =>
        prevProjects.map((proj) => ({
          ...proj,
          isSelected:
            selectedTask.projectName.toLowerCase() === proj.title.toLowerCase()
              ? true
              : false,
        }))
      );
      //extract the project from updatedAllProjects list and update the project state
      const getProject = updateAllProjects.find(
        (proj) =>
          proj.title.toLowerCase() === selectedTask.projectName.toLowerCase()
      );

      if (getProject) {
        setProject(getProject);
      }

      //Update the icon
      const findIconInAllIconsArray = allIconsArray.find(
        (icon) => icon.name === selectedTask.icon
      );
      if (findIconInAllIconsArray) {
        setSelectedIcon(findIconInAllIconsArray);
      }
    }

    //Set the timeoute
    setTimeout(() => {
      setFocus("taskName");
    }, 0);
    //Set all the show propreties to false
    setSelectionErrors((prevState) =>
      prevState.map((error) => ({ ...error, show: false }))
    );
  }, [openTasksWindow, projectClicked, chosenProject]);

  const [selectionErrors, setSelectionErrors] = useState([
    {
      id: 1,
      label: "priority",
      message: "Please select the priority",
      show: false,
    },
    {
      id: 2,
      label: "project",
      message: "Please select a project",
      show: false,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    //Check if the task already exists into the project selected
    if (project) {
      //1 - find the project in the updatedProjects Array
      const findProject = updateAllProjects.find(
        (proj) => proj.id === project.id
      );

      //2 - look for the task if is in all tasks array in the project
      const findTask = findProject?.tasks.find(
        (task) => task.title.toLowerCase() === data.taskName.toLowerCase()
      );

      if (findTask && !selectedTask) {
        setError("taskName", {
          type: "manual",
          message: "task already exists",
        });
        //Set the focus to the project name input
        setFocus("taskName");
        return;
      }
    }

    const newErrors = selectionErrors.map((error) => {
      if (error.label === "priority" && !priority) {
        return { ...error, show: true };
      }

      if (error.label === "project" && !project) {
        return { ...error, show: true };
      }

      return { ...error, show: false };
    });

    //if the show propreties are false when the use clicks in submit
    //Then update or add a task
    if (newErrors.every((error) => error.show === false)) {
      tasksFunction(data);
    }

    setSelectionErrors(newErrors);

    // Add your form submission logic here
  };

  async function tasksFunction(data: FormData) {
    try {
      setIsLoading(true);
      //Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //Add new task
      if (!selectedTask) {
        const newTask: Task = {
          id: uuidv4(),
          title: data.taskName,
          icon: selectedIcon ? selectedIcon?.name : "MenuBook",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          priority: priority ? priority?.name : "Low",
          projectName: project?.title || "",
          status: "In Progress",
        };

        addNewTask(
          newTask,
          allProjects,
          setAllProjects,
          chosenProject,
          setChosenProject,
          allTasks,
          setAllTasks,
          project
        );
      } else {
        const updateTask: Task = {
          ...selectedTask,
          title: data.taskName,
          icon: selectedIcon?.name || "LibraryBooksIcon",
          status: selectedTask.status,
          projectName: project?.title || "",
          priority: priority?.name || "Low",
          updatedAt: new Date().toISOString(),
        };

        updateTaskAndProjects({
          updateTask,
          project,
          allProjects,
          chosenProject,
          setAllTasks,
          setChosenProject,
          setAllProjects,
        });
      }
    } catch (error) {
    } finally {
      toast.success(
        `The task has been ${selectedTask ? "edit" : "added"} successfully`
      );
      setIsLoading(false);
      setOpenTasksWindow(false);
      setSelectedTask(null);
      setProjectClicked(null);
    }
  }

  return (
    <TaskFormContext.Provider
      value={{
        clickedSelection,
        setClickedSeletion,
        openTasksDropDown,
        setOpenTasksDropDown,
        tasksDropDownPositions,
        setTasksDropDownPositions,
        priority,
        setPriority,
        project,
        setProject,
        priorityListObject: {
          priorityList,
          setPriorityList,
        },
        updatedAllProjectsObject: {
          updatedAllProjects: updateAllProjects,
          setUpdatedAllProjects: setUpdateAllProjects,
        },
        selectionErrorsObject: { selectionErrors, setSelectionErrors },
      }}
    >
      <div
        className={` w-[48%] max-sm:w-[82%] max-[600px]:w-[93%]   z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 
      -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50 
      bg-white rounded-lg shadow-md ${openTasksWindow ? "" : "hidden"} `}
      >
        <Header />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 pt-8 px-7 mt-3"
        >
          {/* Input and icon */}
          <TaskInput register={register} errors={errors} />
          {/* Both selections components */}
          <div className="flex justify-between gap-3 mt-5 relative">
            <PrioritySelection />
            <ProjectsSelection />
            <TasksDropDown />
          </div>
          <Footer isLoading={isLoading} />
        </form>
      </div>
    </TaskFormContext.Provider>
  );
}

function Header() {
  const {
    openTasksWindowObject: { setOpenTasksWindow },
    selectedTaskObject: { selectedTask, setSelectedTask },
    projectClickedObject: { setProjectClicked },
  } = useContextApp();
  return (
    <div className="flex justify-between items-center pt-7 px-7">
      <div className="flex items-center gap-2">
        <div className="p-[7px] bg-sky-200 rounded-lg flex items-center justify-center">
          <ListAltIcon
            sx={{ fontSize: "21px" }}
            className="text-sky-600"
            onClick={() => {
              setOpenTasksWindow(false);
              setProjectClicked(null);
            }}
          />
        </div>
        <span className="font-semibold text-lg">
          {selectedTask ? "Edit Task" : "Add New Task"}
        </span>
      </div>

      <CloseOutlinedIcon
        sx={{ fontSize: "18px" }}
        className="text-slate-300 cursor-pointer"
        onClick={() => {
          //Close window
          setOpenTasksWindow(false);
          //Reset the selected task to null
          setSelectedTask(null);
        }}
      />
    </div>
  );
}

function TaskInput({
  register,
  errors,
}: {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}) {
  const {
    selectedIconObject: { selectedIcon },
    openIconWindowObject: { setOpenIconWindow },
  } = useContextApp();
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[14px] font-medium text-slate-600">Task Name</span>
      <div className="flex gap-3 justify-between">
        <div className="w-full">
          <input
            {...register("taskName")}
            placeholder="Enter Task Name..."
            className="p-[10px] text-[13px] w-full rounded-md border outline-none"
          />
          {errors.taskName && (
            <p className="text-[11px] mt-2 text-red-500">
              {errors.taskName.message}
            </p>
          )}
        </div>

        {/* Icon */}
        <div
          onClick={() => setOpenIconWindow(true)}
          className="w-12 h-10 text-white flex items-center justify-center bg-sky-600 rounded-lg cursor-pointer hover:bg-sky-700"
        >
          {selectedIcon ? (
            getIconComponent(selectedIcon?.name)
          ) : (
            <LibraryBooksIcon />
          )}
        </div>
      </div>
    </div>
  );
}

//Projects
function ProjectsSelection() {
  //Variables
  const {
    setClickedSeletion,
    setOpenTasksDropDown,
    setTasksDropDownPositions,
    project,
    openTasksDropDown,
    clickedSelection,
    selectionErrorsObject: { selectionErrors, setSelectionErrors },
  } = useTaskFormContext();

  const projectsSelectionRef = useRef<HTMLDivElement>(null);

  //Update the clicked selection state
  function handleClickedSelection() {
    //Update the propreties of the tasks drop down positions state
    if (projectsSelectionRef.current) {
      const rect = projectsSelectionRef.current.getBoundingClientRect();
      const { left, top, width } = rect;
      setTasksDropDownPositions({ left: left, top: top, width: width });
    }
    //Update the clickedSelection state
    setClickedSeletion("project");
    //Open the tasks drop down
    setOpenTasksDropDown(true);

    //Hide the error if it is shown
    setSelectionErrors((prevState) =>
      prevState.map((error) => ({
        ...error,
        show: error.label === "project" && false,
      }))
    );
  }

  return (
    <div
      ref={projectsSelectionRef}
      onClick={handleClickedSelection}
      className="flex flex-col gap-2 w-full relative cursor-pointer"
    >
      {/* Projects span */}
      <span className="text-[14px] font-medium text-slate-600">Projects</span>
      {/* selection placeholder and the arrow icon */}
      {/* selection placeholder and the arrow icon */}
      <div className="flex justify-between items-center border h-[42px] px-2 rounded-md">
        {/*  */}
        <span className="    w-full   text-[13px] text-slate-400">
          {project ? (
            <div className="flex gap-1 items-center">
              <div>{getIconComponent(project.icon)}</div>
              <span className="mt-[3px]">{project.title}</span>
            </div>
          ) : (
            <span>Select Project</span>
          )}
        </span>
        {/* arrow icon  */}
        {openTasksDropDown && clickedSelection === "project" ? (
          <KeyboardArrowUpIcon className="absolute top-[40px] right-3 text-slate-400" />
        ) : (
          <KeyboardArrowDownIcon className="absolute top-[40px] right-3 text-slate-400" />
        )}
      </div>
      {selectionErrors[1].show && (
        <p className="text-[11px]  text-red-500">
          {selectionErrors[1].message}
        </p>
      )}
    </div>
  );
}

//Priority selection
function PrioritySelection() {
  //Variables
  const {
    setClickedSeletion,
    setOpenTasksDropDown,
    openTasksDropDown,
    setTasksDropDownPositions,
    priority,
    clickedSelection,
    selectionErrorsObject: { selectionErrors, setSelectionErrors },
  } = useTaskFormContext();
  //
  const prioritySelectionRef = useRef<HTMLDivElement>(null);

  //Update the clicked selection state
  function handleClickedSelection() {
    //Update the propreties of the tasks drop down positions state
    if (prioritySelectionRef.current) {
      const rect = prioritySelectionRef.current.getBoundingClientRect();
      const { left, top, width } = rect;
      setTasksDropDownPositions({ left: left, top: top, width: width });
    }
    //Open the drop down
    setOpenTasksDropDown(true);
    //Update the clicked selection state
    setClickedSeletion("priority");
    //Hide the error if it is shown
    setSelectionErrors((prevState) =>
      prevState.map((error) => ({
        ...error,
        show: error.label === "priority" && false,
      }))
    );
  }

  return (
    <div
      ref={prioritySelectionRef}
      onClick={handleClickedSelection}
      className="flex flex-col gap-2 w-full relative cursor-pointer"
    >
      {/* Priority span */}
      <span className="text-[14px] font-medium text-slate-600">
        Task Priority
      </span>
      {/* selection placeholder and the arrow icon */}
      <div className="flex justify-between items-center border h-[42px] px-2 rounded-md">
        {/*  */}
        <span className="    w-full   text-[13px] text-slate-400">
          {priority ? (
            <div className="flex gap-1 items-center">
              <div>{priority.icon}</div>
              <span className="mt-[3px]">{priority.name}</span>
            </div>
          ) : (
            <span>Select Priority</span>
          )}
        </span>
        {/* arrow icon  */}
        {openTasksDropDown && clickedSelection === "priority" ? (
          <KeyboardArrowUpIcon className="absolute top-[40px] right-3 text-slate-400" />
        ) : (
          <KeyboardArrowDownIcon className="absolute top-[40px] right-3 text-slate-400" />
        )}
      </div>
      {selectionErrors[0].show && (
        <span className="text-red-500 text-[11px]">
          {selectionErrors[0].message}
        </span>
      )}
    </div>
  );
}

function Footer({ isLoading }: { isLoading: boolean }) {
  const {
    openTasksWindowObject: { setOpenTasksWindow },
    selectedIconObject: { setSelectedIcon },
    selectedTaskObject: { setSelectedTask, selectedTask },
    projectClickedObject: { setProjectClicked },
  } = useContextApp();
  return (
    <div className="w-[102%] p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center">
      <button
        onClick={() => {
          setOpenTasksWindow(false);
          setSelectedTask(null);
          setSelectedIcon(null);
          setProjectClicked(null);
        }}
        type="button"
        className="border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md
        hover:border-slate-300 transition-all"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 text-white text-[13px] p-2 px-4 rounded-md transition-all"
      >
        {isLoading ? "Saving..." : selectedTask ? "Edit Task" : "Add Task"}
      </button>
    </div>
  );
}