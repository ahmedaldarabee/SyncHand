import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import Project from "@/app/models/Projects";
import connect from "@/app/lib/connect";
import Error from "next/error";

export async function POST(req: Request) {
  try {
    const { title, icon, clerkUserId, tasks } = await req.json();

    await connect(); // Connect to the database

    const project = new Project({
      id: uuidv4(), // Generate a unique ID for the project
      title,
      icon,
      clerkUserId,
      createdAt: new Date(),
      updatedAt: new Date(),
      tasks: tasks.map((task: any) => ({
        id: uuidv4(), // Generate unique ID for each task
        title: task.title,
        icon: task.icon,
        projectName: title, // Associate the task with the project's title
        status: task.status || "In Progress", // Default status if not provided
        priority: task.priority || "Medium", // Default priority if not provided
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    });

    const savedProject = await project.save(); // Save the project to the database

    return NextResponse.json({ project: savedProject }); // Return the saved project as a response
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: error }, { status: 400 });
  }
}
export async function GET(req: any) {
  try {
    const clerkUserId = req.nextUrl.searchParams.get("clerkUserId"); // Extract the clerkUserId from query params

    await connect(); // Connect to the MongoDB database
    console.log(`Fetching projects for user: ${clerkUserId}`);

    // Find all projects associated with the given clerkUserId
    const projects = await Project.find({ clerkUserId });

    // Return the projects as a JSON response
    return NextResponse.json({ projects });
  } catch (error) {
    console.error(error);

    // Return an error response if something goes wrong
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const { projectId, projectName, icon, tasks } = await request.json();

    if (!projectId || !projectName) {
      return NextResponse.json(
        { message: "Project ID and project name are required" },
        { status: 400 }
      );
    }

    await connect();

    // Update the project in the database
    const updatedProject = await Project.findOneAndUpdate(
      { id: projectId },
      {
        title: projectName,
        icon: icon || "List",
        tasks: tasks.map((task: any) => ({
          ...task,
          projectName,
        })),
      },
      { new: true } // Return the updated document
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project: updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const projectId = url.searchParams.get("projectId");

    if (!projectId) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    await connect(); // Connect to MongoDB

    // Find and delete the project
    const projectToDelete = await Project.findOneAndDelete({ id: projectId });

    if (!projectToDelete) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error); // Log the error for debugging
    return NextResponse.json(
      { message: "Failed to delete project" },
      { status: 500 }
    );
  }
}
