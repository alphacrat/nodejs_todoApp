import express from "express";
import { connectDb } from "./data/database.js";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import tasksRouter from "./routes/tasks.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";



config({
    path: "./data/config.env"
});

export const app = express();

connectDb();

const PORT = process.env.PORT;

//using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
));
app.use(errorMiddleware);

//using routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/tasks", tasksRouter);
app.get("/", (req, res) => res.send("Hello World!"))




app.listen(PORT, () => {
    console.log(`Server is running on.PORT ${process.env.PORT} in "${process.env.NODE_ENV}" mode`)
})


// credentials: true //used for identification of the user, it sends the user details along with the request for the authenitcation when the user is logged in 