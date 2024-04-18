import mongoose from "mongoose";

export const connectDb = () => {
    mongoose.
        connect(process.env.database_uri, {
            dbName: "backendTodo"
        })
        .then((c) => console.log(`Connected to MongoDB at ${c.connection.host}`))
        .catch((err) => console.log(err))
}

