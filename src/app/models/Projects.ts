import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    icon: { type: String, required: true },
    projectName: { type: String, required: true },
    status: { type: String, enum: ["In Progress", "Completed"], required: true },
    priority: { type: String, enum: ["Low", "Medium", "High"], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const projectSchema = new Schema({
    id: { type: String, required: true },
    clerkUserId: { type: String, required: true },
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    icon: { type: String, required: true },
    tasks: [taskSchema],
});

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;