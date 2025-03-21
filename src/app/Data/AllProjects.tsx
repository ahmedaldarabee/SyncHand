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
];