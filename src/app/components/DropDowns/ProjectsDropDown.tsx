    import { Project } from "@/app/Data/AllProjects";

    import { IconButton } from "@mui/material";
    import { useEffect, useRef, useState } from "react";
    import DensitySmallIcon from "@mui/icons-material/DensitySmall";
    import getIconComponent from "@/app/Functions/IconsActions";
    import { useContextApp } from "@/app/pages/contextApp";

    function ProjectsDropDown() {
    const {
        allProjectsObject: { allProjects, setAllProjects },
        openProjectsDropDownObject: {
        openProjectsDropDown,
        setOpenProjectsDropDown,
        },
        projectsDropDownPositionsObject: { projectsDropDownPositions },
        chosenProjectObject: { chosenProject, setChosenProject },
    } = useContextApp();
    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        if (
            dropDownRef.current &&
            !dropDownRef.current.contains(event.target as Node)
        ) {
            setOpenProjectsDropDown(false);
        }
        }

        function handleResize() {
        // Close the drop down menu when the window is resized
        setOpenProjectsDropDown(false);
        }
        if (openProjectsDropDown) {
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", handleResize);
        } else {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("resize", handleResize);
        // Restore scrolling
        }

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("resize", handleResize);

        // Restore scrolling on cleanup
        };
    }, [openProjectsDropDown]);

    return (
        <div
        ref={dropDownRef}
        style={{
            top: projectsDropDownPositions.top + 36,
            left: projectsDropDownPositions.left,
        }}
        className={` ${
            openProjectsDropDown ? "block" : "hidden"
        }    bg-white absolute p-3 top-12 left-44  z-[90] border w-[210px]   
        border-slate-50 select-none shadow-md rounded-lg flex flex-col gap-2`}
        >
        <AllProjectsItem />
        <hr className="w-[80%] text-slate-400 mx-auto my-1 opacity-55"></hr>
        <>
            {allProjects.length === 0 && (
            <p className="text-center text-slate-400 text-[11px] my-2">
                No Projects Found
            </p>
            )}
            {allProjects.map((singleProject, index) => (
            <SingleProject key={singleProject.id} singleProject={singleProject} />
            ))}
        </>
        </div>
    );
    }
    export default ProjectsDropDown;

    function AllProjectsItem() {
    const {
        chosenProjectObject: { chosenProject, setChosenProject },
        openProjectsDropDownObject: { setOpenProjectsDropDown },
    } = useContextApp();
    return (
        <div
        onClick={() => {
            //Unselect the project
            setChosenProject(null);
            //Close the drop down
            setOpenProjectsDropDown(false);
        }}
        className={`   flex items-center justify-between  gap-7 p-2 rounded-lg text-slate-600  cursor-pointer  `}
        >
        <div className="flex gap-2 items-center">
            {/* Icon */}
            <div>
            <DensitySmallIcon className="text-sky-600 text-[22px]" />
            </div>
            <span className="text-[13px] mt-1 hover:text-sky-600 cursor-pointer">
            All Projects
            </span>
        </div>
        </div>
    );
    }

    function SingleProject({ singleProject }: { singleProject: Project }) {
    const {
        chosenProjectObject: { chosenProject, setChosenProject },
        allProjectsObject: { allProjects },
        openProjectsDropDownObject: { setOpenProjectsDropDown },
    } = useContextApp();

    function handleTheProjectClicked(projectId: string) {
        //Extract the project from the all Projects array
        const findProject = allProjects.find((project) => project.id === projectId);
        //If we found the project, update the chosen project
        if (findProject) {
        setChosenProject(findProject);
        }

        //Close the drop down
        setOpenProjectsDropDown(false);
    }
    return (
        <div
        onClick={() => handleTheProjectClicked(singleProject.id)}
        className={` ${
            chosenProject?.id === singleProject.id &&
            "border border-sky-600 bg-sky-50"
        } flex items-center justify-between  gap-7 p-2 rounded-lg text-slate-600  cursor-pointer  `}
        >
        <div className={`flex gap-2 items-center `}>
            <span className="text-[13px] mt-1 hover:text-sky-600 cursor-pointer">
            {singleProject.title}
            </span>
        </div>
        </div>
    );
    }
