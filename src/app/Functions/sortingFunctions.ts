    import { Project } from "../Data/AllProjects";

    export function sortProjects(
    allProjects: Project[],

    selectionOptionValue: string | undefined
    ) {
    const sortedProjects = [...allProjects];

    switch (selectionOptionValue) {
        case "asc":
        sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
        break;
        case "desc":
        sortedProjects.sort((a, b) => b.title.localeCompare(a.title));
        break;
        case "newest":
        sortedProjects.sort(
            (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
        case "oldest":
        sortedProjects.sort(
            (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
        default:
        // If no valid sort option is provided, return the original array
        return allProjects;
    }

    return sortedProjects;
    }
