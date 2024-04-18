import express from "express"
import { newTask, getMyTask, updateTask, deleteTask } from "../controllers/tasks.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

router.route("/").post(isAuthenticated, newTask).get(isAuthenticated, getMyTask);
router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask)


export default router;