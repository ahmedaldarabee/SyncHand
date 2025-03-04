import { v4 as uuidv4 } from 'uuid'

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
    clerkUserId: "1",
    title: "first project",
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
            projectName: "project 2",
            status: "Completed",
            priority: "High",
            createdAt: "2024-08-26T10:00:00Z",
            updatedAt: "2024-08-28T14:30:00Z",
        },
    ],
    },{
        id: uuidv4(),
        clerkUserId: "2",
        title: "second project",
        icon: "List",
        createdAt: "2024-08-26T10:00:00Z",
        updatedAt: "2024-08-28T14:30:00Z",
        tasks: [
            {
                id: uuidv4(),
                title: "create first design",
                icon: "List",
                projectName: "project 3",
                status: "Completed",
                priority: "Low",
                createdAt: "2024-08-26T10:00:00Z",
                updatedAt: "2024-08-28T14:30:00Z",
            },
            {
                id: uuidv4(),
                title: "create second design",
                icon: "List",
                projectName: "project 4",
                status: "Completed",
                priority: "High",
                createdAt: "2024-08-26T10:00:00Z",
                updatedAt: "2024-08-28T14:30:00Z",
            },
            {
                id: uuidv4(),
                title: "create third design",
                icon: "List",
                projectName: "project 5",
                status: "Completed",
                priority: "High",
                createdAt: "2024-08-26T10:00:00Z",
                updatedAt: "2024-08-28T14:30:00Z",
            },
        ],
    },{
        id: uuidv4(),
        clerkUserId: "2",
        title: "third project",
        icon: "List",
        createdAt: "2024-08-26T10:00:00Z",
        updatedAt: "2024-08-28T14:30:00Z",
        tasks: [
            {
                id: uuidv4(),
                title: "create first design",
                icon: "List",
                projectName: "project 3",
                status: "Completed",
                priority: "Low",
                createdAt: "2024-08-26T10:00:00Z",
                updatedAt: "2024-08-28T14:30:00Z",
            },
            {
                id: uuidv4(),
                title: "create second design",
                icon: "List",
                projectName: "project 4",
                status: "Completed",
                priority: "High",
                createdAt: "2024-08-26T10:00:00Z",
                updatedAt: "2024-08-28T14:30:00Z",
            },
            {
                id: uuidv4(),
                title: "create third design",
                icon: "List",
                projectName: "project 5",
                status: "In Progress",
                priority: "High",
                createdAt: "2024-08-26T10:00:00Z",
                updatedAt: "2024-08-28T14:30:00Z",
            },
            {
                id: uuidv4(),
                title: "create third design",
                icon: "List",
                projectName: "project 5",
                status: "Completed",
                priority: "High",
                createdAt: "2024-08-26T10:00:00Z",
                updatedAt: "2024-08-28T14:30:00Z",
            },
        ],
    },{
        id: uuidv4(),
        clerkUserId: "2",
        title: "fourth project",
        icon: "List",
        createdAt: "2024-08-26T10:00:00Z",
        updatedAt: "2024-08-28T14:30:00Z",
        tasks: [],
    }
]