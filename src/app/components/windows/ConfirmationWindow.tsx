"use client";

import { useContextApp } from "@/app/pages/contextApp";
import React, { useEffect, useState } from "react";
import { deleteProject } from "@/app/Functions/projectsActions";
import { toast } from "react-hot-toast";
import { deleteTask } from "@/app/Functions/tasksFunction";
function ConfirmationWindow() {
  const {
    openConfirmationWindowObject: {
      openConfirmationWindow,
      setOpenConfirmationWindow,
    },
    selectedProjectObject: { setSelectedProject, selectedProject },
    allProjectsObject: { allProjects, setAllProjects },
    chosenProjectObject: { setChosenProject, chosenProject },
    allTasksObject: { allTasks, setAllTasks },
    selectedTaskObject: { selectedTask, setSelectedTask },
  } = useContextApp();

  const [isLoading, setLoading] = useState(false);
  const [header, setHeader] = useState("");
  const [message, setMessage] = useState("");

  function closeConfirmationWindow() {
    setOpenConfirmationWindow(false);
    setSelectedProject(null);
  }

  async function deleteFunction() {
    try {
      // set the loading as true
      setLoading(true);

      //Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (selectedProject) {
        deleteProject(
          selectedProject,
          setSelectedProject,
          allProjects,
          setAllProjects,
          allTasks,
          setAllTasks,
          setOpenConfirmationWindow
        );
      } else if (selectedTask) {
        deleteTask({
          taskToDelete: selectedTask,
          allProjects,
          chosenProject,
          setAllTasks,
          setChosenProject,
          setAllProjects,
        });
      }
      // delete the project
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      // set the loading as false
      setLoading(false);
      setOpenConfirmationWindow(false);
      //Set the chosen project only if we're going to delete a project
      selectedTask === null && setChosenProject(null);

      setSelectedProject(null);
      setSelectedTask(null);
      toast.success(
        ` ${selectedProject ? "project" : "task"}  deleted successfully`
      );
    }
  }

  useEffect(() => {
    if (selectedProject) {
      setHeader("Project");
      setMessage(` Are you sure you want to remove this project? This action cannot be
          undone, and will remove all projects associated with it.`);
    } else if (selectedTask) {
      setHeader("Task");
      setMessage(` Are you sure you want to remove this task? This action cannot be
        undone.`);
    }
  }, [openConfirmationWindow, selectedProject, selectedTask]);

  return (
    <div
      className={` 
     w-[38%] bg-white max-sm:w-[91%] max-lg:w-[80%] p-6 fixed  shadow-md  
  z-[90] rounded-lg flex items-center top-[30%] left-1/2 -translate-x-1/2 ${
    openConfirmationWindow ? "block" : "hidden"
  }`}
    >
      <div className=" rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-5">Delete {header}</h2>
        <p className={`text-gray-600 mb-4 text-sm  `}>{message}</p>

        <div className="flex justify-end gap-2 mt-10 text-[13px] ">
          <button
            onClick={closeConfirmationWindow}
            className="px-4  py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={deleteFunction}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg text-white "
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationWindow;
