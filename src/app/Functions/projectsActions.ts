import React , { Dispatch, SetStateAction} from "react"
import { v4 as uuidv4 } from 'uuid'

import {Project} from '@/app/Data/AllProjects';
import {IconData} from '../pages/types/AppTypes'
import {FormData} from '../components/windows/ProjectWindow'

export function addNewProject (
    data: FormData,
    allProjects:Project[],
    setAllProjects: Dispatch<SetStateAction<Project[]>>,
    setOpenProjectWindow:Dispatch<SetStateAction<boolean>>,
    selectedIcon:IconData | null,
    reset: () => void,
) {
    try {
        const newProject: Project = {
            id:uuidv4(),
            title:data.projectName,
            icon: selectedIcon?.name || "List",
            tasks:[],
            clerkUserId:"123",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setAllProjects([...allProjects, newProject]);
        setOpenProjectWindow(false);
        reset();

    } catch (error) {
        console.log(error);
    }
}
