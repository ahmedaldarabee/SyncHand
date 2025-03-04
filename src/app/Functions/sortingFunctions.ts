import { Project } from './../Data/AllProjects';

export function sortProjects(
    allProjects: Project[],
    selectionOptionValue: string | undefined
){
    const sortedProjects = [...allProjects];

    // current -> current item in object
    // next -> next item in object
    switch(selectionOptionValue){
        case "asc":
            sortedProjects.sort((current,next) => current.title.localeCompare(next.title));
        break;
        
        case "desc":
            sortedProjects.sort((current,next) => next.title.localeCompare(current.title));
        break;

        case "newest":
            sortedProjects.sort((current,next) => new Date(next.createdAt).getTime() - new Date(current.createdAt).getTime() );
        break;
        
        case "oldest":
            sortedProjects.sort((current,next) => new Date(current.createdAt).getTime() - new Date(next.createdAt).getTime() );
        break;

        default:
        return allProjects;
    }
    return sortedProjects;
}