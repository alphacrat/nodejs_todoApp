import express from "express"
import { getAllData, getMyDetails, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllData);

router.post("/create", register);

router.post("/login", login);

router.get("/me", isAuthenticated, getMyDetails);

router.get("/logout", isAuthenticated, logout);

export default router; 