import { tasks } from "../models/tasks.js";

export const newTask = async (req, res, next) => {
    const { title, description } = req.body;
    try {
        await tasks.create({
            title,
            description,
            user: req.user
        })
        res.status(201).json({
            success: true,
            message: "Task added successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getMyTask = async (req, res, next) => {
    const id = req.user.id;
    try {
        const mytask = await tasks.find({ user: id });
        if (mytask.length === 0) {
            throw new ApiError("No task created Yet", 404)
        }
        res.status(200).json({
            success: true,
            mytask
        })
    } catch (err) { next(err) }
}

export const updateTask = async (req, res, next) => {
    const id = req.params.id;
    try {
        const task = await tasks.findById(id)
        if (!task) {
            return next(new Error("No such task found"));
        }
        task.title = "Breakfast";
        task.completed = !task.completed,
            await task.save()
        res.status(200).json({
            success: true,
            message: "task completed"
        })
    } catch (err) { next(err) }
}

export const deleteTask = async (req, res, next) => {
    const id = req.params.id;
    try {
        const task = await tasks.findById(id);

        if (!task) {
            return next(new Error("No task found"));
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Deleted"
        })
    } catch (err) {
        next(err);
    }
}