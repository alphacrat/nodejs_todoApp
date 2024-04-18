import jwt from "jsonwebtoken";
import { users } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Not Logged In"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await users.findById(decoded.id);
        next();
    } catch (err) {
        return res.status(404).json({
            success: false,
            message: err
        })
    }
}