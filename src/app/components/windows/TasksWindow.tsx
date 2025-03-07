"use client"

import { Project, Task } from '@/app/Data/AllProjects';
import getIconComponent from '@/app/Functions/IconsActions';
import { useContextApp } from '@/app/pages/contextApp';
import { sortingDropDownPosition } from '@/app/pages/types/AppTypes';
import { ChevronDown, ChevronUp, Circle, CircleX, List } from 'lucide-react';
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import {useForm , SubmitHandler, UseFormRegister , FieldErrors} from 'react-hook-form'
import { zodResolver }  from '@hookform/resolvers/zod';
import * as z from 'zod'
import TasksDropDown from '../DropDowns/TasksDropDown';
import { v4 as uuidv4 } from 'uuid'
import { allIconsArray } from '@/app/Data/AllIcons';
import addNewTask, { updateTaskAndProjectProps } from '@/app/Functions/tasksFunction';
import { editProject } from '@/app/Functions/projectsActions';

export type SelectionOption = "priority" | "project"

type SelectionError = {
    id: number;
    label: string;
    message: string;
    show: boolean;
};

export type Priority = {
    id: number;
    name: string;
    icon: React.ReactNode;
    isSelected: boolean;
}

export type ProjectWithSelection = Project & {isSelected: boolean}

// Define the structure of our context
type TaskFormType = {
    clickedSelection: SelectionOption | null;
    setClickedSelection: Dispatch<SetStateAction<SelectionOption | null>>;

    openTasksDropDown: boolean;
    setOpenTasksDropDown: Dispatch<SetStateAction<boolean>>;

    tasksDropDownPositions: { left: number; top: number, width: number };
    setTasksDropDownPositions: Dispatch<SetStateAction<{ left: number; top: number, width: number }>>;

    priority: Priority | null;
    setPriority: Dispatch<SetStateAction<Priority | null>>;

    project: ProjectWithSelection | null;
    setProject: Dispatch<SetStateAction<ProjectWithSelection | null>>;

    priorityListObject: {
        priorityList: Priority[];
        setPriorityList: Dispatch<SetStateAction<Priority[]>>;
    };

    updatedAllProjectsObject: {
        updatedAllProjects: ProjectWithSelection[];
        setUpdatedAllProjects: Dispatch<SetStateAction<ProjectWithSelection[]>>;
    };

    selectionErrorsObject: {
        selectionErrors: SelectionError[];
        setSelectionErrors: Dispatch<SetStateAction<SelectionError[]>>;
    };
};

const TaskFormState = {
    clickedSelection: null,
    setClickedSelection: () => {},

    openTasksDropDown: false,
    setOpenTasksDropDown: () => {},

    tasksDropDownPositions: {left: 0 , top: 0, width: 0},
    setTasksDropDownPositions: () => {},

    priority: null,
    setPriority: () => {},

    project: null,
    setProject: ()=> {},

    priorityListObject: {
        priorityList: [],
        setPriorityList: () => {}
    },

    updatedAllProjectsObject: {
        updatedAllProjects: [],
        setUpdatedAllProjects: () => {}
    },
    selectionErrorsObject: {
        selectionErrors: [],
        setSelectionErrors: () => {}
    }
}

// create context
const TaskFormContext = createContext<TaskFormType>(TaskFormState);

export function useTaskFormContext(){
    return useContext(TaskFormContext);
}

const schema = z.object({
    taskName: z
    .string()
    .min(1,{message:"task name is required!"})
    .max(25,{message:"task name must be less than or equal 25 character"})
});

type FormData = z.infer<typeof schema>;

// starting from here!
// provider must using here!

