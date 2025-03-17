import { v4 as uuidv4 } from 'uuid';

interface DataCommon {
    id: string;
    title: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
}

export interface Task extends DataCommon {
    projectName: string;
    status: "In Progress" | "Completed";
    priority: "Low" | "Medium" | "High";
}

export interface Project extends DataCommon {
    clerkUserId?: string;
    tasks: Task[];
}

export const projectData: Project[] = [
    {
        id: uuidv4(),
        clerkUserId: "122",
        title: "First Project",
        icon: "List",
        createdAt: "2024-08-26T10:00:00Z",
        updatedAt: "2024-08-28T14:30:00Z",
        tasks: [
                {
                    id: uuidv4(),
                    title: "create first design",
                    icon: "List",
                    projectName: "project 1",
                    status: "Completed",
                    priority: "Low",
                    createdAt: "2024-08-26T10:00:00Z",
                    updatedAt: "2024-08-28T14:30:00Z",
                },
                {
                    id: uuidv4(),
                    title: "create second design",
                    icon: "List",
                    projectName: "project 1",
                    status: "Completed",
                    priority: "High",
                    createdAt: "2024-08-26T10:00:00Z",
                    updatedAt: "2024-08-28T14:30:00Z",
                },
            ],
    },
];