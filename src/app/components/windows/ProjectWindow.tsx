    "use client";
    import React, {
    useEffect,
    useLayoutEffect,
    useState,
    } from "react";
    import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
    import { useContextApp } from "@/app/pages/contextApp";
    import BorderAllIcon from "@mui/icons-material/BorderAll";
    import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
    import { toast } from "react-hot-toast";

    import {
    useForm,
    SubmitHandler,
    UseFormRegister,
    FieldErrors,
    } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import * as z from "zod";
    import getIconComponent from "@/app/Functions/IconsActions";
    import { addNewProject,editProject } from "@/app/Functions/projectsActions";
    import { allIconsArray } from "@/app/Data/AllIcons";
    import { Project } from "@/app/Data/AllProjects";
    import { useUser } from "@clerk/nextjs";
    import { sortProjects } from "@/app/Functions/sortingFunctions";

    const schema = z.object({
    projectName: z
        .string()
        .min(1, { message: "Project name is required" })
        .max(30, { message: "Project name must be 30 characters or less" }),
    });

    export type FormData = z.infer<typeof schema>;

    export function ProjectWindow() {
    const {
        openProjectWindowObject: { openProjectWindow, setOpenProjectWindow },
        allProjectsObject: { allProjects, setAllProjects },
        selectedIconObject: { selectedIcon, setSelectedIcon },
        selectedProjectObject: { selectedProject, setSelectedProject },
        chosenProjectObject: { setChosenProject, chosenProject },
        allTasksObject: { allTasks, setAllTasks },
        sortingOptionObject: {sortingOptions}
    } = useContextApp();

    const [isLoading, setLoading] = useState(false);

    //
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        setError,
        setFocus,
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { user } = useUser();

    //On Submit function
    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        if (selectedProject) {
        const allProjectsWithoutSelectedProject = allProjects.filter(
            (project:any) => project.id !== selectedProject.id
        );
        const isExistingNameInOtherProjects =
            allProjectsWithoutSelectedProject.find(
            (project:any) =>
                project.title.toLowerCase() === data.projectName.toLowerCase()
            );

        if (isExistingNameInOtherProjects) {
            setError("projectName", {
            type: "manual",
            message: "Title already used in another project!",
            });
            setFocus("projectName");
            return;
        }
        } else {
        const existingProject = allProjects.find(
            (project:any) =>
            project.title.toLowerCase() === data.projectName.toLowerCase()
        );

        if (existingProject) {
            setError("projectName", {
            type: "manual",
            message: "Project already exists",
            });
            setFocus("projectName");
            return;
        }
        }

        projectsFunction();

        async function projectsFunction() {
        try {
            // set the loading as true
            setLoading(true);

            if (!selectedProject) {
            addNewProject(
                data,
                allProjects,
                setAllProjects,
                setOpenProjectWindow,
                selectedIcon,
                reset,
                user?.id
            );
            } else {
            editProject(
                selectedProject,
                setSelectedProject,
                data,
                selectedIcon,
                allProjects,
                allTasks,
                setAllTasks,
                setAllProjects,
                setOpenProjectWindow
            );
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            // set the loading as false
            setLoading(false);

            //Update the chosen project
            if (selectedProject && chosenProject) {
            if (chosenProject.id === selectedProject.id) {
                const updateChosenProject: Project = {
                ...chosenProject,
                title: data.projectName,
                };
                setChosenProject(updateChosenProject);
            }
            }

            toast.success(
            `Project ${selectedProject ? "edited" : "added"} successfully`
            );
        }
        }
    };
    //Close the project window and reset the form
    const handleClose = () => {
        setOpenProjectWindow(false);
        reset();
    };

    useEffect(() => {
        const currentSortingOption = sortingOptions
        .flatMap((category: any) => category.options)
        .find((option: any) => option.selected);
        const selectedOption = currentSortingOption;

        const sortedProjects = sortProjects(allProjects, selectedOption?.value);

        if (JSON.stringify(sortedProjects) !== JSON.stringify(allProjects)) {
        setAllProjects(sortedProjects);
        }
    }, [allProjects]);

    //Reset the form when the openProjectWindow state changes
    useLayoutEffect(() => {
        //if the openProjectWindow state is true
        if (openProjectWindow) {
        //If the selectedProject state is not null, meaning we are creating a project
        if (!selectedProject) {
            reset();
        } else {
            //Else we are going to edit a project
            setValue("projectName", selectedProject.title);

            const findIconInAllIconsArray = allIconsArray.find(
            (icon) => icon.name === selectedProject.icon
            );
            if (findIconInAllIconsArray) {
            setSelectedIcon(findIconInAllIconsArray);
            }
        }
        }
    }, [openProjectWindow, reset]);

    return (
        <div
        className={`${
            openProjectWindow ? "block" : "hidden"
        } w-[48%] max-sm:w-[82%] max-[600px]:w-[93%] z-[80] p-3 left-1/2 top-[47%] -translate-y-1/2 
        -translate-x-1/2 absolute flex flex-col gap-3 border border-slate-50 
        bg-white rounded-lg shadow-md`}
        >
        <Header handleClose={handleClose} />
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 pt-8 px-7 mt-3"
        >
            <ProjectInput register={register} errors={errors} />
            <Footer handleClose={handleClose} isLoading={isLoading} />
        </form>
        </div>
    );
    }

    function Header({ handleClose }: { handleClose: () => void }) {
    const {
        selectedIconObject: { setSelectedIcon },
        selectedProjectObject: { selectedProject, setSelectedProject },
    } = useContextApp();
    return (
        <div className="flex justify-between items-center pt-7 px-7">
        <div className="flex items-center gap-2">
            <div className="p-[7px] bg-sky-200 rounded-lg flex items-center justify-center">
            <BorderAllIcon
                sx={{ fontSize: "21px" }}
                className="text-sky-600"
            />
            </div>
            <span className="font-semibold text-lg">
            {selectedProject ? "Edit Project" : "New Project"}
            </span>
        </div>

        <CloseOutlinedIcon
            sx={{ fontSize: "18px" }}
            className="text-slate-300 cursor-pointer"
            onClick={() => {
            setSelectedIcon(null);
            setSelectedProject(null);
            handleClose();
            }}
        />
        </div>
    );
    }

    function ProjectInput({
    register,
    errors,
    }: {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
    }) {
    const {
        openProjectWindowObject: { openProjectWindow },
        openIconWindowObject: { setOpenIconWindow },
        selectedIconObject: { selectedIcon },
        selectedProjectObject: { selectedProject },
    } = useContextApp();

    useEffect(() => {
        if (openProjectWindow) {
        const inputElement = document.querySelector<HTMLInputElement>(
            'input[name="projectName"]'
        );
        if (inputElement) {
            inputElement.focus();
        }
        }
    }, [openProjectWindow]);


    return (
        <div className="flex flex-col gap-2">
        <span className="text-[14px] font-medium text-slate-600">
            Project Name
        </span>
        <div className="flex gap-3 justify-between">
            <div className="w-full">
            <input
                {...register("projectName")}
                placeholder="Enter Project Name..."
                className="p-[10px] text-[13px] w-full rounded-md border outline-none"
            />

            {errors.projectName && (
                <p className="text-[11px] mt-2 text-red-500">
                {errors.projectName.message}
                </p>
            )}
            </div>

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

    function Footer({
    handleClose,
    isLoading,
    }: {
    handleClose: () => void;
    isLoading: boolean;
    }) {
    const {
        selectedIconObject: { setSelectedIcon },
        selectedProjectObject: { selectedProject, setSelectedProject },
    } = useContextApp();
    return (
        <div className="w-[102%] p-[12px] mt-8 mb-4 flex gap-3 justify-end items-center">
        <button
            type="button"
            onClick={() => {
            handleClose();
            setSelectedProject(null);
            setSelectedIcon(null);
            }}
            className="border border-slate-200 text-slate-400 text-[13px] p-2 px-6 rounded-md
            hover:border-slate-300 transition-all"
        >
            Cancel
        </button>

        <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white text-[13px] p-2 px-4 rounded-md transition-all"
        >
            {isLoading
            ? "Saving..."
            : selectedProject
            ? "Edit Project"
            : "Add Project"}
        </button>
        </div>
    );
    }
