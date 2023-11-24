import mongoose, { connect,ConnectOptions } from "mongoose";
export const dbConnect = () => {
    
    try {
        connect(process.env.MONGO_URI!, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions).then(() => {
            console.log("Database connected");
        });
    } catch (error) { 
        console.log("error", error); 
    }
}; 