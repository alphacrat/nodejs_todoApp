import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // make sure the referenc is the name of the collection
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

export const tasks = mongoose.model("tasks", schema)