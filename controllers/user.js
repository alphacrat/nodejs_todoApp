import { users } from "../models/user.js";
import bcrypt from "bcrypt";
import { generateCookie } from "../utils/features.js";

export const getAllData = async (req, res) => {
}

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const userExist = await users.findOne({ email });
    try {
        if (userExist) {
            throw next(new Error("User already exist"));
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await users.create({
            name,
            email,
            password: hashPassword,
        });
        generateCookie(user, res, "User created successfully", 201);
    } catch (err) {
        next(err);
    }

}

export const login = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await users.findOne({ email }).select("+password");
        const encrypt = await bcrypt.compare(password, user.password);

        if (!user || !encrypt) {
            return res.status(404).json({
                success: false,
                message: "invalid email or password"
            })
        }
        else {
            generateCookie(user, res, `Welcome back ${name}`, 200);
        }
    } catch (err) {
        return res.status(404).json({
            success: false,
            message: err
        })
    }

}


export const getMyDetails = (req, res) => {
    if (!req.user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        })
    }
    res.status(200).json({
        success: true,
        new: req.user
    })
}

export const logout = (req, res) => {
    res
        .status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV == "Development" ? false : true
        })
        .json({
            success: true,
            message: "Logged Out"
        })
}