const TasksWindow = () => {
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset,
        setFocus,
        setError,
        setValue
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const [clickedSelection,setClickedSelection] = useState<SelectionOption | null>(null);
    const [openTasksDropDown, setOpenTasksDropDown] = useState(false);
    const [tasksDropDownPositions, setTasksDropDownPositions] = useState<sortingDropDownPosition>({
        left: 0,
        top:0,
        width:0
    });

    const [priority, setPriority] = useState<Priority | null>(null)

    const [project, setProject] = useState<ProjectWithSelection | null>(null)

    const[priorityList, setPriorityList] = useState<Priority[]>([
        {
            id: 1,
            name: "Low",
            icon: <Circle className='w-4 h-4 text-green-500' />,
            isSelected: false
        },{
            id: 2,
            name: "Medium",
            icon: <Circle className='w-4 h-4 text-yellow-500' />,
            isSelected: false
        },{
            id: 3,
            name: "High",
            icon: <Circle className='w-4 h-4 text-red-500' />,
            isSelected: false
        }
    ]);

    const {
        allProjectsObject: {allProjects, setAllProjects},
        openTasksWindowObject:{openTasksWindow,setOpenTasksWindow},
        loadingObject:{isLoading,setLoading},
        selectedIconObject: {selectedIcon,setSelectedIcon},
        chosenProjectObject:{chosenProject,setChosenProject},
        allTasksObject:{allTasks,setAllTasks},
        selectedTaskObject:{selectedTask,setSelectedTask},
        openProjectWindowObject: {openProjectWindow,setOpenProjectWindow},
        selectedProjectObject: {selectedProject,setSelectedProject},
        openConfirmationWindowObject:{setOpenConfirmationWindow}
    } = useContextApp();

    
    const [updateAllProjects, setUpdateAllProjects] = useState<ProjectWithSelection[]>([]);

    useEffect(() => {
        const templateAllProjects: ProjectWithSelection[] = allProjects.map((project) => ({
            ...project,
            isSelected: false,
        }))
        setUpdateAllProjects(templateAllProjects);
    },[allProjects]);

    useLayoutEffect(() => {
        
        if(!selectedTask){
            reset();
            setPriority(null)
            setProject(null)
        }else{
            setValue("taskName",selectedTask.title);
            const getPriority = priorityList.find((priority) => priority.name === selectedTask.priority);
            
            if(getPriority){
                setPriority(getPriority)
            }

            const getProject = updateAllProjects.find((proj) => proj.title.toLowerCase() === selectedTask.projectName.toLowerCase())
            
            if(getProject){
                setProject(getProject);
            }
            // setUpdateAllProjects
            const findIconInAllIconsArr = allIconsArray.find((icon) => icon.name === selectedTask.icon);
            if(findIconInAllIconsArr){
                setSelectedIcon(findIconInAllIconsArr);
            }
        }
        
        setTimeout(() => {
            setFocus("taskName");
        },0);

        setSelectionErrors((prevState) =>
            prevState.map((error) => ({...error,show:false}))
        )

    },[openTasksWindow]);

    const [selectionErrors, setSelectionErrors] = useState<SelectionError[]>([
        {
            id: 1,
            label: "priority",
            message: "Please select the priority",
            show: false,
        },{
            id: 2,
            label: "project",
            message: "Please select the project",
            show: false,
        }
    ]);

    const onSubmit: SubmitHandler<FormData> = (data) => {

        if(project){
            const findProject = updateAllProjects.find((proj) => proj.id === project.id);

            const findTask = findProject?.tasks.find((task) => task.title.toLowerCase() === data.taskName.toLowerCase());
            
            if(findTask){
                setError("taskName",{
                    type: "manual",
                    message: "task already exist",
                });
                setFocus("taskName");
                return;
            }
        }


        const newErrors = selectionErrors.map((error) => {
            if(error.label === "priority" && !priority){
                return {...error, show: true};
            }

            if(error.label === "project" && !project){
                return {...error, show: true};
            }
            
            return {...error, show: false};

        });

        if(newErrors.every((error) => error.show === false)){
            tasksFunction(data);
        }

        setSelectionErrors(newErrors);
    }

    async function tasksFunction(data: FormData){
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve,1000));

            if(!selectedTask){
                const newTask: Task = {
                    id: uuidv4(),
                    title: data.taskName,
                    icon: selectedIcon ? selectedIcon?.name : "List",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    priority: (priority?.name as "Low" | "Medium" | "High") || "Low",
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
                    project,
                );
            }else{
                editProject(
                    selectedProject,
                    setSelectedProject,
                    data,//Error is here.!
                    selectedIcon,
                    allProjects,
                    allTasks,
                    setAllTasks,
                    setAllProjects,
                    setOpenProjectWindow
                )
            }
            // editTask();
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false);
            setOpenTasksWindow(false);
        }
    }

    // main Context Provider
    return (
        <TaskFormContext.Provider
            value={{
                clickedSelection,
                setClickedSelection,

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
                    setUpdatedAllProjects: setUpdateAllProjects
                }
                ,
                selectionErrorsObject: {
                    selectionErrors, 
                    setSelectionErrors
                }
            }}>

        <div 
        className={`
            w-[48%] max-sm:w-[82%] max-[600px]:w-[93%]
            z-[80] p-3 absolute left-1/2 top-[47%] -translate-y-1/2 -translate-x-1/2
            bg-white rounded-lg shadow-md ${openTasksWindow ? "":"hidden"}
        `}>
            {/* main data */}
            <TasksDropDown />
            <Header />
            <form 
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-2 pt-8 px-7 mt-3'>
                <TaskInput register={register} errors={errors} />
                    <div className='flex justify-between gap-3 mt-5'>
                        <PrioritySelection />
                        <ProjectSelection />
                    </div>
                <Footer isLoading={isLoading}/>
            </form>
        </div>

        </TaskFormContext.Provider>
    )
}

