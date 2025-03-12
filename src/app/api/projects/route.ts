import { NextResponse } from "next/server";
import connect from "@/app/lib/connect";
import Project from "@/app/models/Projects";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        const { title, icon, clerkUserId, tasks } = await req.json();
        await connect();

        const project = new Project({
            id: uuidv4(),
            title,
            icon,
            clerkUserId,
            createdAt: new Date(),
            updatedAt: new Date(),
            tasks: tasks.map((task: any) => ({
                id: uuidv4(),
                title: task.title,
                icon: task.icon,
                projectName: title,
                status: task.status || "In Progress",
                priority: task.priority || "Low",
                createdAt: new Date(),
                updatedAt: new Date(),
            })),
        });

        const savedProject = await project.save();
        return NextResponse.json({ project: savedProject });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 400 });
    }
}

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const clerkUserId = url.searchParams.get("clerkUserId");
        await connect();
        console.log("Fetching projects for user: ", clerkUserId);
        const projects = await Project.find({ clerkUserId });
        return NextResponse.json({ projects });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    try {
        const { projectId, projectName, icon, tasks } = await request.json();
        if (!projectId || !projectName) {
            return NextResponse.json(
                { message: "Project ID and project name are required!" },
                { status: 400 }
            );
        }
        await connect();

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
            { new: true }
        );

        if (!updatedProject) {
            return NextResponse.json(
                { message: "Project not found!" },
                { status: 400 }
            );
        }
        return NextResponse.json({ project: updatedProject });
    } catch (error) {
        console.error("Error in updating of the project", error);
        return NextResponse.json(
            { message: "Project not updated!" },
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
                { message: "Project id is required" },
                { status: 400 }
            );
        }
        await connect();

        const projectToDelete = await Project.findOneAndDelete({
            id: projectId,
        });

        if (!projectToDelete) {
            return NextResponse.json(
                { message: "Project not found!" },
                { status: 404 }
            );
        }
        return NextResponse.json({
            message: "Project deleted successfully!",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Failed to delete project!" },
            { status: 500 }
        );
    }
}