import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    id:{type: String,require:true,},
    title: {type:String, require:true},
    icon: {type: String, require:true},
    projectName: {type: String, require:true},
    status: {
        type:String,
        enum: ["Low","Medium","High"],
        require:true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
});

const projectSchema = new Schema({
    id:{
        type: String,
        required: true,
    },
    clerkUserId: {
        type:String,
        required: true,
    },
    title: {
        type:String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    icon: {
        type:String,
        require:true,
    },
    tasks: [taskSchema]
});

const Project = mongoose.models.Project || mongoose.model("Project",projectSchema);
export default Project;