function Header(){
    const {
        openTasksWindowObject: {setOpenTasksWindow},
        selectedTaskObject: { selectedTask , setSelectedTask }
    } = useContextApp();

    return (
        <div className='flex justify-between items-center p-7'>
            <div className='flex items-center gap-2'>
                <div className='p-[7px] bg-sky-200 rounded-lg flex items-center justify-center'>

                    <List className='w-4 h-4 text-sky-600' onClick={() => setOpenTasksWindow(false)} />

                </div>
                <span className='font-semibold text-lg'>
                    {selectedTask ? "Edit Task" :"Add New Task"}
                </span>
            </div>
            
            <CircleX
            onClick={() => {
                setOpenTasksWindow(false);
                setSelectedTask(null);
            }}
            className='w-4 h-4 text-slate-300 cursor-pointer'/>
        </div>
    )
}

function TaskInput({
    register,
    errors
}:{
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>
}) {
    const {
        selectedIconObject:{ selectedIcon },
        openIconWindowObject:{ setOpenIconWindow },
    } = useContextApp();

    return (
        <div className='flex flex-col gap-2'>
            <span className='text-[14px] font-medium text-slate-600 capitalize'>task name</span>
            <div className='flex gap-3 justify-between'>
                <div className='w-full'>
                    <input 
                    {...register("taskName")}
                    type="text" placeholder='Enter task name' />

                    {errors.taskName && (
                        <p className='text-[11px] mt-2 text-red-500'>{errors.taskName.message}</p>
                    )}
                </div>

                <div
                    onClick={() => setOpenIconWindow(true)}
                    className='w-12 h-12 text-white flex items-center justify-center bg-sky-600 rounded-lg cursor-pointer'
                    >
                    {
                        selectedIcon ? (
                                getIconComponent(selectedIcon?.name)
                        ) : (
                            <List />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const Footer = ({isLoading}: {isLoading: boolean}) => {
    const {
        openTasksWindowObject:{setOpenTasksWindow},
        selectedIconObject: {selectedIcon , setSelectedIcon},
        selectedTaskObject:{  selectedTask , setSelectedTask}
    } = useContextApp();

    return (
        <div className='w-[100%] p-3 mt-2 flex gap-3 justify-end items-center'>

            {/* cancel button */}
            <button 

                onClick={() => {
                    setOpenTasksWindow(false)
                    setSelectedTask(null)
                    setSelectedIcon(null)
                }}

            type='button' className='border border-slate-200 text-slate-400 text-[13px] p-2 rounded-md capitalize hover:border-slate-300 transition-all'>
                close
            </button>

            <button className='text-white text-[13px] p-2 px-4 rounded-md bg-sky-600 hover:bg-sky-700 transition-all capitalize'>
                {isLoading ? "Saving..."  : selectedTask ?"Edit Task " : "Add New Task"}
            </button>
        </div>
    )
}

function PrioritySelection(){
    const {
        setClickedSelection,
        setOpenTasksDropDown,
        setTasksDropDownPositions,
        priority,
        clickedSelection,
        selectionErrorsObject: { selectionErrors, setSelectionErrors }
    } = useTaskFormContext();

    const prioritySelectionRef = useRef<HTMLDivElement>(null);
    
    function handleClickedSelection(){
        if(prioritySelectionRef.current){
            const rect = prioritySelectionRef.current.getBoundingClientRect()
            const { left , top, width } = rect;
            setTasksDropDownPositions({left:left , top:top, width:width});
        }

        setOpenTasksDropDown(true);
        setClickedSelection("priority");
        setSelectionErrors((prevState) => 
            prevState.map((error) => ({
                ...error,
                show: error.label === "priority" && false
            }))
        )
    }

    return (
        <div        
        ref={prioritySelectionRef}
        onClick={handleClickedSelection}
        className='flex flex-col gap-2 w-full relative cursor-pointer'
        >

            <span className='capitalize text-[14px] font-medium text-slate-600'>
                task priority
            </span>

            <div className='flex justify-between items-center border h-[42px] px-2 rounded-md'>
                <span className=' w-full text-[13px] text-slate-400'>
                    {
                        priority ? (
                            <div className='flex gap-1 items-center'>
                                <div> {priority.icon} </div>
                                <span className='mt-[3px]'> {priority.name} </span>
                            </div>
                        ) : (
                            <span> select priority </span>
                        )
                    }
                </span>
                <ChevronDown className='absolute top-[40px] right-3 w-4 h-4 text-slate-400'/>
            </div>

            {
                selectionErrors[0].show && (
                    <span className='text-red-500 text-[11px]'>
                        {selectionErrors[0].show}
                    </span>
                )
            }

        </div>
    )
}

function ProjectSelection(){
    const {
        setClickedSelection,
        openTasksDropDown,
        setOpenTasksDropDown,
        setTasksDropDownPositions,
        project,
        clickedSelection,
        selectionErrorsObject: { selectionErrors, setSelectionErrors }
    } = useTaskFormContext();
    
    const projectSelectionRef = useRef<HTMLDivElement>(null); 

    function handleClickedSelection(){
        if(projectSelectionRef.current){
            const rect = projectSelectionRef.current.getBoundingClientRect();
            const { left , top, width } = rect;
            setTasksDropDownPositions({left: left, top:top, width:width});
        }
        setClickedSelection("project");
        setOpenTasksDropDown(true);

        setSelectionErrors((prevState) => 
            prevState.map((error) => ({
                ...error,
                show: error.label === "project" && false
            }))
        )
    }
    return (
        <div
            ref={projectSelectionRef}
            onClick={handleClickedSelection}
            className='flex flex-col gap-2 w-full relative cursor-pointer'
        >
            <span className='text-[14px] font-medium text-slate-600'>
                projects
            </span>

            <div className='flex justify-between items-center border h-[42px] px-2 rounded-md'>
                <span className='w-full text-[13px] text-slate-400'>
                    {
                        project ? (
                            <div className='flex gap-1 items-center'>
                                <div>{getIconComponent(project.icon)}</div>
                                <span className='mt-[3px]'>{project.title}</span>
                            </div>
                        ) : (
                            <span>select project</span>
                        )
                    }
                </span>

                { openTasksDropDown && clickedSelection === "project" ? (
                    <ChevronDown className='absolute top-[40px] right-3 w-4 h-4 text-slate-400'/>
                ) : (
                    <ChevronUp className='absolute top-[40px] right-3 w-4 h-4 text-slate-400'/>
                )}


            </div>
                {
                    selectionErrors[1].show && (
                        <span className='text-red-500 text-[11px]'>
                            {selectionErrors[1].show}
                        </span>
                    )
                }

        </div>
    )
}

export default TasksWindow